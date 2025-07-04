// "use client"

// import { Card, CardContent } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { MapPin, MessageSquare, Eye, Clock, TrendingUp, Users, HelpCircle, Bell } from "lucide-react"
// import { AppLayout } from "@/components/app-layout"
// import { useEffect, useState } from "react"
// import Link from "next/link"
// import { getRecentActivity } from "@/services/service"

// export default function CommunityPage() {
//   const [activeTab, setActiveTab] = useState<"featured" | "recent">("recent")

//   const featuredDiscussions = [
//     {
//       id: 1,
//       title: "What to expect in 2025 contracts?",
//       category: "Mineral Rights",
//       author: "GeologyExpertTX",
//       avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=40&h=40&fit=crop&crop=face",
//       comments: 18,
//       views: 1200,
//       badge: "Hot",
//       badgeColor: "bg-emerald-100 text-emerald-800",
//       postUrl: "/groups/1/post/1",
//     },
//     {
//       id: 2,
//       title: "Tips for negotiating better terms",
//       category: "Lease Negotiation",
//       author: "LeaseGuru",
//       avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=40&h=40&fit=crop&crop=face",
//       comments: 32,
//       views: 2500,
//       badge: null,
//       badgeColor: "",
//       postUrl: "/groups/2/post/2",
//     },
//     {
//       id: 3,
//       title: "Who to contact when drilling affects your property?",
//       category: "Drilling Issues",
//       author: "Landman411",
//       avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
//       comments: 12,
//       views: 890,
//       badge: null,
//       badgeColor: "",
//       postUrl: "/groups/3/post/3",
//     },
//     {
//       id: 4,
//       title: "Understanding your monthly statements",
//       category: "Royalty Payments",
//       author: "RoyaltyMaster",
//       avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
//       comments: 45,
//       views: 3100,
//       badge: "Trending",
//       badgeColor: "bg-yellow-100 text-yellow-800",
//       postUrl: "/groups/4/post/4",
//     },
//   ]
// function RecentActivitySkeleton() {
//   return (
//     <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 bg-white rounded-lg border mb-4 animate-pulse">
//       <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gray-200" />
//       <div className="flex-1 min-w-0">
//         <div className="h-4 bg-gray-200 rounded w-1/3 mb-2" />
//         <div className="h-3 bg-gray-100 rounded w-2/3 mb-1" />
//         <div className="h-3 bg-gray-100 rounded w-1/4" />
//       </div>
//     </div>
//   );
// }
 

//   const [recentActivity, setRecentActivity] = useState<any[]>([]);
//   const [loadingRecent, setLoadingRecent] = useState(true);

//   // Add this at the top of your file (outside the component)
// function timeAgo(dateString: string) {
//   const date = new Date(dateString);
//   const now = new Date();
//   const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

//   if (isNaN(seconds)) return ""; // Invalid date

//   if (seconds < 60) return "Just now";
//   const minutes = Math.floor(seconds / 60);
//   if (minutes < 60) return `${minutes} min${minutes > 1 ? "s" : ""} ago`;
//   const hours = Math.floor(minutes / 60);
//   if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
//   const days = Math.floor(hours / 24);
//   if (days < 30) return `${days} day${days > 1 ? "s" : ""} ago`;
//   const months = Math.floor(days / 30);
//   if (months < 12) return `${months} month${months > 1 ? "s" : ""} ago`;
//   const years = Math.floor(months / 12);
//   return `${years} year${years > 1 ? "s" : ""} ago`;
// }

