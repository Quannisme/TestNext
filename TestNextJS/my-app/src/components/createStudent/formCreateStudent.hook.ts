import { useState, useEffect } from "react";
import { Course, Student } from "@/types/course";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import * as serviceCourses from "../../service/course.service";
import * as serviceStudent from "../../service/student.service";
export default function hookService() {
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

  async function onSubmit(data: Omit<Student, "id">) {
    console.log(data.courses);
    const formData = {
      ...data,
    };
    await serviceStudent.createStudent(formData);
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
  };
}
