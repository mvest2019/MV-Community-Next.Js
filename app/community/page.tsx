"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  MapPin,
  MessageSquare,
  Eye,
  Clock,
  TrendingUp,
  Users,
  HelpCircle,
  Reply,
  Calendar,
  ArrowRight,
  Heart,
  ThumbsUp,
} from "lucide-react"
import { AppLayout } from "@/components/app-layout"
import { useEffect, useState } from "react"
import Link from "next/link"
import { getLatestBlogs, getRecentActivity } from "@/services/service"
import { Button } from "@/components/ui/button"

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<"featured" | "recent">("recent")
  const [recentActivity, setRecentActivity] = useState<any[]>([])
  const [loadingRecent, setLoadingRecent] = useState(true)
  const [blogPosts, setBlogPosts] = useState<any[]>([])
  const [loadingBlogs, setLoadingBlogs] = useState(true)

  // Featured Discussions (static for now)
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

  function RecentActivitySkeleton() {
    return (
      <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 bg-white rounded-lg border mb-4 animate-pulse">
        <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gray-200" />
        <div className="flex-1 min-w-0">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-2" />
          <div className="h-3 bg-gray-100 rounded w-2/3 mb-1" />
          <div className="h-3 bg-gray-100 rounded w-1/4" />
        </div>
      </div>
    )
  }

  function timeAgo(dateString: string) {
    const date = new Date(dateString)
    const now = new Date()
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)
    if (isNaN(seconds)) return ""
    if (seconds < 60) return "Just now"
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes} min${minutes > 1 ? "s" : ""} ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`
    const days = Math.floor(hours / 24)
    if (days < 30) return `${days} day${days > 1 ? "s" : ""} ago`
    const months = Math.floor(days / 30)
    if (months < 12) return `${months} month${months > 1 ? "s" : ""} ago`
    const years = Math.floor(months / 12)
    return `${years} year${years > 1 ? "s" : ""} ago`
  }

  useEffect(() => {
    setLoadingBlogs(true)
    getLatestBlogs()
      .then((data) => setBlogPosts(Array.isArray(data) ? data : data?.data || []))
      .finally(() => setLoadingBlogs(false))
  }, [])

  useEffect(() => {
    if (activeTab === "recent") {
      setLoadingRecent(true)
      getRecentActivity()
        .then((data) => setRecentActivity(data))
        .finally(() => setLoadingRecent(false))
    }
  }, [activeTab])
  function BlogSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="rounded-t-lg bg-gray-200 h-40 w-full mb-2" />
      <div className="p-4">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
        <div className="h-3 bg-gray-100 rounded w-full mb-1" />
        <div className="h-3 bg-gray-100 rounded w-5/6 mb-3" />
        <div className="flex items-center">
          <div className="h-3 w-16 bg-gray-200 rounded" />
          <div className="ml-auto h-7 w-20 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
}

  return (
    <AppLayout pageTitle="Welcome to Community" searchPlaceholder="Search...">
      <div className="p-3 sm:p-4 lg:p-6">
        <div className="max-w-9xl mx-auto flex flex-col lg:flex-row gap-8">
          {/* Main Content - 70% */}
          <div className="w-full lg:w-[70%]">
            {/* Community Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 mb-4">
              <Card className="w-48 sm:w-64 mx-auto">
                <CardContent className="p-3 sm:p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Users className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500 mr-2" />
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-600">2,847</div>
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">Active Members</div>
                </CardContent>
              </Card>
              <Card className="w-48 sm:w-64 mx-auto">
                <CardContent className="p-3 sm:p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mr-2" />
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold text-green-600">1,234</div>
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">Discussions</div>
                </CardContent>
              </Card>
              <Card className="w-48 sm:w-64 mx-auto">
                <CardContent className="p-3 sm:p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <HelpCircle className="h-4 w-4 sm:h-5 sm:w-5 text-purple-500 mr-2" />
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold text-purple-600">5,678</div>
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">Questions Answered</div>
                </CardContent>
              </Card>
            </div>

            {/* Tab Navigation */}
            <div className="mb-4 sm:mb-6 flex justify-center">
              <div className="bg-gray-100 p-1 rounded-full inline-flex">
                <button
                  onClick={() => setActiveTab("recent")}
                  className={`px-3 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                    activeTab === "recent"
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 inline" />
                  <span className="hidden sm:inline">Recent Activity</span>
                  <span className="sm:hidden">Recent</span>
                </button>
                <button
                  onClick={() => setActiveTab("featured")}
                  className={`px-3 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                    activeTab === "featured"
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 inline" />
                  <span className="hidden sm:inline">Featured Discussions</span>
                  <span className="sm:hidden">Featured</span>
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
                {loadingRecent ? (
                  <>
                    <RecentActivitySkeleton />
                    <RecentActivitySkeleton />
                    <RecentActivitySkeleton />
                  </>
                ) : recentActivity.length === 0 ? (
                  !loadingRecent && (
                    <div className="text-center text-gray-500 py-8">No recent activity found.</div>
                  )
                ) : (
                  recentActivity.map((activity, idx) => (
                    <Link
                      key={`${activity.id ?? idx}-${activity.postUrl ?? idx}`}
                      href={activity.postUrl || "#"}
                    >
                      <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 bg-white rounded-lg border hover:border-gray-300 hover:bg-gray-50 transition-colors cursor-pointer mb-4">
                        <Avatar className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0">
                          {/* <AvatarImage src={activity.avatar || "/placeholder.svg"} /> */}
                          <AvatarFallback className="bg-purple-600 text-white text-lg font-semibold">
                            {activity.userName ? activity.userName[0].toUpperCase() : "?"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm sm:text-base break-words mb-0 font-medium">
                            {activity.postQuestion}{" "}
                          </p>
                          <p
                            className="text-gray-700 truncate leading-relaxed mb-2"
                            title={activity.lastReply}
                          >
                            {activity.lastReply
                              ? activity.lastReply.replace(/^[\d\s\.\:\)\-]+/, "")
                              : ""}
                          </p>
                          <div className="flex flex-wrap items-center gap-2 sm:gap-3 lg:gap-4 text-xs sm:text-sm text-gray-500 justify-between">
                            <div className="flex items-center gap-2">
                              <MessageSquare className="h-4 w-4" />
                              <span>{activity.NofOfComments } comments</span>
                               <span className="ml-2 flex items-center gap-1">
    <ThumbsUp className="h-4 w-4 text-blue-500" />
    <span>{activity.NofOfVotes} likes</span>
  </span>
                              <span className="ml-2">
                                <Reply className="h-4 w-4 inline" />
                                {activity.NofOfReplies } replies
                              </span>
                              <span className="ml-2 flex items-center gap-1">
                                <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                                {timeAgo(activity.lastActivity)}
                              </span>
                            </div>
                            <span className="font-medium text-blue-600 ml-auto">{activity.userName}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Blog Section - 30% */}
          <div className="w-full lg:w-[30%]">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Latest Blogs</h2>
            <div className="space-y-6">
             {loadingBlogs ? (
  <>
    <Card className="border-0 shadow-md"><BlogSkeleton /></Card>
    <Card className="border-0 shadow-md"><BlogSkeleton /></Card>
    <Card className="border-0 shadow-md"><BlogSkeleton /></Card>
    <Card className="border-0 shadow-md"><BlogSkeleton /></Card>
  </>
) : blogPosts.length === 0 ? (
  <div className="text-center text-gray-500 py-8">No blog posts found.</div>
) : (
                blogPosts.slice(0, 4).map((post,idx) => (
                  <Card
                    key={post.id || post.BlogId || idx}
                    className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md"
                  >
                    {/* <Link href={post.url || `/blog/${post.BlogId}`}> */}
                      <div className="cursor-pointer">
                       <div className="relative overflow-hidden rounded-t-lg bg-white">
       <img
  src={post.blog_header_img || "/placeholder.svg"}
  alt={post.blog_title}
  className="w-full h-40 object-cover object-bottom transition-transform duration-300 group-hover:scale-105"
  style={{ display: "block" }}
/>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
                        <CardContent className="p-4">
                          {/* Blog Title */}
                          <h3 className="font-bold text-base text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200 leading-tight">
                            {post.blog_title}
                          </h3>
                          {/* Blog Description */}
                         <p
            className="text-sm text-gray-600 mb-3 line-clamp-3 leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: post.blog,
            }}
          />
                          {/* Blog Meta */}
                      <div className="flex items-center text-xs text-gray-500 mb-3">
  <div className="flex items-center gap-1">
    <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
    <span>{timeAgo(post.Created_date)}</span>
  </div>
  <Button
    variant="ghost"
    size="sm"
    className="ml-auto px-2 py-1 text-xs h-auto group-hover:bg-blue-50 group-hover:text-blue-600 transition-all duration-200 font-medium"
  >
    Read More
    <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
  </Button>
</div>
                        </CardContent>
                      </div>
                    {/* </Link> */}
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}