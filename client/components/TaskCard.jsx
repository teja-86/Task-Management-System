export default function TaskCard({ task, onEdit, onDelete }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-200 hover:shadow-lg transition duration-300 ease-in-out">
      <h3 className="text-2xl font-semibold text-gray-900">{task.title}</h3>
      <p className="mt-2 text-gray-700">{task.description}</p>
      <p className="text-sm text-gray-500 mt-1">Due: {task.dueDate?.split("T")[0]}</p>
      <p className="text-sm text-gray-600 mt-1">
        Priority: <span className={`font-semibold text-${task.priority.toLowerCase()}`}>{task.priority}</span> 
        | Status: <span className={`font-semibold text-${task.status === "Completed" ? "green" : task.status === "In Progress" ? "yellow" : "red"}-600`}>{task.status}</span>
      </p>
      <div className="flex gap-4 mt-4">
        <button
          onClick={() => onEdit(task)}
          className="text-blue-600 hover:text-blue-800 transition duration-200"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task._id)}
          className="text-red-600 hover:text-red-800 transition duration-200"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
