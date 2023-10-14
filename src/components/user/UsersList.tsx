"use client";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { fetchData } from "@/helpers/helpers";
import { User } from "@/components/user/types";
import { urlRandomUsers } from "@/components/user/constants";
import UserItem from "@/components/user/UserItem/UserItem";

interface Props {
  title: string;
}

const BUTTON_STYLES =
  "border-2 border-black border-opacity-70 rounded-2xl px-4 py-2 mb-4 mx-auto font-medium transition hover:bg-black hover:text-white";

export default function UsersList(props: Props) {
  const { title } = props;

  const { data, isSuccess, isFetching } = useQuery(["users"], () =>
    fetchData(urlRandomUsers),
  );

  const [users, setUsers] = useState<User[] | []>([]);

  const refreshData = async () => {
    const newUsers = await fetchData(urlRandomUsers);

    setUsers((prevState) => [...prevState, ...newUsers.results]);
  };

  useEffect(() => {
    if (isSuccess) {
      setUsers(data.results);
    }
  }, [isSuccess]);

  const removeConfirmedUserHandler = (id: string) => {
    const filteredUsers = users.filter((user: User) => user.login.username !== id)

    setUsers(filteredUsers)
  }

  return (
    <div className={"p-4 flex flex-col w-full"}>
      <h2 className={"text-center text-4xl font-bold text-zinc-700 mb-2"}>
        {title}
      </h2>
      {isFetching && (
        <span className={"text-center text-4xl font-bold text-zinc-700 mt-10"}>
          Loading...
        </span>
      )}
      {isSuccess && (
        <>
          <button
            className={BUTTON_STYLES}
            onClick={refreshData}
            disabled={isFetching}
          >
            Load more Users
          </button>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {users.map((user: User) => {
              return (
                <UserItem
                  className={
                    "flex flex-col border-2 border-opacity-80 overflow-hidden p-4 border-gray-300 rounded-lg shadow-md md:flex-col md:border-4 md:p-6 md:rounded-xl md:shadow-lg lg:flex-col lg:border-4 lg:border-opacity-80 lg:p-8 lg:rounded-2xl lg:shadow-2xl"
                  }
                  key={user.login.username}
                  user={user}
                  onRemoveUser={removeConfirmedUserHandler}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