//   useEffect(() => {
//     if (activeTab === "recent") {
//       setLoadingRecent(true);
//       getRecentActivity()
//         .then((data) => setRecentActivity(data))
//         .finally(() => setLoadingRecent(false));
//     }
//   }, [activeTab]);
//   return (
//     <AppLayout pageTitle="Welcome to Community" searchPlaceholder="Search...">
//       <div className="p-3 sm:p-4 lg:p-6">
//         <div className="max-w-4xl mx-auto">
//           {/* Community Stats */}
//     <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 mb-4">
//   <Card className="w-48 sm:w-64 mx-auto"> {/* Set width of card here */}
//     <CardContent className="p-3 sm:p-4 text-center">
//       <div className="flex items-center justify-center mb-2">
//         <Users className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500 mr-2" />
//         <div className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-600">2,847</div>
//       </div>
//       <div className="text-xs sm:text-sm text-gray-600">Active Members</div>
//     </CardContent>
//   </Card>
//   <Card className="w-48 sm:w-64 mx-auto"> {/* Set width of card here */}
//     <CardContent className="p-3 sm:p-4 text-center">
//       <div className="flex items-center justify-center mb-2">
//         <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mr-2" />
//         <div className="text-lg sm:text-xl lg:text-2xl font-bold text-green-600">1,234</div>
//       </div>
//       <div className="text-xs sm:text-sm text-gray-600">Discussions</div>
//     </CardContent>
//   </Card>
//   <Card className="w-48 sm:w-64 mx-auto"> {/* Set width of card here */}
//     <CardContent className="p-3 sm:p-4 text-center">
//       <div className="flex items-center justify-center mb-2">
//         <HelpCircle className="h-4 w-4 sm:h-5 sm:w-5 text-purple-500 mr-2" />
//         <div className="text-lg sm:text-xl lg:text-2xl font-bold text-purple-600">5,678</div>
//       </div>
//       <div className="text-xs sm:text-sm text-gray-600">Questions Answered</div>
//     </CardContent>
//   </Card>
// </div>



//           {/* Community Update Alert - Capsule Style */}
         

//           {/* Tab Navigation - Capsule Style */}
//           <div className="mb-4 sm:mb-6 flex justify-center">
//             <div className="bg-gray-100 p-1 rounded-full inline-flex">
//                 <button
//                 onClick={() => setActiveTab("recent")}
//                 className={`px-3 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
//                   activeTab === "recent" ? "bg-blue-600 text-white shadow-sm" : "text-gray-600 hover:text-gray-900"
//                 }`}
//               >
//                 <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 inline" />
//                 <span className="hidden sm:inline">Recent Activity</span>
//                 <span className="sm:hidden">Recent</span>
//               </button>
//               <button
//                 onClick={() => setActiveTab("featured")}
//                 className={`px-3 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
//                   activeTab === "featured" ? "bg-blue-600 text-white shadow-sm" : "text-gray-600 hover:text-gray-900"
//                 }`}
//               >
//                 <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 inline" />
//                 <span className="hidden sm:inline">Featured Discussions</span>
//                 <span className="sm:hidden">Featured</span>
//               </button>
            
//             </div>
//           </div>

//           {/* Content Area */}
//           {activeTab === "featured" && (
//             <div className="space-y-8 sm:space-y-10">
//               {featuredDiscussions.map((discussion) => (
//                 <Link key={discussion.id} href={discussion.postUrl}>
//                   <Card className="hover:shadow-md transition-shadow cursor-pointer mb-4">
//                     <CardContent className="p-4 sm:p-5">
//                       <div className="flex items-start gap-3 sm:gap-4">
//                         <Avatar className="h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0">
//                           <AvatarImage src={discussion.avatar || "/placeholder.svg"} />
//                           <AvatarFallback className="bg-blue-100 text-blue-600 text-sm">
//                             {discussion.author.slice(0, 2).toUpperCase()}
//                           </AvatarFallback>
//                         </Avatar>
//                         <div className="flex-1 min-w-0">
//                           <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
//                             <div className="flex-1 min-w-0">
//                               <h3 className="font-medium text-gray-900 mb-2 break-words text-base sm:text-lg">
//                                 <span className="text-blue-600">{discussion.category}:</span> {discussion.title}
//                               </h3>
//                               <div className="flex flex-wrap items-center gap-2 sm:gap-3 lg:gap-4 text-sm text-gray-500">
//                                 <span className="break-words">
//                                   Posted by <span className="font-medium text-blue-600">{discussion.author}</span>
//                                 </span>
//                                 <div className="flex items-center gap-1">
//                                   <MessageSquare className="h-4 w-4" />
//                                   <span>{discussion.comments} comments</span>
//                                 </div>
//                                 <div className="flex items-center gap-1">
//                                   <Eye className="h-4 w-4" />
//                                   <span>{discussion.views.toLocaleString()} views</span>
//                                 </div>
//                               </div>
//                             </div>
//                             {discussion.badge && (
//                               <Badge variant="secondary" className={`${discussion.badgeColor} flex-shrink-0 text-xs`}>
//                                 {discussion.badge}
//                               </Badge>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </Link>
//               ))}
//             </div>
//           )}

