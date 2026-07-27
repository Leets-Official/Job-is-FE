import { useEffect, useId, useRef, useState, type ChangeEvent, type DragEvent } from 'react';
import ChevronLeftIcon from '@/assets/icons/icon-chevron-left.svg?react';
import CloseCircleIcon from '@/assets/icons/icon-close-circle.svg?react';
import CloseIcon from '@/assets/icons/icon-close.svg?react';
import DownloadIcon from '@/assets/icons/icon-download.svg?react';
import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import { cn } from '@/utils/cn';

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_FILE_EXTENSIONS = ['pdf', 'docx', 'hwp', 'hwpx'];
const ACCEPTED_FILE_TYPES = '.pdf,.docx,.hwp,.hwpx';

type DocumentType = 'resume' | 'coverLetter';

interface ProfileDocument {
  id: string;
  name: string;
  uploadedAt: string;
}

interface DocumentUpload {
  fileName: string;
  progress: number;
}

interface DocumentUploadError {
  fileName: string;
  fileSize: string;
  messages: [string, string];
}

const INITIAL_RESUME: ProfileDocument = {
  id: 'resume-initial',
  name: '이력서_2026.pdf',
  uploadedAt: '2026-07-06',
};

function formatUploadedAt(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function validateFile(file: File) {
  const extension = file.name.split('.').pop()?.toLowerCase();
  const fileSize = `${(file.size / 1024 / 1024).toFixed(1)}MB`;

  if (!extension || !ACCEPTED_FILE_EXTENSIONS.includes(extension)) {
    return {
      fileName: file.name,
      fileSize,
      messages: [
        '등록 가능한 파일 형식이 아닙니다.',
        'PDF, DOCX, HWP, HWPX 파일만 등록할 수 있습니다.',
      ],
    } satisfies DocumentUploadError;
  }

  if (file.size > MAX_FILE_SIZE) {
    return {
      fileName: file.name,
      fileSize,
      messages: [
        '등록 가능한 파일 용량을 초과하였습니다.',
        '10MB 미만의 파일만 등록할 수 있습니다.',
      ],
    } satisfies DocumentUploadError;
  }

  return null;
}

function UploadDropzone({
  title,
  document,
  upload,
  uploadError,
  onSelect,
  onDelete,
  onCancelUpload,
  onClearError,
}: {
  title: string;
  document: ProfileDocument | null;
  upload?: DocumentUpload;
  uploadError?: DocumentUploadError;
  onSelect: (file: File) => void;
  onDelete: () => void;
  onCancelUpload: () => void;
  onClearError: () => void;
}) {
  const inputId = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const selectFirstFile = (fileList: FileList | null) => {
    const file = fileList?.item(0);
    if (file) onSelect(file);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    selectFirstFile(event.target.files);
    event.target.value = '';
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    selectFirstFile(event.dataTransfer.files);
  };

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-body-medium font-medium text-gray-700">{title}</h2>

      {uploadError ? (
        <div
          className="flex flex-col gap-3 rounded-sm border-2 border-[#DE3412] bg-[#FDEFEC] p-4"
          role="alert"
        >
          <div className="flex items-center gap-4">
            <p className="min-w-0 flex-1 truncate text-body-medium font-medium text-text-primary">
              {uploadError.fileName} [{uploadError.fileSize}]
            </p>
            <Button
              variant="outline"
              className="h-[30px] shrink-0 rounded-sm px-3 text-label-small font-normal opacity-50"
              onClick={onClearError}
            >
              삭제
              <CloseIcon className="size-4" aria-hidden="true" />
            </Button>
          </div>
          <div className="border-t border-danger-200" />
          <div className="flex items-start gap-1 text-body-medium font-medium text-danger-500">
            <CloseCircleIcon className="mt-1 size-5 shrink-0" aria-hidden="true" />
            <p>
              {uploadError.messages[0]}
              <br />
              {uploadError.messages[1]}
            </p>
          </div>
        </div>
      ) : upload ? (
        <div className="flex min-h-26 items-center gap-4 rounded-sm border border-gray-200 bg-white p-4">
          <div className="flex min-w-0 max-w-100 flex-1 flex-col gap-2.5 p-2.5">
            <p className="truncate text-label-xsmall font-medium text-text-primary">
              {upload.fileName}
            </p>
            <div
              className="h-1 overflow-hidden rounded-full bg-gray-300"
              role="progressbar"
              aria-label={`${title} 업로드 진행률`}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={upload.progress}
            >
              <div
                className="h-full rounded-full bg-primary-400 transition-[width] duration-100 ease-linear"
                style={{ width: `${upload.progress}%` }}
              />
            </div>
            <p className="text-label-xsmall font-medium text-text-tertiary">
              업로드 중 · {upload.progress}%
            </p>
          </div>
          <Button
            variant="outline"
            className="ml-auto h-[30px] shrink-0 rounded-sm px-3 text-label-small font-normal"
            onClick={onCancelUpload}
          >
            삭제
            <CloseIcon className="size-4" aria-hidden="true" />
          </Button>
        </div>
      ) : document ? (
        <div className="flex min-h-18 items-center gap-4 rounded-sm border border-gray-200 bg-white p-4">
          <div className="min-w-0 flex-1">
            <p className="truncate text-body-medium font-medium text-text-primary">
              {document.name}
            </p>
            <p className="text-body-medium font-medium text-text-tertiary">
              {document.uploadedAt} 업로드
            </p>
          </div>
          <div className="flex shrink-0 gap-4">
            <Button
              variant="outline"
              className="h-[30px] rounded-sm px-3 text-label-small font-normal"
            >
              다운로드
              <DownloadIcon className="size-4" aria-hidden="true" />
            </Button>
            <Button
              variant="outline"
              className="h-[30px] rounded-sm px-3 text-label-small font-normal"
              onClick={onDelete}
            >
              삭제
              <CloseIcon className="size-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      ) : (
        <div
          className={cn(
            'flex min-h-56 flex-col items-center justify-center gap-6 rounded-md border border-dashed border-gray-200 bg-white p-10 text-center transition-colors',
            isDragging && 'border-gray-800 bg-gray-50',
          )}
          onDragEnter={(event) => {
            event.preventDefault();
            setIsDragging(true);
          }}
          onDragOver={(event) => event.preventDefault()}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          <div>
            <p className="text-body-large font-medium text-text-primary">
              첨부할 파일을 여기에 끌어다 놓거나 파일 선택 버튼을 직접 선택해주세요.
            </p>
            <p className="text-label-medium font-medium text-text-tertiary">
              PDF · DOCX · HWP · HWPX · 10MB 이하
            </p>
          </div>
          <Button
            className="h-12 min-w-20 text-white"
            onClick={() => fileInputRef.current?.click()}
          >
            파일선택
          </Button>
        </div>
      )}

      <input
        id={inputId}
        ref={fileInputRef}
        type="file"
        accept={ACCEPTED_FILE_TYPES}
        className="sr-only"
        onChange={handleChange}
        aria-label={`${title} 파일 선택`}
      />
    </section>
  );
}

