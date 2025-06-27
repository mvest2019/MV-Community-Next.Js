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