export default function Badge({ text }: { text: string }) {
  const colors: any = {
    approved: "bg-green-600/20 text-green-400",
    pending: "bg-yellow-600/20 text-yellow-400",
    rejected: "bg-red-600/20 text-red-400",
    "in-progress": "bg-blue-600/20 text-blue-400",
    completed: "bg-purple-600/20 text-purple-400",
  };

  return (
    <span className={`px-2 py-1 rounded text-xs ${colors[text]}`}>
      {text}
    </span>
  );
}