//           {activeTab === "recent" && (
//           <div className="space-y-6 sm:space-y-8">
//          {loadingRecent ? (
//       <>
//         <RecentActivitySkeleton />
//         <RecentActivitySkeleton />
//         <RecentActivitySkeleton />
//       </>
//     ) : recentActivity.length === 0 ? (
//       !loadingRecent && (
//         <div className="text-center text-gray-500 py-8">No recent activity found.</div>
//       )
//     ) : (
//            recentActivity.map((activity, idx) => (
//   <Link
//     key={`${activity.id ?? idx}-${activity.postUrl ?? idx}`}
//     href={activity.postUrl || "#"}
//   >
//                 <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 bg-white rounded-lg border hover:border-gray-300 hover:bg-gray-50 transition-colors cursor-pointer mb-4">
//                   <Avatar className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0">
//                     {/* <AvatarImage src={activity.avatar || "/placeholder.svg"} /> */}
//                     <AvatarFallback className="bg-purple-600 text-white text-lg font-semibold">
//                       {activity.userName ? activity.userName[0].toUpperCase() : "?"}
//                     </AvatarFallback>
//                   </Avatar>
//                   <div className="flex-1 min-w-0">
//                     <p className="text-sm sm:text-base break-words mb-2">
//                       {/* <span className="font-medium text-blue-600">{activity.userName}</span> */}
//                        {activity.postQuestion}{" "}
                     
//                     </p>
//                     <div className="flex flex-wrap items-center gap-2 sm:gap-3 lg:gap-4 text-xs sm:text-sm text-gray-500">
//                       <div className="flex items-center gap-1">
//                         <span className="font-medium text-blue-600">{activity.userName}</span>
//                         <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                         
//                         <span>{timeAgo(activity.lastActivity)}</span>
//                       </div>
//                       <span>{activity.extra}</span>
//                     </div>
//                   </div>
//                 </div>
//               </Link>
//             ))
//           )}
//         </div>
//           )}
//         </div>
//       </div>
//     </AppLayout>
//   );
// }

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Eye, Calendar, ExternalLink, UserPlus, Link } from "lucide-react"
import { AppLayout } from "@/components/app-layout"
import { Separator } from "@/components/ui/separator"
import { CreatePostForm } from "@/components/create-post-form"
import { SortDropdown } from "@/components/sort-dropdown"
import { PostCard } from "@/components/post-card"


