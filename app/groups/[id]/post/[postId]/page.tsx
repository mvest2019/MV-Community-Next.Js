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
  MessageSquare,
  Share2,
  Bookmark,
  MoreHorizontal,
  Star,
  Bold,
  Italic,
  Underline,
  Link,
  List,
  Quote,
  Code,
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
  Check,
  Send,
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
  const answerEditorRef = useRef<HTMLDivElement>(null)

  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [showReplyEditor, setShowReplyEditor] = useState(false)
  const [replyContent, setReplyContent] = useState("")
  const [likedComments, setLikedComments] = useState<Set<number>>(new Set([2, 4]))
  const [replyingToComment, setReplyingToComment] = useState<number | null>(null)
  const [commentReplyContent, setCommentReplyContent] = useState("")
  const [showShareOptions, setShowShareOptions] = useState(false)
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false)
  const [showAnswerEditor, setShowAnswerEditor] = useState(false)
  const [answerContent, setAnswerContent] = useState("")
  const [replyingToAnswerComment, setReplyingToAnswerComment] = useState<{
    answerId: number
    commentId: number | null
  } | null>(null)
  const [answerCommentContent, setAnswerCommentContent] = useState("")

  // Question voting state
  const [questionVotes, setQuestionVotes] = useState({
    upvotes: 42,
    downvotes: 3,
    userVote: null as "up" | "down" | null,
  })

  // Comment voting state
  const [commentVotes, setCommentVotes] = useState<{
    [key: number]: { upvotes: number; downvotes: number; userVote: "up" | "down" | null }
  }>({
    1: { upvotes: 15, downvotes: 2, userVote: null },
    2: { upvotes: 12, downvotes: 0, userVote: null },
    3: { upvotes: 7, downvotes: 3, userVote: null },
    4: { upvotes: 18, downvotes: 1, userVote: null },
  })

  // Answer voting state
  const [answerVotes, setAnswerVotes] = useState<{
    [key: number]: { upvotes: number; downvotes: number; userVote: "up" | "down" | null }
  }>({
    1: { upvotes: 24, downvotes: 2, userVote: null },
    2: { upvotes: 18, downvotes: 1, userVote: null },
    3: { upvotes: 12, downvotes: 3, userVote: null },
  })

  // Answer comment voting state
  const [answerCommentVotes, setAnswerCommentVotes] = useState<{
    [key: string]: { upvotes: number; downvotes: number; userVote: "up" | "down" | null }
  }>({
    "1-1": { upvotes: 8, downvotes: 1, userVote: null },
    "1-2": { upvotes: 5, downvotes: 0, userVote: null },
    "2-1": { upvotes: 3, downvotes: 0, userVote: null },
  })

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

  // Sample question comments data
  const [questionComments, setQuestionComments] = useState([
    {
      id: 1,
      author: {
        name: "TexasLandman",
        username: "TexasLandman",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
        verified: false,
        reputation: 4.5,
      },
      content: "Have you checked if there were any changes to your division order recently?",
      timestamp: "1 day ago",
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
      content:
        "This is becoming more common in the Permian Basin lately. I'd suggest documenting all your attempts to contact them.",
      timestamp: "30 minutes ago",
    },
  ])

  // Sample answers data
  const [answers, setAnswers] = useState([
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
      isAccepted: true,
      comments: [
        {
          id: 1,
          author: {
            name: "Sarah Mitchell",
            username: "SarahM_Landowner",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
            verified: true,
          },
          content:
            "Thank you for the detailed response! I'll check my division order first. Do you know how to contact the Railroad Commission?",
          timestamp: "1 day ago",
        },
        {
          id: 2,
          author: {
            name: "GeologyExpertTX",
            username: "GeologyExpertTX",
            avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=40&h=40&fit=crop&crop=face",
            verified: true,
          },
          content:
            "You can file a complaint online at their website or call their Oil and Gas Division directly. They're usually very helpful with these issues.",
          timestamp: "1 day ago",
        },
      ],
    },
    {
      id: 2,
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
      isAccepted: false,
      comments: [
        {
          id: 1,
          author: {
            name: "Sarah Mitchell",
            username: "SarahM_Landowner",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
            verified: true,
          },
          content: "Do you have a template for this kind of letter that you could share?",
          timestamp: "10 hours ago",
        },
      ],
    },
    {
      id: 3,
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
      timestamp: "18 hours ago",
      isAccepted: false,
      comments: [],
    },
  ])

  const handleQuestionVote = (voteType: "up" | "down") => {
    const newVotes = { ...questionVotes }

    // If user already voted this way, remove the vote
    if (questionVotes.userVote === voteType) {
      newVotes.userVote = null
      if (voteType === "up") {
        newVotes.upvotes = Math.max(0, questionVotes.upvotes - 1)
      } else {
        newVotes.downvotes = Math.max(0, questionVotes.downvotes - 1)
      }
    }
    // If user voted the opposite way, switch the vote
    else if (questionVotes.userVote !== null) {
      newVotes.userVote = voteType
      if (voteType === "up") {
        newVotes.upvotes = questionVotes.upvotes + 1
        newVotes.downvotes = Math.max(0, questionVotes.downvotes - 1)
      } else {
        newVotes.downvotes = questionVotes.downvotes + 1
        newVotes.upvotes = Math.max(0, questionVotes.upvotes - 1)
      }
    }
    // If user hasn't voted yet, add the vote
    else {
      newVotes.userVote = voteType
      if (voteType === "up") {
        newVotes.upvotes = questionVotes.upvotes + 1
      } else {
        newVotes.downvotes = questionVotes.downvotes + 1
      }
    }

    setQuestionVotes(newVotes)
  }

  const handleCommentVote = (commentId: number, voteType: "up" | "down") => {
    const currentVotes = commentVotes[commentId] || { upvotes: 0, downvotes: 0, userVote: null }
    const newVotes = { ...currentVotes }

    // If user already voted this way, remove the vote
    if (currentVotes.userVote === voteType) {
      newVotes.userVote = null
      if (voteType === "up") {
        newVotes.upvotes = Math.max(0, currentVotes.upvotes - 1)
      } else {
        newVotes.downvotes = Math.max(0, currentVotes.downvotes - 1)
      }
    }
    // If user voted the opposite way, switch the vote
    else if (currentVotes.userVote !== null) {
      newVotes.userVote = voteType
      if (voteType === "up") {
        newVotes.upvotes = currentVotes.upvotes + 1
        newVotes.downvotes = Math.max(0, currentVotes.downvotes - 1)
      } else {
        newVotes.downvotes = currentVotes.downvotes + 1
        newVotes.upvotes = Math.max(0, currentVotes.upvotes - 1)
      }
    }
    // If user hasn't voted yet, add the vote
    else {
      newVotes.userVote = voteType
      if (voteType === "up") {
        newVotes.upvotes = currentVotes.upvotes + 1
      } else {
        newVotes.downvotes = currentVotes.downvotes + 1
      }
    }

    setCommentVotes({
      ...commentVotes,
      [commentId]: newVotes,
    })
  }

  const handleAnswerVote = (answerId: number, voteType: "up" | "down") => {
    const currentVotes = answerVotes[answerId] || { upvotes: 0, downvotes: 0, userVote: null }
    const newVotes = { ...currentVotes }

    // If user already voted this way, remove the vote
    if (currentVotes.userVote === voteType) {
      newVotes.userVote = null
      if (voteType === "up") {
        newVotes.upvotes = Math.max(0, currentVotes.upvotes - 1)
      } else {
        newVotes.downvotes = Math.max(0, currentVotes.downvotes - 1)
      }
    }
    // If user voted the opposite way, switch the vote
    else if (currentVotes.userVote !== null) {
      newVotes.userVote = voteType
      if (voteType === "up") {
        newVotes.upvotes = currentVotes.upvotes + 1
        newVotes.downvotes = Math.max(0, currentVotes.downvotes - 1)
      } else {
        newVotes.downvotes = currentVotes.downvotes + 1
        newVotes.upvotes = Math.max(0, currentVotes.upvotes - 1)
      }
    }
    // If user hasn't voted yet, add the vote
    else {
      newVotes.userVote = voteType
      if (voteType === "up") {
        newVotes.upvotes = currentVotes.upvotes + 1
      } else {
        newVotes.downvotes = currentVotes.downvotes + 1
      }
    }

    setAnswerVotes({
      ...answerVotes,
      [answerId]: newVotes,
    })
  }

  const handleAnswerCommentVote = (answerId: number, commentId: number, voteType: "up" | "down") => {
    const key = `${answerId}-${commentId}`
    const currentVotes = answerCommentVotes[key] || { upvotes: 0, downvotes: 0, userVote: null }
    const newVotes = { ...currentVotes }

    // If user already voted this way, remove the vote
    if (currentVotes.userVote === voteType) {
      newVotes.userVote = null
      if (voteType === "up") {
        newVotes.upvotes = Math.max(0, currentVotes.upvotes - 1)
      } else {
        newVotes.downvotes = Math.max(0, currentVotes.downvotes - 1)
      }
    }
    // If user voted the opposite way, switch the vote
    else if (currentVotes.userVote !== null) {
      newVotes.userVote = voteType
      if (voteType === "up") {
        newVotes.upvotes = currentVotes.upvotes + 1
        newVotes.downvotes = Math.max(0, currentVotes.downvotes - 1)
      } else {
        newVotes.downvotes = currentVotes.downvotes + 1
        newVotes.upvotes = Math.max(0, currentVotes.upvotes - 1)
      }
    }
    // If user hasn't voted yet, add the vote
    else {
      newVotes.userVote = voteType
      if (voteType === "up") {
        newVotes.upvotes = currentVotes.upvotes + 1
      } else {
        newVotes.downvotes = currentVotes.downvotes + 1
      }
    }

    setAnswerCommentVotes({
      ...answerCommentVotes,
      [key]: newVotes,
    })
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
    toast({
      title: isBookmarked ? "Bookmark removed" : "Bookmark added",
      description: isBookmarked ? "Post has been removed from your bookmarks" : "Post has been added to your bookmarks",
    })
  }

  const handleAddQuestionComment = () => {
    if (!replyContent.trim()) return

    const newComment = {
      id: questionComments.length + 1,
      author: {
        name: "John Doe",
        username: "JohnDoe_User",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
        verified: false,
        reputation: 4.2,
      },
      content: replyContent,
      timestamp: "Just now",
    }

    setQuestionComments([...questionComments, newComment])
    setReplyContent("")
    setShowReplyEditor(false)

    // Add initial vote state for the new comment
    setCommentVotes({
      ...commentVotes,
      [newComment.id]: { upvotes: 0, downvotes: 0, userVote: null },
    })

    // Show toast notification
    toast({
      title: "Comment posted",
      description: "Your comment has been posted successfully.",
    })
  }

  const handleAddAnswer = () => {
    if (!answerContent.trim()) return

    const newAnswer = {
      id: answers.length + 1,
      author: {
        name: "John Doe",
        username: "JohnDoe_User",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
        verified: false,
        reputation: 4.2,
      },
      content: answerContent,
      timestamp: "Just now",
      isAccepted: false,
      comments: [],
    }

    setAnswers([...answers, newAnswer])
    setAnswerContent("")
    setShowAnswerEditor(false)

    // Add initial vote state for the new answer
    setAnswerVotes({
      ...answerVotes,
      [newAnswer.id]: { upvotes: 0, downvotes: 0, userVote: null },
    })

    // Show toast notification
    toast({
      title: "Answer posted",
      description: "Your answer has been posted successfully.",
    })
  }

  const handleAddAnswerComment = (answerId: number) => {
    if (!answerCommentContent.trim()) return

    const newComment = {
      id: Date.now(),
      author: {
        name: "John Doe",
        username: "JohnDoe_User",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
        verified: false,
      },
      content: answerCommentContent,
      timestamp: "Just now",
    }

    const updatedAnswers = answers.map((answer) => {
      if (answer.id === answerId) {
        return {
          ...answer,
          comments: [...(answer.comments || []), newComment],
        }
      }
      return answer
    })

    setAnswers(updatedAnswers)
    setAnswerCommentContent("")
    setReplyingToAnswerComment(null)

    // Add initial vote state for the new comment
    setAnswerCommentVotes({
      ...answerCommentVotes,
      [`${answerId}-${newComment.id}`]: { upvotes: 0, downvotes: 0, userVote: null },
    })

    // Show toast notification
    toast({
      title: "Comment posted",
      description: "Your comment has been posted successfully.",
    })
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

  const insertLink = () => {
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

  const handleAcceptAnswer = (answerId: number) => {
    const updatedAnswers = answers.map((answer) => ({
      ...answer,
      isAccepted: answer.id === answerId,
    }))
    setAnswers(updatedAnswers)

    toast({
      title: "Answer accepted",
      description: "You have marked this answer as accepted.",
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
          {/* Single Card Layout */}
          <Card className="mb-6">
            <CardContent className="p-6">
              {/* Question Section */}
              <div className="mb-6">
                {/* Question Title */}
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 break-words">{postData.title}</h1>

                {/* Question Meta */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3 flex-1">
                    <Avatar className="h-10 w-10 flex-shrink-0">
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
                        <span>{postData.engagement.views} views</span>
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

                {/* Question Content */}
                <div className="flex">
                  {/* Voting Column */}
                  <div className="flex flex-col items-center mr-4">
                    <button
                      onClick={() => handleQuestionVote("up")}
                      className={`flex items-center justify-center h-10 w-10 rounded-md transition-colors ${
                        questionVotes.userVote === "up"
                          ? "bg-green-100 text-green-700"
                          : "text-gray-500 hover:bg-gray-100"
                      }`}
                      aria-label="Upvote question"
                    >
                      <ChevronUp className="h-6 w-6" />
                    </button>
                    <span className="text-lg font-bold my-1">{questionVotes.upvotes - questionVotes.downvotes}</span>
                    <button
                      onClick={() => handleQuestionVote("down")}
                      className={`flex items-center justify-center h-10 w-10 rounded-md transition-colors ${
                        questionVotes.userVote === "down"
                          ? "bg-red-100 text-red-700"
                          : "text-gray-500 hover:bg-gray-100"
                      }`}
                      aria-label="Downvote question"
                    >
                      <ChevronDown className="h-6 w-6" />
                    </button>
                  </div>

                  {/* Question Content */}
                  <div className="flex-1">
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

                    {/* Question Actions */}
                    <div className="flex items-center gap-4">
                      <Button
                        onClick={() => handleShare()}
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2 text-gray-600"
                      >
                        <Share2 className="h-4 w-4" />
                        Share
                      </Button>
                      <Button
                        onClick={() => setShowReplyEditor(!showReplyEditor)}
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2 text-gray-600"
                      >
                        <MessageSquare className="h-4 w-4" />
                        Add Comment
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Question Comments */}
                {(questionComments.length > 0 || showReplyEditor) && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    {/* Add Comment Editor */}
                    {showReplyEditor && (
                      <div className="mb-4">
                        <div className="flex items-start gap-3">
                          <Avatar className="h-8 w-8 flex-shrink-0">
                            <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" />
                            <AvatarFallback>JD</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div
                              ref={editorRef}
                              contentEditable
                              className="min-h-[80px] p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              onInput={(e) => setReplyContent(e.currentTarget.innerHTML)}
                              suppressContentEditableWarning={true}
                              placeholder="Add a comment..."
                            ></div>
                            <div className="flex justify-end gap-2 mt-3">
                              <Button
                                variant="outline"
                                onClick={() => {
                                  setShowReplyEditor(false)
                                  setReplyContent("")
                                  if (editorRef.current) {
                                    editorRef.current.innerHTML = ""
                                  }
                                }}
                              >
                                Cancel
                              </Button>
                              <Button onClick={handleAddQuestionComment} className="bg-blue-600 hover:bg-blue-700">
                                Add Comment
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Comments List */}
                    {questionComments.length > 0 && (
                      <div className="space-y-3">
                        <h3 className="text-sm font-medium text-gray-700 mb-2">Comments</h3>
                        {questionComments.map((comment) => (
                          <div key={comment.id} className="flex items-start gap-2 text-sm">
                            <div className="flex flex-col items-center mr-1">
                              <button
                                onClick={() => handleCommentVote(comment.id, "up")}
                                className={`flex items-center justify-center h-6 w-6 rounded-md transition-colors ${
                                  commentVotes[comment.id]?.userVote === "up"
                                    ? "bg-green-100 text-green-700"
                                    : "text-gray-400 hover:bg-gray-100"
                                }`}
                                aria-label="Upvote comment"
                              >
                                <ChevronUp className="h-4 w-4" />
                              </button>
                              <span className="text-xs font-medium text-gray-600 my-0.5">
                                {(commentVotes[comment.id]?.upvotes || 0) - (commentVotes[comment.id]?.downvotes || 0)}
                              </span>
                              <button
                                onClick={() => handleCommentVote(comment.id, "down")}
                                className={`flex items-center justify-center h-6 w-6 rounded-md transition-colors ${
                                  commentVotes[comment.id]?.userVote === "down"
                                    ? "bg-red-100 text-red-700"
                                    : "text-gray-400 hover:bg-gray-100"
                                }`}
                                aria-label="Downvote comment"
                              >
                                <ChevronDown className="h-4 w-4" />
                              </button>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <Avatar className="h-5 w-5 flex-shrink-0">
                                  <AvatarImage src={comment.author.avatar || "/placeholder.svg"} />
                                  <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
                                </Avatar>
                                <span className="font-medium text-gray-700">{comment.author.name}</span>
                                <span className="text-gray-500">{comment.timestamp}</span>
                              </div>
                              <p className="text-gray-700">{comment.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Separator between Question and Answers */}
              <Separator className="my-6" />

              {/* Answers Section */}
              <div>
                {/* Answer Count */}
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">{answers.length} Answers</h2>
                  <Button
                    onClick={() => setShowAnswerEditor(!showAnswerEditor)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Post Your Answer
                  </Button>
                </div>

                {/* Answer Editor */}
                {showAnswerEditor && (
                  <div className="mb-6 border border-blue-200 rounded-lg p-4 bg-blue-50">
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Your Answer</h3>
                    <div className="mb-4">
                      {/* HTML Editor Toolbar */}
                      <div className="flex flex-wrap items-center gap-1 p-2 border border-gray-300 rounded-t-lg bg-gray-50">
                        <Button variant="ghost" size="sm" onClick={() => formatContent("bold")} className="h-8 w-8 p-0">
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
                        ref={answerEditorRef}
                        contentEditable
                        className="min-h-[200px] p-3 border border-gray-300 rounded-b-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                        style={{ borderTop: "none" }}
                        onInput={(e) => setAnswerContent(e.currentTarget.innerHTML)}
                        suppressContentEditableWarning={true}
                      >
                        <p>Type your answer here...</p>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setShowAnswerEditor(false)
                          setAnswerContent("")
                          if (answerEditorRef.current) {
                            answerEditorRef.current.innerHTML = "<p>Type your answer here...</p>"
                          }
                        }}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleAddAnswer} className="bg-blue-600 hover:bg-blue-700">
                        <Send className="h-4 w-4 mr-2" />
                        Post Your Answer
                      </Button>
                    </div>
                  </div>
                )}

                {/* Answers List */}
                <div className="space-y-6">
                  {/* Sort answers to show accepted answer first */}
                  {answers
                    .sort((a, b) => {
                      if (a.isAccepted && !b.isAccepted) return -1
                      if (!a.isAccepted && b.isAccepted) return 1
                      return 0
                    })
                    .map((answer) => (
                      <div
                        key={answer.id}
                        className={`p-4 border rounded-lg ${
                          answer.isAccepted ? "border-green-500 bg-green-50" : "border-gray-200"
                        }`}
                      >
                        <div className="flex">
                          {/* Voting Column */}
                          <div className="flex flex-col items-center mr-4">
                            <button
                              onClick={() => handleAnswerVote(answer.id, "up")}
                              className={`flex items-center justify-center h-10 w-10 rounded-md transition-colors ${
                                answerVotes[answer.id]?.userVote === "up"
                                  ? "bg-green-100 text-green-700"
                                  : "text-gray-500 hover:bg-gray-100"
                              }`}
                              aria-label="Upvote answer"
                            >
                              <ChevronUp className="h-6 w-6" />
                            </button>
                            <span className="text-lg font-bold my-1">
                              {(answerVotes[answer.id]?.upvotes || 0) - (answerVotes[answer.id]?.downvotes || 0)}
                            </span>
                            <button
                              onClick={() => handleAnswerVote(answer.id, "down")}
                              className={`flex items-center justify-center h-10 w-10 rounded-md transition-colors ${
                                answerVotes[answer.id]?.userVote === "down"
                                  ? "bg-red-100 text-red-700"
                                  : "text-gray-500 hover:bg-gray-100"
                              }`}
                              aria-label="Downvote answer"
                            >
                              <ChevronDown className="h-6 w-6" />
                            </button>
                            {answer.isAccepted && (
                              <div
                                className="flex items-center justify-center h-10 w-10 rounded-md mt-2 bg-green-100 text-green-700"
                                title="Accepted Answer"
                              >
                                <Check className="h-6 w-6" />
                              </div>
                            )}
                            {!answer.isAccepted && postData.author.username === "SarahM_Landowner" && (
                              <button
                                onClick={() => handleAcceptAnswer(answer.id)}
                                className="flex items-center justify-center h-10 w-10 rounded-md mt-2 text-gray-400 hover:text-green-600 hover:bg-green-50"
                                title="Accept this answer"
                              >
                                <Check className="h-6 w-6" />
                              </button>
                            )}
                          </div>

                          {/* Answer Content */}
                          <div className="flex-1">
                            {/* Answer Content */}
                            <div
                              className="prose prose-gray max-w-none mb-4"
                              dangerouslySetInnerHTML={{ __html: answer.content }}
                            />

                            {/* Answer Author */}
                            <div className="flex items-center justify-between mt-4 mb-4">
                              <div className="text-sm text-gray-500">answered {answer.timestamp}</div>
                              <div className="flex items-center gap-3 bg-blue-50 p-2 rounded-md">
                                <Avatar className="h-8 w-8 flex-shrink-0">
                                  <AvatarImage src={answer.author.avatar || "/placeholder.svg"} />
                                  <AvatarFallback>{answer.author.name[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium text-gray-900">{answer.author.name}</div>
                                  <div className="flex items-center gap-1 text-xs text-gray-500">
                                    <Star className="h-3 w-3 text-yellow-500" fill="currentColor" />
                                    <span>{answer.author.reputation}</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Answer Actions */}
                            <div className="flex items-center gap-4">
                              <Button
                                onClick={() => setReplyingToAnswerComment({ answerId: answer.id, commentId: null })}
                                variant="outline"
                                size="sm"
                                className="flex items-center gap-2 text-gray-600"
                              >
                                <MessageSquare className="h-4 w-4" />
                                Add Comment
                              </Button>
                              <Button
                                onClick={() => handleShare()}
                                variant="outline"
                                size="sm"
                                className="flex items-center gap-2 text-gray-600"
                              >
                                <Share2 className="h-4 w-4" />
                                Share
                              </Button>
                            </div>

                            {/* Add Comment to Answer */}
                            {replyingToAnswerComment?.answerId === answer.id &&
                              replyingToAnswerComment.commentId === null && (
                                <div className="mt-4 border-t border-gray-200 pt-4">
                                  <div className="flex items-start gap-3">
                                    <Avatar className="h-8 w-8 flex-shrink-0">
                                      <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" />
                                      <AvatarFallback>JD</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                      <div
                                        contentEditable
                                        className="min-h-[80px] p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        onInput={(e) => setAnswerCommentContent(e.currentTarget.innerHTML)}
                                        suppressContentEditableWarning={true}
                                        placeholder="Add a comment..."
                                      ></div>
                                      <div className="flex justify-end gap-2 mt-3">
                                        <Button
                                          variant="outline"
                                          onClick={() => {
                                            setReplyingToAnswerComment(null)
                                            setAnswerCommentContent("")
                                          }}
                                        >
                                          Cancel
                                        </Button>
                                        <Button
                                          onClick={() => handleAddAnswerComment(answer.id)}
                                          className="bg-blue-600 hover:bg-blue-700"
                                        >
                                          Add Comment
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}

                            {/* Answer Comments */}
                            {answer.comments && answer.comments.length > 0 && (
                              <div className="mt-4 border-t border-gray-200 pt-4">
                                <h3 className="text-sm font-medium text-gray-700 mb-2">Comments</h3>
                                <div className="space-y-3">
                                  {answer.comments.map((comment) => (
                                    <div key={comment.id} className="flex items-start gap-2 text-sm">
                                      <div className="flex flex-col items-center mr-1">
                                        <button
                                          onClick={() => handleAnswerCommentVote(answer.id, comment.id, "up")}
                                          className={`flex items-center justify-center h-6 w-6 rounded-md transition-colors ${
                                            answerCommentVotes[`${answer.id}-${comment.id}`]?.userVote === "up"
                                              ? "bg-green-100 text-green-700"
                                              : "text-gray-400 hover:bg-gray-100"
                                          }`}
                                          aria-label="Upvote comment"
                                        >
                                          <ChevronUp className="h-4 w-4" />
                                        </button>
                                        <span className="text-xs font-medium text-gray-600 my-0.5">
                                          {(answerCommentVotes[`${answer.id}-${comment.id}`]?.upvotes || 0) -
                                            (answerCommentVotes[`${answer.id}-${comment.id}`]?.downvotes || 0)}
                                        </span>
                                        <button
                                          onClick={() => handleAnswerCommentVote(answer.id, comment.id, "down")}
                                          className={`flex items-center justify-center h-6 w-6 rounded-md transition-colors ${
                                            answerCommentVotes[`${answer.id}-${comment.id}`]?.userVote === "down"
                                              ? "bg-red-100 text-red-700"
                                              : "text-gray-400 hover:bg-gray-100"
                                          }`}
                                          aria-label="Downvote comment"
                                        >
                                          <ChevronDown className="h-4 w-4" />
                                        </button>
                                      </div>
                                      <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                          <Avatar className="h-5 w-5 flex-shrink-0">
                                            <AvatarImage src={comment.author.avatar || "/placeholder.svg"} />
                                            <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
                                          </Avatar>
                                          <span className="font-medium text-gray-700">{comment.author.name}</span>
                                          <span className="text-gray-500">{comment.timestamp}</span>
                                        </div>
                                        <p className="text-gray-700">{comment.content}</p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Share Options Dialog */}
          {showShareOptions && (
            <div
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
              onClick={() => setShowShareOptions(false)}
            >
              <div className="bg-white rounded-lg p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Share this post</h3>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setShowShareOptions(false)}>
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
        </div>
      </div>
    </AppLayout>
  )
}
