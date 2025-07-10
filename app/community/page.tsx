

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Eye, Calendar, ExternalLink, UserPlus, Link, Users, MessageSquare } from "lucide-react"
import { AppLayout } from "@/components/app-layout"
import { Separator } from "@/components/ui/separator"
import { CreatePostForm } from "@/components/create-post-form"
import { SortDropdown } from "@/components/sort-dropdown"
import { PostCard } from "@/components/post-card"
import { getRecentActivity } from "@/services/service"
import { get } from "http"

// ...other server-side data fetching functions (getIndustryNews, getSuggestedConnections, etc.)...

const suggestedGroups = [
  {
    id: 1,
    name: "Permian Basin Owners",
    members: 2847,
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=60&h=60&fit=crop",
  },
  {
    id: 2,
    name: "Eagle Ford Shale",
    members: 1923,
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=60&h=60&fit=crop",
  },
  {
    id: 3,
    name: "Royalty Owners United",
    members: 3456,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop",
  },
]

const trendingTopics = [
  { tag: "#MineralRights", posts: 234 },
  { tag: "#RoyaltyPayments", posts: 189 },
  { tag: "#LeaseNegotiation", posts: 156 },
  { tag: "#DrillingUpdates", posts: 98 },
]

async function getIndustryNews() {
  return [
    {
      id: 1,
      title: "New EPA Regulations Impact Drilling Operations",
      source: "Energy Today",
      time: "2h ago",
      readers: "1,234",
    },
    {
      id: 2,
      title: "Permian Basin Production Reaches Record High",
      source: "Oil & Gas Journal",
      time: "4h ago",
      readers: "2,567",
    },
    {
      id: 3,
      title: "Technology Advances in Horizontal Drilling",
      source: "Petroleum Engineer",
      time: "6h ago",
      readers: "1,890",
    },
    {
      id: 4,
      title: "Mineral Rights Valuations See 15% Increase",
      source: "Land Professional",
      time: "8h ago",
      readers: "3,456",
    },
  ]
}

async function getSuggestedConnections() {
  return [
    {
      id: 1,
      name: "Michael Johnson",
      title: "VP of Operations at ConocoPhillips",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face",
      mutualConnections: 12,
      location: "Houston, TX",
    },
    {
      id: 2,
      name: "Amanda Rodriguez",
      title: "Senior Landman at EOG Resources",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face",
      mutualConnections: 8,
      location: "Austin, TX",
    },
    {
      id: 3,
      name: "James Wilson",
      title: "Petroleum Engineer at Chevron",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
      mutualConnections: 15,
      location: "Midland, TX",
    },
  ]
}

async function getCompanies() {
  return [
    {
      id: 1,
      name: "ExxonMobil",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=60&h=60&fit=crop",
      followers: "2.1M",
      industry: "Oil & Gas",
      updates: 3,
    },
    {
      id: 2,
      name: "ConocoPhillips",
      logo: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=60&h=60&fit=crop",
      followers: "1.8M",
      industry: "Energy",
      updates: 2,
    },
    {
      id: 3,
      name: "Pioneer Natural Resources",
      logo: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=60&h=60&fit=crop",
      followers: "890K",
      industry: "Shale Production",
      updates: 5,
    },
  ]
}

