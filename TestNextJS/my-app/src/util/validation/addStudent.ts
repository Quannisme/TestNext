import { z } from "zod";

export const formSchema = z.object({
  name: z.string().nonempty("Name is required"),
  age: z
    .number({ required_error: "Age is required" })
    .min(18, "Must be more than 18")
    .max(50, "Must be less than 50"),
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email"),
//   courses: z
//     .array(
//       z.object({
//         id: z.number({ required_error: "Course ID is required" }),
//         name: z.string().nonempty("Course name is required"),
//       })
//     )
//     .min(1, "At least one course must be selected")
//     .nonempty("Courses are required"),
});

export type FormSchema = z.infer<typeof formSchema>;
