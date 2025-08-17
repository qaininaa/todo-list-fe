import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { jwtDecode } from "jwt-decode";

const ProfilePage = () => {
  const [user, setUser] = useState();
  const auth = useAuth();

  useEffect(() => {
    if (auth?.auth !== null) {
      const decoded = jwtDecode(auth?.auth?.accessToken as string);
      setUser(decoded);
    }
  }, [auth]);

  return <div>{user && <p>{user}</p>}</div>;
};

export default ProfilePage;
