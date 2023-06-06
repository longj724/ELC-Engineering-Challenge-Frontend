// External Dependencies
import { useEffect, useState, useRef } from 'react';
import Map, { Marker } from 'react-map-gl';
import { Box, Heading, Text } from '@chakra-ui/react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import 'mapbox-gl/dist/mapbox-gl.css';

// Relative Dependencies
import fetchTruckData from '../utils/fetchTruckData';
import { MarkerRef, TruckData } from '../types';

const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

function MapContainer() {
  const [foodTruckData, setFoodTruckData] = useState<Array<TruckData | null>>(
    []
  );
  const markerRefs = useRef<MarkerRef | null>({});

  const handleMarkerRefs = (index: number) => (ref: HTMLDivElement) => {
    if (markerRefs.current) {
      markerRefs.current[index] = ref;
    }
  };

  const displayGoogleMapsButton = (buttonIndex: number) => {
    if (markerRefs.current) {
      markerRefs.current[buttonIndex].style.display = 'initial';
    }
  };

  const hideGoogleMapsButton = (buttonIndex: number) => {
    if (markerRefs.current) {
      markerRefs.current[buttonIndex].style.display = 'none';
    }
  };

  const mapFoodTrucks = async () => {
    const truckData = await fetchTruckData();
    setFoodTruckData(truckData);
  };

  useEffect(() => {
    mapFoodTrucks();
  }, []);

  return (
    <Box width="100%" height="100vh">
      <Map
        initialViewState={{
          latitude: 37.7749,
          longitude: -122.4194,
          zoom: 12,
        }}
        mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        {foodTruckData.map((truckData: TruckData | null, index: number) => (
          <Marker
            key={truckData?.locationid}
            latitude={Number(truckData?.latitude)}
            longitude={Number(truckData?.longitude)}
            anchor="bottom"
          >
            <Box
              width="100px"
              height="100px"
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="end"
              gap={2}
              onMouseEnter={() => displayGoogleMapsButton(index)}
              onMouseLeave={() => hideGoogleMapsButton(index)}
            >
              <Box
                display="none"
                width="200px"
                backgroundColor="white"
                ref={handleMarkerRefs(index)}
                borderRadius="5px"
              >
                <Box padding={4}>
                  <Heading size="sm">Address</Heading>
                  <Text mb={1}>{truckData?.address}</Text>
                  <Heading size="sm">Food Items</Heading>
                  <Text>{truckData?.foodItems}</Text>
                </Box>
              </Box>
              <FaMapMarkerAlt size={36} color="#2C7A7B" />
            </Box>
          </Marker>
        ))}
      </Map>
    </Box>
  );
}

export default MapContainer;
