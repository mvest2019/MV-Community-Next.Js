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