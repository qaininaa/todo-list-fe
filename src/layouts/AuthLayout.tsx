import type React from "react";

const AuthLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      {children}
    </div>
  );
};

export default AuthLayout;
