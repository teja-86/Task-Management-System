import NotificationBell from '@/components/NotificationBell';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav className="flex justify-between p-4 bg-gray-800 text-white">
          <div>My Task App</div>
          {/* <NotificationBell /> */}
        </nav>
        {children}
      </body>
    </html>
  );
}
