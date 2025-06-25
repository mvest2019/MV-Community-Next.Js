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