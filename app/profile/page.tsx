"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Edit,
  Mail,
  Calendar,
  Award,
  FileText,
  Star,
  ThumbsUp,
  TrendingUp,
  Save,
  X,
  Heart,
  MessageSquare,
  MoreHorizontal,
  Trash2,
  MapPin,
  FolderOpen,
  Link,
  Plus,
  ExternalLink,
} from "lucide-react"
import { useState } from "react"
import { AppLayout } from "@/components/app-layout"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [isEditingRole, setIsEditingRole] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    title: "Mineral Rights Expert & Landowner",
    location: "Texas, USA",
    email: "john.doe@email.com",
    punchline: "Helping landowners maximize their mineral rights potential",
    credentials: "Certified Petroleum Landman (CPL), Licensed Real Estate Broker",
    role: "Landowner",
    socialLinks: [
      { platform: "LinkedIn", url: "https://linkedin.com/in/johndoe" },
      { platform: "Twitter", url: "https://twitter.com/johndoe" },
    ],
  })

  const [newSocialLink, setNewSocialLink] = useState({ platform: "", url: "" })
  const [editingPost, setEditingPost] = useState<number | null>(null)
  const [editedContent, setEditedContent] = useState("")

  const handleSave = () => {
    setIsEditing(false)
    // Here you would typically save to a database
  }

  const handleCancel = () => {
    setIsEditing(false)
    // Reset to original values if needed
  }

  const handleRoleSave = () => {
    setIsEditingRole(false)
    // Here you would typically save to a database
  }

  const handleRoleCancel = () => {
    setIsEditingRole(false)
    // Reset to original values if needed
  }

  const handleAddSocialLink = () => {
    if (newSocialLink.platform && newSocialLink.url) {
      setProfileData({
        ...profileData,
        socialLinks: [...profileData.socialLinks, newSocialLink],
      })
      setNewSocialLink({ platform: "", url: "" })
    }
  }

  const handleRemoveSocialLink = (index: number) => {
    const updatedLinks = profileData.socialLinks.filter((_, i) => i !== index)
    setProfileData({ ...profileData, socialLinks: updatedLinks })
  }

  const handleEditPost = (postId: number, currentContent: string) => {
    setEditingPost(postId)
    setEditedContent(currentContent)
  }

  const handleSavePost = (postId: number) => {
    // Here you would typically save to a database
   
    setEditingPost(null)
    setEditedContent("")
  }

  const handleCancelEdit = () => {
    setEditingPost(null)
    setEditedContent("")
  }

  // Extended replies data with 4 replies
  const repliesData = [
    {
      id: 1,
      user: "GeologyExpertTX",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=40&h=40&fit=crop&crop=face",
      content:
        "I've experienced similar delays. It's usually due to title verification issues. Have you contacted your landman?",
      time: "2 hours ago",
      likes: 12,
    },
    {
      id: 2,
      user: "PermianLandowner",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=40&h=40&fit=crop&crop=face",
      content:
        "This is a common issue in the Permian Basin. I recommend checking your lease agreement for payment terms.",
      time: "4 hours ago",
      likes: 8,
    },
    {
      id: 3,
      user: "RoyaltyExpert",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      content: "You should file a complaint with the Texas Railroad Commission if payments are more than 60 days late.",
      time: "6 hours ago",
      likes: 15,
    },
    {
      id: 4,
      user: "TexasLandman",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
      content: "Check if there are any title issues or pending legal matters that might be causing the delay.",
      time: "8 hours ago",
      likes: 6,
    },
  ]

  // Extended likes data with 3 users
  const likesData = [
    {
      id: 1,
      user: "MineralRightsGuru",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
      time: "1 hour ago",
    },
    {
      id: 2,
      user: "TexasLandman",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
      time: "3 hours ago",
    },
    {
      id: 3,
      user: "OilAndGasExpert",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      time: "5 hours ago",
    },
  ]

  return (
    <AppLayout pageTitle="My Profile" searchPlaceholder="Search...">
      <div className="p-4 lg:p-6">
        <div className="max-w-6xl mx-auto">
          {/* Profile Header */}
          <div className="bg-white rounded-lg shadow-sm border p-4 lg:p-6 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 lg:gap-6 flex-1">
                <Avatar className="h-20 w-20 lg:h-24 lg:w-24 flex-shrink-0">
                  <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop&crop=face" />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xl lg:text-2xl font-bold">
                    JD
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 text-center sm:text-left min-w-0">
                  {isEditing ? (
                    <div className="space-y-3">
                      <Input
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        className="text-2xl lg:text-3xl font-bold text-gray-900 border-2 border-blue-300"
                        placeholder="Full Name"
                      />
                      <Input
                        value={profileData.title}
                        onChange={(e) => setProfileData({ ...profileData, title: e.target.value })}
                        className="text-gray-600 border-2 border-blue-300"
                        placeholder="Professional Title"
                      />
                      <Input
                        value={profileData.punchline}
                        onChange={(e) => setProfileData({ ...profileData, punchline: e.target.value })}
                        className="text-gray-600 border-2 border-blue-300"
                        placeholder="Personal tagline or punchline"
                      />
                      <Textarea
                        value={profileData.credentials}
                        onChange={(e) => setProfileData({ ...profileData, credentials: e.target.value })}
                        className="text-gray-600 border-2 border-blue-300"
                        placeholder="Professional qualifications and credentials"
                        rows={2}
                      />
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm">
                        <div className="flex items-center gap-1 justify-center sm:justify-start">
                          <MapPin className="h-4 w-4 flex-shrink-0" />
                          <Input
                            value={profileData.location}
                            onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                            className="text-sm border border-gray-300"
                            placeholder="Location"
                          />
                        </div>
                        <div className="flex items-center gap-1 justify-center sm:justify-start">
                          <Mail className="h-4 w-4 flex-shrink-0" />
                          <Input
                            value={profileData.email}
                            onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                            className="text-sm border border-gray-300"
                            placeholder="Email"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2 break-words">
                        {profileData.name}
                      </h1>
                      <p className="text-gray-600 mb-2 break-words">{profileData.title}</p>
                      {profileData.punchline && (
                        <p className="text-blue-600 italic mb-3 break-words">"{profileData.punchline}"</p>
                      )}

                      {/* Role Display */}
                      <div className="mb-3">
                        {isEditingRole ? (
                          <div className="flex items-center gap-2">
                            <Select
                              value={profileData.role}
                              onValueChange={(value) => setProfileData({ ...profileData, role: value })}
                            >
                              <SelectTrigger className="w-48">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Landowner">Landowner</SelectItem>
                                <SelectItem value="Mineral Owner">Mineral Owner</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button onClick={handleRoleSave} size="sm" className="bg-green-600 hover:bg-green-700">
                              <Save className="h-4 w-4" />
                            </Button>
                            <Button onClick={handleRoleCancel} variant="outline" size="sm">
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                              {profileData.role}
                            </Badge>
                            <Button
                              onClick={() => setIsEditingRole(true)}
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0"
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </div>

                      {/* Credentials */}
                      {profileData.credentials && (
                        <div className="mb-3">
                          <p className="text-sm font-medium text-gray-700 mb-1">Credentials</p>
                          <p className="text-sm text-gray-600 break-words">{profileData.credentials}</p>
                        </div>
                      )}

                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center gap-1 justify-center sm:justify-start">
                          <MapPin className="h-4 w-4 flex-shrink-0" />
                          <span className="break-words">{profileData.location}</span>
                        </div>
                        <div className="flex items-center gap-1 justify-center sm:justify-start">
                          <Calendar className="h-4 w-4 flex-shrink-0" />
                          <span>Joined March 2023</span>
                        </div>
                        <div className="flex items-center gap-1 justify-center sm:justify-start">
                          <Mail className="h-4 w-4 flex-shrink-0" />
                          <span className="break-words">{profileData.email}</span>
                        </div>
                      </div>

                      {/* Social Links */}
                      {profileData.socialLinks.length > 0 && (
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-2">Social Links</p>
                          <div className="flex flex-wrap gap-2">
                            {profileData.socialLinks.map((link, index) => (
                              <a
                                key={index}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-colors"
                              >
                                <Link className="h-3 w-3" />
                                {link.platform}
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-2 justify-center lg:justify-start">
                {isEditing ? (
                  <>
                    <Button onClick={handleSave} className="flex items-center gap-2 bg-green-600 hover:bg-green-700">
                      <Save className="h-4 w-4" />
                      Save
                    </Button>
                    <Button onClick={handleCancel} variant="outline" className="flex items-center gap-2">
                      <X className="h-4 w-4" />
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button onClick={() => setIsEditing(true)} variant="outline" className="flex items-center gap-2">
                    <Edit className="h-4 w-4" />
                    Edit Profile
                  </Button>
                )}
              </div>
            </div>

            {/* Social Links Editor (only shown when editing) */}
            {isEditing && (
              <div className="mt-6 pt-6 border-t">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Social/Profile Links</h3>
                <div className="space-y-4">
                  {/* Existing Links */}
                  {profileData.socialLinks.map((link, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input value={link.platform} readOnly className="w-32" />
                      <Input value={link.url} readOnly className="flex-1" />
                      <Button
                        onClick={() => handleRemoveSocialLink(index)}
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}

                  {/* Add New Link */}
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="Platform (e.g., LinkedIn)"
                      value={newSocialLink.platform}
                      onChange={(e) => setNewSocialLink({ ...newSocialLink, platform: e.target.value })}
                      className="w-32"
                    />
                    <Input
                      placeholder="URL"
                      value={newSocialLink.url}
                      onChange={(e) => setNewSocialLink({ ...newSocialLink, url: e.target.value })}
                      className="flex-1"
                    />
                    <Button
                      onClick={handleAddSocialLink}
                      variant="outline"
                      size="sm"
                      disabled={!newSocialLink.platform || !newSocialLink.url}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <MessageSquare className="h-6 w-6 lg:h-8 lg:w-8 text-blue-500" fill="currentColor" />
                </div>
                <div className="text-xl lg:text-2xl font-bold text-gray-900">127</div>
                <div className="text-xs lg:text-sm text-gray-600">Posts</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <ThumbsUp className="h-6 w-6 lg:h-8 lg:w-8 text-green-500" fill="currentColor" />
                </div>
                <div className="text-xl lg:text-2xl font-bold text-gray-900">1,234</div>
                <div className="text-xs lg:text-sm text-gray-600">Likes Received</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Award className="h-6 w-6 lg:h-8 lg:w-8 text-yellow-500" fill="currentColor" />
                </div>
                <div className="text-xl lg:text-2xl font-bold text-gray-900">15</div>
                <div className="text-xs lg:text-sm text-gray-600">Best Answers</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Star className="h-6 w-6 lg:h-8 lg:w-8 text-purple-500" fill="currentColor" />
                </div>
                <div className="text-xl lg:text-2xl font-bold text-gray-900">4.8</div>
                <div className="text-xs lg:text-sm text-gray-600">Reputation</div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Tabs */}
          <Tabs defaultValue="posts" className="w-full">
            <TabsList className="grid w-full grid-cols-3 h-12">
              <TabsTrigger value="posts" className="text-sm lg:text-base font-bold flex items-center gap-1 lg:gap-2">
                <MessageSquare className="h-4 w-4 lg:h-5 lg:w-5 text-blue-500" fill="currentColor" />
                <span className="hidden sm:inline">Recent Posts</span>
                <span className="sm:hidden">Posts</span>
              </TabsTrigger>
              <TabsTrigger
                value="documents"
                className="text-sm lg:text-base font-bold flex items-center gap-1 lg:gap-2"
              >
                <FolderOpen className="h-4 w-4 lg:h-5 lg:w-5 text-purple-500" fill="currentColor" />
                <span className="hidden sm:inline">Documents</span>
                <span className="sm:hidden">Docs</span>
              </TabsTrigger>
              <TabsTrigger value="activity" className="text-sm lg:text-base font-bold flex items-center gap-1 lg:gap-2">
                <TrendingUp className="h-4 w-4 lg:h-5 lg:w-5 text-orange-500" fill="currentColor" />
                <span>Activity</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="posts" className="mt-6 bg-blue-50 rounded-lg p-4">
              <div className="space-y-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10 flex-shrink-0">
                        <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-medium text-gray-900 break-words">
                            Question about royalty payment delays in Permian Basin
                          </h3>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() =>
                                  handleEditPost(
                                    1,
                                    "Has anyone experienced delays in royalty payments from operators in the Permian Basin recently? My payments have been delayed for the past 3 months...",
                                  )
                                }
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Post
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Post
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        {editingPost === 1 ? (
                          <div className="space-y-3">
                            <Textarea
                              value={editedContent}
                              onChange={(e) => setEditedContent(e.target.value)}
                              className="min-h-[100px] border-2 border-blue-300"
                              placeholder="Edit your post..."
                            />
                            <div className="flex gap-2">
                              <Button
                                onClick={() => handleSavePost(1)}
                                size="sm"
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <Save className="h-4 w-4 mr-2" />
                                Save Changes
                              </Button>
                              <Button onClick={handleCancelEdit} variant="outline" size="sm">
                                <X className="h-4 w-4 mr-2" />
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <p className="text-gray-600 text-sm mb-2 break-words">
                            Has anyone experienced delays in royalty payments from operators in the Permian Basin
                            recently? My payments have been delayed for the past 3 months...
                          </p>
                        )}

                        {editingPost !== 1 && (
                          <div className="flex flex-wrap items-center gap-2 lg:gap-4 text-sm text-gray-500">
                            <span>2 days ago</span>
                            <Dialog>
                              <DialogTrigger asChild>
                                <div className="flex items-center gap-1 cursor-pointer hover:text-blue-600 transition-colors">
                                  <MessageSquare className="h-4 w-4" />
                                  <span>4 replies</span>
                                </div>
                              </DialogTrigger>
                              <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto mx-4">
                                <DialogHeader>
                                  <DialogTitle>Replies (4)</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4 mt-4">
                                  {repliesData.map((reply) => (
                                    <div key={reply.id} className="flex items-start gap-3 p-3 border rounded-lg">
                                      <Avatar className="h-8 w-8 flex-shrink-0">
                                        <AvatarImage src={reply.avatar || "/placeholder.svg"} />
                                        <AvatarFallback>{reply.user[0]}</AvatarFallback>
                                      </Avatar>
                                      <div className="flex-1 min-w-0">
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                                          <span className="font-medium text-blue-600 break-words">{reply.user}</span>
                                          <span className="text-xs text-gray-500">{reply.time}</span>
                                        </div>
                                        <p className="text-sm text-gray-700 mb-2 break-words">{reply.content}</p>
                                        <div className="flex items-center gap-1 text-xs text-gray-500">
                                          <Heart className="h-3 w-3" />
                                          <span>{reply.likes} likes</span>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </DialogContent>
                            </Dialog>
                            <Dialog>
                              <DialogTrigger asChild>
                                <div className="flex items-center gap-1 cursor-pointer hover:text-green-600 transition-colors">
                                  <ThumbsUp className="h-4 w-4" />
                                  <span>3 likes</span>
                                </div>
                              </DialogTrigger>
                              <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto mx-4">
                                <DialogHeader>
                                  <DialogTitle>Liked by (3)</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-3 mt-4">
                                  {likesData.map((like) => (
                                    <div
                                      key={like.id}
                                      className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg"
                                    >
                                      <Avatar className="h-8 w-8 flex-shrink-0">
                                        <AvatarImage src={like.avatar || "/placeholder.svg"} />
                                        <AvatarFallback>{like.user[0]}</AvatarFallback>
                                      </Avatar>
                                      <div className="flex-1 min-w-0">
                                        <span className="font-medium text-blue-600 break-words">{like.user}</span>
                                        <p className="text-xs text-gray-500">{like.time}</p>
                                      </div>
                                      <ThumbsUp className="h-4 w-4 text-green-500 flex-shrink-0" fill="currentColor" />
                                    </div>
                                  ))}
                                </div>
                              </DialogContent>
                            </Dialog>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-500" fill="currentColor" />
                              <span>4.8 rating</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10 flex-shrink-0">
                        <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-medium text-gray-900 break-words">
                            Best practices for lease negotiation in 2024
                          </h3>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() =>
                                  handleEditPost(
                                    2,
                                    "After 15 years in the industry, here are my top recommendations for landowners negotiating new leases this year...",
                                  )
                                }
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Post
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Post
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        {editingPost === 2 ? (
                          <div className="space-y-3">
                            <Textarea
                              value={editedContent}
                              onChange={(e) => setEditedContent(e.target.value)}
                              className="min-h-[100px] border-2 border-blue-300"
                              placeholder="Edit your post..."
                            />
                            <div className="flex gap-2">
                              <Button
                                onClick={() => handleSavePost(2)}
                                size="sm"
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <Save className="h-4 w-4 mr-2" />
                                Save Changes
                              </Button>
                              <Button onClick={handleCancelEdit} variant="outline" size="sm">
                                <X className="h-4 w-4 mr-2" />
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <p className="text-gray-600 text-sm mb-2 break-words">
                            After 15 years in the industry, here are my top recommendations for landowners negotiating
                            new leases this year...
                          </p>
                        )}

                        {editingPost !== 2 && (
                          <div className="flex flex-wrap items-center gap-2 lg:gap-4 text-sm text-gray-500">
                            <span>1 week ago</span>
                            <div className="flex items-center gap-1">
                              <MessageSquare className="h-4 w-4" />
                              <span>67 replies</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <ThumbsUp className="h-4 w-4" />
                              <span>128 likes</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge
                                variant="secondary"
                                className="bg-green-100 text-green-800 flex items-center gap-1"
                              >
                                <Award className="h-3 w-3" fill="currentColor" />
                                <span className="hidden sm:inline">Best Answer</span>
                                <span className="sm:hidden">Best</span>
                              </Badge>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="documents" className="mt-6 bg-purple-50 rounded-lg p-4">
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <span>My Documents</span>
                      <Button size="sm" className="w-full sm:w-auto">
                        <FileText className="h-4 w-4 mr-2" />
                        Upload Document
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50">
                        <FileText className="h-8 w-8 text-blue-500 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium break-words">Permian Basin Lease Agreement</h4>
                          <p className="text-sm text-gray-500">Uploaded 2 months ago • 2.4 MB</p>
                        </div>
                        <Button variant="ghost" size="sm" className="flex-shrink-0">
                          View
                        </Button>
                      </div>

                      <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50">
                        <FileText className="h-8 w-8 text-green-500 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium break-words">Royalty Payment Records 2024</h4>
                          <p className="text-sm text-gray-500">Uploaded 1 week ago • 1.8 MB</p>
                        </div>
                        <Button variant="ghost" size="sm" className="flex-shrink-0">
                          View
                        </Button>
                      </div>

                      <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50">
                        <FileText className="h-8 w-8 text-purple-500 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium break-words">Property Survey Map</h4>
                          <p className="text-sm text-gray-500">Uploaded 3 weeks ago • 5.2 MB</p>
                        </div>
                        <Button variant="ghost" size="sm" className="flex-shrink-0">
                          View
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="activity" className="mt-6 bg-orange-50 rounded-lg p-4">
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="h-2 w-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div className="min-w-0">
                          <p className="text-sm break-words">
                            <span className="font-medium">Posted a question</span> about royalty payment delays
                          </p>
                          <p className="text-xs text-gray-500">2 days ago</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="h-2 w-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div className="min-w-0">
                          <p className="text-sm break-words">
                            <span className="font-medium">Received best answer</span> for lease negotiation tips
                          </p>
                          <p className="text-xs text-gray-500">1 week ago</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="h-2 w-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div className="min-w-0">
                          <p className="text-sm break-words">
                            <span className="font-medium">Uploaded document</span> - Property Survey Map
                          </p>
                          <p className="text-xs text-gray-500">3 weeks ago</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="h-2 w-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div className="min-w-0">
                          <p className="text-sm break-words">
                            <span className="font-medium">Joined group</span> - Texas Mineral Rights Owners
                          </p>
                          <p className="text-xs text-gray-500">1 month ago</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AppLayout>
  )
}
