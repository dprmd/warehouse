import { getUserById } from "@/services/firebase/userService";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem("userId");

  const fetchUser = async () => {
    setLoading(true);
    const aUser = await getUserById(userId);
    if (aUser.success) {
      setUser(aUser);
      setLoading(false);
    } else {
      setError(aUser.error);
      setLoading(false);
      console.log(aUser.error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUser();
    }
  }, [userId]);

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        error,
        refetch: fetchUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
