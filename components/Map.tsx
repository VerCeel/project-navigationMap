"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useTheme } from "next-themes";
import shipData from './data/shipNavigationData.json'; 


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
  const [zoom, setZoom] = useState(4); // Zoom initial plus large

  
  const addDataToMap = useCallback((mapInstance: mapboxgl.Map) => {
    console.log("Ajout des données sur la carte...");

    // Nettoyage préventif des anciennes couches/sources
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
      properties: {}
    };
    const positionGeoJSON = {
      type: "Feature" as const,
      geometry: {
        type: "Point" as const,
        coordinates: lastPosition,
      },
      properties: {}
    };

    mapInstance.addSource("route-source", {
      type: "geojson",
      data: routeGeoJSON, 
    });

    mapInstance.addSource("position-source", {
      type: "geojson",
      data: positionGeoJSON, 
    });

    // Ajout des couches (layers)
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
        container: mapContainer.current, // Utiliser la ref
        style: initialStyle,
        center: [lng, lat], // Centre initial (sera ajusté)
        zoom: zoom,        // Zoom initial (sera ajusté)
        attributionControl: false,
      });
      map.current = mapInstance; // Assigner à la ref après création réussie

      mapInstance.once("load", () => {
        console.log('Événement "load" initial : La carte est prête !');
        // Vérifier à nouveau map.current au cas où le composant serait démonté rapidement
        if (map.current) {
          addDataToMap(map.current);
        }
      });

    } catch (error) {
      console.error("Erreur lors de l'initialisation de Mapbox:", error);
    }

    // Fonction de nettoyage
    return () => {
      console.log("Nettoyage de la carte...");
      mapInstance?.remove(); // Utiliser la variable locale pour le nettoyage
      map.current = null; // Important de réinitialiser la ref
    };

    // Les dépendances : theme (pour le style initial) et les valeurs initiales utilisées
    // addDataToMap n'est pas nécessaire ici car elle est stable (useCallback avec dépendances vides)
  }, [theme, lng, lat, zoom]);


  // --- Effet pour gérer le changement de thème ---
  useEffect(() => {
    // Ne rien faire si la carte n'est pas encore initialisée
    if (!map.current) {
        console.log("Changement de thème ignoré: carte non prête.");
        return;
    }

    console.log(`Changement de thème vers : ${theme}`);
    const newStyle = theme === "dark" ? darkMapStyle : lightMapStyle;

    // Éviter de recharger le style s'il est déjà le bon (optimisation mineure)
    // Note: getStyle().url n'existe pas toujours, vérifier avec précaution ou omettre ce check
    // if (map.current.getStyle().?) { ... }

    map.current.setStyle(newStyle);

    // Ré-ajouter les données après le chargement du nouveau style
    map.current.once("load", () => {
      console.log("Nouveau style chargé, ré-ajout des données.");
      // Vérifier à nouveau car l'état peut changer pendant le chargement asynchrone
      if (map.current) {
        addDataToMap(map.current);
      }
    });

  }, [theme, addDataToMap]); // Dépend de theme et addDataToMap

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