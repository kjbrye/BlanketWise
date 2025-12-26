import { AlertTriangle, X, Loader2 } from 'lucide-react';

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'Delete Item',
  message = 'Are you sure you want to delete this item? This action cannot be undone.',
  itemName = null,
  loading = false
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[rgba(139,69,19,0.1)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <h3 className="font-display text-lg font-bold text-[#5C4033]">{title}</h3>
          </div>
          <button
            onClick={onClose}
            disabled={loading}
            className="text-[#6B5344] hover:text-[#5C4033] transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <p className="text-[#6B5344]">
            {message}
            {itemName && (
              <span className="block mt-2 font-semibold text-[#5C4033]">
                "{itemName}"
              </span>
            )}
          </p>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-4 border-t border-[rgba(139,69,19,0.1)] bg-[#FDF8F0]/50 rounded-b-2xl">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 px-4 py-2 border border-[rgba(139,69,19,0.2)] rounded-lg text-[#5C4033] hover:bg-[#FDF8F0] transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Deleting...
              </>
            ) : (
              'Delete'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
