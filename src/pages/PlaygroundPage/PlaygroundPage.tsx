import { useState } from 'react';
import ArrowRightIcon from '@/assets/icons/icon-arrow-right.svg?react';
import CheckCircleIcon from '@/assets/icons/icon-check-circle.svg?react';
import {
  Badge,
  Button,
  CarouselArrow,
  CarouselIndicator,
  Checkbox,
  ModalCheckbox,
  DetailListCard,
  FileUpload,
  type FileUploadItem,
  Link,
  ListCard,
  RadioButton,
  Rate,
  Select,
  Tab,
  TableCell,
  Tag,
  ModalTagComment,
  TextInput,
  ToggleSwitch,
} from '@/components/common';
import JobCard from '@/features/jobs/components/JobCard';

const placeholderImage =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"><rect width="1" height="1" fill="#e9ecef"/></svg>',
  );

const INITIAL_FILES: FileUploadItem[] = [
  { id: '1', name: '파일명을 입력해주세요 [PDF,20KB]', status: 'uploading' },
  { id: '2', name: '파일명을 입력해주세요 [PDF,20KB]', status: 'success' },
  { id: '3', name: '파일명을 입력해주세요 [PDF,20KB]', status: 'idle' },
  {
    id: '4',
    name: '파일명을 입력해주세요 [PDF,20KB]',
    status: 'error',
    errorMessage: '등록 가능한 파일 용량을 초과하였습니다.\n20MB 미만의 파일만 등록할 수 있습니다.',
  },
  { id: '5', name: '파일명을 입력해주세요 [PDF,20KB]', status: 'uploaded' },
];

