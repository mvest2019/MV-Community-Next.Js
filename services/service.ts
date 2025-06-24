'use client';

import axios from 'axios';
import { AddQuestionRequestInterface, AskQuestionResponseInterface, PublicGroupInterface } from "@/types/community-types";

export const addQuestion = async (
 payload: AddQuestionRequestInterface,
): Promise<AskQuestionResponseInterface[]> => {
 
  try {
    const response = await axios.post(
      `https://mineralview-community.mineralview.com/api/thread/post`,
      payload,
    );
    console.log('Response from addQuestion:', response);
    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error('post not created');
    }
  } catch (error) {
    console.log('Error in addQuestion:', error);
    throw new Error(String(error) || 'An error occurred while adding the question');
  }
};
export const getPublicGroups = async (
//  payload: AddQuestionRequestInterface,
): Promise<PublicGroupInterface[]> => {
 
  try {
    const response = await axios.get(
      `https://mineralview-community.mineralview.com/api/getgrouplisting`,
     
    );
    console.log('Response from addQuestion:', response);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Failed to fetch public groups');
    }
  } catch (error) {
    console.log('', error);
    throw new Error(String(error) || 'An error occurred while fetching public groups');
  }
};