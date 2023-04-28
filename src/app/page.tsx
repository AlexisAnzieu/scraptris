import { ClientComponent } from "./components/ClientComponent";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function Home() {
    const properties = await prisma.property.findMany({
        select: {
            latitude: true,
            longitude: true,
        },
    });

    return <ClientComponent properties={properties} />;
}
