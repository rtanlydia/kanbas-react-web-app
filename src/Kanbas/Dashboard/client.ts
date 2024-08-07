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
  const response = await axiosWithCredentials.get(`/api/courses`);
  return response.data;
};