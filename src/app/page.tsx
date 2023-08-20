import { ClientComponent } from "./components/ClientComponent";
import { Properties } from "./components/MapComponent";

export default async function Home() {
    const result: any = await fetch(
        "http://vps-936fc4fa.vps.ovh.net:3500/properties"
    );

    const properties: Properties[] = await result.json();
    console.log(properties);

    return <ClientComponent properties={properties} />;
}
