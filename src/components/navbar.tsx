"use client"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import {
  BookOpen,
  User,
  LogOut,
  Menu,
  X,
  Home,
  Users,
  Bell,
  FileText,
  Brain,
  Award,
  Video,
  MessageSquare,
  BarChart3,
  Settings,
  UserPlus,
  School,
  Calendar,
} from "lucide-react"

export default function Navbar() {
  const [user, setUser] = useState<string | null>(null)
  const [role, setRole] = useState<string | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  // Handle hydration
  useEffect(() => {
    setMounted(true)
  }, [])

  // Load user data from localStorage and listen for changes
  useEffect(() => {
    const loadUserData = () => {
      if (mounted && typeof window !== "undefined") {
        try {
          const savedUser = localStorage.getItem("user")
          const savedRole = localStorage.getItem("role")
          setUser(savedUser)
          setRole(savedRole)
        } catch (error) {
          console.error("Error loading user data:", error)
        } finally {
          setIsLoading(false)
        }
      }
    }

    // Load initial data
    loadUserData()

    // Listen for storage changes (when user logs in from another tab/page)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "user" || e.key === "role") {
        loadUserData()
      }
    }

    // Listen for custom login events
    const handleLoginEvent = () => {
      loadUserData()
    }

    // Listen for custom logout events
    const handleLogoutEvent = () => {
      setUser(null)
      setRole(null)
    }

    // Add event listeners
    window.addEventListener("storage", handleStorageChange)
    window.addEventListener("userLoggedIn", handleLoginEvent)
    window.addEventListener("userLoggedOut", handleLogoutEvent)

    // Cleanup
    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("userLoggedIn", handleLoginEvent)
      window.removeEventListener("userLoggedOut", handleLogoutEvent)
    }
  }, [mounted])

  // Listen for route changes to update state
  useEffect(() => {
    const loadUserData = () => {
      if (typeof window !== "undefined") {
        try {
          const savedUser = localStorage.getItem("user")
          const savedRole = localStorage.getItem("role")
          setUser(savedUser)
          setRole(savedRole)
        } catch (error) {
          console.error("Error loading user data:", error)
        }
      }
    }

    // Load user data when pathname changes
    loadUserData()
  }, [pathname])

  // Close mobile menu when pathname changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (isMenuOpen && !target.closest(".mobile-menu") && !target.closest(".menu-button")) {
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen) {
      document.addEventListener("click", handleClickOutside)
      return () => document.removeEventListener("click", handleClickOutside)
    }
  }, [isMenuOpen])

  const handleLogout = () => {
    try {
      if (typeof window !== "undefined") {
        localStorage.removeItem("user")
        localStorage.removeItem("role")
        // Dispatch custom event to notify of logout
        window.dispatchEvent(new CustomEvent("userLoggedOut"))
      }
      setUser(null)
      setRole(null)
      setIsMenuOpen(false)
      router.push("/")
    } catch (error) {
      console.error("Error during logout:", error)
    }
  }

  const getNavigationItems = () => {
    const baseItems = [
      { name: "Home", href: "/", icon: Home },
      { name: "Courses", href: "/courses", icon: BookOpen },
    ]

    if (!user) return baseItems

    const userItems = [{ name: "Dashboard", href: "/dashboard", icon: User }]

    if (role === "student") {
      userItems.push(
        { name: "Assignments", href: "/assignments", icon: FileText },
        { name: "Quizzes", href: "/quizzes", icon: Brain },
        { name: "Live Classes", href: "/live-class", icon: Video },
        { name: "Certificates", href: "/certificates", icon: Award },
        { name: "Messages", href: "/messages", icon: MessageSquare },
      )
    }

    if (role === "teacher") {
      userItems.push(
        { name: "Students", href: "/students", icon: UserPlus },
        { name: "Assignments", href: "/assignments", icon: FileText },
        { name: "Quizzes", href: "/quizzes", icon: Brain },
        { name: "Live Classes", href: "/live-class", icon: Video },
        { name: "Analytics", href: "/analytics", icon: BarChart3 },
        { name: "Content", href: "/content", icon: BookOpen },
      )
    }

    if (role === "parent") {
      userItems.push(
        { name: "Children", href: "/children", icon: UserPlus },
        { name: "Progress", href: "/progress", icon: BarChart3 },
        { name: "Attendance", href: "/attendance", icon: Calendar },
        { name: "Messages", href: "/messages", icon: MessageSquare },
        { name: "Parent-Teacher", href: "/parent-teacher", icon: School },
      )
    }

    if (role === "admin") {
      userItems.push(
        { name: "Users", href: "/users", icon: Users },
        { name: "Reports", href: "/reports", icon: BarChart3 },
        { name: "Settings", href: "/settings", icon: Settings },
      )
    }

    return [...baseItems, ...userItems]
  }

  const navigation = getNavigationItems()

  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8" />
              <span className="font-bold text-xl">Apna E-School</span>
            </Link>
            <div className="hidden md:flex items-center space-x-4">
              <div className="w-20 h-8 bg-white/20 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 hover:opacity-90 transition-opacity">
            <BookOpen className="h-8 w-8" />
            <span className="font-bold text-xl">Apna E-School</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navigation.slice(0, 6).map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-1 transition-colors text-sm font-medium px-3 py-2 rounded-md ${
                  isActiveLink(item.href)
                    ? "bg-white/20 text-white"
                    : "text-blue-100 hover:text-white hover:bg-white/10"
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            ))}

            {navigation.length > 6 && (
              <div className="relative group">
                <button className="flex items-center space-x-1 text-blue-100 hover:text-white transition-colors text-sm font-medium px-3 py-2 rounded-md hover:bg-white/10">
                  <Menu className="h-4 w-4" />
                  <span>More</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  {navigation.slice(6).map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center space-x-2 px-4 py-2 text-sm transition-colors ${
                        isActiveLink(item.href)
                          ? "bg-blue-50 text-blue-600 font-medium"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {!isLoading && user ? (
              <div className="flex items-center space-x-4">
                <button className="relative p-2 text-blue-100 hover:text-white hover:bg-white/10 rounded-md transition-colors">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
                </button>
                <div className="flex items-center space-x-2 px-3 py-1 bg-white/10 rounded-md">
                  <User className="h-5 w-5" />
                  <span className="text-sm font-medium">{user}</span>
                  <span className="text-xs bg-blue-500 px-2 py-1 rounded-full capitalize">{role}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-white hover:bg-white/20 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : !isLoading ? (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" asChild className="text-white hover:bg-white/20 transition-colors">
                  <Link href="/login">Login</Link>
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  asChild
                  className="bg-white text-blue-600 hover:bg-blue-50 transition-colors"
                >
                  <Link href="/register">Register</Link>
                </Button>
              </div>
            ) : (
              <div className="w-32 h-8 bg-white/20 rounded animate-pulse"></div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="menu-button text-white hover:bg-white/20 transition-colors"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`mobile-menu md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-screen opacity-100 py-4 border-t border-white/20" : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-2 px-4 py-3 rounded-md transition-colors ${
                  isActiveLink(item.href)
                    ? "bg-white/20 text-white font-medium"
                    : "text-blue-100 hover:bg-white/10 hover:text-white"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            ))}

            {!isLoading && (
              <div className="px-4 py-2 border-t border-white/20 mt-4 pt-4">
                {user ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 px-3 py-2 bg-white/10 rounded-md">
                      <User className="h-4 w-4" />
                      <span className="text-sm font-medium">
                        {user} ({role})
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="flex items-center space-x-2 px-3 py-2 text-blue-100 hover:bg-white/10 hover:text-white rounded-md transition-colors flex-1">
                        <Bell className="h-4 w-4" />
                        <span className="text-sm">Notifications</span>
                      </button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleLogout}
                        className="text-white hover:bg-white/20 transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                      className="w-full text-white hover:bg-white/20 justify-start transition-colors"
                    >
                      <Link href="/login">Login</Link>
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      asChild
                      className="w-full justify-start bg-white text-blue-600 hover:bg-blue-50 transition-colors"
                    >
                      <Link href="/register">Register</Link>
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
