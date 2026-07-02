import type { Task } from "../types/task";
import StatusBadge from "./StatusBadge";

import {
  CalendarDays,
  Pencil,
  Trash2,
  RefreshCw,
} from "lucide-react";

interface Props {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (
    task: Task,
    status: Task["status"]
  ) => void;
}

const borderColor = {
  todo: "border-red-500",
  in_progress: "border-yellow-500",
  done: "border-green-500",
};

const TaskCard = ({
  task,
  onEdit,
  onDelete,
  onStatusChange,
}: Props) => {
  return (
    <div
      className={`group rounded-2xl border-l-4 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${borderColor[task.status]}`}
    >
      <div className="flex items-start justify-between gap-3">

        <div className="flex-1">

          <h2 className="break-words text-xl font-bold text-slate-800">
            {task.title}
          </h2>

          <div className="mt-2">
            <StatusBadge status={task.status} />
          </div>

        </div>

      </div>

      {task.description && (
        <p className="mt-5 whitespace-pre-wrap break-words text-[15px] leading-7 text-slate-600">
          {task.description}
        </p>
      )}

      <div className="mt-6 flex items-center gap-2 text-sm text-slate-500">

        <CalendarDays size={16} />

        <span>
          {new Date(task.createdAt).toLocaleString()}
        </span>

      </div>

      <hr className="my-6" />

      <div className="flex flex-col gap-4">

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">

          <label className="text-sm font-medium text-slate-600 whitespace-nowrap">
            Status
          </label>

          <select
            value={task.status}
            onChange={(e) =>
              onStatusChange(
                task,
                e.target.value as Task["status"]
              )
            }
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="todo">Todo</option>
            <option value="in_progress">
              In Progress
            </option>
            <option value="done">
              Completed
            </option>
          </select>

        </div>

        <div className="grid grid-cols-2 gap-3">

          <button
            onClick={() => onEdit(task)}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-600"
          >
            <Pencil size={16} />
            Edit
          </button>

          <button
            onClick={() => onDelete(task._id)}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            <Trash2 size={16} />
            Delete
          </button>

        </div>

      </div>

      <div className="mt-5 flex items-center gap-2 text-xs text-slate-400">

        <RefreshCw size={13} />

        Last updated automatically

      </div>

    </div>
  );
};

export default TaskCard;