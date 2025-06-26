import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { 
  Users, 
  Trophy, 
  Target, 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  MapPin, 
  School, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  Clock,
  Award,
  Activity,
  Settings,
  Download,
  Upload,
  Eye,
  Edit,
  MoreVertical,
  UserPlus,
  Bell,
  MessageSquare,
  Star,
  Lightbulb,
  BookOpen,
  Briefcase,
  Video,
  FileText,
  Archive,
  Send,
  Phone,
  Mail,
  UserCheck,
  UserX,
  Building,
  Zap,
  Crown,
  Heart,
  Share2,
  Pin,
  X,
  PlayCircle,
  Presentation,
  Code,
  Palette,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ThumbsUp,
  MessageCircle,
  Flag,
  Sparkles
} from 'lucide-react';

// Mock data for regional admin dashboard (Casablanca-Settat example)
const regionalData = {
  region: 'Casablanca-Settat',
  country: 'Morocco',
  totalClubs: 8,
  totalClubManagers: 8,
  totalODCiens: 445,
  totalProjects: 52,
  pendingExpertApplications: 5,
  activeMentors: 12,
  regionalCompetitions: 3
};

const clubs = [
  {
    id: '1',
    name: 'ODC Club – Université Hassan II',
    university: 'Université Hassan II Casablanca',
    manager: 'Amina Benali',
    managerEmail: 'amina.benali@hassanii.ma',
    managerPhone: '+212 6 12 34 56 78',
    managerStatus: 'active',
    members: 32,
    projects: 12,
    lastActivity: '2 hours ago',
    engagementScore: 92,
    createdAt: '2023-08-20',
    needsAttention: false
  },
  {
    id: '2',
    name: 'ODC Club – ENCG Casablanca',
    university: 'École Nationale de Commerce et de Gestion',
    manager: 'Youssef Alami',
    managerEmail: 'youssef.alami@encg.ac.ma',
    managerPhone: '+212 6 98 76 54 32',
    managerStatus: 'active',
    members: 24,
    projects: 8,
    lastActivity: '1 day ago',
    engagementScore: 85,
    createdAt: '2023-09-10',
    needsAttention: false
  },
  {
    id: '3',
    name: 'ODC Club – ENSAM Casablanca',
    university: 'École Nationale Supérieure Arts et Métiers',
    manager: 'Laila Fassi',
    managerEmail: 'laila.fassi@ensam.ac.ma',
    managerPhone: '+212 6 11 22 33 44',
    managerStatus: 'inactive',
    members: 18,
    projects: 6,
    lastActivity: '3 weeks ago',
    engagementScore: 45,
    createdAt: '2023-10-05',
    needsAttention: true
  },
  {
    id: '4',
    name: 'ODC Club – ISCAE Casablanca',
    university: 'Institut Supérieur de Commerce et d\'Administration',
    manager: 'Not Assigned',
    managerEmail: '',
    managerPhone: '',
    managerStatus: 'vacant',
    members: 12,
    projects: 4,
    lastActivity: '2 weeks ago',
    engagementScore: 30,
    createdAt: '2023-11-15',
    needsAttention: true
  }
];

const expertApplications = [
  {
    id: '1',
    name: 'Dr. Ahmed Benali',
    email: 'ahmed.benali@tech-expert.ma',
    phone: '+212 6 11 11 11 11',
    expertise: ['IoT', 'Embedded Systems', 'Smart Cities'],
    experience: '8 years in IoT development',
    currentRole: 'Senior IoT Engineer at TechCorp',
    motivation: 'Want to share knowledge and mentor next generation of tech innovators',
    linkedIn: 'https://linkedin.com/in/ahmed-benali',
    portfolio: 'https://github.com/ahmed-benali',
    appliedDate: '2025-01-20',
    status: 'pending_review',
    cv: 'ahmed_benali_cv.pdf'
  },
  {
    id: '2',
    name: 'Sara El Idrissi',
    email: 'sara.elidrissi@design.ma',
    phone: '+212 6 22 22 22 22',
    expertise: ['UX/UI Design', 'Design Thinking', 'User Research'],
    experience: '6 years in product design',
    currentRole: 'Lead Designer at DesignStudio',
    motivation: 'Passionate about teaching design principles to students',
    linkedIn: 'https://linkedin.com/in/sara-elidrissi',
    portfolio: 'https://sara-design-portfolio.com',
    appliedDate: '2025-01-18',
    status: 'under_review',
    cv: 'sara_elidrissi_cv.pdf'
  },
  {
    id: '3',
    name: 'Prof. Omar Bennis',
    email: 'omar.bennis@ai-expert.ma',
    phone: '+212 6 33 33 33 33',
    expertise: ['Machine Learning', 'Data Science', 'AI Strategy'],
    experience: '12 years in AI research and industry',
    currentRole: 'AI Research Professor at University',
    motivation: 'Eager to guide students in AI innovation projects',
    linkedIn: 'https://linkedin.com/in/omar-bennis',
    portfolio: 'https://scholar.google.com/omar-bennis',
    appliedDate: '2025-01-15',
    status: 'approved',
    cv: 'omar_bennis_cv.pdf'
  }
];

