"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Progress } from "../components/ui/progress"
import { Trophy, Star, Medal, Target, Zap, Crown, Gift, TrendingUp, Users, Calendar, CheckCircle } from "lucide-react"

type BadgeType = {
  id: string
  name: string
  description: string
  icon: string
  earned: boolean
  earnedDate?: string
  rarity: "Common" | "Rare" | "Epic" | "Legendary"
}

type Achievement = {
  id: string
  title: string
  description: string
  progress: number
  maxProgress: number
  reward: string
  category: "Learning" | "Social" | "Streak" | "Challenge"
}

type LeaderboardEntry = {
  rank: number
  name: string
  points: number
  badges: number
  streak: number
  avatar: string
}

export default function GamificationPage() {
  const [userLevel, setUserLevel] = useState(12)
  const [userXP, setUserXP] = useState(2450)
  const [nextLevelXP, setNextLevelXP] = useState(3000)
  const [userBadges, setUserBadges] = useState<BadgeType[]>([])
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [activeTab, setActiveTab] = useState<"overview" | "badges" | "achievements" | "leaderboard">("overview")

  useEffect(() => {
    // Mock badges data
    const mockBadges: BadgeType[] = [
      {
        id: "1",
        name: "First Steps",
        description: "Complete your first course",
        icon: "🎯",
        earned: true,
        earnedDate: "2024-01-10",
        rarity: "Common",
      },
      {
        id: "2",
        name: "Quiz Master",
        description: "Score 100% on 5 quizzes",
        icon: "🧠",
        earned: true,
        earnedDate: "2024-01-12",
        rarity: "Rare",
      },
      {
        id: "3",
        name: "Streak Warrior",
        description: "Maintain a 7-day learning streak",
        icon: "🔥",
        earned: true,
        earnedDate: "2024-01-14",
        rarity: "Epic",
      },
      {
        id: "4",
        name: "Code Ninja",
        description: "Complete 10 coding challenges",
        icon: "⚡",
        earned: false,
        rarity: "Legendary",
      },
      {
        id: "5",
        name: "Helper",
        description: "Help 5 fellow students in forums",
        icon: "🤝",
        earned: true,
        earnedDate: "2024-01-13",
        rarity: "Rare",
      },
      {
        id: "6",
        name: "Night Owl",
        description: "Study after 10 PM for 5 days",
        icon: "🦉",
        earned: false,
        rarity: "Common",
      },
    ]

    // Mock achievements data
    const mockAchievements: Achievement[] = [
      {
        id: "1",
        title: "Course Completion Champion",
        description: "Complete 10 courses",
        progress: 7,
        maxProgress: 10,
        reward: "500 XP + Legendary Badge",
        category: "Learning",
      },
      {
        id: "2",
        title: "Social Butterfly",
        description: "Make 20 forum posts",
        progress: 12,
        maxProgress: 20,
        reward: "300 XP + Social Badge",
        category: "Social",
      },
      {
        id: "3",
        title: "Consistency King",
        description: "Maintain 30-day streak",
        progress: 18,
        maxProgress: 30,
        reward: "1000 XP + Crown Badge",
        category: "Streak",
      },
      {
        id: "4",
        title: "Speed Demon",
        description: "Complete 5 courses in one week",
        progress: 2,
        maxProgress: 5,
        reward: "750 XP + Lightning Badge",
        category: "Challenge",
      },
    ]

    // Mock leaderboard data
    const mockLeaderboard: LeaderboardEntry[] = [
      { rank: 1, name: "Alex Chen", points: 15420, badges: 28, streak: 45, avatar: "👨‍💻" },
      { rank: 2, name: "Sarah Johnson", points: 14890, badges: 25, streak: 32, avatar: "👩‍🎓" },
      {
        rank: 3,
        name: "You",
        points: userXP,
        badges: mockBadges.filter((b) => b.earned).length,
        streak: 18,
        avatar: "🎯",
      },
      { rank: 4, name: "Mike Wilson", points: 12340, badges: 22, streak: 28, avatar: "👨‍🚀" },
      { rank: 5, name: "Emma Davis", points: 11890, badges: 20, streak: 15, avatar: "👩‍💼" },
      { rank: 6, name: "John Smith", points: 11200, badges: 18, streak: 22, avatar: "👨‍🔬" },
      { rank: 7, name: "Lisa Wang", points: 10950, badges: 17, streak: 12, avatar: "👩‍🎨" },
      { rank: 8, name: "David Brown", points: 10500, badges: 16, streak: 8, avatar: "👨‍🏫" },
    ]

    setUserBadges(mockBadges)
    setAchievements(mockAchievements)
    setLeaderboard(mockLeaderboard)
  }, [userXP])

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Common":
        return "bg-gray-100 text-gray-800 border-gray-300"
      case "Rare":
        return "bg-blue-100 text-blue-800 border-blue-300"
      case "Epic":
        return "bg-purple-100 text-purple-800 border-purple-300"
      case "Legendary":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Learning":
        return "bg-green-100 text-green-800"
      case "Social":
        return "bg-blue-100 text-blue-800"
      case "Streak":
        return "bg-orange-100 text-orange-800"
      case "Challenge":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const earnedBadges = userBadges.filter((badge) => badge.earned)
  const availableBadges = userBadges.filter((badge) => !badge.earned)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center">
            <Trophy className="h-10 w-10 text-yellow-500 mr-3" />
            Gamification Hub
          </h1>
          <p className="text-xl text-gray-600">Track your progress, earn rewards, and compete with peers</p>
        </div>

        {/* User Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-100">Level</CardTitle>
              <Crown className="h-4 w-4 text-yellow-300" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{userLevel}</div>
              <div className="mt-2">
                <div className="flex justify-between text-xs text-blue-100 mb-1">
                  <span>{userXP} XP</span>
                  <span>{nextLevelXP} XP</span>
                </div>
                <Progress value={(userXP / nextLevelXP) * 100} className="h-2 bg-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Badges Earned</CardTitle>
              <Medal className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{earnedBadges.length}</div>
              <p className="text-xs text-muted-foreground">of {userBadges.length} total</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
              <Zap className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">18</div>
              <p className="text-xs text-muted-foreground">days in a row</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Leaderboard Rank</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">#3</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
            {["overview", "badges", "achievements", "leaderboard"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as typeof activeTab)}
                className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-colors ${
                  activeTab === tab ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab === "overview" && <Trophy className="h-4 w-4 mr-2 inline" />}
                {tab === "badges" && <Medal className="h-4 w-4 mr-2 inline" />}
                {tab === "achievements" && <Target className="h-4 w-4 mr-2 inline" />}
                {tab === "leaderboard" && <Users className="h-4 w-4 mr-2 inline" />}
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 mr-2" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {earnedBadges.slice(0, 3).map((badge) => (
                  <div key={badge.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl">{badge.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-medium">{badge.name}</h4>
                      <p className="text-sm text-gray-600">{badge.description}</p>
                      <p className="text-xs text-gray-500">
                        Earned {badge.earnedDate ? new Date(badge.earnedDate).toLocaleDateString() : "Recently"}
                      </p>
                    </div>
                    <Badge className={getRarityColor(badge.rarity)}>{badge.rarity}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Progress Tracking */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 text-blue-500 mr-2" />
                  Active Goals
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {achievements.slice(0, 3).map((achievement) => (
                  <div key={achievement.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{achievement.title}</h4>
                      <Badge className={getCategoryColor(achievement.category)}>{achievement.category}</Badge>
                    </div>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>
                          {achievement.progress}/{achievement.maxProgress}
                        </span>
                      </div>
                      <Progress value={(achievement.progress / achievement.maxProgress) * 100} className="h-2" />
                    </div>
                    <p className="text-xs text-green-600">Reward: {achievement.reward}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Daily Challenges */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 text-green-500 mr-2" />
                  Daily Challenges
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="font-medium">Complete 1 Quiz</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800">+50 XP</Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="h-5 w-5 border-2 border-blue-600 rounded-full"></div>
                    <span className="font-medium">Study for 30 minutes</span>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">+75 XP</Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="h-5 w-5 border-2 border-purple-600 rounded-full"></div>
                    <span className="font-medium">Help a classmate</span>
                  </div>
                  <Badge className="bg-purple-100 text-purple-800">+100 XP</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Rewards Shop */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Gift className="h-5 w-5 text-purple-500 mr-2" />
                  Rewards Shop
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Custom Avatar</h4>
                    <p className="text-sm text-gray-600">Unlock unique profile avatars</p>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-800">500 XP</Badge>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Course Skip Token</h4>
                    <p className="text-sm text-gray-600">Skip one assignment deadline</p>
                  </div>
                  <Badge className="bg-red-100 text-red-800">1000 XP</Badge>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Premium Theme</h4>
                    <p className="text-sm text-gray-600">Unlock dark mode and themes</p>
                  </div>
                  <Badge className="bg-purple-100 text-purple-800">750 XP</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "badges" && (
          <div className="space-y-8">
            {/* Earned Badges */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Earned Badges ({earnedBadges.length})</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {earnedBadges.map((badge) => (
                  <Card key={badge.id} className="text-center hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="text-4xl mb-2">{badge.icon}</div>
                      <CardTitle className="text-lg">{badge.name}</CardTitle>
                      <Badge className={getRarityColor(badge.rarity)}>{badge.rarity}</Badge>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-2">{badge.description}</p>
                      <p className="text-xs text-green-600">
                        Earned {badge.earnedDate ? new Date(badge.earnedDate).toLocaleDateString() : "Recently"}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Available Badges */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Available Badges ({availableBadges.length})</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {availableBadges.map((badge) => (
                  <Card key={badge.id} className="text-center opacity-60 hover:opacity-80 transition-opacity">
                    <CardHeader>
                      <div className="text-4xl mb-2 grayscale">{badge.icon}</div>
                      <CardTitle className="text-lg">{badge.name}</CardTitle>
                      <Badge className={getRarityColor(badge.rarity)}>{badge.rarity}</Badge>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-2">{badge.description}</p>
                      <Button size="sm" variant="outline">
                        View Requirements
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "achievements" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Achievements</h2>
              <div className="flex space-x-2">
                {["All", "Learning", "Social", "Streak", "Challenge"].map((filter) => (
                  <Button key={filter} variant="outline" size="sm">
                    {filter}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {achievements.map((achievement) => (
                <Card key={achievement.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl">{achievement.title}</CardTitle>
                        <CardDescription className="mt-2">{achievement.description}</CardDescription>
                      </div>
                      <Badge className={getCategoryColor(achievement.category)}>{achievement.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>
                          {achievement.progress}/{achievement.maxProgress}
                        </span>
                      </div>
                      <Progress value={(achievement.progress / achievement.maxProgress) * 100} className="h-3" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <span className="text-gray-600">Reward: </span>
                        <span className="font-medium text-green-600">{achievement.reward}</span>
                      </div>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === "leaderboard" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Leaderboard</h2>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  This Week
                </Button>
                <Button size="sm">This Month</Button>
                <Button variant="outline" size="sm">
                  All Time
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {leaderboard.map((entry) => (
                <Card key={entry.rank} className={`${entry.name === "You" ? "ring-2 ring-blue-500 bg-blue-50" : ""}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-white ${
                            entry.rank === 1
                              ? "bg-yellow-500"
                              : entry.rank === 2
                                ? "bg-gray-400"
                                : entry.rank === 3
                                  ? "bg-amber-600"
                                  : "bg-gray-500"
                          }`}
                        >
                          {entry.rank <= 3 ? (entry.rank === 1 ? "🥇" : entry.rank === 2 ? "🥈" : "🥉") : entry.rank}
                        </div>

                        <div className="text-2xl">{entry.avatar}</div>

                        <div>
                          <h3 className="font-medium">{entry.name}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>{entry.points.toLocaleString()} XP</span>
                            <span>{entry.badges} badges</span>
                            <span>{entry.streak} day streak</span>
                          </div>
                        </div>
                      </div>

                      {entry.name === "You" && <Badge className="bg-blue-100 text-blue-800">You</Badge>}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
