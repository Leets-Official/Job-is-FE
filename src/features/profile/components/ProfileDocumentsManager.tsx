import { useEffect, useRef, useState } from 'react';
import ChevronLeftIcon from '@/assets/icons/icon-chevron-left.svg?react';
import DeleteDocumentModal from '@/features/profile/components/DeleteDocumentModal';
import UploadDropzone from '@/features/profile/components/UploadDropzone';
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

const INITIAL_RESUME: ProfileDocument = {
  id: 'resume-initial',
  name: '이력서_2026.pdf',
  uploadedAt: '2026-07-06',
};

export default function ProfileDocumentsManager({ onBack }: { onBack: () => void }) {
  const [documents, setDocuments] = useState<Record<DocumentType, ProfileDocument | null>>({
    resume: INITIAL_RESUME,
    coverLetter: null,
  });
  const [uploads, setUploads] = useState<Partial<Record<DocumentType, DocumentUpload>>>({});
  const [errors, setErrors] = useState<Partial<Record<DocumentType, DocumentUploadError>>>({});
  const [deleteTarget, setDeleteTarget] = useState<DocumentType | null>(null);
  const uploadTimersRef = useRef<Partial<Record<DocumentType, number>>>({});
  const uploadProgressRef = useRef<Partial<Record<DocumentType, number>>>({});

  useEffect(() => {
    const uploadTimers = uploadTimersRef.current;

    return () => {
      Object.values(uploadTimers).forEach((timer) => window.clearInterval(timer));
    };
  }, []);

  const selectDocument = (type: DocumentType, file: File) => {
    const uploadError = validateProfileDocument(file);

    if (uploadError) {
      setErrors((previous) => ({ ...previous, [type]: uploadError }));
      return;
    }

    setErrors((previous) => ({ ...previous, [type]: undefined }));
    cancelUpload(type);

    uploadProgressRef.current[type] = 0;
    setUploads((previous) => ({ ...previous, [type]: { fileName: file.name, progress: 0 } }));

    uploadTimersRef.current[type] = window.setInterval(() => {
      const progress = Math.min((uploadProgressRef.current[type] ?? 0) + 2, 100);
      uploadProgressRef.current[type] = progress;

      if (progress < 100) {
        setUploads((previous) => ({
          ...previous,
          [type]: { fileName: file.name, progress },
        }));
        return;
      }

      cancelUpload(type);
      setDocuments((previous) => ({
        ...previous,
        [type]: {
          id: `${type}-${file.name}-${file.lastModified}`,
          name: file.name,
          uploadedAt: formatDocumentUploadedAt(new Date()),
        },
      }));
    }, 80);
  };

  const cancelUpload = (type: DocumentType) => {
    const timer = uploadTimersRef.current[type];
    if (timer) window.clearInterval(timer);
    delete uploadTimersRef.current[type];
    delete uploadProgressRef.current[type];
    setUploads((previous) => ({ ...previous, [type]: undefined }));
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;

    setDocuments((previous) => ({ ...previous, [deleteTarget]: null }));
    setErrors((previous) => ({ ...previous, [deleteTarget]: undefined }));
    setDeleteTarget(null);
  };

  const clearError = (type: DocumentType) => {
    setErrors((previous) => ({ ...previous, [type]: undefined }));
  };

  return (
    <>
      <div className="flex w-full max-w-190 flex-col gap-5 rounded-md border border-gray-200 bg-white p-6">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex h-[35px] w-fit cursor-pointer items-center gap-1 rounded-sm border border-primary-400 px-5 text-label-large font-medium text-text-primary transition-colors hover:bg-primary-50"
        >
          <ChevronLeftIcon className="size-6" aria-hidden="true" />내 프로필로
        </button>

        <h1 className="text-heading-medium text-text-primary">이력서 • 자소서</h1>

        <p className="flex min-h-18 items-center rounded-xs border border-dashed border-gray-400 bg-gray-200 px-6 text-label-medium font-medium text-text-tertiary">
          추천 고도화에 활용할 예정이에요 · 지금은 본인 보관용
        </p>

        <div className="flex flex-col gap-5 border-t border-gray-400 pt-5">
          <UploadDropzone
            title="이력서"
            document={documents.resume}
            upload={uploads.resume}
            uploadError={errors.resume}
            onSelect={(file) => selectDocument('resume', file)}
            onDelete={() => setDeleteTarget('resume')}
            onCancelUpload={() => cancelUpload('resume')}
            onClearError={() => clearError('resume')}
          />
          <UploadDropzone
            title="자소서"
            document={documents.coverLetter}
            upload={uploads.coverLetter}
            uploadError={errors.coverLetter}
            onSelect={(file) => selectDocument('coverLetter', file)}
            onDelete={() => setDeleteTarget('coverLetter')}
            onCancelUpload={() => cancelUpload('coverLetter')}
            onClearError={() => clearError('coverLetter')}
          />
        </div>
      </div>

      {deleteTarget && (
        <DeleteDocumentModal
          documentLabel={deleteTarget === 'resume' ? '이력서' : '자소서'}
          onCancel={() => setDeleteTarget(null)}
          onConfirm={confirmDelete}
        />
      )}
    </>
  );
}
