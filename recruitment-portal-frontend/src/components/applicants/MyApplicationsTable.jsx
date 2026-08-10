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

export default function MyApplicationsTable({ applications, onView }) {
  if (applications.length === 0) {
    return (
      <EmptyState
        title="No applications found"
        description="You haven't applied for any jobs yet."
      />
    );
  }

  return (
    <TableShell>
      <Table>
        <THead>
          <tr>
            <Th>Job title</Th>
            <Th>Applied on</Th>
            <Th>Status</Th>
          </tr>
        </THead>
        <TBody>
          {applications.map((application) => (
            <Tr key={application.id} onClick={() => onView?.(application)}>
              <Td>
                <p className="font-semibold text-[var(--color-ink)]">
                  {application.job_title}
                </p>
                <p className="mt-1 text-sm text-[var(--color-ink-secondary)]">
                  Job ID: {application.job_id}
                </p>
              </Td>
              <Td>
                {new Date(application.applied_at).toLocaleDateString()}
              </Td>
              <Td>
                <Badge status={application.status}>
                  {application.status}
                </Badge>
              </Td>
            </Tr>
          ))}
        </TBody>
      </Table>
    </TableShell>
  );
}
