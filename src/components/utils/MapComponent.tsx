import React, { useEffect, useRef, useState } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import { Box } from "@mui/material";
import { useClientSize } from "../../hooks";

interface MapProps {
  center: google.maps.LatLngLiteral;
  zoom: number;
}

const centerCoordinates: google.maps.LatLngLiteral = {
  lng: 10.764293,
  lat: 59.928036,
};

const wmanCoordinates: google.maps.LatLngLiteral = {
  lng: 10.782253,
  lat: 59.928793,
};

export const MapComponent: React.FC = ({}) => {
  return (
    <Wrapper apiKey={process.env.NEXT_G_MAPS_KEY!}>
      <Map center={centerCoordinates} zoom={15} />
    </Wrapper>
  );
};
const Map: React.FC<MapProps> = ({ center, zoom }) => {
  const ref = useRef<any>(null);
  const zoomControlDiv = useRef<any>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    if (ref.current) {
      //@ts-ignore
      const map = new google.maps.Map(ref.current, {
        center,
        zoom,
        mapId: "9afc9998475338fe",
        disableDefaultUI: true,
      } as google.maps.MapOptions);

      setMap(map);
    }
  }, [ref.current]);

  useEffect(() => {
    if (zoomControlDiv.current && map) {
      map.controls[google.maps.ControlPosition.LEFT_CENTER].push(
        zoomControlDiv.current
      );
    }
  }, [zoomControlDiv.current, map]);

  return (
    <>
      <Box ref={ref} id="map" width="100%" height="100%">
        {map && <Marker position={wmanCoordinates} map={map} />}
      </Box>
    </>
  );
};

const Marker: React.FC<google.maps.MarkerOptions> = (options) => {
  const [marker, setMarker] = React.useState<google.maps.Marker>();

  React.useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker());
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  React.useEffect(() => {
    if (marker) {
      marker.setOptions(options);
    }
  }, [marker, options]);

  return null;
};
