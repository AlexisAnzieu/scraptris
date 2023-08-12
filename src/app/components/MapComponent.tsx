import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
L.Icon.Default.imagePath = "leaflet/";
import "chart.js/auto";
import { Chart } from "react-chartjs-2";

const MONTREAL_LOCATION = { lat: 45.524184, lng: -73.581435 };

type Properties = {
    MlsNumber: string;
    latitude: string;
    longitude: string;
    prices: {
        createdAt: Date;
        id: string;
        amount: number;
    }[];
};

const Markers = ({ properties }: { properties: any }) => {
    console.log(properties);
    return (
        <>
            {properties.properties.map((property: Properties) => (
                <Marker
                    key={`marker-${property.MlsNumber}`}
                    position={L.latLng(+property.latitude, +property.longitude)}
                >
                    <Popup>
                        {property.prices.map((p) => p.amount).join(" ")}
                        <Chart
                            type="line"
                            data={{
                                labels: property.prices.map((p) => p.createdAt),
                                datasets: [
                                    {
                                        backgroundColor: "#dd6b20",
                                        fill: true,
                                        borderColor: "#dd6b20",
                                        label: "Prix",
                                        data: property.prices.map(
                                            (p) => p.amount
                                        ),
                                    },
                                ],
                            }}
                        />
                    </Popup>
                </Marker>
            ))}
        </>
    );
};

const MapComponent = (properties: any) => {
    return (
        <MapContainer
            center={MONTREAL_LOCATION}
            zoom={12}
            style={{ height: "100vh" }}
        >
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Markers properties={properties} />
        </MapContainer>
    );
};

export default MapComponent;