const activeMentors = [
  {
    id: '1',
    name: 'Dr. Zineb Alami',
    email: 'zineb.alami@expert.ma',
    phone: '+212 6 44 44 44 44',
    expertise: ['Blockchain', 'Security', 'Healthcare Tech'],
    assignedProjects: ['Medical Records Blockchain', 'Smart Health Platform'],
    activityScore: 88,
    status: 'active',
    joinDate: '2024-09-15',
    totalMentoringSessions: 24,
    rating: 4.8
  },
  {
    id: '2',
    name: 'Khalid Radi',
    email: 'khalid.radi@startup.ma',
    phone: '+212 6 55 55 55 55',
    expertise: ['Business Development', 'Fundraising', 'Go-to-Market'],
    assignedProjects: ['E-Commerce Platform', 'AgriTech Solution'],
    activityScore: 95,
    status: 'active',
    joinDate: '2024-08-20',
    totalMentoringSessions: 36,
    rating: 4.9
  },
  {
    id: '3',
    name: 'Amina Fassi',
    email: 'amina.fassi@mobile.ma',
    phone: '+212 6 66 66 66 66',
    expertise: ['Mobile Development', 'Flutter', 'React Native'],
    assignedProjects: ['Learning App', 'Tourism Platform'],
    activityScore: 72,
    status: 'inactive',
    joinDate: '2024-10-01',
    totalMentoringSessions: 15,
    rating: 4.5
  }
];

const regionalCompetitions = [
  {
    id: '1',
    title: 'Casablanca Innovation Challenge 2025',
    description: 'Regional competition for innovative tech solutions in Casablanca-Settat',
    startDate: '2025-03-01',
    endDate: '2025-03-31',
    registrationDeadline: '2025-02-15',
    status: 'open',
    maxTeams: 50,
    registeredTeams: 23,
    categories: ['FinTech', 'HealthTech', 'EdTech', 'Smart Cities'],
    prizes: '€15,000 total prize pool',
    judges: ['Dr. Ahmed Benali', 'Sara El Idrissi', 'Khalid Radi'],
    organizer: 'Omar Berrada'
  },
  {
    id: '2',
    title: 'Green Tech Hackathon',
    description: 'Sustainability-focused hackathon for environmental solutions',
    startDate: '2025-04-15',
    endDate: '2025-04-17',
    registrationDeadline: '2025-04-01',
    status: 'upcoming',
    maxTeams: 30,
    registeredTeams: 8,
    categories: ['Clean Energy', 'Waste Management', 'Water Conservation'],
    prizes: '€10,000 + Incubation Support',
    judges: ['Prof. Omar Bennis', 'Dr. Zineb Alami'],
    organizer: 'Amina Benali'
  }
];

const pendingClubManagerApplications = [
  {
    id: '1',
    name: 'Hassan Benjelloun',
    email: 'hassan.benjelloun@student.ma',
    phone: '+212 6 77 88 99 00',
    university: 'ISCAE Casablanca',
    year: '4th Year Business',
    club: 'ODC Club – ISCAE Casablanca',
    experience: 'Student council president, organized 3 tech events',
    motivation: 'Passionate about entrepreneurship and leading innovation initiatives',
    references: ['Prof. Amina Qadiri - Academic Advisor', 'Omar Fassi - Former Club President'],
    appliedDate: '2025-01-22',
    status: 'pending_interview'
  }
];

