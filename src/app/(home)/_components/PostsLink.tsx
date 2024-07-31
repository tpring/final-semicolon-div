import Link from 'next/link';
import mainPageQna from '@/assets/images/main-page_image/mainPageQna.png';
import mainPageForum from '@/assets/images/main-page_image/mainPageForum.png';
import mainPageArchiving from '@/assets/images/main-page_image/mainPageArchiving.png';

const PostsLink = () => {
  return (
    <div className="flex justify-between items-center gap-5 mt-5">
      <Link
        href={'/qna'}
        className="bg-slate-200 w-1/3 h-[234px] flex flex-col justify-end p-5 rounded-2xl gap-1 text-white  "
        style={{ backgroundImage: `url(${mainPageQna.src})` }}
      >
        <div>
          <p>지식을 나누는 즐거움</p>
          Q&A <span className="text-xl">›</span>
        </div>
      </Link>
      <Link
        href={'/forum'}
        className="bg-slate-200 w-1/3 h-[234px] flex flex-col justify-end p-5 rounded-2xl gap-1 text-white "
        style={{ backgroundImage: `url(${mainPageForum.src})` }}
      >
        <div>
          <p>코드로 그려가는 일상</p>
          포럼 <span className="text-xl">›</span>
        </div>
      </Link>
      <Link
        href={'/archive'}
        className="bg-slate-200 w-1/3 h-[234px] flex flex-col justify-end p-5 rounded-2xl gap-1 text-white "
        style={{ backgroundImage: `url(${mainPageArchiving.src})` }}
      >
        <div>
          <p>다채로운 코드의 매력</p>
          라이브러리 <span className="text-xl">›</span>
        </div>
      </Link>
    </div>
  );
};

export default PostsLink;
