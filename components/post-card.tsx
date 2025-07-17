"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageCircle, Share2, MoreHorizontal, ThumbsUp, Send, Globe, Lock, CornerUpRight, Eye } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useState } from "react"
import { toast } from "sonner"
import { voteThreadPost } from "@/services/threadId-service";
import Link from "next/link"

export interface Post {
  threadId: string
  postQuestion: string
  lastReply: string
  lastActivity: string
  fileURL: string
  userId: number
  userName: string
  emailId: string
  NofOfReplies: number
  NofOfVotes: number
  NofOfComments: number
  NofOfViews: number
  _id: number
  grpId: number
  groupsName: string
  url: string
}

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
    // Get the current user from localStorage
const userStr = typeof window !== "undefined" ? localStorage.getItem("user") : null;
const user = userStr ? JSON.parse(userStr) : null;
// Now you can access:
const uId = user?.member_id;
const userName = user ? `${user.f_name} ${user.l_name}` : "";
  // const [liked, setLiked] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [localLikes, setLocalLikes] = useState(post.NofOfVotes)
  const [likes, setLikes] = useState(post.NofOfVotes ?? 0);
const [isLiking, setIsLiking] = useState(false);

const handleLike = async () => {
  if (isLiking) return;
  setIsLiking(true);
  try {
    // Replace with actual user/thread info as needed
    await voteThreadPost({
      threadId: post.threadId,
      postId: post._id,
      type: "upvote",
      uId: uId, // Replace with actual user id
      uname: userName, // Replace with actual user name
    });
    setLikes(likes + 1);
    toast.success("You liked this post!" );
  } catch (err) {
    toast.error("Failed to like post." );
  } finally {
    setIsLiking(false);
  }
};

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    // In a real app, this would be a Server Action
    console.log("Adding comment:", newComment)
    setNewComment("")
  }
function timeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (isNaN(seconds)) return ""; // Invalid date

  if (seconds < 60) return "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days > 1 ? "s" : ""} ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months > 1 ? "s" : ""} ago`;
  const years = Math.floor(months / 12);
  return `${years} year${years > 1 ? "s" : ""} ago`;
}

  return (
<Link
  href={`/${post.url}/${post.grpId}/${post.threadId}`}
  className="block"
  style={{ textDecoration: "none" }}
>
    <Card>
      <CardContent className="p-0">
        {/* Post Header */}
        <div className="p-4 pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <Avatar className="h-12 w-12">
                {/* <AvatarImage src={post.user.avatar || "/placeholder.svg"} /> */}
                <AvatarFallback>{post.userName[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 hover:text-blue-600 cursor-pointer">{post.userName}</h3>
                <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                    
                  <span>{timeAgo(post.lastActivity)}</span>
                 </div>
              </div>
            </div>
            {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Save post</DropdownMenuItem>
                <DropdownMenuItem>Copy link to post</DropdownMenuItem>
                <DropdownMenuItem>Unfollow {post.user.name}</DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">Report post</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> */}
          </div>
        </div>

        {/* Post Content */}
        <div className="px-4 pb-3">
           <div className="font-bold text-black mb-1">{post.postQuestion}</div>
       <p className="text-gray-800 leading-relaxed whitespace-pre-line line-clamp-2">
  {post.lastReply}
</p>  </div>

        {/* Post Image */}
        {post.fileURL && (
          <div className="px-4 pb-3">
            <img
              src={post.fileURL || "/placeholder.svg"}
              alt="Post content"
              className="w-full rounded-lg object-cover max-h-96 border"
            />
          </div>
        )}


        {/* Post Actions */}
        <div className="p-3 border-t border-b bg-gray-50">
         

<div className="flex items-center justify-between px-4 pb-3 pt-1 border-t border-gray-100">
  {/* Left side: Like, Comment, Reply */}
  <div className="flex items-center gap-6">
 <button
  type="button"
  className="flex items-center gap-1 text-gray-600"
  aria-label="Like"
>
  <ThumbsUp className="h-4 w-4" />
  <span className="text-sm">{likes}</span>
</button>
    <div className="flex items-center gap-1 text-gray-600">
      <MessageCircle className="h-4 w-4" />
      <span className="text-sm">{post.NofOfComments}</span>
    </div>
    <div className="flex items-center gap-1 text-gray-600">
      <CornerUpRight className="h-4 w-4" />
      <span className="text-sm">{post.NofOfReplies}</span>
    </div>
  </div>
  {/* Right side: Views */}
  <div className="flex items-center gap-1 text-gray-500">
    <Eye className="h-4 w-4" />
    <span className="text-sm">{post.NofOfViews ?? 0}</span>
  </div>
</div>
          {/* Comments Section */}
          {/* {showComments && (
            <div className="mt-4 space-y-3 border-t pt-3">
              {post.comments.map((comment) => (
                <div key={comment.id} className="flex space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={comment.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{comment.user[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="bg-gray-100 rounded-lg p-3">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-sm text-gray-900">{comment.user}</span>
                        <span className="text-xs text-gray-500">{comment.time}</span>
                      </div>
                      <p className="text-xs text-gray-600 mb-1">{comment.title}</p>
                      <p className="text-sm text-gray-800">{comment.content}</p>
                    </div>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                      <button className="hover:text-blue-600">Like</button>
                      <button className="hover:text-blue-600">Reply</button>
                    </div>
                  </div>
                </div>
              ))}

              <form onSubmit={handleAddComment} className="flex space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex-1 flex space-x-2">
                  <Input
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="flex-1 rounded-full border-gray-300"
                  />
                  <Button size="sm" type="submit" disabled={!newComment.trim()} className="rounded-full">
                    Post
                  </Button>
                </div>
              </form>
            </div>
          )} */}
        </div>
      </CardContent>
    </Card>
    </Link>
  )
}
