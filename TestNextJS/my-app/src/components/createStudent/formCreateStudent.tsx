"use client";

import { useState, type ChangeEvent } from "react";
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
import { X, Upload } from "lucide-react";
import hookService from "./formCreateStudent.hook";
import { DialogClose } from "@radix-ui/react-dialog";
export default function AddStudentForm() {
  const {
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
  } = hookService();
  const [image, setImage] = useState<string | null>(null);
  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const filetemp = event.target.files?.[0];
    if (filetemp) {
      setFile(filetemp);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(filetemp);
    }
  };
  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <h2 className="text-2xl font-semibold">Add New Student</h2>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          {/* Image Upload */}
          <div className="space-y-2">
            <label htmlFor="image" className="text-sm font-medium">
              Student Image
            </label>
            <div className="flex items-center space-x-4">
              <div className="relative w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
                {image ? (
                  <img
                    src={image || "/placeholder.svg"}
                    alt="Student"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full text-gray-400">
                    <Upload className="w-8 h-8" />
                  </div>
                )}
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  {...register("image")}
                  onChange={handleImageUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById("image")?.click()}
              >
                Upload Image
              </Button>
            </div>
          </div>

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
              <p>Loading courses...</p>
            ) : (
              <Select defaultValue={initCourse}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a course" />
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
          <DialogClose>
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Adding..." : "Add Student"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
