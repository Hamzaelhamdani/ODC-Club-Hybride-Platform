import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { ScrollArea } from '../ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Separator } from '../ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { 
  Users, 
  Trophy, 
  Target, 
  Plus, 
  UserPlus, 
  Send, 
  Filter, 
  Search, 
  Calendar, 
  Clock, 
  FileText, 
  Download, 
  Upload, 
  Eye, 
  Edit, 
  Archive, 
  MoreVertical,
  Bell,
  MessageSquare,
  Star,
  Medal,
  TrendingUp,
  Award,
  Lightbulb,
  BookOpen,
  Video,
  Bookmark,
  StickyNote,
  ArrowRight,
  CheckCircle,
  Circle,
  AlertCircle,
  Zap,
  Crown,
  Heart,
  Share2,
  Pin,
  X,
  PlayCircle,
  Presentation,
  Briefcase,
  Code,
  Palette,
  ChevronLeft,
  ChevronRight,
  MapPin,
  ExternalLink,
  ThumbsUp,
  MessageCircle,
  Flag,
  Sparkles
} from 'lucide-react';

// Mock data for the club
const clubData = {
  name: 'ODC Club – ENSA Marrakech',
  logo: '🚀',
  status: 'Active',
  region: 'Morocco',
  country: 'Morocco',
  university: 'ENSA Marrakech',
  founded: '2023',
  stats: {
    activeProjects: 8,
    members: 24,
    competitions: 6,
    impactScore: 87
  }
};

// Mock projects data
const projects = [
  {
    id: 1,
    title: 'Smart Campus IoT',
    tags: ['#IoT', '#Smart City'],
    stage: 'Testing',
    progress: 75,
    mentor: 'Dr. Ahmed Benali',
    nextMilestone: 'Demo Preparation',
    dueDate: '2025-01-15',
    competitionStatus: 'Submitted',
    teamSize: 4,
    description: 'IoT solution for smart campus management',
    lastUpdate: '2 days ago'
  },
  {
    id: 2,
    title: 'EcoTrack App',
    tags: ['#GreenTech', '#Mobile'],
    stage: 'Prototype',
    progress: 60,
    mentor: 'Sarah Alaoui',
    nextMilestone: 'User Testing',
    dueDate: '2025-01-20',
    competitionStatus: 'In Review',
    teamSize: 3,
    description: 'Environmental impact tracking mobile application',
    lastUpdate: '1 day ago'
  },
  {
    id: 3,
    title: 'AI Study Assistant',
    tags: ['#AI', '#Education'],
    stage: 'Idea',
    progress: 25,
    mentor: 'Not Assigned',
    nextMilestone: 'Concept Validation',
    dueDate: '2025-01-30',
    competitionStatus: 'Not Submitted',
    teamSize: 2,
    description: 'AI-powered personalized learning assistant',
    lastUpdate: '5 days ago'
  },
  {
    id: 4,
    title: 'FinTech Payment Solution',
    tags: ['#FinTech', '#Blockchain'],
    stage: 'Pitch-ready',
    progress: 90,
    mentor: 'Omar Bennis',
    nextMilestone: 'Final Presentation',
    dueDate: '2025-01-10',
    competitionStatus: 'Finalist',
    teamSize: 5,
    description: 'Blockchain-based payment solution for SMEs',
    lastUpdate: '1 hour ago'
  }
];

// Mock team members data
const teamMembers = [
  {
    id: 1,
    name: 'Youssef Alami',
    role: 'Business Lead',
    avatar: '/api/placeholder/40/40',
    projects: ['Smart Campus IoT', 'EcoTrack App'],
    engagement: 95,
    status: 'Very Active',
    joinDate: '2024-09-15',
    skills: ['Business Strategy', 'Market Research']
  },
  {
    id: 2,
    name: 'Fatima Zahra',
    role: 'Developer',
    avatar: '/api/placeholder/40/40',
    projects: ['AI Study Assistant'],
    engagement: 88,
    status: 'Active',
    joinDate: '2024-10-01',
    skills: ['React', 'Node.js', 'Python']
  },
  {
    id: 3,
    name: 'Hassan Radi',
    role: 'Designer',
    avatar: '/api/placeholder/40/40',
    projects: ['EcoTrack App', 'FinTech Payment Solution'],
    engagement: 72,
    status: 'Moderate',
    joinDate: '2024-08-20',
    skills: ['UI/UX', 'Figma', 'Branding']
  },
  {
    id: 4,
    name: 'Amina Benali',
    role: 'Developer',
    avatar: '/api/placeholder/40/40',
    projects: ['Smart Campus IoT'],
    engagement: 91,
    status: 'Very Active',
    joinDate: '2024-09-10',
    skills: ['Flutter', 'Firebase', 'IoT']
  }
];

