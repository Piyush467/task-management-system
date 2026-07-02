interface DeleteConfirmModalProps {
  isOpen: boolean;
  title?: string;
  message?: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmModal = ({
  isOpen,
  title = "Delete Task",
  message = "Are you sure you want to delete this task? This action cannot be undone.",
  loading = false,
  onConfirm,
  onCancel,
}: DeleteConfirmModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">

      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">

        <div className="mb-5 flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <span className="text-xl">🗑️</span>
          </div>

          <div>
            <h2 className="text-xl font-bold">
              {title}
            </h2>

            <p className="text-sm text-gray-500">
              Confirmation Required
            </p>
          </div>

        </div>

        <p className="mb-8 text-gray-600">
          {message}
        </p>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

          <button
            onClick={onCancel}
            disabled={loading}
            className="w-full rounded-lg border border-gray-300 px-5 py-2.5 font-medium transition hover:bg-gray-100 sm:w-auto"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="w-full rounded-lg bg-red-600 px-5 py-2.5 font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>

        </div>

      </div>

    </div>
  );
};

export default DeleteConfirmModal;