async function getUpcomingEvents() {
  return [
    {
      id: 1,
      title: "NAPE Summit 2025",
      date: "Feb 12-14",
      location: "Houston, TX",
      attendees: 15000,
      type: "Conference",
    },
    {
      id: 2,
      title: "Mineral Rights Webinar",
      date: "Jan 25",
      location: "Online",
      attendees: 500,
      type: "Webinar",
    },
    {
      id: 3,
      title: "Energy Law Symposium",
      date: "Mar 5-6",
      location: "Dallas, TX",
      attendees: 800,
      type: "Symposium",
    },
  ]
}
async function getCommunityStats() {
  return {
    activeMembers: 2847,
    threadCount: 1234,
  }
}
export default async function CommunityPage() {
  // Fetch all data server-side
  const [recentActivity, industryNews, suggestedConnections, companies, upcomingEvents,communityStats] = await Promise.all([
    getRecentActivity(),
    getIndustryNews(),
    getSuggestedConnections(),
    getCompanies(),
    getUpcomingEvents(),
    getCommunityStats(),
  ])
const mappedRecentActivity = recentActivity.map((item: any) => ({
  ...item,
  user: {
    name: item.userName || "",
    avatar: item.userImage || "/placeholder.svg",
    verified: false,
    connections: "",
    title: "",
  },
  content: item.postQuestion,
  timestamp: item.lastActivity,
  comments: [], // <-- Add this line
}));
console.log("Recent Activity API Response:", recentActivity);
  return (
    <AppLayout pageTitle="Welcome to Community" searchPlaceholder="Search for people, companies, posts...">
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-9 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-6 space-y-4">
              {/* <CreatePostForm /> */}
              <div className="space-y-4">
             {mappedRecentActivity && mappedRecentActivity.length > 0 ? (
  mappedRecentActivity.map((activity: any, idx: number) => (
    <PostCard key={activity.threadId ?? idx} post={activity} />
  ))
) : (
  <div className="text-center text-gray-500 py-8">No recent activity found.</div>
)}
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-3 space-y-4">
              <div className="sticky top-6 space-y-4">
                  {/* Community Stats */}
                <Card >
                  <CardHeader className="pb-3 p-3">
                    <h3 className="font-semibold text-gray-900">Community Stats</h3>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="flex items-center space-x-3">
                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-full flex-shrink-0">
                          <Users className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-blue-700 mb-1">Active Members</div>
                          <div className="text-2xl font-bold text-blue-900">
                            {communityStats.activeMembers.toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="bg-gradient-to-r from-green-500 to-green-600 p-3 rounded-full flex-shrink-0">
                          <MessageSquare className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-green-700 mb-1">Threads</div>
                          <div className="text-2xl font-bold text-green-900">
                            {communityStats.threadCount.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                {/* Industry News */}
                <Card>
                  <CardHeader className="pb-3 p-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900">Energy Industry News</h3>
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      {industryNews.map((news) => (
                        <div key={news.id} className="cursor-pointer hover:bg-gray-50 p-2 rounded-lg -m-2">
                          <h4 className="font-medium text-sm text-gray-900 mb-1 line-clamp-2 leading-tight">
                            {news.title}
                          </h4>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>
                              {news.source} • {news.time}
                            </span>
                            <div className="flex items-center space-x-1">
                              <Eye className="h-3 w-3" />
                              <span>{news.readers}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button variant="ghost" className="w-full mt-3 text-blue-600 hover:bg-blue-50">
                      Show more
                    </Button>
                  </CardContent>
                </Card>

                {/* Suggested Groups */}
                <Card>
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900">Suggested Groups</h3>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href="/groups">See all</Link>
                      </Button>
                    </div>
                    <div className="space-y-3">
                      {suggestedGroups.map((group) => (
                        <div key={group.id} className="flex items-center space-x-3">
                          <img
                            src={group.image || "/placeholder.svg"}
                            alt={group.name}
                            className="h-12 w-12 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-sm text-gray-900">{group.name}</h4>
                            <p className="text-xs text-gray-500">{group.members.toLocaleString()} members</p>
                          </div>
                          <Button size="sm" variant="outline">
                            Join
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Trending Topics */}
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Trending Topics</h3>
                    <div className="space-y-2">
                      {trendingTopics.map((topic) => (
                        <div key={topic.tag} className="flex justify-between items-center">
                          <span className="text-blue-600 hover:underline cursor-pointer text-sm">{topic.tag}</span>
                          <span className="text-xs text-gray-500">{topic.posts} posts</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}