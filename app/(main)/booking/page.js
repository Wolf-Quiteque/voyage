"use client"
import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  MapPin,
  Loader2,
  ChevronRight
} from "lucide-react";

// This should be in your .env.local file
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const BookRidePage = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [markers, setMarkers] = useState({ pickup: null, dropoff: null });

  const [formData, setFormData] = useState({
    pickup_address: '',
    dropoff_address: '',
    pickup_location: null,
    dropoff_location: null,
  });

  useEffect(() => {
    if (map.current) return; // initialize map only once

    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [lng, lat],
        zoom: zoom
      });

      map.current.on('load', () => {
        setMapLoaded(true);
      });

      map.current.on('move', () => {
        setLng(map.current.getCenter().lng.toFixed(4));
        setLat(map.current.getCenter().lat.toFixed(4));
        setZoom(map.current.getZoom().toFixed(2));
      });

      // Add navigation control
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    } catch (error) {
      console.error('Error initializing map:', error);
      setMapError('Unable to load map. Please check your connection and try again.');
    }

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  const geocodeAddress = async (address, type) => {
    if (!address.trim()) return;
    
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${mapboxgl.accessToken}`
      );
      const data = await response.json();
      
      if (data.features && data.features[0]) {
        const [lng, lat] = data.features[0].center;
        
        if (markers[type]) {
          markers[type].remove();
        }

        const marker = new mapboxgl.Marker({ color: type === 'pickup' ? '#3B82F6' : '#10B981' })
          .setLngLat([lng, lat])
          .addTo(map.current);

        setMarkers(prev => ({ ...prev, [type]: marker }));
        
        setFormData(prev => ({
          ...prev,
          [`${type}_location`]: { type: 'Point', coordinates: [lng, lat] },
          [`${type}_address`]: data.features[0].place_name,
        }));

        if (markers.pickup && markers.dropoff) {
          const bounds = new mapboxgl.LngLatBounds()
            .extend(markers.pickup.getLngLat())
            .extend(markers.dropoff.getLngLat());
          map.current.fitBounds(bounds, { padding: 100 });
        } else {
          map.current.flyTo({ center: [lng, lat], zoom: 14 });
        }
      }
    } catch (error) {
      console.error('Geocoding error:', error);
      setMapError('Error finding location. Please try again.');
    }
  };

  const handleAddressChange = (value, type) => {
    setFormData(prev => ({ ...prev, [`${type}_address`]: value }));
  };

  const handleAddressBlur = (type) => {
    const address = formData[`${type}_address`];
    if (address) {
      geocodeAddress(address, type);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-3xl font-bold text-blue-800">Book Your Ride</h1>
          <p className="text-blue-600 mt-2">Where would you like to go today?</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-xl overflow-hidden shadow-lg relative"
          >
            <div className="absolute top-2 left-2 bg-white/75 px-2 py-1 rounded z-10">
              Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
            <div ref={mapContainer} className="h-[600px] w-full" />
            {!mapLoaded && !mapError && (
              <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              </div>
            )}
            {mapError && (
              <div className="absolute inset-0 bg-gray-100 flex items-center justify-center p-4 text-center">
                <div className="text-red-500">{mapError}</div>
              </div>
            )}
          </motion.div>

          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <Card className="border-blue-200">
              <CardContent className="p-6">
                <AnimatePresence mode="wait">
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      {/* Pickup Location */}
                      <div className="space-y-2">
                        <Label>Pickup Location</Label>
                        <div className="relative">
                          <MapPin className="absolute left-2 top-2.5 h-5 w-5 text-gray-500" />
                          <Input
                            placeholder="Enter pickup address"
                            className="pl-9"
                            value={formData.pickup_address}
                            onChange={(e) => handleAddressChange(e.target.value, 'pickup')}
                            onBlur={() => handleAddressBlur('pickup')}
                          />
                        </div>
                      </div>

                      {/* Dropoff Location */}
                      <div className="space-y-2">
                        <Label>Dropoff Location</Label>
                        <div className="relative">
                          <MapPin className="absolute left-2 top-2.5 h-5 w-5 text-gray-500" />
                          <Input
                            placeholder="Enter dropoff address"
                            className="pl-9"
                            value={formData.dropoff_address}
                            onChange={(e) => handleAddressChange(e.target.value, 'dropoff')}
                            onBlur={() => handleAddressBlur('dropoff')}
                          />
                        </div>
                      </div>

                      <Button 
                        className="w-full"
                        onClick={() => setCurrentStep(2)}
                        disabled={!formData.pickup_location || !formData.dropoff_location}
                      >
                        Continue <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BookRidePage;