"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  ThumbsUp,
  MessageSquare,
  Share2,
  Bookmark,
  MoreHorizontal,
  Star,
  Award,
  Clock,
  Eye,
  Send,
  Bold,
  Italic,
  Underline,
  Link,
  List,
  Quote,
  Code,
  Reply,
  Flag,
  X,
  Copy,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  MessageCircle,
  Printer,
  Bell,
  ChevronUp,
  ChevronDown,
} from "lucide-react"
import { useState, useRef } from "react"
import { useParams } from "next/navigation"
import { AppLayout } from "@/components/app-layout"
import { useToast } from "@/components/ui/use-toast"

export default function PostDetailPage() {
  const { toast } = useToast()
  const params = useParams()
  const postId = params.postId
  const groupId = params.id
  const editorRef = useRef<HTMLDivElement>(null)
  const commentEditorRefs = useRef<{ [key: number]: HTMLDivElement | null }>({})

  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [showReplyEditor, setShowReplyEditor] = useState(false)
  const [replyContent, setReplyContent] = useState("")
  const [likedComments, setLikedComments] = useState<Set<number>>(new Set([2, 4]))
  const [replyingToComment, setReplyingToComment] = useState<number | null>(null)
  const [commentReplyContent, setCommentReplyContent] = useState("")
  const [showShareOptions, setShowShareOptions] = useState(false)
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false)
  const [upvoted, setUpvoted] = useState(false)
  const [downvoted, setDownvoted] = useState(false)
  const [upvoteCount, setUpvoteCount] = useState(42)
  const [downvoteCount, setDownvoteCount] = useState(3)

  // Sample post data
  const [postData, setPostData] = useState({
    id: 1,
    title: "Question about royalty payment delays in Permian Basin",
    content: `<p>Has anyone experienced delays in royalty payments from operators in the Permian Basin recently? My payments have been delayed for the past 3 months and I'm not sure what steps to take.</p>

<p>Here are the details of my situation:</p>
<ul>
<li>Lease signed in January 2023</li>
<li>Production started in June 2023</li>
<li>First payments were on time until October 2024</li>
<li>No communication from the operator about the delays</li>
</ul>

<p>I've tried contacting their accounting department but haven't received a response. Has anyone dealt with similar issues? What are my options here?</p>

<p><strong>Any advice would be greatly appreciated!</strong></p>`,
    author: {
      name: "Sarah Mitchell",
      username: "SarahM_Landowner",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
      verified: true,
      reputation: 4.9,
      joinedDate: "March 2023",
      postsCount: 127,
    },
    timestamp: "2 days ago",
    category: "Royalty Payments",
    tags: ["royalty-payments", "permian-basin", "operator-issues", "legal-advice"],
    engagement: {
      likes: 24,
      comments: 8,
      shares: 3,
      views: 156,
    },
    isBestAnswer: false,
    isPinned: false,
    groupInfo: {
      name: "Texas Mineral Rights Owners",
      id: 1,
    },
  })

  // Sample comments data
  const [comments, setComments] = useState([
    {
      id: 1,
      author: {
        name: "GeologyExpertTX",
        username: "GeologyExpertTX",
        avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=40&h=40&fit=crop&crop=face",
        verified: true,
        reputation: 4.8,
      },
      content: `<p>I've seen similar issues with several operators in the Permian Basin. Here's what I recommend:</p>

<ol>
<li><strong>Check your division order</strong> - Make sure there haven't been any recent changes</li>
<li><strong>Review your lease agreement</strong> - Look for clauses about payment timing</li>
<li><strong>Contact the Texas Railroad Commission</strong> - They can help with payment disputes</li>
</ol>

<p>In my experience, most delays are due to title issues or changes in ownership that need to be resolved. Don't wait too long to take action!</p>`,
      timestamp: "1 day ago",
      likes: 15,
      replies: [
        {
          id: 101,
          author: {
            name: "Sarah Mitchell",
            username: "SarahM_Landowner",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
            verified: true,
          },
          content:
            "<p>Thank you for the detailed response! I'll check my division order first. Do you know how to contact the Railroad Commission?</p>",
          timestamp: "1 day ago",
          likes: 3,
        },
        {
          id: 102,
          author: {
            name: "GeologyExpertTX",
            username: "GeologyExpertTX",
            avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=40&h=40&fit=crop&crop=face",
            verified: true,
          },
          content:
            "<p>You can file a complaint online at their website or call their Oil and Gas Division directly. They're usually very helpful with these issues.</p>",
          timestamp: "1 day ago",
          likes: 8,
        },
      ],
      isBestAnswer: true,
    },
    {
      id: 2,
      author: {
        name: "RoyaltyExpert",
        username: "RoyaltyExpert",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
        verified: true,
        reputation: 4.7,
      },
      content: `<p>This is unfortunately becoming more common. I'd also suggest:</p>

<ul>
<li>Documenting all your attempts to contact them</li>
<li>Checking if other landowners in your area are having similar issues</li>
<li>Consider consulting with an oil and gas attorney if the amounts are significant</li>
</ul>

<p>Keep detailed records of everything - dates, amounts, communications, etc. This will be important if you need to take legal action.</p>`,
      timestamp: "1 day ago",
      likes: 12,
      replies: [],
      isBestAnswer: false,
    },
    {
      id: 3,
      author: {
        name: "TexasLandman",
        username: "TexasLandman",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
        verified: false,
        reputation: 4.5,
      },
      content: `<p>I work with several operators in the Permian Basin. Sometimes delays are caused by:</p>

<blockquote>
<p>"Changes in ownership, title issues, or problems with the division of interest calculations"</p>
</blockquote>

<p>Have you received any notices about changes to your lease or ownership? Also, check if your contact information is up to date with the operator.</p>`,
      timestamp: "18 hours ago",
      likes: 7,
      replies: [],
      isBestAnswer: false,
    },
    {
      id: 4,
      author: {
        name: "LegalEagle",
        username: "LegalEagle",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
        verified: true,
        reputation: 4.9,
      },
      content: `<p><strong>Legal perspective:</strong> In Texas, operators are required to pay royalties within a certain timeframe. If they're consistently late, you may be entitled to interest on the delayed payments.</p>

<p>I'd recommend sending a certified letter to the operator documenting the issue and requesting immediate payment. This creates a paper trail that could be useful later.</p>

<p><em>This is not legal advice - consult with a qualified attorney for your specific situation.</em></p>`,
      timestamp: "12 hours ago",
      likes: 18,
      replies: [],
      isBestAnswer: false,
    },
  ])

  const handleLike = () => {
    setIsLiked(!isLiked)
    setPostData({
      ...postData,
      engagement: {
        ...postData.engagement,
        likes: isLiked ? postData.engagement.likes - 1 : postData.engagement.likes + 1,
      },
    })
  }

  const handleUpvote = () => {
    if (upvoted) {
      setUpvoted(false)
      setUpvoteCount(upvoteCount - 1)
    } else {
      setUpvoted(true)
      setUpvoteCount(upvoteCount + 1)
      if (downvoted) {
        setDownvoted(false)
        setDownvoteCount(downvoteCount - 1)
      }
    }
  }

  const handleDownvote = () => {
    if (downvoted) {
      setDownvoted(false)
      setDownvoteCount(downvoteCount - 1)
    } else {
      setDownvoted(true)
      setDownvoteCount(downvoteCount + 1)
      if (upvoted) {
        setUpvoted(false)
        setUpvoteCount(upvoteCount - 1)
      }
    }
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
    toast({
      title: isBookmarked ? "Bookmark removed" : "Bookmark added",
      description: isBookmarked ? "Post has been removed from your bookmarks" : "Post has been added to your bookmarks",
    })
  }

  const handleCommentLike = (commentId: number) => {
    const newLikedComments = new Set(likedComments)
    const comment = comments.find((c) => c.id === commentId)

    if (newLikedComments.has(commentId)) {
      newLikedComments.delete(commentId)
      if (comment) {
        comment.likes -= 1
      }
    } else {
      newLikedComments.add(commentId)
      if (comment) {
        comment.likes += 1
      }
    }

    setLikedComments(newLikedComments)
    setComments([...comments])
  }

  const handleSubmitReply = () => {
    if (!replyContent.trim()) return

    const newComment = {
      id: comments.length + 1,
      author: {
        name: "John Doe",
        username: "JohnDoe_User",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
        verified: false,
        reputation: 4.2,
      },
      content: replyContent,
      timestamp: "Just now",
      likes: 0,
      replies: [],
      isBestAnswer: false,
    }

    setComments([...comments, newComment])
    setReplyContent("")
    setShowReplyEditor(false)
    setPostData({
      ...postData,
      engagement: {
        ...postData.engagement,
        comments: postData.engagement.comments + 1,
      },
    })

    // Show toast notification
    toast({
      title: "Comment posted",
      description: "Your comment has been posted successfully.",
    })
  }

  const handleReplyToComment = (commentId: number) => {
    setReplyingToComment(commentId)
    // Reset any previous content
    setCommentReplyContent("")

    // Focus on the editor after it renders
    setTimeout(() => {
      if (commentEditorRefs.current[commentId]) {
        commentEditorRefs.current[commentId]?.focus()
      }
    }, 100)
  }

  const handleSubmitCommentReply = (commentId: number) => {
    if (!commentReplyContent.trim()) return

    const updatedComments = [...comments]
    const commentIndex = updatedComments.findIndex((c) => c.id === commentId)

    if (commentIndex !== -1) {
      const newReply = {
        id: Date.now(), // Use timestamp as unique ID
        author: {
          name: "John Doe",
          username: "JohnDoe_User",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
          verified: false,
        },
        content: commentReplyContent,
        timestamp: "Just now",
        likes: 0,
      }

      // Initialize replies array if it doesn't exist
      if (!updatedComments[commentIndex].replies) {
        updatedComments[commentIndex].replies = []
      }

      updatedComments[commentIndex].replies.push(newReply)
      setComments(updatedComments)
      setReplyingToComment(null)
      setCommentReplyContent("")

      // Show toast notification
      toast({
        title: "Reply posted",
        description: "Your reply to the comment has been posted successfully.",
      })
    }
  }

  const handleShare = (platform?: string) => {
    const shareText = `Check out this post by ${postData.author.name}: "${postData.title}"`
    const shareUrl = `${window.location.origin}/groups/${groupId}/post/${postId}`

    if (platform === "copy") {
      navigator.clipboard.writeText(shareUrl)
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
    } else if (platform === "email") {
      window.open(`mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(shareUrl)}`, "_blank")
    } else if (platform === "whatsapp") {
      window.open(`https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`, "_blank")
    } else if (platform === "print") {
      window.print()
    } else {
      setShowShareOptions(true)
      return
    }

    // Update share count
    setPostData({
      ...postData,
      engagement: {
        ...postData.engagement,
        shares: postData.engagement.shares + 1,
      },
    })
  }

  const formatContent = (command: string, value?: string) => {
    document.execCommand(command, false, value)
  }

  const formatCommentReply = (command: string, value?: string) => {
    document.execCommand(command, false, value)
  }

  const insertLink = () => {
    const url = prompt("Enter URL:")
    if (url) {
      document.execCommand("createLink", false, url)
    }
  }

  const insertCommentReplyLink = () => {
    const url = prompt("Enter URL:")
    if (url) {
      document.execCommand("createLink", false, url)
    }
  }

  const handleToggleNotification = () => {
    setIsNotificationEnabled(!isNotificationEnabled)
    toast({
      title: isNotificationEnabled ? "Notifications disabled" : "✅ Notifications enabled",
      description: isNotificationEnabled
        ? "You'll no longer receive notifications for this post."
        : "You'll now be notified of updates and replies to this post.",
      duration: 4000,
    })
  }

  return (
    <AppLayout
      backLink={{
        href: `/groups/${groupId}`,
        label: `Back to ${postData.groupInfo.name}`,
        shortLabel: "Back to Group",
      }}
      searchPlaceholder="Search in group..."
    >
      <div className="p-4 lg:p-6">
        <div className="max-w-4xl mx-auto">
          {/* Post Header */}
          <Card className="mb-6">
            <CardContent className="p-6">
              {/* Post Meta */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4 flex-1">
                  <Avatar className="h-12 w-12 flex-shrink-0">
                    <AvatarImage src={postData.author.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{postData.author.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900 break-words">{postData.author.name}</h3>
                      {postData.author.verified && (
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                          Verified
                        </Badge>
                      )}
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-500" fill="currentColor" />
                        <span className="text-xs text-gray-500">{postData.author.reputation}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
                      <span>@{postData.author.username}</span>
                      <span>•</span>
                      <span>{postData.timestamp}</span>
                      <span>•</span>
                      <Badge variant="outline" className="text-xs">
                        {postData.category}
                      </Badge>
                      {postData.isPinned && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                          Pinned
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    onClick={handleToggleNotification}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      isNotificationEnabled
                        ? "bg-green-100 text-green-700 hover:bg-green-200 border border-green-300"
                        : "bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200 hover:border-blue-300"
                    }`}
                  >
                    {isNotificationEnabled ? (
                      <>
                        <Bell className="h-4 w-4" fill="currentColor" />
                        <span className="hidden sm:inline">Notifications On</span>
                        <span className="sm:hidden">On</span>
                      </>
                    ) : (
                      <>
                        <Bell className="h-4 w-4" />
                        <span className="hidden sm:inline">Get Post Alerts</span>
                        <span className="sm:hidden">Notify</span>
                      </>
                    )}
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={handleBookmark}>
                        <Bookmark className={`mr-2 h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
                        {isBookmarked ? "Remove Bookmark" : "Bookmark Post"}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleShare()}>
                        <Share2 className="mr-2 h-4 w-4" />
                        Share Post
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Flag className="mr-2 h-4 w-4" />
                        Report Post
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Post Title */}
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 break-words">{postData.title}</h1>

              {/* Post Content */}
              <div
                className="prose prose-gray max-w-none mb-4"
                dangerouslySetInnerHTML={{ __html: postData.content }}
              />

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {postData.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                    #{tag}
                  </Badge>
                ))}
              </div>

              {/* Voting Section */}
              <div className="flex items-center gap-4 mb-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleUpvote}
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                      upvoted
                        ? "bg-green-100 text-green-700 border border-green-300"
                        : "bg-gray-100 text-gray-600 hover:bg-green-50 hover:text-green-600 border border-gray-300"
                    }`}
                  >
                    <ChevronUp className="h-5 w-5" />
                    <span className="text-sm font-medium">{upvoteCount}</span>
                  </button>
                  <button
                    onClick={handleDownvote}
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                      downvoted
                        ? "bg-red-100 text-red-700 border border-red-300"
                        : "bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600 border border-gray-300"
                    }`}
                  >
                    <ChevronDown className="h-5 w-5" />
                    <span className="text-sm font-medium">{downvoteCount}</span>
                  </button>
                </div>
                <Button onClick={() => setShowReplyEditor(!showReplyEditor)} className="bg-blue-600 hover:bg-blue-700">
                  <Reply className="h-4 w-4 mr-2" />
                  Add Comment
                </Button>
              </div>

              {/* Add Comment Editor */}
              {showReplyEditor && (
                <Card className="mb-4 border-2 border-blue-200">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3 mb-4">
                      <Avatar className="h-8 w-8 flex-shrink-0">
                        <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-2">Write your comment</h4>

                        {/* HTML Editor Toolbar */}
                        <div className="flex flex-wrap items-center gap-1 p-2 border border-gray-300 rounded-t-lg bg-gray-50">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => formatContent("bold")}
                            className="h-8 w-8 p-0"
                          >
                            <Bold className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => formatContent("italic")}
                            className="h-8 w-8 p-0"
                          >
                            <Italic className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => formatContent("underline")}
                            className="h-8 w-8 p-0"
                          >
                            <Underline className="h-4 w-4" />
                          </Button>
                          <Separator orientation="vertical" className="h-6 mx-1" />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => formatContent("insertUnorderedList")}
                            className="h-8 w-8 p-0"
                          >
                            <List className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => formatContent("formatBlock", "blockquote")}
                            className="h-8 w-8 p-0"
                          >
                            <Quote className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={insertLink} className="h-8 w-8 p-0">
                            <Link className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => formatContent("formatBlock", "pre")}
                            className="h-8 w-8 p-0"
                          >
                            <Code className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* HTML Editor */}
                        <div
                          ref={editorRef}
                          contentEditable
                          className="min-h-[120px] p-3 border border-gray-300 rounded-b-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          style={{ borderTop: "none" }}
                          onInput={(e) => setReplyContent(e.currentTarget.innerHTML)}
                          suppressContentEditableWarning={true}
                        >
                          <p>Type your comment here...</p>
                        </div>

                        <div className="flex justify-end gap-2 mt-3">
                          <Button
                            variant="outline"
                            onClick={() => {
                              setShowReplyEditor(false)
                              setReplyContent("")
                              if (editorRef.current) {
                                editorRef.current.innerHTML = "<p>Type your comment here...</p>"
                              }
                            }}
                          >
                            Cancel
                          </Button>
                          <Button onClick={handleSubmitReply} className="bg-blue-600 hover:bg-blue-700">
                            <Send className="h-4 w-4 mr-2" />
                            Post Comment
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Engagement Stats */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-6">
                  <button
                    onClick={handleLike}
                    className={`flex items-center gap-2 transition-colors ${
                      isLiked ? "text-blue-600" : "text-gray-500 hover:text-blue-600"
                    }`}
                  >
                    <ThumbsUp className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
                    <span className="text-sm font-medium">{postData.engagement.likes}</span>
                  </button>
                  <div className="flex items-center gap-2 text-gray-500">
                    <MessageSquare className="h-5 w-5" />
                    <span className="text-sm font-medium">{postData.engagement.comments}</span>
                  </div>
                  <button
                    className="flex items-center gap-2 text-gray-500 hover:text-purple-600 transition-colors"
                    onClick={() => handleShare()}
                  >
                    <Share2 className="h-5 w-5" />
                    <span className="text-sm font-medium">{postData.engagement.shares}</span>
                  </button>
                </div>
                <div className="flex items-center gap-1 text-gray-400">
                  <Eye className="h-4 w-4" />
                  <span className="text-sm">{postData.engagement.views} views</span>
                </div>
              </div>

              {/* Share Options Dialog */}
              {showShareOptions && (
                <div
                  className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                  onClick={() => setShowShareOptions(false)}
                >
                  <div className="bg-white rounded-lg p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold">Share this post</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => setShowShareOptions(false)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center border rounded-md overflow-hidden">
                        <div className="bg-gray-100 px-3 py-2 text-sm text-gray-500 truncate flex-1">
                          {`${window.location.origin}/groups/${groupId}/post/${postId}`}
                        </div>
                        <Button
                          variant="ghost"
                          className="h-full rounded-none px-3 hover:bg-gray-100"
                          onClick={() => handleShare("copy")}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <Button
                        variant="outline"
                        className="flex flex-col items-center gap-1 h-auto py-3"
                        onClick={() => handleShare("facebook")}
                      >
                        <Facebook className="h-6 w-6 text-blue-600" />
                        <span className="text-xs">Facebook</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="flex flex-col items-center gap-1 h-auto py-3"
                        onClick={() => handleShare("twitter")}
                      >
                        <Twitter className="h-6 w-6 text-blue-400" />
                        <span className="text-xs">Twitter</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="flex flex-col items-center gap-1 h-auto py-3"
                        onClick={() => handleShare("linkedin")}
                      >
                        <Linkedin className="h-6 w-6 text-blue-700" />
                        <span className="text-xs">LinkedIn</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="flex flex-col items-center gap-1 h-auto py-3"
                        onClick={() => handleShare("email")}
                      >
                        <Mail className="h-6 w-6 text-gray-600" />
                        <span className="text-xs">Email</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="flex flex-col items-center gap-1 h-auto py-3"
                        onClick={() => handleShare("whatsapp")}
                      >
                        <MessageCircle className="h-6 w-6 text-green-500" />
                        <span className="text-xs">WhatsApp</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="flex flex-col items-center gap-1 h-auto py-3"
                        onClick={() => handleShare("print")}
                      >
                        <Printer className="h-6 w-6 text-gray-600" />
                        <span className="text-xs">Print</span>
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Comments Section */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Comments ({postData.engagement.comments})</h2>
              </div>

              {/* Comments List */}
              <div className="space-y-6">
                {comments.map((comment) => (
                  <div key={comment.id} className="border-l-2 border-gray-100 pl-4">
                    {/* Comment Header */}
                    <div className="flex items-start gap-3 mb-3">
                      <Avatar className="h-10 w-10 flex-shrink-0">
                        <AvatarImage src={comment.author.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-gray-900 break-words">{comment.author.name}</h4>
                          {comment.author.verified && (
                            <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                              Verified
                            </Badge>
                          )}
                          {comment.isBestAnswer && (
                            <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                              <Award className="h-3 w-3 mr-1" fill="currentColor" />
                              Best Answer
                            </Badge>
                          )}
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-yellow-500" fill="currentColor" />
                            <span className="text-xs text-gray-500">{comment.author.reputation}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                          <span>@{comment.author.username}</span>
                          <span>•</span>
                          <span>{comment.timestamp}</span>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleReplyToComment(comment.id)}>
                            <Reply className="mr-2 h-4 w-4" />
                            Reply to Comment
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Share2 className="mr-2 h-4 w-4" />
                            Share Comment
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Flag className="mr-2 h-4 w-4" />
                            Report Comment
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    {/* Comment Content */}
                    <div
                      className="prose prose-gray max-w-none mb-3"
                      dangerouslySetInnerHTML={{ __html: comment.content }}
                    />

                    {/* Comment Actions */}
                    <div className="flex items-center gap-4 mb-4">
                      <button
                        onClick={() => handleCommentLike(comment.id)}
                        className={`flex items-center gap-1 text-sm transition-colors ${
                          likedComments.has(comment.id) ? "text-blue-600" : "text-gray-500 hover:text-blue-600"
                        }`}
                      >
                        <ThumbsUp className={`h-4 w-4 ${likedComments.has(comment.id) ? "fill-current" : ""}`} />
                        <span>{comment.likes}</span>
                      </button>
                      <button
                        onClick={() => handleReplyToComment(comment.id)}
                        className="flex items-center gap-1 text-sm text-gray-500 hover:text-green-600 transition-colors"
                      >
                        <Reply className="h-4 w-4" />
                        Reply
                      </button>
                      <div className="flex items-center gap-1 text-sm text-gray-400">
                        <Clock className="h-3 w-3" />
                        <span>{comment.timestamp}</span>
                      </div>
                    </div>

                    {/* Comment Reply Editor */}
                    {replyingToComment === comment.id && (
                      <Card className="mb-4 ml-6 border-2 border-blue-200">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-medium text-gray-900">Reply to {comment.author.name}</h4>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0"
                              onClick={() => setReplyingToComment(null)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>

                          {/* HTML Editor Toolbar */}
                          <div className="flex flex-wrap items-center gap-1 p-2 border border-gray-300 rounded-t-lg bg-gray-50">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => formatCommentReply("bold")}
                              className="h-7 w-7 p-0"
                            >
                              <Bold className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => formatCommentReply("italic")}
                              className="h-7 w-7 p-0"
                            >
                              <Italic className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => formatCommentReply("underline")}
                              className="h-7 w-7 p-0"
                            >
                              <Underline className="h-3.5 w-3.5" />
                            </Button>
                            <Separator orientation="vertical" className="h-5 mx-1" />
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => formatCommentReply("insertUnorderedList")}
                              className="h-7 w-7 p-0"
                            >
                              <List className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => formatCommentReply("formatBlock", "blockquote")}
                              className="h-7 w-7 p-0"
                            >
                              <Quote className="h-3.5 w-3.5" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={insertCommentReplyLink} className="h-7 w-7 p-0">
                              <Link className="h-3.5 w-3.5" />
                            </Button>
                          </div>

                          {/* HTML Editor */}
                          <div
                            ref={(el) => (commentEditorRefs.current[comment.id] = el)}
                            contentEditable
                            className="min-h-[100px] p-3 border border-gray-300 rounded-b-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            onInput={(e) => setCommentReplyContent(e.currentTarget.innerHTML)}
                            suppressContentEditableWarning={true}
                          >
                            <p>Type your reply here...</p>
                          </div>

                          <div className="flex justify-end gap-2 mt-3">
                            <Button
                              variant="outline"
                              onClick={() => {
                                setReplyingToComment(null)
                                setCommentReplyContent("")
                              }}
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={() => handleSubmitCommentReply(comment.id)}
                              className="bg-blue-600 hover:bg-blue-700"
                            >
                              <Send className="h-4 w-4 mr-2" />
                              Post Reply
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Comment Replies */}
                    {comment.replies.length > 0 && (
                      <div className="ml-6">
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className="mb-4">
                            <div className="flex items-start gap-3 mb-3">
                              <Avatar className="h-8 w-8 flex-shrink-0">
                                <AvatarImage src={reply.author.avatar || "/placeholder.svg"} />
                                <AvatarFallback>{reply.author.name[0]}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="font-medium text-gray-900 break-words">{reply.author.name}</h4>
                                  {reply.author.verified && (
                                    <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                                      Verified
                                    </Badge>
                                  )}
                                  <div className="flex items-center gap-1">
                                    <Star className="h-3 w-3 text-yellow-500" fill="currentColor" />
                                    <span className="text-xs text-gray-500">{reply.author.reputation}</span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                                  <span>@{reply.author.username}</span>
                                  <span>•</span>
                                  <span>{reply.timestamp}</span>
                                </div>
                              </div>
                            </div>
                            <div
                              className="prose prose-gray max-w-none mb-3"
                              dangerouslySetInnerHTML={{ __html: reply.content }}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  )
}
