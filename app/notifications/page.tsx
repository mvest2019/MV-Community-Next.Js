"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Bell,
  MessageSquare,
  ThumbsUp,
  UserPlus,
  Users,
  Award,
  Settings,
  Check,
  CheckCheck,
  Trash2,
  MoreHorizontal,
  Filter,
  Clock,
  Star,
  Share2,
  AlertCircle,
  Info,
} from "lucide-react"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { AppLayout } from "@/components/app-layout"
import Link from "next/link"

export default function NotificationsPage() {
  const searchParams = useSearchParams()
  const tabFromUrl = searchParams.get("tab")
  const [activeTab, setActiveTab] = useState(tabFromUrl === "settings" ? "settings" : "notifications")

  useEffect(() => {
    if (tabFromUrl === "settings") {
      setActiveTab("settings")
    }
  }, [tabFromUrl])

  // ... rest of the existing state and data remains the same ...

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "reply",
      title: "New reply to your post",
      message: "GeologyExpertTX replied to your question about royalty payment delays",
      user: {
        name: "GeologyExpertTX",
        avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=40&h=40&fit=crop&crop=face",
        verified: true,
      },
      timestamp: "2 minutes ago",
      isRead: false,
      actionUrl: "/groups/1",
      priority: "normal",
    },
    {
      id: 2,
      type: "like",
      title: "Your post received likes",
      message: "3 people liked your post about lease negotiation tips",
      user: {
        name: "Multiple Users",
        avatar: null,
        verified: false,
      },
      timestamp: "15 minutes ago",
      isRead: false,
      actionUrl: "/home-feed",
      priority: "low",
    },
    {
      id: 3,
      type: "follow",
      title: "New follower",
      message: "Sarah Mitchell started following you",
      user: {
        name: "Sarah Mitchell",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
        verified: true,
      },
      timestamp: "1 hour ago",
      isRead: false,
      actionUrl: "/member-request",
      priority: "normal",
    },
    {
      id: 4,
      type: "group_activity",
      title: "New post in your group",
      message: "5 new posts in Texas Mineral Rights Owners group",
      user: {
        name: "Texas Mineral Rights Owners",
        avatar: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=40&h=40&fit=crop",
        verified: false,
      },
      timestamp: "2 hours ago",
      isRead: true,
      actionUrl: "/groups/1",
      priority: "normal",
    },
    {
      id: 5,
      type: "best_answer",
      title: "Your answer was marked as best",
      message: "Your answer about lease terms was marked as the best answer",
      user: {
        name: "System",
        avatar: null,
        verified: false,
      },
      timestamp: "3 hours ago",
      isRead: true,
      actionUrl: "/profile",
      priority: "high",
    },
    {
      id: 6,
      type: "mention",
      title: "You were mentioned",
      message: "RoyaltyExpert mentioned you in a discussion about payment delays",
      user: {
        name: "RoyaltyExpert",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
        verified: true,
      },
      timestamp: "5 hours ago",
      isRead: true,
      actionUrl: "/community",
      priority: "high",
    },
    {
      id: 7,
      type: "group_invite",
      title: "Group invitation",
      message: "You've been invited to join Permian Basin Landowners",
      user: {
        name: "PermianExpert",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=40&h=40&fit=crop&crop=face",
        verified: true,
      },
      timestamp: "1 day ago",
      isRead: true,
      actionUrl: "/public-groups",
      priority: "normal",
    },
    {
      id: 8,
      type: "system",
      title: "Community update",
      message: "New mineral rights legislation discussion is now live",
      user: {
        name: "MineralView Team",
        avatar: null,
        verified: false,
      },
      timestamp: "2 days ago",
      isRead: true,
      actionUrl: "/community",
      priority: "low",
    },
  ])

  const [notificationSettings, setNotificationSettings] = useState({
    replies: true,
    likes: true,
    follows: true,
    mentions: true,
    groupActivity: true,
    bestAnswers: true,
    systemUpdates: false,
    emailNotifications: true,
    pushNotifications: true,
  })

  const [selectedFilter, setSelectedFilter] = useState("all")

  // ... rest of the existing functions remain the same ...

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "reply":
        return <MessageSquare className="h-5 w-5 text-blue-500" />
      case "like":
        return <ThumbsUp className="h-5 w-5 text-green-500" />
      case "follow":
        return <UserPlus className="h-5 w-5 text-purple-500" />
      case "group_activity":
        return <Users className="h-5 w-5 text-orange-500" />
      case "best_answer":
        return <Award className="h-5 w-5 text-yellow-500" />
      case "mention":
        return <Star className="h-5 w-5 text-pink-500" />
      case "group_invite":
        return <Users className="h-5 w-5 text-indigo-500" />
      case "system":
        return <Info className="h-5 w-5 text-gray-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-red-500"
      case "normal":
        return "border-l-blue-500"
      case "low":
        return "border-l-gray-300"
      default:
        return "border-l-gray-300"
    }
  }

  const markAsRead = (notificationId: number) => {
    setNotifications(notifications.map((notif) => (notif.id === notificationId ? { ...notif, isRead: true } : notif)))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, isRead: true })))
  }

  const deleteNotification = (notificationId: number) => {
    setNotifications(notifications.filter((notif) => notif.id !== notificationId))
  }

  const filteredNotifications = notifications.filter((notif) => {
    if (selectedFilter === "all") return true
    if (selectedFilter === "unread") return !notif.isRead
    if (selectedFilter === "read") return notif.isRead
    return notif.type === selectedFilter
  })

  const unreadCount = notifications.filter((notif) => !notif.isRead).length

  return (
    <AppLayout pageTitle="Notifications" searchPlaceholder="Search notifications...">
      <div className="p-4 lg:p-6">
        <div className="max-w-4xl mx-auto">
          {/* Action buttons section - moved to left side */}
          <div className="mb-6 flex justify-start gap-2">
            {unreadCount > 0 && (
              <Button onClick={markAllAsRead} variant="outline" size="sm">
                <CheckCheck className="h-4 w-4 mr-2" />
                Mark All Read
              </Button>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuItem onClick={() => setSelectedFilter("all")}>
                  <Bell className="mr-2 h-4 w-4" />
                  All Notifications
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedFilter("unread")}>
                  <AlertCircle className="mr-2 h-4 w-4" />
                  Unread Only
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedFilter("read")}>
                  <Check className="mr-2 h-4 w-4" />
                  Read Only
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setSelectedFilter("reply")}>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Replies
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedFilter("like")}>
                  <ThumbsUp className="mr-2 h-4 w-4" />
                  Likes
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedFilter("follow")}>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Follows
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedFilter("mention")}>
                  <Star className="mr-2 h-4 w-4" />
                  Mentions
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 h-12">
              <TabsTrigger value="notifications" className="text-sm lg:text-base font-bold flex items-center gap-2">
                <Bell className="h-4 w-4 lg:h-5 lg:w-5 text-yellow-500" />
                Notifications ({filteredNotifications.length})
              </TabsTrigger>
              <TabsTrigger value="settings" className="text-sm lg:text-base font-bold flex items-center gap-2">
                <Settings className="h-4 w-4 lg:h-5 lg:w-5 text-gray-500" />
                Settings
              </TabsTrigger>
            </TabsList>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="mt-6">
              <div className="space-y-3">
                {filteredNotifications.length === 0 ? (
                  <Card className="text-center py-12">
                    <CardContent>
                      <Bell className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No Notifications</h3>
                      <p className="text-gray-600">
                        {selectedFilter === "unread"
                          ? "You're all caught up! No unread notifications."
                          : "You don't have any notifications yet."}
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  filteredNotifications.map((notification) => (
                    <Card
                      key={notification.id}
                      className={`hover:shadow-md transition-shadow cursor-pointer border-l-4 ${getPriorityColor(
                        notification.priority,
                      )} ${!notification.isRead ? "bg-blue-50 border-blue-200" : "bg-white"}`}
                    >
                <CardContent className="p-4">
  <div className="flex items-start gap-4">
    {/* Notification Icon */}
    <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>

    {/* User Avatar */}
    <Avatar className="h-10 w-10 flex-shrink-0">
      <AvatarImage src={notification.user.avatar || "/placeholder.svg"} />
      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
        {notification.user.name[0]}
      </AvatarFallback>
    </Avatar>

    {/* Notification Content */}
    <div className="flex-1 min-w-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 mb-1">
          <h3
            className={`font-medium break-words ${
              !notification.isRead ? "text-gray-900" : "text-gray-700"
            }`}
          >
            {notification.title}
          </h3>
          {!notification.isRead && (
            <div className="h-2 w-2 bg-blue-500 rounded-full flex-shrink-0"></div>
          )}
          {notification.user.verified && (
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
              Verified
            </Badge>
          )}
        </div>

        {/* 3 Dots Menu (Right side of the title) */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4 text-gray-600" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {!notification.isRead && (
              <DropdownMenuItem onClick={() => markAsRead(notification.id)}>
                <Check className="mr-2 h-4 w-4" />
                Mark as read
              </DropdownMenuItem>
            )}
            <DropdownMenuItem asChild>
              <Link href={notification.actionUrl}>
                <Share2 className="mr-2 h-4 w-4" />
                View details
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => deleteNotification(notification.id)}
              className="text-red-600"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Notification Message */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600 break-words mb-2 flex-1">{notification.message}</p>

        {/* Action Buttons (aligned to the right) */}
        <div className="ml-4 flex gap-2 items-center"> {/* Added ml-4 to give spacing between message and buttons */}
          <Button variant="outline" size="sm" asChild>
            <Link href={notification.actionUrl}>View</Link>
          </Button>
          {!notification.isRead && (
            <Button
              onClick={() => markAsRead(notification.id)}
              variant="ghost"
              size="sm"
              className="text-blue-600 hover:text-blue-700 mt-2"
            >
              Mark as read
            </Button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
        <Clock className="h-3 w-3" />
        <span>{notification.timestamp}</span>
        {notification.priority === "high" && (
          <Badge variant="destructive" className="text-xs">
            High Priority
          </Badge>
        )}
      </div>
    </div>
  </div>
</CardContent>


                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
                  <div className="space-y-6">
                    {/* Activity Notifications */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Activity Notifications</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <MessageSquare className="h-5 w-5 text-blue-500" />
                            <div>
                              <Label htmlFor="replies" className="font-medium">
                                Replies to my posts
                              </Label>
                              <p className="text-sm text-gray-600">Get notified when someone replies to your posts</p>
                            </div>
                          </div>
                          <Switch
                            id="replies"
                            checked={notificationSettings.replies}
                            onCheckedChange={(checked) =>
                              setNotificationSettings({ ...notificationSettings, replies: checked })
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <ThumbsUp className="h-5 w-5 text-green-500" />
                            <div>
                              <Label htmlFor="likes" className="font-medium">
                                Likes on my content
                              </Label>
                              <p className="text-sm text-gray-600">Get notified when someone likes your posts</p>
                            </div>
                          </div>
                          <Switch
                            id="likes"
                            checked={notificationSettings.likes}
                            onCheckedChange={(checked) =>
                              setNotificationSettings({ ...notificationSettings, likes: checked })
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Star className="h-5 w-5 text-pink-500" />
                            <div>
                              <Label htmlFor="mentions" className="font-medium">
                                Mentions
                              </Label>
                              <p className="text-sm text-gray-600">Get notified when someone mentions you</p>
                            </div>
                          </div>
                          <Switch
                            id="mentions"
                            checked={notificationSettings.mentions}
                            onCheckedChange={(checked) =>
                              setNotificationSettings({ ...notificationSettings, mentions: checked })
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Award className="h-5 w-5 text-yellow-500" />
                            <div>
                              <Label htmlFor="bestAnswers" className="font-medium">
                                Best answers
                              </Label>
                              <p className="text-sm text-gray-600">Get notified when your answer is marked as best</p>
                            </div>
                          </div>
                          <Switch
                            id="bestAnswers"
                            checked={notificationSettings.bestAnswers}
                            onCheckedChange={(checked) =>
                              setNotificationSettings({ ...notificationSettings, bestAnswers: checked })
                            }
                          />
                        </div>
                      </div>
                    </div>

                    {/* Social Notifications */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Social Notifications</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <UserPlus className="h-5 w-5 text-purple-500" />
                            <div>
                              <Label htmlFor="follows" className="font-medium">
                                New followers
                              </Label>
                              <p className="text-sm text-gray-600">Get notified when someone follows you</p>
                            </div>
                          </div>
                          <Switch
                            id="follows"
                            checked={notificationSettings.follows}
                            onCheckedChange={(checked) =>
                              setNotificationSettings({ ...notificationSettings, follows: checked })
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Users className="h-5 w-5 text-orange-500" />
                            <div>
                              <Label htmlFor="groupActivity" className="font-medium">
                                Group activity
                              </Label>
                              <p className="text-sm text-gray-600">Get notified about activity in your groups</p>
                            </div>
                          </div>
                          <Switch
                            id="groupActivity"
                            checked={notificationSettings.groupActivity}
                            onCheckedChange={(checked) =>
                              setNotificationSettings({ ...notificationSettings, groupActivity: checked })
                            }
                          />
                        </div>
                      </div>
                    </div>

                    {/* System Notifications */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">System Notifications</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Info className="h-5 w-5 text-gray-500" />
                            <div>
                              <Label htmlFor="systemUpdates" className="font-medium">
                                System updates
                              </Label>
                              <p className="text-sm text-gray-600">Get notified about platform updates and news</p>
                            </div>
                          </div>
                          <Switch
                            id="systemUpdates"
                            checked={notificationSettings.systemUpdates}
                            onCheckedChange={(checked) =>
                              setNotificationSettings({ ...notificationSettings, systemUpdates: checked })
                            }
                          />
                        </div>
                      </div>
                    </div>

                    {/* Delivery Methods */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Delivery Methods</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="emailNotifications" className="font-medium">
                              Email notifications
                            </Label>
                            <p className="text-sm text-gray-600">Receive notifications via email</p>
                          </div>
                          <Switch
                            id="emailNotifications"
                            checked={notificationSettings.emailNotifications}
                            onCheckedChange={(checked) =>
                              setNotificationSettings({ ...notificationSettings, emailNotifications: checked })
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="pushNotifications" className="font-medium">
                              Push notifications
                            </Label>
                            <p className="text-sm text-gray-600">Receive push notifications in your browser</p>
                          </div>
                          <Switch
                            id="pushNotifications"
                            checked={notificationSettings.pushNotifications}
                            onCheckedChange={(checked) =>
                              setNotificationSettings({ ...notificationSettings, pushNotifications: checked })
                            }
                          />
                        </div>
                      </div>
                    </div>

                    {/* Save Button */}
                    <div className="pt-4 border-t">
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        <Settings className="h-4 w-4 mr-2" />
                        Save Preferences
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AppLayout>
  )
}
