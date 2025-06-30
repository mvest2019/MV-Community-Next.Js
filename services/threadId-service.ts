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
// acceptThreadAnswer function to accept an answer in a thread
export async function acceptThreadAnswer({
  threadId,
  postId,
  isAnswer = 1, // Default to 1 for accepted answer
}: {
  threadId: number | string;
  postId: number | string;
  isAnswer?: number; // 1 for accepted, 0 for not accepted
}) {
  const response = await axios.post(
    "https://mineralview-community.mineralview.com/api/updateIsAnswerStatus",
    {
      threadId,
      postId,
      isAnswer, // 1 for accepted answer, 0 for not accepted
    }
  );
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error("Failed to accept answer");
  }
}