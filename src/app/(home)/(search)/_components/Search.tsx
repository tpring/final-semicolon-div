import SearchPostCard from './SearchPostCard';
import { ToastContainer } from 'react-toastify';

const Search = () => {
  /* 
  url 에서 검색어 가져오기

  (archive_posts, forum_posts, qna_posts)정보를 가져오기
  부과적인 정보 (좋아요수, 댓글수, 작성자 유저 정보, 테그)와 연결

  api 합친 배열에서 검색어로 필터링 

   */

  /* 
  import { useRouter, useSearchParams } from 'next/navigation';

    const router = useRouter();

  const searchParams = useSearchParams();
  
  const searchedKeyword = searchParams.get('keyword');

    const handleSearch = (keyword: string) => {
    router.push(`/search?keyword=${keyword}`);
  };
   */

  return (
    <div>
      <ToastContainer />

      <div className="flex ">
        <div>검색 결과가 없습니다.</div>

        <div className="flex flex-col ">
          <p>(검색어) 검색 결과</p>
          {/* paginatedItems.length */}
          <p>전체 ()</p>
          <p>필터 (최신순)</p>

          <SearchPostCard />
        </div>
      </div>
    </div>
  );
};

export default Search;
