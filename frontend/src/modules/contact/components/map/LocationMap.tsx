import React from 'react';
import { useTranslation } from 'react-i18next';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapContent: React.FC = () => {
  const map = useMap();
  return (
    <>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap contributors"
      />
      <Marker 
        position={[30.03512481554289, 31.351718872819138]}
        eventHandlers={{
          click: () => map.flyTo([30.03512481554289, 31.351718872819138], 17, { duration: 1 })
        }}
      >
        <Popup>I-SOFT Company</Popup>
      </Marker>
      <Marker 
        position={[30.092730, 31.384211]}
        eventHandlers={{
          click: () => map.flyTo([30.092730, 31.384211], 17, { duration: 1 })
        }}
      >
        <Popup>Degla</Popup>
      </Marker>
    </>
  );
};

const LocationMap: React.FC = () => {
  const { t } = useTranslation('contact');

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-cairo font-semibold mb-6">{t('map.title')}</h2>
      <div className="h-[300px] rounded-lg overflow-hidden">
        <MapContainer
          center={[26.8206, 30.8025]} // Egypt center
          zoom={6}
          style={{ height: "100%", width: "100%" }}
        >
          <MapContent />
        </MapContainer>
      </div>
    </div>
  )
}

export default LocationMap