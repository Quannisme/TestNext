import axios from "axios";

export const findAll = async () => {
  const temp = await axios.get("http://localhost:1907/student/");
  return temp.data;
};

export const deleteStudent = async (idStudent: string) => {
  const temp = await axios.delete(`http://localhost:1907/student/${idStudent}`);
  console.log("2", temp);
  return temp.data;
};