export default function PlaygroundPage() {
  const [tags, setTags] = useState(['태그', '태그', '태그']);
  const [comment, setComment] = useState('');
  const [files, setFiles] = useState(INITIAL_FILES);

  function handleRemoveTag(index: number) {
    setTags((prev) => prev.filter((_, i) => i !== index));
  }

  const handleRemove = (id: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== id));
  };

  const handleSelectFiles = (fileList: FileList) => {
    const newItems: FileUploadItem[] = Array.from(fileList).map((file, index) => ({
      id: `${Date.now()}-${index}`,
      name: `${file.name} [${Math.ceil(file.size / 1024)}KB]`,
      status: 'idle',
    }));
    setFiles((prev) => [...prev, ...newItems]);
  };

  return (
    <div className="flex flex-col gap-8 p-6">
      <h1 className="text-xl font-bold">Component Playground</h1>

      <section>
        <h2 className="mb-3 text-sm font-semibold text-gray-500">Button (버튼)</h2>
        <div className="flex gap-8 rounded-lg border border-gray-200 p-6">
          <div className="flex shrink-0 flex-col gap-3">
            <span className="text-sm font-bold text-gray-900">Default</span>
            <Button variant="solid">
              <CheckCircleIcon className="size-6" />
              버튼
              <ArrowRightIcon className="size-6" />
            </Button>
          </div>
          <div className="flex shrink-0 flex-col gap-3">
            <span className="text-sm font-bold text-gray-900">Outline</span>
            <Button variant="outline">
              <CheckCircleIcon className="size-6" />
              버튼
              <ArrowRightIcon className="size-6" />
            </Button>
          </div>
          <div className="flex shrink-0 flex-col gap-3">
            <span className="text-sm font-bold text-gray-900">Hover</span>
            <Button variant="solid" className="bg-primary-500">
              <CheckCircleIcon className="size-6" />
              버튼
              <ArrowRightIcon className="size-6" />
            </Button>
          </div>
          <div className="flex shrink-0 flex-col gap-3">
            <span className="text-sm font-bold text-gray-900">Pressed</span>
            <Button variant="solid" className="bg-primary-600">
              <CheckCircleIcon className="size-6" />
              버튼
              <ArrowRightIcon className="size-6" />
            </Button>
          </div>
          <div className="flex shrink-0 flex-col gap-3">
            <span className="text-sm font-bold text-gray-900">Disabled</span>
            <Button variant="solid" disabled>
              <CheckCircleIcon className="size-6" />
              버튼
              <ArrowRightIcon className="size-6" />
            </Button>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-2 text-sm font-semibold text-gray-500">Badge</h2>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Badge type="outline" color="primary">
              Badge
            </Badge>
            <Badge type="outline" color="ok">
              Badge
            </Badge>
            <Badge type="outline" color="warn">
              Badge
            </Badge>
            <Badge type="outline" color="est">
              Badge
            </Badge>
            <Badge type="outline" color="disabled">
              Badge
            </Badge>
          </div>
          <div className="flex gap-2">
            <Badge type="solid" color="primary">
              Badge
            </Badge>
            <Badge type="solid" color="ok">
              Badge
            </Badge>
            <Badge type="solid" color="warn">
              Badge
            </Badge>
            <Badge type="solid" color="est">
              Badge
            </Badge>
            <Badge type="solid" color="disabled">
              Badge
            </Badge>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold text-gray-500">Checkbox (체크박스)</h2>
        <div className="flex flex-col gap-4 rounded-lg border border-gray-200 p-6">
          <Checkbox id="checkbox-unchecked" label="Checkbox" />
          <Checkbox id="checkbox-disabled" label="Checkbox" disabled />
          <Checkbox id="checkbox-checked" label="Checkbox" defaultChecked />
          <Checkbox id="checkbox-disabled-checked" label="Checkbox" disabled defaultChecked />
        </div>
      </section>

      <section>
        <h2 className="mb-2 text-sm font-semibold text-gray-500">ListCard</h2>
        <div className="flex flex-col gap-2">
          <ListCard heading="Title" caption="Description" className="max-w-[414px]" />
          <ListCard
            heading="Description"
            caption="Title"
            captionPosition="top"
            className="max-w-[414px]"
          />
          <ListCard
            badge={
              <Badge type="outline" color="primary">
                Badge
              </Badge>
            }
            heading="Title"
            caption="Description"
            linkLabel="자세히 보기"
            linkHref="#"
            className="max-w-[414px]"
          />
        </div>
      </section>

      <section>
        <h2 className="mb-2 text-sm font-semibold text-gray-500">DetailListCard</h2>
        <DetailListCard
          title="Title"
          rows={[
            { label: '경력', value: '신입' },
            { label: '학력', value: '무관' },
            { label: '근무형태', value: '정규직' },
            { label: '마감일', value: '2026-08-01' },
          ]}
          className="max-w-[414px]"
        />
      </section>

      <section>
        <h2 className="mb-2 text-sm font-semibold text-gray-500">CarouselIndicator</h2>
        <div className="flex gap-2">
          <CarouselIndicator variant="number" current={1} total={5} />
          <CarouselIndicator variant="dot" total={5} activeIndex={0} />
        </div>
      </section>

      <section>
        <h2 className="mb-2 text-sm font-semibold text-gray-500">CarouselArrow</h2>
        <div className="flex gap-2">
          <CarouselArrow direction="left" />
          <CarouselArrow direction="right" />
        </div>
      </section>

      <section>
        <h2 className="mb-2 text-sm font-semibold text-gray-500">ModalTagComment</h2>
        <ModalTagComment
          title="Title"
          tagLabel="Recommend"
          tags={tags}
          onRemoveTag={handleRemoveTag}
          commentLabel="Comment"
          commentValue={comment}
          onCommentChange={setComment}
          commentPlaceholder="내용을 입력하세요"
          footer={
            <>
              <Button variant="outline">버튼</Button>
              <Button variant="solid">버튼</Button>
            </>
          }
        />
      </section>

      <section>
        <h2 className="mb-2 text-sm font-semibold text-gray-500">ModalCheckbox</h2>
        <div className="flex flex-col gap-2">
          <ModalCheckbox
            title="Title"
            description="Source"
            checkboxLabel="Indication of intent to apply"
            footer={
              <>
                <Button variant="outline">버튼</Button>
                <Button variant="solid">버튼</Button>
              </>
            }
          />
          <ModalCheckbox
            title="Title"
            description="Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description"
            checkboxLabel="Checkbox"
            defaultChecked
            footer={
              <>
                <Button variant="outline">버튼</Button>
                <Button variant="solid">버튼</Button>
              </>
            }
          />
        </div>
      </section>

      <section>
        <h2 className="mb-2 text-sm font-semibold text-gray-500">Tab</h2>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Tab label="label" active />
            <Tab label="label" />
          </div>
          <div className="flex gap-2">
            <Tab variant="underline" label="label" active />
            <Tab variant="underline" label="label" />
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-2 text-sm font-semibold text-gray-500">Table</h2>
        <table className="w-full max-w-[800px] border-collapse">
          <thead>
            <tr>
              <TableCell variant="header">제목</TableCell>
              <TableCell variant="header">제목</TableCell>
            </tr>
          </thead>
          <tbody>
            <tr>
              <TableCell>내용</TableCell>
              <TableCell>
                표는 데이터를 하나 이상의 행과 열로 조직화하여 표현하는 형식으로 사용자가 빠르게
                많은 양의 정보를 확인하고 비교할 수 있도록 도와준다.
              </TableCell>
            </tr>
            <tr>
              <TableCell>내용</TableCell>
              <TableCell>열의 최소 너비는 콘텐츠의 길이를 고려하여 설정한다.</TableCell>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold text-gray-500">Link (링크)</h2>
        <div className="flex gap-6">
          <Link href="#" variant="default">
            Default
          </Link>
          <Link href="#" variant="subtle">
            Subtle
          </Link>
          <Link href="#" variant="subtleNone">
            Subtle_none
          </Link>
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold text-gray-500">Radio button (라디오 버튼)</h2>
        <div className="flex flex-col gap-4 rounded-lg border border-gray-200 p-6">
          <RadioButton id="radio-unchecked" name="radio-demo-1" label="Radio button" />
          <RadioButton id="radio-disabled" name="radio-demo-2" label="Radio button" disabled />
          <RadioButton id="radio-checked" name="radio-demo-3" label="Radio button" defaultChecked />
          <RadioButton
            id="radio-disabled-checked"
            name="radio-demo-4"
            label="Radio button"
            disabled
            defaultChecked
          />
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold text-gray-500">Rate (비율)</h2>
        <div className="flex flex-col gap-4 rounded-lg border border-gray-200 p-6">
          <Rate value={0} />
          <span className="text-label-small text-gray-400">
            원티드 · 2026. 6. 28. 게시 <Rate value={4} className="text-gray-400" />
          </span>
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold text-gray-500">Select (셀렉트)</h2>
        <div className="max-w-sm rounded-lg border border-gray-200 p-6">
          <Select
            id="select-demo"
            label="레이블"
            helperText="입력시 필요한 정보를 입력해 주세요"
            placeholder="선택해주세요."
          >
            <option value="option-1">옵션 1</option>
            <option value="option-2">옵션 2</option>
          </Select>
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold text-gray-500">Tag (태그)</h2>
        <div className="flex gap-2 rounded-lg border border-gray-200 p-6">
          <Tag variant="removable" label="태그" />
          <Tag variant="add" label="태그" />
          <Tag variant="hash" label="태그" />
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold text-gray-500">Toggle switch (토글 스위치)</h2>
        <div className="flex flex-col gap-4 rounded-lg border border-gray-200 p-6">
          <div className="flex gap-4">
            <ToggleSwitch id="toggle-off" label="Off" />
            <ToggleSwitch id="toggle-off-disabled" label="Off disabled" disabled />
          </div>
          <div className="flex gap-4">
            <ToggleSwitch id="toggle-on" label="On" defaultChecked />
            <ToggleSwitch id="toggle-on-disabled" label="On disabled" disabled defaultChecked />
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold text-gray-500">Text input (텍스트 입력 필드)</h2>
        <div className="max-w-sm rounded-lg border border-gray-200 p-6">
          <TextInput
            id="text-input-demo"
            label="레이블"
            helperText="입력시 필요한 정보를 입력해 주세요"
            placeholder="내용을 입력하세요"
          />
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold text-gray-500">File upload (파일 업로드)</h2>
        <FileUpload
          title="타이틀영역"
          description="컨텐츠 영역"
          files={files}
          onSelectFiles={handleSelectFiles}
          onRemove={handleRemove}
          onClearAll={() => setFiles([])}
        />
      </section>

      <section>
        <h2 className="mb-2 text-sm font-semibold text-gray-500">JobCard (features/jobs)</h2>
        <JobCard
          thumbnailUrl={placeholderImage}
          dDayLabel="D-3"
          matchScoreLabel="92%"
          avatarUrl={placeholderImage}
          title="프론트엔드 개발자"
          companyName="[Company Name]"
          employmentInfo="정규직 · 경력무관"
        />
      </section>
    </div>
  );
}
