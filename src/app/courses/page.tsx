"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Clock, Users, Star, Play, Search, Filter, Grid, List } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

type OpignoCourse = {
  id: string
  attributes: {
    label: string
    created: string
    field_course_description?: {
      processed: string
    }
    field_video_links?: {
      uri: string
      title: string
      options: any[]
    }
  }
}

// Helper function to extract YouTube video ID from URL
function getYouTubeVideoId(url: string): string | null {
  if (!url) return null

  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)

  return match && match[2].length === 11 ? match[2] : null
}

// Helper function to get video thumbnail
function getYouTubeThumbnail(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<OpignoCourse[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchTerm, setSearchTerm] = useState("")

  const apiBase = "https://my-opigno-site.ddev.site/"
  const username = "apiuser"
  const password = "admin"

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const headers = new Headers()
        const basicAuth = btoa(`${username}:${password}`)
        headers.append("Authorization", `Basic ${basicAuth}`)

        const response = await fetch(`${apiBase}/jsonapi/group/opigno_course`, {
          method: "GET",
          headers: headers,
        })

        const data = await response.json()
        console.log("Fetched Courses:", data)

        if (Array.isArray(data.data)) {
          setCourses(data.data)
        } else {
          setCourses([])
        }
      } catch (error) {
        console.error("Error fetching courses:", error)
        setCourses([])
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [])

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })

  const filteredCourses = courses.filter((course) =>
    course.attributes.label.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Enhanced courses with video data
  const enhancedCourses = filteredCourses.map((course) => {
    const videoUrl = course.attributes.field_video_links?.uri
    const videoId = getYouTubeVideoId(videoUrl || "")
    const thumbnailUrl = videoId ? getYouTubeThumbnail(videoId) : "/placeholder.svg?height=200&width=350"

    return {
      ...course,
      videoData: {
        url: videoUrl,
        id: videoId,
        thumbnail: thumbnailUrl,
      },
      mockData: {
        instructor: "Dr. Smith",
        duration: "8 weeks",
        students: Math.floor(Math.random() * 500) + 50,
        rating: (Math.random() * 2 + 3).toFixed(1),
        level: ["Beginner", "Intermediate", "Advanced"][Math.floor(Math.random() * 3)],
        price: Math.floor(Math.random() * 5000) + 1000,
        progress: Math.floor(Math.random() * 100),
        category: ["Programming", "Design", "Business", "Science"][Math.floor(Math.random() * 4)],
      },
    }
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading courses...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Explore Courses</h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Discover our comprehensive collection of courses designed to help you learn and grow.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search courses..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>

              <div className="flex border rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Course Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{courses.length}</div>
              <p className="text-xs text-muted-foreground">Available now</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Categories</CardTitle>
              <Filter className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">Different topics</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,500+</div>
              <p className="text-xs text-muted-foreground">Active learners</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.8</div>
              <p className="text-xs text-muted-foreground">Course quality</p>
            </CardContent>
          </Card>
        </div>

        {/* Courses Grid/List */}
        {enhancedCourses.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
              <p className="text-gray-600">
                {searchTerm ? "Try adjusting your search terms." : "No courses are available at the moment."}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
            {enhancedCourses.map((course) => (
              <Card
                key={course.id}
                className={`hover:shadow-lg transition-shadow group ${viewMode === "list" ? "flex flex-row" : ""}`}
              >
                {viewMode === "grid" ? (
                  <>
                    {/* Video Thumbnail */}
                    <div className="relative h-48 w-full overflow-hidden">
                      {course.videoData.thumbnail ? (
                        <Image
                          src={course.videoData.thumbnail || "/placeholder.svg"}
                          alt={course.attributes.label}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = "/placeholder.svg?height=200&width=350"
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                          <BookOpen className="h-12 w-12 text-blue-600" />
                        </div>
                      )}

                      {/* Video Play Overlay */}
                      {course.videoData.url && (
                        <>
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="bg-white/90 rounded-full p-3">
                              <Play className="h-6 w-6 text-blue-600" />
                            </div>
                          </div>
                          <Badge className="absolute top-3 left-3 bg-red-600 hover:bg-red-700">
                            <Play className="h-3 w-3 mr-1" />
                            Video
                          </Badge>
                        </>
                      )}
                    </div>

                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary">{course.mockData.category}</Badge>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium">{course.mockData.rating}</span>
                        </div>
                      </div>
                      <CardTitle className="text-xl line-clamp-2">
                        {course.attributes.label || "Untitled Course"}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        <div
                          dangerouslySetInnerHTML={{
                            __html:
                              course.attributes.field_course_description?.processed ||
                              "Comprehensive course designed to help you master new skills.",
                          }}
                        />
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{course.mockData.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{course.mockData.students}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{course.mockData.progress}%</span>
                        </div>
                        <Progress value={course.mockData.progress} className="h-2" />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-2xl font-bold text-blue-600">₹{course.mockData.price}</span>
                          <Badge variant="outline" className="ml-2">
                            {course.mockData.level}
                          </Badge>
                        </div>
                      </div>

                      <Button className="w-full" asChild>
                        <Link href={`/courses/${course.id}`}>
                          <Play className="mr-2 h-4 w-4" />
                          Start Learning
                        </Link>
                      </Button>
                    </CardContent>
                  </>
                ) : (
                  <>
                    {/* List View */}
                    <div className="relative w-48 h-32 flex-shrink-0 overflow-hidden">
                      {course.videoData.thumbnail ? (
                        <Image
                          src={course.videoData.thumbnail || "/placeholder.svg"}
                          alt={course.attributes.label}
                          fill
                          className="object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = "/placeholder.svg?height=128&width=192"
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                          <BookOpen className="h-8 w-8 text-blue-600" />
                        </div>
                      )}

                      {course.videoData.url && (
                        <Badge className="absolute top-2 left-2 bg-red-600 hover:bg-red-700 text-xs">
                          <Play className="h-2 w-2 mr-1" />
                          Video
                        </Badge>
                      )}
                    </div>

                    <div className="flex-1 flex flex-col">
                      <CardHeader className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="secondary">{course.mockData.category}</Badge>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span>{course.mockData.rating}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Users className="h-4 w-4" />
                              <span>{course.mockData.students}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{course.mockData.duration}</span>
                            </div>
                          </div>
                        </div>

                        <CardTitle className="text-xl mb-2">{course.attributes.label || "Untitled Course"}</CardTitle>

                        <CardDescription className="line-clamp-2">
                          <div
                            dangerouslySetInnerHTML={{
                              __html:
                                course.attributes.field_course_description?.processed ||
                                "Comprehensive course designed to help you master new skills.",
                            }}
                          />
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <span className="text-2xl font-bold text-blue-600">₹{course.mockData.price}</span>
                          <Badge variant="outline">{course.mockData.level}</Badge>
                        </div>

                        <Button asChild>
                          <Link href={`/courses/${course.id}`}>
                            <Play className="mr-2 h-4 w-4" />
                            Start Learning
                          </Link>
                        </Button>
                      </CardContent>
                    </div>
                  </>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
