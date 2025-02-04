import axios from "axios";

export const findAll = async () => {
  const temp = await axios.get("http://localhost:1907/student/");
  return temp.data;
};

export const deleteStudent = async (idStudent: string) => {
  const temp = await axios.delete(`http://localhost:1907/student/${idStudent}`);
  return temp.data;
};

export const createStudent = async (value: any) => {
  console.log("createStudent", value);
  const temp = await axios.post("http://localhost:1907/student/", value);
  return temp.status;
};
