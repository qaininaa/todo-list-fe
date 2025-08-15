import { useState } from "react";
import MenuBurger from "../../public/icons/menuBurger.svg";
import { motion, AnimatePresence } from "motion/react";

const HomePage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div>
      <header className="flex justify-between bg-[#F8F8F8] p-2">
        <div className="flex items-center gap-1">
          <button onClick={() => setIsOpen(!isOpen)}>
            <img src={MenuBurger} />
          </button>

          <p>DashBoard</p>
        </div>
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
                <button onClick={() => setIsOpen(!isOpen)}>X</button>
              </div>
              <nav className="bg-red-100 text-center mt-10">
                <ul>
                  <li>Dashboard</li>
                  <li>Vital Task</li>
                  <li>My Task</li>
                  <li>Task Categories</li>
                  <li>Settings</li>
                  <li>Help</li>
                </ul>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
        <input
          type="text"
          name=""
          id=""
          placeholder="Search your task here"
          className="border border-black py-1 px-2"
        />
      </header>
    </div>
  );
};

export default HomePage;
