import { useState, useEffect } from "react";
import { Course, Student } from "@/types/course";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import * as serviceCourses from "../../service/course.service";
import * as serviceStudent from "../../service/student.service";
export default function hookService() {
  const [file, setFile] = useState<File | null>(null);

  // State to store the base64
  const [base64, setBase64] = useState<string | null>(null);
  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    age: yup
      .number()
      .typeError("Age must be a number")
      .required("Age is required")
      .transform((value) => (isNaN(value) ? undefined : value))
      .min(18, "Must be more than 18")
      .max(50, "Must be less than 50"),
    email: yup.string().email("Invalid email").required("Email is required"),
    image: yup.string().required("Image is required"),
    courses: yup
      .array()
      .min(1, "At least one course must be selected")
      .required("Courses are required"),
  });

  const initValue = {
    name: "Nguyen Van A",
    age: 18,
    email: "Quanismevn@gmail.com",
    courses: [{ id: "a0a80fc8-b5e7-4b5a-a108-a0bb5828e3fb", name: "A001" }],
  };
  const [courses, setCourses] = useState<Course[]>([]);
  const [initCourse, setInitCourse] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [selectCourses, setSelectCourses] = useState<Course[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<Student, "id">>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: initValue,
    resolver: yupResolver(schema),
    criteriaMode: "all",
  });
  useEffect(() => {
    getAllCourses();
  }, []);

  async function getAllCourses() {
    setIsLoading(true);
    try {
      const temp = await serviceCourses.findAll();
      setInitCourse(temp[0].id);
      setCourses(temp);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCourseSelect(courseId: string) {
    const selectedCourse = courses.find((course) => course.id === courseId);
    if (
      selectedCourse &&
      !selectCourses.some((course) => course.id === selectedCourse.id)
    ) {
      setSelectCourses((prev) => [...prev, selectedCourse]);
    }
  }

  function removeCourse(courseId: string) {
    setSelectCourses((prev) => prev.filter((course) => course.id !== courseId));
  }
  const toBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  async function onSubmit(data: Omit<Student, "id">) {
    const base64 = await toBase64(file as File);
    console.log(base64);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("age", data.age.toString());
    formData.append("email", data.email);
    formData.append("image", JSON.stringify(base64));
    formData.append("courses", JSON.stringify(data.courses));

    // // Append the image file if exists
    // const imageInput = document.getElementById("image") as HTMLInputElement;
    // if (imageInput?.files?.[0]) {
    //   formData.append("file", imageInput.files[0]);
    // }

    try {
      const response = await serviceStudent.createStudent({
        name: formData.get("name"),
        age: Number(formData.get("age")),
        email: formData.get("email"),
        image: formData.get("image"),
        courses: formData.get("courses"),
      });
      setFile(null);
      setBase64(null);
      console.log("Student created successfully", response);
    } catch (error) {
      console.error("Error creating student:", error);
    }
  }

  return {
    onSubmit,
    handleSubmit,
    register,
    errors,
    isLoading,
    initCourse,
    courses,
    selectCourses,
    removeCourse,
    handleCourseSelect,
    file,
    setFile,
  };
}
