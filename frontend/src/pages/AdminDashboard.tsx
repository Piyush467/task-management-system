import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
    ClipboardList,
    CheckCircle2,
    Clock3,
    LoaderCircle,
    Trash2,
    User,
    Mail,
} from "lucide-react";

import {
    deleteTask,
    getAllTasks,
} from "../services/admin.service";

import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import DeleteConfirmModal from "../components/DeleteConfirmModal";

interface Task {
    _id: string;
    title: string;
    description: string;
    status: string;

    owner: {
        name: string;
        email: string;
        role: string;
    };

    createdAt: string;
}

const badgeColor = (status: string) => {
    switch (status) {
        case "todo":
            return "bg-red-100 text-red-700";

        case "in_progress":
            return "bg-yellow-100 text-yellow-700";

        case "done":
            return "bg-green-100 text-green-700";

        default:
            return "bg-gray-100 text-gray-700";
    }
};

const AdminDashboard = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    const [loading, setLoading] = useState(true);

    const [deleteId, setDeleteId] =
        useState<string | null>(null);

    const [deleteLoading, setDeleteLoading] =
        useState(false);

    const loadTasks = async () => {
        try {
            setLoading(true);

            const res = await getAllTasks();

            setTasks(res.data.data.tasks);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTasks();
    }, []);

    const handleDelete = async () => {
        if (!deleteId) return;

        try {
            setDeleteLoading(true);

            await deleteTask(deleteId);

            toast.success("Task deleted");

            setDeleteId(null);

            loadTasks();
        } finally {
            setDeleteLoading(false);
        }
    };

    const stats = useMemo(() => {
        return {
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
    }, [tasks]);

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div className="space-y-8">

            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">

                <div>

                    <h1 className="text-3xl font-bold">
                        Admin Dashboard
                    </h1>

                    <p className="text-gray-500">
                        Manage every user's tasks.
                    </p>

                </div>

            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                <div className="rounded-xl bg-white p-5 shadow">

                    <ClipboardList className="mb-3 text-blue-600" />

                    <h3 className="text-sm text-gray-500">
                        Total Tasks
                    </h3>

                    <p className="text-3xl font-bold">
                        {stats.total}
                    </p>

                </div>

                <div className="rounded-xl bg-white p-5 shadow">

                    <Clock3 className="mb-3 text-red-600" />

                    <h3 className="text-sm text-gray-500">
                        Todo
                    </h3>

                    <p className="text-3xl font-bold">
                        {stats.todo}
                    </p>

                </div>

                <div className="rounded-xl bg-white p-5 shadow">

                    <LoaderCircle className="mb-3 text-yellow-500" />

                    <h3 className="text-sm text-gray-500">
                        In Progress
                    </h3>

                    <p className="text-3xl font-bold">
                        {stats.progress}
                    </p>

                </div>

                <div className="rounded-xl bg-white p-5 shadow">

                    <CheckCircle2 className="mb-3 text-green-600" />

                    <h3 className="text-sm text-gray-500">
                        Completed
                    </h3>

                    <p className="text-3xl font-bold">
                        {stats.done}
                    </p>

                </div>

            </div>

            {tasks.length === 0 ? (
                <EmptyState
                    title="No Tasks"
                    subtitle="No task exists yet."
                />
            ) : (
                <>
                    {/* Desktop */}

                    <div className="hidden overflow-hidden rounded-2xl bg-white shadow lg:block">

                        <table className="min-w-full">

                            <thead className="bg-gray-100">

                                <tr>

                                    <th className="px-6 py-4 text-left">
                                        Task
                                    </th>

                                    <th className="px-6 py-4 text-left">
                                        Owner
                                    </th>

                                    <th className="px-6 py-4 text-left">
                                        Status
                                    </th>

                                    <th className="px-6 py-4 text-left">
                                        Created
                                    </th>

                                    <th className="px-6 py-4 text-center">
                                        Action
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {tasks.map((task) => (
                                    <tr
                                        key={task._id}
                                        className="border-t hover:bg-gray-50"
                                    >
                                        <td className="px-6 py-5">

                                            <h3 className="font-semibold">
                                                {task.title}
                                            </h3>

                                            <p className="mt-1 text-sm text-gray-500">
                                                {task.description}
                                            </p>

                                        </td>

                                        <td className="px-6 py-5">

                                            <div className="font-medium">
                                                {task.owner.name}
                                            </div>

                                            <div className="text-sm text-gray-500">
                                                {task.owner.email}
                                            </div>

                                        </td>

                                        <td className="px-6 py-5">

                                            <span
                                                className={`rounded-full px-3 py-1 text-sm font-semibold ${badgeColor(task.status)}`}
                                            >
                                                {task.status.replace(
                                                    "_",
                                                    " "
                                                )}
                                            </span>

                                        </td>

                                        <td className="px-6 py-5">

                                            {new Date(
                                                task.createdAt
                                            ).toLocaleDateString()}

                                        </td>

                                        <td className="px-6 py-5 text-center">

                                            <button
                                                onClick={() =>
                                                    setDeleteId(task._id)
                                                }
                                                className="rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
                                            >
                                                Delete
                                            </button>

                                        </td>
                                    </tr>
                                ))}

                            </tbody>

                        </table>

                    </div>

                    {/* Mobile */}

                    <div className="grid gap-5 lg:hidden">

                        {tasks.map((task) => (
                            <div
                                key={task._id}
                                className="rounded-2xl bg-white p-5 shadow"
                            >
                                <div className="flex items-center justify-between">

                                    <h2 className="text-lg font-bold">
                                        {task.title}
                                    </h2>

                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeColor(task.status)}`}
                                    >
                                        {task.status.replace(
                                            "_",
                                            " "
                                        )}
                                    </span>

                                </div>

                                <p className="mt-3 text-gray-600">
                                    {task.description}
                                </p>

                                <div className="mt-5 space-y-2 text-sm">

                                    <div className="flex items-center gap-2">

                                        <User size={16} />

                                        {task.owner.name}

                                    </div>

                                    <div className="flex items-center gap-2">

                                        <Mail size={16} />

                                        {task.owner.email}

                                    </div>

                                    <div>
                                        Created{" "}
                                        {new Date(
                                            task.createdAt
                                        ).toLocaleDateString()}
                                    </div>

                                </div>

                                <button
                                    onClick={() =>
                                        setDeleteId(task._id)
                                    }
                                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 py-3 font-medium text-white"
                                >
                                    <Trash2 size={18} />

                                    Delete

                                </button>

                            </div>
                        ))}

                    </div>
                </>
            )}

            <DeleteConfirmModal
                isOpen={!!deleteId}
                loading={deleteLoading}
                onConfirm={handleDelete}
                onCancel={() => setDeleteId(null)}
            />

        </div>
    );
};
export default AdminDashboard;