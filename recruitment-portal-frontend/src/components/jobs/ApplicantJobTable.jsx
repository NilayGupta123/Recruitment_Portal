import Badge from "../ui/Badge";
import EmptyState from "../ui/EmptyState";
import {
  TableShell,
  Table,
  THead,
  Th,
  TBody,
  Tr,
  Td,
} from "../ui/Table";

function StatusCell({ application }) {
  if (!application) {
    return <Badge tone="success">Available</Badge>;
  }
  return <Badge status={application.status}>{application.status}</Badge>;
}

export default function ApplicantJobTable({ jobs, applications, onView }) {
  if (jobs.length === 0) {
    return (
      <EmptyState
        title="No jobs found"
        description="Try changing the search or filters."
      />
    );
  }

  return (
    <TableShell>
      <Table>
        <THead>
          <tr>
            <Th>Job</Th>
            <Th>Department</Th>
            <Th>Type</Th>
            <Th>Experience</Th>
            <Th>Status</Th>
          </tr>
        </THead>
        <TBody>
          {jobs.map((job) => {
            const application = applications[job.id];
            return (
              <Tr key={job.id} onClick={() => onView?.(job)}>
                <Td>
                  <p className="font-semibold text-[var(--color-ink)]">
                    {job.title}
                  </p>
                  <p className="mt-1 line-clamp-2 text-sm text-[var(--color-ink-secondary)]">
                    {typeof job.description === "string"
                      ? job.description.replace(/<[^>]+>/g, " ").trim()
                      : ""}
                  </p>
                </Td>
                <Td>{job.department || "—"}</Td>
                <Td>{job.employment_type || "—"}</Td>
                <Td>
                  {job.experience_required
                    ? `${job.experience_required} years`
                    : "—"}
                </Td>
                <Td>
                  <StatusCell application={application} />
                </Td>
              </Tr>
            );
          })}
        </TBody>
      </Table>
    </TableShell>
  );
}