// Server-side data fetching functions
async function getPosts() {
  return [
    {
      id: 1,
      user: {
        name: "Sarah Mitchell",
        title: "Senior Petroleum Geologist at ExxonMobil",
        location: "Houston, TX",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face",
        verified: true,
        connections: "2nd",
      },
      content:
        "Exciting developments in the Permian Basin! Our latest geological survey indicates significant untapped reserves in the Wolfcamp formation. The integration of AI-driven seismic analysis has improved our accuracy by 35%. What are your thoughts on the future of AI in petroleum exploration? #PetroleumGeology #AI #PermianBasin",
      timestamp: "2h",
      privacy: "public",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop", // Sample 1
      likes: 127,
      comments: [
        // ...existing code...
      ],
      replies: 10,
      shares: 23,
      postType: "update",
    },
    {
      id: 2,
      user: {
        name: "David Chen",
        title: "Managing Partner at Energy Law Associates",
        location: "Dallas, TX",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face",
        verified: true,
        connections: "1st",
      },
      content:
        "🏆 Proud to announce that our firm successfully negotiated a $50M mineral rights deal for our client in the Eagle Ford Shale. Key takeaways for landowners:\n\n1. Always negotiate post-production cost deductions\n2. Include technology clauses for future drilling methods\n3. Secure surface damage compensation upfront\n\nHappy to discuss strategies with fellow professionals. #MineralRights #EnergyLaw #EagleFord",
      timestamp: "4h",
      privacy: "public",
      image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=600&h=400&fit=crop", // Sample 2
      likes: 89,
      comments: [
        // ...existing code...
      ],
      replies: 5,
      shares: 15,
      postType: "achievement",
    },
    {
      id: 3,
      user: {
        name: "Energy Insights Weekly",
        title: "Industry Publication",
        location: "Houston, TX",
        avatar: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=50&h=50&fit=crop&crop=face",
        verified: true,
        connections: "company",
        isCompany: true,
      },
      content:
        "📊 MARKET UPDATE: Oil prices surge 8% following OPEC+ production cuts announcement. Key impacts on the energy sector:\n\n• Increased drilling activity expected in Q2 2025\n• Royalty payments likely to see 10-15% boost\n• Small-cap energy stocks outperforming\n\nRead our full analysis: [Link in comments]",
      timestamp: "6h",
      privacy: "public",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=400&fit=crop", // Sample 3
      likes: 234,
      comments: [
        // ...existing code...
      ],
      replies: 12,
      shares: 45,
      postType: "article",
    },
    {
      id: 4,
      user: {
        name: "Jessica Lee",
        title: "Landowner Advocate",
        location: "Oklahoma City, OK",
        avatar: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=50&h=50&fit=crop&crop=face",
        verified: false,
        connections: "3rd",
      },
      content:
        "Just attended a fantastic webinar on maximizing royalty payments. Highly recommend for new mineral owners! #RoyaltyPayments #MineralOwners",
      timestamp: "8h",
      privacy: "public",
      image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=600&h=400&fit=crop", // Sample 4
      likes: 56,
      comments: [],
      replies: 3,
      shares: 7,
      postType: "webinar",
    },
  ]
}

async function getIndustryNews() {
  return [
    {
      id: 1,
      title: "New EPA Regulations Impact Drilling Operations",
      source: "Energy Today",
      time: "2h ago",
      readers: "1,234",
    },
    {
      id: 2,
      title: "Permian Basin Production Reaches Record High",
      source: "Oil & Gas Journal",
      time: "4h ago",
      readers: "2,567",
    },
    {
      id: 3,
      title: "Technology Advances in Horizontal Drilling",
      source: "Petroleum Engineer",
      time: "6h ago",
      readers: "1,890",
    },
    {
      id: 4,
      title: "Mineral Rights Valuations See 15% Increase",
      source: "Land Professional",
      time: "8h ago",
      readers: "3,456",
    },
  ]
}

async function getSuggestedConnections() {
  return [
    {
      id: 1,
      name: "Michael Johnson",
      title: "VP of Operations at ConocoPhillips",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face",
      mutualConnections: 12,
      location: "Houston, TX",
    },
    {
      id: 2,
      name: "Amanda Rodriguez",
      title: "Senior Landman at EOG Resources",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face",
      mutualConnections: 8,
      location: "Austin, TX",
    },
    {
      id: 3,
      name: "James Wilson",
      title: "Petroleum Engineer at Chevron",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
      mutualConnections: 15,
      location: "Midland, TX",
    },
  ]
}

