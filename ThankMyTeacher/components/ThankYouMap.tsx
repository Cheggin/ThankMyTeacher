import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

interface SchoolLocation {
  id: string;
  name: string;
  location: string;
  latitude: number;
  longitude: number;
  thankYouCount: number;
}

interface ThankYouMapProps {
  schoolData: SchoolLocation[];
  onSchoolPress?: (school: SchoolLocation) => void;
}

export default function ThankYouMap({ schoolData, onSchoolPress }: ThankYouMapProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [mapHtml, setMapHtml] = useState('');

  useEffect(() => {
    generateMapHTML();
  }, [schoolData]);

  const generateMapHTML = () => {
    if (schoolData.length === 0) {
      setMapHtml(`
        <!DOCTYPE html>
        <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY"></script>
          <style>
            body { margin: 0; padding: 0; }
            #map { width: 100%; height: 100vh; }
            .no-data { 
              display: flex; 
              justify-content: center; 
              align-items: center; 
              height: 100vh; 
              font-family: Arial, sans-serif;
              color: #666;
            }
          </style>
        </head>
        <body>
          <div class="no-data">
            <h2>No thank you data available yet</h2>
            <p>Be the first to send a thank you!</p>
          </div>
        </body>
        </html>
      `);
      setIsLoading(false);
      return;
    }

    const markers = schoolData.map(school => `
      new google.maps.Marker({
        position: { lat: ${school.latitude}, lng: ${school.longitude} },
        map: map,
        title: '${school.name}',
        label: {
          text: '${school.thankYouCount}',
          color: 'white',
          fontSize: '12px',
          fontWeight: 'bold'
        },
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: '#FF6B6B',
          fillOpacity: 0.8,
          strokeColor: '#FFFFFF',
          strokeWeight: 2
        }
      })
    `).join(',');

    const bounds = schoolData.reduce((acc, school) => {
      return {
        north: Math.max(acc.north, school.latitude),
        south: Math.min(acc.south, school.latitude),
        east: Math.max(acc.east, school.longitude),
        west: Math.min(acc.west, school.longitude)
      };
    }, { north: -90, south: 90, east: -180, west: 180 });

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY"></script>
        <style>
          body { margin: 0; padding: 0; }
          #map { width: 100%; height: 100vh; }
          .legend {
            position: absolute;
            top: 10px;
            right: 10px;
            background: white;
            padding: 10px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            font-family: Arial, sans-serif;
            font-size: 12px;
          }
          .legend-item {
            display: flex;
            align-items: center;
            margin: 5px 0;
          }
          .legend-dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: #FF6B6B;
            margin-right: 8px;
            border: 2px solid white;
          }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <div class="legend">
          <h4 style="margin: 0 0 10px 0;">Thank You Map</h4>
          <div class="legend-item">
            <div class="legend-dot"></div>
            <span>Schools with thank yous</span>
          </div>
          <div style="font-size: 10px; color: #666; margin-top: 10px;">
            Numbers show thank you count
          </div>
        </div>
        <script>
          const map = new google.maps.Map(document.getElementById('map'), {
            zoom: 10,
            center: { lat: ${(bounds.north + bounds.south) / 2}, lng: ${(bounds.east + bounds.west) / 2} },
            styles: [
              {
                featureType: 'poi',
                elementType: 'labels',
                stylers: [{ visibility: 'off' }]
              }
            ]
          });

          const bounds = new google.maps.LatLngBounds();
          
          const markers = [${markers}];
          
          markers.forEach(marker => {
            bounds.extend(marker.getPosition());
          });
          
          map.fitBounds(bounds);
          
          // Add click listeners to markers
          markers.forEach((marker, index) => {
            marker.addListener('click', () => {
              const school = ${JSON.stringify(schoolData)}[index];
              window.ReactNativeWebView.postMessage(JSON.stringify({
                type: 'schoolClick',
                school: school
              }));
            });
          });
        </script>
      </body>
      </html>
    `;

    setMapHtml(html);
    setIsLoading(false);
  };

  const handleMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === 'schoolClick' && onSchoolPress) {
        onSchoolPress(data.school);
      }
    } catch (error) {
      console.error('Error parsing map message:', error);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B6B" />
        <ThemedText style={styles.loadingText}>Loading map...</ThemedText>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <WebView
        source={{ html: mapHtml }}
        style={styles.map}
        onMessage={handleMessage}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        renderLoading={() => (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FF6B6B" />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F5',
  },
  map: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF5F5',
  },
  loadingText: {
    marginTop: 10,
    color: '#636E72',
    fontSize: 16,
  },
}); 