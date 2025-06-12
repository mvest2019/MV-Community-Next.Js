"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Camera,
  Heart,
  MessageSquare,
  Share2,
  Download,
  MoreHorizontal,
  Eye,
  Play,
  Calendar,
  MapPin,
  Tag,
  Globe,
  Lock,
  Users,
  Upload,
  Edit,
  Trash2,
  Grid3X3,
  List,
  Filter,
  Star,
} from "lucide-react"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useState } from "react"
import { AppLayout } from "@/components/app-layout"

export default function AlbumDetailPage() {
  const params = useParams()
  const albumId = params.id
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedMedia, setSelectedMedia] = useState<number | null>(null)
  const [likedMedia, setLikedMedia] = useState<Set<number>>(new Set([1, 3, 5]))

  // Sample album data
  const albumData = {
    id: 1,
    title: "Permian Basin Property",
    description:
      "Photos of my mineral rights property in the Permian Basin, including drilling operations, geological formations, and property boundaries.",
    coverImage: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=400&fit=crop",
    mediaCount: 24,
    privacy: "public",
    category: "Property",
    createdAt: "2024-01-15",
    author: {
      name: "John Doe",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    },
    tags: ["permian-basin", "property", "drilling", "geology"],
    likes: 12,
    views: 156,
    location: "Midland, TX",
  }

  // Sample media items in this album
  const [albumMedia, setAlbumMedia] = useState([
    {
      id: 1,
      title: "Property Overview",
      type: "image",
      url: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop",
      thumbnail: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=200&fit=crop",
      uploadedAt: "2024-01-15",
      size: "2.4 MB",
      dimensions: "1920x1080",
      description: "Aerial view of the entire property showing boundaries and access roads",
      likes: 8,
      comments: 3,
      views: 45,
      location: "Midland, TX",
      tags: ["aerial", "property", "overview"],
    },
    {
      id: 2,
      title: "Drilling Rig Setup",
      type: "image",
      url: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=600&fit=crop",
      thumbnail: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=300&h=200&fit=crop",
      uploadedAt: "2024-01-20",
      size: "3.1 MB",
      dimensions: "2048x1536",
      description: "Initial setup of the drilling rig on the north section of the property",
      likes: 12,
      comments: 5,
      views: 67,
      location: "Midland, TX",
      tags: ["drilling", "rig", "setup"],
    },
    {
      id: 3,
      title: "Geological Formation",
      type: "image",
      url: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=600&fit=crop",
      thumbnail: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=300&h=200&fit=crop",
      uploadedAt: "2024-01-25",
      size: "2.8 MB",
      dimensions: "1800x1200",
      description: "Interesting shale formation exposed during excavation work",
      likes: 15,
      comments: 8,
      views: 89,
      location: "Midland, TX",
      tags: ["geology", "shale", "formation"],
    },
    {
      id: 4,
      title: "Drilling Progress Video",
      type: "video",
      url: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800&h=600&fit=crop",
      thumbnail: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=300&h=200&fit=crop",
      uploadedAt: "2024-02-01",
      size: "45.2 MB",
      duration: "3:24",
      description: "Time-lapse video showing 3 days of drilling progress",
      likes: 22,
      comments: 12,
      views: 134,
      location: "Midland, TX",
      tags: ["drilling", "progress", "timelapse"],
    },
    {
      id: 5,
      title: "Property Survey Map",
      type: "image",
      url: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop",
      thumbnail: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&h=200&fit=crop",
      uploadedAt: "2024-02-05",
      size: "1.9 MB",
      dimensions: "1600x1200",
      description: "Official survey map showing mineral rights boundaries and easements",
      likes: 6,
      comments: 2,
      views: 34,
      location: "Midland, TX",
      tags: ["survey", "map", "boundaries"],
    },
    {
      id: 6,
      title: "Access Road Construction",
      type: "image",
      url: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop",
      thumbnail: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=300&h=200&fit=crop",
      uploadedAt: "2024-02-10",
      size: "2.7 MB",
      dimensions: "1920x1280",
      description: "Construction of new access road to drilling site",
      likes: 4,
      comments: 1,
      views: 23,
      location: "Midland, TX",
      tags: ["construction", "road", "access"],
    },
  ])

  const getPrivacyIcon = (privacy: string) => {
    switch (privacy) {
      case "public":
        return <Globe className="h-4 w-4 text-green-500" />
      case "private":
        return <Lock className="h-4 w-4 text-red-500" />
      case "friends":
        return <Users className="h-4 w-4 text-blue-500" />
      default:
        return <Globe className="h-4 w-4 text-green-500" />
    }
  }

  const handleLikeMedia = (mediaId: number) => {
    const newLikedMedia = new Set(likedMedia)
    const media = albumMedia.find((item) => item.id === mediaId)

    if (newLikedMedia.has(mediaId)) {
      newLikedMedia.delete(mediaId)
      if (media) {
        media.likes -= 1
      }
    } else {
      newLikedMedia.add(mediaId)
      if (media) {
        media.likes += 1
      }
    }

    setLikedMedia(newLikedMedia)
    setAlbumMedia([...albumMedia])
  }

  return (
    <AppLayout
      backLink={{
        href: "/media",
        label: "Back to Media",
        shortLabel: "Back",
      }}
      searchPlaceholder="Search in album..."
    >
      {/* Album Header */}
      <div className="relative h-64 bg-gradient-to-br from-blue-500 to-purple-600 overflow-hidden">
        <Image src={albumData.coverImage || "/placeholder.svg"} alt={albumData.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex items-end gap-4">
            <Avatar className="h-16 w-16 border-4 border-white">
              <AvatarImage src={albumData.author.avatar || "/placeholder.svg"} />
              <AvatarFallback className="bg-purple-600 text-white text-xl font-bold">
                {albumData.author.name[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-white">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl lg:text-3xl font-bold">{albumData.title}</h1>
                {getPrivacyIcon(albumData.privacy)}
                <Badge variant="secondary" className="bg-white/20 text-white border-0">
                  {albumData.category}
                </Badge>
              </div>
              <p className="text-white/90 mb-2">{albumData.description}</p>
              <div className="flex items-center gap-4 text-sm text-white/80">
                <span>By {albumData.author.name}</span>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(albumData.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Camera className="h-4 w-4" />
                  <span>{albumData.mediaCount} items</span>
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="h-4 w-4" />
                  <span>{albumData.likes} likes</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  <span>{albumData.views} views</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                <Upload className="h-4 w-4 mr-2" />
                Add Media
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="secondary" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Album
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Share2 className="mr-2 h-4 w-4" />
                    Share Album
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download className="mr-2 h-4 w-4" />
                    Download All
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Album
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      {/* Album Content */}
      <div className="p-4 lg:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Tags and Location */}
          <div className="mb-6">
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">{albumData.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-gray-500" />
                <div className="flex flex-wrap gap-1">
                  {albumData.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* View Controls */}
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Media ({albumMedia.length} items)</h2>
              <div className="flex gap-2">
                <div className="flex border rounded-lg">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>
          </div>

          {/* Media Grid/List */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {albumMedia.map((item) => (
                <Card key={item.id} className="hover:shadow-lg transition-shadow group overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src={item.thumbnail || "/placeholder.svg"}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                        onClick={() => setSelectedMedia(item.id)}
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>

                      {/* Media Type Indicator */}
                      <div className="absolute top-2 left-2">
                        {item.type === "video" ? (
                          <Badge variant="secondary" className="bg-black/70 text-white border-0">
                            <Play className="h-3 w-3 mr-1" />
                            {item.duration}
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="bg-black/70 text-white border-0">
                            <Camera className="h-3 w-3 mr-1" />
                            Photo
                          </Badge>
                        )}
                      </div>

                      {/* Actions Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="secondary"
                            className="bg-white/90 text-gray-900"
                            onClick={() => setSelectedMedia(item.id)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="secondary"
                            className={`bg-white/90 ${likedMedia.has(item.id) ? "text-red-500" : "text-gray-900"}`}
                            onClick={() => handleLikeMedia(item.id)}
                          >
                            <Heart className={`h-4 w-4 ${likedMedia.has(item.id) ? "fill-current" : ""}`} />
                          </Button>
                          <Button size="sm" variant="secondary" className="bg-white/90 text-gray-900">
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="absolute bottom-2 left-2 right-2">
                        <div className="flex items-center justify-between text-white text-xs">
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              <Heart className="h-3 w-3" />
                              <span>{item.likes}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageSquare className="h-3 w-3" />
                              <span>{item.comments}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            <span>{item.views}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-3">
                      <h4 className="font-medium text-sm text-gray-900 break-words line-clamp-1 mb-1">{item.title}</h4>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(item.uploadedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {albumMedia.map((item) => (
                <Card key={item.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                        <Image
                          src={item.thumbnail || "/placeholder.svg"}
                          alt={item.title}
                          fill
                          className="object-cover cursor-pointer"
                          onClick={() => setSelectedMedia(item.id)}
                        />
                        {item.type === "video" && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                            <Play className="h-6 w-6 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-900 break-words mb-1">{item.title}</h4>
                            <p className="text-sm text-gray-600 break-words line-clamp-2">{item.description}</p>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => setSelectedMedia(item.id)}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Full Size
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="mr-2 h-4 w-4" />
                                Download
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Share2 className="mr-2 h-4 w-4" />
                                Share
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Details
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center gap-4">
                            <Badge variant="outline" className="text-xs">
                              {item.type}
                            </Badge>
                            <span>{item.size}</span>
                            {item.dimensions && <span>{item.dimensions}</span>}
                            {item.location && (
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                <span>{item.location}</span>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                              <Heart className="h-3 w-3" />
                              <span>{item.likes}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageSquare className="h-3 w-3" />
                              <span>{item.comments}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              <span>{item.views}</span>
                            </div>
                            <span>{new Date(item.uploadedAt).toLocaleDateString()}</span>
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mt-2">
                          {item.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Media Viewer Dialog */}
          <Dialog open={selectedMedia !== null} onOpenChange={() => setSelectedMedia(null)}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
              <DialogHeader>
                <DialogTitle>
                  {selectedMedia && albumMedia.find((item) => item.id === selectedMedia)?.title}
                </DialogTitle>
              </DialogHeader>
              {selectedMedia && (
                <div className="space-y-4">
                  {(() => {
                    const item = albumMedia.find((media) => media.id === selectedMedia)
                    if (!item) return null

                    return (
                      <>
                        {/* Media Display */}
                        <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                          <Image
                            src={item.url || "/placeholder.svg"}
                            alt={item.title}
                            fill
                            className="object-contain"
                          />
                          {item.type === "video" && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                              <Button size="lg" className="rounded-full">
                                <Play className="h-8 w-8" />
                              </Button>
                            </div>
                          )}
                        </div>

                        {/* Media Info */}
                        <div className="space-y-4">
                          <div>
                            <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                            <p className="text-gray-600">{item.description}</p>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="font-medium text-gray-900">Type:</span>
                              <p className="text-gray-600 capitalize">{item.type}</p>
                            </div>
                            <div>
                              <span className="font-medium text-gray-900">Size:</span>
                              <p className="text-gray-600">{item.size}</p>
                            </div>
                            {item.dimensions && (
                              <div>
                                <span className="font-medium text-gray-900">Dimensions:</span>
                                <p className="text-gray-600">{item.dimensions}</p>
                              </div>
                            )}
                            {item.duration && (
                              <div>
                                <span className="font-medium text-gray-900">Duration:</span>
                                <p className="text-gray-600">{item.duration}</p>
                              </div>
                            )}
                            <div>
                              <span className="font-medium text-gray-900">Uploaded:</span>
                              <p className="text-gray-600">{new Date(item.uploadedAt).toLocaleDateString()}</p>
                            </div>
                            {item.location && (
                              <div>
                                <span className="font-medium text-gray-900">Location:</span>
                                <p className="text-gray-600">{item.location}</p>
                              </div>
                            )}
                          </div>

                          {/* Tags */}
                          <div>
                            <span className="font-medium text-gray-900 block mb-2">Tags:</span>
                            <div className="flex flex-wrap gap-1">
                              {item.tags.map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  #{tag}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center justify-between pt-4 border-t">
                            <div className="flex items-center gap-4">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleLikeMedia(item.id)}
                                className={likedMedia.has(item.id) ? "text-red-500" : ""}
                              >
                                <Heart className={`h-4 w-4 mr-2 ${likedMedia.has(item.id) ? "fill-current" : ""}`} />
                                {item.likes} Likes
                              </Button>
                              <Button variant="outline" size="sm">
                                <MessageSquare className="h-4 w-4 mr-2" />
                                {item.comments} Comments
                              </Button>
                              <Button variant="outline" size="sm">
                                <Share2 className="h-4 w-4 mr-2" />
                                Share
                              </Button>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm">
                                <Download className="h-4 w-4 mr-2" />
                                Download
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="outline" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Star className="mr-2 h-4 w-4" />
                                    Set as Cover
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-red-600">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        </div>
                      </>
                    )
                  })()}
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </AppLayout>
  )
}
