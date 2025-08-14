import { z } from "zod";
import { useForm } from "react-hook-form";
import Input from "../components/ui/Input";
import AuthLayout from "../layouts/AuthLayout";
import axiosInstance from "../api/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";

const registerFormSchema = z.object({
  username: z
    .string()
    .min(3, "Username minimal 3 karakter")
    .max(12, "Username minimal 12 karakter"),
  password: z.string().min(8, "Password minimal 8 karakter"),
  name: z.string(),
  email: z.string().email("Format email tidak valid"),
});

type RegisterFormSchema = z.infer<typeof registerFormSchema>;

const RegisterPage = () => {
  const { register, handleSubmit, formState } = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
  });

  const onsubmit = async (values: RegisterFormSchema) => {
    const res = await axiosInstance.post("/api/auth/register", values);
    const data = await res.data;
    console.log(data);
  };
  return (
    <AuthLayout>
      <div className="border border-black rounded-md p-3">
        <h1 className="text-4xl">Register Page</h1>
        <form action="" onSubmit={handleSubmit(onsubmit)}>
          <Input
            label="Full Name"
            id="fullname"
            type="text"
            placeholder="johnd"
            {...register("name")}
            err={
              formState.errors?.name && (
                <p className="text-red-500">{formState.errors.name.message}</p>
              )
            }
          />
          <Input
            label="Email"
            id="email"
            type="email"
            placeholder="user@mail.com"
            {...register("email")}
            err={
              formState.errors?.email && (
                <p className="text-red-500">{formState.errors.email.message}</p>
              )
            }
          />
          <Input
            label="Username"
            id="username"
            type="text"
            placeholder="Masukkan username"
            {...register("username")}
            err={
              formState.errors?.username && (
                <p className="text-red-500">
                  {formState.errors.username.message}
                </p>
              )
            }
          />
          <Input
            label="Password"
            id="password"
            type="password"
            placeholder="***"
            {...register("password")}
            err={
              formState.errors?.password && (
                <p className="text-red-500">
                  {formState.errors.password.message}
                </p>
              )
            }
          />
          <button
            type="submit"
            className="bg-blue-500 w-full mt-5 p-2 
            text-white cursor-pointer hover:opacity-70"
          >
            Sign Up
          </button>
        </form>
        <p>
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default RegisterPage;
