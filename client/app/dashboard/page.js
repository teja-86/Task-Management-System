"use client";
import { useEffect, useState } from "react";
import TaskCard from "@/components/TaskCard";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Menu, LayoutDashboard, Bell, Settings, LogOut, ClipboardList } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Medium",
    status: "Pending",
    assignedTo: ""
  });
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterPriority, setFilterPriority] = useState("All");
  const [users, setUsers] = useState([]);
  const [assignedTo, setAssignedTo] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [username, setUsername] = useState("");
  const router = useRouter();

  useEffect(() => {
    loadTasks();
    fetchCurrentUser();

    async function fetchUsers() {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`, {withCredentials : true});
      setUsers(response.data);
    }
    fetchUsers();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, { withCredentials: true });
      setUsername(response.data.username);
    } catch (error) {
      console.error("Error fetching current user", error);
      toast.error("Error fetching current user. Please try again.");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = { ...form, assignedTo };

    try {
      if (editingId) {
        await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${editingId}`, newTask, { withCredentials: true });
        toast.success("Task updated successfully!");
      } else {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/tasks`, newTask, { withCredentials: true });
        toast.success("Task created successfully!");

        // Send Notification to assigned user
        if (assignedTo) {
          await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/notifications`, { userId: assignedTo, message: `You have been assigned a new task: ${form.title}` }, { withCredentials: true });
        }
      }
      setForm({ title: "", description: "", dueDate: "", priority: "Medium", status: "Pending", assignedTo: "" });
      setEditingId(null);
      loadTasks();
    } catch (err) {
      console.error("Error creating task", err);
    }
  };

  const loadTasks = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tasks`, { withCredentials: true });
      setTasks(response.data);
    }
    catch (err) {
      console.error("Error loading tasks", err);
    }
  }

  const handleEdit = (task) => {
    setEditingId(task._id);
    setForm(task);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this task?")) {
      try {
        await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${id}`, { withCredentials: true });
        loadTasks(); // Reload tasks after deletion
        alert("Task deleted successfully!");
      } catch (error) {
        console.error("Error deleting task", error);
      }

    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, { withCredentials: true });
      toast.success("Logged out successfully!");
      router.push("/login");
    } catch (error) {
      console.error("Error logging out", error);
      toast.error("Error logging out. Please try again.");
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className={`bg-blue-700 text-white p-6 space-y-4 transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-0 overflow-hidden'} md:w-64`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold hidden md:block">Task Manager</h2>
          <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
            ✕
          </button>
        </div>
        <nav className="space-y-3">
          <a href="#" className="flex items-center gap-2 hover:text-yellow-300"><LayoutDashboard /> Dashboard</a>
          <a onClick={() => router.push("/notifications")} className="flex items-center gap-2 hover:text-yellow-300 cursor-pointer"><Bell /> Notifications</a>
          <a onClick={handleLogout} className="flex items-center gap-2 hover:text-yellow-300 cursor-pointer"><LogOut /> Logout</a>
        </nav>
      </aside>
      <main className="flex-1 p-6 max-w-6xl mx-auto relative">
        {/* Hamburger Menu (Mobile) */}
        <button
          className="md:hidden absolute top-4 left-4 text-blue-700"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu />
        </button>
      <ToastContainer />
      <h2 className="text-2xl font-semibold mb-4 mt-8 md:mt-0">Dashboard</h2>
      <p className="text-lg mb-4">Welcome, <span className="font-bold">{username}</span>!</p>
      <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded mb-6">
        <select
          className="w-full p-2 mb-2 border rounded"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
        >
          <option value="">Assign to a User</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.username} {/* Assuming you have a username */}
            </option>
          ))}
        </select>

        <input className="w-full p-2 mb-2" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        <textarea className="w-full p-2 mb-2" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}></textarea>
        <input className="w-full p-2 mb-2" type="date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
        <select className="w-full p-2 mb-2" value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <select className="w-full p-2 mb-2" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
        <button className="bg-blue-600 text-white py-2 px-4 rounded" type="submit">
          {editingId ? "Update Task" : "Create Task"}
        </button>
      </form>

      <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          className="p-2 border rounded"
          placeholder="Search by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="p-2 border rounded"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option>All</option>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
        <select
          className="p-2 border rounded"
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
        >
          <option>All</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </div>
      <section>
        {tasks
          .filter((task) =>
            task?.title?.toLowerCase().includes(search.toLowerCase()) &&
            (filterStatus === "All" || task.status === filterStatus) &&
            (filterPriority === "All" || task.priority === filterPriority)
          )
          .map((task) => (
            <TaskCard key={task._id} task={task} onEdit={handleEdit} onDelete={handleDelete} />
          ))}
      </section>
    </main>
    </div>
  );
}
