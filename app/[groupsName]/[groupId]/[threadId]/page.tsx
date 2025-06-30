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
import { useState, useRef, useEffect } from "react"
import { useParams } from "next/navigation"
import { AppLayout } from "@/components/app-layout"
import { useToast } from "@/components/ui/use-toast"
import { getThreadDetails } from "@/services/service"
import { GroupThreadDetailsInterface } from "@/types/community-types"
import { addThreadComment, voteThreadPost } from "@/services/threadId-service"
import { addThreadAnswer } from "@/services/threadId-service";
import { voteThreadComment } from "@/services/threadId-service";
import { toast } from "sonner"
import { LoginPopup } from "@/components/login-popup"
import { getCurrentUser } from "@/hooks/utils/auth"
import { useAuth } from "@/hooks/use-auth"

export default function PostDetailPage() {
  // Get the current user from localStorage
const userStr = typeof window !== "undefined" ? localStorage.getItem("user") : null;
const user = userStr ? JSON.parse(userStr) : null;

// Now you can access:
const uId = user?.member_id;
const userName = user ? `${user.f_name} ${user.l_name}` : "";


  // Get the parameters from the URL
  const params = useParams()
 
  const groupsName = params.groupsName
  const groupId = params.groupId
  const threadId = params.threadId;
  const editorRef = useRef<HTMLDivElement>(null)
  const commentEditorRefs = useRef<{ [key: number]: HTMLDivElement | null }>({})
  const answerEditorRef = useRef<HTMLDivElement>(null)

  const [isBookmarked, setIsBookmarked] = useState(false)
  const [showReplyEditor, setShowReplyEditor] = useState(false)
  const [replyContent, setReplyContent] = useState("")
//  const [isLoggedIn, setIsLoggedIn] = useState(false); // Set this based on your auth logic
const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false)
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false)
  const [showAnswerEditor, setShowAnswerEditor] = useState(false)
  const [answerContent, setAnswerContent] = useState("")
   const [showUserProfile, setShowUserProfile] = useState(false)
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [followingUsers, setFollowingUsers] = useState<Set<string>>(new Set(["GeologyExpertTX", "RoyaltyExpert"]))
  const [replyingToAnswerComment, setReplyingToAnswerComment] = useState<{
    answerId: number
    commentId: number | null
  } | null>(null)
  const [answerCommentContent, setAnswerCommentContent] = useState("")
   const [threadDetail, setThreadDetail] = useState<GroupThreadDetailsInterface | null>(null);

  // Question voting state
  type type = "upvote" | "downvote";
 const [questionVotes, setQuestionVotes] = useState<{
  upvotes: number;
  downvotes: number;
  userVote: type | null;
}>({
  upvotes: 42,
  downvotes: 3,
  userVote: null,
});
// // Comment voting state
const [commentVotes, setCommentVotes] = useState<{
  [key: number]: { upvotes: number; downvotes: number; userVote: "upvote" | "downvote" | null }
}>({});

