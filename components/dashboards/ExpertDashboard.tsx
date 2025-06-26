import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Progress } from '../ui/progress';
import { 
  Lightbulb, 
  Users, 
  Calendar, 
  Star, 
  MessageSquare,
  FileText,
  Trophy,
  BookOpen,
  Clock,
  CheckCircle,
  AlertCircle,
  Target,
  TrendingUp,
  Award,
  Video,
  Send
} from 'lucide-react';

interface ProjectReview {
  id: string;
  title: string;
  club: string;
  university: string;
  submittedDate: string;
  status: 'pending' | 'in_review' | 'completed';
  priority: 'high' | 'medium' | 'low';
  category: string;
  teamSize: number;
}

interface Mentorship {
  id: string;
  studentName: string;
  club: string;
  university: string;
  topic: string;
  nextSession: string;
  progress: number;
  sessionsCompleted: number;
  totalSessions: number;
  status: 'active' | 'scheduled' | 'completed';
}

interface Workshop {
  id: string;
  title: string;
  date: string;
  time: string;
  attendees: number;
  maxAttendees: number;
  type: 'technical' | 'business' | 'career';
  status: 'upcoming' | 'completed' | 'cancelled';
}

const mockProjectReviews: ProjectReview[] = [
  {
    id: '1',
    title: 'Smart Campus IoT System',
    club: 'ODC Tunis',
    university: 'University of Tunis',
    submittedDate: '2025-06-20',
    status: 'pending',
    priority: 'high',
    category: 'Technology',
    teamSize: 4
  },
  {
    id: '2',
    title: 'AI-Powered Learning Assistant',
    club: 'ODC Cairo',
    university: 'Cairo University',
    submittedDate: '2025-06-18',
    status: 'in_review',
    priority: 'medium',
    category: 'AI/ML',
    teamSize: 3
  },
  {
    id: '3',
    title: 'Sustainable Agriculture Platform',
    club: 'ODC Casablanca',
    university: 'Hassan II University',
    submittedDate: '2025-06-15',
    status: 'completed',
    priority: 'medium',
    category: 'Agriculture',
    teamSize: 5
  }
];

const mockMentorships: Mentorship[] = [
  {
    id: '1',
    studentName: 'Sarah Ahmed',
    club: 'ODC Tunis',
    university: 'University of Tunis',
    topic: 'Machine Learning Implementation',
    nextSession: '2025-06-28',
    progress: 75,
    sessionsCompleted: 6,
    totalSessions: 8,
    status: 'active'
  },
  {
    id: '2',
    studentName: 'Karim Hassan',
    club: 'ODC Cairo',
    university: 'Cairo University',
    topic: 'Product Strategy & Business Model',
    nextSession: '2025-06-30',
    progress: 40,
    sessionsCompleted: 2,
    totalSessions: 5,
    status: 'active'
  },
  {
    id: '3',
    studentName: 'Amina Zouari',
    club: 'ODC Casablanca',
    university: 'Hassan II University',
    topic: 'Frontend Development Best Practices',
    nextSession: '2025-07-02',
    progress: 20,
    sessionsCompleted: 1,
    totalSessions: 6,
    status: 'scheduled'
  }
];

const mockWorkshops: Workshop[] = [
  {
    id: '1',
    title: 'Building Scalable Web Applications',
    date: '2025-07-05',
    time: '14:00',
    attendees: 42,
    maxAttendees: 50,
    type: 'technical',
    status: 'upcoming'
  },
  {
    id: '2',
    title: 'From Idea to Startup: A Practical Guide',
    date: '2025-07-12',
    time: '16:00',
    attendees: 38,
    maxAttendees: 60,
    type: 'business',
    status: 'upcoming'
  },
  {
    id: '3',
    title: 'Career Paths in Tech Industry',
    date: '2025-06-15',
    time: '15:00',
    attendees: 65,
    maxAttendees: 60,
    type: 'career',
    status: 'completed'
  }
];

