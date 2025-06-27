// ask question responce interface
export interface AskQuestionResponseInterface {

  postId: number
  threadId: string
  postType: string
  uId: number
  uname: string
  title: string
  content: string
}

// ask question payload
export interface AddQuestionRequestInterface {
  postType: string
  uId: number
  uname: string
  title: string
  content: string
  grpId: number | null
  grpName: string
}
// public group interface
export interface PublicGroupInterface {
  _id: string
  grpId: number 
  grpName: string
  grpDesc: string
  isActive: number
  img1: string
  createTs: string
  hashtags: string[]
  noOfPostsCount: number
  memberCount: number
  url: string
}
// sidebar props interface
export interface SidebarProps {
  className?: string
  publicGroups: PublicGroupInterface[]
}
// group threads responce interface
export interface GroupThreadsInterface {
  total: number
  pageno: number
  pageSize: number
  totalPages: number
  data: GroupThreadsDataInterface[]
}
// group threads data interface
export interface GroupThreadsDataInterface {
  threadId: string
  postQuestion: string
  lastReply: string
  lastActivity: string
  userImage: string
  userId: number
  userName: string
  NofOfReplies: number
  NofOfVotes: number
  NofOfComments: number
  _id: string
  hashtags: any[]
}
// group threads details interface
export interface GroupThreadDetailsInterface {
  _id: string
  threadId: string
  createdAt: string
  grpId: number
  grpName: string
  posts: ThreadPostInterface[]
  __v: number
  hashtags: string[]
}
// thread post interface
export interface ThreadPostInterface {  
  postId: number
  postType: string
  uId: number
  uname: string
  title: string
  content: string
  upvoteCnt: number
  downvoteCnt: number
  emailId: string
  createdAt: string
  upvotes: any[]
  downvotes: any[]
  comments: any[]
}