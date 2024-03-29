import React, { useState, useEffect } from "react";
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  GeoJSON,
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { Link, useLocation } from "react-router-dom";

import "./Mapa.css";
import api from "../../Services/api";

import markerVerde from "../../Assets/Icons/Markers/markerVerde.png";
import markerAmarelo from "../../Assets/Icons/Markers/markerAmarelo.png";
import markerVermelho from "../../Assets/Icons/Markers/markerVermelho.png";
import markerUnavailable from "../../Assets/Icons/Markers/markerUnavailable.png";

import distritos from "../../Assets/CoordenadasDistritos/coordendas.json";

function getIcon(risco, disponibilidade) {
  let marker;
  if (!disponibilidade) marker = markerUnavailable;
  else if (risco < 0.5) marker = markerVerde;
  else if (risco < 0.88) marker = markerAmarelo;
  else marker = markerVermelho;

  return L.icon({
    iconUrl: marker,
    iconSize: 30,
    popupAnchor: [0, -20], // move o popup [direita, baixo]
  });
}

const createClusterCustomIcon = function (cluster) {
  //Falta criar aqui uma forma de alterar a cor com base no interior do cluster
  return L.divIcon({
    html: `<span>${cluster.getChildCount()}</span>`,
    className: "marker-cluster-custom",
    iconSize: L.point(40, 40, true),
  });
};

const paraCadaUm = (distrito, layer) => {
  const NomeDistrito = distrito.nome;
  layer.bindPopup(NomeDistrito); // Cria o popup quando se clica no distrito
  layer.options.fillColor = "#e0d499"; // Muda a cor dos distritos
  layer.options.fillOpacity = 0.6; // Opacidade
  layer.options.weight = 1; // Espessura da linha dos distritos
  layer.options.color = "white";
  
  
  //Tracejado caso seja preciso

  // layer.options.dashArray = '3';
};

function Mapa() {
  const [lojas, setLojas] = useState([]);
  const location = useLocation();
  let rotaApi = "";

  useEffect(() => {
    //Atribuicao do endpoint para filtrar as lojas
    if (location.pathname === "/dashboard/")
      rotaApi = "loja";
    else if (location.pathname === "/dashboard/continentes")
      rotaApi = "loja/id/Continente";
    else if (location.pathname === "/dashboard/bomdia")
      rotaApi = "loja/id/ContinenteBomDia"
    console.log(location.pathname);
    api.get(rotaApi).then((data) => {
      setLojas(data.data);
    });
  }, []);

  return (
    <MapContainer
      center={[39.6, -8]}
      zoom={7}
      scrollWheelZoom={true}
      minZoom={7}
      doubleClickZoom={false}
      className="mapa"
    >
      //Layer do mapa
      <TileLayer
        attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
      />

       //Mapa de Portugal
      <GeoJSON
        data={distritos.features}
        onEachFeature={paraCadaUm}
      />

      <MarkerClusterGroup
        iconCreateFunction={createClusterCustomIcon}
        disableClusteringAtZoom={15}
        maxClusterRadius={100}
        animateAddingMarkers={true}
        showCoverageOnHover={false}
      >
        {lojas.map((continente) => (
          <Marker
            position={[
              parseFloat(continente.Lat.replace(",", ".")),
              parseFloat(continente.Long.replace(",", ".")),
            ]}
            icon={getIcon(
              parseFloat(continente.Nivel_risco),
              continente.Disponivel
            )}
            // icon={getIcon(parseFloat(continente.Nivel_risco.replace(",", ".")), continente.Disponivel)} // Este nao funciona porque a maioria nao tem o risco para fazer replace
            interactive={continente.Disponivel}
          >
            <Popup>
              <h3>{continente.Nome}</h3>
              <p>
                Lat: {parseFloat(continente.Lat.replace(",", "."))}
                <br />
                Long: {parseFloat(continente.Long.replace(",", "."))}
                <br />
                Nivel de Risco: {continente.Nivel_risco}
              </p>
              <Link to={`/dashboard/loja/:${continente._id}`}>Ver Mais</Link>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}

export default Mapa;
