// 'use client';
// import { useState, useEffect } from 'react';
// import axios from 'axios';

// export default function NotificationBell() {
//   const [notifications, setNotifications] = useState([]);

//   useEffect(() => {
//     async function fetchNotifications() {
//       try {
//         const res = await axios.get('http://localhost:5000/api/notifications', {
//           withCredentials: true,
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });
//         setNotifications(res.data);
//       } catch (err) {
//         console.error('Error fetching notifications', err);
//       }
//     }
//     fetchNotifications();
//   }, []);

//   const markAsSeen = async (id) => {
//     await axios.put(`/api/notifications/${id}`);
//     setNotifications((prev) => prev.filter((n) => n._id !== id));
//   };

//   return (
//     <div className="relative">
//       <button className="relative px-4 py-2">
//         🔔
//         {notifications.length > 0 && (
//           <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
//         )}
//       </button>
//       {notifications.length > 0 && (
//         <div className="absolute right-0 mt-2 w-64 bg-white border rounded shadow-lg z-50">
//           {notifications.map((notif) => (
//             <div
//               key={notif._id}
//               className="p-2 border-b hover:bg-gray-100 cursor-pointer"
//               onClick={() => markAsSeen(notif._id)}
//             >
//               {notif.message}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