// // Answer voting state
// const [answerCommentVotes, setAnswerCommentVotes] = useState<{
//   [key: string]: { upvotes: number; downvotes: number; userVote: "upvote" | "downvote" | null }
// }>({});
  
  // Sample user profiles data
  const userProfiles = {
    SarahM_Landowner: {
      username: "SarahM_Landowner",
      fullName: "Sarah Mitchell",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face",
      role: "Mineral Rights Owner",
      tagline: "Advocating for fair royalty payments in Texas",
      socialLinks: {
        linkedin: "https://linkedin.com/in/sarahmitchell",
        twitter: "https://twitter.com/sarahm_landowner",
      },
      followers: 1247,
      following: 89,
      totalPosts: 127,
      verified: true,
      joinedDate: "March 2023",
    },
    GeologyExpertTX: {
      username: "GeologyExpertTX",
      fullName: "Dr. Michael Rodriguez",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop&crop=face",
      role: "Petroleum Geologist",
      tagline: "Helping landowners understand their mineral rights",
      socialLinks: {
        linkedin: "https://linkedin.com/in/michaelrodriguez",
        twitter: "https://twitter.com/geologyexperttx",
      },
      followers: 3421,
      following: 156,
      totalPosts: 892,
      verified: true,
      joinedDate: "January 2022",
    },
    LegalEagle: {
      username: "LegalEagle",
      fullName: "Jennifer Thompson, Esq.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
      role: "Oil & Gas Attorney",
      tagline: "Protecting landowner rights for over 15 years",
      socialLinks: {
        linkedin: "https://linkedin.com/in/jenniferthompson",
        twitter: "https://twitter.com/legaleagle_tx",
      },
      followers: 2156,
      following: 234,
      totalPosts: 445,
      verified: true,
      joinedDate: "June 2021",
    },
    RoyaltyExpert: {
      username: "RoyaltyExpert",
      fullName: "David Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
      role: "Royalty Consultant",
      tagline: "Maximizing royalty returns through expert analysis",
      socialLinks: {
        linkedin: "https://linkedin.com/in/davidchen",
        twitter: "https://twitter.com/royaltyexpert",
      },
      followers: 1876,
      following: 312,
      totalPosts: 623,
      verified: true,
      joinedDate: "September 2022",
    },
    TexasLandman: {
      username: "TexasLandman",
      fullName: "Robert Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face",
      role: "Professional Landman",
      tagline: "Connecting landowners with opportunities",
      socialLinks: {
        linkedin: "https://linkedin.com/in/robertjohnson",
      },
      followers: 892,
      following: 445,
      totalPosts: 234,
      verified: false,
      joinedDate: "November 2023",
    },
  }
  const { isLoggedIn } = useAuth();
const handleQuestionVote = async (postId?: number, type?: "upvote" | "downvote") => {
 
   if (!isLoggedIn) {
    setShowLoginPopup(true);
    return;
  }
  if (!threadDetail) {
    return;
  }
  if (!postId || !type) {
    return;
  }
  const threadIdVal = threadDetail.threadId;
  if (!threadIdVal) {
    return;
  }
  try {
    await voteThreadPost({
      threadId: threadIdVal,
      postId,
      type,
      uId,
      uname: userName,
    });
     toast.success(
      type === "upvote"
        ? "Upvote registered successfully!"
        : "Downvote registered successfully!"
    );
    const updatedDetail = await getThreadDetails(String(threadIdVal));
    if (!updatedDetail) {
      console.error("API returned undefined for updatedDetail");
      return;
    }
    setThreadDetail(updatedDetail);
  } catch (error) {
    console.error("Error in handleQuestionVote:", error);
    toast.error("Failed to register your vote. Please try again.");
  }
};

const handleCommentVote = (postId:number,commentId: number, type: "upvote" | "downvote") => {
    if (!isLoggedIn) {
      setShowLoginPopup(true);
      return;
    }
    setCommentVotes(prev => {
      const current = prev[commentId] || { upvotes: 0, downvotes: 0, userVote: null };
      let { upvotes, downvotes, userVote } = current;
      if (userVote === type) {
        userVote = null;
        if (type === "upvote") upvotes = Math.max(0, upvotes - 1);
        else downvotes = Math.max(0, downvotes - 1);
      } else if (userVote !== null) {
        userVote = type;
        if (type === "upvote") {
          upvotes += 1;
          downvotes = Math.max(0, downvotes - 1);
        } else {
          downvotes += 1;
          upvotes = Math.max(0, upvotes - 1);
        }
      } else {
        userVote = type;
        if (type === "upvote") upvotes += 1;
        else downvotes += 1;
      }
      return { ...prev, [commentId]: { upvotes, downvotes, userVote } };
    });

    // Call API (no await for instant UI)
    voteThreadComment({
      threadId: String(threadDetail?.threadId ?? ""),
      postId,
      commentId,
      userId: uId,
      username: userName,
      type,
    })
    .then(() => {
      toast.success("Your vote has been registered!");
    })
    .catch(() => toast("Failed to register your vote. Please try again."));
  };

