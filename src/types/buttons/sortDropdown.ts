export type SortOption = {
  value: string;
  label: string;
};

export type SortDropdownProps = {
  sortBy: string;
  handleSortChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  sortOptions: SortOption[];
};
