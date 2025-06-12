"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
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
  Camera,
  Filter,
  Grid3X3,
  List,
  Upload,
  FolderPlus,
  ImageIcon,
  Play,
  Download,
  Share2,
  Heart,
  MessageSquare,
  MoreHorizontal,
  Eye,
  Lock,
  Globe,
  Users,
  Calendar,
  MapPin,
  Trash2,
  Edit,
  Star,
  Clock,
  Folder,
} from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { AppLayout } from "@/components/app-layout"
import Link from "next/link"

export default function MediaPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [createAlbumOpen, setCreateAlbumOpen] = useState(false)
  const [uploadMediaOpen, setUploadMediaOpen] = useState(false)
  const [selectedAlbum, setSelectedAlbum] = useState<number | null>(null)
  const [likedMedia, setLikedMedia] = useState<Set<number>>(new Set([1, 3, 5]))

  const [newAlbumData, setNewAlbumData] = useState({
    title: "",
    description: "",
    privacy: "public",
    category: "Property",
  })

  // Sample albums data
  const [albums, setAlbums] = useState([
    {
      id: 1,
      title: "Permian Basin Property",
      description: "Photos of my mineral rights property in the Permian Basin",
      coverImage: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
      mediaCount: 24,
      privacy: "public",
      category: "Property",
      createdAt: "2024-01-15",
      author: {
        name: "John Doe",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      },
      tags: ["permian-basin", "property", "drilling"],
      likes: 12,
      views: 156,
    },
    {
      id: 2,
      title: "Drilling Operations 2024",
      description: "Documentation of drilling activities on my land",
      coverImage: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=300&fit=crop",
      mediaCount: 18,
      privacy: "private",
      category: "Drilling",
      createdAt: "2024-02-20",
      author: {
        name: "John Doe",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      },
      tags: ["drilling", "operations", "2024"],
      likes: 8,
      views: 89,
    },
    {
      id: 3,
      title: "Geological Formations",
      description: "Interesting rock formations and geological features",
      coverImage: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=300&fit=crop",
      mediaCount: 31,
      privacy: "public",
      category: "Geology",
      createdAt: "2024-01-10",
      author: {
        name: "John Doe",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      },
      tags: ["geology", "formations", "rocks"],
      likes: 25,
      views: 234,
    },
    {
      id: 4,
      title: "Lease Signing Documents",
      description: "Important documents and photos from lease signings",
      coverImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop",
      mediaCount: 12,
      privacy: "private",
      category: "Legal",
      createdAt: "2024-03-05",
      author: {
        name: "John Doe",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      },
      tags: ["legal", "lease", "documents"],
      likes: 5,
      views: 45,
    },
  ])

  // Sample media items
  const [mediaItems, setMediaItems] = useState([
    {
      id: 1,
      title: "Drilling Rig Setup",
      type: "image",
      url: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600&h=400&fit=crop",
      thumbnail: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=300&h=200&fit=crop",
      albumId: 2,
      uploadedAt: "2024-02-20",
      size: "2.4 MB",
      dimensions: "1920x1080",
      tags: ["drilling", "rig", "setup"],
      location: "Midland, TX",
      description: "Initial setup of the drilling rig on our property",
      likes: 8,
      comments: 3,
      views: 45,
      privacy: "public",
    },
    {
      id: 2,
      title: "Property Survey Map",
      type: "image",
      url: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop",
      thumbnail: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=200&fit=crop",
      albumId: 1,
      uploadedAt: "2024-01-15",
      size: "1.8 MB",
      dimensions: "1600x1200",
      tags: ["survey", "map", "property"],
      location: "Permian Basin, TX",
      description: "Detailed survey map showing mineral rights boundaries",
      likes: 12,
      comments: 5,
      views: 78,
      privacy: "public",
    },
    {
      id: 3,
      title: "Rock Formation Sample",
      type: "image",
      url: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600&h=400&fit=crop",
      thumbnail: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=300&h=200&fit=crop",
      albumId: 3,
      uploadedAt: "2024-01-10",
      size: "3.2 MB",
      dimensions: "2048x1536",
      tags: ["geology", "rock", "sample"],
      location: "Eagle Ford, TX",
      description: "Interesting shale formation found during site inspection",
      likes: 15,
      comments: 7,
      views: 92,
      privacy: "public",
    },
    {
      id: 4,
      title: "Lease Agreement Signing",
      type: "image",
      url: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop",
      thumbnail: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&h=200&fit=crop",
      albumId: 4,
      uploadedAt: "2024-03-05",
      size: "1.5 MB",
      dimensions: "1440x960",
      tags: ["legal", "signing", "lease"],
      location: "Houston, TX",
      description: "Historic moment signing our first major lease agreement",
      likes: 6,
      comments: 2,
      views: 34,
      privacy: "private",
    },
    {
      id: 5,
      title: "Drilling Progress Video",
      type: "video",
      url: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=600&h=400&fit=crop",
      thumbnail: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=300&h=200&fit=crop",
      albumId: 2,
      uploadedAt: "2024-02-25",
      size: "15.7 MB",
      duration: "2:34",
      tags: ["drilling", "progress", "video"],
      location: "Midland, TX",
      description: "Time-lapse video showing drilling progress over 3 days",
      likes: 18,
      comments: 9,
      views: 123,
      privacy: "public",
    },
  ])

  const categories = [
    { value: "all", label: "All Categories", icon: ImageIcon },
    { value: "Property", label: "Property", icon: MapPin },
    { value: "Drilling", label: "Drilling", icon: Camera },
    { value: "Geology", label: "Geology", icon: Star },
    { value: "Legal", label: "Legal", icon: Folder },
  ]

  const handleLikeMedia = (mediaId: number) => {
    const newLikedMedia = new Set(likedMedia)
    const media = mediaItems.find((item) => item.id === mediaId)

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
    setMediaItems([...mediaItems])
  }

  const filteredAlbums = albums.filter((album) => {
    const matchesSearch =
      album.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      album.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      album.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || album.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const filteredMedia = mediaItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory =
      selectedCategory === "all" || albums.find((album) => album.id === item.albumId)?.category === selectedCategory
    return matchesSearch && matchesCategory
  })

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

  const getCategoryIcon = (category: string) => {
    const categoryData = categories.find((cat) => cat.value === category)
    if (categoryData) {
      const Icon = categoryData.icon
      return <Icon className="h-4 w-4" />
    }
    return <ImageIcon className="h-4 w-4" />
  }

  return (
    <AppLayout pageTitle="Media Gallery" searchPlaceholder="Search photos and albums...">
      <div className="p-4 lg:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Top Controls - Improved Layout */}
          <div className="mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Left side - Categories and View Mode */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full sm:w-[240px] h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4 text-gray-500" />
                      <SelectValue placeholder="All Categories" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => {
                      const Icon = category.icon
                      return (
                        <SelectItem key={category.value} value={category.value}>
                          <div className="flex items-center gap-2">
                            <Icon className="h-4 w-4" />
                            {category.label}
                          </div>
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>

                <div className="flex border border-gray-300 rounded-lg overflow-hidden bg-white">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className={`rounded-none border-0 h-10 px-4 ${
                      viewMode === "grid"
                        ? "bg-gray-900 text-white hover:bg-gray-800"
                        : "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className={`rounded-none border-0 h-10 px-4 border-l border-gray-300 ${
                      viewMode === "list"
                        ? "bg-gray-900 text-white hover:bg-gray-800"
                        : "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Right side - Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Dialog open={uploadMediaOpen} onOpenChange={setUploadMediaOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-blue-600 hover:bg-blue-700 h-10 px-6 font-medium">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Media
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Upload Media</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-2">Drag and drop files here, or click to browse</p>
                        <p className="text-sm text-gray-500">Supports JPG, PNG, MP4, MOV up to 50MB</p>
                        <Button variant="outline" className="mt-4">
                          Choose Files
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <Label>Album</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select an album" />
                          </SelectTrigger>
                          <SelectContent>
                            {albums.map((album) => (
                              <SelectItem key={album.id} value={album.id.toString()}>
                                {album.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setUploadMediaOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={() => setUploadMediaOpen(false)}>Upload</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Dialog open={createAlbumOpen} onOpenChange={setCreateAlbumOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="h-10 px-6 font-medium border-gray-300 hover:bg-gray-50">
                      <FolderPlus className="h-4 w-4 mr-2" />
                      New Album
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Create New Album</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="album-title">Album Title</Label>
                        <Input
                          id="album-title"
                          placeholder="Enter album title..."
                          value={newAlbumData.title}
                          onChange={(e) => setNewAlbumData({ ...newAlbumData, title: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="album-description">Description</Label>
                        <Textarea
                          id="album-description"
                          placeholder="Describe your album..."
                          value={newAlbumData.description}
                          onChange={(e) => setNewAlbumData({ ...newAlbumData, description: e.target.value })}
                          className="min-h-[80px]"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Category</Label>
                        <Select
                          value={newAlbumData.category}
                          onValueChange={(value) => setNewAlbumData({ ...newAlbumData, category: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Property">Property</SelectItem>
                            <SelectItem value="Drilling">Drilling</SelectItem>
                            <SelectItem value="Geology">Geology</SelectItem>
                            <SelectItem value="Legal">Legal</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Privacy</Label>
                        <Select
                          value={newAlbumData.privacy}
                          onValueChange={(value) => setNewAlbumData({ ...newAlbumData, privacy: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="public">
                              <div className="flex items-center gap-2">
                                <Globe className="h-4 w-4 text-green-500" />
                                Public - Anyone can see
                              </div>
                            </SelectItem>
                            <SelectItem value="private">
                              <div className="flex items-center gap-2">
                                <Lock className="h-4 w-4 text-red-500" />
                                Private - Only you can see
                              </div>
                            </SelectItem>
                            <SelectItem value="friends">
                              <div className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-blue-500" />
                                Friends - Your connections can see
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setCreateAlbumOpen(false)}>
                        Cancel
                      </Button>
                      <Button
                        onClick={() => {
                          // Handle album creation logic here
                          console.log("Creating album:", newAlbumData)
                          setCreateAlbumOpen(false)
                          setNewAlbumData({ title: "", description: "", privacy: "public", category: "Property" })
                        }}
                        disabled={!newAlbumData.title.trim()}
                      >
                        Create Album
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="albums" className="w-full">
            <TabsList className="grid w-full grid-cols-2 h-12">
              <TabsTrigger value="albums" className="text-sm lg:text-base font-bold flex items-center gap-2">
                <Folder className="h-4 w-4 lg:h-5 lg:w-5 text-purple-500" />
                Albums ({filteredAlbums.length})
              </TabsTrigger>
              <TabsTrigger value="all-media" className="text-sm lg:text-base font-bold flex items-center gap-2">
                <ImageIcon className="h-4 w-4 lg:h-5 lg:w-5 text-pink-500" />
                All Media ({filteredMedia.length})
              </TabsTrigger>
            </TabsList>

            {/* Albums Tab */}
            <TabsContent value="albums" className="mt-6">
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredAlbums.map((album) => (
                    <Card key={album.id} className="hover:shadow-lg transition-shadow group overflow-hidden">
                      <CardContent className="p-0">
                        {/* Album Cover */}
                        <div className="relative h-48 overflow-hidden">
                          <Image
                            src={album.coverImage || "/placeholder.svg"}
                            alt={album.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
                          <div className="absolute top-3 right-3 flex gap-2">
                            {getPrivacyIcon(album.privacy)}
                            <Badge variant="secondary" className="bg-black/50 text-white border-0">
                              {album.mediaCount} items
                            </Badge>
                          </div>
                          <div className="absolute bottom-3 left-3 right-3">
                            <h3 className="font-semibold text-white text-lg mb-1 break-words">{album.title}</h3>
                            <div className="flex items-center gap-2 text-white/80 text-sm">
                              {getCategoryIcon(album.category)}
                              <span>{album.category}</span>
                            </div>
                          </div>
                        </div>

                        {/* Album Info */}
                        <div className="p-4">
                          <p className="text-sm text-gray-600 break-words line-clamp-2 mb-3">{album.description}</p>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-1 mb-3">
                            {album.tags.slice(0, 3).map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                #{tag}
                              </Badge>
                            ))}
                          </div>

                          {/* Stats */}
                          <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-1">
                                <Heart className="h-3 w-3" />
                                <span>{album.likes}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Eye className="h-3 w-3" />
                                <span>{album.views}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span>{new Date(album.createdAt).toLocaleDateString()}</span>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex gap-2">
                            <Button variant="outline" className="flex-1 text-sm" asChild>
                              <Link href={`/media/album/${album.id}`}>
                                <Eye className="h-4 w-4 mr-2" />
                                View
                              </Link>
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="px-2">
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
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredAlbums.map((album) => (
                    <Card key={album.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                            <Image
                              src={album.coverImage || "/placeholder.svg"}
                              alt={album.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="font-semibold text-gray-900 break-words">{album.title}</h3>
                                  {getPrivacyIcon(album.privacy)}
                                  <Badge variant="outline" className="text-xs">
                                    {album.category}
                                  </Badge>
                                </div>
                                <p className="text-sm text-gray-600 break-words line-clamp-2">{album.description}</p>
                              </div>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
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
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-red-600">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete Album
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>

                            <div className="flex items-center justify-between text-sm text-gray-500">
                              <div className="flex items-center gap-4">
                                <span>{album.mediaCount} items</span>
                                <div className="flex items-center gap-1">
                                  <Heart className="h-3 w-3" />
                                  <span>{album.likes}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Eye className="h-3 w-3" />
                                  <span>{album.views}</span>
                                </div>
                              </div>
                              <span>{new Date(album.createdAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* All Media Tab */}
            <TabsContent value="all-media" className="mt-6">
              {viewMode === "grid" ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {filteredMedia.map((item) => (
                    <Card key={item.id} className="hover:shadow-lg transition-shadow group overflow-hidden">
                      <CardContent className="p-0">
                        <div className="relative aspect-square overflow-hidden">
                          <Image
                            src={item.thumbnail || "/placeholder.svg"}
                            alt={item.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>

                          {/* Media Type Indicator */}
                          <div className="absolute top-2 left-2">
                            {item.type === "video" ? (
                              <Badge variant="secondary" className="bg-black/70 text-white border-0">
                                <Play className="h-3 w-3 mr-1" />
                                Video
                              </Badge>
                            ) : (
                              <Badge variant="secondary" className="bg-black/70 text-white border-0">
                                <ImageIcon className="h-3 w-3 mr-1" />
                                Photo
                              </Badge>
                            )}
                          </div>

                          {/* Actions Overlay */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="flex gap-2">
                              <Button size="sm" variant="secondary" className="bg-white/90 text-gray-900">
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
                              {item.type === "video" && item.duration && (
                                <Badge variant="secondary" className="bg-black/70 text-white border-0 text-xs">
                                  {item.duration}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="p-3">
                          <h4 className="font-medium text-sm text-gray-900 break-words line-clamp-1 mb-1">
                            {item.title}
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Clock className="h-3 w-3" />
                            <span>{new Date(item.uploadedAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredMedia.map((item) => (
                    <Card key={item.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                            <Image
                              src={item.thumbnail || "/placeholder.svg"}
                              alt={item.title}
                              fill
                              className="object-cover"
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
                                  <DropdownMenuItem>
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
                                <span>{new Date(item.uploadedAt).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>

          {/* Empty State */}
          {filteredAlbums.length === 0 && filteredMedia.length === 0 && (
            <Card className="text-center py-12 mt-6">
              <CardContent>
                <Camera className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Media Found</h3>
                <p className="text-gray-600 mb-4">
                  {searchQuery || selectedCategory !== "all"
                    ? "Try adjusting your search terms or filters."
                    : "Start by creating your first album or uploading some photos."}
                </p>
                <div className="flex gap-2 justify-center">
                  <Button onClick={() => setCreateAlbumOpen(true)}>
                    <FolderPlus className="h-4 w-4 mr-2" />
                    Create Album
                  </Button>
                  <Button variant="outline" onClick={() => setUploadMediaOpen(true)}>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Media
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AppLayout>
  )
}
