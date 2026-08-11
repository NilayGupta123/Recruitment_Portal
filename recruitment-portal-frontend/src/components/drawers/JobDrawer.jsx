import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { generateScreeningQuestions } from "../../api/aiApi";
import { deleteJob } from "../../api/jobsApi";
import Drawer from "../ui/Drawer";
import Button from "../ui/Button";
import ConfirmDialog from "../ui/ConfirmDialog";
import ScreeningQuestionsModal from "../ai/ScreeningQuestionsModal";

function Detail({ label, children }) {
  return (
    <div className="rounded-[16px] border border-[var(--color-line)] bg-[var(--color-surface-muted)] px-4 py-3.5">
      <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-ink-tertiary)]">
        {label}
      </p>
      <div className="mt-1.5 text-[15px] font-medium text-[var(--color-ink)]">
        {children}
      </div>
    </div>
  );
}

export default function JobDrawer({ job, onClose, onEdit, onDelete }) {
  const { user } = useAuth();
  const [questions, setQuestions] = useState([]);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [showQuestionsModal, setShowQuestionsModal] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setQuestions([]);
    setShowQuestionsModal(false);
    setLoadingQuestions(false);
    setConfirmOpen(false);
    setDeleting(false);
  }, [job?.id]);

  if (!job) return null;

  const handleGenerateQuestions = async () => {
    try {
      setLoadingQuestions(true);
      setShowQuestionsModal(true);
      const response = await generateScreeningQuestions({
        job: {
          title: job.title,
          department: job.department,
          description: job.description,
          employment_type: job.employment_type,
          experience_required: job.experience_required,
          skills: job.skills?.map((skill) => skill.skill_name) || [],
        },
      });
      const next = response.data?.questions || [];
      setQuestions(next);
      if (!next.length) {
        toast.info("No screening questions were returned.");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.detail || "Failed to generate screening questions."
      );
      if (!questions.length) {
        setShowQuestionsModal(false);
      }
    } finally {
      setLoadingQuestions(false);
    }
  };

  const handleDelete = async () => {
    try {
      setDeleting(true);
      if (onDelete) {
        await onDelete(job);
      } else {
        await deleteJob(job.id);
        toast.success("Job deleted");
      }
      setConfirmOpen(false);
      onClose?.();
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.detail || "Failed to delete job."
      );
    } finally {
      setDeleting(false);
    }
  };

  const canManage = user?.user_type === "ADMIN" || user?.user_type === "HR";

  return (
    <>
      <Drawer
        open={!!job}
        onClose={onClose}
        title="Job details"
        subtitle={job.title}
        footer={
          canManage ? (
            <div className="flex flex-col gap-2.5">
              <Button
                variant="secondary"
                className="w-full"
                onClick={handleGenerateQuestions}
                disabled={loadingQuestions || deleting}
              >
                <Sparkles size={16} />
                {loadingQuestions
                  ? "Generating…"
                  : questions.length
                    ? "Regenerate screening questions"
                    : "Generate screening questions"}
              </Button>
              <div className="grid grid-cols-2 gap-2.5">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => onEdit(job)}
                  disabled={deleting}
                >
                  Edit job
                </Button>
                <Button
                  variant="danger"
                  className="w-full"
                  onClick={() => setConfirmOpen(true)}
                  disabled={deleting}
                >
                  Delete job
                </Button>
              </div>
            </div>
          ) : null
        }
      >
        <div className="space-y-4">
          <Detail label="Title">{job.title}</Detail>
          <Detail label="Department">{job.department || "N/A"}</Detail>
          <Detail label="Employment type">{job.employment_type || "N/A"}</Detail>
          <Detail label="Experience required">
            {job.experience_required ? `${job.experience_required} years` : "N/A"}
          </Detail>
          <div className="rounded-[16px] border border-[var(--color-line)] bg-[var(--color-surface)] px-4 py-4">
            <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-ink-tertiary)]">
              Description
            </p>
            <div
              className="prose mt-2 max-w-none text-[15px] leading-7 text-[var(--color-ink-secondary)]"
              dangerouslySetInnerHTML={{
                __html: job.description || "<p>No description available</p>",
              }}
            />
          </div>

          {questions.length > 0 && (
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setShowQuestionsModal(true)}
            >
              View {questions.length} screening questions
            </Button>
          )}
        </div>
      </Drawer>

      <ScreeningQuestionsModal
        open={showQuestionsModal}
        onClose={() => setShowQuestionsModal(false)}
        jobTitle={job.title}
        questions={questions}
        loading={loadingQuestions}
        onRegenerate={handleGenerateQuestions}
      />

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => !deleting && setConfirmOpen(false)}
        onConfirm={handleDelete}
        loading={deleting}
        title="Delete this job?"
        message={`“${job.title}” will be permanently removed. Applicants are kept, but their link to this posting is cleared. Jobs in a published campaign cannot be deleted.`}
        confirmLabel="Delete job"
        tone="danger"
      />
    </>
  );
}
