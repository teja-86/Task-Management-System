'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/notifications`, { withCredentials: true });
        setNotifications(res.data);
      } catch (err) {
        console.error('Failed to fetch notifications', err);
      }
    };
    fetchNotifications();
  }, []);

  const deleteNotification = async (id) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/notifications/${id}`, { withCredentials: true });
      setNotifications((prev) => prev.filter((n) => n._id !== id)); // Remove the deleted notification from the state
    } catch (err) {
      console.error('Failed to delete notification', err);
    }
  };

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Your Notifications</h2>
      <ul className="space-y-2">
        {notifications.map((n) => (
          <li key={n._id} className={`p-3 rounded flex justify-between items-center ${n.read ? 'bg-gray-200' : 'bg-yellow-100 font-bold'}`}>
            <span>{n.message}</span>
            <button
              onClick={() => deleteNotification(n._id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}