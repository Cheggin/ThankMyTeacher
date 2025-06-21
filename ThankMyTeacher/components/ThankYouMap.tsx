import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
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
          <style>
            body { 
              margin: 0; 
              padding: 0; 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              background-color: #FFF5F5;
            }
            .no-data { 
              text-align: center;
              color: #636E72;
            }
            .no-data h2 {
              margin-bottom: 8px;
              font-size: 20px;
              font-weight: bold;
            }
            .no-data p {
              font-size: 16px;
              color: #B2BEC3;
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

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://maps.googleapis.com/maps/api/js?key=${process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY}"></script>
        <style>
          body { margin: 0; padding: 0; }
          #map { width: 100%; height: 100vh; }
          .info-window {
            background: white;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            max-width: 250px;
          }
          .info-window h3 {
            margin: 0 0 8px 0;
            color: #2D3436;
            font-size: 16px;
            font-weight: bold;
          }
          .info-window p {
            margin: 4px 0;
            color: #636E72;
            font-size: 14px;
          }
          .info-window .count {
            color: #FF6B6B;
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script>
          const map = new google.maps.Map(document.getElementById('map'), {
            zoom: 4,
            center: { lat: 39.8283, lng: -98.5795 }, // Center of the United States
            scrollwheel: true, // Enable mouse wheel zooming
            gestureHandling: 'cooperative', // Allow zooming with mouse wheel
            mapTypeControl: false,
            streetViewControl: false,
            styles: [
              {
                featureType: 'poi',
                elementType: 'labels',
                stylers: [{ visibility: 'off' }]
              }
            ]
          });

          const markers = [${markers}];
          
          // Add click listeners to markers
          markers.forEach((marker, index) => {
            const school = ${JSON.stringify(schoolData)}[index];
            const schoolName = school.name;
            const count = school.thankYouCount;
            // Add click listener to marker
            marker.addListener('click', () => {
              const infoWindow = new google.maps.InfoWindow({
                content: \`
                  <div class="info-window">
                    <h3>\${schoolName}</h3>
                    <p><span class="count">\${count}</span> thank you message\${count > 1 ? 's' : ''} sent</p>
                    <p style="font-size: 12px; color: #B2BEC3; margin-top: 8px;">
                      Click to see details
                    </p>
                  </div>
                \`
              });
              infoWindow.open(map, marker);
            });
          });
        </script>
      </body>
      </html>
    `;

    setMapHtml(html);
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B6B" />
        <ThemedText style={styles.loadingText}>Loading map...</ThemedText>
      </View>
    );
  }

  if (schoolData.length === 0) {
    return (
      <View style={styles.noDataContainer}>
        <ThemedText style={styles.noDataTitle}>No thank you data available yet</ThemedText>
        <ThemedText style={styles.noDataSubtitle}>Be the first to send a thank you!</ThemedText>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <iframe
        srcDoc={mapHtml}
        style={{ width: '100%', height: '100%', border: 'none' }}
        sandbox="allow-scripts allow-same-origin allow-forms allow-modals"
        title="Thank You Map"
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
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF5F5',
    padding: 20,
  },
  noDataTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#636E72',
    marginBottom: 8,
    textAlign: 'center',
  },
  noDataSubtitle: {
    fontSize: 16,
    color: '#B2BEC3',
    textAlign: 'center',
  },
  legend: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    maxWidth: 200,
  },
  legendTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2D3436',
    marginBottom: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FF6B6B',
    marginRight: 8,
    borderWidth: 2,
    borderColor: 'white',
  },
  legendText: {
    fontSize: 12,
    color: '#636E72',
    flex: 1,
  },
  legendSubtext: {
    fontSize: 10,
    color: '#B2BEC3',
    fontStyle: 'italic',
  },
  calloutContainer: {
    padding: 10,
    minWidth: 150,
  },
  calloutTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2D3436',
    marginBottom: 4,
  },
  calloutLocation: {
    fontSize: 12,
    color: '#636E72',
    marginBottom: 4,
  },
  calloutCount: {
    fontSize: 12,
    color: '#FF6B6B',
    fontWeight: '500',
  },
}); 