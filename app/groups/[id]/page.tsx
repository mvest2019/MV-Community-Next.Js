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

export default function GroupPage() {
  const params = useParams()
  const groupId = params.id

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
  const groupPosts = [
    {
      id: 1,
      author: {
        name: "Sarah Mitchell",
        username: "SarahM_Landowner",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
        verified: true,
        reputation: 4.9,
      },
      content:
        "Just received my Q4 royalty statement and noticed some discrepancies in the calculations. Has anyone else experienced issues with XYZ Energy's reporting? The volumes seem off compared to what I'm seeing from the Railroad Commission data.",
      timestamp: "2 hours ago",
      category: "Royalty Payments",
      engagement: {
        likes: 24,
        comments: 8,
        shares: 3,
        views: 156,
      },
      tags: ["royalty-payments", "permian-basin", "xyz-energy"],
      hasImage: false,
      isBestPractice: false,
    },
    {
      id: 2,
      author: {
        name: "Marcus Rodriguez",
        username: "MarcusR_Geology",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
        verified: true,
        reputation: 4.8,
      },
      content:
        "🏆 BEST PRACTICE: When negotiating lease terms, always include a 'no deduction' clause for post-production costs. This can save you thousands in the long run. Here's a template clause that has worked well for my clients...",
      timestamp: "4 hours ago",
      category: "Lease Negotiation",
      engagement: {
        likes: 89,
        comments: 23,
        shares: 15,
        views: 445,
      },
      tags: ["lease-negotiation", "best-practices", "legal-advice"],
      hasImage: true,
      isBestPractice: true,
    },
    {
      id: 3,
      author: {
        name: "Jennifer Walsh",
        username: "JenW_EagleForrd",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
        verified: false,
        reputation: 4.6,
      },
      content:
        "Update on the drilling activity near my property: The operator finally provided the updated drilling schedule. They'll be starting horizontal drilling next month. Noise levels have been manageable so far, but I'm keeping detailed logs just in case.",
      timestamp: "6 hours ago",
      category: "Drilling Updates",
      engagement: {
        likes: 12,
        comments: 5,
        shares: 2,
        views: 89,
      },
      tags: ["drilling", "eagle-ford", "property-updates"],
      hasImage: false,
      isBestPractice: false,
    },
  ]

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
            {groupPosts.map((post) => (
              <Link key={post.id} href={`/groups/${groupId}/post/${post.id}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer mb-3">
                  <CardContent className="p-6">
                    {/* Post Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-3 flex-1">
                        <Avatar className="h-12 w-12 flex-shrink-0">
                          <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-gray-900 break-words">{post.author.name}</h3>
                            {post.author.verified && (
                              <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                                Verified
                              </Badge>
                            )}
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 text-yellow-500" fill="currentColor" />
                              <span className="text-xs text-gray-500">{post.author.reputation}</span>
                            </div>
                          </div>
                          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
                            <span>@{post.author.username}</span>
                            <span>•</span>
                            <span>{post.timestamp}</span>
                            <span>•</span>
                            <Badge variant="outline" className="text-xs">
                              {post.category}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={(e) => e.preventDefault()} // Prevent navigation when clicking dropdown
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

                    {/* Rest of the post content remains the same */}
                    {/* Post Content */}
                    <div className="mb-4">
                      {post.isBestPractice && (
                        <div className="flex items-center gap-2 mb-3 p-2 bg-green-50 rounded-lg border border-green-200">
                          <Award className="h-5 w-5 text-green-600" fill="currentColor" />
                          <span className="text-sm font-medium text-green-800">
                            {post.content.includes("BEST PRACTICE") ? "Best Practice" : "Best Answer"}
                          </span>
                        </div>
                      )}
                      <p className="text-gray-800 break-words leading-relaxed">{post.content}</p>

                      {post.hasImage && (
                        <div className="mt-3 bg-gray-100 rounded-lg p-4 border-2 border-dashed border-gray-300">
                          <div className="text-center text-gray-500">
                            <Camera className="h-8 w-8 mx-auto mb-2" />
                            <p className="text-sm">Image attachment would be displayed here</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                          #{tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Engagement Stats */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-6">
                        <button
                          className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors"
                          onClick={(e) => e.preventDefault()} // Prevent navigation when clicking like
                        >
                          <ThumbsUp className="h-5 w-5" />
                          <span className="text-sm font-medium">{post.engagement.likes}</span>
                        </button>
                        <div className="flex items-center gap-2 text-gray-500">
                          <MessageSquare className="h-5 w-5" />
                          <span className="text-sm font-medium">{post.engagement.comments}</span>
                        </div>
                        <button
                          className="flex items-center gap-2 text-gray-500 hover:text-purple-600 transition-colors"
                          onClick={(e) => e.preventDefault()} // Prevent navigation when clicking share
                        >
                          <Share2 className="h-5 w-5" />
                          <span className="text-sm font-medium">{post.engagement.shares}</span>
                        </button>
                      </div>
                      <div className="flex items-center gap-1 text-gray-400">
                        <Eye className="h-4 w-4" />
                        <span className="text-sm">{post.engagement.views} views</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
