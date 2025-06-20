"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { MessageSquare, Send, Search, Users, Bell, Clock, CheckCircle, User } from "lucide-react"

type Message = {
  id: string
  sender: string
  senderRole: "student" | "teacher" | "admin"
  recipient: string
  subject: string
  content: string
  timestamp: string
  read: boolean
  type: "direct" | "announcement" | "forum"
}

type ForumPost = {
  id: string
  author: string
  authorRole: "student" | "teacher" | "admin"
  course: string
  title: string
  content: string
  timestamp: string
  replies: number
  likes: number
}

export default function MessagesPage() {
  const [activeTab, setActiveTab] = useState<"messages" | "announcements" | "forums">("messages")
  const [messages, setMessages] = useState<Message[]>([])
  const [forumPosts, setForumPosts] = useState<ForumPost[]>([])
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [newMessage, setNewMessage] = useState("")
  const [role, setRole] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setRole(localStorage.getItem("role"))
    }

    // Mock messages data
    const mockMessages: Message[] = [
      {
        id: "1",
        sender: "Dr. Sarah Johnson",
        senderRole: "teacher",
        recipient: "You",
        subject: "Assignment Feedback",
        content:
          "Great work on your React assignment! Your component structure is well organized. Consider adding more error handling for edge cases.",
        timestamp: "2024-01-15T10:30:00",
        read: false,
        type: "direct",
      },
      {
        id: "2",
        sender: "Admin",
        senderRole: "admin",
        recipient: "All Students",
        subject: "System Maintenance Notice",
        content:
          "The LMS will be under maintenance tomorrow from 2:00 AM to 4:00 AM. Please save your work before this time.",
        timestamp: "2024-01-14T16:00:00",
        read: true,
        type: "announcement",
      },
      {
        id: "3",
        sender: "John Doe",
        senderRole: "student",
        recipient: "You",
        subject: "Study Group Invitation",
        content: "Hi! We're forming a study group for the upcoming JavaScript exam. Would you like to join us?",
        timestamp: "2024-01-14T14:20:00",
        read: true,
        type: "direct",
      },
    ]

    const mockForumPosts: ForumPost[] = [
      {
        id: "1",
        author: "Alice Smith",
        authorRole: "student",
        course: "React Fundamentals",
        title: "Best practices for state management?",
        content:
          "I'm working on a complex React app and wondering about the best approaches for managing state across multiple components...",
        timestamp: "2024-01-15T09:00:00",
        replies: 8,
        likes: 12,
      },
      {
        id: "2",
        author: "Prof. Michael Chen",
        authorRole: "teacher",
        course: "JavaScript Basics",
        title: "Common JavaScript Pitfalls",
        content:
          "Here are some common mistakes I see students make when learning JavaScript. Let's discuss how to avoid them...",
        timestamp: "2024-01-14T11:30:00",
        replies: 15,
        likes: 25,
      },
    ]

    setMessages(mockMessages)
    setForumPosts(mockForumPosts)
  }, [])

  const unreadCount = messages.filter((m) => !m.read).length

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Handle sending message
      setNewMessage("")
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "teacher":
        return "bg-blue-100 text-blue-800"
      case "admin":
        return "bg-purple-100 text-purple-800"
      case "student":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Communication Center</h1>
          <p className="text-xl text-gray-600">Stay connected with your learning community</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{messages.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unread</CardTitle>
              <Bell className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{unreadCount}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Forum Posts</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{forumPosts.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Discussions</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">5</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
            {["messages", "announcements", "forums"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as typeof activeTab)}
                className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-colors ${
                  activeTab === tab ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab}
                {tab === "messages" && unreadCount > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">{unreadCount}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {activeTab === "messages" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Messages List */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Messages
                    <Button size="sm">
                      <Send className="h-4 w-4 mr-2" />
                      New
                    </Button>
                  </CardTitle>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Search messages..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-1">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        onClick={() => setSelectedMessage(message)}
                        className={`p-4 cursor-pointer hover:bg-gray-50 border-l-4 ${
                          !message.read ? "border-blue-500 bg-blue-50" : "border-transparent"
                        } ${selectedMessage?.id === message.id ? "bg-blue-100" : ""}`}
                      >
                        <div className="flex items-start justify-between mb-1">
                          <span className="font-medium text-sm">{message.sender}</span>
                          <span className="text-xs text-gray-500">
                            {new Date(message.timestamp).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-900 mb-1">{message.subject}</div>
                        <div className="text-xs text-gray-600 line-clamp-2">{message.content}</div>
                        <div className="flex items-center justify-between mt-2">
                          <Badge className={getRoleColor(message.senderRole)}>{message.senderRole}</Badge>
                          {!message.read && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Message Detail */}
            <div className="lg:col-span-2">
              {selectedMessage ? (
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{selectedMessage.subject}</CardTitle>
                        <CardDescription>
                          From: {selectedMessage.sender} • {new Date(selectedMessage.timestamp).toLocaleString()}
                        </CardDescription>
                      </div>
                      <Badge className={getRoleColor(selectedMessage.senderRole)}>{selectedMessage.senderRole}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none mb-6">
                      <p>{selectedMessage.content}</p>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          placeholder="Type your reply..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <Button onClick={handleSendMessage}>
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="h-96 flex items-center justify-center">
                  <CardContent className="text-center">
                    <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Select a message</h3>
                    <p className="text-gray-600">Choose a message from the list to view its content</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}

        {activeTab === "announcements" && (
          <div className="space-y-6">
            {messages
              .filter((m) => m.type === "announcement")
              .map((announcement) => (
                <Card key={announcement.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center space-x-2">
                          <Bell className="h-5 w-5 text-blue-600" />
                          <span>{announcement.subject}</span>
                        </CardTitle>
                        <CardDescription>
                          From: {announcement.sender} • {new Date(announcement.timestamp).toLocaleString()}
                        </CardDescription>
                      </div>
                      <Badge className={getRoleColor(announcement.senderRole)}>{announcement.senderRole}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p>{announcement.content}</p>
                  </CardContent>
                </Card>
              ))}
          </div>
        )}

        {activeTab === "forums" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Discussion Forums</h2>
              <Button>
                <MessageSquare className="h-4 w-4 mr-2" />
                New Post
              </Button>
            </div>

            {forumPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <User className="h-4 w-4" />
                        <span className="font-medium">{post.author}</span>
                        <Badge className={getRoleColor(post.authorRole)}>{post.authorRole}</Badge>
                        <span className="text-sm text-gray-500">in {post.course}</span>
                      </div>
                      <CardTitle className="text-xl">{post.title}</CardTitle>
                      <CardDescription className="mt-2">{post.content}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <MessageSquare className="h-4 w-4" />
                        <span>{post.replies} replies</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span>👍</span>
                        <span>{post.likes} likes</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{new Date(post.timestamp).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Discussion
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
