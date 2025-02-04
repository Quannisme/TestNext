import axios from "axios";

export const findAll = async () => {
  const temp = await axios.get("http://localhost:1907/course/");
  console.log("1", temp);
  return temp.data;
};

