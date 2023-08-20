import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
L.Icon.Default.imagePath = "leaflet/";
import "chart.js/auto";
import { Chart } from "react-chartjs-2";

const MONTREAL_LOCATION = { lat: 45.524184, lng: -73.581435 };

const getDateOfYear = (date: Date) =>
    Math.floor((date.getTime() - +new Date(date.getFullYear(), 0, 0)) / 864e5);

export type Properties = {
    MlsNumber: string;
    latitude: string;
    longitude: string;
    picture: string;
    prices: {
        createdAt: Date;
        id: string;
        amount: number;
    }[];
};

const Markers = ({ properties }: { properties: Properties[] }) => {
    return (
        <>
            {properties.map((property: Properties) => {
                const priceDate = property.prices?.map((p) =>
                    getDateOfYear(new Date(p.createdAt))
                );
                const prices = property.prices?.map((p) => p.amount);

                return (
                    <Marker
                        key={`marker-${property.MlsNumber}`}
                        position={L.latLng(
                            +property.latitude,
                            +property.longitude
                        )}
                    >
                        <Popup minWidth={300}>
                            <img src={property.picture} />
                            Current value: {prices?.[0]}
                            <Chart
                                width={"100%"}
                                type="line"
                                data={{
                                    labels: priceDate,
                                    datasets: [
                                        {
                                            backgroundColor: "#dd6b20",
                                            fill: true,
                                            borderColor: "#dd6b20",
                                            label: "Prix",
                                            data: prices,
                                        },
                                    ],
                                }}
                            />
                        </Popup>
                    </Marker>
                );
            })}
        </>
    );
};

const MapComponent = ({ properties }: { properties: Properties[] }) => {
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
