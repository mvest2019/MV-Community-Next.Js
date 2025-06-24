'use client';

import axios from 'axios';
import { AddQuestionRequestInterface, AskQuestionResponseInterface, PublicGroupInterface } from "@/types/community-types";

export const addQuestion = async (
 payload: AddQuestionRequestInterface,
): Promise<AskQuestionResponseInterface[]> => {
 
  try {
    const response = await axios.post(
      `https://108.181.168.43:3010/api/thread/post`,
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
      `https://108.181.168.43:3010/api/groups`,
     
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