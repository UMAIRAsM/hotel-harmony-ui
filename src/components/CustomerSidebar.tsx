import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  Hotel,
  Home,
  Search,
  CalendarCheck,
  UtensilsCrossed,
  Bell,
  LogOut,
  ChevronLeft,
  ChevronRight,
  CreditCard,
} from 'lucide-react';
import { useState } from 'react';

interface CustomerSidebarProps {
  className?: string;
}

const navItems = [
  { path: '/customer', label: 'Home', icon: Home },
  { path: '/customer/rooms', label: 'Browse Rooms', icon: Search },
  { path: '/customer/bookings', label: 'My Bookings', icon: CalendarCheck },
  { path: '/customer/food', label: 'Order Food', icon: UtensilsCrossed },
  { path: '/customer/services', label: 'Room Service', icon: Bell },
  { path: '/customer/checkout', label: 'Check Out', icon: CreditCard },
];

const CustomerSidebar = ({ className }: CustomerSidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 h-screen bg-sidebar text-sidebar-foreground flex flex-col transition-all duration-300 z-50',
        collapsed ? 'w-20' : 'w-64',
        className
      )}
    >
      {/* Logo */}
      <div className="p-6 flex items-center gap-3 border-b border-sidebar-border">
        <div className="w-10 h-10 rounded-xl bg-sidebar-primary flex items-center justify-center flex-shrink-0">
          <Hotel className="w-6 h-6 text-sidebar-primary-foreground" />
        </div>
        {!collapsed && (
          <span className="font-heading text-xl font-bold text-sidebar-foreground">
            The Grand Meridian
          </span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200',
                isActive
                  ? 'bg-sidebar-accent text-sidebar-primary'
                  : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
              )}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span className="font-medium">{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border space-y-2">
        <NavLink
          to="/"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition-all duration-200"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="font-medium">Sign Out</span>}
        </NavLink>
      </div>

      {/* Collapse Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 bg-sidebar-primary rounded-full flex items-center justify-center text-sidebar-primary-foreground shadow-lg hover:scale-110 transition-transform"
      >
        {collapsed ? (
          <ChevronRight className="w-4 h-4" />
        ) : (
          <ChevronLeft className="w-4 h-4" />
        )}
      </button>
    </aside>
  );
};

export default CustomerSidebar;
