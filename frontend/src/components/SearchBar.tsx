interface Props {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({
  value,
  onChange,
}: Props) => {
  return (
    <input
      type="text"
      placeholder="Search tasks..."
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
      }
      className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500"
    />
  );
};

export default SearchBar;