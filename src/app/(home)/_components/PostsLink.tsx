import Link from 'next/link';

const PostsLink = () => {
  return (
    <div className="flex justify-between items-center gap-5 mt-5">
      <div className="bg-slate-200 w-1/3 h-44 flex flex-col justify-around p-5 rounded-2xl gap-5 ">
        <p>Forum Title</p>
        <div className=" w-24 bg-white text-center rounded text-base">
          <Link href={'/forum'}>바로가기</Link>
        </div>
      </div>
      <div className="bg-slate-200 w-1/3 h-44 flex flex-col justify-around p-5 rounded-2xl gap-5">
        <p>Q&A Title</p>
        <div className=" w-24 bg-white text-center  rounded text-base">
          <Link href={'/forum'}>바로가기</Link>
        </div>
      </div>
      <div className="bg-slate-200 w-1/3 h-44 flex flex-col justify-around p-5 rounded-2xl gap-5 ">
        <p>Archiving Title</p>
        <div className=" w-24 bg-white text-center rounded text-base">
          <Link href={'/forum'}>바로가기</Link>
        </div>
      </div>
    </div>
  );
};

export default PostsLink;