console.log(isLoggedIn, "isLoggedIn in PostDetailPage");
  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
    toast.success( "Post has been removed from your bookmarks")
  }



 const handleAddAnswer = async () => {
  if (!isLoggedIn) {
    setShowLoginPopup(true);
    return;
  }
  if (!answerContent.trim() || !threadDetail) return;

  try {
    // Call your API
    const response = await addThreadAnswer({
      postType: "reply",
      uId, // Replace with actual user id
      uname: userName, // Replace with actual username
      title: `Re: ${threadDetail.posts[0]?.title || "Thread"}`,
      content: answerContent,
      grpId: threadDetail.grpId,
      grpName: threadDetail.grpName,
      threadId: threadDetail.threadId,
    });

    // Option 1: If API returns the new answer object:
    // setAnswers((prev) => [
    //   ...prev,
    //   {
    //     ...response, // Make sure response matches your answer object shape
    //     isAccepted: false,
    //     comments: [],
    //   },
    // ]);

  // Add the new reply to the UI immediately
    setThreadDetail((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        posts: [
          ...prev.posts,
          {
            ...response, // Make sure response matches your answer object shape
            postType: "reply",
            comments: [],
            upvoteCnt: 0,
            downvoteCnt: 0,
            createdAt: new Date().toISOString(),
            uname: userName,
            uId: uId,
          },
        ],
      };
    });
    setAnswerContent("");
    setShowAnswerEditor(false);

    toast.success("Your answer has been posted successfully.");
  } catch (error) {
    console.error("Error posting answer:", error);
    toast.error("Failed to post answer. Please try again.");
  }
};

//  const handleAddAnswerComment = (answerId: number) => {
//   if (!answerCommentContent.trim()) return;

//   const newComment = {
//     id: Date.now(),
//     author: {
//       name: "John Doe",
//       username: "JohnDoe_User",
//       avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
//       verified: false,
//     },
//     content: answerCommentContent,
//     timestamp: "Just now",
//   };

//   const updatedAnswers = answers.map((answer) => {
//     if (answer.id === answerId) {
//       return {
//         ...answer,
//         comments: [...(answer.comments || []), newComment],
//       };
//     }
//     return answer;
//   });

//   setAnswers(updatedAnswers);
//   setAnswerCommentContent("");
//   setReplyingToAnswerComment(null);

//   // Add initial vote state for the new comment
//   setAnswerCommentVotes({
//     ...answerCommentVotes,
//     [`${answerId}-${newComment.id}`]: { upvotes: 0, downvotes: 0, userVote: null },
//   });

//   toast.success("Your comment has been posted successfully.");
// };

  const handleShare = (platform?: string) => {
  
    const shareUrl = `${window.location.origin}/${groupsName}/${groupId}/${threadId}`

    if (platform === "copy") {
      navigator.clipboard.writeText(shareUrl)
      toast.success("Link has been copied to clipboard!")
    } else if (platform === "twitter") {
      window.open(
        `https://twitter.com/intent/tweet?text=&url=${encodeURIComponent(shareUrl)}`,
        "_blank",
      )
    } else if (platform === "facebook") {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, "_blank")
    } else if (platform === "linkedin") {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, "_blank")
    } 
    // else if (platform === "email") {
    //   window.open(`mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(shareUrl)}`, "_blank")
    // } else if (platform === "whatsapp") {
    //   window.open(`https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`, "_blank")
    // } 
    else if (platform === "print") {
      window.print()
    } else {
      setShowShareOptions(true)
      return
    }

    // Update share count
    // setPostData({
    //   ...postData,
    //   engagement: {
    //     ...postData.engagement,
    //     shares: postData.engagement.shares + 1,
    //   },
    // })
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
    toast.error( "You'll no longer receive notifications for this post.")
  }
