import axios from "axios";

export const addThreadComment = async ({
  threadId,
  postId,
  userId,
  username,
  content,
}: {
  threadId: string;
  postId: number;
  userId: number;
  username: string;
  content: string;
}) => {
  const response = await axios.post(
    "https://mineralview-community.mineralview.com/api/thread/post/comment",
    {
      threadId,
      postId,
      userId,
      username,
      content,
    }
  );
  return response.data;
};
// addThreadAnswer function to add an answer to a thread
export const addThreadAnswer = async ({
  postType,
  uId,
  uname,
  title,
  content,
  grpId,
  grpName,
  threadId,
}: {
  postType: string;
  uId: number;
  uname: string;
  title: string;
  content: string;
  grpId: number;
  grpName: string;
  threadId: string;
}) => {
  const response = await axios.post(
    "https://mineralview-community.mineralview.com/api/thread/post",
    {
      postType,
      uId,
      uname,
      title,
      content,
      grpId,
      grpName,
      threadId,
    }
  );
  return response.data;
};
// voteThreadPost function to vote on a post in a thread

export const voteThreadPost = async ({
  threadId,
  postId,
  type, // "up" or "down"
  uId,
  uname,
}: {
  threadId: string;
  postId: number;
  type: "upvote" | "downvote";
    uId: number;
  uname: string;
}) => {
  const response = await axios.post(
    "https://mineralview-community.mineralview.com/api/thread/post/vote",
    { threadId, postId, type, uId, uname }
  );
  return response.data;
};
// voteThreadComment function to vote on a comment in a thread
export const voteThreadComment = async ({
  threadId,
  postId,
  commentId,
  userId,
  username,
  type, // "upvote" | "downvote"
}: {
  threadId: string;
  postId: number;
  commentId: number;
  userId: number;
  username: string;
  type: "upvote" | "downvote";
}) => {
  const response = await axios.post("https://mineralview-community.mineralview.com/api/thread/post/comment/vote", {
    threadId,
    postId,
    commentId,
    userId,
    username,
    type,
  });
  return response.data;
};