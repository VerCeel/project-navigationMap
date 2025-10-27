"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useTheme } from "next-themes";
import shipData from "./data/shipNavigationData.json";
import { Spinner } from "./ui/spinner";

interface ShipPoint {
  lat: number;
  lon: number;
  speed: number;
}

const typedShipData: ShipPoint[] = shipData;

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

export default function Map() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const { theme } = useTheme();

  const darkMapStyle = "mapbox://styles/mapbox/dark-v10";
  const lightMapStyle = "mapbox://styles/mapbox/light-v10";

  const [lng, setLng] = useState(2.3522);
  const [lat, setLat] = useState(48.8566);
  const [zoom, setZoom] = useState(4);

  const addDataToMap = useCallback((mapInstance: mapboxgl.Map) => {
    console.log("Ajout des données sur la carte...");

    if (mapInstance.getLayer("route-layer")) {
      mapInstance.removeLayer("route-layer");
    }
    if (mapInstance.getSource("route-source")) {
      mapInstance.removeSource("route-source");
    }
    if (mapInstance.getLayer("position-layer")) {
      mapInstance.removeLayer("position-layer");
    }
    if (mapInstance.getSource("position-source")) {
      mapInstance.removeSource("position-source");
    }

    const routeCoordinates = typedShipData.map((point) => [
      point.lon,
      point.lat,
    ]);

    if (routeCoordinates.length === 0) {
      console.warn("Aucune coordonnée à afficher.");
      return;
    }

    const lastPosition = routeCoordinates[routeCoordinates.length - 1];

    const routeGeoJSON = {
      type: "Feature" as const,
      geometry: {
        type: "LineString" as const,
        coordinates: routeCoordinates,
      },
      properties: {},
    };
    const positionGeoJSON = {
      type: "Feature" as const,
      geometry: {
        type: "Point" as const,
        coordinates: lastPosition,
      },
      properties: {},
    };

    mapInstance.addSource("route-source", {
      type: "geojson",
      data: routeGeoJSON,
    });

    mapInstance.addSource("position-source", {
      type: "geojson",
      data: positionGeoJSON,
    });

    mapInstance.addLayer({
      id: "route-layer",
      type: "line",
      source: "route-source",
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "#3887be",
        "line-width": 5,
        "line-opacity": 0.8,
      },
    });

    mapInstance.addLayer({
      id: "position-layer",
      type: "circle",
      source: "position-source",
      paint: {
        "circle-radius": 8,
        "circle-color": "#f74c4c",
        "circle-stroke-width": 2,
        "circle-stroke-color": "white",
      },
    });

    const bounds = new mapboxgl.LngLatBounds(
      routeCoordinates[0] as mapboxgl.LngLatLike,
      routeCoordinates[0] as mapboxgl.LngLatLike
    );
    for (const coord of routeCoordinates) {
      bounds.extend(coord as mapboxgl.LngLatLike);
    }
    mapInstance.fitBounds(bounds, {
      padding: 50,
    });
  }, []);

  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    console.log("Initialisation de la carte...");
    let mapInstance: mapboxgl.Map | null = null;

    try {
      const initialStyle = theme === "dark" ? darkMapStyle : lightMapStyle;
      mapInstance = new mapboxgl.Map({
        container: mapContainer.current,
        style: initialStyle,
        center: [lng, lat],
        zoom: zoom,
        attributionControl: false,
      });
      map.current = mapInstance;

      mapInstance.once("load", () => {
        <div className="flex items-center gap-4">
          <Spinner />
        </div>;

        if (map.current) {
          addDataToMap(map.current);
        }
      });
    } catch (error) {
      console.error("Erreur lors de l'initialisation de Mapbox:", error);
    }

    return () => {
      mapInstance?.remove();
      map.current = null;
    };
  }, [theme, lng, lat, zoom]);

  useEffect(() => {
    if (!map.current) {
      console.log("Changement de thème ignoré: carte non prête.");
      return;
    }

    console.log(`Changement de thème vers : ${theme}`);
    const newStyle = theme === "dark" ? darkMapStyle : lightMapStyle;

    map.current.setStyle(newStyle);

    map.current.once("load", () => {
      <div className="flex items-center gap-4">
        <Spinner />
      </div>;

      if (map.current) {
        addDataToMap(map.current);
      }
    });
  }, [theme, addDataToMap]);

  return (
    <div>
      <div
        ref={mapContainer}
        style={{
          height: "100vh",
          width: "100%",
        }}
      />
    </div>
  );
}
