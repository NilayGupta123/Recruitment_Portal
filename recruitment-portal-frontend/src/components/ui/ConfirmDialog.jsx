import Button from "./Button";
import Modal from "./Modal";

export default function ConfirmDialog({
  open = false,
  onClose,
  onConfirm,
  title = "Are you sure?",
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  loading = false,
  tone = "danger",
}) {
  const confirmVariant = tone === "danger" ? "danger" : "primary";

  return (
    <Modal
      open={open}
      onClose={loading ? undefined : onClose}
      title={title}
      size="sm"
      footer={
        <div className="flex flex-col-reverse gap-2.5 sm:flex-row sm:justify-end">
          <Button
            variant="outline"
            className="w-full sm:w-auto"
            onClick={onClose}
            disabled={loading}
          >
            {cancelLabel}
          </Button>
          <Button
            variant={confirmVariant}
            className="w-full sm:w-auto"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Working…" : confirmLabel}
          </Button>
        </div>
      }
    >
      <p className="text-[15px] leading-6 text-[var(--color-ink-secondary)]">
        {message}
      </p>
    </Modal>
  );
}
