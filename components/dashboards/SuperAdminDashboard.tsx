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
  School, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  Clock,
  Award,
  BarChart3,
  PieChart,
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
  Crown,
  X,
  ArrowRight,
  ArrowLeft,
  Phone,
  Mail,
  User,
  Building2,
  Clock3,
  Languages,
  Smartphone,
  FileText,
  CalendarDays,
  DollarSign,
  Users2,
  Zap,
  Rocket,
  Gift,
  Timer,
  Map,
  FileSpreadsheet,
  Printer,
  Share2,
  RefreshCw,
  LineChart,
  AreaChart,
  Gauge,
  Layers,
  Shield,
  Database,
  Server,
  Key,
  Lock,
  Unlock,
  UserCheck,
  UserX,
  Copy,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  History,
  PlayCircle,
  PauseCircle,
  StopCircle,
  RotateCcw,
  AlertTriangle,
  Info,
  Trash2,
  Send
} from 'lucide-react';

// Mock data for global dashboard
const globalData = {
  totalCountries: 12,
  totalClubs: 156,
  totalODCiens: 8945,
  topCountry: 'Morocco',
  weeklyActiveRate: 78,
  globalGrowthRate: 18
};

const countries = [
  {
    id: '1',
    name: 'Morocco',
    code: 'MA',
    clubs: 24,
    projects: 156,
    odciens: 1247,
    adminStatus: 'active',
    lastUpdated: '2 hours ago',
    admin: 'Ahmed Benali',
    adminEmail: 'ahmed.benali@odc.ma'
  },
  {
    id: '2',
    name: 'Tunisia',
    code: 'TN',
    clubs: 18,
    projects: 124,
    odciens: 956,
    adminStatus: 'active',
    lastUpdated: '1 day ago',
    admin: 'Fatima Zahra',
    adminEmail: 'fatima.zahra@odc.tn'
  },
  {
    id: '3',
    name: 'Egypt',
    code: 'EG',
    clubs: 32,
    projects: 198,
    odciens: 1842,
    adminStatus: 'active',
    lastUpdated: '3 hours ago',
    admin: 'Omar Hassan',
    adminEmail: 'omar.hassan@odc.eg'
  },
  {
    id: '4',
    name: 'Algeria',
    code: 'DZ',
    clubs: 15,
    projects: 89,
    odciens: 678,
    adminStatus: 'inactive',
    lastUpdated: '1 week ago',
    admin: 'Not Assigned',
    adminEmail: ''
  },
  {
    id: '5',
    name: 'Jordan',
    code: 'JO',
    clubs: 12,
    projects: 76,
    odciens: 534,
    adminStatus: 'active',
    lastUpdated: '2 days ago',
    admin: 'Layla Al-Zahra',
    adminEmail: 'layla.alzahra@odc.jo'
  }
];

const competitions = [
  {
    id: '1',
    title: 'OMEA Innovation Challenge 2025',
    description: 'Global competition for breakthrough innovations',
    deadline: '2025-05-15',
    submissions: 234,
    participants: 1247,
    countries: ['Morocco', 'Tunisia', 'Egypt', 'Jordan'],
    status: 'active',
    jury: 'Assigned',
    prizes: '$50,000',
    phase: 'Submission',
    startDate: '2025-01-15',
    judgeCount: 12,
    winnersAnnounced: false
  },
  {
    id: '2',
    title: 'Africa Tech Summit',
    description: 'Annual showcase of African tech innovations',
    deadline: '2025-06-01',
    submissions: 156,
    participants: 892,
    countries: ['Morocco', 'Tunisia', 'Algeria'],
    status: 'active',
    jury: 'Pending',
    prizes: '$25,000',
    phase: 'Registration',
    startDate: '2025-02-01',
    judgeCount: 8,
    winnersAnnounced: false
  },
  {
    id: '3',
    title: 'Digital Transformation Awards',
    description: 'Recognizing digital innovation across MENA',
    deadline: '2025-04-20',
    submissions: 89,
    participants: 456,
    countries: ['Egypt', 'Jordan'],
    status: 'judging',
    jury: 'Assigned',
    prizes: '$30,000',
    phase: 'Judging',
    startDate: '2024-12-01',
    judgeCount: 15,
    winnersAnnounced: false
  }
];

const analyticsData = {
  clubsOverTime: [
    { month: 'Jan', clubs: 120, growth: 8 },
    { month: 'Feb', clubs: 135, growth: 12.5 },
    { month: 'Mar', clubs: 142, growth: 5.2 },
    { month: 'Apr', clubs: 148, growth: 4.2 },
    { month: 'May', clubs: 156, growth: 5.4 }
  ],
  projectsByCountry: [
    { country: 'Egypt', projects: 198, completed: 145, active: 53 },
    { country: 'Morocco', projects: 156, completed: 112, active: 44 },
    { country: 'Tunisia', projects: 124, completed: 89, active: 35 },
    { country: 'Algeria', projects: 89, completed: 67, active: 22 },
    { country: 'Jordan', projects: 76, completed: 54, active: 22 }
  ],
  userActivity: [
    { month: 'Jan', activity: 72, newUsers: 234 },
    { month: 'Feb', activity: 74, newUsers: 189 },
    { month: 'Mar', activity: 76, newUsers: 267 },
    { month: 'Apr', activity: 77, newUsers: 298 },
    { month: 'May', activity: 78, newUsers: 312 }
  ],
  topTechnologies: [
    { name: 'React', usage: 78, trend: 'up' },
    { name: 'Python', usage: 65, trend: 'up' },
    { name: 'JavaScript', usage: 89, trend: 'stable' },
    { name: 'Node.js', usage: 45, trend: 'up' },
    { name: 'Machine Learning', usage: 34, trend: 'up' }
  ]
};

