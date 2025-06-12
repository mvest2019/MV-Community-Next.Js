"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, MessageSquare, Eye, Clock, TrendingUp, Users, HelpCircle, Bell } from "lucide-react"
import { AppLayout } from "@/components/app-layout"
import { useState } from "react"
import Link from "next/link"

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<"featured" | "recent">("featured")

  const featuredDiscussions = [
    {
      id: 1,
      title: "What to expect in 2025 contracts?",
      category: "Mineral Rights",
      author: "GeologyExpertTX",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=40&h=40&fit=crop&crop=face",
      comments: 18,
      views: 1200,
      badge: "Hot",
      badgeColor: "bg-emerald-100 text-emerald-800",
      postUrl: "/groups/1/post/1",
    },
    {
      id: 2,
      title: "Tips for negotiating better terms",
      category: "Lease Negotiation",
      author: "LeaseGuru",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=40&h=40&fit=crop&crop=face",
      comments: 32,
      views: 2500,
      badge: null,
      badgeColor: "",
      postUrl: "/groups/2/post/2",
    },
    {
      id: 3,
      title: "Who to contact when drilling affects your property?",
      category: "Drilling Issues",
      author: "Landman411",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      comments: 12,
      views: 890,
      badge: null,
      badgeColor: "",
      postUrl: "/groups/3/post/3",
    },
    {
      id: 4,
      title: "Understanding your monthly statements",
      category: "Royalty Payments",
      author: "RoyaltyMaster",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
      comments: 45,
      views: 3100,
      badge: "Trending",
      badgeColor: "bg-yellow-100 text-yellow-800",
      postUrl: "/groups/4/post/4",
    },
  ]

  const recentActivity = [
    {
      id: 1,
      user: "TX_Owner82",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
      action: "replied to",
      target: "Operator delaying royalty payments",
      timestamp: "2 hours ago",
      extra: "3 new replies",
      postUrl: "/groups/1/post/5#comment-123",
    },
    {
      id: 2,
      user: "PermianLandman",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face",
      action: "started a new thread in",
      target: "Lease Negotiation",
      timestamp: "5 hours ago",
      extra: "25 views",
      postUrl: "/groups/2/post/6",
    },
    {
      id: 3,
      user: "MineralGeologist",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face",
      action: "answered a question in",
      target: "Mineral Identification",
      timestamp: "8 hours ago",
      extra: "Marked as best answer",
      postUrl: "/groups/3/post/7#comment-456",
    },
    {
      id: 4,
      user: "EnergyExpert",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
      action: "shared a document in",
      target: "Legal Resources",
      timestamp: "12 hours ago",
      extra: "15 downloads",
      postUrl: "/groups/4/post/8",
    },
    {
      id: 5,
      user: "WestTexasLandowner",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=32&h=32&fit=crop&crop=face",
      action: "joined the group",
      target: "Permian Basin Owners",
      timestamp: "1 day ago",
      extra: "Welcome new member!",
      postUrl: "/groups/5",
    },
  ]

  return (
    <AppLayout pageTitle="Welcome to Community" searchPlaceholder="Search...">
      <div className="p-3 sm:p-4 lg:p-6">
        <div className="max-w-4xl mx-auto">
          {/* Community Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4">
            <Card>
              <CardContent className="p-3 sm:p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500 mr-2" />
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-600">2,847</div>
                </div>
                <div className="text-xs sm:text-sm text-gray-600">Active Members</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3 sm:p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mr-2" />
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-green-600">1,234</div>
                </div>
                <div className="text-xs sm:text-sm text-gray-600">Discussions</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3 sm:p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <HelpCircle className="h-4 w-4 sm:h-5 sm:w-5 text-purple-500 mr-2" />
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-purple-600">5,678</div>
                </div>
                <div className="text-xs sm:text-sm text-gray-600">Questions Answered</div>
              </CardContent>
            </Card>
          </div>

          {/* Community Update Alert - Capsule Style */}
         

          {/* Tab Navigation - Capsule Style */}
          <div className="mb-4 sm:mb-6 flex justify-center">
            <div className="bg-gray-100 p-1 rounded-full inline-flex">
              <button
                onClick={() => setActiveTab("featured")}
                className={`px-3 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                  activeTab === "featured" ? "bg-blue-600 text-white shadow-sm" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 inline" />
                <span className="hidden sm:inline">Featured Discussions</span>
                <span className="sm:hidden">Featured</span>
              </button>
              <button
                onClick={() => setActiveTab("recent")}
                className={`px-3 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                  activeTab === "recent" ? "bg-blue-600 text-white shadow-sm" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 inline" />
                <span className="hidden sm:inline">Recent Activity</span>
                <span className="sm:hidden">Recent</span>
              </button>
            </div>
          </div>

          {/* Content Area */}
          {activeTab === "featured" && (
            <div className="space-y-8 sm:space-y-10">
              {featuredDiscussions.map((discussion) => (
                <Link key={discussion.id} href={discussion.postUrl}>
                  <Card className="hover:shadow-md transition-shadow cursor-pointer mb-4">
                    <CardContent className="p-4 sm:p-5">
                      <div className="flex items-start gap-3 sm:gap-4">
                        <Avatar className="h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0">
                          <AvatarImage src={discussion.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="bg-blue-100 text-blue-600 text-sm">
                            {discussion.author.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium text-gray-900 mb-2 break-words text-base sm:text-lg">
                                <span className="text-blue-600">{discussion.category}:</span> {discussion.title}
                              </h3>
                              <div className="flex flex-wrap items-center gap-2 sm:gap-3 lg:gap-4 text-sm text-gray-500">
                                <span className="break-words">
                                  Posted by <span className="font-medium text-blue-600">{discussion.author}</span>
                                </span>
                                <div className="flex items-center gap-1">
                                  <MessageSquare className="h-4 w-4" />
                                  <span>{discussion.comments} comments</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Eye className="h-4 w-4" />
                                  <span>{discussion.views.toLocaleString()} views</span>
                                </div>
                              </div>
                            </div>
                            {discussion.badge && (
                              <Badge variant="secondary" className={`${discussion.badgeColor} flex-shrink-0 text-xs`}>
                                {discussion.badge}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}

          {activeTab === "recent" && (
            <div className="space-y-6 sm:space-y-8">
              {recentActivity.map((activity) => (
                <Link key={activity.id} href={activity.postUrl}>
                  <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 bg-white rounded-lg border hover:border-gray-300 hover:bg-gray-50 transition-colors cursor-pointer mb-4">
                    <Avatar className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0">
                      <AvatarImage src={activity.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-blue-100 text-blue-600 text-xs sm:text-sm">
                        {activity.user.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm sm:text-base break-words mb-2">
                        <span className="font-medium text-blue-600">{activity.user}</span> {activity.action}{" "}
                        <span className="italic">"{activity.target}"</span>
                      </p>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 lg:gap-4 text-xs sm:text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span>{activity.timestamp}</span>
                        </div>
                        <span>{activity.extra}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  )
}
