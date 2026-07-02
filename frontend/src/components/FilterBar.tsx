interface Props {
  value: string;
  onChange: (value: string) => void;
}

const FilterBar = ({
  value,
  onChange,
}: Props) => {
  return (
    <select
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
      }
      className="rounded-lg border border-gray-300 p-3"
    >
      <option value="all">All</option>
      <option value="todo">Todo</option>
      <option value="in_progress">
        In Progress
      </option>
      <option value="done">Done</option>
    </select>
  );
};

export default FilterBar;