interface Props {
  label: string;
  value: number;
}

export default function WeatherField(props: Props) {
  const { label, value } = props;

  return (
    <p className="font-semibold text-blue-600 text-sm">
      {label}:<span className="text-gray-800 text-sm"> {value}</span>
    </p>
  );
}
