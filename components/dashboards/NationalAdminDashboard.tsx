import React from 'react';
// TODO: Integrate real-time data updates (WebSocket or polling)
// TODO: Add search, filter, and sort to all tables/lists
// TODO: Use modals/drawers for editing/viewing details
// TODO: Show loading and empty states for all data fetches
// TODO: Add in-app notification center for admin alerts
// TODO: Add ARIA labels and keyboard navigation for accessibility
// TODO: Log all admin actions for audit purposes
// TODO: Add export/reporting options (CSV, PDF)
// TODO: Add tooltips and contextual help for complex metrics/actions

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Checkbox } from '../ui/checkbox';
import { 
  Users, 
  Trophy, 
  Target, 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  MapPin, 
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
  Flag,
  Globe,
  Building,
  Send,
  Calendar as CalendarIcon,
  Video,
  Presentation,
  Phone,
  Mail,
  X,
  ArrowRight,
  ArrowLeft,
  FileText,
  Rocket,
  Users2,
  Timer,
  DollarSign,
  Zap,
  RefreshCw,
  FileSpreadsheet,
  Printer,
  BarChart3,
  Camera,
  Wifi,
  Car,
  Coffee,
  Utensils,
  Shield,
  Info,
  Copy,
  ExternalLink,
  Layers,
  Save,
  FilePlus,
  FileImage,
  FileVideo,
  Megaphone,
  Network,
  Database,
  Server,
  Key,
  Crown,
  ChevronDown,
  PauseCircle,
  PlayCircle,
  XCircle,
  Archive,
  Share2,
  Link,
  CalendarDays,
  MapPinIcon,
  UsersIcon,
  BanknoteIcon,
  ClockIcon,
  TrendingUpIcon
} from 'lucide-react';

// Mock data for the dashboard
const countryData = {
  country: 'Morocco',
  totalRegions: 8,
  totalClubs: 24,
  totalODCiens: 1247,
  totalProjects: 156,
  nationalEvents: 12,
  monthlyGrowth: 15
};

const regions = [
  {
    id: '1',
    name: 'Casablanca-Settat',
    clubs: 6,
    odciens: 342,
    admin: 'Youssef Alami',
    adminEmail: 'youssef.alami@odc.ma',
    adminPhone: '+212 6 12 34 56 78',
    adminStatus: 'active',
    adminLastLogin: '2 hours ago',
    performance: 92
  },
  {
    id: '2',
    name: 'Rabat-Salé-Kénitra',
    clubs: 4,
    odciens: 234,
    admin: 'Fatima Benali',
    adminEmail: 'fatima.benali@odc.ma',
    adminPhone: '+212 6 23 45 67 89',
    adminStatus: 'active',
    adminLastLogin: '1 day ago',
    performance: 88
  },
  {
    id: '3',
    name: 'Fès-Meknès',
    clubs: 3,
    odciens: 189,
    admin: 'Omar Idrissi',
    adminEmail: 'omar.idrissi@odc.ma',
    adminPhone: '+212 6 34 56 78 90',
    adminStatus: 'active',
    adminLastLogin: '3 hours ago',
    performance: 85
  },
  {
    id: '4',
    name: 'Marrakech-Safi',
    clubs: 5,
    odciens: 267,
    admin: 'Aicha Tazi',
    adminEmail: 'aicha.tazi@odc.ma',
    adminPhone: '+212 6 45 67 89 01',
    adminStatus: 'away',
    adminLastLogin: '1 week ago',
    performance: 78
  },
  {
    id: '5',
    name: 'Tanger-Tétouan-Al Hoceïma',
    clubs: 2,
    odciens: 123,
    admin: 'Not Assigned',
    adminEmail: '',
    adminPhone: '',
    adminStatus: 'inactive',
    adminLastLogin: '',
    performance: 0
  },
  {
    id: '6',
    name: 'Oriental',
    clubs: 2,
    odciens: 98,
    admin: 'Not Assigned',
    adminEmail: '',
    adminPhone: '',
    adminStatus: 'inactive',
    adminLastLogin: '',
    performance: 0
  },
  {
    id: '7',
    name: 'Souss-Massa',
    clubs: 1,
    odciens: 67,
    admin: 'Not Assigned',
    adminEmail: '',
    adminPhone: '',
    adminStatus: 'inactive',
    adminLastLogin: '',
    performance: 0
  },
  {
    id: '8',
    name: 'Drâa-Tafilalet',
    clubs: 1,
    odciens: 45,
    admin: 'Not Assigned',
    adminEmail: '',
    adminPhone: '',
    adminStatus: 'inactive',
    adminLastLogin: '',
    performance: 0
  }
];

