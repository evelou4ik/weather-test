import BasicTemplateProvider from "@/templates/BasicTemplatesProvider";
import { UsersList } from "@/components/index";
import ConfirmedUsersList from "@/components/user/ConfirmedUsersList";
import { LocalStorageProvider } from "@/templates/LocalStorageContext";
import Map from "@/components/Map/Map";

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
