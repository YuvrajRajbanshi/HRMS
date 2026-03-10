import type { AttendanceRecord } from "@/types";

interface AttendanceTableProps {
  records: AttendanceRecord[];
}

export default function AttendanceTable({ records }: AttendanceTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
      <table className="w-full text-left text-sm text-gray-900">
        <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase text-gray-600">
          <tr>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {records.map((rec) => (
            <tr key={rec._id} className="hover:bg-gray-50">
              <td className="px-4 py-3 text-gray-900">
                {new Date(rec.date).toLocaleDateString()}
              </td>
              <td className="px-4 py-3">
                <span
                  className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    rec.status === "Present"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {rec.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
