import { useState } from 'react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from './ui/dropdown-menu';
import { type UserRole } from './AuthSystem';
import { 
  Home, 
  Users, 
  Trophy, 
  Settings, 
  Bell, 
  Search, 
  Plus,
  Crown,
  Flag,
  MapPin,
  Building,
  Star,
  GraduationCap,
  BarChart3,
  UserPlus,
  Calendar,
  BookOpen,
  Target,
  Award,
  Activity,
  Menu,
  LogOut
} from 'lucide-react';

interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  country?: string;
  region?: string;
  university?: string;
  club?: string;
  adminLevel?: 'super' | 'country' | 'regional';
  isDemo?: boolean;
}

interface NavigationProps {
  user: User;
  currentPage: string;
  onPageChange: (page: string) => void;
  onLogout: () => void;
}

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  page: string;
  badge?: string;
}

// Safe navigation items with fallbacks
const getNavigationItems = (role: UserRole): NavigationItem[] => {
  const baseItems: NavigationItem[] = [
    { id: 'overview', label: 'Overview', icon: Home, page: 'overview' }
  ];

  switch (role) {
    case 'super_admin':
      return [
        ...baseItems,
        { id: 'countries', label: 'Countries', icon: Flag, page: 'countries' },
        { id: 'global-analytics', label: 'Global Analytics', icon: BarChart3, page: 'analytics' },
        { id: 'competitions', label: 'Global Competitions', icon: Trophy, page: 'competitions' },
        { id: 'rankings', label: 'Club Rankings', icon: Award, page: 'rankings' }
      ];

    case 'country_admin':
      return [
        ...baseItems,
        { id: 'regional-admins', label: 'Regional Admins', icon: Users, page: 'regional-admins' },
        { id: 'national-events', label: 'National Events', icon: Calendar, page: 'national-events' },
        { id: 'applications', label: 'Admin Applications', icon: UserPlus, page: 'applications', badge: '3' },
        { id: 'analytics', label: 'Analytics', icon: Activity, page: 'analytics' }
      ];

    case 'regional_admin':
      return [
        ...baseItems,
        { id: 'club-managers', label: 'Club Managers', icon: Building, page: 'club-managers' },
        { id: 'expert-validation', label: 'Expert Validation', icon: Star, page: 'expert-validation', badge: '5' },
        { id: 'mentor-management', label: 'Mentor Management', icon: Users, page: 'mentor-management' },
        { id: 'competitions', label: 'Regional Competitions', icon: Trophy, page: 'competitions' }
      ];

    case 'club_manager':
      return [
        ...baseItems,
        { id: 'members', label: 'Members', icon: Users, page: 'members' },
        { id: 'projects', label: 'Projects', icon: Target, page: 'projects' },
        { id: 'events', label: 'Events', icon: Calendar, page: 'events' },
        { id: 'analytics', label: 'Analytics', icon: BarChart3, page: 'analytics' }
      ];

    case 'expert':
      return [
        ...baseItems,
        { id: 'mentoring', label: 'Mentoring', icon: Star, page: 'mentoring' },
        { id: 'projects', label: 'Projects', icon: Target, page: 'projects' },
        { id: 'schedule', label: 'Schedule', icon: Calendar, page: 'schedule' }
      ];

    case 'student':
      return [
        ...baseItems,
        { id: 'projects', label: 'My Projects', icon: Target, page: 'projects' },
        { id: 'learn', label: 'Learning Hub', icon: BookOpen, page: 'learn' },
        { id: 'competitions', label: 'Competitions', icon: Trophy, page: 'competitions' },
        { id: 'network', label: 'Network', icon: Users, page: 'network' }
      ];

    default:
      return baseItems;
  }
};

const getRoleIcon = (role: UserRole) => {
  switch (role) {
    case 'super_admin': return Crown;
    case 'country_admin': return Flag;
    case 'regional_admin': return MapPin;
    case 'club_manager': return Building;
    case 'expert': return Star;
    case 'student': return GraduationCap;
    default: return Users;
  }
};

const getRoleColor = (role: UserRole) => {
  switch (role) {
    case 'super_admin': return 'text-purple-600';
    case 'country_admin': return 'text-blue-600';
    case 'regional_admin': return 'text-green-600';
    case 'club_manager': return 'text-odc-orange';
    case 'expert': return 'text-yellow-600';
    case 'student': return 'text-emerald-600';
    default: return 'text-gray-600';
  }
};

const getRoleTitle = (role: UserRole) => {
  switch (role) {
    case 'super_admin': return 'Super Admin';
    case 'country_admin': return 'Country Admin';
    case 'regional_admin': return 'Regional Admin';
    case 'club_manager': return 'Club Manager';
    case 'expert': return 'Expert/Mentor';
    case 'student': return 'Student';
    default: return 'User';
  }
};

export function Navigation({ user, currentPage, onPageChange, onLogout }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Safe navigation items with fallback
  const navigationItems = getNavigationItems(user?.role || 'student');
  const RoleIcon = getRoleIcon(user?.role || 'student');
  const roleColor = getRoleColor(user?.role || 'student');
  const roleTitle = getRoleTitle(user?.role || 'student');

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Logo and Navigation */}
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-odc-orange rounded-lg flex items-center justify-center">
                <RoleIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-lg font-medium text-odc-black">ODC Club Hybride</span>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className={`text-xs ${roleColor}`}>
                    {roleTitle}
                  </Badge>
                  {user?.isDemo && (
                    <Badge variant="outline" className="text-xs">
                      Demo
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {(navigationItems || []).map((item) => {
                const ItemIcon = item.icon;
                const isActive = currentPage === item.page;
                
                return (
                  <Button
                    key={item.id}
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    onClick={() => onPageChange(item.page)}
                    className={`relative ${
                      isActive 
                        ? 'bg-odc-orange hover:bg-odc-orange/90 text-white' 
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <ItemIcon className="w-4 h-4 mr-2" />
                    {item.label}
                    {item.badge && (
                      <Badge 
                        variant="destructive" 
                        className="ml-2 h-5 w-5 p-0 text-xs flex items-center justify-center"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Right side - Actions and User Menu */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <Button variant="ghost" size="sm">
              <Search className="w-4 h-4" />
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-4 h-4" />
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs flex items-center justify-center"
              >
                3
              </Badge>
            </Button>

            {/* Quick Create */}
            <Button size="sm" className="bg-odc-orange hover:bg-odc-orange/90">
              <Plus className="w-4 h-4 mr-2" />
              Create
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-avatar.jpg" alt={user?.name || 'User'} />
                    <AvatarFallback className="bg-odc-orange text-white">
                      {(user?.name || 'U').charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.name || 'Unknown User'}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email || 'no-email@example.com'}
                    </p>
                    {user?.country && (
                      <p className="text-xs leading-none text-muted-foreground">
                        📍 {user.region ? `${user.region}, ${user.country}` : user.country}
                      </p>
                    )}
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onPageChange('profile')}>
                  <Users className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onPageChange('settings')}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="space-y-2">
              {(navigationItems || []).map((item) => {
                const ItemIcon = item.icon;
                const isActive = currentPage === item.page;
                
                return (
                  <Button
                    key={item.id}
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    onClick={() => {
                      onPageChange(item.page);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full justify-start ${
                      isActive 
                        ? 'bg-odc-orange hover:bg-odc-orange/90 text-white' 
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <ItemIcon className="w-4 h-4 mr-2" />
                    {item.label}
                    {item.badge && (
                      <Badge 
                        variant="destructive" 
                        className="ml-auto h-5 w-5 p-0 text-xs flex items-center justify-center"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </Button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}