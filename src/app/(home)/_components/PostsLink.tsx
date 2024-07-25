import Link from 'next/link';

const PostsLink = () => {
  return (
    <div className="flex justify-between items-center gap-5 mt-5">
      <div style={{ backgroundImage: `url('/assets/images/mainPageQna.png')` }}>
        <Link
          href={'/qna'}
          className="bg-slate-200 w-1/3 h-44 flex flex-col justify-end p-5 rounded-2xl gap-1 text-white "
        >
          <div>
            <p>지식을 나누는 즐거움</p>
            Q&A <span className="text-xl">›</span>
          </div>
        </Link>
      </div>
      <div>
        <Link
          href={'/conference'}
          className="bg-slate-200 w-1/3 h-44 flex flex-col justify-end p-5 rounded-2xl gap-1 text-white"
        >
          <div>
            <p>코드로 그려가는 일상</p>
            포럼 <span className="text-xl">›</span>
          </div>
        </Link>
      </div>
      <div>
        <Link
          href={'/archiving'}
          className="bg-slate-200 w-1/3 h-44 flex flex-col justify-end p-5 rounded-2xl gap-1 text-white "
        >
          <div>
            <p>다채로운 코드의 매력</p>
            라이브러리 <span className="text-xl">›</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default PostsLink;
