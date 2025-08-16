import { useState } from "react";
import MenuBurger from "../../public/icons/menuBurger.svg";
import Navbar from "../components/Navbar";

const HomePage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div>
      <header className="flex justify-between bg-[#F8F8F8] p-2">
        <div className="flex items-center gap-1">
          <button onClick={() => setIsOpen(!isOpen)}>
            <img src={MenuBurger} className="cursor-pointer" />
          </button>

          <p>DashBoard</p>
        </div>
        <Navbar isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
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
