import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export const USERS_API = `${REMOTE_SERVER}/api/users`;

export const getEnrolledCourses = async (userId: string) => {
  const response = await axiosWithCredentials.get(`${USERS_API}/${userId}/enrolledCourses`);
  return response.data;
};

export const enrollInCourse = async (userId: string, courseId: string) => {
  const response = await axiosWithCredentials.post(`${USERS_API}/${userId}/enroll`, { courseId });
  return response.data;
};

export const getAllCourses = async () => {
  const response = await axiosWithCredentials.get(`/api/courses`);
  return response.data;
};