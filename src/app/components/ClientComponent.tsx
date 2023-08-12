"use client";

import { Properties } from "csstype";
import dynamic from "next/dynamic";

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
