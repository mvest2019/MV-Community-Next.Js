"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { UserMinus, Eye, Lock, Users, Plus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { AppLayout } from "@/components/app-layout"
import { ManageGroupDialog } from "@/components/manage-group-dialog"

export default function MyGroupsPage() {
  const [confirmLeave, setConfirmLeave] = useState<number | null>(null)

  // Sample created groups data - only groups created by the user
  const [createdGroups, setCreatedGroups] = useState([
    {
      id: 1,
      name: "Texas Mineral Rights Owners",
      description: "A community for mineral rights owners in Texas to share experiences and advice.",
      memberCount: 2847,
      postCount: 1234,
      category: "Regional",
      privacy: "Private",
      joinedDate: "March 2023",
      role: "Admin",
      isCreator: true,
      avatar: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=80&h=80&fit=crop",
      isActive: true,
      lastActivity: "2 hours ago",
      moderators: ["GeologyExpertTX", "TexasLandman"],
    },
    {
      id: 2,
      name: "Permian Basin Landowners",
      description:
        "Dedicated to landowners in the Permian Basin region. Share drilling updates, lease negotiations, and market insights.",
      memberCount: 1456,
      postCount: 892,
      category: "Regional",
      privacy: "Public",
      joinedDate: "January 2024",
      role: "Admin",
      isCreator: true,
      avatar: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=80&h=80&fit=crop",
      isActive: true,
      lastActivity: "1 hour ago",
      moderators: ["PermianExpert", "John Doe"],
    },
    {
      id: 3,
      name: "Lease Negotiation Experts",
      description: "Professional group for sharing lease negotiation strategies, legal advice, and best practices.",
      memberCount: 892,
      postCount: 567,
      category: "Professional",
      privacy: "Private",
      joinedDate: "June 2023",
      role: "Admin",
      isCreator: true,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop",
      isActive: true,
      lastActivity: "5 hours ago",
      moderators: ["LegalEagle", "ContractPro"],
    },
    {
      id: 4,
      name: "Eagle Ford Shale Community",
      description: "Connect with other landowners and industry professionals in the Eagle Ford Shale region.",
      memberCount: 634,
      postCount: 423,
      category: "Regional",
      privacy: "Private",
      joinedDate: "September 2023",
      role: "Admin",
      isCreator: true,
      avatar: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=80&h=80&fit=crop",
      isActive: false,
      lastActivity: "2 weeks ago",
      moderators: ["EagleFordExpert"],
    },
    {
      id: 5,
      name: "Royalty Payment Issues",
      description: "Support group for landowners dealing with royalty payment problems and disputes.",
      memberCount: 1123,
      postCount: 789,
      category: "Support",
      privacy: "Private",
      joinedDate: "November 2023",
      role: "Admin",
      isCreator: true,
      avatar: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=80&h=80&fit=crop",
      isActive: true,
      lastActivity: "3 hours ago",
      moderators: ["RoyaltyExpert", "PaymentPro"],
    },
  ])

  // Sample groups available for merging (other groups created by the user)
  const otherCreatedGroups = [
    {
      id: 6,
      name: "Oklahoma Mineral Rights",
      description: "Community for Oklahoma mineral rights owners",
      memberCount: 1234,
      postCount: 567,
      category: "Regional",
      privacy: "Private",
      avatar: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=80&h=80&fit=crop",
    },
    {
      id: 7,
      name: "New Mexico Landowners",
      description: "Group for New Mexico landowners and mineral rights",
      memberCount: 890,
      postCount: 445,
      category: "Regional",
      privacy: "Private",
      avatar: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=80&h=80&fit=crop",
    },
    {
      id: 8,
      name: "Colorado Energy Rights",
      description: "Colorado-based energy and mineral rights community",
      memberCount: 567,
      postCount: 234,
      category: "Regional",
      privacy: "Private",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop",
    },
  ]

  const handleDeleteGroup = (groupId: number) => {
    setCreatedGroups(createdGroups.filter((group) => group.id !== groupId))
    setConfirmLeave(null)
  }

  const handleCardClick = (groupId: number) => {
    window.location.href = `/groups/${groupId}`
  }

  return (
    <AppLayout pageTitle="My Groups" searchPlaceholder="Search groups...">
      <div className="p-3 sm:p-4 lg:p-6">
        <div className="max-w-6xl mx-auto">
          {/* Subtitle */}
          <div className="mb-6">
            <p className="text-gray-600">Groups that you have created and manage</p>
          </div>

          {/* Groups Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {createdGroups.map((group) => (
              <Card
                key={group.id}
                className="hover:shadow-lg transition-shadow cursor-pointer group"
                onClick={() => handleCardClick(group.id)}
              >
                <CardContent className="p-3 sm:p-4">
                  {/* Group Image */}
                  <div className="relative h-24 sm:h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-t-lg overflow-hidden">
                    <Image
                      src={group.avatar || "/placeholder.svg"}
                      alt={group.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute top-3 right-3 flex gap-2">
                      {group.privacy === "Private" && (
                        <Badge
                          variant="secondary"
                          className="bg-red-500/90 text-white border-0 text-xs px-2 py-1 sm:px-3 sm:py-1"
                        >
                          <Lock className="h-3 w-3 mr-1" />
                          Private
                        </Badge>
                      )}
                      <Badge
                        variant="secondary"
                        className="bg-green-500/90 text-white border-0 text-xs px-2 py-1 sm:px-3 sm:py-1"
                      >
                        Creator
                      </Badge>
                    </div>
                  </div>

                  {/* Group Content */}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-base sm:text-lg text-gray-900 break-words mb-1">
                          {group.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600 break-words line-clamp-2 mb-2">
                          {group.description}
                        </p>
                        <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>{group.memberCount}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span>{group.postCount} posts</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-2">
                      <Button
                        variant="outline"
                        className="w-full sm:flex-1 text-xs sm:text-sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          window.location.href = `/groups/${group.id}`
                        }}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Group
                      </Button>
                      {group.privacy === "Private" && group.isCreator && (
                        <div onClick={(e) => e.stopPropagation()}>
                          <ManageGroupDialog
                            group={group}
                            otherGroups={otherCreatedGroups.filter((g) => g.id !== group.id)}
                          />
                        </div>
                      )}
                      <Dialog open={confirmLeave === group.id} onOpenChange={(open) => !open && setConfirmLeave(null)}>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                            onClick={(e) => {
                              e.stopPropagation()
                              setConfirmLeave(group.id)
                            }}
                          >
                            <UserMinus className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent onClick={(e) => e.stopPropagation()}>
                          <DialogHeader>
                            <DialogTitle>Delete Group</DialogTitle>
                          </DialogHeader>
                          <div className="py-0">
                            <p className="text-gray-600">
                              Are you sure you want to delete <span className="font-semibold">{group.name}</span>?
                              <span className="text-red-600 block mt-2">
                                ⚠️ This action cannot be undone. All content and members will be permanently removed.
                              </span>
                            </p>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setConfirmLeave(null)}>
                              Cancel
                            </Button>
                            <Button
                              variant="destructive"
                              onClick={() => handleDeleteGroup(group.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Delete Group
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {createdGroups.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Groups Created</h3>
                <p className="text-gray-600 mb-4">You haven't created any groups yet. Start building your community!</p>
                <Button asChild>
                  <Link href="/community">
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Group
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AppLayout>
  )
}