export function RegionalAdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTheme, setSelectedTheme] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateCompetition, setShowCreateCompetition] = useState(false);
  const [showAddClubManager, setShowAddClubManager] = useState(false);
  const [selectedExpert, setSelectedExpert] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'inactive': return 'bg-red-100 text-red-700';
      case 'vacant': return 'bg-gray-100 text-gray-700';
      case 'pending_review': return 'bg-yellow-100 text-yellow-700';
      case 'under_review': return 'bg-blue-100 text-blue-700';
      case 'approved': return 'bg-green-100 text-green-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      case 'open': return 'bg-green-100 text-green-700';
      case 'upcoming': return 'bg-blue-100 text-blue-700';
      case 'closed': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getEngagementColor = (score: number) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="p-6 space-y-6">
        {/* Regional Admin Header */}
        <Card className="bg-gradient-to-r from-green-600 to-teal-600 text-white border-0 shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">Regional Admin - {regionalData.region}</h1>
                  <p className="text-green-100">{regionalData.country} • Managing {regionalData.totalClubs} clubs in the region</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge className="bg-blue-500 text-white">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Regional Network Active
                    </Badge>
                    <span className="text-green-100 text-sm">{regionalData.pendingExpertApplications} experts pending validation</span>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <Button className="bg-white/20 hover:bg-white/30 text-white border-white/30" onClick={() => setShowCreateCompetition(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Competition
                </Button>
                <Button className="bg-white/20 hover:bg-white/30 text-white border-white/30" onClick={() => setShowAddClubManager(true)}>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add Club Manager
                </Button>
                <Button className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                  <Download className="w-4 h-4 mr-2" />
                  Regional Report
                </Button>
              </div>
            </div>

            {/* Regional KPIs */}
            <div className="grid md:grid-cols-7 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <School className="w-8 h-8 mx-auto mb-2 text-white" />
                <p className="text-2xl font-bold text-white">{regionalData.totalClubs}</p>
                <p className="text-green-100 text-sm">Clubs</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <Users className="w-8 h-8 mx-auto mb-2 text-white" />
                <p className="text-2xl font-bold text-white">{regionalData.totalClubManagers}</p>
                <p className="text-green-100 text-sm">Club Managers</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <Building className="w-8 h-8 mx-auto mb-2 text-white" />
                <p className="text-2xl font-bold text-white">{regionalData.totalODCiens}</p>
                <p className="text-green-100 text-sm">ODCiens</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <Briefcase className="w-8 h-8 mx-auto mb-2 text-white" />
                <p className="text-2xl font-bold text-white">{regionalData.totalProjects}</p>
                <p className="text-green-100 text-sm">Projects</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <Star className="w-8 h-8 mx-auto mb-2 text-white" />
                <p className="text-2xl font-bold text-white">{regionalData.activeMentors}</p>
                <p className="text-green-100 text-sm">Active Mentors</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <UserCheck className="w-8 h-8 mx-auto mb-2 text-white" />
                <p className="text-2xl font-bold text-white">{regionalData.pendingExpertApplications}</p>
                <p className="text-green-100 text-sm">Pending Experts</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <Trophy className="w-8 h-8 mx-auto mb-2 text-white" />
                <p className="text-2xl font-bold text-white">{regionalData.regionalCompetitions}</p>
                <p className="text-green-100 text-sm">Competitions</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-white/80 backdrop-blur-sm border border-green-200/50">
            <TabsTrigger value="overview" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              <Target className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="club-managers" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              <Users className="w-4 h-4 mr-2" />
              Club Managers
            </TabsTrigger>
            <TabsTrigger value="expert-validation" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              <UserCheck className="w-4 h-4 mr-2" />
              Expert Validation
            </TabsTrigger>
            <TabsTrigger value="mentor-management" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              <Star className="w-4 h-4 mr-2" />
              Mentor Management
            </TabsTrigger>
            <TabsTrigger value="competitions" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              <Trophy className="w-4 h-4 mr-2" />
              Regional Competitions
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              <Activity className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Club Status Overview */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <School className="w-5 h-5 text-green-600" />
                    <span>Club Status Overview</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {clubs.map((club) => (
                    <div key={club.id} className={`p-3 rounded-lg border-l-4 ${
                      club.needsAttention ? 'bg-red-50 border-l-red-500' : 'bg-green-50 border-l-green-500'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{club.name}</h4>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(club.managerStatus)}>
                            {club.managerStatus}
                          </Badge>
                          {club.needsAttention && (
                            <AlertCircle className="w-4 h-4 text-red-500" />
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{club.university}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-muted-foreground">
                          Manager: {club.manager !== 'Not Assigned' ? club.manager : 'Vacant'}
                        </span>
                        <span className={`text-sm font-medium ${getEngagementColor(club.engagementScore)}`}>
                          {club.engagementScore}% engagement
                        </span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Pending Actions */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertCircle className="w-5 h-5 text-orange-500" />
                    <span>Pending Actions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                      <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
                        <UserCheck className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">Expert Applications</h4>
                        <p className="text-sm text-muted-foreground">{expertApplications.filter(e => e.status !== 'approved').length} applications awaiting validation</p>
                      </div>
                      <Button size="sm" variant="outline">
                        Review
                      </Button>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                      <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                        <UserPlus className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">Club Manager Applications</h4>
                        <p className="text-sm text-muted-foreground">{pendingClubManagerApplications.length} application for ISCAE club</p>
                      </div>
                      <Button size="sm" variant="outline">
                        Review
                      </Button>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
                      <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                        <AlertCircle className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">Clubs Needing Attention</h4>
                        <p className="text-sm text-muted-foreground">{clubs.filter(c => c.needsAttention).length} clubs require immediate action</p>
                      </div>
                      <Button size="sm" variant="outline">
                        Address
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Stats */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-green-600" />
                  <span>Regional Performance Metrics</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center p-4 border rounded-lg bg-white">
                    <p className="text-2xl font-bold text-green-500">{clubs.filter(c => c.managerStatus === 'active').length}</p>
                    <p className="text-sm text-muted-foreground">Active Club Managers</p>
                    <p className="text-xs text-green-600 mt-1">
                      {Math.round((clubs.filter(c => c.managerStatus === 'active').length / clubs.length) * 100)}% coverage
                    </p>
                  </div>
                  <div className="text-center p-4 border rounded-lg bg-white">
                    <p className="text-2xl font-bold text-blue-500">{activeMentors.filter(m => m.status === 'active').length}</p>
                    <p className="text-sm text-muted-foreground">Active Mentors</p>
                    <p className="text-xs text-blue-600 mt-1">Avg rating: 4.7/5</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg bg-white">
                    <p className="text-2xl font-bold text-orange-500">{regionalCompetitions.filter(c => c.status === 'open').length}</p>
                    <p className="text-sm text-muted-foreground">Open Competitions</p>
                    <p className="text-xs text-orange-600 mt-1">
                      {regionalCompetitions.reduce((sum, c) => sum + c.registeredTeams, 0)} teams registered
                    </p>
                  </div>
                  <div className="text-center p-4 border rounded-lg bg-white">
                    <p className="text-2xl font-bold text-purple-500">
                      {Math.round(clubs.reduce((sum, c) => sum + c.engagementScore, 0) / clubs.length)}%
                    </p>
                    <p className="text-sm text-muted-foreground">Avg Engagement</p>
                    <p className="text-xs text-purple-600 mt-1">Regional average</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Club Managers Tab */}
          <TabsContent value="club-managers" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Club Managers & Teams</h2>
                <p className="text-muted-foreground">Manage club managers and university teams in {regionalData.region}</p>
              </div>
              <Button className="bg-green-600 hover:bg-green-700" onClick={() => setShowAddClubManager(true)}>
                <UserPlus className="w-4 h-4 mr-2" />
                Add Club Manager
              </Button>
            </div>

            {/* Club Managers Table */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Club Manager Directory</CardTitle>
                <CardDescription>Manage club managers across universities in your region</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Club & University</TableHead>
                      <TableHead>Manager Details</TableHead>
                      <TableHead>Team Stats</TableHead>
                      <TableHead>Performance</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {clubs.map((club) => (
                      <TableRow key={club.id} className={club.needsAttention ? 'bg-red-50' : ''}>
                        <TableCell>
                          <div>
                            <h4 className="font-medium">{club.name}</h4>
                            <p className="text-sm text-muted-foreground">{club.university}</p>
                            <p className="text-xs text-muted-foreground">Founded: {club.createdAt}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          {club.manager !== 'Not Assigned' ? (
                            <div>
                              <p className="font-medium">{club.manager}</p>
                              <p className="text-sm text-muted-foreground">{club.managerEmail}</p>
                              <p className="text-xs text-muted-foreground">{club.managerPhone}</p>
                            </div>
                          ) : (
                            <Badge variant="outline" className="text-red-600 border-red-600">
                              No Manager Assigned
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-sm">
                              <span>Members:</span>
                              <span className="font-medium">{club.members}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span>Projects:</span>
                              <span className="font-medium">{club.projects}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span>Last Activity:</span>
                              <span className="text-xs text-muted-foreground">{club.lastActivity}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Progress value={club.engagementScore} className="w-16 h-2" />
                            <span className={`text-sm font-medium ${getEngagementColor(club.engagementScore)}`}>
                              {club.engagementScore}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col space-y-1">
                            <Badge className={getStatusColor(club.managerStatus)}>
                              {club.managerStatus}
                            </Badge>
                            {club.needsAttention && (
                              <Badge variant="destructive" className="text-xs">
                                Needs Attention
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {club.manager !== 'Not Assigned' ? (
                              <>
                                <Button variant="ghost" size="sm">
                                  <Phone className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <MessageSquare className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Settings className="w-4 h-4" />
                                </Button>
                              </>
                            ) : (
                              <Button 
                                size="sm" 
                                className="bg-green-600 hover:bg-green-700"
                                onClick={() => setShowAddClubManager(true)}
                              >
                                <UserPlus className="w-4 h-4 mr-2" />
                                Assign Manager
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Pending Manager Applications */}
            {pendingClubManagerApplications.length > 0 && (
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Pending Club Manager Applications</CardTitle>
                  <CardDescription>Review applications for club manager positions</CardDescription>
                </CardHeader>
                <CardContent>
                  {pendingClubManagerApplications.map((application) => (
                    <div key={application.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-medium">{application.name}</h4>
                          <p className="text-sm text-muted-foreground">{application.university} - {application.year}</p>
                        </div>
                        <Badge className={getStatusColor(application.status)}>
                          {application.status.replace('_', ' ')}
                        </Badge>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm"><span className="font-medium">Email:</span> {application.email}</p>
                          <p className="text-sm"><span className="font-medium">Phone:</span> {application.phone}</p>
                          <p className="text-sm"><span className="font-medium">Applied for:</span> {application.club}</p>
                        </div>
                        <div>
                          <p className="text-sm"><span className="font-medium">Experience:</span> {application.experience}</p>
                          <p className="text-sm"><span className="font-medium">Applied:</span> {application.appliedDate}</p>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <p className="text-sm font-medium mb-2">Motivation:</p>
                        <p className="text-sm text-muted-foreground bg-gray-50 p-3 rounded-lg">
                          {application.motivation}
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between pt-3 border-t">
                        <div className="text-xs text-muted-foreground">
                          Application submitted on {application.appliedDate}
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Phone className="w-4 h-4 mr-2" />
                            Interview
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600 border-red-600">
                            Reject
                          </Button>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Approve
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Expert Validation Tab */}
          <TabsContent value="expert-validation" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Expert Validation</h2>
                <p className="text-muted-foreground">Review and validate expert applications for mentorship roles</p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary">{expertApplications.filter(e => e.status !== 'approved').length} pending</Badge>
                <Badge variant="outline">{expertApplications.filter(e => e.status === 'approved').length} approved</Badge>
              </div>
            </div>

            <div className="grid lg:grid-cols-1 gap-6">
              {expertApplications.map((expert) => (
                <Card key={expert.id} className="border-0 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl">{expert.name}</CardTitle>
                        <CardDescription>{expert.currentRole}</CardDescription>
                      </div>
                      <Badge className={getStatusColor(expert.status)}>
                        {expert.status.replace('_', ' ')}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium mb-2">Contact Information</p>
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center space-x-2">
                            <Mail className="w-4 h-4 text-gray-400" />
                            <span>{expert.email}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Phone className="w-4 h-4 text-gray-400" />
                            <span>{expert.phone}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <ExternalLink className="w-4 h-4 text-gray-400" />
                            <a href={expert.linkedIn} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                              LinkedIn Profile
                            </a>
                          </div>
                          <div className="flex items-center space-x-2">
                            <ExternalLink className="w-4 h-4 text-gray-400" />
                            <a href={expert.portfolio} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                              Portfolio/Work
                            </a>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium mb-2">Professional Background</p>
                        <div className="space-y-1 text-sm">
                          <p><span className="font-medium">Experience:</span> {expert.experience}</p>
                          <p><span className="font-medium">Applied:</span> {expert.appliedDate}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium mb-2">Areas of Expertise</p>
                      <div className="flex flex-wrap gap-2">
                        {expert.expertise.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium mb-2">Motivation to Mentor</p>
                      <p className="text-sm text-muted-foreground bg-gray-50 p-3 rounded-lg">
                        {expert.motivation}
                      </p>
                    </div>
                    
                    {expert.status !== 'approved' && (
                      <div className="flex items-center justify-between pt-3 border-t">
                        <div className="text-xs text-muted-foreground">
                          Application submitted on {expert.appliedDate}
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Download CV
                          </Button>
                          <Button variant="outline" size="sm">
                            <Video className="w-4 h-4 mr-2" />
                            Schedule Interview
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600 border-red-600">
                            <UserX className="w-4 h-4 mr-2" />
                            Reject
                          </Button>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <UserCheck className="w-4 h-4 mr-2" />
                            Approve as Expert
                          </Button>
                        </div>
                      </div>
                    )}
                    
                    {expert.status === 'approved' && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-medium text-green-800">
                            Approved Expert - Available for Mentorship
                          </span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Mentor Management Tab */}
          <TabsContent value="mentor-management" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Mentor Management</h2>
                <p className="text-muted-foreground">Manage active mentors and their performance in your region</p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary">{activeMentors.filter(m => m.status === 'active').length} active</Badge>
                <Badge variant="outline">{activeMentors.filter(m => m.status === 'inactive').length} inactive</Badge>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {activeMentors.map((mentor) => (
                <Card key={mentor.id} className="border-0 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{mentor.name}</CardTitle>
                        <CardDescription>Mentor since {mentor.joinDate}</CardDescription>
                      </div>
                      <Badge className={getStatusColor(mentor.status)}>
                        {mentor.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium mb-2">Contact</p>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-2">
                            <Mail className="w-3 h-3" />
                            <span className="truncate">{mentor.email}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Phone className="w-3 h-3" />
                            <span>{mentor.phone}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium mb-2">Performance</p>
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center justify-between">
                            <span>Activity Score:</span>
                            <span className={`font-medium ${getEngagementColor(mentor.activityScore)}`}>
                              {mentor.activityScore}%
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Rating:</span>
                            <div className="flex items-center space-x-1">
                              <Star className="w-3 h-3 text-yellow-500" />
                              <span className="font-medium">{mentor.rating}/5</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Sessions:</span>
                            <span className="font-medium">{mentor.totalMentoringSessions}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium mb-2">Expertise Areas</p>
                      <div className="flex flex-wrap gap-1">
                        {mentor.expertise.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium mb-2">Assigned Projects ({mentor.assignedProjects.length})</p>
                      <div className="space-y-1">
                        {mentor.assignedProjects.map((project, index) => (
                          <p key={index} className="text-sm text-muted-foreground">
                            • {project}
                          </p>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-3 border-t">
                      <div className="text-xs text-muted-foreground">
                        {mentor.totalMentoringSessions} mentoring sessions completed
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Regional Competitions Tab */}
          <TabsContent value="competitions" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Regional Competitions</h2>
                <p className="text-muted-foreground">Create and manage competitions for clubs in {regionalData.region}</p>
              </div>
              <Button className="bg-green-600 hover:bg-green-700" onClick={() => setShowCreateCompetition(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create Competition
              </Button>
            </div>

            <div className="grid lg:grid-cols-1 gap-6">
              {regionalCompetitions.map((competition) => (
                <Card key={competition.id} className="border-0 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl">{competition.title}</CardTitle>
                        <CardDescription>{competition.description}</CardDescription>
                      </div>
                      <Badge className={getStatusColor(competition.status)}>
                        {competition.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="font-medium">{competition.startDate}</p>
                          <p className="text-xs text-muted-foreground">to {competition.endDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span>{competition.registeredTeams}/{competition.maxTeams} teams</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Trophy className="w-4 h-4 text-gray-400" />
                        <span>{competition.prizes}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span>Deadline: {competition.registrationDeadline}</span>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium mb-2">Competition Categories</p>
                      <div className="flex flex-wrap gap-1">
                        {competition.categories.map((category, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {category}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium mb-2">Judges Panel</p>
                      <div className="flex flex-wrap gap-1">
                        {competition.judges.map((judge, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {judge}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    {competition.status === 'open' && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-green-900">Registration Progress</span>
                          <span className="text-sm text-green-700">
                            {Math.round((competition.registeredTeams / competition.maxTeams) * 100)}%
                          </span>
                        </div>
                        <Progress 
                          value={(competition.registeredTeams / competition.maxTeams) * 100} 
                          className="h-2" 
                        />
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between pt-3 border-t">
                      <div className="text-sm text-muted-foreground">
                        Organized by: {competition.organizer}
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <Send className="w-4 h-4 mr-2" />
                          Invite Clubs
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="text-center py-12">
              <Activity className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2">Regional Analytics Dashboard</h3>
              <p className="text-muted-foreground">
                Comprehensive analytics and insights for {regionalData.region}
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}