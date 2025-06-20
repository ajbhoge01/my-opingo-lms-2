"use client"

import { useEffect, useState, useRef } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BookOpen,
  Clock,
  Users,
  Star,
  Play,
  CheckCircle,
  Award,
  MessageSquare,
  Download,
  Share2,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  RotateCcw,
} from "lucide-react"

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

// Embedded VideoPlayer component to avoid import issues
function VideoPlayer({ videoUrl, title, className = "" }: { videoUrl: string; title?: string; className?: string }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const controlsTimeoutRef = useRef<NodeJS.Timeout>()

  // Helper function to extract YouTube video ID from URL
  function getYouTubeVideoId(url: string): string | null {
    if (!url) return null

    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)

    return match && match[2].length === 11 ? match[2] : null
  }

  const videoId = getYouTubeVideoId(videoUrl)

  useEffect(() => {
    if (showControls) {
      // Auto-hide controls after 3 seconds
      controlsTimeoutRef.current = setTimeout(() => {
        if (isPlaying) {
          setShowControls(false)
        }
      }, 3000)
    }

    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }
    }
  }, [showControls, isPlaying])

  const handleMouseMove = () => {
    setShowControls(true)
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }
  }

  const handlePlay = () => {
    if (iframeRef.current) {
      const iframe = iframeRef.current
      if (isPlaying) {
        // Pause video
        iframe.contentWindow?.postMessage('{"event":"command","func":"pauseVideo","args":""}', "*")
      } else {
        // Play video
        iframe.contentWindow?.postMessage('{"event":"command","func":"playVideo","args":""}', "*")
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleMute = () => {
    if (iframeRef.current) {
      const iframe = iframeRef.current
      if (isMuted) {
        iframe.contentWindow?.postMessage('{"event":"command","func":"unMute","args":""}', "*")
      } else {
        iframe.contentWindow?.postMessage('{"event":"command","func":"mute","args":""}', "*")
      }
      setIsMuted(!isMuted)
    }
  }

  const handleRestart = () => {
    if (iframeRef.current) {
      const iframe = iframeRef.current
      iframe.contentWindow?.postMessage('{"event":"command","func":"seekTo","args":[0, true]}', "*")
      iframe.contentWindow?.postMessage('{"event":"command","func":"playVideo","args":""}', "*")
      setIsPlaying(true)
    }
  }

  const handleFullscreen = () => {
    if (iframeRef.current) {
      if (iframeRef.current.requestFullscreen) {
        iframeRef.current.requestFullscreen()
      }
    }
  }

  if (!videoId) {
    return (
      <Card className={className}>
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="text-gray-400 mb-2">
              <Play className="h-12 w-12 mx-auto" />
            </div>
            <p className="text-gray-600">Invalid video URL</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const embedUrl = `https://www.youtube.com/embed/${videoId}?enablejsapi=1&rel=0&modestbranding=1&controls=0&showinfo=0`

  return (
    <Card className={`relative overflow-hidden ${className}`}>
      <div
        className="relative aspect-video bg-black"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => isPlaying && setShowControls(false)}
      >
        <iframe
          ref={iframeRef}
          src={embedUrl}
          title={title || "Video Player"}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />

        {/* Custom Controls Overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent transition-opacity duration-300 ${
            showControls ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Center Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Button
              variant="ghost"
              size="lg"
              onClick={handlePlay}
              className="bg-black/20 hover:bg-black/40 text-white border-2 border-white/30 rounded-full w-16 h-16 p-0"
            >
              {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-1" />}
            </Button>
          </div>

          {/* Bottom Controls */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" onClick={handlePlay} className="text-white hover:bg-white/20">
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>

                <Button variant="ghost" size="sm" onClick={handleMute} className="text-white hover:bg-white/20">
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>

                <Button variant="ghost" size="sm" onClick={handleRestart} className="text-white hover:bg-white/20">
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" onClick={handleFullscreen} className="text-white hover:bg-white/20">
                  <Maximize className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Title Overlay */}
          {title && (
            <div className="absolute top-0 left-0 right-0 p-4">
              <h3 className="text-white text-lg font-semibold bg-black/20 rounded px-3 py-1 inline-block">{title}</h3>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}

export default function CourseDetailPage() {
  const params = useParams()
  const [course, setCourse] = useState<OpignoCourse | null>(null)
  const [loading, setLoading] = useState(true)

  const apiBase = "https://my-opigno-site.ddev.site/"
  const username = "apiuser"
  const password = "admin"

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const headers = new Headers()
        const basicAuth = btoa(`${username}:${password}`)
        headers.append("Authorization", `Basic ${basicAuth}`)

        // First try to get the specific course by ID
        const response = await fetch(`${apiBase}/jsonapi/group/opigno_course/${params.slug}`, {
          method: "GET",
          headers: headers,
        })

        if (response.ok) {
          const data = await response.json()
          setCourse(data.data)
        } else {
          // If not found by ID, try to get all courses and find by slug
          const allCoursesResponse = await fetch(`${apiBase}/jsonapi/group/opigno_course`, {
            method: "GET",
            headers: headers,
          })

          if (allCoursesResponse.ok) {
            const allCoursesData = await allCoursesResponse.json()
            const foundCourse = allCoursesData.data.find(
              (c: OpignoCourse) =>
                c.id === params.slug || c.attributes.label.toLowerCase().replace(/\s+/g, "-") === params.slug,
            )
            setCourse(foundCourse || null)
          }
        }
      } catch (error) {
        console.error("Error fetching course:", error)
        setCourse(null)
      } finally {
        setLoading(false)
      }
    }

    if (params.slug) {
      fetchCourse()
    }
  }, [params.slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading course...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="text-center py-12">
            <CardContent>
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Course not found</h3>
              <p className="text-gray-600">The course you're looking for doesn't exist or has been removed.</p>
              <Button className="mt-4" onClick={() => window.history.back()}>
                Go Back
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const videoUrl = course.attributes.field_video_links?.uri

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Course Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
            <span>Courses</span>
            <span>/</span>
            <span className="text-blue-600">{course.attributes.label}</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{course.attributes.label}</h1>

              <div className="flex items-center space-x-6 text-sm text-gray-600 mb-4">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="font-medium">4.8</span>
                  <span>(1,234 reviews)</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>2,567 students</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>12 hours</span>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Badge variant="secondary">Programming</Badge>
                <Badge variant="outline">Beginner</Badge>
                <Badge variant="outline">Certificate</Badge>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Video Player */}
            {videoUrl && <VideoPlayer videoUrl={videoUrl} title={course.attributes.label} className="w-full" />}

            {/* Course Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="instructor">Instructor</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Course Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div
                      className="prose max-w-none"
                      dangerouslySetInnerHTML={{
                        __html:
                          course.attributes.field_course_description?.processed ||
                          "This comprehensive course is designed to help you master the subject with expert guidance and hands-on practice.",
                      }}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>What You'll Learn</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {[
                        "Master the fundamentals",
                        "Build real-world projects",
                        "Best practices and techniques",
                        "Industry-standard tools",
                        "Problem-solving skills",
                        "Professional certification",
                      ].map((item, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="curriculum" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Course Curriculum</CardTitle>
                    <CardDescription>8 sections • 24 lectures • 12h 30m total length</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[1, 2, 3, 4].map((section) => (
                      <div key={section} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold">Section {section}: Getting Started</h4>
                          <span className="text-sm text-gray-600">6 lectures • 45min</span>
                        </div>
                        <div className="space-y-2">
                          {[1, 2, 3].map((lecture) => (
                            <div
                              key={lecture}
                              className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded"
                            >
                              <div className="flex items-center space-x-3">
                                <Play className="h-4 w-4 text-gray-400" />
                                <span className="text-sm">Lecture {lecture}: Introduction to concepts</span>
                              </div>
                              <span className="text-sm text-gray-600">15:30</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Student Reviews</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {[1, 2, 3].map((review) => (
                      <div key={review} className="border-b pb-6 last:border-b-0">
                        <div className="flex items-center space-x-4 mb-3">
                          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                            U{review}
                          </div>
                          <div>
                            <h5 className="font-semibold">Student {review}</h5>
                            <div className="flex items-center space-x-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className="h-4 w-4 text-yellow-400 fill-current" />
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-600">
                          Excellent course! The instructor explains everything clearly and the hands-on projects really
                          help solidify the concepts.
                        </p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="instructor" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Meet Your Instructor</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl font-semibold">
                        DS
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-semibold mb-2">Dr. Smith</h4>
                        <p className="text-gray-600 mb-4">
                          Senior Software Engineer with 10+ years of experience in web development and education.
                        </p>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Students:</span> 15,000+
                          </div>
                          <div>
                            <span className="font-medium">Courses:</span> 12
                          </div>
                          <div>
                            <span className="font-medium">Rating:</span> 4.9/5
                          </div>
                          <div>
                            <span className="font-medium">Experience:</span> 10+ years
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Enrollment Card */}
            <Card>
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-green-600 mb-2">Free</div>
                  <p className="text-sm text-gray-600">Full lifetime access</p>
                </div>

                <Button className="w-full mb-4" size="lg">
                  <Play className="mr-2 h-5 w-5" />
                  Enroll Now
                </Button>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">12 hours</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Lectures:</span>
                    <span className="font-medium">24</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Level:</span>
                    <span className="font-medium">Beginner</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Certificate:</span>
                    <span className="font-medium">Yes</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Progress Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Course Progress</span>
                      <span className="font-medium">0%</span>
                    </div>
                    <Progress value={0} className="h-2" />
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">0</div>
                      <div className="text-gray-600">Completed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-400">24</div>
                      <div className="text-gray-600">Remaining</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Features Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Course Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { icon: BookOpen, text: "24 Lectures" },
                    { icon: Clock, text: "12 Hours Content" },
                    { icon: Award, text: "Certificate" },
                    { icon: MessageSquare, text: "Discussion Forum" },
                    { icon: Download, text: "Downloadable Resources" },
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <feature.icon className="h-5 w-5 text-blue-600" />
                      <span className="text-sm">{feature.text}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
