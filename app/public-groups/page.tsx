"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  MessageSquare,
  Eye,
  UserPlus,
  Search,
  TrendingUp,
  Clock,
  Star,
  MapPin,
  Briefcase,
  Heart,
  Shield,
  Zap,
  Mail,
} from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { AppLayout } from "@/components/app-layout"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

export default function PublicGroupsPage() {
  const { toast } = useToast()
  const [joinedGroups, setJoinedGroups] = useState<Set<number>>(new Set([1, 3]))
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false)
  const [selectedGroupForInvite, setSelectedGroupForInvite] = useState<any>(null)
  const [inviteData, setInviteData] = useState({
    email: "",
    subject: "",
    description: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Sample public groups data
  const [publicGroups, setPublicGroups] = useState([
    {
      id: 1,
      name: "Texas Mineral Rights Owners",
      description: "A community for mineral rights owners in Texas to share experiences and advice.",
      memberCount: 2847,
      postCount: 1234,
      category: "Regional",
      avatar: "/placeholder.svg?height=80&width=80",
      coverImage: "/placeholder.svg?height=200&width=400",
      moderators: ["GeologyExpertTX", "TexasLandman"],
      isActive: true,
      lastActivity: "2 hours ago",
      weeklyPosts: 45,
      tags: ["texas", "mineral-rights", "landowners"],
      featured: true,
    },
    {
      id: 2,
      name: "Permian Basin Landowners",
      description:
        "Dedicated to landowners in the Permian Basin region. Share drilling updates, lease negotiations, and market insights.",
      memberCount: 1456,
      postCount: 892,
      category: "Regional",
      avatar: "/placeholder.svg?height=80&width=80",
      coverImage: "/placeholder.svg?height=200&width=400",
      moderators: ["PermianExpert", "DrillingSupervisor"],
      isActive: true,
      lastActivity: "1 hour ago",
      weeklyPosts: 32,
      tags: ["permian-basin", "drilling", "lease-negotiation"],
      featured: false,
    },
    {
      id: 3,
      name: "Lease Negotiation Experts",
      description: "Professional group for sharing lease negotiation strategies, legal advice, and best practices.",
      memberCount: 892,
      postCount: 567,
      category: "Professional",
      avatar: "/placeholder.svg?height=80&width=80",
      coverImage: "/placeholder.svg?height=200&width=400",
      moderators: ["LegalEagle", "ContractPro"],
      isActive: true,
      lastActivity: "3 hours ago",
      weeklyPosts: 28,
      tags: ["legal", "negotiation", "contracts"],
      featured: true,
    },
    {
      id: 4,
      name: "Eagle Ford Shale Community",
      description: "Connect with other landowners and industry professionals in the Eagle Ford Shale region.",
      memberCount: 634,
      postCount: 423,
      category: "Regional",
      avatar: "/placeholder.svg?height=80&width=80",
      coverImage: "/placeholder.svg?height=200&width=400",
      moderators: ["EagleFordExpert"],
      isActive: true,
      lastActivity: "5 hours ago",
      weeklyPosts: 18,
      tags: ["eagle-ford", "shale", "community"],
      featured: false,
    },
    {
      id: 5,
      name: "Royalty Payment Support",
      description: "Support group for landowners dealing with royalty payment problems and disputes.",
      memberCount: 1123,
      postCount: 789,
      category: "Support",
      avatar: "/placeholder.svg?height=80&width=80",
      coverImage: "/placeholder.svg?height=200&width=400",
      moderators: ["RoyaltyExpert", "PaymentPro"],
      isActive: true,
      lastActivity: "4 hours ago",
      weeklyPosts: 25,
      tags: ["royalty", "payments", "support"],
      featured: false,
    },
    {
      id: 6,
      name: "Oil & Gas Market Analysis",
      description: "Professional analysis and discussion of oil and gas market trends, pricing, and forecasts.",
      memberCount: 756,
      postCount: 445,
      category: "Professional",
      avatar: "/placeholder.svg?height=80&width=80",
      coverImage: "/placeholder.svg?height=200&width=400",
      moderators: ["MarketAnalyst", "EnergyExpert"],
      isActive: true,
      lastActivity: "6 hours ago",
      weeklyPosts: 22,
      tags: ["market-analysis", "oil-prices", "forecasting"],
      featured: true,
    },
    {
      id: 7,
      name: "New Landowner Support",
      description: "A welcoming community for new mineral rights owners to ask questions and get guidance.",
      memberCount: 445,
      postCount: 234,
      category: "Support",
      avatar: "/placeholder.svg?height=80&width=80",
      coverImage: "/placeholder.svg?height=200&width=400",
      moderators: ["MentorPro", "NewbieFriend"],
      isActive: true,
      lastActivity: "8 hours ago",
      weeklyPosts: 15,
      tags: ["beginners", "support", "guidance"],
      featured: false,
    },
    {
      id: 8,
      name: "Oklahoma Mineral Rights",
      description: "Community for mineral rights owners and industry professionals in Oklahoma.",
      memberCount: 567,
      postCount: 334,
      category: "Regional",
      avatar: "/placeholder.svg?height=80&width=80",
      coverImage: "/placeholder.svg?height=200&width=400",
      moderators: ["OklahomaExpert"],
      isActive: true,
      lastActivity: "12 hours ago",
      weeklyPosts: 12,
      tags: ["oklahoma", "mineral-rights", "regional"],
      featured: false,
    },
  ])

  const handleJoinGroup = (groupId: number) => {
    const newJoinedGroups = new Set(joinedGroups)
    if (newJoinedGroups.has(groupId)) {
      newJoinedGroups.delete(groupId)
      toast({
        title: "Left group",
        description: "You have successfully left the group.",
      })
    } else {
      newJoinedGroups.add(groupId)
      toast({
        title: "Joined group",
        description: "You have successfully joined the group.",
      })
    }
    setJoinedGroups(newJoinedGroups)
  }

  const handleOpenInviteDialog = (group: any) => {
    setSelectedGroupForInvite(group)
    setInviteData({
      email: "",
      subject: `Join the ${group.name} group on MineralView`,
      description: `Hi there,\n\nI'd like to invite you to join the ${group.name} group on MineralView. This group is a great place to connect with others interested in ${group.description.substring(0, 50)}...\n\nLooking forward to seeing you there!`,
    })
    setInviteDialogOpen(true)
  }

  const handleSendInvitation = async () => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Handle invitation sending logic here
    console.log("Sending invitation:", inviteData, "for group:", selectedGroupForInvite?.name)

    // Reset form and show success
    setInviteData({
      email: "",
      subject: "",
      description: "",
    })
    setInviteDialogOpen(false)
    setIsSubmitting(false)

    // Show toast notification
    toast({
      title: "Invitation sent",
      description: `Your invitation to join ${selectedGroupForInvite?.name} has been sent successfully.`,
    })
  }

  const isInviteFormValid = inviteData.email.trim() && inviteData.subject.trim() && inviteData.description.trim()

  const filteredGroups = publicGroups

  const sortedGroups = filteredGroups.sort((a, b) => {
    const aIsJoined = joinedGroups.has(a.id)
    const bIsJoined = joinedGroups.has(b.id)

    // If one is joined and the other isn't, prioritize the joined one
    if (aIsJoined && !bIsJoined) return -1
    if (!aIsJoined && bIsJoined) return 1

    // If both have the same join status, maintain original order
    return 0
  })

  const featuredGroups = publicGroups.filter((group) => group.featured)
  const trendingGroups = [...publicGroups].sort((a, b) => b.weeklyPosts - a.weeklyPosts).slice(0, 4)

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Regional":
        return MapPin
      case "Professional":
        return Briefcase
      case "Support":
        return Heart
      default:
        return Users
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Regional":
        return "bg-blue-100 text-blue-800"
      case "Professional":
        return "bg-purple-100 text-purple-800"
      case "Support":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleCardClick = (groupId: number) => {
    window.location.href = `/groups/${groupId}`
  }

  return (
    <AppLayout pageTitle="Public Groups" searchPlaceholder="Search public groups...">
      <div className="p-4 lg:p-6">
        <div className="max-w-6xl mx-auto">
          {/* Note about public groups */}

          {/* Rest of the existing content remains the same */}

          {/* Categories Filter */}

          {/* Tabs */}
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-3 h-12">
              <TabsTrigger value="all" className="text-sm lg:text-base font-bold flex items-center gap-2">
                <Users className="h-4 w-4 lg:h-5 lg:w-5 text-blue-500" />
                All Groups ({sortedGroups.length})
              </TabsTrigger>
              <TabsTrigger value="featured" className="text-sm lg:text-base font-bold flex items-center gap-2">
                <Star className="h-4 w-4 lg:h-5 lg:w-5 text-yellow-500" />
                Featured ({featuredGroups.length})
              </TabsTrigger>
              <TabsTrigger value="trending" className="text-sm lg:text-base font-bold flex items-center gap-2">
                <TrendingUp className="h-4 w-4 lg:h-5 lg:w-5 text-orange-500" />
                Trending
              </TabsTrigger>
            </TabsList>

            {/* All Groups Tab */}
            <TabsContent value="all" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedGroups.map((group) => {
                  const CategoryIcon = getCategoryIcon(group.category)
                  const isJoined = joinedGroups.has(group.id)

                  return (
                    <Card
                      key={group.id}
                      className="hover:shadow-lg transition-shadow group overflow-hidden cursor-pointer"
                      onClick={() => handleCardClick(group.id)}
                    >
                      <CardContent className="p-0">
                        {/* Group Cover Image */}
                        <div className="relative h-32 bg-gradient-to-br from-blue-500 to-purple-600 overflow-hidden">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-full h-full relative">
                              <Image
                                src={group.coverImage || "/placeholder.svg"}
                                alt={group.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                priority
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              />
                            </div>
                          </div>
                          <div className="absolute inset-0 bg-black/20"></div>
                          <div className="absolute top-3 right-3 flex gap-2">
                            {group.featured && (
                              <Badge variant="secondary" className="bg-yellow-500/90 text-white border-0">
                                <Star className="h-3 w-3 mr-1" fill="currentColor" />
                                Featured
                              </Badge>
                            )}
                            <Badge variant="secondary" className={`border-0 ${getCategoryColor(group.category)}`}>
                              <CategoryIcon className="h-3 w-3 mr-1" />
                              {group.category}
                            </Badge>
                          </div>
                          <div className="absolute bottom-3 left-3">
                            <Avatar className="h-12 w-12 border-2 border-white">
                              <AvatarImage src={group.avatar || "/placeholder.svg"} alt={group.name[0]} />
                              <AvatarFallback className="bg-purple-600 text-white font-bold">
                                {group.name[0]}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                        </div>

                        {/* Group Content */}
                        <div className="p-4">
                          <div className="mb-3">
                            <h3 className="font-semibold text-lg text-gray-900 break-words mb-1">{group.name}</h3>
                            <p className="text-sm text-gray-600 break-words line-clamp-2">{group.description}</p>
                          </div>

                          {/* Stats */}
                          <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                            <div className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              <span>{group.memberCount.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageSquare className="h-3 w-3" />
                              <span>{group.postCount}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Zap className="h-3 w-3" />
                              <span>{group.weeklyPosts}/week</span>
                            </div>
                          </div>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-1 mb-3">
                            {group.tags.slice(0, 3).map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                #{tag}
                              </Badge>
                            ))}
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              className="flex-1 text-sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                window.location.href = `/groups/${group.id}`
                              }}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </Button>
                            <Button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleJoinGroup(group.id)
                              }}
                              className={`flex-1 text-sm ${
                                isJoined ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
                              }`}
                            >
                              {isJoined ? (
                                <>
                                  <Shield className="h-4 w-4 mr-2" />
                                  Joined
                                </>
                              ) : (
                                <>
                                  <UserPlus className="h-4 w-4 mr-2" />
                                  Join
                                </>
                              )}
                            </Button>
                          </div>

                          {/* Send Invitation Button */}
                          <Button
                            variant="ghost"
                            className="w-full mt-2 text-sm text-blue-600 hover:bg-blue-50"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleOpenInviteDialog(group)
                            }}
                          >
                            <Mail className="h-4 w-4 mr-2" />
                            Send Invitation
                          </Button>

                          {/* Last Activity */}
                          <div className="flex items-center gap-1 text-xs text-gray-400 mt-2">
                            <Clock className="h-3 w-3" />
                            <span>Active {group.lastActivity}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              {/* Empty State */}
              {sortedGroups.length === 0 && (
                <Card className="text-center py-12">
                  <CardContent>
                    <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Groups Found</h3>
                    <p className="text-gray-600 mb-4">
                      Try adjusting your search terms or filters to find more groups.
                    </p>
                    <Button>Clear Filters</Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Featured Groups Tab */}
            <TabsContent value="featured" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredGroups.map((group) => {
                  const CategoryIcon = getCategoryIcon(group.category)
                  const isJoined = joinedGroups.has(group.id)

                  return (
                    <Card
                      key={group.id}
                      className="hover:shadow-lg transition-shadow group overflow-hidden border-yellow-200 cursor-pointer"
                      onClick={() => handleCardClick(group.id)}
                    >
                      <CardContent className="p-0">
                        {/* Group Cover Image */}
                        <div className="relative h-32 bg-gradient-to-br from-yellow-400 to-orange-500 overflow-hidden">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-full h-full relative">
                              <Image
                                src={group.coverImage || "/placeholder.svg"}
                                alt={group.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                priority
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              />
                            </div>
                          </div>
                          <div className="absolute inset-0 bg-black/20"></div>
                          <div className="absolute top-3 right-3">
                            <Badge variant="secondary" className="bg-yellow-500/90 text-white border-0">
                              <Star className="h-3 w-3 mr-1" fill="currentColor" />
                              Featured
                            </Badge>
                          </div>
                          <div className="absolute bottom-3 left-3">
                            <Avatar className="h-12 w-12 border-2 border-white">
                              <AvatarImage src={group.avatar || "/placeholder.svg"} alt={group.name[0]} />
                              <AvatarFallback className="bg-purple-600 text-white font-bold">
                                {group.name[0]}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                        </div>

                        {/* Group Content */}
                        <div className="p-4">
                          <div className="mb-3">
                            <h3 className="font-semibold text-lg text-gray-900 break-words mb-1">{group.name}</h3>
                            <p className="text-sm text-gray-600 break-words line-clamp-2">{group.description}</p>
                          </div>

                          {/* Stats */}
                          <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                            <div className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              <span>{group.memberCount.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageSquare className="h-3 w-3" />
                              <span>{group.postCount}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Zap className="h-3 w-3" />
                              <span>{group.weeklyPosts}/week</span>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              className="flex-1 text-sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                window.location.href = `/groups/${group.id}`
                              }}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </Button>
                            <Button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleJoinGroup(group.id)
                              }}
                              className={`flex-1 text-sm ${
                                isJoined ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
                              }`}
                            >
                              {isJoined ? (
                                <>
                                  <Shield className="h-4 w-4 mr-2" />
                                  Joined
                                </>
                              ) : (
                                <>
                                  <UserPlus className="h-4 w-4 mr-2" />
                                  Join
                                </>
                              )}
                            </Button>
                          </div>

                          {/* Send Invitation Button */}
                          <Button
                            variant="ghost"
                            className="w-full mt-2 text-sm text-blue-600 hover:bg-blue-50"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleOpenInviteDialog(group)
                            }}
                          >
                            <Mail className="h-4 w-4 mr-2" />
                            Send Invitation
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>

            {/* Trending Groups Tab */}
            <TabsContent value="trending" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trendingGroups.map((group, index) => {
                  const CategoryIcon = getCategoryIcon(group.category)
                  const isJoined = joinedGroups.has(group.id)

                  return (
                    <Card
                      key={group.id}
                      className="hover:shadow-lg transition-shadow group overflow-hidden border-orange-200 cursor-pointer"
                      onClick={() => handleCardClick(group.id)}
                    >
                      <CardContent className="p-0">
                        {/* Group Cover Image */}
                        <div className="relative h-32 bg-gradient-to-br from-orange-400 to-red-500 overflow-hidden">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-full h-full relative">
                              <Image
                                src={group.coverImage || "/placeholder.svg"}
                                alt={group.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                priority
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              />
                            </div>
                          </div>
                          <div className="absolute inset-0 bg-black/20"></div>
                          <div className="absolute top-3 right-3">
                            <Badge variant="secondary" className="bg-orange-500/90 text-white border-0">
                              <TrendingUp className="h-3 w-3 mr-1" />#{index + 1} Trending
                            </Badge>
                          </div>
                          <div className="absolute bottom-3 left-3">
                            <Avatar className="h-12 w-12 border-2 border-white">
                              <AvatarImage src={group.avatar || "/placeholder.svg"} alt={group.name[0]} />
                              <AvatarFallback className="bg-purple-600 text-white font-bold">
                                {group.name[0]}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                        </div>

                        {/* Group Content */}
                        <div className="p-4">
                          <div className="mb-3">
                            <h3 className="font-semibold text-lg text-gray-900 break-words mb-1">{group.name}</h3>
                            <p className="text-sm text-gray-600 break-words line-clamp-2">{group.description}</p>
                          </div>

                          {/* Trending Stats */}
                          <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                            <div className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              <span>{group.memberCount.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center gap-1 text-orange-600 font-medium">
                              <Zap className="h-3 w-3" />
                              <span>{group.weeklyPosts} posts this week</span>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              className="flex-1 text-sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                window.location.href = `/groups/${group.id}`
                              }}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </Button>
                            <Button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleJoinGroup(group.id)
                              }}
                              className={`flex-1 text-sm ${
                                isJoined ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
                              }`}
                            >
                              {isJoined ? (
                                <>
                                  <Shield className="h-4 w-4 mr-2" />
                                  Joined
                                </>
                              ) : (
                                <>
                                  <UserPlus className="h-4 w-4 mr-2" />
                                  Join
                                </>
                              )}
                            </Button>
                          </div>

                          {/* Send Invitation Button */}
                          <Button
                            variant="ghost"
                            className="w-full mt-2 text-sm text-blue-600 hover:bg-blue-50"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleOpenInviteDialog(group)
                            }}
                          >
                            <Mail className="h-4 w-4 mr-2" />
                            Send Invitation
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Invitation Dialog */}
      <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {selectedGroupForInvite ? `Invite to ${selectedGroupForInvite.name}` : "Send Group Invitation"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="invite-email">Email ID *</Label>
              <Input
                id="invite-email"
                type="email"
                placeholder="Enter recipient's email address"
                value={inviteData.email}
                onChange={(e) => setInviteData({ ...inviteData, email: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="invite-subject">Subject *</Label>
              <Input
                id="invite-subject"
                placeholder="Enter invitation subject"
                value={inviteData.subject}
                onChange={(e) => setInviteData({ ...inviteData, subject: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="invite-description">Description *</Label>
              <Textarea
                id="invite-description"
                placeholder="Add a customizable message for the invitation..."
                value={inviteData.description}
                onChange={(e) => setInviteData({ ...inviteData, description: e.target.value })}
                className="min-h-[100px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setInviteDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSendInvitation}
              disabled={!isInviteFormValid || isSubmitting}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isSubmitting ? "Sending..." : "Send"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  )
}
