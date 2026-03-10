interface EmptyStateProps {
  message?: string;
}

export default function EmptyState({
  message = "No data available.",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 py-12 text-gray-500">
      <p className="text-sm">{message}</p>
    </div>
  );
}
