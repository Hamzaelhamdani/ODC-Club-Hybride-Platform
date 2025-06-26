import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Progress } from '../ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { 
  Users, 
  Plus, 
  Upload, 
  Calendar, 
  Trophy, 
  MessageSquare,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  Mail,
  Settings,
  Target,
  BookOpen,
  Award
} from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  status: 'planning' | 'in_progress' | 'review' | 'completed';
  progress: number;
  team: TeamMember[];
  dueDate: string;
  category: string;
  competition?: string;
}

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  status: 'active' | 'pending' | 'inactive';
  joinDate: string;
}

interface Activity {
  id: string;
  type: 'project_update' | 'member_joined' | 'submission' | 'feedback';
  title: string;
  description: string;
  timestamp: string;
  user: string;
}

const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Smart Campus IoT System',
    description: 'Developing an IoT-based system to monitor and optimize campus resources',
    status: 'in_progress',
    progress: 65,
    team: [
      { id: '1', name: 'Sarah Ahmed', email: 'sarah@university.edu', role: 'Team Lead', status: 'active', joinDate: '2025-01-15' },
      { id: '2', name: 'Mohamed Ali', email: 'mohamed@university.edu', role: 'Developer', status: 'active', joinDate: '2025-01-16' },
      { id: '3', name: 'Fatima Benali', email: 'fatima@university.edu', role: 'Designer', status: 'active', joinDate: '2025-01-18' }
    ],
    dueDate: '2025-03-15',
    category: 'Technology',
    competition: 'Africa Innovation Challenge 2025'
  },
  {
    id: '2',
    title: 'Sustainable Agriculture App',
    description: 'Mobile application to help local farmers optimize crop yields using AI',
    status: 'planning',
    progress: 25,
    team: [
      { id: '4', name: 'Karim Hassan', email: 'karim@university.edu', role: 'Project Manager', status: 'active', joinDate: '2025-02-01' },
      { id: '5', name: 'Amina Zouari', email: 'amina@university.edu', role: 'Researcher', status: 'pending', joinDate: '2025-02-05' }
    ],
    dueDate: '2025-04-30',
    category: 'Agriculture',
  },
  {
    id: '3',
    title: 'Digital Learning Platform',
    description: 'E-learning platform for underserved communities with offline capabilities',
    status: 'completed',
    progress: 100,
    team: [
      { id: '6', name: 'Youssef Mansour', email: 'youssef@university.edu', role: 'Full Stack Developer', status: 'active', joinDate: '2024-10-01' },
      { id: '7', name: 'Leila Khoury', email: 'leila@university.edu', role: 'UX Designer', status: 'active', joinDate: '2024-10-01' }
    ],
    dueDate: '2024-12-15',
    category: 'Education'
  }
];

const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'project_update',
    title: 'Project milestone completed',
    description: 'Smart Campus IoT System reached 65% completion',
    timestamp: '2025-06-25T10:30:00Z',
    user: 'Sarah Ahmed'
  },
  {
    id: '2',
    type: 'member_joined',
    title: 'New member joined',
    description: 'Amina Zouari joined Sustainable Agriculture App team',
    timestamp: '2025-06-24T15:45:00Z',
    user: 'System'
  },
  {
    id: '3',
    type: 'submission',
    title: 'Competition submission',
    description: 'Smart Campus IoT System submitted to Africa Innovation Challenge',
    timestamp: '2025-06-23T09:15:00Z',
    user: 'Sarah Ahmed'
  }
];

