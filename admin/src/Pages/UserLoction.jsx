import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { GetAllUser } from "../hooks/Auth/useLogin";
import { Icon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

function UserLocation() {
  const { AllUser } = GetAllUser();

  const custemIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/2642/2642502.png",
    iconSize: [40, 40],
  });
  return (
    <MapContainer
      center={[24.692021, 46.702776]}
      zoom={15}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MarkerClusterGroup chunkedLoading>
        {AllUser &&
          AllUser.map((user) => {
            const userLocation = user.location[0];
            return userLocation ? (
              <Marker
                key={user._id}
                position={[userLocation.lat, userLocation.lang]}
                icon={custemIcon}
              >
                <Popup>
                  <h1 className="text-3xl font-bold text-black">
                    {user.name} {user.lastname}
                  </h1>
                </Popup>
              </Marker>
            ) : null;
          })}
      </MarkerClusterGroup>
    </MapContainer>
  );
}

export default UserLocation;
