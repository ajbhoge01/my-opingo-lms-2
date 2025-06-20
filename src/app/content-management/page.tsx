"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Upload,
  FileText,
  Video,
  ImageIcon,
  File,
  Folder,
  Search,
  Download,
  Share,
  Edit,
  Trash2,
  Eye,
  Copy,
  Archive,
  RefreshCw,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react"

type ContentItem = {
  id: string
  name: string
  type: "video" | "document" | "image" | "audio" | "scorm" | "presentation"
  size: string
  uploadDate: string
  lastModified: string
  status: "approved" | "pending" | "rejected" | "draft"
  uploadedBy: string
  downloads: number
  views: number
  tags: string[]
  course?: string
}

export default function ContentManagementPage() {
  const [contentItems, setContentItems] = useState<ContentItem[]>([])
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [filterType, setFilterType] = useState<"all" | "video" | "document" | "image" | "audio">("all")
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    // Mock content data
    const mockContent: ContentItem[] = [
      {
        id: "1",
        name: "Mathematics_Chapter_5_Algebra.pdf",
        type: "document",
        size: "2.4 MB",
        uploadDate: "2024-01-15T10:30:00",
        lastModified: "2024-01-15T14:20:00",
        status: "approved",
        uploadedBy: "Dr. Sarah Johnson",
        downloads: 45,
        views: 128,
        tags: ["mathematics", "algebra", "grade-8"],
        course: "Mathematics Grade 8",
      },
      {
        id: "2",
        name: "Science_Lab_Experiment_Video.mp4",
        type: "video",
        size: "156 MB",
        uploadDate: "2024-01-14T16:45:00",
        lastModified: "2024-01-14T16:45:00",
        status: "approved",
        uploadedBy: "Prof. Michael Chen",
        downloads: 23,
        views: 89,
        tags: ["science", "laboratory", "experiment"],
        course: "Science Grade 7",
      },
      {
        id: "3",
        name: "History_Timeline_Presentation.pptx",
        type: "presentation",
        size: "8.7 MB",
        uploadDate: "2024-01-13T09:15:00",
        lastModified: "2024-01-13T11:30:00",
        status: "pending",
        uploadedBy: "Ms. Emily Brown",
        downloads: 0,
        views: 12,
        tags: ["history", "timeline", "world-war"],
        course: "History Grade 9",
      },
      {
        id: "4",
        name: "English_Grammar_Audio_Lesson.mp3",
        type: "audio",
        size: "12.3 MB",
        uploadDate: "2024-01-12T14:20:00",
        lastModified: "2024-01-12T14:20:00",
        status: "approved",
        uploadedBy: "Mr. David Wilson",
        downloads: 67,
        views: 156,
        tags: ["english", "grammar", "audio-lesson"],
        course: "English Literature",
      },
      {
        id: "5",
        name: "Chemistry_Periodic_Table.png",
        type: "image",
        size: "1.8 MB",
        uploadDate: "2024-01-11T11:45:00",
        lastModified: "2024-01-11T11:45:00",
        status: "rejected",
        uploadedBy: "Dr. Lisa Wang",
        downloads: 0,
        views: 5,
        tags: ["chemistry", "periodic-table", "reference"],
        course: "Chemistry Grade 10",
      },
      {
        id: "6",
        name: "Interactive_Math_SCORM_Package.zip",
        type: "scorm",
        size: "45.2 MB",
        uploadDate: "2024-01-10T13:30:00",
        lastModified: "2024-01-10T13:30:00",
        status: "draft",
        uploadedBy: "Dr. Sarah Johnson",
        downloads: 0,
        views: 3,
        tags: ["mathematics", "interactive", "scorm"],
        course: "Mathematics Grade 8",
      },
    ]

    setContentItems(mockContent)
  }, [])

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-5 w-5 text-red-600" />
      case "document":
        return <FileText className="h-5 w-5 text-blue-600" />
      case "image":
        return <ImageIcon className="h-5 w-5 text-green-600" />
      case "audio":
        return <File className="h-5 w-5 text-purple-600" />
      case "presentation":
        return <FileText className="h-5 w-5 text-orange-600" />
      case "scorm":
        return <Archive className="h-5 w-5 text-indigo-600" />
      default:
        return <File className="h-5 w-5 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "draft":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "rejected":
        return <AlertCircle className="h-4 w-4 text-red-600" />
      case "draft":
        return <Edit className="h-4 w-4 text-gray-600" />
      default:
        return <File className="h-4 w-4 text-gray-600" />
    }
  }

  const filteredContent = contentItems.filter((item) => {
    const matchesType = filterType === "all" || item.type === filterType
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesType && matchesSearch
  })

  const stats = {
    total: contentItems.length,
    approved: contentItems.filter((item) => item.status === "approved").length,
    pending: contentItems.filter((item) => item.status === "pending").length,
    totalSize: "245.7 MB",
    totalDownloads: contentItems.reduce((sum, item) => sum + item.downloads, 0),
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center">
            <Folder className="h-10 w-10 text-blue-600 mr-3" />
            Content Management
          </h1>
          <p className="text-xl text-gray-600">
            Upload, organize, and manage educational content with version control and approval workflows
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Files</CardTitle>
              <File className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">{stats.totalSize} total size</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
              <p className="text-xs text-muted-foreground">Ready for use</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
              <p className="text-xs text-muted-foreground">Awaiting approval</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Downloads</CardTitle>
              <Download className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.totalDownloads}</div>
              <p className="text-xs text-muted-foreground">Total downloads</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
              <Archive className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">15.2 GB</div>
              <Progress value={30.4} className="h-2 mt-2" />
              <p className="text-xs text-muted-foreground">of 50 GB</p>
            </CardContent>
          </Card>
        </div>

        {/* Actions and Filters */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex space-x-2">
              <Button className="flex items-center space-x-2">
                <Upload className="h-4 w-4" />
                <span>Upload Content</span>
              </Button>
              <Button variant="outline" className="flex items-center space-x-2">
                <Folder className="h-4 w-4" />
                <span>Create Folder</span>
              </Button>
              <Button variant="outline" className="flex items-center space-x-2">
                <RefreshCw className="h-4 w-4" />
                <span>Sync</span>
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                Grid
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                List
              </Button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search content..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex space-x-2">
              {["all", "video", "document", "image", "audio"].map((type) => (
                <Button
                  key={type}
                  variant={filterType === type ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterType(type as typeof filterType)}
                  className="capitalize"
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Grid/List */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredContent.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(item.type)}
                      <Badge className={getStatusColor(item.status)} variant="outline">
                        {getStatusIcon(item.status)}
                        <span className="ml-1">{item.status}</span>
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="text-sm line-clamp-2">{item.name}</CardTitle>
                  <CardDescription className="text-xs">
                    {item.size} • {new Date(item.uploadDate).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-3">
                  <div className="text-xs text-gray-600">
                    <div>By: {item.uploadedBy}</div>
                    {item.course && <div>Course: {item.course}</div>}
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Eye className="h-3 w-3" />
                      <span>{item.views}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Download className="h-3 w-3" />
                      <span>{item.downloads}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {item.tags.slice(0, 2).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {item.tags.length > 2 && (
                      <Badge variant="secondary" className="text-xs">
                        +{item.tags.length - 2}
                      </Badge>
                    )}
                  </div>

                  <div className="flex space-x-1">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Eye className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Download className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Share className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Edit className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredContent.map((item) => (
              <Card key={item.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 flex-1">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300"
                        checked={selectedItems.includes(item.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedItems([...selectedItems, item.id])
                          } else {
                            setSelectedItems(selectedItems.filter((id) => id !== item.id))
                          }
                        }}
                      />

                      <div className="flex items-center space-x-3">
                        {getTypeIcon(item.type)}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium truncate">{item.name}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>{item.size}</span>
                            <span>By {item.uploadedBy}</span>
                            <span>{new Date(item.uploadDate).toLocaleDateString()}</span>
                            {item.course && <span>{item.course}</span>}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <Badge className={getStatusColor(item.status)} variant="outline">
                        {getStatusIcon(item.status)}
                        <span className="ml-1">{item.status}</span>
                      </Badge>

                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Eye className="h-4 w-4" />
                          <span>{item.views}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Download className="h-4 w-4" />
                          <span>{item.downloads}</span>
                        </div>
                      </div>

                      <div className="flex space-x-1">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Share className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Bulk Actions */}
        {selectedItems.length > 0 && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white border border-gray-200 rounded-lg shadow-lg p-4">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium">{selectedItems.length} items selected</span>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline">
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
                <Button size="sm" variant="outline">
                  <Copy className="h-4 w-4 mr-1" />
                  Copy
                </Button>
                <Button size="sm" variant="outline">
                  <Archive className="h-4 w-4 mr-1" />
                  Archive
                </Button>
                <Button size="sm" variant="outline">
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
                <Button size="sm" variant="outline" onClick={() => setSelectedItems([])}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        {filteredContent.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <File className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No content found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm ? "Try adjusting your search terms." : "Upload your first content to get started."}
              </p>
              <Button>
                <Upload className="h-4 w-4 mr-2" />
                Upload Content
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
