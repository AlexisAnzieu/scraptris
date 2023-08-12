import { ClientComponent } from "./components/ClientComponent";

export default async function Home() {
    const properties: any = await fetch(
        "http://vps-936fc4fa.vps.ovh.net:3500/properties"
    );

    const res = await properties.json();

    return <ClientComponent properties={res} />;
}