export function ExpertDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'in_review': return 'bg-blue-100 text-blue-700';
      case 'completed': return 'bg-green-100 text-green-700';
      case 'active': return 'bg-green-100 text-green-700';
      case 'scheduled': return 'bg-blue-100 text-blue-700';
      case 'upcoming': return 'bg-orange-100 text-orange-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'active': return <Clock className="w-4 h-4" />;
      case 'pending': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const pendingReviews = mockProjectReviews.filter(p => p.status === 'pending').length;
  const activeMentorships = mockMentorships.filter(m => m.status === 'active').length;
  const upcomingWorkshops = mockWorkshops.filter(w => w.status === 'upcoming').length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-medium">Expert Dashboard</h1>
          <p className="text-muted-foreground">Mentoring and guiding the next generation of innovators</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Session
          </Button>
          <Button className="bg-odc-orange hover:bg-odc-orange/90">
            <Video className="w-4 h-4 mr-2" />
            Start Workshop
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-odc-orange">{pendingReviews}</div>
            <p className="text-xs text-muted-foreground">Projects awaiting feedback</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Mentorships</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-odc-orange">{activeMentorships}</div>
            <p className="text-xs text-muted-foreground">Students being mentored</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Workshops</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-odc-orange">{upcomingWorkshops}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Impact Score</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-odc-orange">4.8</div>
            <p className="text-xs text-muted-foreground">Average mentee rating</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="reviews">Project Reviews</TabsTrigger>
          <TabsTrigger value="mentorship">Mentorship</TabsTrigger>
          <TabsTrigger value="workshops">Workshops</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Today's Schedule */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Today's Schedule</CardTitle>
                  <CardDescription>Your mentorship sessions and activities for today</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4 p-3 border rounded-lg">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Video className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">1:1 Mentorship Session</h4>
                      <p className="text-sm text-muted-foreground">Sarah Ahmed - ML Implementation Review</p>
                      <p className="text-xs text-muted-foreground">2:00 PM - 3:00 PM</p>
                    </div>
                    <Button size="sm" className="bg-odc-orange hover:bg-odc-orange/90">
                      Join Call
                    </Button>
                  </div>

                  <div className="flex items-center space-x-4 p-3 border rounded-lg">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">Project Review</h4>
                      <p className="text-sm text-muted-foreground">Smart Campus IoT System - Final Assessment</p>
                      <p className="text-xs text-muted-foreground">4:00 PM - 5:00 PM</p>
                    </div>
                    <Button size="sm" variant="outline">
                      View Project
                    </Button>
                  </div>

                  <div className="flex items-center space-x-4 p-3 border rounded-lg">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">Workshop Preparation</h4>
                      <p className="text-sm text-muted-foreground">Building Scalable Web Applications</p>
                      <p className="text-xs text-muted-foreground">6:00 PM - 7:00 PM</p>
                    </div>
                    <Button size="sm" variant="outline">
                      Prepare
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest interactions and achievements</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm">Completed project review for "AI-Powered Learning Assistant"</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm">Mentorship session with Karim Hassan completed</p>
                      <p className="text-xs text-muted-foreground">Yesterday</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-odc-orange rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm">Workshop "Career Paths in Tech" delivered successfully</p>
                      <p className="text-xs text-muted-foreground">3 days ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>This Month</CardTitle>
                  <CardDescription>Your impact summary</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Projects Reviewed</span>
                    <Badge variant="secondary">12</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Mentorship Hours</span>
                    <Badge className="bg-odc-orange">28h</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Workshops Delivered</span>
                    <Badge variant="outline">3</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Students Impacted</span>
                    <Badge variant="secondary">127</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Pending Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Pending Actions</CardTitle>
                  <CardDescription>Items requiring your attention</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <AlertCircle className="w-4 h-4 text-odc-orange" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">2 Project Reviews Due</p>
                      <p className="text-xs text-muted-foreground">Due today</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Workshop Materials</p>
                      <p className="text-xs text-muted-foreground">Prepare by tomorrow</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MessageSquare className="w-4 h-4 text-green-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">5 Mentee Messages</p>
                      <p className="text-xs text-muted-foreground">Awaiting response</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="reviews" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-medium">Project Reviews</h2>
              <p className="text-muted-foreground">Review and provide feedback on student projects</p>
            </div>
            <Button className="bg-odc-orange hover:bg-odc-orange/90">
              <Star className="w-4 h-4 mr-2" />
              Bulk Review
            </Button>
          </div>

          <div className="grid gap-6">
            {mockProjectReviews.map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="flex items-center space-x-2">
                        <span>{project.title}</span>
                        <Badge className={getPriorityColor(project.priority)}>
                          {project.priority}
                        </Badge>
                      </CardTitle>
                      <CardDescription className="mt-2">
                        {project.club} • {project.university} • {project.teamSize} team members
                      </CardDescription>
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
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Category:</span>
                          <span className="font-medium">{project.category}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Submitted:</span>
                          <span>{project.submittedDate}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Team Size:</span>
                          <span>{project.teamSize} members</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-end space-x-2">
                      <Button variant="outline" size="sm">
                        <MessageSquare className="w-4 h-4 mr-1" />
                        Message Team
                      </Button>
                      <Button size="sm" className="bg-odc-orange hover:bg-odc-orange/90">
                        <FileText className="w-4 h-4 mr-1" />
                        Review Project
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="mentorship" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-medium">Mentorship Program</h2>
              <p className="text-muted-foreground">Guide students through their learning journey</p>
            </div>
            <Button className="bg-odc-orange hover:bg-odc-orange/90">
              <Users className="w-4 h-4 mr-2" />
              Accept New Mentees
            </Button>
          </div>

          <div className="grid gap-6">
            {mockMentorships.map((mentorship) => (
              <Card key={mentorship.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-odc-orange text-white">
                          {mentorship.studentName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle>{mentorship.studentName}</CardTitle>
                        <CardDescription>
                          {mentorship.club} • {mentorship.university}
                        </CardDescription>
                        <p className="text-sm font-medium mt-1">{mentorship.topic}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(mentorship.status)}>
                      {mentorship.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{mentorship.progress}%</span>
                      </div>
                      <Progress value={mentorship.progress} className="h-2" />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Sessions: {mentorship.sessionsCompleted}/{mentorship.totalSessions}</span>
                        <span>Next: {mentorship.nextSession}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-end space-x-2">
                      <Button variant="outline" size="sm">
                        <MessageSquare className="w-4 h-4 mr-1" />
                        Message
                      </Button>
                      <Button size="sm" className="bg-odc-orange hover:bg-odc-orange/90">
                        <Video className="w-4 h-4 mr-1" />
                        Start Session
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="workshops" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-medium">Workshops & Training</h2>
              <p className="text-muted-foreground">Share your expertise through workshops and masterclasses</p>
            </div>
            <Button className="bg-odc-orange hover:bg-odc-orange/90">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Workshop
            </Button>
          </div>

          <div className="grid gap-6">
            {mockWorkshops.map((workshop) => (
              <Card key={workshop.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle>{workshop.title}</CardTitle>
                      <CardDescription className="mt-2">
                        {workshop.date} at {workshop.time} • {workshop.type} workshop
                      </CardDescription>
                    </div>
                    <Badge className={getStatusColor(workshop.status)}>
                      {workshop.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Attendees</span>
                        <span>{workshop.attendees}/{workshop.maxAttendees}</span>
                      </div>
                      <Progress 
                        value={(workshop.attendees / workshop.maxAttendees) * 100} 
                        className="h-2" 
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Type: {workshop.type}</span>
                        <span>{workshop.maxAttendees - workshop.attendees} spots left</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-end space-x-2">
                      <Button variant="outline" size="sm">
                        <FileText className="w-4 h-4 mr-1" />
                        Materials
                      </Button>
                      <Button size="sm" className="bg-odc-orange hover:bg-odc-orange/90">
                        <Video className="w-4 h-4 mr-1" />
                        {workshop.status === 'upcoming' ? 'Start Workshop' : 'View Recording'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <div>
            <h2 className="text-2xl font-medium mb-2">Expert Insights</h2>
            <p className="text-muted-foreground">Analytics and trends from your mentorship activities</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Mentorship Impact</CardTitle>
                <CardDescription>Success metrics from your mentoring sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center border rounded-lg bg-muted/20">
                  <div className="text-center">
                    <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">Mentorship impact analytics</p>
                    <p className="text-sm text-muted-foreground">Student progress and success rates</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Workshop Effectiveness</CardTitle>
                <CardDescription>Attendance and feedback trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center border rounded-lg bg-muted/20">
                  <div className="text-center">
                    <Target className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">Workshop analytics</p>
                    <p className="text-sm text-muted-foreground">Engagement and learning outcomes</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Expert Performance Summary</CardTitle>
              <CardDescription>Your contribution to the ODC network</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-medium text-odc-orange mb-2">89%</div>
                  <p className="text-sm text-muted-foreground">Student Success Rate</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-medium text-odc-orange mb-2">4.9</div>
                  <p className="text-sm text-muted-foreground">Avg Workshop Rating</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-medium text-odc-orange mb-2">156</div>
                  <p className="text-sm text-muted-foreground">Total Mentees</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-medium text-odc-orange mb-2">24</div>
                  <p className="text-sm text-muted-foreground">Workshops Delivered</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}