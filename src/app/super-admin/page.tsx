"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Building,
  Users,
  DollarSign,
  TrendingUp,
  Settings,
  Plus,
  Eye,
  Edit,
  Globe,
  Palette,
  Database,
  BarChart3,
  Shield,
  Crown,
} from "lucide-react"

type Institution = {
  id: string
  name: string
  domain: string
  logo: string
  theme: string
  students: number
  teachers: number
  courses: number
  status: "active" | "inactive" | "trial"
  subscription: "basic" | "premium" | "enterprise"
  revenue: number
  lastActive: string
}

export default function SuperAdminPage() {
  const [institutions, setInstitutions] = useState<Institution[]>([])
  const [selectedInstitution, setSelectedInstitution] = useState<string | null>(null)

  useEffect(() => {
    // Mock institutions data
    const mockInstitutions: Institution[] = [
      {
        id: "1",
        name: "Delhi Public School",
        domain: "dps.apnalms.com",
        logo: "🏫",
        theme: "blue",
        students: 2500,
        teachers: 150,
        courses: 45,
        status: "active",
        subscription: "enterprise",
        revenue: 125000,
        lastActive: "2024-01-15T14:30:00",
      },
      {
        id: "2",
        name: "St. Mary's Convent",
        domain: "stmarys.apnalms.com",
        logo: "⛪",
        theme: "purple",
        students: 1800,
        teachers: 95,
        courses: 38,
        status: "active",
        subscription: "premium",
        revenue: 85000,
        lastActive: "2024-01-15T16:45:00",
      },
      {
        id: "3",
        name: "Kendriya Vidyalaya",
        domain: "kv.apnalms.com",
        logo: "🎓",
        theme: "green",
        students: 3200,
        teachers: 180,
        courses: 52,
        status: "active",
        subscription: "enterprise",
        revenue: 150000,
        lastActive: "2024-01-15T12:20:00",
      },
      {
        id: "4",
        name: "Modern Academy",
        domain: "modern.apnalms.com",
        logo: "🏛️",
        theme: "orange",
        students: 950,
        teachers: 65,
        courses: 28,
        status: "trial",
        subscription: "basic",
        revenue: 0,
        lastActive: "2024-01-14T18:15:00",
      },
    ]

    setInstitutions(mockInstitutions)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-red-100 text-red-800"
      case "trial":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getSubscriptionColor = (subscription: string) => {
    switch (subscription) {
      case "basic":
        return "bg-blue-100 text-blue-800"
      case "premium":
        return "bg-purple-100 text-purple-800"
      case "enterprise":
        return "bg-gold-100 text-gold-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const totalStats = {
    institutions: institutions.length,
    totalStudents: institutions.reduce((sum, inst) => sum + inst.students, 0),
    totalTeachers: institutions.reduce((sum, inst) => sum + inst.teachers, 0),
    totalRevenue: institutions.reduce((sum, inst) => sum + inst.revenue, 0),
    activeInstitutions: institutions.filter((inst) => inst.status === "active").length,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center">
            <Crown className="h-10 w-10 text-yellow-500 mr-3" />
            Super Admin Dashboard
          </h1>
          <p className="text-xl text-gray-600">
            Manage multiple institutions, white-label branding, and global analytics
          </p>
        </div>

        {/* Global Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-100">Total Institutions</CardTitle>
              <Building className="h-4 w-4 text-blue-200" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalStats.institutions}</div>
              <p className="text-xs text-blue-100">{totalStats.activeInstitutions} active</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{totalStats.totalStudents.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Across all institutions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Teachers</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{totalStats.totalTeachers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Active educators</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">₹{totalStats.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">+24%</div>
              <p className="text-xs text-muted-foreground">Month over month</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4">
            <Button className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Add New Institution</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <Globe className="h-4 w-4" />
              <span>Global Settings</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Analytics Dashboard</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>Security Center</span>
            </Button>
          </div>
        </div>

        {/* Institutions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {institutions.map((institution) => (
            <Card key={institution.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{institution.logo}</div>
                    <div>
                      <CardTitle className="text-lg">{institution.name}</CardTitle>
                      <CardDescription className="text-sm">{institution.domain}</CardDescription>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <Badge className={getStatusColor(institution.status)}>{institution.status}</Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-blue-600">{institution.students}</div>
                    <div className="text-xs text-gray-600">Students</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-green-600">{institution.teachers}</div>
                    <div className="text-xs text-gray-600">Teachers</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-purple-600">{institution.courses}</div>
                    <div className="text-xs text-gray-600">Courses</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Subscription:</span>
                    <Badge className={getSubscriptionColor(institution.subscription)} variant="outline">
                      {institution.subscription}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Revenue:</span>
                    <span className="text-sm font-medium">₹{institution.revenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Last Active:</span>
                    <span className="text-sm">{new Date(institution.lastActive).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Settings className="h-4 w-4 mr-1" />
                    Config
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* White-Label Management */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Palette className="h-5 w-5 text-purple-500 mr-2" />
              White-Label Management
            </CardTitle>
            <CardDescription>Customize branding and appearance for each institution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <h4 className="font-medium">Branding Options</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Custom domain setup</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Logo and favicon upload</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Color theme customization</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span>Custom CSS injection</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Content Customization</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Welcome messages</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Terms and policies</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Email templates</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span>Language preferences</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Feature Control</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Module enable/disable</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>User role permissions</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Integration settings</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span>Storage limits</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex space-x-4">
              <Button>
                <Palette className="h-4 w-4 mr-2" />
                Customize Branding
              </Button>
              <Button variant="outline">
                <Database className="h-4 w-4 mr-2" />
                Manage Templates
              </Button>
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Global Settings
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Revenue Analytics */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 text-green-500 mr-2" />
              Revenue Analytics
            </CardTitle>
            <CardDescription>Financial performance across all institutions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">₹{totalStats.totalRevenue.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Total Revenue</div>
                <div className="text-xs text-green-600 mt-1">+15% from last month</div>
              </div>

              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">₹45,000</div>
                <div className="text-sm text-gray-600">Average per Institution</div>
                <div className="text-xs text-blue-600 mt-1">+8% growth</div>
              </div>

              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">₹125,000</div>
                <div className="text-sm text-gray-600">Highest Performer</div>
                <div className="text-xs text-purple-600 mt-1">Delhi Public School</div>
              </div>

              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">₹15,000</div>
                <div className="text-sm text-gray-600">Projected Growth</div>
                <div className="text-xs text-orange-600 mt-1">Next month</div>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-medium mb-4">Revenue by Subscription Type</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Enterprise</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={75} className="w-32 h-2" />
                    <span className="text-sm font-medium">75%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Premium</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={20} className="w-32 h-2" />
                    <span className="text-sm font-medium">20%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Basic</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={5} className="w-32 h-2" />
                    <span className="text-sm font-medium">5%</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
