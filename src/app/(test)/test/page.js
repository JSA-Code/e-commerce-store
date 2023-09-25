import Skeleton from 'react-loading-skeleton';

export default function MyPage() {
  return (
    <div className="my-28">
      <h1 className="text-red-800 font-extrabold">My Page</h1>
      <Skeleton count={3} width={200} height={200} />
    </div>
  );
}