export function ClubDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [newProjectTitle, setNewProjectTitle] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning': return 'bg-yellow-100 text-yellow-700';
      case 'in_progress': return 'bg-blue-100 text-blue-700';
      case 'review': return 'bg-purple-100 text-purple-700';
      case 'completed': return 'bg-green-100 text-green-700';
      case 'active': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'inactive': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'in_progress': return <Clock className="w-4 h-4" />;
      case 'planning': return <Target className="w-4 h-4" />;
      case 'review': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const totalMembers = mockProjects.reduce((total, project) => total + project.team.length, 0);
  const activeProjects = mockProjects.filter(p => p.status === 'in_progress' || p.status === 'planning').length;
  const completedProjects = mockProjects.filter(p => p.status === 'completed').length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-medium">ODC Tunis Innovation Club</h1>
          <p className="text-muted-foreground">University of Tunis • Managing innovative student projects</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Club Settings
          </Button>
          <Button className="bg-odc-orange hover:bg-odc-orange/90">
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-odc-orange">{activeProjects}</div>
            <p className="text-xs text-muted-foreground">2 in competition phase</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-odc-orange">{totalMembers}</div>
            <p className="text-xs text-muted-foreground">+3 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Projects</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-odc-orange">{completedProjects}</div>
            <p className="text-xs text-muted-foreground">This academic year</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-odc-orange">87%</div>
            <p className="text-xs text-muted-foreground">Project completion rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="competitions">Competitions</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Current Projects */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Current Projects</CardTitle>
                  <CardDescription>Projects currently in development</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockProjects.filter(p => p.status !== 'completed').map((project) => (
                    <div key={project.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-medium mb-1">{project.title}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{project.description}</p>
                          <div className="flex items-center space-x-4 text-sm">
                            <Badge className={getStatusColor(project.status)}>
                              {getStatusIcon(project.status)}
                              <span className="ml-1 capitalize">{project.status.replace('_', ' ')}</span>
                            </Badge>
                            <span className="text-muted-foreground">Due: {project.dueDate}</span>
                            <span className="text-muted-foreground">{project.team.length} members</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Create Project */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Start New Project</CardTitle>
                  <CardDescription>Get your next innovation project started</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    placeholder="Enter project title..."
                    value={newProjectTitle}
                    onChange={(e) => setNewProjectTitle(e.target.value)}
                  />
                  <div className="flex space-x-2">
                    <Button className="bg-odc-orange hover:bg-odc-orange/90 flex-1">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Project
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <FileText className="w-4 h-4 mr-2" />
                      Use Template
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest updates from your club</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-odc-orange rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.title}</p>
                        <p className="text-xs text-muted-foreground">{activity.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(activity.timestamp).toLocaleDateString()} • {activity.user}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Upcoming Deadlines */}
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Deadlines</CardTitle>
                  <CardDescription>Important dates to remember</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-4 h-4 text-odc-orange" />
                    <div>
                      <p className="text-sm font-medium">Smart Campus IoT System</p>
                      <p className="text-xs text-muted-foreground">Due March 15, 2025</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Trophy className="w-4 h-4 text-odc-orange" />
                    <div>
                      <p className="text-sm font-medium">Competition Submission</p>
                      <p className="text-xs text-muted-foreground">Africa Innovation Challenge</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MessageSquare className="w-4 h-4 text-odc-orange" />
                    <div>
                      <p className="text-sm font-medium">Monthly Report</p>
                      <p className="text-xs text-muted-foreground">Due June 30, 2025</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="projects" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-medium">Project Management</h2>
              <p className="text-muted-foreground">Create, manage, and track your innovation projects</p>
            </div>
            <Button className="bg-odc-orange hover:bg-odc-orange/90">
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </Button>
          </div>

          <div className="grid gap-6">
            {mockProjects.map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="flex items-center space-x-2">
                        <span>{project.title}</span>
                        {project.competition && (
                          <Badge variant="outline" className="ml-2">
                            <Trophy className="w-3 h-3 mr-1" />
                            {project.competition}
                          </Badge>
                        )}
                      </CardTitle>
                      <CardDescription className="mt-2">{project.description}</CardDescription>
                    </div>
                    <Badge className={getStatusColor(project.status)}>
                      {getStatusIcon(project.status)}
                      <span className="ml-1 capitalize">{project.status.replace('_', ' ')}</span>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>Due Date: {project.dueDate}</span>
                          <span>Category: {project.category}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm font-medium">Team Members</span>
                        <Button variant="outline" size="sm">
                          <Mail className="w-4 h-4 mr-1" />
                          Invite
                        </Button>
                      </div>
                      <div className="flex -space-x-2">
                        {project.team.slice(0, 4).map((member) => (
                          <Avatar key={member.id} className="w-8 h-8 border-2 border-background">
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback className="text-xs">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                        {project.team.length > 4 && (
                          <div className="w-8 h-8 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                            <span className="text-xs">+{project.team.length - 4}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2 mt-4 pt-4 border-t">
                    <Button variant="outline" size="sm">
                      <FileText className="w-4 h-4 mr-1" />
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      <Upload className="w-4 h-4 mr-1" />
                      Upload Files
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="w-4 h-4 mr-1" />
                      Comments
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="team" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-medium">Team Management</h2>
              <p className="text-muted-foreground">Manage your club members and their projects</p>
            </div>
            <Button className="bg-odc-orange hover:bg-odc-orange/90">
              <Mail className="w-4 h-4 mr-2" />
              Invite Member
            </Button>
          </div>

          <div className="grid gap-4">
            {mockProjects.flatMap(project => 
              project.team.map(member => ({ ...member, projectTitle: project.title, projectId: project.id }))
            ).map((member) => (
              <Card key={`${member.projectId}-${member.id}`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium">{member.name}</h4>
                        <p className="text-sm text-muted-foreground">{member.email}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline" className="text-xs">{member.role}</Badge>
                          <Badge className={`${getStatusColor(member.status)} text-xs`}>
                            {member.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{member.projectTitle}</p>
                      <p className="text-xs text-muted-foreground">Joined {member.joinDate}</p>
                      <Button variant="ghost" size="sm" className="mt-2">
                        <MessageSquare className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="competitions" className="space-y-6">
          <div>
            <h2 className="text-2xl font-medium mb-2">Competitions & Challenges</h2>
            <p className="text-muted-foreground">Participate in local, national, and international competitions</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="w-5 h-5 text-odc-orange" />
                  <span>Available Competitions</span>
                </CardTitle>
                <CardDescription>Competitions open for submission</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Africa Innovation Challenge 2025</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    International competition for innovative tech solutions addressing African challenges
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-red-100 text-red-700">Deadline: March 15</Badge>
                    <Button size="sm" className="bg-odc-orange hover:bg-odc-orange/90">
                      Submit Project
                    </Button>
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Sustainability Tech Challenge</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Focus on environmental solutions and sustainable development
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-yellow-100 text-yellow-700">Opens: April 1</Badge>
                    <Button size="sm" variant="outline">
                      Learn More
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Submissions</CardTitle>
                <CardDescription>Projects submitted to competitions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium">Smart Campus IoT System</h4>
                      <p className="text-sm text-muted-foreground">Africa Innovation Challenge 2025</p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-700">Under Review</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p>Submitted: June 20, 2025</p>
                    <p className="mt-1">Expected results: March 30, 2025</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <div>
            <h2 className="text-2xl font-medium mb-2">Learning Resources</h2>
            <p className="text-muted-foreground">Access training materials, templates, and documentation</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-odc-orange/10 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-odc-orange" />
                </div>
                <CardTitle>Project Templates</CardTitle>
                <CardDescription>Ready-to-use templates for different project types</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Browse Templates
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-odc-orange/10 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-odc-orange" />
                </div>
                <CardTitle>Documentation</CardTitle>
                <CardDescription>Guidelines, best practices, and how-to guides</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  View Docs
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-odc-orange/10 rounded-lg flex items-center justify-center mb-4">
                  <Trophy className="w-6 h-6 text-odc-orange" />
                </div>
                <CardTitle>Success Stories</CardTitle>
                <CardDescription>Learn from winning projects and case studies</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Read Stories
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}