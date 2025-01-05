import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Schema yup validation
const schema = yup
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

interface FormData {
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

const AddProductForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
    // TODO: Add function to send data to backend
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
          <h2 className="text-3xl font-bold text-white">Dodaj Nowy Produkt</h2>
          <p className="text-blue-100 mt-2">Wypełnij poniższy formularz, aby dodać nowy produkt do katalogu</p>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-gray-700 font-semibold" htmlFor="title">
                Tytuł
              </label>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="Wprowadź tytuł produktu"
                  />
                )}
              />
              <p className="text-red-500 text-sm">{errors.title?.message}</p>
            </div>

            <div className="space-y-2">
              <label className="text-gray-700 font-semibold" htmlFor="size">
                Rozmiar
              </label>
              <Controller
                name="size"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="np. 10x15 cm"
                  />
                )}
              />
            </div>

            <div className="space-y-2">
              <label className="text-gray-700 font-semibold" htmlFor="price">
                Cena
              </label>
              <Controller
                name="price"
                control={control}
                render={({ field }) => (
                  <input
                    type="number"
                    step="0.01"
                    {...field}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="0.00"
                  />
                )}
              />
              <p className="text-red-500 text-sm">{errors.price?.message}</p>
            </div>

            <div className="space-y-2">
              <label className="text-gray-700 font-semibold" htmlFor="category">
                Kategoria
              </label>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="Wybierz kategorię"
                  />
                )}
              />
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg space-y-3">
            <p className="font-semibold text-gray-700 mb-3">Opcje dodatkowe</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <label className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-500 transition cursor-pointer">
                <Controller
                  name="paper"
                  control={control}
                  render={({ field: { value, onChange, ...field } }) => (
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => onChange(e.target.checked)}
                      {...field}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                  )}
                />
                <span className="text-gray-700">Papier</span>
              </label>

              <label className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-500 transition cursor-pointer">
                <Controller
                  name="envelope"
                  control={control}
                  render={({ field: { value, onChange, ...field } }) => (
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => onChange(e.target.checked)}
                      {...field}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                  )}
                />
                <span className="text-gray-700">Koperta</span>
              </label>

              <label className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-500 transition cursor-pointer">
                <Controller
                  name="collection"
                  control={control}
                  render={({ field: { value, onChange, ...field } }) => (
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => onChange(e.target.checked)}
                      {...field}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                  )}
                />
                <span className="text-gray-700">Kolekcja</span>
              </label>
            </div>
          </div>

          <div className="mt-6 space-y-2">
            <label className="text-gray-700 font-semibold" htmlFor="description">
              Opis
            </label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="Wprowadź opis produktu..."
                />
              )}
            />
          </div>

          <div className="mt-6 space-y-2">
            <label className="text-gray-700 font-semibold" htmlFor="image">
              Zdjęcie
            </label>
            <Controller
              name="image"
              control={control}
              render={({ field: { onChange } }) => (
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col w-full h-32 border-4 border-dashed hover:bg-gray-100 hover:border-blue-300 rounded-lg transition">
                    <div className="flex flex-col items-center justify-center pt-7">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-gray-400 group-hover:text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                      </svg>
                      <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                        Wybierz zdjęcie
                      </p>
                    </div>
                    <input
                      type="file"
                      onChange={(e) => onChange(e.target.files?.[0])}
                      className="opacity-0"
                    />
                  </label>
                </div>
              )}
            />
            <p className="text-red-500 text-sm">{errors.image?.message}</p>
          </div>

          <button
            type="submit"
            className="w-full mt-8 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition duration-200"
          >
            Dodaj Produkt
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductForm;
