import { useState } from 'react';
import Badge from '@/components/common/Badge';
import Button from '@/components/common/Button';
import CarouselArrow from '@/components/common/CarouselArrow';
import CarouselIndicator from '@/components/common/CarouselIndicator';
import DetailListCard from '@/components/common/DetailListCard';
import Input from '@/components/common/Input';
import ListCard from '@/components/common/ListCard';
import Modal from '@/components/common/Modal';
import Tab from '@/components/common/Tab';
import TableCell from '@/components/common/TableCell';
import Tag from '@/components/common/Tag';
import JobCard from '@/features/jobs/components/JobCard';

const placeholderImage =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"><rect width="1" height="1" fill="#e9ecef"/></svg>',
  );

export default function PlaygroundPage() {
  const [tags, setTags] = useState(['태그', '태그', '태그']);
  const [comment, setComment] = useState('');

  function handleRemoveTag(index: number) {
    setTags((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <div className="flex flex-col gap-4 p-6">
      <h1 className="text-xl font-bold">Component Playground</h1>
      <section>
        <h2 className="mb-2 text-sm font-semibold text-gray-500">Button</h2>
        <div className="flex gap-2">
          <Button variant="solid">버튼</Button>
          <Button variant="outline">버튼</Button>
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
        <h2 className="mb-2 text-sm font-semibold text-gray-500">Modal</h2>
        <Modal
          title="Title"
          footer={
            <>
              <Button variant="outline">버튼</Button>
              <Button variant="solid">버튼</Button>
            </>
          }
        >
          <p className="w-full text-base font-medium text-text-secondary">Recommend</p>
          <div className="flex w-full gap-2.5">
            {tags.map((tag, index) => (
              <Tag key={`${tag}-${index}`} label={tag} onRemove={() => handleRemoveTag(index)} />
            ))}
          </div>
          <label className="flex w-full flex-col gap-2 text-base font-medium text-text-secondary">
            Comment
            <Input
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              placeholder="내용을 입력하세요"
            />
          </label>
        </Modal>
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