const nationalEvents = [
  {
    id: '1',
    title: 'Morocco Innovation Summit 2025',
    description: 'Annual national summit bringing together innovators, entrepreneurs, and tech leaders from across Morocco to showcase cutting-edge projects and foster collaboration.',
    date: '2025-05-15',
    endDate: '2025-05-17',
    time: '09:00',
    location: 'Casablanca International Conference Center',
    city: 'Casablanca',
    expectedAttendees: 500,
    registeredAttendees: 387,
    budget: 750000,
    spentBudget: 425000,
    status: 'approved',
    priority: 'high',
    category: 'technology',
    organizer: 'ODC Morocco Team',
    lastUpdated: '2025-01-20',
    regions: ['1', '2', '3', '4'],
    tags: ['innovation', 'technology', 'networking', 'startups']
  },
  {
    id: '2',
    title: 'ODC National Hackathon',
    description: '48-hour national coding competition challenging students to build innovative solutions for real-world problems using latest technologies.',
    date: '2025-03-20',
    endDate: '2025-03-22',
    time: '18:00',
    location: 'Mohammed V University Tech Park',
    city: 'Rabat',
    expectedAttendees: 300,
    registeredAttendees: 245,
    budget: 450000,
    spentBudget: 180000,
    status: 'planning',
    priority: 'high',
    category: 'competition',
    organizer: 'ODC Education Department',
    lastUpdated: '2025-01-18',
    regions: ['1', '2', '5'],
    tags: ['hackathon', 'coding', 'competition', 'students']
  },
  {
    id: '3',
    title: 'Digital Skills Workshop Series',
    description: 'Comprehensive workshop series covering digital transformation, AI fundamentals, and emerging technologies for professional development.',
    date: '2025-02-10',
    endDate: '2025-02-12',
    time: '10:00',
    location: 'Marrakech Convention Center',
    city: 'Marrakech',
    expectedAttendees: 200,
    registeredAttendees: 156,
    budget: 320000,
    spentBudget: 95000,
    status: 'review',
    priority: 'medium',
    category: 'education',
    organizer: 'ODC Training Division',
    lastUpdated: '2025-01-16',
    regions: ['4', '7'],
    tags: ['workshop', 'skills', 'AI', 'digital-transformation']
  },
  {
    id: '4',
    title: 'Entrepreneurship Bootcamp',
    description: 'Intensive bootcamp for aspiring entrepreneurs featuring mentorship sessions, pitch competitions, and networking with successful startup founders.',
    date: '2025-04-08',
    endDate: '2025-04-10',
    time: '09:30',
    location: 'Fès Business Hub',
    city: 'Fès',
    expectedAttendees: 150,
    registeredAttendees: 89,
    budget: 280000,
    spentBudget: 45000,
    status: 'draft',
    priority: 'medium',
    category: 'entrepreneurship',
    organizer: 'ODC Business Development',
    lastUpdated: '2025-01-12',
    regions: ['3', '6'],
    tags: ['entrepreneurship', 'bootcamp', 'mentorship', 'startups']
  },
  {
    id: '5',
    title: 'Women in Tech Conference',
    description: 'Empowering women in technology through inspiring talks, panel discussions, and networking opportunities with female tech leaders.',
    date: '2025-06-25',
    endDate: '2025-06-25',
    time: '09:00',
    location: 'Tangier International Business Center',
    city: 'Tangier',
    expectedAttendees: 250,
    registeredAttendees: 0,
    budget: 380000,
    spentBudget: 25000,
    status: 'cancelled',
    priority: 'low',
    category: 'networking',
    organizer: 'ODC Diversity & Inclusion',
    lastUpdated: '2025-01-08',
    regions: ['5'],
    tags: ['women-in-tech', 'diversity', 'networking', 'empowerment']
  },
  {
    id: '6',
    title: 'AI & Machine Learning Symposium',
    description: 'Deep dive into artificial intelligence and machine learning applications with hands-on workshops and industry expert presentations.',
    date: '2025-07-12',
    endDate: '2025-07-14',
    time: '08:30',
    location: 'Agadir Tech Hub',
    city: 'Agadir',
    expectedAttendees: 180,
    registeredAttendees: 134,
    budget: 420000,
    spentBudget: 312000,
    status: 'completed',
    priority: 'high',
    category: 'technology',
    organizer: 'ODC Research Team',
    lastUpdated: '2025-01-05',
    regions: ['7'],
    tags: ['AI', 'machine-learning', 'symposium', 'research']
  }
];