// for Accept answer
  // const handleAcceptAnswer = (answerId: number) => {
  //   const updatedAnswers = answers.map((answer) => ({
  //     ...answer,
  //     isAccepted: answer.id === answerId,
  //   }))
  //   setAnswers(updatedAnswers)

  //   toast.success("You have marked this answer as accepted.")
  // }
   const handleUserClick = (username: string) => {
    const user = userProfiles[username as keyof typeof userProfiles]
    if (user) {
      setSelectedUser(user)
      setShowUserProfile(true)
    }
  }
  const handleFollowToggle = (username: string) => {
    const newFollowingUsers = new Set(followingUsers)
    if (followingUsers.has(username)) {
      newFollowingUsers.delete(username)
      toast(`You are no longer following ${userProfiles[username as keyof typeof userProfiles]?.fullName}`,
      )
    } else {
      newFollowingUsers.add(username)
      toast(`Follow request sent to ${userProfiles[username as keyof typeof userProfiles]?.fullName}`)
    }
    setFollowingUsers(newFollowingUsers)
  }
const handleAddComment = async ({
  postId,
  content,
  isQuestion,
}: {
  postId: number;
  content: string;
  isQuestion: boolean;
}) => {
  if (!isLoggedIn) {
    setShowLoginPopup(true);
    return;
  }
  if (!content.trim() || !threadDetail) return;

  try {
    // Replace with actual user info in production
    const userId = uId;
    const username = userName;
    const threadIdVal = threadDetail.threadId;

    // Call API
    const newComment = await addThreadComment({
      threadId: threadIdVal,
      postId,
      userId,
      username,
      content,
    });

    toast.success("Your comment has been posted successfully.");

    // Update local state so comment appears immediately
    setThreadDetail((prev) => {
      if (!prev) return prev;
      const updatedPosts = prev.posts.map((post) => {
        if (post.postId === postId) {
          return {
            ...post,
            comments: [
              ...(post.comments || []),
              {
                // Use returned comment or fallback to local
                commentId: newComment?.commentId || Date.now(),
                uId: userId,
                uname: username,
                content,
                upvoteCnt: 0,
                downvoteCnt: 0,
                createdAt: new Date().toISOString(),
                upvotes: [],
                downvotes: [],
              },
            ],
          };
        }
        return post;
      });
      return { ...prev, posts: updatedPosts };
    });

    if (isQuestion) {
      setReplyContent("");
      setShowReplyEditor(false);
    } else {
      setAnswerCommentContent("");
      setReplyingToAnswerComment(null);
    }
  } catch (error) {
    toast.error("Failed to post comment. Please try again.");
  }
};
// useEffect(() => {
//   async function fetchThread() {
//     try {
//       if (threadId) {
//         const detail = await getThreadDetails(String(threadId));
//         setThreadDetail(detail);
//       }
//     } catch (error) {
//       console.error("Error fetching thread details:", error);
//     }
//   }
//   if (threadId) fetchThread();
// }, [threadId]);
const fetchedRef = useRef(false);
 useEffect(() => {
    async function fetchThread() {
      try {
        if (threadId) {
          const detail = await getThreadDetails(String(threadId));
          setThreadDetail(detail);
        }
      } catch (error) {
        console.error("Error fetching thread details:", error);
      }
    }
    if (threadId && !fetchedRef.current) {
      fetchedRef.current = true;
      fetchThread();
    }
  }, [threadId]);
// const handleAddQuestionComment = async (postId:number) => {
//   if (!replyContent.trim()) return;
//   if (!threadDetail) return;

//   try {
//     // Replace with actual user info in production
//     const userId = 123;
//     const username = "SC";
//     // const postId = threadDetail.posts[0]?.postId;
//     const threadId = threadDetail.threadId;

//     await addThreadComment({
//       threadId,
//       postId,
//       userId,
//       username,
//       content: replyContent,
//     });

//     toast.success(
//      "Your comment has been posted successfully.");

//     setReplyContent("");
//     setShowReplyEditor(false);

