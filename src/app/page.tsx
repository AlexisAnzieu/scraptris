import { Properties } from "@/types/Properties";
import { ClientComponent } from "./components/ClientComponent";

export default async function Home() {
    const result: any = await fetch(
        "http://vps-936fc4fa.vps.ovh.net:3500/properties"
    );

    const properties: Properties[] = await result.json();

    return <ClientComponent properties={properties} />;
}