// Mock admin users data
const adminUsers = [
  {
    id: '1',
    name: 'Sarah Al-Mansouri',
    email: 'sarah.almansouri@orange.com',
    role: 'Super Admin',
    status: 'active',
    lastLogin: '2 hours ago',
    country: 'Global',
    permissions: ['all'],
    joinDate: '2023-01-15',
    avatar: null
  },
  {
    id: '2',
    name: 'Ahmed Benali',
    email: 'ahmed.benali@orange.ma',
    role: 'Country Admin',
    status: 'active',
    lastLogin: '1 hour ago',
    country: 'Morocco',
    permissions: ['country_manage', 'events_create', 'reports_view'],
    joinDate: '2023-03-20',
    avatar: null
  },
  {
    id: '3',
    name: 'Fatima Zahra',
    email: 'fatima.zahra@orange.tn',
    role: 'Country Admin',
    status: 'active',
    lastLogin: '3 hours ago',
    country: 'Tunisia',
    permissions: ['country_manage', 'events_create', 'reports_view'],
    joinDate: '2023-02-10',
    avatar: null
  },
  {
    id: '4',
    name: 'Omar Hassan',
    email: 'omar.hassan@orange.eg',
    role: 'Country Admin',
    status: 'away',
    lastLogin: '2 days ago',
    country: 'Egypt',
    permissions: ['country_manage', 'events_create', 'reports_view'],
    joinDate: '2023-04-05',
    avatar: null
  },
  {
    id: '5',
    name: 'Lisa Chen',
    email: 'lisa.chen@orange.com',
    role: 'System Admin',
    status: 'active',
    lastLogin: '30 minutes ago',
    country: 'Global',
    permissions: ['system_manage', 'user_manage', 'security_manage'],
    joinDate: '2022-11-12',
    avatar: null
  }
];

// Mock system reports data
const systemReports = [
  {
    id: '1',
    name: 'Global Network Overview',
    description: 'Comprehensive overview of the entire ODC network',
    lastGenerated: '2025-01-20',
    frequency: 'Weekly',
    format: 'PDF',
    size: '2.4 MB',
    status: 'Ready',
    recipients: ['global-team@orange.com'],
    nextScheduled: '2025-01-27'
  },
  {
    id: '2',
    name: 'Country Performance Analysis',
    description: 'Performance metrics for all countries',
    lastGenerated: '2025-01-19',
    frequency: 'Monthly',
    format: 'Excel',
    size: '5.2 MB',
    status: 'Generating',
    recipients: ['country-admins@orange.com'],
    nextScheduled: '2025-02-19'
  },
  {
    id: '3',
    name: 'Competition Analytics',
    description: 'Analysis of all competition data and outcomes',
    lastGenerated: '2025-01-18',
    frequency: 'Quarterly',
    format: 'PowerPoint',
    size: '8.1 MB',
    status: 'Ready',
    recipients: ['competitions@orange.com'],
    nextScheduled: '2025-04-18'
  }
];

// Invite Admin Modal Component
interface InviteAdminModalProps {
  open: boolean;
  onClose: () => void;
}

