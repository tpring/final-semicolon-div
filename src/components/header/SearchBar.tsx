const SearchBar = () => {
  return (
    <div className="absolute inset-x-0 mx-auto flex justify-center items-center border-2 border-blue-500 rounded-md p-2 w-64 mt-10">
      <SearchButton />
      <input
        type="text"
        placeholder="검색어를 입력하세요"
        className="hidden sm:inline pr-3 w-full font-bold focus:outline-none"
      />
    </div>
  );
};

export default SearchBar;
