import { useEffect, useRef, useState } from "react";
import { PlusCircle, SquarePen } from "lucide-react";
import type { Task } from "../types/task";

interface Props {
  editingTask?: Task | null;
  onSubmit: (data: {
    title: string;
    description: string;
  }) => Promise<void> | void;
  onCancel: () => void;
}

const TaskForm = ({
  editingTask,
  onSubmit,
  onCancel,
}: Props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description || "");
    } else {
      setTitle("");
      setDescription("");
    }

    setTimeout(() => {
      titleRef.current?.focus();
    }, 100);
  }, [editingTask]);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!title.trim()) {
      titleRef.current?.focus();
      return;
    }

    try {
      setLoading(true);

      await onSubmit({
        title: title.trim(),
        description: description.trim(),
      });

      if (!editingTask) {
        setTitle("");
        setDescription("");
        titleRef.current?.focus();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-8 rounded-2xl border border-slate-200 bg-white shadow-lg">

      <div className="flex items-center gap-3 border-b border-slate-200 px-6 py-4">

        <div className="rounded-xl bg-blue-100 p-2">

          {editingTask ? (
            <SquarePen
              size={22}
              className="text-blue-600"
            />
          ) : (
            <PlusCircle
              size={22}
              className="text-blue-600"
            />
          )}

        </div>

        <div>

          <h2 className="text-xl font-bold text-slate-800">

            {editingTask
              ? "Edit Task"
              : "Create New Task"}

          </h2>

          <p className="text-sm text-slate-500">
            {editingTask
              ? "Update your existing task."
              : "Add a new task to your dashboard."}
          </p>

        </div>

      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 p-6"
      >

        <div>

          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Title
          </label>

          <input
            ref={titleRef}
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            placeholder="Enter task title"
            maxLength={100}
            disabled={loading}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:bg-slate-100"
          />

        </div>

        <div>

          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Description
          </label>

          <textarea
            rows={5}
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            placeholder="Write task description..."
            disabled={loading}
            className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:bg-slate-100"
          />

        </div>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

          {editingTask && (
            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
              className="rounded-xl border border-slate-300 px-6 py-3 font-medium transition hover:bg-slate-100 disabled:opacity-50"
            >
              Cancel
            </button>
          )}

          <button
            type="submit"
            disabled={
              loading ||
              title.trim().length === 0
            }
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">

                <svg
                  className="h-5 w-5 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="white"
                    strokeWidth="4"
                    opacity=".3"
                  />

                  <path
                    d="M22 12a10 10 0 0 1-10 10"
                    stroke="white"
                    strokeWidth="4"
                  />
                </svg>

                {editingTask
                  ? "Updating..."
                  : "Creating..."}

              </span>
            ) : editingTask ? (
              "Update Task"
            ) : (
              "Create Task"
            )}
          </button>

        </div>

      </form>

    </div>
  );
};

export default TaskForm;