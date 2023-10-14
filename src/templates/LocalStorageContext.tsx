"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User } from "@/components/user/types";

const LocalStorageContext = createContext<{
  confirmedUsers: User[] | [];
  updateLocalStorage: (user: User) => void;
}>({
  confirmedUsers: [],
  updateLocalStorage: () => {},
});

export const useLocalStorage = () => useContext(LocalStorageContext);

interface Props {
  children: ReactNode;
}

export const LocalStorageProvider = (props: Props) => {
  const { children } = props;
  const [confirmedUsers, setConfirmedUsers] = useState<User[] | []>([]);

  useEffect(() => {
    const storedUsers = localStorage.getItem("confirmedUsers");

    if (storedUsers) {
      setConfirmedUsers(JSON.parse(storedUsers));
    }
  }, []);

  const updateLocalStorage = (user: User) => {
    setConfirmedUsers((prevConfirmedUsers) => {
      const newUsers = [...prevConfirmedUsers, user];

      localStorage.setItem("confirmedUsers", JSON.stringify(newUsers));

      return newUsers;
    });
  };

  return (
    <LocalStorageContext.Provider
      value={{ confirmedUsers, updateLocalStorage }}
    >
      {children}
    </LocalStorageContext.Provider>
  );
};
