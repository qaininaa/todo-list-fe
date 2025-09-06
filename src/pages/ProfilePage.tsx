import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate("/")}>home</button>
    </div>
  );
};

export default ProfilePage;