//     // Optionally, refresh comments by refetching thread details
//     // or append the new comment to your local state
//   } catch (error) {
//     toast.error("Failed to post comment. Please try again.");
//   }
// };
function timeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (isNaN(seconds)) return ""; // Invalid date

  if (seconds < 60) return "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min${minutes > 1 ? "s" : ""} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days > 1 ? "s" : ""} ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months > 1 ? "s" : ""} ago`;
  const years = Math.floor(months / 12);
  return `${years} year${years > 1 ? "s" : ""} ago`;
}
  return (
    <AppLayout
      backLink={{
        href: `/${groupsName}/${groupId}`,
        // label: `Back to ${postData.groupInfo.name}`,
        shortLabel: "Back to Group",
      }}
      searchPlaceholder="Search in group..."
    >
      <div className="p-4 lg:p-6">
        <div className="max-w-6xl mx-auto">
            {!threadDetail ? (
          <div>Loading...</div>
        ) : (
         
          <Card className="mb-6">
            <CardContent className="p-6">
              {/* Question Section */}
              <div className="mb-6">
                {/* Question Title */}
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 break-words">{threadDetail.posts[0]?.title}</h1>

                {/* Question Meta */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3 flex-1">
                    <button
                      onClick={() => handleUserClick(threadDetail.posts[0]?.uname)}
                      className="flex-shrink-0 hover:opacity-80 transition-opacity"
                    >
                      <Avatar className="h-10 w-10">
                        {/* <AvatarImage src={postData.author.avatar || "/placeholder.svg"} /> */}
                        <AvatarFallback>{threadDetail.posts[0]?.uname[0]}</AvatarFallback>
                      </Avatar>
                    </button>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <button
                          onClick={() => handleUserClick(threadDetail.posts[0]?.uname)}
                          className="font-semibold text-gray-900 break-words hover:text-blue-600 transition-colors"
                        >
                          {threadDetail.posts[0]?.uname}
                        </button>
                        {/* {postData.author.verified && ( */}
                          <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                            Verified
                          </Badge>
                        {/* )} */}
                        {/* <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-500" fill="currentColor" />
                          <span className="text-xs text-gray-500">{postData.author.reputation}</span>
                        </div> */}
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
                        <button
                          onClick={() => handleUserClick(threadDetail.posts[0]?.uname)}
                          className="hover:text-blue-600 transition-colors"
                        >
                          {threadDetail.posts[0]?.emailId}
                        </button>
                        <span>•</span>
                        <span>{timeAgo(threadDetail.createdAt)}</span>
                        {/* <span>•</span>
                        <span>{postData.engagement.views} views</span> */}
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
    onClick={() =>{
    if (!isLoggedIn) {
      setShowLoginPopup(true);
      return;
    } handleQuestionVote(threadDetail.posts[0]?.postId,"upvote")}}
    className="flex items-center justify-center h-10 w-10 rounded-md transition-colors"
  >
    <ChevronUp className="h-6 w-6" />
  </button>
  <span className="text-lg font-bold my-1">
    {(threadDetail.posts[0]?.upvoteCnt || 0) - (threadDetail.posts[0]?.downvoteCnt || 0)}
  </span>
  <button
    onClick={() =>{
    if (!isLoggedIn) {
      setShowLoginPopup(true);
      return;
    } handleQuestionVote(threadDetail.posts[0]?.postId,"downvote")}}
    className="flex items-center justify-center h-10 w-10 rounded-md transition-colors"
  >
    <ChevronDown className="h-6 w-6" />
  </button>
</div>

                  {/* Question Content */}
                  <div className="flex-1">
                    <div
                      className="prose prose-gray max-w-none mb-4"
                      dangerouslySetInnerHTML={{ __html: threadDetail.posts[0]?.content }}
                    />

                    {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
  {Array.isArray(threadDetail.hashtags) && threadDetail.hashtags.length > 0 ? (
    threadDetail.hashtags.map((tag, idx) => (
      <Badge
        key={tag + idx}
        variant="secondary"
        className="text-xs bg-gray-100 text-gray-700"
      >
        {tag}
      </Badge>
    ))
  ) : null}
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
                        onClick={() => {
    if (!isLoggedIn) {
      setShowLoginPopup(true);
      return;
    }setShowReplyEditor(!showReplyEditor)}}
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2 text-gray-600"
                      >
                        <MessageSquare className="h-4 w-4" />
                        Add Comment
                      </Button>
                        <Button
                    onClick={() => {
    if (!isLoggedIn) {
      setShowLoginPopup(true);
      return;
    }setShowAnswerEditor(!showAnswerEditor)}}
                    className="bg-blue-600 hover:bg-blue-700 ml-auto"
                  >
                    Post Your Reply
                  </Button>
                    </div>
                    
                {/* Answer Editor */}
                {showAnswerEditor && (
                  <div className="mb-6 border border-blue-200 rounded-lg p-4 bg-blue-50 mt-3">
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
                        <p>Type your reply here...</p>
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
                        Post Your Reply
                      </Button>
                    </div>
                  </div>
                )}
                  </div>
                </div>

                {/* Question Comments */}
                {(threadDetail.posts[0].comments.length > 0 || showReplyEditor) && (
                  <div className="mt-2 pt-2 ">
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
                              <Button 
                               onClick={() =>
    handleAddComment({
      postId: threadDetail.posts[0].postId,
      content: replyContent,
      isQuestion: true,
    })
  } className="bg-blue-600 hover:bg-blue-700">
                                Add Comment!
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Comments List */}
                    {threadDetail.posts[0]?.comments && threadDetail.posts[0].comments.length > 0 && (
                      <div className="space-y-3">
                        <h3 className="text-sm font-medium text-gray-700 mb-2">Comments</h3>
                        {threadDetail.posts[0].comments.map((comment) => (
                          <div key={comment.commentId} className="flex items-start gap-2 text-sm">
                            <div className="flex flex-col items-center mr-1">
                              <button
                                onClick={() => {
    if (!isLoggedIn) {
      setShowLoginPopup(true);
      return;
    }handleCommentVote(threadDetail.posts[0].postId,comment.commentId, "upvote")}}
                                className="flex justify-center h-5 w-6 rounded-md transition-colors"
                              >
                                <ChevronUp className="h-4 w-4" />
                              </button>
                              <span className="text-xs font-medium text-gray-600">
                                {(commentVotes[comment.commentId]?.upvotes ?? comment.upvoteCnt ?? 0) -
   (commentVotes[comment.commentId]?.downvotes ?? comment.downvoteCnt ?? 0)}
</span>
                              <button
                                onClick={() => {
    if (!isLoggedIn) {
      setShowLoginPopup(true);
      return;
    }handleCommentVote(threadDetail.posts[0].postId,comment.commentId, "downvote")}}
                                className="flex justify-center h-5 w-6 rounded-md transition-colors"
                              >
                                <ChevronDown className="h-4 w-4" />
                              </button>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <Avatar className="h-5 w-5 flex-shrink-0">
                                  {/* <AvatarImage src={comment.author.avatar || "/placeholder.svg"} /> */}
                                  <AvatarFallback>{comment.uname[0]}</AvatarFallback>
                                </Avatar>
                                <span className="font-medium text-gray-700">{comment.uname}</span>
                                <span className="text-gray-500">{timeAgo(comment.createdAt)}</span>
                              </div>
                              <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: comment.content }}></p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Separator between Question and Answers */}
              {threadDetail.posts.some(post => post.postType === "reply") && (
  <Separator className="my-6 mt-2 mb-3" />
)}

              {/* Answers Section */}
              <div>
                  {/* Answer Count */}
               {threadDetail.posts.some(post => post.postType === "reply") && (
  <div className="flex items-center justify-between mb-4">
    <h2 className="text-xl font-semibold text-gray-900">
      {threadDetail.posts.filter(post => post.postType === "reply").length} Replies
    </h2>
  </div>
)}


                {/* Answers List */}
                <div className="space-y-6">
                  {/* Sort answers to show accepted answer first */}
                  
                 
                     {threadDetail.posts
      .filter((post) => post.postType === "reply")
                    .map((answer) => (
                      <div
                        key={answer.postId}
                        className={`p-4 border rounded-lg }`}
                      >
                        <div className="flex">
                          {/* Voting Column */}
                          <div className="flex flex-col items-center mr-4">
                            <button
                              onClick={() => {
    if (!isLoggedIn) {
      setShowLoginPopup(true);
      return;
    }handleQuestionVote(answer.postId, "upvote")}}
                              className="flex items-center justify-center h-10 w-10 rounded-md transition-colors"
                            >
                              <ChevronUp className="h-6 w-6" />
                            </button>
                           
                            <span className="text-lg font-bold my-1">
                             
                              {(answer.upvoteCnt || 0) - (answer.downvoteCnt || 0)}    </span>
                            <button
                              onClick={() => {
    if (!isLoggedIn) {
      setShowLoginPopup(true);
      return;
    }handleQuestionVote(answer.postId, "downvote")}}
                              className="flex items-center justify-center h-10 w-10 rounded-md transition-colors "
                            >
                              <ChevronDown className="h-6 w-6" />
                            </button>
                            {/* {answer.isAccepted && (
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
                            )} */}
                          </div>

                          {/* Answer Content */}
                          <div className="flex-1">
                            {/* Answer Content */}
                            <div
                              className="prose prose-gray max-w-none mb-2"
                              dangerouslySetInnerHTML={{ __html: answer.content }}
                            />

                            {/* Answer Author */}
                            <div className="flex items-center justify-between mt-2 mb-2">
                              <div className="text-sm text-gray-500">answered {timeAgo(answer.createdAt)}</div>
                              <div className="flex items-center gap-3 bg-blue-50 p-2 rounded-md">
                                <Avatar className="h-8 w-8 flex-shrink-0">
                                  {/* <AvatarImage src={answer.author.avatar || "/placeholder.svg"} /> */}
                                  <AvatarFallback>{answer.uname[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium text-gray-900">{answer.uname}</div>
                                  {/* <div className="flex items-center gap-1 text-xs text-gray-500">
                                    <Star className="h-3 w-3 text-yellow-500" fill="currentColor" />
                                    <span>{answer.author.reputation}</span>
                                  </div> */}
                                </div>
                              </div>
                            </div>

                            {/* Answer Actions */}
                            <div className="flex items-center gap-4">
                              <Button
                                onClick={() => {
    if (!isLoggedIn) {
      setShowLoginPopup(true);
      return;
    }setReplyingToAnswerComment({ answerId: answer.postId, commentId: null })}}
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
                            {replyingToAnswerComment?.answerId === answer.postId &&
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
                                           onClick={() =>
    handleAddComment({
      postId: answer.postId,
      content: answerCommentContent,
      isQuestion: false,
    })
  }
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
  <div key={`${answer.postId}-${comment.commentId}`} className="flex items-start gap-2 text-sm">
    <div className="flex flex-col items-center mr-1">
                                        <button
                                          onClick={() => {
    if (!isLoggedIn) {
      setShowLoginPopup(true);
      return;
    }handleCommentVote(answer.postId, comment.commentId, "upvote")}}
                                          className="flex items-center justify-center h-6 w-6 rounded-md transition-colors"
                                        >
                                          <ChevronUp className="h-4 w-4" />
                                        </button>
                                        <span className="text-xs font-medium text-gray-600 my-0.5">
                                          {(commentVotes[comment.commentId]?.upvotes ?? comment.upvoteCnt ?? 0) -
   (commentVotes[comment.commentId]?.downvotes ?? comment.downvoteCnt ?? 0)}
</span>
                                        <button
                                          onClick={() => {
    if (!isLoggedIn) {
      setShowLoginPopup(true);
      return;
    }handleCommentVote(answer.postId, comment.commentId, "downvote")}}
                                          className="flex items-center justify-center h-6 w-6 rounded-md transition-colors"
                                        >
                                          <ChevronDown className="h-4 w-4" />
                                        </button>
                                      </div>
                                       <div className="flex-1">
      <div className="flex items-center gap-2 mb-1">
        <Avatar className="h-5 w-5 flex-shrink-0">
          <AvatarImage src={comment.author?.avatar || "/placeholder.svg"} />
          <AvatarFallback>
            {comment.author?.name ? comment.author.name[0] : "?"}
          </AvatarFallback>
        </Avatar>
        <span className="font-medium text-gray-700">{comment.author?.name || comment.uname || "Unknown"}</span>
        <span className="text-gray-500">{timeAgo(comment.timestamp || comment.createdAt)}</span>
      </div>
      <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: comment.content }}></p>
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
        )}
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
                      {`${window.location.origin}/${groupsName}/${groupId}/${threadId}`}
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
           {/* User Profile Popup */}
          {showUserProfile && selectedUser && (
            <div
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2"
              onClick={() => setShowUserProfile(false)}
            >
              <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
                {/* Header with Close Button */}
                <div className="relative p-2 border-b border-gray-100">
                  <button
                    onClick={() => setShowUserProfile(false)}
                    className="absolute top-3 right-3 p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="h-4 w-4 text-gray-500" />
                  </button>
                  <h3 className="text-lg font-semibold text-gray-900">User Profile</h3>
                </div>

                {/* Main Content - Two Sections */}
                <div className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Section 1: Profile Information */}
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="relative flex-shrink-0">
                          <Avatar className="h-16 w-16 border-2 border-gray-200">
                            <AvatarImage src={selectedUser.avatar || "/placeholder.svg"} />
                            <AvatarFallback className="text-lg font-semibold">
                              {selectedUser.fullName[0]}
                            </AvatarFallback>
                          </Avatar>
                          {selectedUser.verified && (
                            <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
                              <Check className="h-3 w-3 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h2 className="text-lg font-bold text-gray-900 truncate">{selectedUser.fullName}</h2>
                          <p className="text-blue-600 font-medium text-sm">{selectedUser.role}</p>
                          <p className="text-xs text-gray-500">@{selectedUser.username}</p>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-2">
                        <p className="text-sm text-gray-700 leading-relaxed">{selectedUser.tagline}</p>
                      </div>

                      <div className="text-xs text-gray-500">Joined {selectedUser.joinedDate}</div>
                    </div>

                    {/* Section 2: Social & Engagement Information */}
                    <div className="space-y-3">
                      {/* Stats Grid */}
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="bg-gray-50 rounded-lg p-2">
                          <div className="text-lg font-bold text-gray-900">
                            {selectedUser.totalPosts.toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-500">Posts</div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-2">
                          <div className="text-lg font-bold text-gray-900">
                            {selectedUser.followers.toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-500">Followers</div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-2">
                          <div className="text-lg font-bold text-gray-900">
                            {selectedUser.following.toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-500">Following</div>
                        </div>
                      </div>

                      {/* Social Media Links */}
                      <div>
                        <div className="text-sm font-medium text-gray-700 mb-2">Social Links</div>
                        <div className="flex gap-2">
                          {selectedUser.socialLinks.linkedin && (
                            <a
                              href={selectedUser.socialLinks.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-sm"
                            >
                              <Linkedin className="h-4 w-4 text-blue-600" />
                              <span className="text-blue-700 font-medium">LinkedIn</span>
                            </a>
                          )}
                          {selectedUser.socialLinks.twitter && (
                            <a
                              href={selectedUser.socialLinks.twitter}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-sm"
                            >
                              <Twitter className="h-4 w-4 text-blue-400" />
                              <span className="text-blue-700 font-medium">Twitter</span>
                            </a>
                          )}
                        </div>
                        {!selectedUser.socialLinks.linkedin && !selectedUser.socialLinks.twitter && (
                          <p className="text-xs text-gray-400">No social links available</p>
                        )}
                      </div>

                      {/* Follow Button */}
                      {/* {selectedUser.username !== "SarahM_Landowner" && ( */}
                        <Button
                          onClick={() => handleFollowToggle(selectedUser.username)}
                          className={`w-full ${
                            followingUsers.has(selectedUser.username)
                              ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                              : "bg-blue-600 text-white hover:bg-blue-700"
                          }`}
                        >
                          {followingUsers.has(selectedUser.username) ? "Unfollow" : "Send Follow Request"}
                        </Button>
                      {/* // )} */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
        {/* Login Popup */}
          <LoginPopup
  isOpen={showLoginPopup}
  onClose={() => setShowLoginPopup(false)}
  actionMessage=""
 onLoginSuccess={() => setShowLoginPopup(false)}
/>
    </AppLayout>
  )
}
