"use client";

import { useState, useEffect } from "react";
import { Course, Student } from "@/types/course";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import * as serviceCourses from "../../service/course.service";
import * as serviceStudent from "../../service/student.service";
import { Value } from "@radix-ui/react-select";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  age: yup
    .number()
    .required("Age is required")
    .min(18, "Must more than  18")
    .max(50, "Must less than 50"),
  email: yup.string().email("Invalid email").required("Email is required"),
  courses: yup
    .array()
    .of(
      yup.object().shape({
        id: yup.string().required("Course ID is required"),
        name: yup.string().required("Course name is required"),
      })
    )
    .min(1, "At least one course must be selected")
    .required("Courses are required"),
});

const initValue: Student = {
  name: "Nguyen Van A",
  age: 18,
  email: "Quanismevn@gmail.com",
  courses: [{ id: "a0a80fc8-b5e7-4b5a-a108-a0bb5828e3fb", name: "A001" }],
};

export default function AddStudentForm() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [initCourses, setInitCourses] = useState<Course[]>(initValue.courses);
  const [isLoading, setIsLoading] = useState(false);
  const [selectCourses, setSelectCourses] = useState<Course[]>([]);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Student>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: initValue,
    resolver: yupResolver(schema),
    criteriaMode: "all",
  });

  // Load all courses when component mounts
  useEffect(() => {
    getAllCourses();
  }, []);

  const getAllCourses = async () => {
    setIsLoading(true); // Set loading to true while fetching data
    try {
      const temp = await serviceCourses.findAll();
      setCourses(temp);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setIsLoading(false); // Set loading to false after the data is fetched
    }
  };

  const handleCourseSelect = (courseId: string) => {
    const selectedCourse = courses.find((course) => course.id === courseId);
    if (
      selectedCourse &&
      !selectCourses.some((course) => course.id === selectedCourse.id)
    ) {
      setSelectCourses((prev) => [...prev, selectedCourse]);
    }
  };

  const removeCourse = (courseId: string) => {
    setSelectCourses((prev) => prev.filter((course) => course.id !== courseId));
  };

  const onSubmit = async (data: Omit<Student, "id">) => {
    const formData = {
      ...data,
      courses: selectCourses.map((course) => ({
        id: course.id,
      })),
    };
    await serviceStudent.createStudent(formData);
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <h2 className="text-2xl font-semibold">Add New Student</h2>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          {/* Student Name */}
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Student Name
            </label>
            <Input
              id="name"
              placeholder="Enter student name"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Student Age */}
          <div className="space-y-2">
            <label htmlFor="age" className="text-sm font-medium">
              Age
            </label>
            <Input
              id="age"
              type="number"
              required
              min="0"
              placeholder="Enter student age"
              {...register("age")}
            />
            {errors.age && (
              <p className="text-red-500 text-sm">{errors.age.message}</p>
            )}
          </div>

          {/* Student Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              type="email"
              required
              placeholder="Enter student email"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Courses Select */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Courses</label>
            {isLoading ? (
              <p>Loading courses...</p> // Display loading state while fetching courses
            ) : (
              <Controller
                control={control}
                name="courses"
                defaultValue={initCourses} // This sets the initial value
                render={({ field }) => (
                  <Select
                    onValueChange={(value) => handleCourseSelect(value)}
                    defaultValue={"a0a80fc8-b5e7-4b5a-a108-a0bb5828e3fb"}
                  >
                    <SelectTrigger
                      className="w-full"
                      // defaultValue={initValue.courses[0].id}
                    >
                      <SelectValue defaultValue={initValue.courses[0].id}>
                        {/* {selectCourses.length > 0
                          ? selectCourses
                              .map((course) => course.name)
                              .join(", ")
                          : "Select a course"} */}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {courses.map((course) => (
                        <SelectItem
                          key={course.id}
                          onMouseDown={() => handleCourseSelect(course.id)}
                          value={course.id}
                        >
                          {course.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            )}
            <div className="flex flex-wrap gap-2 mt-2">
              {selectCourses.map((course) => (
                <div
                  key={course.id}
                  className="flex items-center gap-1 bg-primary/10 text-primary rounded-full px-3 py-1 text-sm"
                >
                  {course.name}
                  <button
                    type="button"
                    onClick={() => removeCourse(course.id)}
                    className="hover:text-primary/80"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-4">
          <Button variant="outline" type="button">
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Adding..." : "Add Student"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