function InviteAdminModal({ open, onClose }: InviteAdminModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    linkedIn: '',
    // Role & Permissions
    role: '',
    country: '',
    region: '',
    permissions: [] as string[],
    // System Access
    emailNotifications: true,
    smsNotifications: false,
    dashboardAccess: true,
    reportAccess: true,
    // Invitation Settings
    sendWelcomeEmail: true,
    setTemporaryPassword: true,
    requirePasswordChange: true,
    notes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const adminRoles = [
    {
      value: 'super_admin',
      label: 'Super Admin',
      description: 'Full system access across all countries',
      permissions: ['all']
    },
    {
      value: 'country_admin',
      label: 'Country Admin',
      description: 'Manages specific country operations',
      permissions: ['country_manage', 'events_create', 'reports_view', 'user_manage']
    },
    {
      value: 'regional_admin',
      label: 'Regional Admin',
      description: 'Manages regional club operations',
      permissions: ['region_manage', 'clubs_manage', 'events_view']
    },
    {
      value: 'system_admin',
      label: 'System Admin',
      description: 'Technical system management',
      permissions: ['system_manage', 'security_manage', 'backup_manage']
    }
  ];

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.lastName) newErrors.lastName = 'Last name is required';
      if (!formData.email) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    }

    if (step === 2) {
      if (!formData.role) newErrors.role = 'Role selection is required';
      if (formData.role === 'country_admin' && !formData.country) {
        newErrors.country = 'Country selection is required for Country Admin';
      }
      if (formData.role === 'regional_admin' && !formData.region) {
        newErrors.region = 'Region selection is required for Regional Admin';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      console.log('Inviting new admin:', formData);
      alert(`Admin invitation sent successfully to ${formData.email}!`);
      onClose();
      // Reset form
      setFormData({
        firstName: '', lastName: '', email: '', phone: '', linkedIn: '',
        role: '', country: '', region: '', permissions: [],
        emailNotifications: true, smsNotifications: false,
        dashboardAccess: true, reportAccess: true,
        sendWelcomeEmail: true, setTemporaryPassword: true,
        requirePasswordChange: true, notes: ''
      });
      setCurrentStep(1);
      setErrors({});
    }
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const selectedRole = adminRoles.find(role => role.value === formData.role);
  const progressPercentage = (currentStep / 3) * 100;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <UserPlus className="w-5 h-5 text-odc-orange" />
            <span>Invite System Administrator</span>
          </DialogTitle>
          <DialogDescription>
            Add a new administrator to the ODC platform with appropriate roles and permissions.
          </DialogDescription>
        </DialogHeader>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Step {currentStep} of 3</span>
            <span>{Math.round(progressPercentage)}% Complete</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
          
          {/* Step Indicators */}
          <div className="flex justify-between mt-4">
            {['Personal Info', 'Role & Access', 'Review & Send'].map((label, index) => (
              <div key={index} className={`flex items-center space-x-2 ${
                index + 1 <= currentStep ? 'text-odc-orange' : 'text-gray-400'
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  index + 1 < currentStep 
                    ? 'bg-odc-orange border-odc-orange text-white' 
                    : index + 1 === currentStep 
                      ? 'border-odc-orange text-odc-orange' 
                      : 'border-gray-300 text-gray-400'
                }`}>
                  {index + 1 < currentStep ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <span className="text-sm font-medium hidden md:block">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="py-6">
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-2 mb-4">
                <User className="w-5 h-5 text-odc-orange" />
                <h3 className="text-lg font-medium">Personal Information</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    placeholder="Enter first name"
                    value={formData.firstName}
                    onChange={(e) => updateFormData('firstName', e.target.value)}
                    className={errors.firstName ? 'border-red-500' : ''}
                  />
                  {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    placeholder="Enter last name"
                    value={formData.lastName}
                    onChange={(e) => updateFormData('lastName', e.target.value)}
                    className={errors.lastName ? 'border-red-500' : ''}
                  />
                  {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@orange.com"
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                    className={errors.email ? 'border-red-500' : ''}
                  />
                  {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="+1 (555) 123-4567"
                    value={formData.phone}
                    onChange={(e) => updateFormData('phone', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="linkedIn">LinkedIn Profile</Label>
                  <Input
                    id="linkedIn"
                    placeholder="https://linkedin.com/in/profile"
                    value={formData.linkedIn}
                    onChange={(e) => updateFormData('linkedIn', e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Role & Access */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="w-5 h-5 text-odc-orange" />
                <h3 className="text-lg font-medium">Role & Access Control</h3>
              </div>

              {/* Role Selection */}
              <div className="space-y-4">
                <Label>Administrator Role *</Label>
                <div className="grid md:grid-cols-2 gap-4">
                  {adminRoles.map((role) => (
                    <Card
                      key={role.value}
                      className={`p-4 cursor-pointer transition-all ${
                        formData.role === role.value 
                          ? 'border-odc-orange bg-orange-50' 
                          : 'hover:border-gray-300'
                      }`}
                      onClick={() => updateFormData('role', role.value)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          formData.role === role.value 
                            ? 'border-odc-orange bg-odc-orange' 
                            : 'border-gray-300'
                        }`}>
                          {formData.role === role.value && (
                            <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{role.label}</h4>
                          <p className="text-sm text-muted-foreground">{role.description}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
                {errors.role && <p className="text-sm text-red-500">{errors.role}</p>}
              </div>

              {/* Country/Region Selection */}
              {formData.role === 'country_admin' && (
                <div className="space-y-2">
                  <Label htmlFor="country">Assigned Country *</Label>
                  <Select value={formData.country} onValueChange={(value) => updateFormData('country', value)}>
                    <SelectTrigger className={errors.country ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country.id} value={country.name}>{country.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.country && <p className="text-sm text-red-500">{errors.country}</p>}
                </div>
              )}

              {formData.role === 'regional_admin' && (
                <div className="space-y-2">
                  <Label htmlFor="region">Assigned Region *</Label>
                  <Select value={formData.region} onValueChange={(value) => updateFormData('region', value)}>
                    <SelectTrigger className={errors.region ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="north-africa">North Africa</SelectItem>
                      <SelectItem value="west-africa">West Africa</SelectItem>
                      <SelectItem value="east-africa">East Africa</SelectItem>
                      <SelectItem value="middle-east">Middle East</SelectItem>
                      <SelectItem value="europe">Europe</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.region && <p className="text-sm text-red-500">{errors.region}</p>}
                </div>
              )}

              {/* Permissions Preview */}
              {selectedRole && (
                <Card className="border-blue-200 bg-blue-50">
                  <CardHeader>
                    <CardTitle className="text-sm">Role Permissions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {selectedRole.permissions.map((permission) => (
                        <Badge key={permission} variant="secondary" className="bg-blue-100 text-blue-700">
                          {permission.replace('_', ' ').toUpperCase()}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Access Settings */}
              <div className="space-y-4">
                <Label>System Access</Label>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">Dashboard Access</span>
                      <p className="text-sm text-muted-foreground">Access to admin dashboard</p>
                    </div>
                    <Checkbox
                      checked={formData.dashboardAccess}
                      onCheckedChange={(checked) => updateFormData('dashboardAccess', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">Report Generation</span>
                      <p className="text-sm text-muted-foreground">Ability to generate and download reports</p>
                    </div>
                    <Checkbox
                      checked={formData.reportAccess}
                      onCheckedChange={(checked) => updateFormData('reportAccess', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">Email Notifications</span>
                      <p className="text-sm text-muted-foreground">Receive system notifications via email</p>
                    </div>
                    <Checkbox
                      checked={formData.emailNotifications}
                      onCheckedChange={(checked) => updateFormData('emailNotifications', checked)}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Review & Send */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-2 mb-4">
                <Send className="w-5 h-5 text-odc-orange" />
                <h3 className="text-lg font-medium">Review & Send Invitation</h3>
              </div>

              {/* Admin Summary */}
              <Card className="border-odc-orange/20 bg-orange-50">
                <CardHeader>
                  <CardTitle className="text-lg">New Administrator Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Name:</span> {formData.firstName} {formData.lastName}
                    </div>
                    <div>
                      <span className="font-medium">Email:</span> {formData.email}
                    </div>
                    <div>
                      <span className="font-medium">Role:</span> {selectedRole?.label}
                    </div>
                    <div>
                      <span className="font-medium">Access Level:</span> {
                        formData.country ? `Country: ${formData.country}` :
                        formData.region ? `Region: ${formData.region}` :
                        'Global'
                      }
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Invitation Settings */}
              <div className="space-y-4">
                <Label>Invitation Settings</Label>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">Send Welcome Email</span>
                      <p className="text-sm text-muted-foreground">Send invitation email with account details</p>
                    </div>
                    <Checkbox
                      checked={formData.sendWelcomeEmail}
                      onCheckedChange={(checked) => updateFormData('sendWelcomeEmail', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">Set Temporary Password</span>
                      <p className="text-sm text-muted-foreground">Generate secure temporary password</p>
                    </div>
                    <Checkbox
                      checked={formData.setTemporaryPassword}
                      onCheckedChange={(checked) => updateFormData('setTemporaryPassword', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">Require Password Change</span>
                      <p className="text-sm text-muted-foreground">Force password change on first login</p>
                    </div>
                    <Checkbox
                      checked={formData.requirePasswordChange}
                      onCheckedChange={(checked) => updateFormData('requirePasswordChange', checked)}
                    />
                  </div>
                </div>
              </div>

              {/* Additional Notes */}
              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Any special instructions or notes for the new administrator"
                  value={formData.notes}
                  onChange={(e) => updateFormData('notes', e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="border-t pt-4">
          <div className="flex justify-between w-full">
            <div>
              {currentStep > 1 && (
                <Button variant="outline" onClick={handlePrevious}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
              )}
            </div>
            
            <div className="flex space-x-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              
              {currentStep < 3 ? (
                <Button onClick={handleNext} className="bg-odc-orange hover:bg-odc-orange/90">
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
                  <Send className="w-4 h-4 mr-2" />
                  Send Invitation
                </Button>
              )}
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// System Settings Modal Component
interface SystemSettingsModalProps {
  open: boolean;
  onClose: () => void;
}

function SystemSettingsModal({ open, onClose }: SystemSettingsModalProps) {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    // General Settings
    systemName: 'ODC Club Hybride Platform',
    systemDescription: 'Orange Digital Center university club network platform',
    maintenanceMode: false,
    registrationEnabled: true,
    // Security Settings
    passwordMinLength: 8,
    passwordRequireSpecial: true,
    sessionTimeout: 1440, // minutes
    twoFactorRequired: false,
    apiRateLimit: 1000,
    // Email Settings
    smtpHost: 'smtp.orange.com',
    smtpPort: 587,
    smtpUsername: 'noreply@orange.com',
    smtpPassword: '',
    emailFromName: 'ODC Platform',
    // Notification Settings
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    digestFrequency: 'weekly',
    // Integration Settings
    googleAnalyticsId: '',
    microsoftTeamsWebhook: '',
    slackWebhook: '',
    // Backup Settings
    autoBackup: true,
    backupFrequency: 'daily',
    retentionDays: 30,
    backupLocation: 's3'
  });

  const [hasChanges, setHasChanges] = useState(false);

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleSaveSettings = () => {
    console.log('Saving system settings:', settings);
    alert('System settings saved successfully!');
    setHasChanges(false);
  };

  const handleResetSettings = () => {
    if (confirm('Are you sure you want to reset all settings to default values?')) {
      // Reset to default values
      console.log('Resetting settings to defaults');
      setHasChanges(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Settings className="w-5 h-5 text-odc-orange" />
            <span>System Settings</span>
          </DialogTitle>
          <DialogDescription>
            Configure system-wide settings and preferences for the ODC platform.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-white/80 backdrop-blur-sm border border-orange-200/50">
            <TabsTrigger value="general" className="data-[state=active]:bg-odc-orange data-[state=active]:text-white">
              <Server className="w-4 h-4 mr-2" />
              General
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-odc-orange data-[state=active]:text-white">
              <Shield className="w-4 h-4 mr-2" />
              Security
            </TabsTrigger>
            <TabsTrigger value="email" className="data-[state=active]:bg-odc-orange data-[state=active]:text-white">
              <Mail className="w-4 h-4 mr-2" />
              Email
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-odc-orange data-[state=active]:text-white">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="integrations" className="data-[state=active]:bg-odc-orange data-[state=active]:text-white">
              <ExternalLink className="w-4 h-4 mr-2" />
              Integrations
            </TabsTrigger>
            <TabsTrigger value="backup" className="data-[state=active]:bg-odc-orange data-[state=active]:text-white">
              <Database className="w-4 h-4 mr-2" />
              Backup
            </TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>General System Configuration</CardTitle>
                <CardDescription>Basic system settings and platform configuration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="systemName">System Name</Label>
                    <Input
                      id="systemName"
                      value={settings.systemName}
                      onChange={(e) => updateSetting('systemName', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="systemDescription">System Description</Label>
                    <Input
                      id="systemDescription"
                      value={settings.systemDescription}
                      onChange={(e) => updateSetting('systemDescription', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Maintenance Mode</h4>
                      <p className="text-sm text-muted-foreground">
                        Enable maintenance mode to prevent user access during updates
                      </p>
                    </div>
                    <Checkbox
                      checked={settings.maintenanceMode}
                      onCheckedChange={(checked) => updateSetting('maintenanceMode', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">New Registrations</h4>
                      <p className="text-sm text-muted-foreground">
                        Allow new users to register accounts
                      </p>
                    </div>
                    <Checkbox
                      checked={settings.registrationEnabled}
                      onCheckedChange={(checked) => updateSetting('registrationEnabled', checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Security Configuration</CardTitle>
                <CardDescription>Password policies, session management, and API security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="passwordMinLength">Minimum Password Length</Label>
                    <Input
                      id="passwordMinLength"
                      type="number"
                      min="6"
                      max="50"
                      value={settings.passwordMinLength}
                      onChange={(e) => updateSetting('passwordMinLength', parseInt(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                    <Input
                      id="sessionTimeout"
                      type="number"
                      min="15"
                      max="10080"
                      value={settings.sessionTimeout}
                      onChange={(e) => updateSetting('sessionTimeout', parseInt(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="apiRateLimit">API Rate Limit (requests/hour)</Label>
                    <Input
                      id="apiRateLimit"
                      type="number"
                      min="100"
                      max="10000"
                      value={settings.apiRateLimit}
                      onChange={(e) => updateSetting('apiRateLimit', parseInt(e.target.value))}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Require Special Characters</h4>
                      <p className="text-sm text-muted-foreground">
                        Passwords must contain special characters (!@#$%^&*)
                      </p>
                    </div>
                    <Checkbox
                      checked={settings.passwordRequireSpecial}
                      onCheckedChange={(checked) => updateSetting('passwordRequireSpecial', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Two-Factor Authentication</h4>
                      <p className="text-sm text-muted-foreground">
                        Require 2FA for all administrator accounts
                      </p>
                    </div>
                    <Checkbox
                      checked={settings.twoFactorRequired}
                      onCheckedChange={(checked) => updateSetting('twoFactorRequired', checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Email Settings */}
          <TabsContent value="email" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Email Configuration</CardTitle>
                <CardDescription>SMTP settings and email preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="smtpHost">SMTP Host</Label>
                    <Input
                      id="smtpHost"
                      value={settings.smtpHost}
                      onChange={(e) => updateSetting('smtpHost', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtpPort">SMTP Port</Label>
                    <Input
                      id="smtpPort"
                      type="number"
                      value={settings.smtpPort}
                      onChange={(e) => updateSetting('smtpPort', parseInt(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtpUsername">SMTP Username</Label>
                    <Input
                      id="smtpUsername"
                      value={settings.smtpUsername}
                      onChange={(e) => updateSetting('smtpUsername', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtpPassword">SMTP Password</Label>
                    <Input
                      id="smtpPassword"
                      type="password"
                      value={settings.smtpPassword}
                      onChange={(e) => updateSetting('smtpPassword', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="emailFromName">From Name</Label>
                    <Input
                      id="emailFromName"
                      value={settings.emailFromName}
                      onChange={(e) => updateSetting('emailFromName', e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2 p-4 border rounded-lg bg-blue-50">
                  <Info className="w-5 h-5 text-blue-500" />
                  <div className="text-sm">
                    <p className="font-medium">Test Email Configuration</p>
                    <p className="text-muted-foreground">Send a test email to verify SMTP settings are working correctly.</p>
                  </div>
                  <Button variant="outline" size="sm" className="ml-auto">
                    Send Test Email
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Settings */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Configure notification channels and frequency</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Email Notifications</h4>
                      <p className="text-sm text-muted-foreground">
                        Send notifications via email
                      </p>
                    </div>
                    <Checkbox
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) => updateSetting('emailNotifications', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">SMS Notifications</h4>
                      <p className="text-sm text-muted-foreground">
                        Send critical notifications via SMS
                      </p>
                    </div>
                    <Checkbox
                      checked={settings.smsNotifications}
                      onCheckedChange={(checked) => updateSetting('smsNotifications', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Push Notifications</h4>
                      <p className="text-sm text-muted-foreground">
                        Send browser push notifications
                      </p>
                    </div>
                    <Checkbox
                      checked={settings.pushNotifications}
                      onCheckedChange={(checked) => updateSetting('pushNotifications', checked)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="digestFrequency">Digest Frequency</Label>
                  <Select value={settings.digestFrequency} onValueChange={(value) => updateSetting('digestFrequency', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="never">Never</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Integrations Settings */}
          <TabsContent value="integrations" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>External Integrations</CardTitle>
                <CardDescription>Configure third-party service integrations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="googleAnalyticsId">Google Analytics Tracking ID</Label>
                    <Input
                      id="googleAnalyticsId"
                      placeholder="G-XXXXXXXXXX"
                      value={settings.googleAnalyticsId}
                      onChange={(e) => updateSetting('googleAnalyticsId', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="microsoftTeamsWebhook">Microsoft Teams Webhook URL</Label>
                    <Input
                      id="microsoftTeamsWebhook"
                      placeholder="https://outlook.office.com/webhook/..."
                      value={settings.microsoftTeamsWebhook}
                      onChange={(e) => updateSetting('microsoftTeamsWebhook', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="slackWebhook">Slack Webhook URL</Label>
                    <Input
                      id="slackWebhook"
                      placeholder="https://hooks.slack.com/services/..."
                      value={settings.slackWebhook}
                      onChange={(e) => updateSetting('slackWebhook', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <Card className="p-4 text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
                      <ExternalLink className="w-6 h-6 text-blue-600" />
                    </div>
                    <h4 className="font-medium mb-2">Microsoft Teams</h4>
                    <Badge className={settings.microsoftTeamsWebhook ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
                      {settings.microsoftTeamsWebhook ? 'Connected' : 'Not Connected'}
                    </Badge>
                  </Card>

                  <Card className="p-4 text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
                      <MessageSquare className="w-6 h-6 text-purple-600" />
                    </div>
                    <h4 className="font-medium mb-2">Slack</h4>
                    <Badge className={settings.slackWebhook ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
                      {settings.slackWebhook ? 'Connected' : 'Not Connected'}
                    </Badge>
                  </Card>

                  <Card className="p-4 text-center">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
                      <BarChart3 className="w-6 h-6 text-orange-600" />
                    </div>
                    <h4 className="font-medium mb-2">Google Analytics</h4>
                    <Badge className={settings.googleAnalyticsId ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
                      {settings.googleAnalyticsId ? 'Connected' : 'Not Connected'}
                    </Badge>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Backup Settings */}
          <TabsContent value="backup" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Backup & Recovery</CardTitle>
                <CardDescription>Configure automated backups and data retention</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Automatic Backups</h4>
                    <p className="text-sm text-muted-foreground">
                      Enable scheduled automatic backups
                    </p>
                  </div>
                  <Checkbox
                    checked={settings.autoBackup}
                    onCheckedChange={(checked) => updateSetting('autoBackup', checked)}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="backupFrequency">Backup Frequency</Label>
                    <Select value={settings.backupFrequency} onValueChange={(value) => updateSetting('backupFrequency', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="retentionDays">Retention Period (days)</Label>
                    <Input
                      id="retentionDays"
                      type="number"
                      min="1"
                      max="365"
                      value={settings.retentionDays}
                      onChange={(e) => updateSetting('retentionDays', parseInt(e.target.value))}
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="backupLocation">Backup Storage Location</Label>
                    <Select value={settings.backupLocation} onValueChange={(value) => updateSetting('backupLocation', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="s3">Amazon S3</SelectItem>
                        <SelectItem value="azure">Azure Blob Storage</SelectItem>
                        <SelectItem value="gcp">Google Cloud Storage</SelectItem>
                        <SelectItem value="local">Local Storage</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 border rounded-lg bg-yellow-50">
                  <AlertTriangle className="w-5 h-5 text-yellow-500" />
                  <div>
                    <h4 className="font-medium">Manual Backup</h4>
                    <p className="text-sm text-muted-foreground">
                      Create an immediate backup of all system data
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="ml-auto">
                    <Download className="w-4 h-4 mr-2" />
                    Create Backup
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <DialogFooter className="border-t pt-4">
          <div className="flex justify-between w-full">
            <div className="flex items-center space-x-2">
              {hasChanges && (
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  Unsaved Changes
                </Badge>
              )}
            </div>
            
            <div className="flex space-x-2">
              <Button variant="outline" onClick={handleResetSettings}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset to Defaults
              </Button>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button 
                onClick={handleSaveSettings}
                disabled={!hasChanges}
                className="bg-odc-orange hover:bg-odc-orange/90"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Save Settings
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function SuperAdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [analyticsTimeRange, setAnalyticsTimeRange] = useState('6months');
  const [selectedCompetition, setSelectedCompetition] = useState('');
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [showInviteAdmin, setShowInviteAdmin] = useState(false);
  const [showSystemSettings, setShowSystemSettings] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'inactive': return 'bg-red-100 text-red-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'judging': return 'bg-blue-100 text-blue-700';
      case 'away': return 'bg-yellow-100 text-yellow-700';
      case 'Ready': return 'bg-green-100 text-green-700';
      case 'Generating': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-gray-50">
      <div className="p-6 space-y-6">
        {/* Global Overview Header */}
        <Card className="bg-gradient-to-r from-odc-orange via-orange-600 to-red-600 text-white border-0 shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center">
                  <Crown className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">Super Admin - OMEA Global</h1>
                  <p className="text-orange-100">Managing ODC network across {globalData.totalCountries} countries</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge className="bg-green-500 text-white">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Global Network Active
                    </Badge>
                    <span className="text-orange-100 text-sm">Growth: +{globalData.globalGrowthRate}% this quarter</span>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <Button className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                  <Plus className="w-4 h-4 mr-2" />
                  Launch Global Competition
                </Button>
                <Button className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                  <Flag className="w-4 h-4 mr-2" />
                  Add Country
                </Button>
                <Button className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                  <Download className="w-4 h-4 mr-2" />
                  Global Report
                </Button>
              </div>
            </div>

            {/* Global KPIs */}
            <div className="grid md:grid-cols-6 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <Flag className="w-8 h-8 mx-auto mb-2 text-white" />
                <p className="text-2xl font-bold text-white">{globalData.totalCountries}</p>
                <p className="text-orange-100 text-sm">Countries</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <Building className="w-8 h-8 mx-auto mb-2 text-white" />
                <p className="text-2xl font-bold text-white">{globalData.totalClubs}</p>
                <p className="text-orange-100 text-sm">Active Clubs</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <Briefcase className="w-8 h-8 mx-auto mb-2 text-white" />
                <p className="text-2xl font-bold text-white">643</p>
                <p className="text-orange-100 text-sm">Projects</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <Users className="w-8 h-8 mx-auto mb-2 text-white" />
                <p className="text-2xl font-bold text-white">{globalData.totalODCiens.toLocaleString()}</p>
                <p className="text-orange-100 text-sm">ODCiens</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <Activity className="w-8 h-8 mx-auto mb-2 text-white" />
                <p className="text-2xl font-bold text-white">{globalData.weeklyActiveRate}%</p>
                <p className="text-orange-100 text-sm">Weekly Active</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <Star className="w-8 h-8 mx-auto mb-2 text-white" />
                <p className="text-xl font-bold text-white">{globalData.topCountry}</p>
                <p className="text-orange-100 text-sm">Top Country</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-white/80 backdrop-blur-sm border border-orange-200/50">
            <TabsTrigger value="overview" className="data-[state=active]:bg-odc-orange data-[state=active]:text-white">
              <Target className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="countries" className="data-[state=active]:bg-odc-orange data-[state=active]:text-white">
              <Globe className="w-4 h-4 mr-2" />
              Countries
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-odc-orange data-[state=active]:text-white">
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="competitions" className="data-[state=active]:bg-odc-orange data-[state=active]:text-white">
              <Trophy className="w-4 h-4 mr-2" />
              Competitions
            </TabsTrigger>
            <TabsTrigger value="admins" className="data-[state=active]:bg-odc-orange data-[state=active]:text-white">
              <Users className="w-4 h-4 mr-2" />
              Admin Control
            </TabsTrigger>
            <TabsTrigger value="reports" className="data-[state=active]:bg-odc-orange data-[state=active]:text-white">
              <Download className="w-4 h-4 mr-2" />
              Reports
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Top Performing Countries */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Trophy className="w-5 h-5 text-odc-orange" />
                    <span>Top Performing Countries</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {countries.slice(0, 4).map((country, index) => (
                    <div key={country.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-odc-orange/10 rounded-full flex items-center justify-center">
                          <span className="font-bold text-odc-orange">#{index + 1}</span>
                        </div>
                        <div>
                          <h4 className="font-medium">{country.name}</h4>
                          <p className="text-sm text-muted-foreground">{country.clubs} clubs • {country.odciens} ODCiens</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(country.adminStatus)}>
                          {country.adminStatus}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">{country.lastUpdated}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Global Activity Feed */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="w-5 h-5 text-odc-orange" />
                    <span>Global Activity Feed</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                      <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                        <Flag className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">New Country Added</h4>
                        <p className="text-sm text-muted-foreground">Lebanon joined the ODC network</p>
                        <p className="text-xs text-muted-foreground">2 hours ago</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                        <Trophy className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">Competition Milestone</h4>
                        <p className="text-sm text-muted-foreground">OMEA Challenge reached 1000 participants</p>
                        <p className="text-xs text-muted-foreground">1 day ago</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                      <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                        <UserPlus className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">Admin Assignment</h4>
                        <p className="text-sm text-muted-foreground">New national admin assigned to Algeria</p>
                        <p className="text-xs text-muted-foreground">3 days ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Network Health */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-odc-orange" />
                  <span>Network Health Overview</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center p-4 border rounded-lg bg-white">
                    <p className="text-2xl font-bold text-green-500">{analyticsData.clubsOverTime[4].clubs}</p>
                    <p className="text-sm text-muted-foreground">Total Clubs</p>
                    <p className="text-xs text-green-600 mt-1">+{analyticsData.clubsOverTime[4].clubs - analyticsData.clubsOverTime[3].clubs} this month</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg bg-white">
                    <p className="text-2xl font-bold text-blue-500">{analyticsData.projectsByCountry.reduce((sum, country) => sum + country.projects, 0)}</p>
                    <p className="text-sm text-muted-foreground">Active Projects</p>
                    <p className="text-xs text-blue-600 mt-1">Global network total</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg bg-white">
                    <p className="text-2xl font-bold text-odc-orange">{analyticsData.userActivity[4].activity}%</p>
                    <p className="text-sm text-muted-foreground">Global Activity</p>
                    <p className="text-xs text-green-600 mt-1">+{analyticsData.userActivity[4].activity - analyticsData.userActivity[3].activity}% this month</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg bg-white">
                    <p className="text-2xl font-bold text-purple-500">{competitions.length}</p>
                    <p className="text-sm text-muted-foreground">Global Competitions</p>
                    <p className="text-xs text-purple-600 mt-1">Currently active</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Countries Tab */}
          <TabsContent value="countries" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Countries Network</CardTitle>
                    <CardDescription>Manage all countries in the ODC network</CardDescription>
                  </div>
                  <Button className="bg-odc-orange hover:bg-odc-orange/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Country
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Country</TableHead>
                      <TableHead>Clubs</TableHead>
                      <TableHead>Projects</TableHead>
                      <TableHead>ODCiens</TableHead>
                      <TableHead>Admin Status</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {countries.map((country) => (
                      <TableRow key={country.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-odc-orange/10 rounded-full flex items-center justify-center">
                              <Flag className="w-4 h-4 text-odc-orange" />
                            </div>
                            <div>
                              <h4 className="font-medium">{country.name}</h4>
                              <p className="text-sm text-muted-foreground">{country.code}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-center">
                            <p className="font-medium">{country.clubs}</p>
                            <p className="text-xs text-muted-foreground">clubs</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-center">
                            <p className="font-medium">{country.projects}</p>
                            <p className="text-xs text-muted-foreground">projects</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-center">
                            <p className="font-medium">{country.odciens.toLocaleString()}</p>
                            <p className="text-xs text-muted-foreground">members</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <Badge className={getStatusColor(country.adminStatus)}>
                              {country.adminStatus}
                            </Badge>
                            {country.admin !== 'Not Assigned' && (
                              <p className="text-xs text-muted-foreground mt-1">{country.admin}</p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{country.lastUpdated}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <UserPlus className="w-4 h-4" />
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

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Global Analytics Dashboard</h2>
                <p className="text-muted-foreground">Comprehensive analytics and insights across the entire ODC network</p>
              </div>
              <div className="flex items-center space-x-2">
                <Select value={analyticsTimeRange} onValueChange={setAnalyticsTimeRange}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1month">Last Month</SelectItem>
                    <SelectItem value="3months">Last 3 Months</SelectItem>
                    <SelectItem value="6months">Last 6 Months</SelectItem>
                    <SelectItem value="1year">Last Year</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export Data
                </Button>
              </div>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span>Growth Rate</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline space-x-2">
                    <p className="text-2xl font-bold text-green-500">+{globalData.globalGrowthRate}%</p>
                    <span className="text-xs text-muted-foreground">vs last quarter</span>
                  </div>
                  <Progress value={globalData.globalGrowthRate} className="mt-2 h-2" />
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center space-x-2">
                    <Users className="w-4 h-4 text-blue-500" />
                    <span>Active Users</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline space-x-2">
                    <p className="text-2xl font-bold text-blue-500">{globalData.weeklyActiveRate}%</p>
                    <span className="text-xs text-muted-foreground">weekly active</span>
                  </div>
                  <Progress value={globalData.weeklyActiveRate} className="mt-2 h-2" />
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center space-x-2">
                    <Trophy className="w-4 h-4 text-orange-500" />
                    <span>Competitions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline space-x-2">
                    <p className="text-2xl font-bold text-orange-500">{competitions.length}</p>
                    <span className="text-xs text-muted-foreground">active</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {competitions.reduce((sum, comp) => sum + comp.participants, 0).toLocaleString()} participants
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center space-x-2">
                    <Briefcase className="w-4 h-4 text-purple-500" />
                    <span>Projects</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline space-x-2">
                    <p className="text-2xl font-bold text-purple-500">643</p>
                    <span className="text-xs text-muted-foreground">total</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {analyticsData.projectsByCountry.reduce((sum, country) => sum + country.completed, 0)} completed
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Charts Row */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Club Growth Chart */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <LineChart className="w-5 h-5 text-odc-orange" />
                    <span>Club Growth Trend</span>
                  </CardTitle>
                  <CardDescription>Number of active clubs over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.clubsOverTime.map((data, index) => (
                      <div key={data.month} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{data.month}</span>
                        <div className="flex items-center space-x-3">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-odc-orange h-2 rounded-full" 
                              style={{ width: `${(data.clubs / 200) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-bold text-odc-orange">{data.clubs}</span>
                          <Badge variant="secondary" className="text-xs">
                            +{data.growth}%
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Projects by Country */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5 text-odc-orange" />
                    <span>Projects by Country</span>
                  </CardTitle>
                  <CardDescription>Distribution of projects across countries</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.projectsByCountry.map((data) => (
                      <div key={data.country} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{data.country}</span>
                          <span className="text-sm font-bold">{data.projects}</span>
                        </div>
                        <div className="flex space-x-1">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full" 
                              style={{ width: `${(data.completed / data.projects) * 100}%` }}
                            ></div>
                          </div>
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-odc-orange h-2 rounded-full" 
                              style={{ width: `${(data.active / data.projects) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{data.completed} completed</span>
                          <span>{data.active} active</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Technology Trends */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-odc-orange" />
                  <span>Technology Trends</span>
                </CardTitle>
                <CardDescription>Most popular technologies across the network</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-5 gap-4">
                  {analyticsData.topTechnologies.map((tech) => (
                    <div key={tech.name} className="text-center p-4 border rounded-lg bg-white">
                      <h4 className="font-medium">{tech.name}</h4>
                      <p className="text-2xl font-bold text-odc-orange mt-2">{tech.usage}%</p>
                      <div className="flex items-center justify-center mt-2">
                        {tech.trend === 'up' ? (
                          <div className="flex items-center text-green-600">
                            <ChevronUp className="w-4 h-4" />
                            <span className="text-xs">Trending</span>
                          </div>
                        ) : (
                          <span className="text-xs text-gray-500">Stable</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Competitions Tab */}
          <TabsContent value="competitions" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Global Competitions</h2>
                <p className="text-muted-foreground">Manage international competitions and challenges</p>
              </div>
              <Button className="bg-odc-orange hover:bg-odc-orange/90">
                <Plus className="w-4 h-4 mr-2" />
                Launch Global Competition
              </Button>
            </div>

            {/* Competition Stats */}
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Active Competitions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-odc-orange">{competitions.filter(c => c.status === 'active').length}</p>
                  <p className="text-xs text-muted-foreground">Currently running</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Participants</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-blue-500">
                    {competitions.reduce((sum, comp) => sum + comp.participants, 0).toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">Across all competitions</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-green-500">
                    {competitions.reduce((sum, comp) => sum + comp.submissions, 0)}
                  </p>
                  <p className="text-xs text-muted-foreground">Projects submitted</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Prize Pool</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-purple-500">$105K</p>
                  <p className="text-xs text-muted-foreground">Total rewards</p>
                </CardContent>
              </Card>
            </div>

            {/* Competition List */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Competition Management</CardTitle>
                <CardDescription>Monitor and manage all global competitions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {competitions.map((competition) => (
                    <Card key={competition.id} className="border border-gray-200">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-medium">{competition.title}</h3>
                            <p className="text-sm text-muted-foreground">{competition.description}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className={getStatusColor(competition.status)}>
                              {competition.status}
                            </Badge>
                            <Badge variant="outline">
                              {competition.phase}
                            </Badge>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-4 gap-4 mb-4">
                          <div className="flex items-center space-x-2">
                            <Users className="w-4 h-4 text-gray-500" />
                            <div>
                              <p className="text-sm font-medium">{competition.participants.toLocaleString()}</p>
                              <p className="text-xs text-muted-foreground">Participants</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <FileText className="w-4 h-4 text-gray-500" />
                            <div>
                              <p className="text-sm font-medium">{competition.submissions}</p>
                              <p className="text-xs text-muted-foreground">Submissions</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Award className="w-4 h-4 text-gray-500" />
                            <div>
                              <p className="text-sm font-medium">{competition.prizes}</p>
                              <p className="text-xs text-muted-foreground">Prize Pool</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-gray-500" />
                            <div>
                              <p className="text-sm font-medium">{competition.deadline}</p>
                              <p className="text-xs text-muted-foreground">Deadline</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Globe className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-muted-foreground">
                              {competition.countries.join(', ')}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </Button>
                            <Button variant="outline" size="sm">
                              <Users className="w-4 h-4 mr-2" />
                              {competition.judgeCount} Judges
                            </Button>
                            <Button variant="outline" size="sm">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Admin Control Tab */}
          <TabsContent value="admins" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Admin Control Panel</h2>
                <p className="text-muted-foreground">Manage system administrators and user permissions</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={() => setShowInviteAdmin(true)}>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Invite Admin
                </Button>
                <Button variant="outline" size="sm" onClick={() => setShowSystemSettings(true)}>
                  <Settings className="w-4 h-4 mr-2" />
                  System Settings
                </Button>
              </div>
            </div>

            {/* System Health */}
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-green-500" />
                    <span>System Status</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-green-600">All Systems Operational</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Last check: 2 minutes ago</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center space-x-2">
                    <Users className="w-4 h-4 text-blue-500" />
                    <span>Active Admins</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-blue-500">
                    {adminUsers.filter(u => u.status === 'active').length}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    of {adminUsers.length} total
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center space-x-2">
                    <Database className="w-4 h-4 text-purple-500" />
                    <span>Storage Usage</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-purple-500">67%</p>
                  <Progress value={67} className="mt-2 h-2" />
                  <p className="text-xs text-muted-foreground mt-1">2.1 TB of 3.2 TB</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center space-x-2">
                    <Activity className="w-4 h-4 text-odc-orange" />
                    <span>API Usage</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-odc-orange">89%</p>
                  <Progress value={89} className="mt-2 h-2" />
                  <p className="text-xs text-muted-foreground mt-1">Daily limit</p>
                </CardContent>
              </Card>
            </div>

            {/* Admin Users Table */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>System Administrators</CardTitle>
                <CardDescription>Manage admin users and their permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Country/Scope</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {adminUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback className="bg-odc-orange text-white">
                                {user.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-medium">{user.name}</h4>
                              <p className="text-sm text-muted-foreground">{user.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.country}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(user.status)}>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.lastLogin}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Key className="w-4 h-4" />
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

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Global Reports</h2>
                <p className="text-muted-foreground">Generate and export comprehensive network reports</p>
              </div>
              <Button className="bg-odc-orange hover:bg-odc-orange/90">
                <Plus className="w-4 h-4 mr-2" />
                Create New Report
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Scheduled Reports</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-odc-orange">{systemReports.length}</p>
                  <p className="text-xs text-muted-foreground">Auto-generated</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">This Month</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-blue-500">47</p>
                  <p className="text-xs text-muted-foreground">Reports generated</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Size</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-green-500">15.7 MB</p>
                  <p className="text-xs text-muted-foreground">Storage used</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Downloads</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-purple-500">234</p>
                  <p className="text-xs text-muted-foreground">This quarter</p>
                </CardContent>
              </Card>
            </div>

            {/* Scheduled Reports */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-odc-orange" />
                  <span>Scheduled Reports</span>
                </CardTitle>
                <CardDescription>Automatically generated reports and their status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {systemReports.map((report) => (
                    <Card key={report.id} className="border border-gray-200">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3">
                              <FileText className="w-5 h-5 text-odc-orange" />
                              <div>
                                <h4 className="font-medium">{report.name}</h4>
                                <p className="text-sm text-muted-foreground">{report.description}</p>
                              </div>
                            </div>
                            
                            <div className="grid md:grid-cols-4 gap-4 mt-4 text-sm">
                              <div>
                                <span className="text-muted-foreground">Frequency:</span>
                                <p className="font-medium">{report.frequency}</p>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Last Generated:</span>
                                <p className="font-medium">{report.lastGenerated}</p>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Format:</span>
                                <p className="font-medium">{report.format}</p>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Size:</span>
                                <p className="font-medium">{report.size}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Badge className={getStatusColor(report.status)}>
                              {report.status}
                            </Badge>
                            <Button variant="outline" size="sm">
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </Button>
                            <Button variant="outline" size="sm">
                              <Settings className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-4 pt-4 border-t">
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Mail className="w-4 h-4" />
                              <span>{report.recipients.length} recipients</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>Next: {report.nextScheduled}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4 mr-2" />
                              Preview
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Send className="w-4 h-4 mr-2" />
                              Send Now
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Report Templates */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Layers className="w-5 h-5 text-odc-orange" />
                  <span>Report Templates</span>
                </CardTitle>
                <CardDescription>Pre-configured report templates for common use cases</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    {
                      name: 'Executive Summary',
                      description: 'High-level overview for leadership',
                      icon: Crown,
                      frequency: 'Monthly',
                      popular: true
                    },
                    {
                      name: 'Performance Analytics',
                      description: 'Detailed performance metrics',
                      icon: BarChart3,
                      frequency: 'Weekly',
                      popular: false
                    },
                    {
                      name: 'Financial Report',
                      description: 'Budget and expense tracking',
                      icon: DollarSign,
                      frequency: 'Quarterly',
                      popular: false
                    },
                    {
                      name: 'User Activity Report',
                      description: 'Engagement and activity metrics',
                      icon: Users,
                      frequency: 'Monthly',
                      popular: true
                    },
                    {
                      name: 'Competition Summary',
                      description: 'Competition results and analysis',
                      icon: Trophy,
                      frequency: 'As needed',
                      popular: false
                    },
                    {
                      name: 'Custom Template',
                      description: 'Create your own template',
                      icon: Plus,
                      frequency: 'Custom',
                      popular: false
                    }
                  ].map((template) => {
                    const IconComponent = template.icon;
                    return (
                      <Card 
                        key={template.name} 
                        className="border border-gray-200 hover:border-odc-orange cursor-pointer transition-all hover:shadow-md"
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="w-10 h-10 bg-odc-orange/10 rounded-lg flex items-center justify-center">
                              <IconComponent className="w-5 h-5 text-odc-orange" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium">{template.name}</h4>
                              {template.popular && (
                                <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                                  Popular
                                </Badge>
                              )}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>{template.frequency}</span>
                            <Button variant="outline" size="sm">
                              Use Template
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Invite Admin Modal */}
      <InviteAdminModal
        open={showInviteAdmin}
        onClose={() => setShowInviteAdmin(false)}
      />

      {/* System Settings Modal */}
      <SystemSettingsModal
        open={showSystemSettings}
        onClose={() => setShowSystemSettings(false)}
      />
    </div>
  );
}