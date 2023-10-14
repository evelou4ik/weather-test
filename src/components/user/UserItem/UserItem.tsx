"use client";
import { useState } from "react";
import useGetWeather from "@/hooks/useGetWeather";
import { User } from "@/components/user/types";
import Highcharts from "highcharts";
import Image from "next/image";
import HighchartsReact from "highcharts-react-official";
import { Modal, UserItemInfo, UserItemWeather } from "@/components";
import Button from "@/components/user/Button";
import {useLocalStorage} from "@/templates/LocalStorageContext";

interface Props {
  onRemoveUser?: (id: string) => void;
  className?: string;
  user: User;
}

const getChartOptions = (
  country: string,
  minWeather: number,
  maxWeather: number,
  chartData: {
    seriesData: number[];
    categories: string[];
  },
) => {
  return {
    chart: {
      type: "line",
    },
    title: {
      text: `${country}: min = ${minWeather} (°C), max = ${maxWeather} (°C)`,
    },
    series: [
      {
        name: "Temperature for the current day",
        data: chartData.seriesData,
      },
    ],
    xAxis: {
      categories: chartData.categories,
    },
    yAxis: {
      title: {
        text: "Temperature (°C)",
      },
    },
    credits: {
      enabled: false,
    },
  };
};

export default function UserItem(props: Props) {
  const {
    className,
    user: { picture, name, gender, location, email, login },
    onRemoveUser,
  } = props;

  const [isModalOpen, setModalOpen] = useState(false);
  const { weatherValues, weatherIcon, chartData, isSuccess } = useGetWeather(
    location.coordinates.latitude,
    location.coordinates.longitude,
  );

  const { updateLocalStorage } = useLocalStorage();

  const openModal = () => {
    setModalOpen(true);
    document.body.classList.add("scroll-disable");
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.classList.remove("scroll-disable");
  };

  const handleButtonClick = () => {
    updateLocalStorage(props.user)

    onRemoveUser && onRemoveUser(login.username);
  };

  return (
    <div className={className ?? ""}>
      <Image
        className={"mb-4"}
        width={150}
        height={150}
        src={picture.medium}
        alt="User Photo"
      />
      <div className={"flex flex-col h-full"}>
        <UserItemInfo
          name={name}
          gender={gender}
          location={location}
          email={email}
        />
        {isSuccess && (
          <UserItemWeather weatherValue={weatherValues} icon={weatherIcon} />
        )}
        <div className={"flex items-center gap-4"}>
          {onRemoveUser && <Button label="Save" onClick={handleButtonClick} />}
          <Button label="Weather" onClick={openModal} />
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <HighchartsReact
          highcharts={Highcharts}
          options={getChartOptions(
            location.country,
            weatherValues.minWeatherValue,
            weatherValues.maxWeatherValue,
            chartData,
          )}
        />
      </Modal>
    </div>
  );
}
