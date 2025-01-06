import * as yup from "yup";

export const schema = yup
  .object({
    title: yup.string().required("Tytuł jest wymagany"),
    size: yup.string().optional(),
    price: yup
      .number()
      .required("Cena jest wymagana")
      .positive("Cena musi być dodatnia"),
    paper: yup.boolean().optional(),
    envelope: yup.boolean().optional(),
    collection: yup.boolean().optional(),
    description: yup.string().optional(),
    image: yup.mixed<File>().required("Zdjęcie jest wymagane"),
    category: yup.string().optional(),
  })
  .required();

export interface FormData {
  title: string;
  size?: string;
  price: number;
  paper?: boolean;
  envelope?: boolean;
  collection?: boolean;
  description?: string;
  image: File;
  category?: string;
}
