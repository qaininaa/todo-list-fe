import { motion, AnimatePresence } from "motion/react";
import { useContext } from "react";
import { AuthContext } from "../context/auth/AuthContext";
import { Link } from "react-router-dom";

interface IPropsNavbar {
  isOpen: boolean;
  onClick: () => void;
}

const Navbar = ({ isOpen, onClick }: IPropsNavbar) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed top-0 left-0 h-full w-3/4 max-w-sm bg-white shadow-lg z-50 p-6"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={{
            hidden: { x: "-100%" },
            visible: { x: 0 },
            exit: { x: "-100%" },
          }}
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
        >
          <div className="flex justify-between">
            <h1>DASHBOARD</h1>
            <button onClick={onClick} className="cursor-pointer">
              X
            </button>
          </div>
          <NavMenu />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const NavMenu = () => {
  const auth = useContext(AuthContext);

  return (
    <nav className="bg-red-100 text-center mt-10">
      {auth?.user ? (
        <ul>
          <li>Dashboard</li>
          <li>Vital Task</li>
          <li>My Task</li>
          <li>Task Categories</li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>Help</li>
          <li>Logout</li>
        </ul>
      ) : (
        <ul>
          <li>Dashboard</li>
          <li>Task Categories</li>
          <li>Help</li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
