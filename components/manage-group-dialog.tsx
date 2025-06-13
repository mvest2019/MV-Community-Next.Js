"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Settings, Users, MessageSquare, Clock, Search, X, UserMinus, Mail, Copy, ArrowRightLeft } from "lucide-react"
import Image from "next/image"

interface Member {
  id: number
  name: string
  username: string
  email: string
  avatar: string | null
  role: string
  joinedDate: string
}

interface Group {
  id: number
  name: string
  description: string
  memberCount: number
  postCount: number
  category: string
  privacy: string
  avatar: string
  lastActivity?: string
}

interface ManageGroupDialogProps {
  group: Group
  otherGroups: Group[]
}

export function ManageGroupDialog({ group, otherGroups }: ManageGroupDialogProps) {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [inviteEmail, setInviteEmail] = useState("")
  const [inviteLink, setInviteLink] = useState("")
  const [showCloseConfirm, setShowCloseConfirm] = useState(false)
  const [showMergeConfirm, setShowMergeConfirm] = useState(false)
  const [selectedGroupToMerge, setSelectedGroupToMerge] = useState<string>("")
  const [isOpen, setIsOpen] = useState(false)

  // Sample members data
  const [members, setMembers] = useState<Member[]>([
    {
      id: 1,
      name: "John Doe",
      username: "johndoe",
      email: "john.doe@example.com",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      role: "Admin",
      joinedDate: "March 2023",
    },
    {
      id: 2,
      name: "Sarah Mitchell",
      username: "sarahm",
      email: "sarah.mitchell@example.com",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
      role: "Moderator",
      joinedDate: "April 2023",
    },
    {
      id: 3,
      name: "Marcus Rodriguez",
      username: "marcusr",
      email: "marcus.rodriguez@example.com",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      role: "Member",
      joinedDate: "May 2023",
    },
    {
      id: 4,
      name: "Jennifer Walsh",
      username: "jenniferw",
      email: "jennifer.walsh@example.com",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      role: "Member",
      joinedDate: "June 2023",
    },
    {
      id: 5,
      name: "David Chen",
      username: "davidc",
      email: "david.chen@example.com",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
      role: "Member",
      joinedDate: "July 2023",
    },
    {
      id: 6,
      name: "Emily Johnson",
      username: "emilyj",
      email: "emily.johnson@example.com",
      avatar: null,
      role: "Member",
      joinedDate: "August 2023",
    },
    {
      id: 7,
      name: "Michael Brown",
      username: "michaelb",
      email: "michael.brown@example.com",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=40&h=40&fit=crop&crop=face",
      role: "Member",
      joinedDate: "September 2023",
    },
    {
      id: 8,
      name: "Lisa Taylor",
      username: "lisat",
      email: "lisa.taylor@example.com",
      avatar: null,
      role: "Member",
      joinedDate: "October 2023",
    },
  ])

  // Generate invite link when dialog opens
  useEffect(() => {
    if (isOpen) {
      setInviteLink(`https://mineralview.com/invite/${group.id}/${generateRandomString(8)}`)
    }
  }, [isOpen, group.id])

  // Filter members based on search query
  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.username.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Generate a random string for invite links
  const generateRandomString = (length: number) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    let result = ""
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
  }

  // Handle member removal
  const handleRemoveMember = (memberId: number) => {
    setMembers(members.filter((member) => member.id !== memberId))
    toast({
      title: "Member removed",
      description: "The member has been removed from the group.",
    })
  }

  // Handle invite by email
  const handleInvite = () => {
    if (!inviteEmail.trim()) return

    toast({
      title: "Invitation sent",
      description: `An invitation has been sent to ${inviteEmail}`,
    })
    setInviteEmail("")
  }

  // Handle copy invite link
  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink)
    toast({
      title: "Link copied",
      description: "Invite link has been copied to clipboard",
    })
  }

  // Handle close group
  const handleCloseGroup = () => {
    setShowCloseConfirm(false)
    setIsOpen(false)
    toast({
      title: "Group closed",
      description: `The group "${group.name}" has been closed.`,
      variant: "destructive",
    })
  }

  // Handle merge group
  const handleMergeGroup = () => {
    const targetGroup = otherGroups.find((g) => g.id.toString() === selectedGroupToMerge)
    setShowMergeConfirm(false)
    setIsOpen(false)

    if (targetGroup) {
      toast({
        title: "Groups merged",
        description: `"${group.name}" has been merged into "${targetGroup.name}".`,
      })
    }
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Manage
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0">
          <DialogHeader className="px-6 pt-3 pb-1">
            <DialogTitle className="text-xl flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Manage Group
            </DialogTitle>
          </DialogHeader>

          <div className="px-6 overflow-hidden">
            {/* Top Group Info Section */}
            <Card className="mb-4">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <div className="relative h-16 w-16 rounded-lg overflow-hidden flex-shrink-0">
                    <Image src={group.avatar || "/placeholder.svg"} alt={group.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">{group.name}</h3>
                    <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4 text-blue-500" />
                        <span>{group.postCount} threads</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-green-500" />
                        <span>{group.memberCount} members</span>
                      </div>
                      {group.lastActivity && (
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-orange-500" />
                          <span>Last post {group.lastActivity}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <Badge variant="outline" className="capitalize">
                    {group.privacy}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Two Column Layout for Members and Invite */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
              {/* Member List Section */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                      <Users className="h-4 w-4 text-blue-500" />
                      Members ({members.length})
                    </h3>
                  </div>

                  <div className="mb-3">
                    <div className="relative">
                      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search members..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-8 h-8 text-sm"
                      />
                    </div>
                  </div>

                  <ScrollArea className="h-[300px] rounded-md border">
                    <div className="p-3 space-y-2">
                      {filteredMembers.length > 0 ? (
                        filteredMembers.map((member) => (
                          <div
                            key={member.id}
                            className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md"
                          >
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                              <Avatar className="h-8 w-8 flex-shrink-0">
                                <AvatarImage src={member.avatar || undefined} />
                                <AvatarFallback>{member.name[0]}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <div className="font-medium text-sm truncate">{member.name}</div>
                                <div className="text-xs text-gray-500 truncate">@{member.username}</div>
                              </div>
                              <Badge
                                variant="outline"
                                className={`text-xs flex-shrink-0 ${
                                  member.role === "Admin"
                                    ? "bg-blue-50 text-blue-700 border-blue-200"
                                    : member.role === "Moderator"
                                      ? "bg-green-50 text-green-700 border-green-200"
                                      : "bg-gray-50 text-gray-700 border-gray-200"
                                }`}
                              >
                                {member.role}
                              </Badge>
                            </div>
                            {member.role !== "Admin" && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 flex-shrink-0 ml-2"
                                onClick={() => handleRemoveMember(member.id)}
                              >
                                <UserMinus className="h-4 w-4" />
                                <span className="sr-only">Remove member</span>
                              </Button>
                            )}
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8 text-gray-500 text-sm">
                          No members found matching "{searchQuery}"
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Invite People Section */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Mail className="h-4 w-4 text-blue-500" />
                    Invite People
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Invite by Email</label>
                      <div className="flex gap-2">
                        <div className="flex-1">
                          <Input
                            placeholder="Enter email address"
                            type="email"
                            value={inviteEmail}
                            onChange={(e) => setInviteEmail(e.target.value)}
                            className="text-sm"
                          />
                        </div>
                        <Button onClick={handleInvite} disabled={!inviteEmail.trim()} size="sm">
                          Send
                        </Button>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Share Invite Link</label>
                      <div className="space-y-2">
                        <div className="bg-gray-50 border rounded-md px-3 py-2 text-sm text-gray-600 break-all max-h-20 overflow-y-auto">
                          {inviteLink}
                        </div>
                        <Button variant="outline" size="sm" className="w-full" onClick={handleCopyLink}>
                          <Copy className="h-4 w-4 mr-2" />
                          Copy Invite Link
                        </Button>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <div className="text-xs text-gray-500 space-y-1">
                        <p>• Email invites are sent immediately</p>
                        <p>• Invite links expire in 7 days</p>
                        <p>• New members will need approval for private groups</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Group Actions Section - Removed title and border */}
            <div className="mb-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="outline"
                  className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                  onClick={() => setShowCloseConfirm(true)}
                >
                  <X className="h-4 w-4 mr-2" />
                  Close Group
                </Button>

                <div className="flex-1 flex flex-col sm:flex-row gap-2">
                  <Select value={selectedGroupToMerge} onValueChange={setSelectedGroupToMerge}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select group to merge into" />
                    </SelectTrigger>
                    <SelectContent>
                      {otherGroups.length > 0 ? (
                        otherGroups.map((otherGroup) => (
                          <SelectItem key={otherGroup.id} value={otherGroup.id.toString()}>
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded overflow-hidden flex-shrink-0">
                                <Image
                                  src={otherGroup.avatar || "/placeholder.svg"}
                                  alt={otherGroup.name}
                                  width={24}
                                  height={24}
                                  className="object-cover"
                                />
                              </div>
                              <span className="truncate">{otherGroup.name}</span>
                            </div>
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="no-groups" disabled>
                          No other groups available
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  <Button
                    variant="outline"
                    disabled={!selectedGroupToMerge || otherGroups.length === 0}
                    onClick={() => setShowMergeConfirm(true)}
                    className="sm:w-auto w-full"
                  >
                    <ArrowRightLeft className="h-4 w-4 mr-2" />
                    Merge Group
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="px-6 py-4 border-t">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Close Group Confirmation Dialog */}
      <AlertDialog open={showCloseConfirm} onOpenChange={setShowCloseConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Close Group</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to close this group? This action cannot be undone. All content will be archived and
              members will no longer have access.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleCloseGroup} className="bg-red-600 hover:bg-red-700">
              Yes, Close Group
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Merge Group Confirmation Dialog */}
      <AlertDialog open={showMergeConfirm} onOpenChange={setShowMergeConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Merge Group</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to merge this group into{" "}
              <span className="font-semibold">
                {otherGroups.find((g) => g.id.toString() === selectedGroupToMerge)?.name}
              </span>
              ?
              <br />
              <br />
              All members and content will be transferred to the selected group. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleMergeGroup} className="bg-blue-600 hover:bg-blue-700">
              Confirm Merge
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
