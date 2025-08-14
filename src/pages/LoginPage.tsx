import { Link } from "react-router-dom";
import Input from "../components/ui/Input";
import AuthLayout from "../layouts/AuthLayout";
import axiosInstance from "../api/axios";
import { useForm } from "react-hook-form";

interface IloginForm {
  username: string;
  password: string;
}

const LoginPage = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: IloginForm) => {
    try {
      const res = await axiosInstance.post("/api/auth/login", {
        username: values.username,
        password: values.password,
      });

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
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
          />
          <Input
            label="Password"
            id="password"
            type="password"
            placeholder="***"
            {...register("password")}
          />
          <button
            type="submit"
            className="bg-blue-500 w-full mt-5 p-2 
            text-white cursor-pointer hover:opacity-70"
          >
            Login
          </button>
        </form>
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
