import { cn } from '@/lib/utils';
import { Home, LogOut, Menu, User, Users } from 'lucide-react';
import { Button } from '../ui/button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { selectLoginState, setResetState } from '@/pages/Login/loginSlice';

interface SidebarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
}

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { dataUser } = useAppSelector(selectLoginState);

    const handleLogout = () => {
      sessionStorage.removeItem("authToken");
      dispatch(setResetState());
      navigate("/");
    };

    const navItems = [
        { path: "/", label: "Dashboard", icon: Home },
        { path: "/users", label: "Users", icon: Users },
    ];

    return (
        <div
          className={cn(
            "sidebar bg-white dark:bg-gray-900 shadow-md z-10 flex flex-col h-full",
            isOpen ? "sidebar-open" : "sidebar-closed"
          )}
        >
          <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
            <h1
              className={cn(
                "text-xl font-semibold text-primary dark:text-primary-light overflow-hidden whitespace-nowrap transition-all duration-300",
                !isOpen && "opacity-0"
              )}
            >
              User Management
            </h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="text-muted-foreground hover:text-foreground p-1"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
    
          <nav className="flex-1 overflow-y-auto py-4">
            <ul>
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link to={item.path}>
                    <a
                      className={cn(
                        "flex items-center px-4 py-3 text-foreground dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors",
                        location.pathname === item.path &&
                          "bg-gray-100 dark:bg-gray-800 text-primary dark:text-primary-light"
                      )}
                    >
                      <item.icon className="h-5 w-5 mr-3" />
                      <span
                        className={cn(
                          "sidebar-text overflow-hidden whitespace-nowrap transition-all duration-300",
                          !isOpen && "opacity-0"
                        )}
                      >
                        {item.label}
                      </span>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
    
          <div className="border-t dark:border-gray-700 p-4">
            <div className="flex items-center px-4 py-2 text-foreground dark:text-gray-200">
              <User className="h-5 w-5 mr-3" />
              <span
                className={cn(
                  "sidebar-text overflow-hidden whitespace-nowrap transition-all duration-300",
                  !isOpen && "opacity-0"
                )}
              >
                {dataUser.name}
              </span>
            </div>
            <Button
              variant="ghost"
              onClick={handleLogout}
              disabled={false}
              className="flex items-center w-full px-4 py-2 mt-2 text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors justify-start"
            >
              <LogOut className="h-5 w-5 mr-3" />
              <span
                className={cn(
                  "sidebar-text overflow-hidden whitespace-nowrap transition-all duration-300",
                  !isOpen && "opacity-0"
                )}
              >
                Logout
              </span>
            </Button>
          </div>
        </div>
      );
}

export default Sidebar