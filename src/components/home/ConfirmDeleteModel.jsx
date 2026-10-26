import { AlertTriangle, X } from "lucide-react";
import { memo } from "react";

const ConfirmDeleteModal = memo(({
  isOpen,
  onClose,
  onConfirm,
  title = "Delete this post?",
  message = "This action cannot be undone. The post will be permanently removed from Pixora.",
  loading = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 px-4 backdrop-blur-3xl">
      <div
        className="
          w-full max-w-md
          overflow-hidden
          rounded-3xl
          border border-base-content/10
          bg-base-100
          shadow-2xl
          animate-[fadeIn_.2s_ease-out]
          bg-black
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-error/10">
            <AlertTriangle
              size={24}
              className="text-error"
            />
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="btn btn-ghost btn-sm btn-circle"
          >
            <X size={19} />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-5">
          <h2 className="text-xl font-bold">
            {title}
          </h2>

          <p className="mt-2 text-sm leading-6 text-base-content/60">
            {message}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 border-t border-base-content/10 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="btn btn-ghost flex-1 rounded-xl"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={async ()=>await onConfirm()}
            disabled={loading}
            className="btn btn-error flex-1 rounded-xl"
          >
            {loading ? (
              <>
                <span className="loading loading-spinner loading-sm" />
                Deleting...
              </>
            ) : (
              <>
                Delete
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
});

export default ConfirmDeleteModal;