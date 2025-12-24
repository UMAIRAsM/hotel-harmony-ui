import { Outlet } from 'react-router-dom';
import AdminSidebar from '@/components/AdminSidebar';

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      <main className="ml-64 p-8 transition-all duration-300">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
