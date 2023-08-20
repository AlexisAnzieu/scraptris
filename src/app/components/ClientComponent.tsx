"use client";

import dynamic from "next/dynamic";
import { Properties } from "./MapComponent";

const MapWithNoSSR = dynamic(() => import("./MapComponent"), {
    ssr: false,
});

export function ClientComponent({ properties }: { properties: Properties[] }) {
    return (
        <div>
            <MapWithNoSSR properties={properties} />
        </div>
    );
}
