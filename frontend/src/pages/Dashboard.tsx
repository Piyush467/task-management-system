import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import LoadingSpinner from "../components/LoadingSpinner";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import DeleteConfirmModal from "../components/DeleteConfirmModal";

import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../services/task.service";

import type { Task } from "../types/task";
import EmptyState from "../components/EmptyState";

const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const [loading, setLoading] = useState(true);

  const [editingTask, setEditingTask] =
    useState<Task | null>(null);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("all");

  const [deleteTaskId, setDeleteTaskId] = useState<string | null>(null);

  const [deleteLoading, setDeleteLoading] =
    useState(false);

  const loadTasks = async () => {
    try {
      setLoading(true);

      const res = await getTasks();

      setTasks(res.data.data.tasks);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleCreateOrUpdate = async (
    data: {
      title: string;
      description: string;
    }
  ) => {
    try {
      if (editingTask) {
        await updateTask(
          editingTask._id,
          data
        );

        setEditingTask(null);
      } else {
        await createTask(data);
        toast.success("Task created");
      }

      loadTasks();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (!deleteTaskId) return;

    try {
      setDeleteLoading(true);

      await deleteTask(deleteTaskId);

      toast.success("Task deleted");

      await loadTasks();

      setDeleteTaskId(null);
    } catch (err) {
      console.error(err);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleStatusChange = async (
    task: Task,
    status: Task["status"]
  ) => {
    try {
      await updateTask(task._id, {
        status,
      });

      loadTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        task.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        (task.description || "")
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "all"
          ? true
          : task.status === statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [
    tasks,
    search,
    statusFilter,
  ]);

  const stats = {
    total: tasks.length,

    todo: tasks.filter(
      (t) => t.status === "todo"
    ).length,

    progress: tasks.filter(
      (t) => t.status === "in_progress"
    ).length,

    done: tasks.filter(
      (t) => t.status === "done"
    ).length,
  };

  return (
    <div>

      <div className="mb-8 flex items-center justify-between">

        <h1 className="text-4xl font-bold">
          My Tasks
        </h1>

        <span className="rounded bg-blue-600 px-4 py-2 text-white">
          {tasks.length} Tasks
        </span>

      </div>

      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">

        <div className="rounded-xl bg-white p-5 shadow">
          <p className="text-gray-500">
            Total Tasks
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {stats.total}
          </h2>
        </div>

        <div className="rounded-xl bg-red-50 p-5 shadow">

          <p className="text-red-500">
            Todo
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {stats.todo}
          </h2>

        </div>

        <div className="rounded-xl bg-yellow-50 p-5 shadow">

          <p className="text-yellow-600">
            In Progress
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {stats.progress}
          </h2>

        </div>

        <div className="rounded-xl bg-green-50 p-5 shadow">

          <p className="text-green-600">
            Completed
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {stats.done}
          </h2>

        </div>

      </div>

      <TaskForm
        editingTask={editingTask}
        onSubmit={
          handleCreateOrUpdate
        }
        onCancel={() =>
          setEditingTask(null)
        }
      />



      <div className="my-8 flex flex-col gap-4 md:flex-row">

        <SearchBar
          value={search}
          onChange={setSearch}
        />

        <FilterBar
          value={statusFilter}
          onChange={setStatusFilter}
        />

      </div>



      {loading ? (
        <div className="py-16 text-center text-lg">
          <LoadingSpinner />
        </div>
      ) : filteredTasks.length ===
        0 ? (
        <EmptyState
          title="No Tasks Found"
          subtitle="Create your first task above."
        />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {filteredTasks.map(
            (task) => (
              <TaskCard
                key={task._id}
                task={task}
                onDelete={(id) => setDeleteTaskId(id)}
                onEdit={setEditingTask}
                onStatusChange={handleStatusChange}
              />
            )
          )}

        </div>
      )}
      <DeleteConfirmModal
        isOpen={!!deleteTaskId}
        loading={deleteLoading}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTaskId(null)}
      />

    </div>
  );
};

export default Dashboard;