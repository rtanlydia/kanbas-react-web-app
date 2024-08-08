import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export const USERS_API = `${REMOTE_SERVER}/api/users`;

export const getEnrolledCourses = async (userId: string) => {
  const response = await axiosWithCredentials.get(`${USERS_API}/${userId}/enrolledCourses`);
  return response.data;
};

export const enrollInCourse = async (userId:any, courseId:any) => {
  try {
    const response = await axiosWithCredentials.post(`${USERS_API}/${userId}/RegisterCourses/${courseId}/enroll`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.error);
    }
    throw new Error("An unexpected error occurred");
  }
};

export const getAllCourses = async () => {
  const response = await axiosWithCredentials.get(`${REMOTE_SERVER}/api/courses`);
  return response.data;
};

// Faculty works, add and delete course!!!!!
export const createCourse = async (userId: string, courseData: any) => {
  try {
    const response = await axiosWithCredentials.put(`${USERS_API}/${userId}/create-course`, courseData);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.error);
    }
    throw new Error("An unexpected error occurred");
  }
};

export const deleteCourseForUser = async (userId: string, courseId: string) => {
  try {
    const response = await axiosWithCredentials.delete(`${USERS_API}/${userId}/delete-course/${courseId}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.error);
    }
    throw new Error("An unexpected error occurred");
  }
};