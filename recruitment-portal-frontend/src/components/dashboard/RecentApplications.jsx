import Badge from "../ui/Badge";
import {
  TableShell,
  Table,
  THead,
  Th,
  TBody,
  Tr,
  Td,
} from "../ui/Table";

export default function RecentApplications({ applications }) {
  return (
    <div className="space-y-3">
      <h2 className="text-[17px] font-semibold tracking-[-0.02em] text-[var(--color-ink)]">
        Recent applications
      </h2>
      <TableShell>
        <Table>
          <THead>
            <tr>
              <Th>Job</Th>
              <Th>Applied</Th>
              <Th>Status</Th>
            </tr>
          </THead>
          <TBody>
            {applications.length === 0 ? (
              <Tr>
                <Td
                  colSpan={3}
                  className="py-10 text-center text-[var(--color-ink-secondary)]"
                >
                  No applications yet.
                </Td>
              </Tr>
            ) : (
              applications.map((app) => (
                <Tr key={app.id}>
                  <Td className="font-semibold">{app.job_title}</Td>
                  <Td className="text-[var(--color-ink-secondary)]">
                    {new Date(app.applied_at).toLocaleDateString()}
                  </Td>
                  <Td>
                    <Badge status={app.status}>{app.status}</Badge>
                  </Td>
                </Tr>
              ))
            )}
          </TBody>
        </Table>
      </TableShell>
    </div>
  );
}
