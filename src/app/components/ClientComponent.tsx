"use client";

import dynamic from "next/dynamic";
import { ResultsEntity } from "@/types/Properties";

const MapWithNoSSR = dynamic(() => import("./MapComponent"), {
    ssr: false,
});

export function ClientComponent(props: { properties: any[] }) {
    return (
        <div>
            <MapWithNoSSR properties={props.properties} />
        </div>
    );
}
