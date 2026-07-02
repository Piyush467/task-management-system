interface Props {
  status: "todo" | "in_progress" | "done";
}

const styles = {
  todo: "bg-red-100 text-red-700",

  in_progress:
    "bg-yellow-100 text-yellow-700",

  done: "bg-green-100 text-green-700",
};

const labels = {
  todo: "Todo",

  in_progress: "In Progress",

  done: "Completed",
};

const StatusBadge = ({
  status,
}: Props) => {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
};

export default StatusBadge;