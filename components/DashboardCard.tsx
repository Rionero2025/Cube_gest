export function DashboardCard({ title, value, caption }: { title: string; value: string; caption?: string }) {
  return (
    <div className="dashboard-card">
      <small>{title}</small>
      <strong>{value}</strong>
      {caption && <span>{caption}</span>}
    </div>
  );
}
