import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { AuthSystem, type UserRole } from './components/AuthSystem';
import { ClubRegistration } from './components/ClubRegistration';
import { NetworkExplorer } from './components/NetworkExplorer';
import { OnboardingFlow } from './components/OnboardingFlow';
import { RoleSwitcher } from './components/RoleSwitcher';
import { Navigation } from './components/Navigation';
import { SuperAdminDashboard } from './components/dashboards/SuperAdminDashboard';
import { NationalAdminDashboard } from './components/dashboards/NationalAdminDashboard';
import { RegionalAdminDashboard } from './components/dashboards/RegionalAdminDashboard';
import { ClubManagerDashboard } from './components/dashboards/ClubManagerDashboard';
import { ExpertDashboard } from './components/dashboards/ExpertDashboard';
import { CoachDashboard } from './components/dashboards/CoachDashboard';
import { StudentDashboard } from './components/dashboards/StudentDashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Button } from './components/ui/button';
import { Progress } from './components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { 
  Trophy, 
  TrendingUp, 
  Users, 
  BookOpen, 
  Target,
  Calendar,
  Award,
  Star,
  ChevronUp,
  ChevronDown,
  Medal,
  Crown,
  GraduationCap,
  Lightbulb,
  HeartHandshake,
  Code,
  Eye,
  EyeOff
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

interface ClubRanking {
  id: string;
  name: string;
  university: string;
  country: string;
  city: string;
  members: number;
  engagementScore: number;
  trainingsAttended: number;
  projectsCompleted: number;
  competitionsWon: number;
  monthlyContributions: number;
  lastActivity: string;
  badge: 'gold' | 'silver' | 'bronze' | 'none';
  trend: 'up' | 'down' | 'stable';
}

const mockClubRankings: ClubRanking[] = [
  {
    id: '1',
    name: 'ODC Tunis Innovation Hub',
    university: 'University of Tunis',
    country: 'Tunisia',
    city: 'Tunis',
    members: 52,
    engagementScore: 95,
    trainingsAttended: 24,
    projectsCompleted: 15,
    competitionsWon: 8,
    monthlyContributions: 45,
    lastActivity: '2 hours ago',
    badge: 'gold',
    trend: 'up'
  },
  {
    id: '2',
    name: 'ODC Cairo Tech Leaders',
    university: 'Cairo University',
    country: 'Egypt',
    city: 'Cairo',
    members: 48,
    engagementScore: 92,
    trainingsAttended: 22,
    projectsCompleted: 13,
    competitionsWon: 7,
    monthlyContributions: 42,
    lastActivity: '1 day ago',
    badge: 'gold',
    trend: 'up'
  },
  {
    id: '3',
    name: 'ODC Casablanca Innovators',
    university: 'Hassan II University',
    country: 'Morocco',
    city: 'Casablanca',
    members: 45,
    engagementScore: 88,
    trainingsAttended: 20,
    projectsCompleted: 12,
    competitionsWon: 5,
    monthlyContributions: 38,
    lastActivity: '5 hours ago',
    badge: 'silver',
    trend: 'stable'
  },
  {
    id: '4',
    name: 'ODC Algiers Digital Hub',
    university: 'University of Algiers',
    country: 'Algeria',
    city: 'Algiers',
    members: 41,
    engagementScore: 85,
    trainingsAttended: 18,
    projectsCompleted: 11,
    competitionsWon: 4,
    monthlyContributions: 35,
    lastActivity: '3 days ago',
    badge: 'silver',
    trend: 'down'
  },
  {
    id: '5',
    name: 'ODC Rabat Creators',
    university: 'Mohammed V University',
    country: 'Morocco',
    city: 'Rabat',
    members: 38,
    engagementScore: 82,
    trainingsAttended: 16,
    projectsCompleted: 9,
    competitionsWon: 3,
    monthlyContributions: 32,
    lastActivity: '1 week ago',
    badge: 'bronze',
    trend: 'stable'
  },
  {
    id: '6',
    name: 'ODC Alexandria Tech',
    university: 'Alexandria University',
    country: 'Egypt',
    city: 'Alexandria',
    members: 35,
    engagementScore: 78,
    trainingsAttended: 14,
    projectsCompleted: 8,
    competitionsWon: 2,
    monthlyContributions: 28,
    lastActivity: '4 days ago',
    badge: 'bronze',
    trend: 'up'
  }
];

