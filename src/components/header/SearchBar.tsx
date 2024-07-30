import SearchButton from '@/assets/images/header/SearchButton';

const SearchBar = () => {
  return (
    <div className="absolute inset-x-0 mx-auto flex justify-center items-center border-2 border-neutral-400 rounded-md p-2 w-64 mt-9">
      <SearchButton />
      <input
        type="text"
        placeholder="검색어를 입력하세요"
        className="pr-3 w-full font-bold focus:outline-none text-neutral-400"
      />
    </div>
  );
};

export default SearchBar;
