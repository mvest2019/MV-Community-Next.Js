"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Plus,
  MessageSquare,
  Eye,
  Users,
  ThumbsUp,
  Share2,
  Star,
  Award,
  Lock,
  MoreHorizontal,
  Bookmark,
  Camera,
} from "lucide-react"
import Image from "next/image"
import { useParams } from "next/navigation"
import { AppLayout } from "@/components/app-layout"
import Link from "next/link"
import { useEffect, useState } from "react"
import { getGroupThreads } from "@/services/service"
import { GroupThreadsDataInterface, GroupThreadsInterface } from "@/types/community-types"
import { Skeleton } from "@/components/ui/skeleton"

export default function GroupPage() {
  const params = useParams()
  const groupId = params.id
  const [groupThreads, setGroupThreads] = useState<GroupThreadsInterface | null>(null)
  const [loading, setLoading] = useState(true)

  // Sample group data
  const groupData = {
    id: 1,
    name: "Texas Mineral Rights Owners",
    description: "A community for mineral rights owners in Texas to share experiences and advice.",
    memberCount: 2847,
    postCount: 1234,
    category: "Regional",
    privacy: "Public",
    avatar: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=300&fit=crop",
    moderators: ["GeologyExpertTX", "TexasLandman"],
    isJoined: true,
  }

  // Sample group posts
  // const groupPosts = [
  //   {
  //     id: 1,
  //     author: {
  //       name: "Sarah Mitchell",
  //       username: "SarahM_Landowner",
  //       avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
  //       verified: true,
  //       reputation: 4.9,
  //     },
  //     content:
  //       "Just received my Q4 royalty statement and noticed some discrepancies in the calculations. Has anyone else experienced issues with XYZ Energy's reporting? The volumes seem off compared to what I'm seeing from the Railroad Commission data.",
  //     timestamp: "2 hours ago",
  //     category: "Royalty Payments",
  //     engagement: {
  //       likes: 24,
  //       comments: 8,
  //       shares: 3,
  //       views: 156,
  //     },
  //     tags: ["royalty-payments", "permian-basin", "xyz-energy"],
  //     hasImage: false,
  //     isBestPractice: false,
  //   },
  //   {
  //     id: 2,
  //     author: {
  //       name: "Marcus Rodriguez",
  //       username: "MarcusR_Geology",
  //       avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
  //       verified: true,
  //       reputation: 4.8,
  //     },
  //     content:
  //       "🏆 BEST PRACTICE: When negotiating lease terms, always include a 'no deduction' clause for post-production costs. This can save you thousands in the long run. Here's a template clause that has worked well for my clients...",
  //     timestamp: "4 hours ago",
  //     category: "Lease Negotiation",
  //     engagement: {
  //       likes: 89,
  //       comments: 23,
  //       shares: 15,
  //       views: 445,
  //     },
  //     tags: ["lease-negotiation", "best-practices", "legal-advice"],
  //     hasImage: true,
  //     isBestPractice: true,
  //   },
  //   {
  //     id: 3,
  //     author: {
  //       name: "Jennifer Walsh",
  //       username: "JenW_EagleForrd",
  //       avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
  //       verified: false,
  //       reputation: 4.6,
  //     },
  //     content:
  //       "Update on the drilling activity near my property: The operator finally provided the updated drilling schedule. They'll be starting horizontal drilling next month. Noise levels have been manageable so far, but I'm keeping detailed logs just in case.",
  //     timestamp: "6 hours ago",
  //     category: "Drilling Updates",
  //     engagement: {
  //       likes: 12,
  //       comments: 5,
  //       shares: 2,
  //       views: 89,
  //     },
  //     tags: ["drilling", "eagle-ford", "property-updates"],
  //     hasImage: false,
  //     isBestPractice: false,
  //   },
  // ]
  // Converts ISO date string to "X weeks/months/years ago"
function getTimeAgo(dateString: string): string {
  const now = new Date();
  const created = new Date(dateString);
  const diffMs = now.getTime() - created.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 7) {
    return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
  }
  const diffWeeks = Math.floor(diffDays / 7);
  if (diffWeeks < 4) {
    return `${diffWeeks} week${diffWeeks !== 1 ? "s" : ""} ago`;
  }
  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) {
    return `${diffMonths} month${diffMonths !== 1 ? "s" : ""} ago`;
  }
  const diffYears = Math.floor(diffDays / 365);
  return `${diffYears} year${diffYears !== 1 ? "s" : ""} ago`;
}
  // {called api to fetch group data}
