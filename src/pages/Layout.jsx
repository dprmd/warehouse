import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { createContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getUserById } from "../services/firebase/userService";
import { v4 as uuidv4 } from "uuid";

export const AppContext = createContext();
export const RefetchContext = createContext();

export default function Layout() {
  const [data, setData] = useState({});
  const [needRefetch, setRefetch] = useState(uuidv4());

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    getUserById(userId).then((data) => {
      setData(data);
      console.log("Fetch Firebase");
      console.log("Data From Firebase : ", data);
    });
  }, [needRefetch]);

  return (
    <RefetchContext.Provider value={setRefetch}>
      <AppContext.Provider value={data}>
        <Navbar />
        <div className="pt-12">
          <Outlet />
        </div>
      </AppContext.Provider>
    </RefetchContext.Provider>
  );
}
