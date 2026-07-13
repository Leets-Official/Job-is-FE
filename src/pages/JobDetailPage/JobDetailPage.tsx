import { useParams } from 'react-router';

export default function JobDetailPage() {
  const { id } = useParams<{ id: string }>();

  return <div>채용 상세 - {id}</div>;
}
