"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Download, Calendar, FileText, BarChart3 } from "lucide-react"
import Link from "next/link"

export default function ProgressPage() {
  const [role, setRole] = useState<string | null>(null)
  const [user, setUser] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && typeof window !== "undefined") {
      try {
        const savedRole = localStorage.getItem("role")
        const savedUser = localStorage.getItem("user")

        if (!savedRole || !savedUser) {
          router.push("/login")
        } else if (savedRole !== "parent") {
          router.push("/dashboard")
        } else {
          setRole(savedRole)
          setUser(savedUser)
        }
      } catch (error) {
        console.error("Error accessing localStorage:", error)
        router.push("/login")
      }
    }
  }, [router, mounted])

  if (!mounted || !role || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading progress reports...</p>
        </div>
      </div>
    )
  }

  const children = [
    {
      id: 1,
      name: "Aanya Singh",
      grade: "8",
      section: "A",
      terms: [
        {
          name: "Term 1",
          status: "completed",
          subjects: [
            { name: "Mathematics", marks: 92, grade: "A", classAvg: 76 },
            { name: "Science", marks: 85, grade: "A-", classAvg: 72 },
            { name: "English", marks: 78, grade: "B+", classAvg: 75 },
            { name: "Social Studies", marks: 90, grade: "A", classAvg: 74 },
            { name: "Hindi", marks: 87, grade: "A-", classAvg: 78 },
          ],
          gpa: 3.8,
          rank: 3,
          totalStudents: 45,
          teacherRemarks:
            "Aanya is a diligent student who excels in mathematics and social studies. She actively participates in class discussions and demonstrates strong analytical skills.",
        },
        {
          name: "Term 2",
          status: "in-progress",
          subjects: [
            { name: "Mathematics", marks: 94, grade: "A", classAvg: 78 },
            { name: "Science", marks: 88, grade: "A-", classAvg: 74 },
            { name: "English", marks: 82, grade: "B+", classAvg: 76 },
            { name: "Social Studies", marks: 91, grade: "A", classAvg: 75 },
            { name: "Hindi", marks: 89, grade: "A-", classAvg: 79 },
          ],
          gpa: 3.9,
          rank: 2,
          totalStudents: 45,
          teacherRemarks:
            "Aanya continues to show improvement across all subjects. Her dedication to studies and consistent effort are commendable.",
        },
      ],
    },
    {
      id: 2,
      name: "Arjun Singh",
      grade: "5",
      section: "B",
      terms: [
        {
          name: "Term 1",
          status: "completed",
          subjects: [
            { name: "Mathematics", marks: 88, grade: "A-", classAvg: 72 },
            { name: "Science", marks: 90, grade: "A", classAvg: 75 },
            { name: "English", marks: 82, grade: "B+", classAvg: 74 },
            { name: "Social Studies", marks: 84, grade: "B+", classAvg: 70 },
            { name: "Hindi", marks: 91, grade: "A", classAvg: 76 },
          ],
          gpa: 3.7,
          rank: 5,
          totalStudents: 40,
          teacherRemarks:
            "Arjun shows exceptional creativity and performs well in science and Hindi. He needs to focus more on improving his writing skills in English.",
        },
        {
          name: "Term 2",
          status: "in-progress",
          subjects: [
            { name: "Mathematics", marks: 90, grade: "A", classAvg: 74 },
            { name: "Science", marks: 92, grade: "A", classAvg: 76 },
            { name: "English", marks: 85, grade: "B+", classAvg: 75 },
            { name: "Social Studies", marks: 86, grade: "B+", classAvg: 72 },
            { name: "Hindi", marks: 93, grade: "A", classAvg: 78 },
          ],
          gpa: 3.8,
          rank: 4,
          totalStudents: 40,
          teacherRemarks:
            "Arjun has shown significant improvement in English. His participation in class activities has increased, and he demonstrates good problem-solving skills.",
        },
      ],
    },
  ]

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Progress Reports</h1>
          <p className="text-gray-600 mt-2">Track your children's academic performance</p>
        </div>

        {/* Progress Reports */}
        {children.map((child) => (
          <div key={child.id} className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{child.name}</h2>
                <p className="text-gray-600">
                  Grade {child.grade} - Section {child.section}
                </p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Calendar className="mr-2 h-4 w-4" />
                  View All Terms
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {child.terms.map((term, termIdx) => (
              <Card key={termIdx}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{term.name}</CardTitle>
                      <CardDescription>Academic Year 2024-2025</CardDescription>
                    </div>
                    <Badge variant={term.status === "completed" ? "default" : "secondary"}>
                      {term.status === "completed" ? "Completed" : "In Progress"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Term Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-500">GPA</p>
                      <p className="text-2xl font-bold text-blue-600">{term.gpa}</p>
                      <p className="text-xs text-gray-500">out of 4.0</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-500">Rank</p>
                      <p className="text-2xl font-bold text-purple-600">
                        {term.rank}
                        <span className="text-sm font-normal text-gray-500">/{term.totalStudents}</span>
                      </p>
                      <p className="text-xs text-gray-500">in class</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-500">Attendance</p>
                      <p className="text-2xl font-bold text-green-600">96%</p>
                      <p className="text-xs text-gray-500">present days</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-500">Assignments</p>
                      <p className="text-2xl font-bold text-orange-600">92%</p>
                      <p className="text-xs text-gray-500">completion</p>
                    </div>
                  </div>

                  {/* Subject Performance */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">Subject Performance</h3>
                    <div className="space-y-4">
                      {term.subjects.map((subject, idx) => (
                        <div key={idx} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-medium">{subject.name}</h4>
                              <div className="flex items-center space-x-2">
                                <Badge variant="outline">{subject.grade}</Badge>
                                <span className="text-sm text-gray-500">{subject.marks}%</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-500">Class Average</p>
                              <p className="font-medium">{subject.classAvg}%</p>
                            </div>
                          </div>
                          <div className="relative pt-1">
                            <div className="flex items-center justify-between">
                              <div className="text-xs text-gray-500">0%</div>
                              <div className="text-xs text-gray-500">100%</div>
                            </div>
                            <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                              <div
                                style={{ width: `${subject.marks}%` }}
                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
                              ></div>
                            </div>
                            <div
                              style={{ left: `${subject.classAvg}%` }}
                              className="absolute bottom-0 w-1 h-4 bg-gray-500"
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Teacher Remarks */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium mb-2">Teacher Remarks</h3>
                    <p className="text-gray-700">{term.teacherRemarks}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-between">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/messages?subject=Progress Report&term=${term.name}`}>
                        <FileText className="mr-2 h-4 w-4" />
                        Request Details
                      </Link>
                    </Button>
                    <Button size="sm" asChild>
                      <Link href={`/progress/${child.id}/${termIdx}`}>
                        <BarChart3 className="mr-2 h-4 w-4" />
                        Detailed Analysis
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ))}

        {/* Academic Growth */}
        <Card>
          <CardHeader>
            <CardTitle>Academic Growth</CardTitle>
            <CardDescription>Track your children's progress over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Aanya Singh</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Mathematics</span>
                      <div className="space-x-2">
                        <span className="text-gray-500">Term 1: 92%</span>
                        <span className="font-medium">Term 2: 94%</span>
                        <Badge variant="outline" className="text-green-600">
                          +2%
                        </Badge>
                      </div>
                    </div>
                    <Progress value={94} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Science</span>
                      <div className="space-x-2">
                        <span className="text-gray-500">Term 1: 85%</span>
                        <span className="font-medium">Term 2: 88%</span>
                        <Badge variant="outline" className="text-green-600">
                          +3%
                        </Badge>
                      </div>
                    </div>
                    <Progress value={88} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>English</span>
                      <div className="space-x-2">
                        <span className="text-gray-500">Term 1: 78%</span>
                        <span className="font-medium">Term 2: 82%</span>
                        <Badge variant="outline" className="text-green-600">
                          +4%
                        </Badge>
                      </div>
                    </div>
                    <Progress value={82} className="h-2" />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="text-lg font-medium mb-3">Arjun Singh</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Mathematics</span>
                      <div className="space-x-2">
                        <span className="text-gray-500">Term 1: 88%</span>
                        <span className="font-medium">Term 2: 90%</span>
                        <Badge variant="outline" className="text-green-600">
                          +2%
                        </Badge>
                      </div>
                    </div>
                    <Progress value={90} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Science</span>
                      <div className="space-x-2">
                        <span className="text-gray-500">Term 1: 90%</span>
                        <span className="font-medium">Term 2: 92%</span>
                        <Badge variant="outline" className="text-green-600">
                          +2%
                        </Badge>
                      </div>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>English</span>
                      <div className="space-x-2">
                        <span className="text-gray-500">Term 1: 82%</span>
                        <span className="font-medium">Term 2: 85%</span>
                        <Badge variant="outline" className="text-green-600">
                          +3%
                        </Badge>
                      </div>
                    </div>
                    <Progress value={85} className="h-2" />
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
