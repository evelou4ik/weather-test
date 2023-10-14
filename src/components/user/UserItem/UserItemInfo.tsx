import { UserLocation, UserName } from "@/components/user/types";

const formatUserName = (userName: UserName) => {
  return `${userName.title} ${userName.first} ${userName.last}`;
};

interface Props {
  name: UserName;
  gender: string;
  location: UserLocation;
  email: string;
}

export default function UserItemInfo(props: Props) {
  const {
    name,
    gender,
    location: {
      country,
      city,
      street: { name: streetName, number: streetNumber },
    },
    email,
  } = props;

  const userFields = [
    { label: "Name", value: formatUserName(name) },
    { label: "Email", value: email },
    {
      label: "Location",
      value: `${country}, ${city}, ${streetName}, ${streetNumber}`,
    },
    { label: "Gender", value: gender },
  ];

  return (
    <div>
      {userFields.map((field) => (
        <p
          key={field.label}
          className="font-semibold text-blue-600 text-sm mb-2"
        >
          {field.label}:
          <span className="text-gray-800 text-sm"> {field.value}</span>
        </p>
      ))}
    </div>
  );
}
