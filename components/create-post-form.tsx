"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Camera, Video, FileText, Calendar } from "lucide-react"
import { useState } from "react"

export function CreatePostForm() {
  const [content, setContent] = useState("")

  const handleSubmit = async (formData: FormData) => {
    // This would be a Server Action in a real app
    console.log("Creating post:", formData.get("content"))
    setContent("")
  }

  return (
    <Card>
      <CardContent className="p-4">
        <form action={handleSubmit}>
          <div className="flex space-x-3 mb-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Textarea
                name="content"
                placeholder="Share your professional insights..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="border-2 border-gray-200 rounded-full resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent px-4 py-3 text-base"
                rows={1}
                style={{ minHeight: "48px" }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex space-x-4">
              <Button type="button" variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50">
                <Camera className="h-5 w-5 mr-2" />
                Photo
              </Button>
              <Button type="button" variant="ghost" size="sm" className="text-green-600 hover:bg-green-50">
                <Video className="h-5 w-5 mr-2" />
                Video
              </Button>
              <Button type="button" variant="ghost" size="sm" className="text-orange-600 hover:bg-orange-50">
                <Calendar className="h-5 w-5 mr-2" />
                Event
              </Button>
              <Button type="button" variant="ghost" size="sm" className="text-purple-600 hover:bg-purple-50">
                <FileText className="h-5 w-5 mr-2" />
                Article
              </Button>
            </div>
            <Button
              type="submit"
              disabled={!content.trim()}
              className="bg-blue-600 hover:bg-blue-700 rounded-full px-6"
            >
              Post
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