const pendingAdminApplications = [
  {
    id: '1',
    name: 'Laila Alaoui',
    email: 'laila.alaoui@odc.ma',
    region: 'Tanger-Tétouan-Al Hoceïma',
    experience: '5 years in tech education',
    applicationDate: '2025-01-15',
    status: 'pending',
    motivation: 'Passionate about developing tech talent in northern Morocco'
  },
  {
    id: '2',
    name: 'Hassan Berrada',
    email: 'hassan.berrada@odc.ma',
    region: 'Oriental',
    experience: '3 years as university professor',
    applicationDate: '2025-01-18',
    status: 'pending',
    motivation: 'Want to bridge the digital divide in eastern regions'
  }
];

export function NationalAdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [showAssignAdmin, setShowAssignAdmin] = useState(false);
  const [showNationalReport, setShowNationalReport] = useState(false);

  // National Events Management State
  const [eventsView, setEventsView] = useState('list'); // 'list', 'calendar', 'analytics'
  const [eventsFilter, setEventsFilter] = useState('all'); // 'all', 'approved', 'planning', 'review', etc.
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<typeof nationalEvents[0] | null>(null);
  const [showEventDetails, setShowEventDetails] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'inactive': return 'bg-red-100 text-red-700';
      case 'away': return 'bg-yellow-100 text-yellow-700';
      case 'pending': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPerformanceColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-blue-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getEventStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-700 border-green-200';
      case 'planning': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'review': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'draft': return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'cancelled': return 'bg-red-100 text-red-700 border-red-200';
      case 'completed': return 'bg-purple-100 text-purple-700 border-purple-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredEvents = nationalEvents.filter(event => {
    const matchesFilter = eventsFilter === 'all' || event.status === eventsFilter;
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const eventStatusCounts = {
    all: nationalEvents.length,
    approved: nationalEvents.filter(e => e.status === 'approved').length,
    planning: nationalEvents.filter(e => e.status === 'planning').length,
    review: nationalEvents.filter(e => e.status === 'review').length,
    draft: nationalEvents.filter(e => e.status === 'draft').length,
    cancelled: nationalEvents.filter(e => e.status === 'cancelled').length,
    completed: nationalEvents.filter(e => e.status === 'completed').length,
  };

  const handleEventAction = (eventId: string, action: string) => {
    console.log(`Action ${action} performed on event ${eventId}`);
    // Here you would implement the actual action logic
    alert(`${action} action performed on event!`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'MAD',
      minimumFractionDigits: 0
    }).format(amount).replace('MAD', 'MAD');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50">
      <div className="p-6 space-y-6">
        {/* Country Admin Header */}
        <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0 shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center">
                  <Flag className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">Country Admin - {countryData.country}</h1>
                  <p className="text-blue-100">Managing {countryData.totalRegions} regions with {countryData.totalClubs} clubs nationwide</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge className="bg-green-500 text-white">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      National Network Active
                    </Badge>
                    <span className="text-blue-100 text-sm">Growth: +{countryData.monthlyGrowth}% this month</span>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <Button className="bg-white/20 hover:bg-white/30 text-white border-white/30" onClick={() => setShowCreateEvent(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create National Event
                </Button>
                <Button className="bg-white/20 hover:bg-white/30 text-white border-white/30" onClick={() => setShowAssignAdmin(true)}>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add Regional Admin
                </Button>
                <Button className="bg-white/20 hover:bg-white/30 text-white border-white/30" onClick={() => setShowNationalReport(true)}>
                  <Download className="w-4 h-4 mr-2" />
                  National Report
                </Button>
              </div>
            </div>

            {/* Country KPIs */}
            <div className="grid md:grid-cols-6 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <MapPin className="w-8 h-8 mx-auto mb-2 text-white" />
                <p className="text-2xl font-bold text-white">{countryData.totalRegions}</p>
                <p className="text-blue-100 text-sm">Regions</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <Building className="w-8 h-8 mx-auto mb-2 text-white" />
                <p className="text-2xl font-bold text-white">{countryData.totalClubs}</p>
                <p className="text-blue-100 text-sm">Total Clubs</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <Users className="w-8 h-8 mx-auto mb-2 text-white" />
                <p className="text-2xl font-bold text-white">{countryData.totalODCiens}</p>
                <p className="text-blue-100 text-sm">ODCiens</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <Briefcase className="w-8 h-8 mx-auto mb-2 text-white" />
                <p className="text-2xl font-bold text-white">{countryData.totalProjects}</p>
                <p className="text-blue-100 text-sm">Active Projects</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <Calendar className="w-8 h-8 mx-auto mb-2 text-white" />
                <p className="text-2xl font-bold text-white">{countryData.nationalEvents}</p>
                <p className="text-blue-100 text-sm">National Events</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <TrendingUp className="w-8 h-8 mx-auto mb-2 text-white" />
                <p className="text-2xl font-bold text-white">+{countryData.monthlyGrowth}%</p>
                <p className="text-blue-100 text-sm">Monthly Growth</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white/80 backdrop-blur-sm border border-blue-200/50">
            <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <Target className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="regional-admins" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <Users className="w-4 h-4 mr-2" />
              Regional Admins
            </TabsTrigger>
            <TabsTrigger value="national-events" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <Calendar className="w-4 h-4 mr-2" />
              National Events
            </TabsTrigger>
            <TabsTrigger value="applications" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <UserPlus className="w-4 h-4 mr-2" />
              Admin Applications
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <Activity className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Regional Performance */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <span>Regional Performance Overview</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {regions.slice(0, 4).map((region) => (
                    <div key={region.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{region.name}</h4>
                        <p className="text-sm text-muted-foreground">{region.clubs} clubs • {region.odciens} ODCiens</p>
                        <p className="text-xs text-muted-foreground mt-1">Admin: {region.admin}</p>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(region.adminStatus)}>
                          {region.adminStatus}
                        </Badge>
                        <p className={`text-sm font-medium mt-1 ${getPerformanceColor(region.performance)}`}>
                          {region.performance}%
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recent National Activity */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="w-5 h-5 text-blue-600" />
                    <span>Recent National Activity</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                      <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                        <UserPlus className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">New Regional Admin Application</h4>
                        <p className="text-sm text-muted-foreground">Laila Alaoui applied for Tanger-Tétouan-Al Hoceïma</p>
                        <p className="text-xs text-muted-foreground">2 hours ago</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">National Event Approved</h4>
                        <p className="text-sm text-muted-foreground">Morocco Innovation Summit 2025 budget approved</p>
                        <p className="text-xs text-muted-foreground">1 day ago</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                      <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                        <Trophy className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">Regional Achievement</h4>
                        <p className="text-sm text-muted-foreground">Casablanca region reached 90% engagement rate</p>
                        <p className="text-xs text-muted-foreground">3 days ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* National Performance Metrics */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  <span>National Performance Metrics</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center p-4 border rounded-lg bg-white">
                    <p className="text-2xl font-bold text-green-500">{regions.filter(r => r.adminStatus === 'active').length}</p>
                    <p className="text-sm text-muted-foreground">Active Regional Admins</p>
                    <p className="text-xs text-green-600 mt-1">{Math.round((regions.filter(r => r.adminStatus === 'active').length / regions.length) * 100)}% coverage</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg bg-white">
                    <p className="text-2xl font-bold text-blue-500">{nationalEvents.length}</p>
                    <p className="text-sm text-muted-foreground">National Events</p>
                    <p className="text-xs text-blue-600 mt-1">This year</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg bg-white">
                    <p className="text-2xl font-bold text-orange-500">{Math.round(regions.reduce((sum, r) => sum + r.performance, 0) / regions.filter(r => r.performance > 0).length)}%</p>
                    <p className="text-sm text-muted-foreground">Avg Regional Performance</p>
                    <p className="text-xs text-green-600 mt-1">+5% vs last month</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg bg-white">
                    <p className="text-2xl font-bold text-purple-500">{pendingAdminApplications.length}</p>
                    <p className="text-sm text-muted-foreground">Pending Applications</p>
                    <p className="text-xs text-purple-600 mt-1">Awaiting review</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Regional Admins Tab */}
          <TabsContent value="regional-admins" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Regional Admin Management</h2>
                <p className="text-muted-foreground">Manage regional administrators across {countryData.country}</p>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setShowAssignAdmin(true)}>
                <UserPlus className="w-4 h-4 mr-2" />
                Add Regional Admin
              </Button>
            </div>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Regional Administrators</CardTitle>
                <CardDescription>Manage administrators for each region in {countryData.country}</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Region</TableHead>
                      <TableHead>Admin Details</TableHead>
                      <TableHead>Performance</TableHead>
                      <TableHead>Clubs Managed</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {regions.map((region) => (
                      <TableRow key={region.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <MapPin className="w-4 h-4 text-blue-600" />
                            <span className="font-medium">{region.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {region.admin !== 'Not Assigned' ? (
                            <div>
                              <p className="font-medium">{region.admin}</p>
                              <p className="text-sm text-muted-foreground">{region.adminEmail}</p>
                              <p className="text-xs text-muted-foreground">{region.adminPhone}</p>
                            </div>
                          ) : (
                            <Badge variant="outline" className="text-red-600 border-red-600">
                              No Admin Assigned
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          {region.performance > 0 ? (
                            <div className="flex items-center space-x-2">
                              <Progress value={region.performance} className="w-16 h-2" />
                              <span className={`text-sm font-medium ${getPerformanceColor(region.performance)}`}>
                                {region.performance}%
                              </span>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-400">N/A</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="text-center">
                            <p className="font-medium">{region.clubs}</p>
                            <p className="text-xs text-muted-foreground">{region.odciens} ODCiens</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(region.adminStatus)}>
                            {region.adminStatus}
                          </Badge>
                        </TableCell>
                        <TableCell>{region.adminLastLogin || 'Never'}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {region.admin !== 'Not Assigned' ? (
                              <>
                                <Button variant="ghost" size="sm">
                                  <MessageSquare className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Phone className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Settings className="w-4 h-4" />
                                </Button>
                              </>
                            ) : (
                              <Button 
                                size="sm" 
                                className="bg-blue-600 hover:bg-blue-700"
                                onClick={() => setShowAssignAdmin(true)}
                              >
                                <UserPlus className="w-4 h-4 mr-2" />
                                Assign Admin
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
          </TabsContent>

          {/* National Events Tab - COMPREHENSIVE INTERFACE */}
          <TabsContent value="national-events" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">National Events Management</h2>
                <p className="text-muted-foreground">Plan, manage, and track national events across {countryData.country}</p>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="outline" onClick={() => setEventsView(eventsView === 'list' ? 'calendar' : 'list')}>
                  {eventsView === 'list' ? (
                    <>
                      <CalendarDays className="w-4 h-4 mr-2" />
                      Calendar View
                    </>
                  ) : (
                    <>
                      <FileText className="w-4 h-4 mr-2" />
                      List View
                    </>
                  )}
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setShowCreateEvent(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Event
                </Button>
              </div>
            </div>

            {/* Events Overview Stats */}
            <div className="grid md:grid-cols-6 gap-4">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-4 text-center">
                  <CalendarDays className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <p className="text-2xl font-bold text-blue-600">{eventStatusCounts.all}</p>
                  <p className="text-sm text-muted-foreground">Total Events</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg">
                <CardContent className="p-4 text-center">
                  <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-600" />
                  <p className="text-2xl font-bold text-green-600">{eventStatusCounts.approved}</p>
                  <p className="text-sm text-muted-foreground">Approved</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg">
                <CardContent className="p-4 text-center">
                  <ClockIcon className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <p className="text-2xl font-bold text-blue-600">{eventStatusCounts.planning}</p>
                  <p className="text-sm text-muted-foreground">In Planning</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg">
                <CardContent className="p-4 text-center">
                  <Eye className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
                  <p className="text-2xl font-bold text-yellow-600">{eventStatusCounts.review}</p>
                  <p className="text-sm text-muted-foreground">Under Review</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg">
                <CardContent className="p-4 text-center">
                  <FileText className="w-8 h-8 mx-auto mb-2 text-gray-600" />
                  <p className="text-2xl font-bold text-gray-600">{eventStatusCounts.draft}</p>
                  <p className="text-sm text-muted-foreground">Drafts</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg">
                <CardContent className="p-4 text-center">
                  <Trophy className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                  <p className="text-2xl font-bold text-purple-600">{eventStatusCounts.completed}</p>
                  <p className="text-sm text-muted-foreground">Completed</p>
                </CardContent>
              </Card>
            </div>

            {/* Filters and Search */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center justify-between space-x-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Search className="w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Search events..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-64"
                      />
                    </div>
                    <Select value={eventsFilter} onValueChange={setEventsFilter}>
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Events ({eventStatusCounts.all})</SelectItem>
                        <SelectItem value="approved">Approved ({eventStatusCounts.approved})</SelectItem>
                        <SelectItem value="planning">Planning ({eventStatusCounts.planning})</SelectItem>
                        <SelectItem value="review">Under Review ({eventStatusCounts.review})</SelectItem>
                        <SelectItem value="draft">Drafts ({eventStatusCounts.draft})</SelectItem>
                        <SelectItem value="completed">Completed ({eventStatusCounts.completed})</SelectItem>
                        <SelectItem value="cancelled">Cancelled ({eventStatusCounts.cancelled})</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      More Filters
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Events List */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <Card key={event.id} className="border-0 shadow-lg hover:shadow-xl transition-all cursor-pointer"
                      onClick={() => {
                        setSelectedEvent(event);
                        setShowEventDetails(true);
                      }}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Badge className={getEventStatusColor(event.status)}>
                        {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                      </Badge>
                      <Badge className={getPriorityColor(event.priority)}>
                        {event.priority.charAt(0).toUpperCase() + event.priority.slice(1)}
                      </Badge>
                    </div>
                    
                    <h3 className="font-medium mb-2 line-clamp-2">{event.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{event.description}</p>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <CalendarDays className="w-4 h-4 text-blue-600" />
                        <span>{formatDate(event.date)}</span>
                        {event.endDate && event.endDate !== event.date && (
                          <span>- {formatDate(event.endDate)}</span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPinIcon className="w-4 h-4 text-blue-600" />
                        <span>{event.location}, {event.city}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <UsersIcon className="w-4 h-4 text-blue-600" />
                        <span>{event.registeredAttendees}/{event.expectedAttendees} registered</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <BanknoteIcon className="w-4 h-4 text-blue-600" />
                        <span>{formatCurrency(event.spentBudget)}/{formatCurrency(event.budget)}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          Updated {event.lastUpdated}
                        </span>
                        <div className="flex items-center space-x-1">
                          <Button variant="ghost" size="sm" onClick={(e) => {
                            e.stopPropagation();
                            handleEventAction(event.id, 'edit');
                          }}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={(e) => {
                            e.stopPropagation();
                            handleEventAction(event.id, 'view');
                          }}>
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredEvents.length === 0 && (
              <Card className="border-0 shadow-lg">
                <CardContent className="p-12 text-center">
                  <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Events Found</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchTerm || eventsFilter !== 'all' 
                      ? 'Try adjusting your search or filters' 
                      : 'Create your first national event to get started'}
                  </p>
                  <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setShowCreateEvent(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Event
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="applications" className="space-y-6">
            <div className="text-center py-12">
              <UserPlus className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2">Admin Applications</h3>
              <p className="text-muted-foreground">Review and manage regional admin applications</p>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="text-center py-12">
              <Activity className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2">National Analytics</h3>
              <p className="text-muted-foreground">Comprehensive analytics and insights for {countryData.country}</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Placeholder Modals - Note: These would need to be fully implemented */}
      {showCreateEvent && (
        <Dialog open={showCreateEvent} onOpenChange={setShowCreateEvent}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create National Event</DialogTitle>
              <DialogDescription>
                Plan and organize a national event for the ODC network.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Event creation modal would be implemented here with multi-step form for event details, venue, budget, etc.
              </p>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowCreateEvent(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowCreateEvent(false)}>
                Create Event
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {showAssignAdmin && (
        <Dialog open={showAssignAdmin} onOpenChange={setShowAssignAdmin}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Assign Regional Administrator</DialogTitle>
              <DialogDescription>
                Assign or transfer a regional administrator.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Admin assignment modal would be implemented here with region selection, admin details, etc.
              </p>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAssignAdmin(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowAssignAdmin(false)}>
                Assign Admin
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {showNationalReport && (
        <Dialog open={showNationalReport} onOpenChange={setShowNationalReport}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Generate National Report</DialogTitle>
              <DialogDescription>
                Create comprehensive reports for network performance.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Report generation modal would be implemented here with templates, date ranges, export options, etc.
              </p>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowNationalReport(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowNationalReport(false)}>
                Generate Report
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Event Details Modal */}
      <Dialog open={showEventDetails} onOpenChange={setShowEventDetails}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Event Details</DialogTitle>
          </DialogHeader>
          {selectedEvent && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Badge className={getEventStatusColor(selectedEvent.status)}>
                  {selectedEvent.status.charAt(0).toUpperCase() + selectedEvent.status.slice(1)}
                </Badge>
                <Badge className={getPriorityColor(selectedEvent.priority)}>
                  {selectedEvent.priority.charAt(0).toUpperCase() + selectedEvent.priority.slice(1)}
                </Badge>
              </div>
              <h3 className="text-xl font-medium">{selectedEvent.title}</h3>
              <p className="text-muted-foreground">{selectedEvent.description}</p>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div><strong>Date:</strong> {formatDate(selectedEvent.date)}</div>
                <div><strong>Location:</strong> {selectedEvent.location}</div>
                <div><strong>Expected:</strong> {selectedEvent.expectedAttendees} attendees</div>
                <div><strong>Budget:</strong> {formatCurrency(selectedEvent.budget)}</div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}