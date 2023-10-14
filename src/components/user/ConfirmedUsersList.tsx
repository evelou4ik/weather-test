"use client";
import UserItem from "./UserItem/UserItem";
import { User } from "@/components/user/types";
import { useLocalStorage } from "@/templates/LocalStorageContext";

interface Props {
  title: string;
}

export default function ConfirmedUsersList(props: Props) {
  const { confirmedUsers } = useLocalStorage();
  const { title } = props;

  return confirmedUsers.length > 0 ? (
    <div className="p-4 flex flex-col w-full">
      <h2 className={"text-center lg:text-4xl text-2xl font-bold text-zinc-700 mb-2"}>
        {title}
      </h2>
      <div
        className={
          "grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3"
        }
      >
        {confirmedUsers.map((user: User) => {
          return (
            <UserItem
              className={
                "flex flex-col border-2 overflow-hidden p-4 border-gray-300 rounded-lg shadow-md md:flex-col md:border-4 md:border-opacity-70 md:p-6 md:rounded-xl md:shadow-lg lg:flex-col lg:border-4 lg:border-opacity-80 lg:p-8 lg:rounded-2xl lg:shadow-2xl"
              }
              key={user.login.username}
              user={user}
            />
          );
        })}
      </div>
    </div>
  ) : (
    <></>
  );
}