useEffect(() => {
  async function fetchThreads() {
    setLoading(true)
    const response = await getGroupThreads(Number(groupId), 1, 10)
    // If response is an array, use response[0]; if it's an object, use response directly
    setGroupThreads(Array.isArray(response) ? response[0] : response)
    setLoading(false)
  }
  fetchThreads()
}, [groupId])

  return (
    <AppLayout
      backLink={{
        href: "/my-groups",
        label: "Back to My Groups",
        shortLabel: "Back",
      }}
      searchPlaceholder="Search in group..."
    >
      {/* Group Header */}
      <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600 overflow-hidden">
        <Image src={groupData.coverImage || "/placeholder.svg"} alt={groupData.name} fill className="object-cover" />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex items-end gap-4">
            <Avatar className="h-20 w-20 border-4 border-white">
              <AvatarImage src={groupData.avatar || "/placeholder.svg"} />
              <AvatarFallback className="bg-purple-600 text-white text-2xl font-bold">
                {groupData.name[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-white">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl lg:text-3xl font-bold">{groupData.name}</h1>
                {groupData.privacy === "Private" && (
                  <Badge variant="secondary" className="bg-red-500/90 text-white border-0">
                    <Lock className="h-3 w-3 mr-1" />
                    Private
                  </Badge>
                )}
              </div>
              <p className="text-white/90 mb-2">{groupData.description}</p>
              <div className="flex items-center gap-4 text-sm text-white/80">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{groupData.memberCount.toLocaleString()} members</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  <span>{groupData.postCount} posts</span>
                </div>
                <span>•</span>
                <span>{groupData.category}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                <Plus className="h-4 w-4 mr-2" />
                Post
              </Button>
              <Button variant="secondary" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                <Users className="h-4 w-4 mr-2" />
                Members
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Group Posts */}
      <div className="p-4 lg:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Recent Posts</h2>
          </div>

     <div className="space-y-8">
  {loading ? (
    // Skeleton UI shown while loading data
    Array.from({ length: 3 }).map((_, idx) => (
      <Card key={idx} className="mb-3">
        <CardContent className="p-6">
          <div className="flex items-start gap-3 mb-4">
            {/* Circular avatar skeleton */}
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="flex-1 space-y-2">
              {/* Skeleton for name */}
              <Skeleton className="h-4 w-1/3" />
              {/* Skeleton for meta info */}
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
          {/* Skeleton for question text */}
          <Skeleton className="h-4 w-5/6 mb-2" />
          <Skeleton className="h-4 w-2/3 mb-2" />
          {/* Skeletons for buttons */}
          <div className="flex gap-2 mt-4">
            <Skeleton className="h-6 w-16 rounded" />
            <Skeleton className="h-6 w-16 rounded" />
            <Skeleton className="h-6 w-16 rounded" />
          </div>
        </CardContent>
      </Card>
    ))
  ) : (
    <>
      {/* Render this part only when loading is false */}
      {!groupThreads || groupThreads.data.length === 0 ? (
        <div className="text-gray-500 text-center py-8">No posts found for this group.</div>
      ) : (
        // 🧵 Map through threads when available
        groupThreads.data.map((thread: GroupThreadsDataInterface) => (
          <Link key={thread.threadId} href={`/groups/${groupId}/post/${thread.threadId}`}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer mb-3">
              <CardContent className="p-6">
                {/* Post Header */}
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-start gap-3 flex-1">
                    {/* 🖼 Avatar or fallback with user initial */}
                    <Avatar>
                      {thread.userImage && thread.userImage.trim() !== "" ? (
                        <AvatarImage src={thread.userImage} />
                      ) : (
                        <AvatarFallback className="bg-purple-600 text-white text-lg font-bold">
                          {thread.userName ? thread.userName[0] : ""}
                        </AvatarFallback>
                      )}
                    </Avatar>

                    {/* 👤 Name & Meta */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900 break-words">
                          {thread.userName}
                        </h3>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
                        <span>@{thread.userName}</span>
                        <span>•</span>
                        <span>{getTimeAgo(thread.lastActivity)}</span>
                      </div>
                    </div>
                  </div>

                  {/* ⋮ Dropdown Menu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={(e) => e.preventDefault()} // Prevent page navigation
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Bookmark className="mr-2 h-4 w-4" />
                        Save Post
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Share2 className="mr-2 h-4 w-4" />
                        Share
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">Report Post</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* 📝 Post Content */}
                <div className="mb-1">
                  <strong className="text-black-900 break-words leading-relaxed">
                    {thread.postQuestion}
                  </strong>
                <p
  className="text-gray-800 break-words leading-relaxed line-clamp-2"
  dangerouslySetInnerHTML={{ __html: thread.lastReply }}
/>
                </div>

                {/* 🏷 Hashtags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {thread.hashtags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-xs bg-gray-100 text-gray-700"
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>

                {/* 📊 Engagement Stats */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-6">
                    <button
                      className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors"
                      onClick={(e) => e.preventDefault()}
                    >
                      <ThumbsUp className="h-5 w-5" />
                      <span className="text-sm font-medium">{thread.NofOfVotes}</span>
                    </button>
                    <div className="flex items-center gap-2 text-gray-500">
                      <MessageSquare className="h-5 w-5" />
                      <span className="text-sm font-medium">{thread.NofOfComments}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500">
                      <Users className="h-5 w-5" />
                      <span className="text-sm font-medium">{thread.NofOfReplies}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))
      )}
    </>
  )}
</div>

        </div>
      </div>
    </AppLayout>
  )
}
