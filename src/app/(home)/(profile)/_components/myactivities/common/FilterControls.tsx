type FilterControlsProps = {
  selectedCategory: 'all' | 'qna' | 'forum' | 'archive';
  selectedForumCategory: string | null;
  selectedType: 'all' | 'post' | 'comment';
  onCategoryChange: (category: 'all' | 'qna' | 'forum' | 'archive') => void;
  onForumCategoryChange: (category: string | null) => void;
  onTypeChange: (type: 'all' | 'post' | 'comment') => void;
  forumCategories: string[];
};

const FilterControls = ({
  selectedCategory,
  selectedForumCategory,
  selectedType,
  onCategoryChange,
  onForumCategoryChange,
  onTypeChange,
  forumCategories
}: FilterControlsProps) => {
  return (
    <div className="mb-4">
      <button
        onClick={() => {
          onCategoryChange('all');
          onForumCategoryChange(null);
        }}
        className="mr-2"
      >
        All
      </button>
      <button
        onClick={() => {
          onCategoryChange('qna');
          onForumCategoryChange(null);
        }}
        className="mr-2"
      >
        Q&A
      </button>
      <select
        onChange={(e) => {
          const value = e.target.value;
          if (value === '전체') {
            onCategoryChange('forum');
            onForumCategoryChange(null);
          } else {
            onCategoryChange('forum');
            onForumCategoryChange(value);
          }
        }}
        value={selectedForumCategory || '전체'}
        className="top-full left-0 mt-2 bg-white border border-gray-300 rounded shadow-lg z-10"
      >
        {['전체', ...forumCategories].map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <button
        onClick={() => {
          onCategoryChange('archive');
          onForumCategoryChange(null);
        }}
        className="mr-2"
      >
        Archive
      </button>
      <div className="mb-4">
        <select
          onChange={(e) => onTypeChange(e.target.value as 'all' | 'post' | 'comment')}
          value={selectedType}
          className="bg-white border border-gray-300 rounded shadow-lg"
        >
          <option value="all">전체</option>
          <option value="post">게시글</option>
          <option value="comment">댓글</option>
        </select>
      </div>
    </div>
  );
};

export default FilterControls;
