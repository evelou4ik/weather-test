import BasicTemplateProvider from "@/templates/BasicTemplatesProvider";
import { UsersList } from "@/components/index";
import ConfirmedUsersList from "@/components/user/ConfirmedUsersList";
import { LocalStorageProvider } from "@/templates/LocalStorageContext";
import dynamic from "next/dynamic"

const Map = dynamic(() => import("@/components/Map/Map"), { ssr:false })

export default function Home() {
  return (
    <BasicTemplateProvider>
      <LocalStorageProvider>
        <ConfirmedUsersList title="Confirmed users" />
        <UsersList title="New users" />
        <Map />
      </LocalStorageProvider>
    </BasicTemplateProvider>
  );
}
