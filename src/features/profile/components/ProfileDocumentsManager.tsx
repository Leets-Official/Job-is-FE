import { useMemo, useRef, useState } from 'react';
import ChevronLeftIcon from '@/assets/icons/icon-chevron-left.svg?react';
import DeleteDocumentModal from '@/features/profile/components/DeleteDocumentModal';
import UploadDropzone from '@/features/profile/components/UploadDropzone';
import useProfileDocumentActions from '@/features/profile/hooks/useProfileDocumentActions';
import useProfileDocumentUpload from '@/features/profile/hooks/useProfileDocumentUpload';
import useProfileFiles from '@/features/profile/hooks/useProfileFiles';
import {
  type DocumentType,
  type DocumentUpload,
  type DocumentUploadError,
  type ProfileDocument,
} from '@/features/profile/types/profileDocument';
import {
  formatDocumentUploadedAt,
  validateProfileDocument,
} from '@/features/profile/utils/profileDocument';

interface ProfileDocumentsManagerProps {
  onBack: () => void;
  backLabel?: string;
}

export default function ProfileDocumentsManager({
  onBack,
  backLabel = '내 프로필로',
}: ProfileDocumentsManagerProps) {
  const [documents, setDocuments] = useState<Partial<Record<DocumentType, ProfileDocument | null>>>(
    {},
  );
  const [uploads, setUploads] = useState<Partial<Record<DocumentType, DocumentUpload>>>({});
  const [errors, setErrors] = useState<Partial<Record<DocumentType, DocumentUploadError>>>({});
  const [deleteTarget, setDeleteTarget] = useState<DocumentType | null>(null);
  const [deleteError, setDeleteError] = useState<string>();
  const [downloadError, setDownloadError] = useState<string>();
  const uploadControllersRef = useRef<Partial<Record<DocumentType, AbortController>>>({});
  const { uploadProfileDocument } = useProfileDocumentUpload();
  const { profileFiles, invalidateProfileFiles } = useProfileFiles();
  const {
    deleteProfileFile,
    isDeletingProfileFile,
    downloadProfileFile,
    isDownloadingProfileFile,
  } = useProfileDocumentActions();

  const loadedDocuments = useMemo<Record<DocumentType, ProfileDocument | null>>(() => {
    const nextDocuments: Record<DocumentType, ProfileDocument | null> = {
      resume: null,
      coverLetter: null,
    };

    profileFiles.forEach((file) => {
      const type = file.category === 'RESUME' ? 'resume' : 'coverLetter';
      nextDocuments[type] = {
        id: String(file.fileId),
        name: file.fileName,
        uploadedAt: formatDocumentUploadedAt(new Date(file.uploadedAt)),
      };
    });

    return nextDocuments;
  }, [profileFiles]);

  const displayedDocuments = useMemo(
    () => ({ ...loadedDocuments, ...documents }),
    [documents, loadedDocuments],
  );

  const selectDocument = (type: DocumentType, file: File) => {
    const uploadError = validateProfileDocument(file);

    if (uploadError) {
      setErrors((previous) => ({ ...previous, [type]: uploadError }));
      return;
    }

    setErrors((previous) => ({ ...previous, [type]: undefined }));
    cancelUpload(type);

    setUploads((previous) => ({ ...previous, [type]: { fileName: file.name, progress: 0 } }));

    const controller = new AbortController();
    uploadControllersRef.current[type] = controller;

    void uploadProfileDocument({
      type,
      file,
      signal: controller.signal,
      onProgress: (progress) => {
        setUploads((previous) => ({
          ...previous,
          [type]: { fileName: file.name, progress },
        }));
      },
    })
      .then((document) => {
        setDocuments((previous) => ({ ...previous, [type]: document }));
        void invalidateProfileFiles();
      })
      .catch(() => {
        if (controller.signal.aborted) return;

        setErrors((previous) => ({
          ...previous,
          [type]: {
            fileName: file.name,
            fileSize: `${(file.size / 1024 / 1024).toFixed(1)}MB`,
            messages: ['파일 업로드에 실패했어요.', '잠시 후 다시 시도해주세요.'],
          },
        }));
      })
      .finally(() => {
        if (uploadControllersRef.current[type] !== controller) return;

        delete uploadControllersRef.current[type];
        setUploads((previous) => ({ ...previous, [type]: undefined }));
      });
  };

  const cancelUpload = (type: DocumentType) => {
    uploadControllersRef.current[type]?.abort();
    delete uploadControllersRef.current[type];
    setUploads((previous) => ({ ...previous, [type]: undefined }));
  };

  const confirmDelete = () => {
    if (!deleteTarget || isDeletingProfileFile) return;

    const document = displayedDocuments[deleteTarget];
    if (!document) return;

    void deleteProfileFile(Number(document.id))
      .then(() => {
        setDocuments((previous) => ({ ...previous, [deleteTarget]: null }));
        setErrors((previous) => ({ ...previous, [deleteTarget]: undefined }));
        setDeleteTarget(null);
        void invalidateProfileFiles();
      })
      .catch(() => {
        setDeleteError('파일을 삭제하지 못했어요. 잠시 후 다시 시도해주세요.');
      });
  };

  const clearError = (type: DocumentType) => {
    setErrors((previous) => ({ ...previous, [type]: undefined }));
  };

  const downloadDocument = (document: ProfileDocument) => {
    setDownloadError(undefined);
    void downloadProfileFile(Number(document.id)).catch(() => {
      setDownloadError('파일을 다운로드하지 못했어요. 잠시 후 다시 시도해주세요.');
    });
  };

  return (
    <>
      <div className="flex w-full max-w-190 flex-col gap-5 rounded-md border border-gray-200 bg-white p-6">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex h-8.75 w-fit cursor-pointer items-center gap-1 rounded-sm border border-primary-400 px-5 text-label-large font-medium text-text-primary transition-colors hover:bg-primary-50"
        >
          <ChevronLeftIcon className="size-6" aria-hidden="true" />
          {backLabel}
        </button>

        <h1 className="text-heading-medium text-text-primary">이력서 • 자소서</h1>

        <p className="flex min-h-18 items-center rounded-xs border border-dashed border-gray-400 bg-gray-200 px-6 text-label-medium font-medium text-text-tertiary">
          추천 고도화에 활용할 예정이에요 · 지금은 본인 보관용
        </p>
        {downloadError && (
          <p className="text-label-small font-medium text-danger-500" role="alert">
            {downloadError}
          </p>
        )}

        <div className="flex flex-col gap-5 border-t border-gray-400 pt-5">
          <UploadDropzone
            title="이력서"
            document={displayedDocuments.resume}
            upload={uploads.resume}
            uploadError={errors.resume}
            onSelect={(file) => selectDocument('resume', file)}
            onDownload={() => {
              if (displayedDocuments.resume) downloadDocument(displayedDocuments.resume);
            }}
            isDownloading={isDownloadingProfileFile}
            onDelete={() => {
              setDeleteError(undefined);
              setDeleteTarget('resume');
            }}
            onCancelUpload={() => cancelUpload('resume')}
            onClearError={() => clearError('resume')}
          />
          <UploadDropzone
            title="자소서"
            document={displayedDocuments.coverLetter}
            upload={uploads.coverLetter}
            uploadError={errors.coverLetter}
            onSelect={(file) => selectDocument('coverLetter', file)}
            onDownload={() => {
              if (displayedDocuments.coverLetter) downloadDocument(displayedDocuments.coverLetter);
            }}
            isDownloading={isDownloadingProfileFile}
            onDelete={() => {
              setDeleteError(undefined);
              setDeleteTarget('coverLetter');
            }}
            onCancelUpload={() => cancelUpload('coverLetter')}
            onClearError={() => clearError('coverLetter')}
          />
        </div>
      </div>

      {deleteTarget && (
        <DeleteDocumentModal
          documentLabel={deleteTarget === 'resume' ? '이력서' : '자소서'}
          onCancel={() => {
            if (isDeletingProfileFile) return;

            setDeleteError(undefined);
            setDeleteTarget(null);
          }}
          onConfirm={confirmDelete}
          isSubmitting={isDeletingProfileFile}
          errorMessage={deleteError}
        />
      )}
    </>
  );
}
