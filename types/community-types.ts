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
  views: number
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
  isAnswer?: number // 1 for accepted, 0 for not accepted
}
// group threads details response interface
export interface GroupThreadDetailsResponseInterface {
  threadId: string
  postQuestion: string
  lastReply: string
  lastActivity: string
  userImage: string
  userId: number
  userName: string
  emailId?: string
  NofOfReplies: number
  NofOfVotes: number
  NofOfComments: number
  _id: string
}
// login response interface
export interface LoginResponseInterface {
  status_code: number
  data: Data
  error: string
}
// data interface for login response  
export interface Data {
  member_id: number
  member_type: string
  f_name: string
  l_name: string
  email_id: string
  mailing_st_address: string
  city: string
  state_master_id: any
  zip_code: string
  phone_number: string
  notification_phonenumber: any
  notification_email: any
  preference_optioncode: any
  membership_planid: any
  membership_expirydate: any
  registration_date: string
  email_verified: boolean
  email_verification_code: string
  email_verification_time: string
  reset_password_token: any
  reset_password_validity: any
  user_name: string
  tag_line: string
  background_image: string
  otp_verification_code: any
  ispresentation: any
  subscriptionid: number
  subscriptionstatus: string
  issubscriptionpaid: boolean
  membership_status: any
  referal_code: any
  refered_code: any
  email_text: any
  login_type: any
  login_json: any
  isfirstime: boolean
  isguide: boolean
  isautodebit: boolean
  profile_pic: string
  subscriptionname: string
  currentsubscriptionid: string
  currentsubscriptionstatus: string
  subscriptionstartdate: string
  subscriptionenddat: string
  duration: any
  isTrialPeriod: boolean
  token: string
}