async function getCompanies() {
  return [
    {
      id: 1,
      name: "ExxonMobil",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=60&h=60&fit=crop",
      followers: "2.1M",
      industry: "Oil & Gas",
      updates: 3,
    },
    {
      id: 2,
      name: "ConocoPhillips",
      logo: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=60&h=60&fit=crop",
      followers: "1.8M",
      industry: "Energy",
      updates: 2,
    },
    {
      id: 3,
      name: "Pioneer Natural Resources",
      logo: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=60&h=60&fit=crop",
      followers: "890K",
      industry: "Shale Production",
      updates: 5,
    },
  ]
}
  const suggestedGroups = [
    {
      id: 1,
      name: "Permian Basin Owners",
      members: 2847,
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=60&h=60&fit=crop",
    },
    {
      id: 2,
      name: "Eagle Ford Shale",
      members: 1923,
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=60&h=60&fit=crop",
    },
    {
      id: 3,
      name: "Royalty Owners United",
      members: 3456,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop",
    },
  ]

  const trendingTopics = [
    { tag: "#MineralRights", posts: 234 },
    { tag: "#RoyaltyPayments", posts: 189 },
    { tag: "#LeaseNegotiation", posts: 156 },
    { tag: "#DrillingUpdates", posts: 98 },
  ]
async function getUpcomingEvents() {
  return [
    {
      id: 1,
      title: "NAPE Summit 2025",
      date: "Feb 12-14",
      location: "Houston, TX",
      attendees: 15000,
      type: "Conference",
    },
    {
      id: 2,
      title: "Mineral Rights Webinar",
      date: "Jan 25",
      location: "Online",
      attendees: 500,
      type: "Webinar",
    },
    {
      id: 3,
      title: "Energy Law Symposium",
      date: "Mar 5-6",
      location: "Dallas, TX",
      attendees: 800,
      type: "Symposium",
    },
  ]
}

export default async function CommunityPage() {
  // Fetch all data server-side
  const [posts, industryNews, suggestedConnections, companies, upcomingEvents] = await Promise.all([
    getPosts(),
    getIndustryNews(),
    getSuggestedConnections(),
    getCompanies(),
    getUpcomingEvents(),
  ])

  return (
    <AppLayout pageTitle="Welcome to Community" searchPlaceholder="Search for people, companies, posts...">
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-9 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-6 space-y-4">
              {/* <CreatePostForm /> */}
{/* 
              <div className="flex items-center justify-between">
                <Separator className="flex-1" />
                <div className="px-4">
                  <SortDropdown />
                </div>
                <Separator className="flex-1" />
              </div> */}

              <div className="space-y-4">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-3 space-y-4">
              <div className="sticky top-6 space-y-4">
              {/* Industry News */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">Energy Industry News</h3>
                    <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    {industryNews.map((news) => (
                      <div key={news.id} className="cursor-pointer hover:bg-gray-50 p-2 rounded-lg -m-2">
                        <h4 className="font-medium text-sm text-gray-900 mb-1 line-clamp-2 leading-tight">
                          {news.title}
                        </h4>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>
                            {news.source} • {news.time}
                          </span>
                          <div className="flex items-center space-x-1">
                            <Eye className="h-3 w-3" />
                            <span>{news.readers}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="ghost" className="w-full mt-3 text-blue-600 hover:bg-blue-50">
                    Show more
                  </Button>
                </CardContent>
              </Card>

           

               {/* Suggested Groups */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">Suggested Groups</h3>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href="/groups">See all</Link>
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {suggestedGroups.map((group) => (
                      <div key={group.id} className="flex items-center space-x-3">
                        <img
                          src={group.image || "/placeholder.svg"}
                          alt={group.name}
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-sm text-gray-900">{group.name}</h4>
                          <p className="text-xs text-gray-500">{group.members.toLocaleString()} members</p>
                        </div>
                        <Button size="sm" variant="outline">
                          Join
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

                {/* Trending Topics */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Trending Topics</h3>
                  <div className="space-y-2">
                    {trendingTopics.map((topic) => (
                      <div key={topic.tag} className="flex justify-between items-center">
                        <span className="text-blue-600 hover:underline cursor-pointer text-sm">{topic.tag}</span>
                        <span className="text-xs text-gray-500">{topic.posts} posts</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}