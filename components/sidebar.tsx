"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Plus,
  MapPin,
  Home,
  FolderOpen,
  Users,
  Camera,
  UserPlus,
  Search,
  ExternalLink,
  MessageSquare,
  Clock,
  Check,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Bold, Italic, Underline, List, ListOrdered, Link2 } from "lucide-react"
import { addQuestion, getPublicGroups } from "@/services/service"
import { useAuthAction } from "@/hooks/use-auth-action"
import { LoginPopup } from "./login-popup"

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const { toast } = useToast()
  const pathname = usePathname()
  const [askQuestionOpen, setAskQuestionOpen] = useState(false)
  const [createGroupOpen, setCreateGroupOpen] = useState(false)
  const [questionData, setQuestionData] = useState({
    title: "",
    content: "",
    category: "",
    grpId: 0, // Replace with actual group ID if needed
    hashtags: [] as string[],
    currentTag: "",
  })

  const [newGroupData, setNewGroupData] = useState({
    name: "",
    description: "",
    invitations: "",
    subject: "You're invited to join our private group",
    privacy: "private",
    category: "Regional",
    body: "Join our new private group!",
  })

  const [showAutocomplete, setShowAutocomplete] = useState(false)
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState<any[]>([])
   const [editorContent, setEditorContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { executeWithAuth, loginPopupState, closeLoginPopup, handleLoginSuccess } = useAuthAction()
const [publicGroups, setPublicGroups] = useState<{ grpId: number; grpName: string;hashtags:any[] }[]>([])
  // Sample existing posts data
  const existingPosts = [
    {
      id: 1,
      title: "How to calculate royalty payments correctly?",
      category: "Royalty Payments",
      author: "Sarah Mitchell",
      replies: 12,
      url: "/posts/1",
      timeAgo: "2 hours ago",
    },
    {
      id: 2,
      title: "Best practices for lease negotiation terms",
      category: "Lease Negotiation",
      author: "Marcus Rodriguez",
      replies: 23,
      url: "/posts/2",
      timeAgo: "4 hours ago",
    },
    {
      id: 3,
      title: "Understanding mineral rights ownership",
      category: "Mineral Rights",
      author: "Jennifer Walsh",
      replies: 8,
      url: "/posts/3",
      timeAgo: "6 hours ago",
    },
    {
      id: 4,
      title: "Royalty payment delays - what are my options?",
      category: "Royalty Payments",
      author: "David Chen",
      replies: 15,
      url: "/posts/4",
      timeAgo: "8 hours ago",
    },
    {
      id: 5,
      title: "Lease negotiation tips for first-time landowners",
      category: "Lease Negotiation",
      author: "Texas Landman",
      replies: 19,
      url: "/posts/5",
      timeAgo: "12 hours ago",
    },
    {
      id: 6,
      title: "How to verify drilling operations on my property?",
      category: "Drilling Operations",
      author: "Property Owner",
      replies: 7,
      url: "/posts/6",
      timeAgo: "1 day ago",
    },
    {
      id: 7,
      title: "Tax implications of mineral rights income",
      category: "Tax Questions",
      author: "Tax Expert",
      replies: 11,
      url: "/posts/7",
      timeAgo: "1 day ago",
    },
    {
      id: 8,
      title: "Legal issues with surface damage compensation",
      category: "Legal Issues",
      author: "Legal Eagle",
      replies: 14,
      url: "/posts/8",
      timeAgo: "2 days ago",
    },
  ]

  const navigationItems = [
    {
      href: "/community",
      icon: MapPin,
      label: "Community",
      iconColor: "text-emerald-400",
    },
    {
      href: "/home-feed",
      icon: Home,
      label: "Home Feed",
      iconColor: "text-blue-400",
    },
    {
      href: "#",
      icon: Plus,
      label: "Create Group",
      iconColor: "text-green-400",
      isAction: true,
    },
    {
      href: "/energy-community-forums",
      icon: FolderOpen,
      label: "Public Groups",
      iconColor: "text-yellow-400",
    },
    {
      href: "/my-groups",
      icon: Users,
      label: "My Groups",
      iconColor: "text-purple-400",
    },
    {
      href: "/media",
      icon: Camera,
      label: "Media",
      iconColor: "text-pink-400",
    },
    {
      href: "/member-request",
      icon: UserPlus,
      label: "Follow Request",
      iconColor: "text-orange-400",
    },
  ]

  // Sample public groups for categories
  // const publicGroups = [
  //   "Mineral Rights",
  //   "Lease Negotiation",
  //   "Royalty Payments",
  //   "Drilling Operations",
  //   "Legal Issues",
  //   "Market Analysis",
  //   "Property Management",
  //   "Tax Questions",
  //   "General Discussion",
  //   "Environmental Impact",
  //   "Technology & Innovation",
  //   "Investment Opportunities",
  // ]

  const [showAllCategories, setShowAllCategories] = useState(false)
  const defaultCategoriesCount = 4

  const handleTitleChange = (value: string) => {
    setQuestionData({ ...questionData, title: value })

    if (value.trim().length > 0) {
      const searchTerm = value.toLowerCase()
      const suggestions = existingPosts
        .filter((post) => {
          return post.title.toLowerCase().includes(searchTerm)
        })
        .sort((a, b) => {
          const aIndex = a.title.toLowerCase().indexOf(searchTerm)
          const bIndex = b.title.toLowerCase().indexOf(searchTerm)
          if (aIndex !== bIndex) return aIndex - bIndex
          return b.replies - a.replies
        })
        .slice(0, 6)

      setAutocompleteSuggestions(suggestions)
      setShowAutocomplete(suggestions.length > 0 && value.trim().length > 0)
    } else {
      setShowAutocomplete(false)
      setAutocompleteSuggestions([])
    }
  }

  const handleSuggestionClick = (post: any) => {
    setShowAutocomplete(false)
    setAskQuestionOpen(false)
    window.location.href = post.url
  }

  const handleSubmitQuestion = async () => {
    setIsSubmitting(true)

    try {
     const payload = {
      postType: "question",
      uId: 6, // Replace with actual user ID from context
      uname: "John Doe", // Replace with actual username from context
      emailId: "johndoe2@gmail.com", // Replace with actual user email from context
      title: questionData.title,
      content: editorContent,
      grpId: questionData.grpId, // Replace with actual group ID
      grpName: questionData.category || "Discussion",
      hashtags: questionData.hashtags || [],
    }

      const response = await addQuestion(payload) 
 console.log("Question submitted successfully:", response)
      if (response) {
        // console.log("Question submitted successfully:", payload)

        setQuestionData({
          title: "",
          content: "",
          category: "",
          grpId: 0, // Reset group ID
          hashtags: [],
          currentTag: "",
        })
        setEditorContent("")
        setShowAutocomplete(false)
        setAutocompleteSuggestions([])
        setShowAllCategories(false)
        setAskQuestionOpen(false)

         toast({
          title: "Question posted",
          description: "Your question has been posted successfully.",
        })
      } else {
        throw new Error("Failed to submit question")
      }
    } catch (error) {
      console.error("Error submitting question:", error)
      toast({
        title: "Error",
        description: "Failed to post your question. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }


   const formatText = (command: string, value?: string) => {
    document.execCommand(command, false, value)
    const editor = document.getElementById("rich-editor")
    if (editor) {
      setEditorContent(editor.innerHTML)
    }
  }

  const handleEditorChange = (e: React.FormEvent<HTMLDivElement>) => {
    const content = e.currentTarget.innerHTML
    setEditorContent(content)
  }

  const isFormValid = questionData.title.trim() && editorContent.trim() && questionData.category

  const handleDialogClose = () => {
    setQuestionData({
      title: "",
      content: "",
      category: "",
      grpId: 0, // Reset group ID
      hashtags: [],
      currentTag: "",
    })
    setEditorContent("")
    const editor = document.getElementById("rich-editor")
    if (editor) {
      editor.innerHTML = ""
    }
    setShowAutocomplete(false)
    setAutocompleteSuggestions([])
    setShowAllCategories(false)
    setAskQuestionOpen(false)
  }

  const handleCreateGroup = () => {
    console.log("Creating private group:", newGroupData)
    setCreateGroupOpen(false)
    setNewGroupData({
      name: "",
      description: "",
      invitations: "",
      subject: "You're invited to join our private group",
      privacy: "private",
      category: "Regional",
      body: "Join our new private group!",
    })

    toast({
      title: "Private group created",
      description: `Your group "${newGroupData.name}" has been created and invitations sent.`,
    })
  }

  const highlightMatch = (text: string, searchTerm: string) => {
    if (!searchTerm.trim()) return text

    const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi")
    const parts = text.split(regex)

    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="bg-yellow-200 font-medium text-gray-900">
          {part}
        </span>
      ) : (
        part
      ),
    )
  }
  // Fetch public groups only when opening the Ask Question dialog
const handleOpenAskQuestion = async () => {
  // Only fetch if not already loaded
  // if (publicGroups.length === 0) {
    const response = await getPublicGroups()
    setPublicGroups(
      Array.isArray(response)
        ? response.map((g: any) => ({ grpId: g.grpId, grpName: g.grpName,hashtags:g.hashtags }))
        : []
    )
  // }
  setAskQuestionOpen(true)
}
  return (
    <div className={`bg-slate-700 text-white flex flex-col ${className}`}>
      {/* Logo/Header */}
      <div className="p-4 lg:p-6 border-b border-slate-600">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg flex items-center justify-center">
            <Image
              src="/images/mineralview-logo.png"
              alt="MineralView Logo"
              width={32}
              height={32}
              className="rounded-lg"
            />
          </div>
          <span className="text-xl font-bold">Lease Pulse</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          if (item.isAction) {
            return (
              <button
                key={item.label}
                onClick={() => setCreateGroupOpen(true)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors w-full text-left hover:bg-slate-600`}
              >
                <Icon className={`h-5 w-5 ${item.iconColor}`} fill="currentColor" />
                <span>{item.label}</span>
              </button>
            )
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                isActive ? "bg-slate-600 text-white" : "hover:bg-slate-600"
              }`}
            >
              <Icon className={`h-5 w-5 ${item.iconColor}`} fill="currentColor" />
              <span className={isActive ? "font-medium" : ""}>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Ask Question Button */}
      {/* <div className="p-4"> */}
       <div className="p-4">
        <Button
          onClick={() => executeWithAuth(handleOpenAskQuestion, "ask a question")}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold"
        >
          <Plus className="h-5 w-5 mr-2" fill="currentColor" />
          Ask a Question
        </Button>
      </div>

      {/* Ask Question Dialog */}
      <Dialog
        open={askQuestionOpen}
  onOpenChange={async (open) => {
    if (open) {
      await handleOpenAskQuestion()
    } else {
      handleDialogClose()
    }
  }}
      >
          {/* <DialogTrigger asChild>
            <Button onClick={() => executeWithAuth(() => setAskQuestionOpen(true), "ask a question")} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold">
              <Plus className="h-5 w-5 mr-2" fill="currentColor" />
              Ask a Question
            </Button>
          </DialogTrigger> */}
          <DialogContent className="max-w-5xl w-[100vw] sm:w-[100vw] lg:w-[1000px] max-h-[95vh] overflow-hidden pt-2 gap-0">
            <DialogHeader className="flex flex-row items-center gap-x-2 pb-0">
              <DialogTitle className="text-lg font-semibold">Ask a Question</DialogTitle>
              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hover:bg-blue-100 rounded-lg px-3 py-1 text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Writing Tips?
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="w-72 p-2">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center">
                          <span className="text-green-600 text-xs">✓</span>
                        </div>
                        <span className="text-sm">Be clear and specific</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center">
                          <span className="text-green-600 text-xs">✓</span>
                        </div>
                        <span className="text-sm">Provide context or screenshots</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center">
                          <span className="text-green-600 text-xs">✓</span>
                        </div>
                        <span className="text-sm">Choose the appropriate category</span>
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </DialogHeader>

            {/* 2-Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-0 h-[calc(90vh-140px)] overflow-hidden">
              {/* Left Section: Ask Question Form */}
              <div className="overflow-y-auto px-1">
                <div className="space-y-3 lg:space-y-3">
                  {/* Question Title */}
                  <div className="space-y-1">
                    <Label htmlFor="question-title" className="text-sm lg:text-base">
                      Question Title *
                    </Label>
                    <Input
                      id="question-title"
                      placeholder="What's your question? Be specific and clear..."
                      value={questionData.title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      className="text-sm lg:text-base h-10 lg:h-12"
                    />
                    <p className="text-xs lg:text-sm text-gray-500">
                      Write a clear, descriptive title that summarizes your question
                    </p>
                  </div>

                  {/* Question Content */}
                   <div className="space-y-2">
                    <Label htmlFor="question-content" className="text-sm lg:text-base">
                      Question Details *
                    </Label>

                    {/* Rich Text Editor Toolbar */}
                    <div className="border border-gray-300 rounded-t-lg bg-gray-50 p-2 flex gap-1 flex-wrap">
                      <button
                        type="button"
                        onClick={() => formatText("bold")}
                        className="p-2 hover:bg-gray-200 rounded transition-colors"
                        title="Bold"
                      >
                        <Bold className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => formatText("italic")}
                        className="p-2 hover:bg-gray-200 rounded transition-colors"
                        title="Italic"
                      >
                        <Italic className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => formatText("underline")}
                        className="p-2 hover:bg-gray-200 rounded transition-colors"
                        title="Underline"
                      >
                        <Underline className="h-4 w-4" />
                      </button>
                      <div className="w-px bg-gray-300 mx-1"></div>
                      <button
                        type="button"
                        onClick={() => formatText("insertUnorderedList")}
                        className="p-2 hover:bg-gray-200 rounded transition-colors"
                        title="Bullet List"
                      >
                        <List className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => formatText("insertOrderedList")}
                        className="p-2 hover:bg-gray-200 rounded transition-colors"
                        title="Numbered List"
                      >
                        <ListOrdered className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const url = prompt("Enter URL:")
                          if (url) formatText("createLink", url)
                        }}
                        className="p-2 hover:bg-gray-200 rounded transition-colors"
                        title="Insert Link"
                      >
                        <Link2 className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Rich Text Editor */}
                    <div
                      id="rich-editor"
                      contentEditable
                      onInput={handleEditorChange}
                      className="min-h-[120px] lg:min-h-[140px] p-3 border border-t-0 border-gray-300 rounded-b-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm lg:text-base"
                      style={{
                        maxHeight: "200px",
                        overflowY: "auto",
                        lineHeight: "1.5",
                      }}
                      data-placeholder="Provide more details about your question. Include relevant background information, what you've tried, and what specific help you need..."
                      suppressContentEditableWarning={true}
                    />

                    <style jsx>{`
                      #rich-editor:empty:before {
                        content: attr(data-placeholder);
                        color: #9CA3AF;
                        pointer-events: none;
                      }
                      #rich-editor:focus:before {
                        display: none;
                      }
                    `}</style>

                    <p className="text-xs lg:text-sm text-gray-500">
                      Use the toolbar above to format your text. The more details you provide, the better answers you'll
                      receive.
                    </p>
                  </div>

                  {/* Category Selection */}
                  <div className="space-y-3">
                    <Label className="text-sm lg:text-base">Category (Based on Public Groups) *</Label>
                    <div className="space-y-3">
                      {/* Category Tabs */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                       {(showAllCategories ? publicGroups : publicGroups.slice(0, defaultCategoriesCount)).map(
  (group) => (
    <button
      key={group.grpId}
      type="button"
      onClick={() => setQuestionData({ ...questionData, category: group.grpName, grpId: group.grpId ,hashtags: group.hashtags || []})}
      className={`px-3 py-2 text-xs lg:text-sm rounded-lg border transition-colors text-left ${
        questionData.category === group.grpName
          ? "bg-orange-500 text-white border-orange-500"
          : "bg-white border-gray-300 hover:border-orange-300 hover:bg-orange-50"
      }`}
    >
      {group.grpName}
    </button>
  )
)}

                        {/* Show More/Less Button */}
                        <button
                          type="button"
                          onClick={() => setShowAllCategories(!showAllCategories)}
                          className="px-3 py-2 text-xs lg:text-sm rounded-lg border border-orange-300 text-orange-600 hover:bg-orange-50 transition-colors text-left font-medium"
                        >
                          {showAllCategories ? "Show Less" : "Show More"}
                        </button>
                      </div>
                    </div>
                    {/* <p className="text-xs lg:text-sm text-gray-500">Select the category that best fits your question</p> */}
                  </div>
                </div>
              </div>

              {/* Right Section: Recent Threads */}
              <div className="p-4 lg:p-3 pt-0">
                <div className="flex items-center gap-2 mb-4">
                  <MessageSquare className="h-4 w-5 lg:h-5 lg:w-6 text-gray-600" />
                  <h3 className="font-semibold text-gray-900 text-sm lg:text-base">Recent Threads</h3>
                </div>

                {/* Live Search Results */}
                {showAutocomplete && autocompleteSuggestions.length > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Search className="h-3 w-3 lg:h-4 lg:w-4 text-blue-600" />
                      <span className="text-xs lg:text-sm font-medium text-blue-900">Matching Posts</span>
                    </div>
                    <div className="space-y-2">
                      {autocompleteSuggestions.map((post) => (
                        <button
                          key={post.id}
                          onClick={() => handleSuggestionClick(post)}
                          className="w-full text-left p-2 lg:p-3 bg-white rounded-lg border hover:border-blue-300 hover:bg-blue-50 transition-colors group"
                        >
                          <div className="space-y-1">
                            <h4 className="font-medium text-gray-900 text-xs lg:text-sm leading-tight group-hover:text-blue-900">
                              {highlightMatch(post.title, questionData.title)}
                            </h4>
                            <div className="flex items-center gap-1 lg:gap-2 text-xs text-gray-500">
                              <Badge variant="outline" className="text-xs px-1 lg:px-2 py-0.5">
                                {post.category}
                              </Badge>
                              <span>by {post.author}</span>
                              <span>•</span>
                              <span>{post.replies} replies</span>
                            </div>
                          </div>
                          <ExternalLink className="h-2 w-2 lg:h-3 lg:w-3 text-gray-400 group-hover:text-blue-600 float-right mt-1" />
                        </button>
                      ))}
                    </div>
                    <div className="border-t border-gray-200 mt-4 pt-4">
                      <span className="text-xs lg:text-sm font-medium text-gray-900">All Recent Posts</span>
                    </div>
                  </div>
                )}

                {/* Recent Posts List */}
                <div className="space-y-2 overflow-y-auto max-h-[400px]">
                  {existingPosts.slice(0, 8).map((post) => (
                    <button
                      key={post.id}
                      onClick={() => handleSuggestionClick(post)}
                      className="w-full text-left p-2 lg:p-3 bg-white rounded-lg border hover:border-gray-300 hover:bg-gray-50 transition-colors group"
                    >
                      <div className="space-y-1">
                        <h4 className="font-medium text-gray-900 text-xs lg:text-sm leading-tight group-hover:text-gray-700">
                          {post.title}
                        </h4>
                        <div className="flex items-center gap-1 lg:gap-2 text-xs text-gray-500">
                          <Badge variant="outline" className="text-xs px-1 lg:px-2 py-0.5">
                            {post.category}
                          </Badge>
                          <span>•</span>
                          <span>{post.replies} replies</span>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <Clock className="h-2 w-2 lg:h-3 lg:w-3" />
                            <span>{post.timeAgo}</span>
                          </div>
                        </div>
                      </div>
                      <ExternalLink className="h-2 w-2 lg:h-3 lg:w-3 text-gray-400 group-hover:text-gray-600 float-right mt-1" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <DialogFooter className="pt-6 border-t">
              <div className="flex gap-3 w-full sm:w-auto">
                <Button variant="outline" onClick={handleDialogClose} className="flex-1 sm:flex-none">
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmitQuestion}
                  disabled={!isFormValid}
                  className="bg-orange-500 hover:bg-orange-600 flex-1 sm:flex-none"
                >
                  Post Question
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      {/* </div> */}

      {/* Create Group Dialog */}
      <Dialog open={createGroupOpen} onOpenChange={setCreateGroupOpen}>
        <DialogContent className="max-w-4xl w-[95vw] sm:w-[90vw] lg:w-[800px] max-h-[90vh] p-3">
          <DialogHeader className="gap-x-2 pb-0">
            <DialogTitle>Create Private Group</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-6 py-2 pt-0">
            {/* Left Column: Group Name and Description */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="group-name">Group Name *</Label>
                <Input
                  id="group-name"
                  placeholder="Enter group name..."
                  value={newGroupData.name}
                  onChange={(e) => setNewGroupData({ ...newGroupData, name: e.target.value })}
                />
              </div>

                 <div className="space-y-2">
                <Label htmlFor="group-description" className="text-base font-medium">
                  Group Description *
                </Label>
                <Textarea
                  id="group-description"
                  placeholder="Describe the purpose of your group, what topics will be discussed, and what members can expect..."
                  value={newGroupData.description || ""}
                  onChange={(e) => setNewGroupData({ ...newGroupData, description: e.target.value })}
                  rows={6}
                  className="text-base resize-none"
                />
              </div>
            </div>

            {/* Right Column: Invitations */}
            <div className="space-y-4 overflow-y-auto">
              <div className="space-y-2">
                <Label htmlFor="group-invitations">Invitations (Email IDs)</Label>
                <Textarea
                  id="group-invitations"
                  placeholder="Enter email addresses separated by commas (e.g., john@example.com, jane@example.com)"
                  value={newGroupData.invitations || ""}
                  onChange={(e) => setNewGroupData({ ...newGroupData, invitations: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="invitation-subject">Invitation Subject *</Label>
                <Input
                  id="invitation-subject"
                  placeholder="Subject for invitation email..."
                  value={newGroupData.subject || "You're invited to join our private group"}
                  onChange={(e) => setNewGroupData({ ...newGroupData, subject: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="invitation-body">Invitation Body *</Label>
                <Textarea
                  id="invitation-body"
                  placeholder="Body for invitation email..."
                  value={newGroupData.body || "Join our new private group!"}
                  onChange={(e) => setNewGroupData({ ...newGroupData, body: e.target.value })}
                  rows={3}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateGroupOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleCreateGroup}
              disabled={!newGroupData.name.trim() || !newGroupData.description?.trim() || !newGroupData.subject?.trim()}
              className="bg-green-600 hover:bg-green-700"
            >
              Create Group & Send Invitations
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
        {/* Login Popup */}
      <LoginPopup
        isOpen={loginPopupState.isOpen}
        onClose={closeLoginPopup}
        actionMessage={loginPopupState.actionMessage}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  )
}
