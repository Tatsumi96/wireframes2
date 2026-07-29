import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const defaultIcon = L.icon({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface MarkerData {
  lat: number;
  lng: number;
  title: string;
  price?: string;
  onClick?: () => void;
}

interface MapViewProps {
  markers?: MarkerData[];
  center?: [number, number];
  zoom?: number;
  className?: string;
  style?: React.CSSProperties;
  interactive?: boolean;
}

const MapView: React.FC<MapViewProps> = ({
  markers = [],
  center = [43.7, 6.0],
  zoom = 7,
  className,
  style,
  interactive = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: center as L.LatLngExpression,
      zoom,
      zoomControl: interactive,
      scrollWheelZoom: interactive,
      dragging: interactive,
      doubleClickZoom: interactive,
      touchZoom: interactive,
      attributionControl: false,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    map.eachLayer(layer => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });

    markers.forEach(m => {
      const marker = L.marker([m.lat, m.lng], { icon: defaultIcon }).addTo(map);
      if (m.title) {
        marker.bindPopup(`<strong>${m.title}</strong>${m.price ? '<br/>' + m.price : ''}`);
      }
      if (m.onClick) {
        marker.on('click', m.onClick);
      }
    });

    if (markers.length > 0) {
      const bounds = L.latLngBounds(markers.map(m => [m.lat, m.lng] as L.LatLngExpression));
      if (markers.length > 1) {
        map.fitBounds(bounds, { padding: [40, 40] });
      } else {
        map.setView([markers[0].lat, markers[0].lng], zoom);
      }
    }
  }, [markers, zoom]);

  return (
    <div ref={containerRef} className={className} style={{ height: '100%', width: '100%', ...style }} />
  );
};

export default MapView;
