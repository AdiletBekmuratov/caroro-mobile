import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { InteractionManager, View } from 'react-native';
import WebView from 'react-native-webview';
import tw from 'twrnc';
import Spinner from './Spinner';

const customHTML = (latLng: [number, number]) => {
  const htmlElement = `
<html>
  <head>
    <title>Caroro MapView</title>
    <meta charset="UTF-8"></meta>
    <meta content="width=device-width, initial-scale=1, maximum-scale=1" name="viewport"></meta>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
        integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI="
        crossorigin=""/>
    <style>
    body {
      padding: 0;
      margin: 0;
    }
    html, body, #map {
      height: 100%;
      width: 100vw;
    }
    </style>
  </head>

  <body>
    <div id="map"></div>

    <script src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js"
    integrity="sha256-WBkoXOwTeyKclOHuWtc+i2uENFpDZ9YPdf5Hf+D7ewM="
    crossorigin=""></script>

    <script>
      let map = L.map('map').setView([${latLng[0] - 0.0025}, ${latLng[1]}], 15);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 20,
        attribution: '&copy; Caroro'
      }).addTo(map);
      L.marker([${latLng[0]}, ${latLng[1]}], {closeButton: false}).addTo(map)
      .bindPopup('Ваша машина находиться здесь')
      .openPopup();
    </script>
  </body>
<html>`;

  return htmlElement;
};

interface MapViewProps {
  style: string;
  latLng: [number, number];
}

const MapView: FC<MapViewProps> = ({ style, latLng }) => {
  const [loading, setLoading] = useState(true);
  const webviewRef = useRef(null);
  const [isWebViewLoaded, setIsWebViewLoaded] = useState(false);
  let navigation = useNavigation();

  const handleLoadEnd = () => {
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      InteractionManager.runAfterInteractions(() => setIsWebViewLoaded(true));
    }, []),
  );

  useEffect(
    useCallback(() => {
      const unsubscribe = navigation.addListener('beforeRemove', () => {
        setIsWebViewLoaded(false);
      });
      return unsubscribe;
    }, []),
  );

  return (
    <View style={[tw`${style}`]}>
      {isWebViewLoaded && (
        <WebView
          ref={webviewRef}
          onLoad={handleLoadEnd}
          automaticallyAdjustContentInsets={false}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          androidHardwareAccelerationDisabled
          useWebKit={true}
          style={{
            backgroundColor: 'transparent',
            opacity: 0.99,
          }}
          source={{
            html: customHTML(latLng),
          }}
        />
      )}

      {(loading || !isWebViewLoaded) && <Spinner />}
    </View>
  );
};

export default MapView;