// Simplified Dashboard Components for legacy admin users
function AdminDashboard({ currentPage, user }: { currentPage: string, user: User }) {
  if (currentPage === 'rankings') {
    const [selectedPeriod, setSelectedPeriod] = useState('monthly');
    
    const getBadgeColor = (badge: string) => {
      switch (badge) {
        case 'gold': return 'bg-yellow-500';
        case 'silver': return 'bg-gray-400';
        case 'bronze': return 'bg-amber-600';
        default: return 'bg-gray-300';
      }
    };

    const getTrendIcon = (trend: string) => {
      switch (trend) {
        case 'up': return <ChevronUp className="w-4 h-4 text-green-500" />;
        case 'down': return <ChevronDown className="w-4 h-4 text-red-500" />;
        default: return <div className="w-4 h-4 bg-gray-300 rounded-full"></div>;
      }
    };

    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-medium mb-2">Club Rankings</h1>
            <p className="text-muted-foreground">Track club engagement and performance across the ODC network</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">Export Report</Button>
            <Button className="bg-odc-orange hover:bg-odc-orange/90">
              <Award className="w-4 h-4 mr-2" />
              Award Ceremony
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Top Performing Club</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Medal className="w-5 h-5 text-yellow-500" />
                <div>
                  <p className="font-medium">ODC Tunis Innovation Hub</p>
                  <p className="text-sm text-muted-foreground">95% engagement</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Most Improved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <div>
                  <p className="font-medium">ODC Cairo Tech Leaders</p>
                  <p className="text-sm text-green-600">+12% this month</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Training Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold text-odc-orange">1,247</p>
                  <p className="text-sm text-muted-foreground">Across all clubs</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Average Engagement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-purple-500" />
                <div>
                  <p className="text-2xl font-bold text-odc-orange">87%</p>
                  <p className="text-sm text-muted-foreground">Network average</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Rankings Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Club Leaderboard</CardTitle>
              <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <TabsList>
                  <TabsTrigger value="weekly">Weekly</TabsTrigger>
                  <TabsTrigger value="monthly">Monthly</TabsTrigger>
                  <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <CardDescription>
              Rankings based on engagement score combining training attendance, project completion, and participation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockClubRankings.map((club, index) => (
                <div key={club.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-odc-orange/10 rounded-full flex items-center justify-center">
                        <span className="font-bold text-odc-orange">#{index + 1}</span>
                      </div>
                      <div className={`w-3 h-3 rounded-full ${getBadgeColor(club.badge)}`}></div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium">{club.name}</h3>
                        {getTrendIcon(club.trend)}
                      </div>
                      <p className="text-sm text-muted-foreground">{club.university}, {club.city}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                          <Users className="w-3 h-3" />
                          <span>{club.members} members</span>
                        </div>
                        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          <span>Last active: {club.lastActivity}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-2xl font-bold text-odc-orange">{club.engagementScore}%</span>
                      <Badge variant="secondary" className="bg-odc-orange/10 text-odc-orange">
                        Engagement Score
                      </Badge>
                    </div>
                    <Progress value={club.engagementScore} className="w-24 h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recognition Section */}
        <Card>
          <CardHeader>
            <CardTitle>Club Recognition</CardTitle>
            <CardDescription>Achievements and milestones reached this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 border rounded-lg bg-yellow-50">
                <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <h3 className="font-medium">Club of the Month</h3>
                <p className="text-sm text-muted-foreground">ODC Tunis Innovation Hub</p>
                <p className="text-sm text-muted-foreground">Outstanding engagement (95%)</p>
              </div>
              
              <div className="text-center p-4 border rounded-lg bg-green-50">
                <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <h3 className="font-medium">Most Improved</h3>
                <p className="text-sm text-muted-foreground">ODC Cairo Tech Leaders</p>
                <p className="text-sm text-muted-foreground">+12% engagement increase</p>
              </div>
              
              <div className="text-center p-4 border rounded-lg bg-blue-50">
                <BookOpen className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <h3 className="font-medium">Learning Champions</h3>
                <p className="text-sm text-muted-foreground">ODC Casablanca Innovators</p>
                <p className="text-sm text-muted-foreground">Highest training completion rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Default fallback for legacy admin users
  return <SuperAdminDashboard />;
}

// Main App Component
export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState('overview');
  const [isDevelopmentMode, setIsDevelopmentMode] = useState(true); // Enable by default for demo

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('landing');
    setCurrentPage('overview');
  };

  const handleReturnToLanding = () => {
    setCurrentView('landing');
  };

  const handleRegistrationComplete = () => {
    setCurrentView('auth');
  };

  const handleOnboardingComplete = () => {
    setCurrentView('auth');
  };

  const handleRoleSwitcherRoleChange = (user: User) => {
    setCurrentUser(user);
    setCurrentView('dashboard');
  };

  const handleRoleSwitcherViewChange = (view: AppView) => {
    setCurrentView(view);
    // Clear user if navigating away from dashboard
    if (view !== 'dashboard') {
      setCurrentUser(null);
    }
  };

  const renderDashboard = () => {
    if (!currentUser) return null;

    // Route to appropriate dashboard based on user role
    switch (currentUser.role) {
      case 'super_admin':
        return <SuperAdminDashboard />;
      
      case 'country_admin':
        return <NationalAdminDashboard />;
      
      case 'regional_admin':
        return <RegionalAdminDashboard />;
      
      case 'club_manager':
        return <ClubManagerDashboard />;
      
      case 'expert':
        return <ExpertDashboard />;
      
      case 'coach':
        return <CoachDashboard />;
      
      case 'student':
        return <StudentDashboard currentPage={currentPage} />;
      
      // Legacy admin role - fallback for backwards compatibility
      case 'admin':
        if (currentUser.adminLevel === 'super') {
          return <SuperAdminDashboard />;
        } else if (currentUser.adminLevel === 'country') {
          return <NationalAdminDashboard />;
        } else if (currentUser.adminLevel === 'regional') {
          return <RegionalAdminDashboard />;
        }
        return <AdminDashboard currentPage={currentPage} user={currentUser} />;
      
      default:
        return <StudentDashboard currentPage={currentPage} />;
    }
  };

  // Development Mode Toggle (top-left corner)
  const DevelopmentModeToggle = () => (
    <div className="fixed top-6 left-6 z-[9998]">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsDevelopmentMode(!isDevelopmentMode)}
        className="bg-white/90 backdrop-blur-sm border-gray-200 hover:bg-gray-50"
        title={isDevelopmentMode ? "Hide Role Switcher" : "Show Role Switcher"}
      >
        {isDevelopmentMode ? (
          <>
            <EyeOff className="w-4 h-4 mr-2" />
            Hide Dev Tools
          </>
        ) : (
          <>
            <Eye className="w-4 h-4 mr-2" />
            Show Dev Tools
          </>
        )}
      </Button>
    </div>
  );

  // Landing Page
  if (currentView === 'landing') {
    return (
      <>
        <DevelopmentModeToggle />
        <LandingPage 
          onGetStarted={() => setCurrentView('club-registration')}
          onExplore={() => setCurrentView('network-explorer')}
          onStudentOnboarding={() => setCurrentView('onboarding-student')}
          onUniversityOnboarding={() => setCurrentView('onboarding-university')}
          onMentorOnboarding={() => setCurrentView('onboarding-mentor')}
        />
        {isDevelopmentMode && (
          <RoleSwitcher
            onRoleChange={handleRoleSwitcherRoleChange}
            onViewChange={handleRoleSwitcherViewChange}
            currentView={currentView}
            currentUser={currentUser}
          />
        )}
      </>
    );
  }

  // Authentication
  if (currentView === 'auth') {
    return (
      <>
        <DevelopmentModeToggle />
        <AuthSystem 
          onLogin={handleLogin}
          onBack={handleReturnToLanding}
        />
        {isDevelopmentMode && (
          <RoleSwitcher
            onRoleChange={handleRoleSwitcherRoleChange}
            onViewChange={handleRoleSwitcherViewChange}
            currentView={currentView}
            currentUser={currentUser}
          />
        )}
      </>
    );
  }

  // Club Registration
  if (currentView === 'club-registration') {
    return (
      <>
        <DevelopmentModeToggle />
        <ClubRegistration
          onBack={handleReturnToLanding}
          onComplete={handleRegistrationComplete}
        />
        {isDevelopmentMode && (
          <RoleSwitcher
            onRoleChange={handleRoleSwitcherRoleChange}
            onViewChange={handleRoleSwitcherViewChange}
            currentView={currentView}
            currentUser={currentUser}
          />
        )}
      </>
    );
  }

  // Network Explorer
  if (currentView === 'network-explorer') {
    return (
      <>
        <DevelopmentModeToggle />
        <NetworkExplorer
          onBack={handleReturnToLanding}
          onJoinClub={() => setCurrentView('onboarding-student')}
        />
        {isDevelopmentMode && (
          <RoleSwitcher
            onRoleChange={handleRoleSwitcherRoleChange}
            onViewChange={handleRoleSwitcherViewChange}
            currentView={currentView}
            currentUser={currentUser}
          />
        )}
      </>
    );
  }

  // Onboarding Flows
  if (currentView === 'onboarding-student') {
    return (
      <>
        <DevelopmentModeToggle />
        <OnboardingFlow
          userType="student"
          onBack={handleReturnToLanding}
          onComplete={handleOnboardingComplete}
        />
        {isDevelopmentMode && (
          <RoleSwitcher
            onRoleChange={handleRoleSwitcherRoleChange}
            onViewChange={handleRoleSwitcherViewChange}
            currentView={currentView}
            currentUser={currentUser}
          />
        )}
      </>
    );
  }

  if (currentView === 'onboarding-university') {
    return (
      <>
        <DevelopmentModeToggle />
        <OnboardingFlow
          userType="university"
          onBack={handleReturnToLanding}
          onComplete={handleOnboardingComplete}
        />
        {isDevelopmentMode && (
          <RoleSwitcher
            onRoleChange={handleRoleSwitcherRoleChange}
            onViewChange={handleRoleSwitcherViewChange}
            currentView={currentView}
            currentUser={currentUser}
          />
        )}
      </>
    );
  }

  if (currentView === 'onboarding-mentor') {
    return (
      <>
        <DevelopmentModeToggle />
        <OnboardingFlow
          userType="mentor"
          onBack={handleReturnToLanding}
          onComplete={handleOnboardingComplete}
        />
        {isDevelopmentMode && (
          <RoleSwitcher
            onRoleChange={handleRoleSwitcherRoleChange}
            onViewChange={handleRoleSwitcherViewChange}
            currentView={currentView}
            currentUser={currentUser}
          />
        )}
      </>
    );
  }

  if (currentView === 'onboarding-general') {
    return (
      <>
        <DevelopmentModeToggle />
        <OnboardingFlow
          onBack={handleReturnToLanding}
          onComplete={handleOnboardingComplete}
        />
        {isDevelopmentMode && (
          <RoleSwitcher
            onRoleChange={handleRoleSwitcherRoleChange}
            onViewChange={handleRoleSwitcherViewChange}
            currentView={currentView}
            currentUser={currentUser}
          />
        )}
      </>
    );
  }

  // Dashboard
  if (currentView === 'dashboard' && currentUser) {
    return (
      <>
        <DevelopmentModeToggle />
        <div className="min-h-screen bg-background">
          <Navigation 
            user={currentUser}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            onLogout={handleLogout}
          />
          <main className="pt-16">
            {renderDashboard()}
          </main>
        </div>
        {isDevelopmentMode && (
          <RoleSwitcher
            onRoleChange={handleRoleSwitcherRoleChange}
            onViewChange={handleRoleSwitcherViewChange}
            currentView={currentView}
            currentUser={currentUser}
          />
        )}
      </>
    );
  }

  return (
    <>
      <DevelopmentModeToggle />
      <LandingPage 
        onGetStarted={() => setCurrentView('club-registration')} 
        onExplore={() => setCurrentView('network-explorer')} 
        onStudentOnboarding={() => setCurrentView('onboarding-student')} 
        onUniversityOnboarding={() => setCurrentView('onboarding-university')} 
        onMentorOnboarding={() => setCurrentView('onboarding-mentor')} 
      />
      {isDevelopmentMode && (
        <RoleSwitcher
          onRoleChange={handleRoleSwitcherRoleChange}
          onViewChange={handleRoleSwitcherViewChange}
          currentView={currentView}
          currentUser={currentUser}
        />
      )}
    </>
  );
}