// Mock competitions data
const competitions = [
  {
    id: 1,
    title: 'Green Innovation Challenge 2025',
    description: 'Solutions for environmental sustainability',
    deadline: '2025-02-15',
    eligibility: 'University students worldwide',
    prize: '$10,000',
    status: 'Open',
    category: 'Sustainability'
  },
  {
    id: 2,
    title: 'AI for Good Competition',
    description: 'AI solutions addressing social challenges',
    deadline: '2025-03-01',
    eligibility: 'Students and young professionals',
    prize: '$15,000',
    status: 'Open',
    category: 'AI/ML'
  },
  {
    id: 3,
    title: 'FinTech Innovation Awards',
    description: 'Financial technology innovations',
    deadline: '2025-01-20',
    eligibility: 'Teams of 2-6 members',
    prize: '$25,000',
    status: 'Closing Soon',
    category: 'FinTech'
  }
];

// Mock resources data
const resources = [
  {
    id: 1,
    title: 'Business Model Canvas Template',
    type: 'Template',
    category: 'Business Planning',
    downloads: 45,
    rating: 4.8
  },
  {
    id: 2,
    title: 'Pitch Deck Masterclass',
    type: 'Video',
    category: 'Presentation',
    downloads: 32,
    rating: 4.9
  },
  {
    id: 3,
    title: 'Lean Startup Methodology Guide',
    type: 'PDF',
    category: 'Methodology',
    downloads: 58,
    rating: 4.7
  }
];

// Mock notifications
const notifications = [
  {
    id: 1,
    type: 'deadline',
    title: 'Project Deadline Approaching',
    message: 'FinTech Payment Solution demo is due in 2 days',
    time: '1 hour ago',
    read: false
  },
  {
    id: 2,
    type: 'competition',
    title: 'New Competition Available',
    message: 'Green Innovation Challenge 2025 is now open for submissions',
    time: '3 hours ago',
    read: false
  },
  {
    id: 3,
    type: 'feedback',
    title: 'Mentor Feedback Received',
    message: 'Dr. Ahmed Benali provided feedback on Smart Campus IoT',
    time: '1 day ago',
    read: true
  }
];

// Mock tasks for Kanban board
const tasks = {
  todo: [
    { id: 1, title: 'Design user interface mockups', project: 'EcoTrack App', assignee: 'Hassan Radi', dueDate: '2025-01-12' },
    { id: 2, title: 'Research market competitors', project: 'AI Study Assistant', assignee: 'Youssef Alami', dueDate: '2025-01-15' }
  ],
  inProgress: [
    { id: 3, title: 'Develop backend API', project: 'Smart Campus IoT', assignee: 'Amina Benali', dueDate: '2025-01-10' },
    { id: 4, title: 'Create pitch presentation', project: 'FinTech Payment Solution', assignee: 'Youssef Alami', dueDate: '2025-01-08' }
  ],
  done: [
    { id: 5, title: 'Complete technical documentation', project: 'Smart Campus IoT', assignee: 'Fatima Zahra', dueDate: '2025-01-05' },
    { id: 6, title: 'User research interviews', project: 'EcoTrack App', assignee: 'Hassan Radi', dueDate: '2025-01-03' }
  ]
};