export default function ProfileDocumentsManager({ onBack }: { onBack: () => void }) {
  const [documents, setDocuments] = useState<Record<DocumentType, ProfileDocument | null>>({
    resume: INITIAL_RESUME,
    coverLetter: null,
  });
  const [uploads, setUploads] = useState<Partial<Record<DocumentType, DocumentUpload>>>({});
  const [errors, setErrors] = useState<Partial<Record<DocumentType, DocumentUploadError>>>({});
  const [deleteTarget, setDeleteTarget] = useState<DocumentType | null>(null);
  const uploadTimersRef = useRef<Partial<Record<DocumentType, number>>>({});

  useEffect(() => {
    const uploadTimers = uploadTimersRef.current;

    return () => {
      Object.values(uploadTimers).forEach((timer) => window.clearInterval(timer));
    };
  }, []);

  const selectDocument = (type: DocumentType, file: File) => {
    const uploadError = validateFile(file);

    if (uploadError) {
      setErrors((previous) => ({ ...previous, [type]: uploadError }));
      return;
    }

    setErrors((previous) => ({ ...previous, [type]: undefined }));
    const previousTimer = uploadTimersRef.current[type];
    if (previousTimer) window.clearInterval(previousTimer);

    let progress = 0;
    setUploads((previous) => ({
      ...previous,
      [type]: { fileName: file.name, progress },
    }));

    uploadTimersRef.current[type] = window.setInterval(() => {
      progress = Math.min(progress + 2, 100);

      if (progress < 100) {
        setUploads((previous) => ({
          ...previous,
          [type]: { fileName: file.name, progress },
        }));
        return;
      }

      const timer = uploadTimersRef.current[type];
      if (timer) window.clearInterval(timer);
      delete uploadTimersRef.current[type];

      setDocuments((previous) => ({
        ...previous,
        [type]: {
          id: `${type}-${file.name}-${file.lastModified}`,
          name: file.name,
          uploadedAt: formatUploadedAt(new Date()),
        },
      }));
      setUploads((previous) => ({ ...previous, [type]: undefined }));
    }, 80);
  };

  const cancelUpload = (type: DocumentType) => {
    const timer = uploadTimersRef.current[type];
    if (timer) window.clearInterval(timer);
    delete uploadTimersRef.current[type];
    setUploads((previous) => ({ ...previous, [type]: undefined }));
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;

    setDocuments((previous) => ({ ...previous, [deleteTarget]: null }));
    setErrors((previous) => ({ ...previous, [deleteTarget]: undefined }));
    setDeleteTarget(null);
  };

  const deleteTargetLabel = deleteTarget === 'resume' ? '이력서' : '자소서';

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

        <div className="border-t border-gray-400 pt-5">
          <div className="flex flex-col gap-5">
            <UploadDropzone
              title="이력서"
              document={documents.resume}
              upload={uploads.resume}
              uploadError={errors.resume}
              onSelect={(file) => selectDocument('resume', file)}
              onDelete={() => setDeleteTarget('resume')}
              onCancelUpload={() => cancelUpload('resume')}
              onClearError={() => setErrors((previous) => ({ ...previous, resume: undefined }))}
            />
            <UploadDropzone
              title="자소서"
              document={documents.coverLetter}
              upload={uploads.coverLetter}
              uploadError={errors.coverLetter}
              onSelect={(file) => selectDocument('coverLetter', file)}
              onDelete={() => setDeleteTarget('coverLetter')}
              onCancelUpload={() => cancelUpload('coverLetter')}
              onClearError={() =>
                setErrors((previous) => ({ ...previous, coverLetter: undefined }))
              }
            />
          </div>
        </div>
      </div>

      {deleteTarget && (
        <div
          className="fixed inset-0 z-30 flex items-center justify-center bg-black-alpha-40 px-5"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setDeleteTarget(null);
          }}
        >
          <Modal
            role="dialog"
            aria-modal="true"
            aria-describedby="delete-document-description"
            title={`${deleteTargetLabel}를 삭제할까요?`}
            onClose={() => setDeleteTarget(null)}
            className="min-h-0 max-w-120 shadow-xl"
            footer={
              <>
                <Button
                  variant="outline"
                  className="h-12 border-gray-300"
                  onClick={() => setDeleteTarget(null)}
                >
                  취소
                </Button>
                <Button
                  className="h-12 bg-gray-1000 text-white hover:bg-gray-800"
                  onClick={confirmDelete}
                >
                  삭제
                </Button>
              </>
            }
          >
            <p
              id="delete-document-description"
              className="text-body-medium font-medium text-text-secondary"
            >
              삭제하면 즉시 파기되며 복구할 수 없어요.
            </p>
          </Modal>
        </div>
      )}
    </>
  );
}
