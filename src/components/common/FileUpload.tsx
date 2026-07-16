import { useId, useRef, type ChangeEvent, type ReactNode } from 'react';
import CheckCircleIcon from '@/assets/icons/icon-check-circle.svg?react';
import ChevronRightIcon from '@/assets/icons/icon-chevron-right.svg?react';
import CloseCircleIcon from '@/assets/icons/icon-close-circle.svg?react';
import CloseIcon from '@/assets/icons/icon-close.svg?react';
import DownloadIcon from '@/assets/icons/icon-download.svg?react';
import RefreshIcon from '@/assets/icons/icon-refresh.svg?react';
import { cn } from '@/utils/cn';

type FileUploadStatus = 'uploading' | 'success' | 'idle' | 'error' | 'uploaded';

export type FileUploadItem = {
  id: string;
  name: string;
  status: FileUploadStatus;
  errorMessage?: string;
};

type FileUploadProps = {
  title: string;
  description?: string;
  files: FileUploadItem[];
  maxFiles?: number;
  onSelectFiles?: (fileList: FileList) => void;
  onRemove?: (id: string) => void;
  onClearAll?: () => void;
  onDownload?: (id: string) => void;
  onPreview?: (id: string) => void;
  className?: string;
};

function FileActionButton({
  icon,
  children,
  onClick,
}: {
  icon: ReactNode;
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-[30px] items-center justify-center gap-1 rounded-sm border border-primary-400 bg-white px-3 text-label-small font-normal text-gray-900"
    >
      {children}
      {icon}
    </button>
  );
}

function FileUploadRow({
  file,
  onRemove,
  onDownload,
  onPreview,
}: {
  file: FileUploadItem;
  onRemove?: (id: string) => void;
  onDownload?: (id: string) => void;
  onPreview?: (id: string) => void;
}) {
  const isError = file.status === 'error';

  return (
    <div
      className={cn(
        'flex w-full flex-col rounded-sm p-4',
        isError
          ? 'gap-3 border-2 border-[#DE3412] bg-[#FDEFEC]'
          : 'border border-gray-200 bg-white',
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <span className="truncate text-body-medium font-medium text-gray-900">{file.name}</span>

        {file.status === 'uploading' && (
          <RefreshIcon className="size-5 shrink-0 animate-spin text-gray-900" />
        )}

        {file.status === 'success' && (
          <CheckCircleIcon className="size-5 shrink-0 text-primary-400" />
        )}

        {(file.status === 'idle' || file.status === 'error') && (
          <FileActionButton
            icon={<CloseIcon className="size-4" />}
            onClick={() => onRemove?.(file.id)}
          >
            삭제
          </FileActionButton>
        )}

        {file.status === 'uploaded' && (
          <div className="flex shrink-0 gap-2">
            <FileActionButton
              icon={<DownloadIcon className="size-4" />}
              onClick={() => onDownload?.(file.id)}
            >
              다운로드
            </FileActionButton>

            <FileActionButton
              icon={<ChevronRightIcon className="size-4" />}
              onClick={() => onPreview?.(file.id)}
            >
              바로보기
            </FileActionButton>
          </div>
        )}
      </div>

      {isError && file.errorMessage && (
        <p className="flex items-start gap-1 text-body-medium font-medium whitespace-pre-line text-danger-500">
          <CloseCircleIcon className="size-5 shrink-0" />
          {file.errorMessage}
        </p>
      )}
    </div>
  );
}

export default function FileUpload({
  title,
  description,
  files,
  maxFiles = 10,
  onSelectFiles,
  onRemove,
  onClearAll,
  onDownload,
  onPreview,
  className,
}: FileUploadProps) {
  const inputId = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) onSelectFiles?.(event.target.files);
    event.target.value = '';
  };

  return (
    <div
      className={cn(
        'flex w-[1060px] flex-col items-start gap-6 rounded-md border border-[#B1B8BE] bg-white p-10',
        className,
      )}
    >
      <div className="flex flex-col gap-5">
        <h3 className="text-heading-medium font-bold text-gray-900">{title}</h3>

        {description && (
          <p className="text-body-medium font-medium text-[#464C53]">{description}</p>
        )}
      </div>

      <div className="flex w-full flex-col items-center gap-3 rounded-sm border border-dashed border-gray-200 px-10 py-10 text-center">
        <span className="text-body-large font-medium text-gray-900">
          첨부할 파일을 여기에 끌어다 놓거나 파일 선택 버튼을 직접 선택해주세요.
        </span>

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="inline-flex h-12 min-w-[78px] items-center justify-center gap-1 rounded-[6px] bg-primary-400 px-4 text-body-medium font-normal text-white"
        >
          파일선택
        </button>

        <input
          id={inputId}
          ref={fileInputRef}
          type="file"
          multiple
          className="sr-only"
          onChange={handleChange}
        />
      </div>

      <div className="flex w-full items-center justify-between">
        <span className="text-body-large font-bold text-gray-900">
          <span className="text-primary-400">{files.length}개</span> / {maxFiles}개
        </span>

        <FileActionButton icon={<CloseIcon className="size-4" />} onClick={onClearAll}>
          전체 삭제
        </FileActionButton>
      </div>

      <div className="flex w-full flex-col gap-2">
        {files.map((file) => (
          <FileUploadRow
            key={file.id}
            file={file}
            onRemove={onRemove}
            onDownload={onDownload}
            onPreview={onPreview}
          />
        ))}
      </div>
    </div>
  );
}
