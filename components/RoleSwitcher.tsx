import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { type UserRole } from './AuthSystem';
import { 
  Settings, 
  Crown, 
  Flag, 
  MapPin, 
  Building, 
  Star, 
  Users, 
  GraduationCap,
  Home,
  UserPlus,
  Globe,
  Network,
  BookOpen,
  X,
  ChevronRight,
  Eye,
  Code,
  Palette
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

type AppView = 
  | 'landing' 
  | 'auth' 
  | 'dashboard' 
  | 'club-registration' 
  | 'network-explorer' 
  | 'onboarding-student'
  | 'onboarding-university'
  | 'onboarding-mentor'
  | 'onboarding-general';

interface RoleSwitcherProps {
  onRoleChange: (user: User) => void;
  onViewChange: (view: AppView) => void;
  currentView: AppView;
  currentUser: User | null;
}

const mockUsers: Record<UserRole, User> = {
  super_admin: {
    id: '1',
    email: 'global.admin@orange.com',
    name: 'Sarah Al-Mansouri',
    role: 'super_admin',
    adminLevel: 'super',
    isDemo: true
  },
  country_admin: {
    id: '2',
    email: 'morocco.admin@orange.ma',
    name: 'Ahmed Benali',
    role: 'country_admin',
    country: 'Morocco',
    adminLevel: 'country',
    isDemo: true
  },
  regional_admin: {
    id: '3',
    email: 'casablanca.admin@orange.ma',
    name: 'Fatima Zahra El Idrissi',
    role: 'regional_admin',
    country: 'Morocco',
    region: 'Casablanca-Settat',
    adminLevel: 'regional',
    isDemo: true
  },
  club_manager: {
    id: '4',
    email: 'club.hassan2@orange.ma',
    name: 'Amina Belkacem',
    role: 'club_manager',
    country: 'Morocco',
    region: 'Casablanca-Settat',
    university: 'Université Hassan II Casablanca',
    club: 'ODC Club Hassan II',
    isDemo: true
  },
  expert: {
    id: '5',
    email: 'expert.tech@orange.ma',
    name: 'Youssef Alami',
    role: 'expert',
    country: 'Morocco',
    isDemo: true
  },
  coach: {
    id: '6',
    email: 'coach.startup@orange.fr',
    name: 'Sophie Moreau',
    role: 'coach',
    country: 'France',
    region: 'Provence-Alpes-Côte d\'Azur',
    isDemo: true
  },
  student: {
    id: '7',
    email: 'student.hassan@orange.ma',
    name: 'Hassan Radi',
    role: 'student',
    country: 'Morocco',
    region: 'Casablanca-Settat',
    university: 'Université Hassan II Casablanca',
    club: 'ODC Club Hassan II',
    isDemo: true
  }
};

const roleInfo = {
  super_admin: {
    title: 'Super Admin (Global)',
    description: 'Global Orange network oversight',
    icon: Crown,
    color: 'bg-purple-600',
    textColor: 'text-purple-600'
  },
  country_admin: {
    title: 'Country Admin',
    description: 'National-level management',
    icon: Flag,
    color: 'bg-blue-600',
    textColor: 'text-blue-600'
  },
  regional_admin: {
    title: 'Regional Admin',
    description: 'Regional zone management',
    icon: MapPin,
    color: 'bg-green-600',
    textColor: 'text-green-600'
  },
  club_manager: {
    title: 'Club Manager',
    description: 'University club leadership',
    icon: Building,
    color: 'bg-odc-orange',
    textColor: 'text-odc-orange'
  },
  expert: {
    title: 'Expert/Mentor',
    description: 'Technical guidance',
    icon: Star,
    color: 'bg-yellow-600',
    textColor: 'text-yellow-600'
  },
  coach: {
    title: 'Coach',
    description: 'Team leadership',
    icon: Users,
    color: 'bg-indigo-600',
    textColor: 'text-indigo-600'
  },
  student: {
    title: 'Student',
    description: 'Learn and innovate',
    icon: GraduationCap,
    color: 'bg-emerald-600',
    textColor: 'text-emerald-600'
  }
};

const viewInfo = {
  landing: {
    title: 'Landing Page',
    description: 'Main marketing page',
    icon: Home,
    color: 'bg-gray-600'
  },
  auth: {
    title: 'Authentication',
    description: 'Login/Register system',
    icon: UserPlus,
    color: 'bg-slate-600'
  },
  'club-registration': {
    title: 'Club Registration',
    description: 'Start a new club',
    icon: Building,
    color: 'bg-odc-orange'
  },
  'network-explorer': {
    title: 'Network Explorer',
    description: 'Explore global network',
    icon: Globe,
    color: 'bg-blue-600'
  },
  'onboarding-student': {
    title: 'Student Onboarding',
    description: 'Student registration flow',
    icon: GraduationCap,
    color: 'bg-emerald-600'
  },
  'onboarding-university': {
    title: 'University Onboarding',
    description: 'University partnership',
    icon: Building,
    color: 'bg-blue-600'
  },
  'onboarding-mentor': {
    title: 'Mentor Onboarding',
    description: 'Mentor registration',
    icon: Star,
    color: 'bg-yellow-600'
  },
  'onboarding-general': {
    title: 'General Onboarding',
    description: 'General registration flow',
    icon: Users,
    color: 'bg-gray-600'
  },
  dashboard: {
    title: 'Dashboard',
    description: 'Role-based dashboard',
    icon: Network,
    color: 'bg-purple-600'
  }
};

export function RoleSwitcher({ onRoleChange, onViewChange, currentView, currentUser }: RoleSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('roles');

  const handleRoleSwitch = (role: UserRole) => {
    const user = mockUsers[role];
    onRoleChange(user);
    onViewChange('dashboard');
  };

  const handleViewSwitch = (view: AppView) => {
    onViewChange(view);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-[9999]">
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-odc-orange hover:bg-odc-orange/90 text-white shadow-2xl h-14 w-14 rounded-full p-0"
          title="Open Role Switcher"
        >
          <Settings className="w-6 h-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/20 pointer-events-auto"
        onClick={() => setIsOpen(false)}
      />
      
      {/* Panel */}
      <div className="absolute right-6 top-6 bottom-6 w-96 pointer-events-auto">
        <Card className="h-full flex flex-col shadow-2xl border-2 border-odc-orange/20">
          <CardHeader className="bg-gradient-to-r from-odc-orange to-orange-600 text-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Code className="w-5 h-5" />
                  <span>Role Switcher</span>
                </CardTitle>
                <CardDescription className="text-orange-100">
                  Quick access to all interfaces
                </CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="flex-1 p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
              <TabsList className="grid w-full grid-cols-3 m-4 mb-0">
                <TabsTrigger value="roles">Roles</TabsTrigger>
                <TabsTrigger value="views">Views</TabsTrigger>
                <TabsTrigger value="info">Info</TabsTrigger>
              </TabsList>
              
              <div className="flex-1 overflow-hidden">
                <TabsContent value="roles" className="h-full m-0">
                  <ScrollArea className="h-full p-4">
                    <div className="space-y-3">
                      <div className="mb-4">
                        <h3 className="font-medium text-sm text-gray-600 mb-2">Switch to Role Dashboard</h3>
                        <p className="text-xs text-gray-500">
                          Click any role to instantly view their dashboard
                        </p>
                      </div>
                      
                      {Object.entries(roleInfo).map(([role, info]) => {
                        const RoleIcon = info.icon;
                        const user = mockUsers[role as UserRole];
                        const isActive = currentUser?.role === role && currentView === 'dashboard';
                        
                        return (
                          <Card 
                            key={role}
                            className={`cursor-pointer transition-all hover:shadow-md border-2 ${
                              isActive ? 'border-odc-orange shadow-md' : 'border-transparent'
                            }`}
                            onClick={() => handleRoleSwitch(role as UserRole)}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-center space-x-3">
                                <div className={`w-10 h-10 ${info.color} rounded-lg flex items-center justify-center`}>
                                  <RoleIcon className="w-5 h-5 text-white" />
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-medium text-sm">{info.title}</h4>
                                  <p className="text-xs text-gray-500">{info.description}</p>
                                  <p className="text-xs text-gray-400 mt-1">{user.name}</p>
                                </div>
                                <ChevronRight className="w-4 h-4 text-gray-400" />
                              </div>
                              {isActive && (
                                <Badge className="mt-2 bg-odc-orange text-white text-xs">
                                  Currently Active
                                </Badge>
                              )}
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </ScrollArea>
                </TabsContent>
                
                <TabsContent value="views" className="h-full m-0">
                  <ScrollArea className="h-full p-4">
                    <div className="space-y-3">
                      <div className="mb-4">
                        <h3 className="font-medium text-sm text-gray-600 mb-2">Switch to Any View</h3>
                        <p className="text-xs text-gray-500">
                          Access any interface without authentication
                        </p>
                      </div>
                      
                      {Object.entries(viewInfo).map(([view, info]) => {
                        const ViewIcon = info.icon;
                        const isActive = currentView === view;
                        
                        return (
                          <Card 
                            key={view}
                            className={`cursor-pointer transition-all hover:shadow-md border-2 ${
                              isActive ? 'border-odc-orange shadow-md' : 'border-transparent'
                            }`}
                            onClick={() => handleViewSwitch(view as AppView)}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-center space-x-3">
                                <div className={`w-10 h-10 ${info.color} rounded-lg flex items-center justify-center`}>
                                  <ViewIcon className="w-5 h-5 text-white" />
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-medium text-sm">{info.title}</h4>
                                  <p className="text-xs text-gray-500">{info.description}</p>
                                </div>
                                <ChevronRight className="w-4 h-4 text-gray-400" />
                              </div>
                              {isActive && (
                                <Badge className="mt-2 bg-odc-orange text-white text-xs">
                                  Currently Active
                                </Badge>
                              )}
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </ScrollArea>
                </TabsContent>
                
                <TabsContent value="info" className="h-full m-0">
                  <ScrollArea className="h-full p-4">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium text-sm text-gray-600 mb-2">Current State</h3>
                        <Card className="bg-gray-50">
                          <CardContent className="p-3">
                            <div className="space-y-2 text-xs">
                              <div className="flex justify-between">
                                <span className="text-gray-500">View:</span>
                                <span className="font-medium">{viewInfo[currentView]?.title || currentView}</span>
                              </div>
                              {currentUser && (
                                <>
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">Role:</span>
                                    <span className="font-medium">{roleInfo[currentUser.role]?.title}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">User:</span>
                                    <span className="font-medium">{currentUser.name}</span>
                                  </div>
                                  {currentUser.country && (
                                    <div className="flex justify-between">
                                      <span className="text-gray-500">Location:</span>
                                      <span className="font-medium">
                                        {currentUser.region ? `${currentUser.region}, ${currentUser.country}` : currentUser.country}
                                      </span>
                                    </div>
                                  )}
                                </>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="font-medium text-sm text-gray-600 mb-2">Quick Actions</h3>
                        <div className="space-y-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full justify-start text-xs"
                            onClick={() => handleViewSwitch('landing')}
                          >
                            <Home className="w-3 h-3 mr-2" />
                            Go to Landing Page
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full justify-start text-xs"
                            onClick={() => handleRoleSwitch('super_admin')}
                          >
                            <Crown className="w-3 h-3 mr-2" />
                            Super Admin Dashboard
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full justify-start text-xs"
                            onClick={() => handleRoleSwitch('student')}
                          >
                            <GraduationCap className="w-3 h-3 mr-2" />
                            Student Dashboard
                          </Button>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="font-medium text-sm text-gray-600 mb-2">About</h3>
                        <div className="text-xs text-gray-500 space-y-2">
                          <p>
                            This role switcher allows you to quickly preview all interfaces without going through the normal authentication flow.
                          </p>
                          <p>
                            Perfect for development, testing, and demonstrations.
                          </p>
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}