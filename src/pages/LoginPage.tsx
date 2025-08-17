import { Link, useNavigate } from "react-router-dom";
import Input from "../components/ui/Input";
import AuthLayout from "../layouts/AuthLayout";
import axiosInstance from "../api/axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";

const loginFormSchema = z.object({
  username: z.string().nonempty("Username is required"),
  password: z.string().nonempty("Password is required"),
});

type IloginForm = z.infer<typeof loginFormSchema>;

const LoginPage = () => {
  const [err, setErr] = useState<string>("");
  const auth = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit = async (values: IloginForm) => {
    try {
      const res = await axiosInstance.post("/api/auth/login", {
        username: values.username,
        password: values.password,
      });
      auth?.login(res.data.accessToken);
      setErr("");
      navigate("/");
    } catch (error) {
      if (error.response.status === 500) {
        setErr(error.response.data.errorMessage);
      }
    }
  };

  useEffect(() => {
    console.log(auth);
  }, [auth]);

  return (
    <AuthLayout>
      <div className="border border-black rounded-md p-3">
        <h1 className="text-4xl">Login Page</h1>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Username"
            id="username"
            type="text"
            placeholder="Masukkan username"
            {...register("username")}
            err={
              formState.errors.username && (
                <p className="text-sm text-red-500">
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
              formState.errors.password && (
                <p className="text-sm text-red-500">
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
            Login
          </button>
        </form>
        {err !== "" && (
          <p className="text-center text-sm text-red-500">{err}</p>
        )}
        <p>
          Don't have an Account?{" "}
          <Link to="/register" className="text-blue-500 font-semibold">
            Register
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
