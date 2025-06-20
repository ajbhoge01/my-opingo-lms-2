import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BookOpen,
  Users,
  Award,
  TrendingUp,
  Play,
  CheckCircle,
  Star,
  ArrowRight,
  Brain,
  Shield,
  Globe,
  Smartphone,
} from "lucide-react"

export default function HomePage() {
  const features = [
    {
      icon: BookOpen,
      title: "Course Management",
      description: "Create, organize, and deliver structured learning content with multimedia support",
    },
    {
      icon: Users,
      title: "Multi-Role Management",
      description: "Support for Super Admin, Admin, Instructor, Learner, and Parent roles",
    },
    {
      icon: Brain,
      title: "AI Digital Tutor",
      description: "Personalized learning paths with adaptive AI recommendations and real-time support",
    },
    {
      icon: Award,
      title: "Assessment & Certification",
      description: "Comprehensive testing tools with auto-grading and certificate generation",
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking",
      description: "Detailed analytics and reporting for learners, instructors, and parents",
    },
    {
      icon: Shield,
      title: "Child Safety First",
      description: "Moderated discussions, parental controls, and age-appropriate content",
    },
    {
      icon: Globe,
      title: "Multilingual Support",
      description: "Support for English, Hindi, Marathi, and other regional languages",
    },
    {
      icon: Smartphone,
      title: "Mobile Accessibility",
      description: "Responsive design with offline content download capabilities",
    },
  ]

  const stats = [
    { label: "Active Students", value: "50,000+", icon: Users },
    { label: "Courses Available", value: "2,500+", icon: BookOpen },
    { label: "Certificates Issued", value: "100,000+", icon: Award },
    { label: "Success Rate", value: "98%", icon: TrendingUp },
  ]

  const workflows = [
    { step: "1", title: "Super Admin Setup", description: "Onboard schools with custom branding and settings" },
    { step: "2", title: "Admin Configuration", description: "Add instructors, upload content, set timetables" },
    { step: "3", title: "Course Publishing", description: "Instructors create structured learning paths" },
    { step: "4", title: "Student Enrollment", description: "Manual, self, or auto-enrollment options" },
    { step: "5", title: "Learning & Interaction", description: "Engage with AI tutors and live classes" },
    { step: "6", title: "Assessment & Feedback", description: "Assignments, exams, and personalized feedback" },
    { step: "7", title: "Progress Monitoring", description: "Real-time dashboards and detailed reports" },
    { step: "8", title: "Certification", description: "Auto-generate certificates and export analytics" },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Welcome to <span className="text-blue-600"> Apna E</span>
              <br />
              <span className="text-purple-600">School</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto">
              Comprehensive LMS platform with AI-enhanced features, white-labeling capabilities, and specialized tools
              for school children. Manage, deliver, and monitor educational content with advanced analytics and parental
              controls.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="text-lg px-8 py-3">
                <Link href="/courses">
                  Start Learning
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-8 py-3">
                <Link href="/demo">
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <stat.icon className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Comprehensive LMS Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need for effective online learning management in one platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-blue-100 rounded-full">
                      <feature.icon className="h-8 w-8 text-blue-600" />
                    </div>
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* LMS Workflow Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">LMS Workflow Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From setup to certification - a complete learning journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflows.map((workflow, index) => (
              <Card key={index} className="relative hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-3">
                      {workflow.step}
                    </div>
                    <CardTitle className="text-lg">{workflow.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">{workflow.description}</CardDescription>
                </CardContent>
                {index < workflows.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 transform -translate-y-1/2">
                    <ArrowRight className="h-6 w-6 text-blue-300" />
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* AI Features Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">AI-Enhanced Learning Experience</h2>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">
              Powered by artificial intelligence for personalized and adaptive learning
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Brain className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">AI Digital Tutor</h3>
                  <p className="text-purple-100">
                    Personalized lesson recommendations, adaptive learning paths, and real-time doubt-solving
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">24/7 AI Chatbot</h3>
                  <p className="text-purple-100">
                    Automated student support with multilingual capability and human escalation
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-2 bg-white/20 rounded-lg">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Adaptive Analytics</h3>
                  <p className="text-purple-100">
                    AI-powered insights for learning patterns and performance optimization
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">Key AI Capabilities</h3>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-300" />
                  <span>Voice-based lesson summaries</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-300" />
                  <span>Weak area identification</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-300" />
                  <span>Learning pace adaptation</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-300" />
                  <span>Multilingual support</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-300" />
                  <span>Intelligent content recommendations</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* K-12 Specific Features */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Designed for School Children (K-12)</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Child-friendly interface with safety-first approach and parental involvement
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-green-800">Child-Friendly Design</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Bright visuals and intuitive layout</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Interactive lessons with animations</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Gamified learning with rewards</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Drawing and creative tools</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-blue-800">Safety & Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">Controlled chat environments</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">Teacher-moderated discussions</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">Parental monitoring tools</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">Age-appropriate content filtering</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-200 bg-purple-50">
              <CardHeader>
                <CardTitle className="text-purple-800">Parental Dashboard</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-purple-600" />
                  <span className="text-sm">Real-time progress tracking</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-purple-600" />
                  <span className="text-sm">Direct teacher communication</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-purple-600" />
                  <span className="text-sm">Performance alerts and reports</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-purple-600" />
                  <span className="text-sm">Screen time management</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Transform Education?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of schools and institutions already using our comprehensive LMS platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild className="text-lg px-8 py-3">
              <Link href="/register">
                Start Free Trial
                <CheckCircle className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="text-lg px-8 py-3 text-white border-white hover:bg-white hover:text-blue-600"
            >
              <Link href="/contact">
                Contact Sales
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
