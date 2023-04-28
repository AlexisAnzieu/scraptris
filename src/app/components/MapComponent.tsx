import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { ResultsEntity } from "@/types/Properties";
import L from "leaflet";
L.Icon.Default.imagePath = "leaflet/";

const MONTREAL_LOCATION = { lat: 45.524184, lng: -73.581435 };

const Markers = ({ properties }: { properties: any }) => {
    console.log("properties", properties);
    return (
        <>
            {properties.properties.map((property: any) => (
                <Marker
                    key={`marker-${property.MlsNumber}`}
                    position={L.latLng(+property.latitude, +property.longitude)}
                >
                    <Popup>coucou</Popup>
                </Marker>
            ))}
        </>
    );
};

const MapComponent = (properties: ResultsEntity[]) => {
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
