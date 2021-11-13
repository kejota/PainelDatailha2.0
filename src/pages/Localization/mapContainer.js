/*global google*/
import React from 'react';
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow} from "react-google-maps";

const MapContainer = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAI8lQYwx6TS2T7xFIS_6aavj8QnzdWcLU&callback=initMap&libraries=&v=weekly",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `800px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
)(props =>
    <GoogleMap
        defaultZoom={7}
        defaultCenter={new google.maps.LatLng(-6.0880949,-50.4326455)}
        options={{
            gestureHandling:'greedy',
            streetViewControl:true,
            fullscreenControl:true,
          }}
        >

         {props.places.map(place => (
          <Marker
            key={`marker-${place._id}`}
            name={place.title}
            position={{lat: place.coordinates[0], lng: place.coordinates[1]}}
            
          >
          <InfoWindow
            key={`infowindow-${place.name}`}
            visible={true}>
            <div>
                <b>{place.thisResearcherResponse}</b>
            </div>
          </InfoWindow>
          </Marker>
        ))}

    </GoogleMap>
);

export default MapContainer;
