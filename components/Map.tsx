"use client";

import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  
  const darkMapStyle = 'mapbox://styles/mapbox/dark-v10';
  const lightMapStyle = 'mapbox://styles/mapbox/light-v10';

  

  const [lng, setLng] = useState(2.3522);
  const [lat, setLat] = useState(48.8566);
  const [zoom, setZoom] = useState(12);

  // Ce log s'exécutera à chaque rendu.
  // Il affichera `null` au premier rendu, puis l'objet map aux suivants.

  useEffect(() => {
    // Si la carte existe déjà (ex: lors d'un re-rendu), on ne fait rien.
    if (map.current) return; 

    // Si le conteneur n'est pas encore prêt, on ne fait rien.
    if (!mapContainer.current) return; 

    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: darkMapStyle,
        center: [lng, lat],
        zoom: zoom,
        attributionControl: false
      });

      // --- C'EST LE MEILLEUR ENDROIT POUR VÉRIFIER ---
      // L'événement 'load' se déclenche quand la carte est 100% prête.
      map.current.on('load', () => {
        console.log('Événement "load": La carte est prête !', map.current);
        // C'est ici que vous ferez des choses comme ajouter des données (addSource, addLayer)
      });

    } catch (error) {
      console.error("Erreur lors de l'initialisation de Mapbox:", error);
      // Vérifiez votre Jeton d'accès (Access Token) si vous avez une erreur ici
    }

  }, [lng, lat, zoom]); // Le tableau de dépendances vide est important pour n'exécuter qu'une fois

  return (
    <div>
      {/* Assurez-vous que ce conteneur a une taille !
        'height: "100vh"' est le plus simple pour un test plein écran.
      */}
      <div 
        ref={mapContainer} 
        style={{ 
          height: "100vh", 
          width: "100%" 
        }} 
      />
    </div>
  );
}