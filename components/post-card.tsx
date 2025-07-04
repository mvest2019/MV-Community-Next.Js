"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageCircle, Share2, MoreHorizontal, ThumbsUp, Send, Globe, Lock, CornerUpRight } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useState } from "react"

interface Post {
  id: number
  user: {
    name: string
    title: string
    location: string
    avatar: string
    verified: boolean
    connections: string
    isCompany?: boolean
  }
  content: string
  timestamp: string
  privacy: string
  image?: string
  likes: number
  comments: Array<{
    id: number
    user: string
    title: string
    avatar: string
    content: string
    time: string
  }>
  replies:number
  shares: number
  postType: string
}

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  const [liked, setLiked] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [localLikes, setLocalLikes] = useState(post.likes)

  const handleLike = () => {
    setLiked(!liked)
    setLocalLikes(liked ? localLikes - 1 : localLikes + 1)
  }

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    // In a real app, this would be a Server Action
    console.log("Adding comment:", newComment)
    setNewComment("")
  }

  return (
    <Card>
      <CardContent className="p-0">
        {/* Post Header */}
        <div className="p-4 pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={post.user.avatar || "/placeholder.svg"} />
                <AvatarFallback>{post.user.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold text-gray-900 hover:text-blue-600 cursor-pointer">{post.user.name}</h3>
                  {post.user.verified && (
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs px-1.5 py-0.5">
                      ✓
                    </Badge>
                  )}
                  {post.user.connections && post.user.connections !== "You" && (
                    <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                      {post.user.connections}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-0.5">{post.user.title}</p>
                <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                  <span>{post.timestamp}</span>
                  <span>•</span>
                  {post.privacy === "public" ? <Globe className="h-3 w-3" /> : <Lock className="h-3 w-3" />}
                </div>
              </div>
            </div>
            <DropdownMenu>
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
            </DropdownMenu>
          </div>
        </div>

        {/* Post Content */}
        <div className="px-4 pb-3">
          <p className="text-gray-800 leading-relaxed whitespace-pre-line">{post.content}</p>
        </div>

        {/* Post Image */}
        {post.image && (
          <div className="px-4 pb-3">
            <img
              src={post.image || "/placeholder.svg"}
              alt="Post content"
              className="w-full rounded-lg object-cover max-h-96 border"
            />
          </div>
        )}

        {/* Post Stats */}
        {/* <div className="px-4 py-2 border-t border-b bg-gray-50">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <div className="flex -space-x-1">
                  <div className="h-5 w-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <ThumbsUp className="h-3 w-3 text-white" />
                  </div>
                </div>
                <span>{localLikes} likes</span>
              </div>
              <span>{post.comments.length} comments</span>
              <span>{post.shares} reposts</span>
            </div>
          </div>
        </div> */}

        {/* Post Actions */}
        <div className="p-3 border-t border-b bg-gray-50">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={`flex-1 ${liked ? "text-blue-600" : "text-gray-600"} hover:bg-gray-100`}
            >
              <ThumbsUp className={`h-5 w-5 mr-2 ${liked ? "fill-current" : ""}`} />
              {localLikes}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowComments(!showComments)}
              className="flex-1 text-gray-600 hover:bg-gray-100"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              {post.comments.length}
            </Button>
            <Button variant="ghost" size="sm" className="flex-1 text-gray-600 hover:bg-gray-100">
        <Button variant="ghost" size="sm" className="flex-1 text-gray-600 hover:bg-gray-100">
<Button
  variant="ghost"
  size="sm"
  className="flex-1 text-gray-600 hover:bg-gray-100"
>
  <CornerUpRight className="h-5 w-5 mr-2" />
  {post.replies ?? 0}
</Button>
</Button>
            </Button>
          </div>

          {/* Comments Section */}
          {showComments && (
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

              {/* Add Comment */}
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
          )}
        </div>
      </CardContent>
    </Card>
  )
}
