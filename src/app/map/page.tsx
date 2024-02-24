import { ClientComponent } from "../components/ClientComponent";
import { Properties } from "../components/MapComponent";

export default async function Home() {
  const response: Response = await fetch(
    "http://vps-936fc4fa.vps.ovh.net:3500/properties"
  );

  const properties: Properties[] = await response.json();

  return <ClientComponent properties={properties} />;
}
