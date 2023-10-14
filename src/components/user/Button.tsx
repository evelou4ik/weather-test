interface Props {
  label: string;
  onClick: () => void;
}

export default function Button(props: Props) {
  const { label, onClick } = props;

  return (
    <button
      onClick={onClick}
      className={
        "px-4 py-2 bg-blue-500 text-white rounded-md transition duration-300 hover:bg-blue-700"
      }
    >
      {label}
    </button>
  );
}
