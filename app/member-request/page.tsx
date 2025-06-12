"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserPlus, User, Check, X, UserMinus, UserCheck, Clock, Star, Users } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { AppLayout } from "@/components/app-layout"

export default function MemberRequestPage() {
  // Sample follow requests data
  const [followRequests, setFollowRequests] = useState([
    {
      id: 1,
      name: "Sarah Mitchell",
      username: "SarahM_Landowner",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
      verified: true,
      reputation: 4.9,
      mutualConnections: 12,
      requestDate: "2 days ago",
      bio: "Mineral rights owner in Texas with 15+ years experience",
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      username: "MarcusR_Geology",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      verified: true,
      reputation: 4.8,
      mutualConnections: 8,
      requestDate: "1 week ago",
      bio: "Geologist specializing in Permian Basin formations",
    },
    {
      id: 3,
      name: "Jennifer Walsh",
      username: "JenW_EagleForrd",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      verified: false,
      reputation: 4.6,
      mutualConnections: 5,
      requestDate: "3 days ago",
      bio: "Eagle Ford landowner and lease negotiation expert",
    },
  ])

  // Sample following data
  const [following, setFollowing] = useState([
    {
      id: 1,
      name: "GeologyExpertTX",
      username: "geology_expert_tx",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=40&h=40&fit=crop&crop=face",
      verified: true,
      reputation: 4.9,
      followedDate: "3 months ago",
      bio: "Professional geologist with 20+ years in Texas oil fields",
      isFollowingBack: true,
    },
    {
      id: 2,
      name: "PermianLandman",
      username: "permian_landman",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=40&h=40&fit=crop&crop=face",
      verified: true,
      reputation: 4.7,
      followedDate: "2 months ago",
      bio: "Certified landman specializing in Permian Basin acquisitions",
      isFollowingBack: false,
    },
    {
      id: 3,
      name: "RoyaltyExpert",
      username: "royalty_expert",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      verified: true,
      reputation: 4.8,
      followedDate: "1 month ago",
      bio: "Helping landowners understand their royalty statements",
      isFollowingBack: true,
    },
    {
      id: 4,
      name: "TexasLandowner",
      username: "texas_landowner",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
      verified: false,
      reputation: 4.5,
      followedDate: "2 weeks ago",
      bio: "Multi-generational landowner in East Texas",
      isFollowingBack: true,
    },
  ])

  // Sample followers data
  const [followers, setFollowers] = useState([
    {
      id: 1,
      name: "MineralRightsGuru",
      username: "mineral_rights_guru",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
      verified: true,
      reputation: 4.9,
      followedDate: "1 month ago",
      bio: "Consultant helping landowners maximize their mineral rights value",
      isFollowingBack: true,
    },
    {
      id: 2,
      name: "OilAndGasExpert",
      username: "oil_gas_expert",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      verified: true,
      reputation: 4.7,
      followedDate: "3 weeks ago",
      bio: "Industry analyst covering oil and gas market trends",
      isFollowingBack: false,
    },
    {
      id: 3,
      name: "LeaseNegotiator",
      username: "lease_negotiator",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      verified: false,
      reputation: 4.6,
      followedDate: "2 weeks ago",
      bio: "Attorney specializing in oil and gas lease negotiations",
      isFollowingBack: true,
    },
    {
      id: 4,
      name: "DrillingSupervisor",
      username: "drilling_supervisor",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=40&h=40&fit=crop&crop=face",
      verified: true,
      reputation: 4.8,
      followedDate: "1 week ago",
      bio: "Field supervisor with expertise in horizontal drilling operations",
      isFollowingBack: false,
    },
    {
      id: 5,
      name: "LandmanPro",
      username: "landman_pro",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      verified: true,
      reputation: 4.7,
      followedDate: "5 days ago",
      bio: "Professional landman with focus on title research and due diligence",
      isFollowingBack: true,
    },
  ])

  const handleAcceptRequest = (requestId: number) => {
    const request = followRequests.find((req) => req.id === requestId)
    if (request) {
      // Add to followers
      setFollowers([
        ...followers,
        {
          id: request.id,
          name: request.name,
          username: request.username,
          avatar: request.avatar,
          verified: request.verified,
          reputation: request.reputation,
          followedDate: "Just now",
          bio: request.bio,
          isFollowingBack: false,
        },
      ])
      // Remove from requests
      setFollowRequests(followRequests.filter((req) => req.id !== requestId))
    }
  }

  const handleDeclineRequest = (requestId: number) => {
    setFollowRequests(followRequests.filter((req) => req.id !== requestId))
  }

  const handleUnfollow = (userId: number) => {
    setFollowing(following.filter((user) => user.id !== userId))
  }

  const handleFollowBack = (userId: number) => {
    const user = followers.find((follower) => follower.id === userId)
    if (user) {
      setFollowing([
        ...following,
        {
          id: user.id,
          name: user.name,
          username: user.username,
          avatar: user.avatar,
          verified: user.verified,
          reputation: user.reputation,
          followedDate: "Just now",
          bio: user.bio,
          isFollowingBack: true,
        },
      ])
      // Update follower to show they're being followed back
      setFollowers(
        followers.map((follower) => (follower.id === userId ? { ...follower, isFollowingBack: true } : follower)),
      )
    }
  }

  const handleRemoveFollower = (userId: number) => {
    setFollowers(followers.filter((follower) => follower.id !== userId))
  }

  return (
    <AppLayout pageTitle="Member Requests" searchPlaceholder="Search members...">
      <div className="p-4 lg:p-6">
        <div className="max-w-4xl mx-auto">
          {/* Start directly with Stats Cards, remove the page header */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-xl lg:text-2xl font-bold text-orange-600 mb-1">{followRequests.length}</div>
                <div className="text-sm text-gray-600">Pending Requests</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-xl lg:text-2xl font-bold text-blue-600 mb-1">{following.length}</div>
                <div className="text-sm text-gray-600">Following</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-xl lg:text-2xl font-bold text-green-600 mb-1">{followers.length}</div>
                <div className="text-sm text-gray-600">Followers</div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="requests" className="w-full">
            <TabsList className="grid w-full grid-cols-3 h-12">
              <TabsTrigger value="requests" className="text-sm lg:text-base font-bold flex items-center gap-2">
                <Clock className="h-4 w-4 lg:h-5 lg:w-5 text-orange-500" />
                <span className="hidden sm:inline">Follow Requests</span>
                <span className="sm:hidden">Requests</span>
                {followRequests.length > 0 && (
                  <Badge variant="secondary" className="bg-red-500 text-white text-xs">
                    {followRequests.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="following" className="text-sm lg:text-base font-bold flex items-center gap-2">
                <UserCheck className="h-4 w-4 lg:h-5 lg:w-5 text-blue-500" />
                <span>Following</span>
              </TabsTrigger>
              <TabsTrigger value="followers" className="text-sm lg:text-base font-bold flex items-center gap-2">
                <Users className="h-4 w-4 lg:h-5 lg:w-5 text-green-500" />
                <span>Followers</span>
              </TabsTrigger>
            </TabsList>

            {/* Follow Requests Tab */}
            <TabsContent value="requests" className="mt-6">
              <div className="space-y-4">
                {followRequests.length === 0 ? (
                  <Card className="text-center py-12">
                    <CardContent>
                      <Clock className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No Pending Requests</h3>
                      <p className="text-gray-600">You don't have any follow requests at the moment.</p>
                    </CardContent>
                  </Card>
                ) : (
                  followRequests.map((request) => (
                    <Card key={request.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-12 w-12 flex-shrink-0">
                            <AvatarImage src={request.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{request.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-gray-900 break-words">{request.name}</h3>
                              {request.verified && (
                                <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                                  Verified
                                </Badge>
                              )}
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 text-yellow-500" fill="currentColor" />
                                <span className="text-xs text-gray-500">{request.reputation}</span>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 mb-1">@{request.username}</p>
                            <p className="text-sm text-gray-700 mb-2 break-words">{request.bio}</p>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <span>{request.mutualConnections} mutual connections</span>
                              <span>Requested {request.requestDate}</span>
                            </div>
                          </div>
                          <div className="flex gap-2 flex-shrink-0">
                            <Button
                              onClick={() => handleAcceptRequest(request.id)}
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <Check className="h-4 w-4 mr-1" />
                              Accept
                            </Button>
                            <Button
                              onClick={() => handleDeclineRequest(request.id)}
                              variant="outline"
                              size="sm"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <X className="h-4 w-4 mr-1" />
                              Decline
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            {/* Following Tab */}
            <TabsContent value="following" className="mt-6">
              <div className="space-y-4">
                {following.map((user) => (
                  <Card key={user.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12 flex-shrink-0">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{user.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-gray-900 break-words">{user.name}</h3>
                            {user.verified && (
                              <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                                Verified
                              </Badge>
                            )}
                            {user.isFollowingBack && (
                              <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                                Follows you
                              </Badge>
                            )}
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 text-yellow-500" fill="currentColor" />
                              <span className="text-xs text-gray-500">{user.reputation}</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">@{user.username}</p>
                          <p className="text-sm text-gray-700 mb-2 break-words">{user.bio}</p>
                          <div className="text-xs text-gray-500">Following since {user.followedDate}</div>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/profile/${user.username}`}>
                              <User className="h-4 w-4 mr-1" />
                              View Profile
                            </Link>
                          </Button>
                          <Button
                            onClick={() => handleUnfollow(user.id)}
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <UserMinus className="h-4 w-4 mr-1" />
                            Unfollow
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Followers Tab */}
            <TabsContent value="followers" className="mt-6">
              <div className="space-y-4">
                {followers.map((follower) => (
                  <Card key={follower.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12 flex-shrink-0">
                          <AvatarImage src={follower.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{follower.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-gray-900 break-words">{follower.name}</h3>
                            {follower.verified && (
                              <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                                Verified
                              </Badge>
                            )}
                            {follower.isFollowingBack && (
                              <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                                Following
                              </Badge>
                            )}
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 text-yellow-500" fill="currentColor" />
                              <span className="text-xs text-gray-500">{follower.reputation}</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">@{follower.username}</p>
                          <p className="text-sm text-gray-700 mb-2 break-words">{follower.bio}</p>
                          <div className="text-xs text-gray-500">Following you since {follower.followedDate}</div>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/profile/${follower.username}`}>
                              <User className="h-4 w-4 mr-1" />
                              View Profile
                            </Link>
                          </Button>
                          {!follower.isFollowingBack ? (
                            <Button
                              onClick={() => handleFollowBack(follower.id)}
                              size="sm"
                              className="bg-blue-600 hover:bg-blue-700"
                            >
                              <UserPlus className="h-4 w-4 mr-1" />
                              Follow Back
                            </Button>
                          ) : (
                            <Button
                              onClick={() => handleRemoveFollower(follower.id)}
                              variant="outline"
                              size="sm"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <UserMinus className="h-4 w-4 mr-1" />
                              Remove
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AppLayout>
  )
}
