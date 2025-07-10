// 'use client';

import axios from 'axios';
import { AddQuestionRequestInterface, AskQuestionResponseInterface, GroupThreadDetailsInterface, GroupThreadsInterface, PublicGroupInterface } from "@/types/community-types";

// export const addQuestion = async (
//  payload: AddQuestionRequestInterface,
// ): Promise<AskQuestionResponseInterface[]> => {
 
//   try {
//     const response = await axios.post(
//       `https://mineralview-community.mineralview.com/api/thread/post`,
//       payload,
//     );
   
//     if (response.status === 201) {
//       return response.data;
//     } else {
//       throw new Error('post not created');
//     }
//   } catch (error) {
   
//     throw new Error(String(error) || 'An error occurred while adding the question');
//   }
// };

// media
export async function addQuestion(formData: FormData) {
  const response = await axios.post(
    "https://mineralview-community.mineralview.com/api/thread/post",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
}
export const getPublicGroups = async (
//  payload: AddQuestionRequestInterface,
): 
Promise<PublicGroupInterface[]> => {
 
  try {
    const response = await axios.get(
      `https://mineralview-community.mineralview.com/api/getgrouplisting`,
     
    );
   
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Failed to fetch public groups');
    }
  } catch (error) {
   
    throw new Error(String(error) || 'An error occurred while fetching public groups');
  }
};
// export group threads
export const getGroupThreads = async (
  grpId: number,
  currentPage: number,
  pageSize: number
): Promise<GroupThreadsInterface[]> => {
  try {
    const response = await axios.get(
      `https://mineralview-community.mineralview.com/api/getgroupthreads?grpId=${grpId}&pageno=${currentPage}&noofthreads=${pageSize}`
    )
   
    if (response.status === 200) {
      return response.data
    } else {
      throw new Error('Failed to fetch group threads')
    }
  } catch (error) {
    
    throw new Error(String(error) || 'An error occurred while fetching group threads')
  }
}
// export threadDetails
export const getThreadDetails = async (
  threadId: string,
): Promise<GroupThreadDetailsInterface> => {
  const response = await axios.post(
    `https://mineralview-community.mineralview.com/api/getthreaddetails`,
    { threadId: threadId }
  );
  if (response.status === 200) {
    return response.data; // should be a single thread detail object
  } else {
    throw new Error('Failed to fetch thread details');
  }
}
// export recent activity
// This function fetches recent activity from the community API
export async function getRecentActivity() {
  const response = await fetch("https://mineralview-community.mineralview.com/api/recentactivity", {
    method: "GET",
    cache: "no-store",
  });
  if (!response.ok) {
    const text = await response.text();
    console.error("Recent Activity API error:", response.status, text);
    throw new Error(`Failed to fetch recent activity: ${response.status} ${text}`);
  }
  return response.json();
}
// 
export async function getGroupView(grpId: number) {
  const response = await axios.post(
    "https://mineralview-community.mineralview.com/api/group/view",
    { grpId }
  );
  return response.data;
}
// for viewing a thread by its ID
export async function getThreadDetailById(threadId: string) {
  const response = await axios.post(
    "https://mineralview-community.mineralview.com/api/thread/view",
    { threadId }
  );
  return response.data;
}
// latest blogs
export async function getLatestBlogs() {
  const response = await axios.post(
    "https://mview-info.mineralview.com/NewsFramework/Blog_data",
    {
      Category: "Latest Blogs",
      type: "Blog",
    }
  );
  return response.data;
}