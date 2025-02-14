export interface Course {
  id: string;
  name: string;
}

export interface Student {
  id: string;
  name: string;
  age: number;
  email: string;
  image: string;
  courses: { id: string; name: string }[];
}
export type SearchFilters = {
  keyword: string;
  location: string;
  category: string;
};
