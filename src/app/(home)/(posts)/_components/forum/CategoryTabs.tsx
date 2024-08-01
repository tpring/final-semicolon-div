import { CategoryTabsProps } from '@/types/posts/forumTypes';

const CategoryTabs = ({ categories, activeCategory, handleCategoryClick }: CategoryTabsProps) => {
  return (
    <div className="category-tabs flex justify-start items-center gap-4">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleCategoryClick(category)}
          className={`${
            activeCategory === category ? 'bg-main-50 border-none' : 'bg-white border border-[#dbdbdb]'
          } flex justify-center items-center flex-grow-0 flex-shrink-0 h-10 relative gap-2 px-6 py-2 rounded-lg`}
        >
          <span
            className={`flex-grow-0 flex-shrink-0 text-body1 font-medium text-left ${
              activeCategory === category ? 'text-main-500' : 'text-neutral-900'
            }`}
          >
            {category}
          </span>
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