export function ClubManagerDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [projectFilter, setProjectFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(projects[0]);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [notes, setNotes] = useState([
    { id: 1, content: 'Prepare for mentor meeting next week', date: '2025-01-05' },
    { id: 2, content: 'Follow up on competition submissions', date: '2025-01-04' }
  ]);
  const [newNote, setNewNote] = useState('');

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'Idea': return 'bg-gray-100 text-gray-700';
      case 'Prototype': return 'bg-blue-100 text-blue-700';
      case 'Testing': return 'bg-yellow-100 text-yellow-700';
      case 'Pitch-ready': return 'bg-green-100 text-green-700';
      case 'Submitted': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getEngagementColor = (engagement: number) => {
    if (engagement >= 90) return 'text-green-600';
    if (engagement >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const addNote = () => {
    if (newNote.trim()) {
      const note = {
        id: notes.length + 1,
        content: newNote,
        date: new Date().toISOString().split('T')[0]
      };
      setNotes([note, ...notes]);
      setNewNote('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-gray-50">
      <div className="flex">
        {/* Main Content Area */}
        <div className="flex-1 p-6 mr-80">
          {/* Club Overview Header */}
          <Card className="mb-6 bg-gradient-to-r from-odc-orange to-orange-600 text-white border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center text-2xl">
                    {clubData.logo}
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-white">{clubData.name}</h1>
                    <p className="text-orange-100">{clubData.university} • {clubData.country}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge className="bg-green-500 text-white">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        {clubData.status}
                      </Badge>
                      <span className="text-orange-100 text-sm">Founded {clubData.founded}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <Button className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                    <Plus className="w-4 h-4 mr-2" />
                    New Project
                  </Button>
                  <Button className="bg-white/20 hover:bg-white/30 text-white border-white/30" onClick={() => setShowInviteModal(true)}>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Invite Member
                  </Button>
                  <Button className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                    <Send className="w-4 h-4 mr-2" />
                    Submit to Competition
                  </Button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid md:grid-cols-4 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <Target className="w-8 h-8 mx-auto mb-2 text-white" />
                  <p className="text-2xl font-bold text-white">{clubData.stats.activeProjects}</p>
                  <p className="text-orange-100 text-sm">Active Projects</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <Users className="w-8 h-8 mx-auto mb-2 text-white" />
                  <p className="text-2xl font-bold text-white">{clubData.stats.members}</p>
                  <p className="text-orange-100 text-sm">Club Members</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <Trophy className="w-8 h-8 mx-auto mb-2 text-white" />
                  <p className="text-2xl font-bold text-white">{clubData.stats.competitions}</p>
                  <p className="text-orange-100 text-sm">Competitions</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <Star className="w-8 h-8 mx-auto mb-2 text-white" />
                  <p className="text-2xl font-bold text-white">{clubData.stats.impactScore}%</p>
                  <p className="text-orange-100 text-sm">Impact Score</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Dashboard Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-8 bg-white/80 backdrop-blur-sm border border-orange-200/50">
              <TabsTrigger value="overview" className="data-[state=active]:bg-odc-orange data-[state=active]:text-white">
                <Target className="w-4 h-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="projects" className="data-[state=active]:bg-odc-orange data-[state=active]:text-white">
                <Briefcase className="w-4 h-4 mr-2" />
                Projects
              </TabsTrigger>
              <TabsTrigger value="team" className="data-[state=active]:bg-odc-orange data-[state=active]:text-white">
                <Users className="w-4 h-4 mr-2" />
                Team
              </TabsTrigger>
              <TabsTrigger value="calendar" className="data-[state=active]:bg-odc-orange data-[state=active]:text-white">
                <Calendar className="w-4 h-4 mr-2" />
                Calendar
              </TabsTrigger>
              <TabsTrigger value="resources" className="data-[state=active]:bg-odc-orange data-[state=active]:text-white">
                <BookOpen className="w-4 h-4 mr-2" />
                Resources
              </TabsTrigger>
              <TabsTrigger value="submissions" className="data-[state=active]:bg-odc-orange data-[state=active]:text-white">
                <Upload className="w-4 h-4 mr-2" />
                Submissions
              </TabsTrigger>
              <TabsTrigger value="competitions" className="data-[state=active]:bg-odc-orange data-[state=active]:text-white">
                <Trophy className="w-4 h-4 mr-2" />
                Competitions
              </TabsTrigger>
              <TabsTrigger value="achievements" className="data-[state=active]:bg-odc-orange data-[state=active]:text-white">
                <Award className="w-4 h-4 mr-2" />
                Achievements
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Recent Projects */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Briefcase className="w-5 h-5 text-odc-orange" />
                      <span>Recent Projects</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {projects.slice(0, 3).map((project) => (
                      <div key={project.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium">{project.title}</h4>
                          <p className="text-sm text-muted-foreground">{project.description}</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <Badge className={getStageColor(project.stage)}>{project.stage}</Badge>
                            <span className="text-xs text-muted-foreground">{project.lastUpdate}</span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <Progress value={project.progress} className="w-16 h-2" />
                          <p className="text-xs text-center mt-1">{project.progress}%</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Team Activity */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Users className="w-5 h-5 text-odc-orange" />
                      <span>Team Activity</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {teamMembers.slice(0, 4).map((member) => (
                      <div key={member.id} className="flex items-center space-x-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h4 className="font-medium">{member.name}</h4>
                          <p className="text-sm text-muted-foreground">{member.role}</p>
                        </div>
                        <div className="text-right">
                          <p className={`font-medium ${getEngagementColor(member.engagement)}`}>
                            {member.engagement}%
                          </p>
                          <p className="text-xs text-muted-foreground">{member.status}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Upcoming Deadlines */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-odc-orange" />
                    <span>Upcoming Deadlines</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {projects
                      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
                      .slice(0, 4)
                      .map((project) => (
                        <div key={project.id} className="p-4 border rounded-lg bg-white">
                          <h4 className="font-medium mb-2">{project.title}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{project.nextMilestone}</p>
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-odc-orange" />
                            <span className="text-sm">{project.dueDate}</span>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Projects Tab */}
            <TabsContent value="projects" className="space-y-6">
              {/* Filters and Search */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search projects..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Select value={projectFilter} onValueChange={setProjectFilter}>
                      <SelectTrigger className="w-48">
                        <Filter className="w-4 h-4 mr-2" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Projects</SelectItem>
                        <SelectItem value="idea">Idea Stage</SelectItem>
                        <SelectItem value="prototype">Prototype</SelectItem>
                        <SelectItem value="testing">Testing</SelectItem>
                        <SelectItem value="pitch-ready">Pitch Ready</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Projects Table */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Projects Portfolio</CardTitle>
                  <CardDescription>Manage your club's project portfolio and track progress</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Project</TableHead>
                        <TableHead>Stage</TableHead>
                        <TableHead>Progress</TableHead>
                        <TableHead>Mentor</TableHead>
                        <TableHead>Next Milestone</TableHead>
                        <TableHead>Competition</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {projects.map((project) => (
                        <TableRow key={project.id}>
                          <TableCell>
                            <div>
                              <h4 className="font-medium">{project.title}</h4>
                              <div className="flex items-center space-x-1 mt-1">
                                {project.tags.map((tag, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStageColor(project.stage)}>
                              {project.stage}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Progress value={project.progress} className="w-16 h-2" />
                              <span className="text-sm">{project.progress}%</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm">{project.mentor}</span>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="text-sm font-medium">{project.nextMilestone}</p>
                              <p className="text-xs text-muted-foreground">{project.dueDate}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={
                              project.competitionStatus === 'Finalist' ? 'text-green-600 border-green-600' :
                              project.competitionStatus === 'Submitted' ? 'text-blue-600 border-blue-600' :
                              project.competitionStatus === 'In Review' ? 'text-yellow-600 border-yellow-600' :
                              'text-gray-600 border-gray-600'
                            }>
                              {project.competitionStatus}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Team Tab */}
            <TabsContent value="team" className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Team Directory</h2>
                  <p className="text-muted-foreground">Manage your club members and their roles</p>
                </div>
                <Button className="bg-odc-orange hover:bg-odc-orange/90" onClick={() => setShowInviteModal(true)}>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Invite New Member
                </Button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teamMembers.map((member) => (
                  <Card key={member.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-medium">{member.name}</h3>
                          <p className="text-sm text-muted-foreground">{member.role}</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium mb-1">Assigned Projects</p>
                          <div className="space-y-1">
                            {member.projects.map((project, index) => (
                              <Badge key={index} variant="outline" className="mr-1 mb-1">
                                {project}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">Engagement</span>
                            <span className={`text-sm font-medium ${getEngagementColor(member.engagement)}`}>
                              {member.engagement}%
                            </span>
                          </div>
                          <Progress value={member.engagement} className="h-2" />
                        </div>

                        <div>
                          <p className="text-sm font-medium mb-1">Skills</p>
                          <div className="flex flex-wrap gap-1">
                            {member.skills.map((skill, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t">
                          <span className="text-xs text-muted-foreground">
                            Joined {member.joinDate}
                          </span>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="w-3 h-3" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <MessageSquare className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Calendar & Tasks Tab */}
            <TabsContent value="calendar" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Calendar */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Calendar className="w-5 h-5 text-odc-orange" />
                      <span>Club Calendar</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-7 gap-2 text-center text-sm">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                          <div key={day} className="p-2 font-medium text-muted-foreground">
                            {day}
                          </div>
                        ))}
                      </div>
                      <div className="grid grid-cols-7 gap-2">
                        {Array.from({ length: 35 }, (_, i) => {
                          const day = ((i - 6) % 31) + 1;
                          const isToday = day === 15;
                          const hasEvent = [8, 15, 22, 28].includes(day);
                          
                          return (
                            <div
                              key={i}
                              className={`p-2 text-center text-sm rounded-lg cursor-pointer ${
                                isToday ? 'bg-odc-orange text-white' :
                                hasEvent ? 'bg-blue-50 text-blue-700' :
                                'hover:bg-gray-50'
                              }`}
                            >
                              {day > 0 && day <= 31 ? day : ''}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Upcoming Events */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Clock className="w-5 h-5 text-odc-orange" />
                      <span>Upcoming Events</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                          <Video className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">Mentor Session</h4>
                          <p className="text-sm text-muted-foreground">Jan 10, 2025 • 2:00 PM</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                        <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                          <Presentation className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">Demo Day</h4>
                          <p className="text-sm text-muted-foreground">Jan 15, 2025 • 10:00 AM</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                        <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
                          <Trophy className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">Competition Deadline</h4>
                          <p className="text-sm text-muted-foreground">Jan 20, 2025 • 11:59 PM</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Task Management Board */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-odc-orange" />
                    <span>Task Management Board</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    {/* To Do Column */}
                    <div>
                      <h3 className="font-medium mb-4 flex items-center space-x-2">
                        <Circle className="w-4 h-4 text-gray-400" />
                        <span>To Do ({tasks.todo.length})</span>
                      </h3>
                      <div className="space-y-3">
                        {tasks.todo.map((task) => (
                          <div key={task.id} className="p-3 bg-gray-50 rounded-lg border-l-4 border-gray-400">
                            <h4 className="font-medium text-sm">{task.title}</h4>
                            <p className="text-xs text-muted-foreground mt-1">{task.project}</p>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-xs text-muted-foreground">{task.assignee}</span>
                              <span className="text-xs text-muted-foreground">{task.dueDate}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* In Progress Column */}
                    <div>
                      <h3 className="font-medium mb-4 flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-yellow-500" />
                        <span>In Progress ({tasks.inProgress.length})</span>
                      </h3>
                      <div className="space-y-3">
                        {tasks.inProgress.map((task) => (
                          <div key={task.id} className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                            <h4 className="font-medium text-sm">{task.title}</h4>
                            <p className="text-xs text-muted-foreground mt-1">{task.project}</p>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-xs text-muted-foreground">{task.assignee}</span>
                              <span className="text-xs text-muted-foreground">{task.dueDate}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Done Column */}
                    <div>
                      <h3 className="font-medium mb-4 flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Done ({tasks.done.length})</span>
                      </h3>
                      <div className="space-y-3">
                        {tasks.done.map((task) => (
                          <div key={task.id} className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                            <h4 className="font-medium text-sm">{task.title}</h4>
                            <p className="text-xs text-muted-foreground mt-1">{task.project}</p>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-xs text-muted-foreground">{task.assignee}</span>
                              <span className="text-xs text-muted-foreground">{task.dueDate}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Resources Tab */}
            <TabsContent value="resources" className="space-y-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BookOpen className="w-5 h-5 text-odc-orange" />
                    <span>Startup Toolkit & Learning Resources</span>
                  </CardTitle>
                  <CardDescription>
                    Access templates, guides, and educational content to accelerate your projects
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    {resources.map((resource) => (
                      <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-center space-x-3 mb-4">
                            <div className="w-10 h-10 bg-odc-orange/10 rounded-lg flex items-center justify-center">
                              {resource.type === 'Video' ? <Video className="w-5 h-5 text-odc-orange" /> :
                               resource.type === 'PDF' ? <FileText className="w-5 h-5 text-odc-orange" /> :
                               <Download className="w-5 h-5 text-odc-orange" />}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium">{resource.title}</h3>
                              <p className="text-sm text-muted-foreground">{resource.category}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-2">
                              <Star className="w-4 h-4 text-yellow-500" />
                              <span className="text-sm">{resource.rating}</span>
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {resource.downloads} downloads
                            </span>
                          </div>
                          
                          <Button className="w-full bg-odc-orange hover:bg-odc-orange/90">
                            <Download className="w-4 h-4 mr-2" />
                            Access Resource
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Learning Progress */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Team Learning Progress</CardTitle>
                  <CardDescription>Track your team's skill development and course completion</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {teamMembers.map((member) => (
                      <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium">{member.name}</h4>
                            <p className="text-sm text-muted-foreground">{member.role}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="text-sm font-medium">Learning Progress</p>
                            <Progress value={Math.floor(Math.random() * 40) + 60} className="w-24 h-2 mt-1" />
                          </div>
                          <Badge variant="outline">{Math.floor(Math.random() * 5) + 3} courses</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Submissions Tab */}
            <TabsContent value="submissions" className="space-y-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Upload className="w-5 h-5 text-odc-orange" />
                    <span>Project Deliverables & Feedback</span>
                  </CardTitle>
                  <CardDescription>
                    Upload project deliverables and view feedback from mentors and judges
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid lg:grid-cols-2 gap-6">
                    {/* Upload Panel */}
                    <div className="space-y-4">
                      <h3 className="font-medium">Upload Deliverables</h3>
                      <Select value={selectedProject.title} onValueChange={(value) => {
                        const project = projects.find(p => p.title === value);
                        if (project) setSelectedProject(project);
                      }}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {projects.map((project) => (
                            <SelectItem key={project.id} value={project.title}>
                              {project.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      
                      <div className="space-y-3">
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-sm text-muted-foreground mb-2">
                            Drag and drop files or click to browse
                          </p>
                          <Button variant="outline">Choose Files</Button>
                        </div>
                        
                        <div className="space-y-2">
                          <Button className="w-full justify-start" variant="outline">
                            <FileText className="w-4 h-4 mr-2" />
                            Pitch Deck Template
                          </Button>
                          <Button className="w-full justify-start" variant="outline">
                            <Video className="w-4 h-4 mr-2" />
                            Demo Video Guidelines
                          </Button>
                          <Button className="w-full justify-start" variant="outline">
                            <Download className="w-4 h-4 mr-2" />
                            Business Plan Template
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Feedback Viewer */}
                    <div className="space-y-4">
                      <h3 className="font-medium">Recent Feedback</h3>
                      <div className="space-y-4">
                        <Card className="border border-green-200 bg-green-50">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">Smart Campus IoT</h4>
                              <Badge className="bg-green-500 text-white">8.5/10</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              Excellent technical implementation. Consider improving user interface design.
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Feedback from Dr. Ahmed Benali • 2 days ago
                            </p>
                          </CardContent>
                        </Card>
                        
                        <Card className="border border-blue-200 bg-blue-50">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">EcoTrack App</h4>
                              <Badge className="bg-blue-500 text-white">7.8/10</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              Good concept validation. Need more user research data.
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Feedback from Sarah Alaoui • 3 days ago
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Competitions Tab */}
            <TabsContent value="competitions" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Available Competitions */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Trophy className="w-5 h-5 text-odc-orange" />
                      <span>Available Competitions</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {competitions.map((competition) => (
                      <Card key={competition.id} className="border">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{competition.title}</h4>
                            <Badge className={
                              competition.status === 'Closing Soon' ? 'bg-red-100 text-red-700' :
                              'bg-green-100 text-green-700'
                            }>
                              {competition.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{competition.description}</p>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4 text-gray-400" />
                              <span>Deadline: {competition.deadline}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Trophy className="w-4 h-4 text-gray-400" />
                              <span>Prize: {competition.prize}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Users className="w-4 h-4 text-gray-400" />
                              <span>{competition.eligibility}</span>
                            </div>
                          </div>
                          <Button className="w-full mt-4 bg-odc-orange hover:bg-odc-orange/90">
                            Submit Project
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </CardContent>
                </Card>

                {/* Submission History */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <FileText className="w-5 h-5 text-odc-orange" />
                      <span>Submission History</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {projects
                      .filter(p => p.competitionStatus !== 'Not Submitted')
                      .map((project) => (
                        <div key={project.id} className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{project.title}</h4>
                            <Badge className={
                              project.competitionStatus === 'Finalist' ? 'bg-green-100 text-green-700' :
                              project.competitionStatus === 'Submitted' ? 'bg-blue-100 text-blue-700' :
                              'bg-yellow-100 text-yellow-700'
                            }>
                              {project.competitionStatus}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            Submitted to Green Innovation Challenge 2025
                          </p>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-2" />
                              View Submission
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="w-4 h-4 mr-2" />
                              Download Results
                            </Button>
                          </div>
                        </div>
                      ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Achievements Tab */}
            <TabsContent value="achievements" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Club Achievements */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Award className="w-5 h-5 text-odc-orange" />
                      <span>Club Achievements</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                        <Crown className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium">Most Active Club</h4>
                        <p className="text-sm text-muted-foreground">Regional recognition for outstanding engagement</p>
                        <p className="text-xs text-muted-foreground">Earned December 2024</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                        <Trophy className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium">Innovation Excellence</h4>
                        <p className="text-sm text-muted-foreground">First place in regional innovation challenge</p>
                        <p className="text-xs text-muted-foreground">Earned November 2024</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium">Team Builder</h4>
                        <p className="text-sm text-muted-foreground">Successfully recruited 20+ active members</p>
                        <p className="text-xs text-muted-foreground">Earned October 2024</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Performance Metrics */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="w-5 h-5 text-odc-orange" />
                      <span>Performance Metrics</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-odc-orange mb-2">87%</p>
                      <p className="text-sm text-muted-foreground">Club Impact Score</p>
                      <Progress value={87} className="h-2 mt-2" />
                    </div>
                    
                    <div className="text-center">
                      <p className="text-3xl font-bold text-green-600 mb-2">+15%</p>
                      <p className="text-sm text-muted-foreground">Monthly Growth</p>
                      <Progress value={15} className="h-2 mt-2" />
                    </div>
                    
                    <div className="text-center">
                      <p className="text-3xl font-bold text-blue-600 mb-2">#3</p>
                      <p className="text-sm text-muted-foreground">Regional Ranking</p>
                      <Progress value={75} className="h-2 mt-2" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Weekly Insights */}
              <Card className="border-0 shadow-lg bg-gradient-to-r from-green-50 to-blue-50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 text-green-500" />
                    <span>Weekly Performance Insights</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                      <p className="text-2xl font-bold text-green-500">+12</p>
                      <p className="text-sm text-muted-foreground">Points This Week</p>
                      <p className="text-xs text-green-600 mt-1">↗️ +8% from last week</p>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                      <p className="text-2xl font-bold text-blue-500">3</p>
                      <p className="text-sm text-muted-foreground">Projects Advanced</p>
                      <p className="text-xs text-blue-600 mt-1">🚀 Great momentum!</p>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                      <p className="text-2xl font-bold text-purple-500">95%</p>
                      <p className="text-sm text-muted-foreground">Team Engagement</p>
                      <p className="text-xs text-purple-600 mt-1">📈 Excellent teamwork</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sticky Sidebar */}
        <div className="fixed right-6 top-20 w-72 space-y-4 h-[calc(100vh-6rem)] overflow-y-auto">
          {/* Notifications */}
          <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center space-x-2">
                <Bell className="w-5 h-5 text-odc-orange" />
                <span>Notifications</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {notifications.slice(0, 3).map((notification) => (
                <div key={notification.id} className={`p-3 rounded-lg ${
                  notification.read ? 'bg-gray-50' : 'bg-blue-50 border-l-4 border-blue-500'
                }`}>
                  <h4 className="font-medium text-sm">{notification.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Notes */}
          <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center space-x-2">
                <StickyNote className="w-5 h-5 text-yellow-500" />
                <span>Quick Notes</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <Input
                  placeholder="Add a quick note..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addNote()}
                />
                <Button size="sm" onClick={addNote} className="bg-odc-orange hover:bg-odc-orange/90">
                  Add Note
                </Button>
              </div>
              
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {notes.map((note) => (
                  <div key={note.id} className="bg-yellow-50 border border-yellow-200 rounded-lg p-2">
                    <p className="text-sm">{note.content}</p>
                    <p className="text-xs text-muted-foreground mt-1">{note.date}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Tips */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-blue-50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center space-x-2">
                <Lightbulb className="w-5 h-5 text-green-500" />
                <span>Club Management Tips</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-white rounded-lg p-3 border border-green-200">
                <h4 className="font-medium text-sm text-green-700">💡 Project Management</h4>
                <p className="text-xs text-green-600 mt-1">Set weekly check-ins with project teams to track progress.</p>
              </div>
              <div className="bg-white rounded-lg p-3 border border-blue-200">
                <h4 className="font-medium text-sm text-blue-700">🎯 Member Engagement</h4>
                <p className="text-xs text-blue-600 mt-1">Recognize achievements publicly to boost team morale.</p>
              </div>
              <div className="bg-white rounded-lg p-3 border border-purple-200">
                <h4 className="font-medium text-sm text-purple-700">🚀 Competition Prep</h4>
                <p className="text-xs text-purple-600 mt-1">Start preparing submissions 2 weeks before deadlines.</p>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps Banner */}
          <Card className="border-0 shadow-lg bg-gradient-to-r from-odc-orange to-orange-600 text-white">
            <CardContent className="p-4">
              <h3 className="font-bold mb-2">🎯 Next Steps</h3>
              <p className="text-sm text-orange-100 mb-3">
                Complete 2 more project submissions to unlock the "Innovation Leader" badge
              </p>
              <Progress value={75} className="h-2 mb-3 bg-white/20" />
              <Button className="w-full bg-white text-odc-orange hover:bg-orange-50">
                <ArrowRight className="w-4 h-4 mr-2" />
                View Projects
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Invite Member Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Invite New Member</CardTitle>
              <CardDescription>Send an invitation to join your club</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Email Address</label>
                <Input placeholder="member@university.edu" />
              </div>
              <div>
                <label className="text-sm font-medium">Role</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="member">Member</SelectItem>
                    <SelectItem value="developer">Developer</SelectItem>
                    <SelectItem value="designer">Designer</SelectItem>
                    <SelectItem value="business">Business Lead</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Message (Optional)</label>
                <Textarea placeholder="Welcome to our club!" />
              </div>
              <div className="flex space-x-2">
                <Button className="flex-1 bg-odc-orange hover:bg-odc-orange/90">
                  Send Invitation
                </Button>
                <Button variant="outline" onClick={() => setShowInviteModal(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}