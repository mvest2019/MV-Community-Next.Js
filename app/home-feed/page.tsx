"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  MessageSquare,
  Eye,
  Share2,
  Bookmark,
  MoreHorizontal,
  ThumbsUp,
  Award,
  Star,
  Send,
  Copy,
  Facebook,
  Twitter,
  Linkedin,
} from "lucide-react"
import { useState } from "react"
import { AppLayout } from "@/components/app-layout"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

export default function HomeFeedPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [visiblePosts, setVisiblePosts] = useState(2)
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set())
  const [postComments, setPostComments] = useState<{ [key: number]: string }>({})
  const [newComment, setNewComment] = useState("")

  // Sample connected members' posts data
  const [feedPosts, setFeedPosts] = useState([
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
      groupId: 1,
      comments: [
        {
          id: 1,
          user: "GeologyExpertTX",
          avatar: "https://images.unsplash.com/photo-1560250097169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
          content: "I've seen similar issues with XYZ Energy. Check your division order for any recent changes.",
          time: "1 hour ago",
        },
        {
          id: 2,
          user: "RoyaltyExpert",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
          content:
            "You should contact their accounting department directly. They're usually responsive to these inquiries.",
          time: "30 minutes ago",
        },
      ],
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
      groupId: 2,
      comments: [
        {
          id: 1,
          user: "TexasLandman",
          avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
          content: "This is excellent advice! I wish I had known this before signing my first lease.",
          time: "3 hours ago",
        },
        {
          id: 2,
          user: "LegalEagle",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
          content: "Great template! I'd also recommend adding a clause about surface damage compensation.",
          time: "2 hours ago",
        },
      ],
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
      groupId: 1,
      comments: [
        {
          id: 1,
          user: "DrillingSupervisor",
          avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
          content: "Smart to keep logs! Make sure to document any property damage for compensation claims.",
          time: "4 hours ago",
        },
      ],
    },
    {
      id: 4,
      author: {
        name: "David Chen",
        username: "DavidC_Analyst",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
        verified: true,
        reputation: 4.7,
      },
      content:
        "Market analysis: Oil prices are showing strong support at $75/barrel. For those with upcoming lease negotiations, this could be a good time to push for higher bonus payments. The 5-year outlook remains positive for the Permian Basin.",
      timestamp: "8 hours ago",
      category: "Market Analysis",
      engagement: {
        likes: 34,
        comments: 12,
        shares: 8,
        views: 234,
      },
      tags: ["market-analysis", "oil-prices", "permian-basin"],
      hasImage: false,
      isBestPractice: false,
      groupId: 3,
      comments: [
        {
          id: 1,
          user: "MarketWatcher",
          avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=40&h=40&fit=crop&crop=face",
          content: "Great analysis! Do you think this trend will continue through Q2?",
          time: "6 hours ago",
        },
        {
          id: 2,
          user: "InvestorPro",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
          content: "Thanks for sharing this insight. Very helpful for planning our next moves.",
          time: "5 hours ago",
        },
      ],
    },
  ])

  const handleLoadMore = () => {
    setVisiblePosts(feedPosts.length)
  }

  const handleLike = (e: React.MouseEvent, postId: number) => {
    e.stopPropagation() // Prevent navigation when clicking the like button
    const newLikedPosts = new Set(likedPosts)
    const post = feedPosts.find((p) => p.id === postId)

    if (newLikedPosts.has(postId)) {
      newLikedPosts.delete(postId)
      if (post) {
        post.engagement.likes -= 1
      }
    } else {
      newLikedPosts.add(postId)
      if (post) {
        post.engagement.likes += 1
      }
    }

    setLikedPosts(newLikedPosts)
    setFeedPosts([...feedPosts])
  }

  const handleComment = (postId: number) => {
    if (!newComment.trim()) return

    const post = feedPosts.find((p) => p.id === postId)
    if (post) {
      const comment = {
        id: post.comments.length + 1,
        user: "John Doe", // Current user
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
        content: newComment,
        time: "Just now",
      }

      post.comments.push(comment)
      post.engagement.comments += 1
      setFeedPosts([...feedPosts])
      setNewComment("")

      toast({
        title: "Comment posted",
        description: "Your comment has been posted successfully.",
      })
    }
  }

  const handleShare = (e: React.MouseEvent, post: any, platform?: string) => {
    e.stopPropagation() // Prevent navigation when clicking the share button
    const shareText = `Check out this post by ${post.author.name}: "${post.content.substring(0, 100)}..."`
    const shareUrl = `${window.location.origin}/groups/${post.groupId}/post/${post.id}`

    if (platform === "copy") {
      navigator.clipboard.writeText(`${shareText} ${shareUrl}`)
      toast({
        title: "Link copied",
        description: "Link has been copied to clipboard!",
      })
    } else if (platform === "twitter") {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
        "_blank",
      )
    } else if (platform === "facebook") {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, "_blank")
    } else if (platform === "linkedin") {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, "_blank")
    }

    // Update share count
    post.engagement.shares += 1
    setFeedPosts([...feedPosts])
  }

  const navigateToPost = (post: any) => {
    router.push(`/groups/${post.groupId}/post/${post.id}`)
  }

  return (
    <AppLayout pageTitle="Home Feed" searchPlaceholder="Search posts, members...">
      <div className="p-3 lg:p-4">
        <div className="max-w-4xl mx-auto">
          {/* Feed Posts */}
          <div className="space-y-8">
            {feedPosts.slice(0, visiblePosts).map((post) => (
              <Card
                key={post.id}
                className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigateToPost(post)}
              >
                <CardContent className="p-4">
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
                          onClick={(e) => e.stopPropagation()} // Prevent navigation when opening dropdown
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                          <Bookmark className="mr-2 h-4 w-4" />
                          Save Post
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => handleShare(e, post, "copy")}>
                          <Copy className="mr-2 h-4 w-4" />
                          Copy Link
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600" onClick={(e) => e.stopPropagation()}>
                          Report Post
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

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
                      {/* Like Button */}
                      <button
                        onClick={(e) => handleLike(e, post.id)}
                        className={`flex items-center gap-2 transition-colors ${
                          likedPosts.has(post.id) ? "text-blue-600" : "text-gray-500 hover:text-blue-600"
                        }`}
                      >
                        <ThumbsUp className={`h-5 w-5 ${likedPosts.has(post.id) ? "fill-current" : ""}`} />
                        <span className="text-sm font-medium">{post.engagement.likes}</span>
                      </button>

                      {/* Comment Button */}
                      <Dialog>
                        <DialogTrigger asChild>
                          <button
                            className="flex items-center gap-2 text-gray-500 hover:text-green-600 transition-colors"
                            onClick={(e) => e.stopPropagation()} // Prevent navigation when opening dialog
                          >
                            <MessageSquare className="h-5 w-5" />
                            <span className="text-sm font-medium">{post.engagement.comments}</span>
                          </button>
                        </DialogTrigger>
                        <DialogContent
                          className="max-w-2xl max-h-[80vh] overflow-y-auto"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <DialogHeader>
                            <DialogTitle>Comments ({post.engagement.comments})</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 mt-4">
                            {/* Existing Comments */}
                            {post.comments.map((comment) => (
                              <div key={comment.id} className="flex items-start gap-3 p-3 border rounded-lg">
                                <Avatar className="h-8 w-8 flex-shrink-0">
                                  <AvatarImage src={comment.avatar || "/placeholder.svg"} />
                                  <AvatarFallback>{comment.user[0]}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="font-medium text-blue-600 break-words">{comment.user}</span>
                                    <span className="text-xs text-gray-500">{comment.time}</span>
                                  </div>
                                  <p className="text-sm text-gray-700 break-words">{comment.content}</p>
                                </div>
                              </div>
                            ))}

                            {/* Add Comment */}
                            <div className="flex items-start gap-3 p-3 border-2 border-dashed border-gray-200 rounded-lg">
                              <Avatar className="h-8 w-8 flex-shrink-0">
                                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" />
                                <AvatarFallback>JD</AvatarFallback>
                              </Avatar>
                              <div className="flex-1 space-y-2">
                                <Textarea
                                  placeholder="Write a comment..."
                                  value={newComment}
                                  onChange={(e) => setNewComment(e.target.value)}
                                  className="min-h-[80px]"
                                />
                                <div className="flex justify-end">
                                  <Button
                                    onClick={() => handleComment(post.id)}
                                    size="sm"
                                    disabled={!newComment.trim()}
                                  >
                                    <Send className="h-4 w-4 mr-2" />
                                    Post Comment
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>

                      {/* Share Button */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button
                            className="flex items-center gap-2 text-gray-500 hover:text-purple-600 transition-colors"
                            onClick={(e) => e.stopPropagation()} // Prevent navigation when opening dropdown
                          >
                            <Share2 className="h-5 w-5" />
                            <span className="text-sm font-medium">{post.engagement.shares}</span>
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={(e) => handleShare(e, post, "copy")}>
                            <Copy className="mr-2 h-4 w-4" />
                            Copy Link
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => handleShare(e, post, "twitter")}>
                            <Twitter className="mr-2 h-4 w-4" />
                            Share on Twitter
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => handleShare(e, post, "facebook")}>
                            <Facebook className="mr-2 h-4 w-4" />
                            Share on Facebook
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => handleShare(e, post, "linkedin")}>
                            <Linkedin className="mr-2 h-4 w-4" />
                            Share on LinkedIn
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400">
                      <Eye className="h-4 w-4" />
                      <span className="text-sm">{post.engagement.views} views</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          {visiblePosts < feedPosts.length && (
            <div className="text-center mt-6">
              <Button onClick={handleLoadMore} variant="outline" className="px-8">
                Load More Posts
              </Button>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  )
}
