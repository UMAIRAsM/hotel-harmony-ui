import { Outlet } from 'react-router-dom';
import CustomerSidebar from '@/components/CustomerSidebar';

const CustomerLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <CustomerSidebar />
      <main className="ml-64 p-8 transition-all duration-300">
        <Outlet />
      </main>
    </div>
  );
};

export default CustomerLayout;
