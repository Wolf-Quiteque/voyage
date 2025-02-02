'use client';

import React, { useState, useEffect, useRef } from 'react';
import { getUserSession } from '@/lib/supabse/useSession';

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Coffee,
  Hotel,
  ChevronRight,
  Sun,
  CloudSun,
  MoonStar,
  CloudRain,
  Navigation,
  Cloud,
  Car,
} from "lucide-react";
import AuthDialog from '@/components/ui/AuthDialog';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN; // Replace with your Mapbox API token
const WEATHER_API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY; // Replace with your weather API key

export default function MainPage() {

    const Getsession = async ()=>{
        const session  = await getUserSession();
   
        setsession(session)
    }
    
  const [greeting, setGreeting] = useState('');
  const [timeIcon, setTimeIcon] = useState(null);
  const [session, setsession] = useState(null);

  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState('');
  const [cafes, setCafes] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [ShowAuthdialog, setshowAuthdialog] = useState(false);

  const cafeScrollRef = useRef(null);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setGreeting('Good Morning');
      setTimeIcon(<Sun className="h-16 w-16 text-yellow-500" />);
    } else if (hour >= 12 && hour < 18) {
      setGreeting('Good Afternoon');
      setTimeIcon(<CloudSun className="h-16 w-16 text-orange-500" />);
    } else {
      setGreeting('Good Evening');
      setTimeIcon(<MoonStar className="h-16 w-16 text-blue-400" />);
    }
  }, []);

  useEffect(() => {
    const initSession = async () => {
      const session = await getUserSession();
      setsession(session);
    };
    
    initSession();
  }, []);

  const animateScroll = (ref) => {
    const scrollContainer = ref.current;
    if (scrollContainer) {
      const firstTimer = setTimeout(() => {
        scrollContainer.scrollLeft = 100;
  
        const secondTimer = setTimeout(() => {
          scrollContainer.style.scrollBehavior = 'smooth';
          scrollContainer.scrollLeft = 0;
        }, 700);
  
        return () => {
          clearTimeout(firstTimer);
          clearTimeout(secondTimer);
        };
      }, 1000);
  
      return () => clearTimeout(firstTimer);
    }
  };


  // Fetch user's location and integrate APIs
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;

      // Fetch weather data
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}`
      );
      
      const weatherData = await weatherResponse.json();
      setWeather({
        temp: Math.round(weatherData.main.temp),
        description: weatherData.weather[0].description,
        emoji: getWeatherEmoji(weatherData.weather[0].main),
      });

      // Fetch cafes and hotels using Mapbox
      const places = await Promise.all([
        fetchPlaces("cafe", latitude, longitude),
        fetchPlaces("hotel", latitude, longitude),
      ]);

      setCafes(places[0]);
      setHotels(places[1]);

      setTimeout(() => {
        animateScroll(cafeScrollRef);
      }, 2000);

      
    });
  }, []);


  

// Helper: Calculate distance between two points using Haversine formula
const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
  };
  
  // Helper: Format distance to be more readable
  const formatDistance = (distance) => {
    if (distance < 1) {
      return `${Math.round(distance * 1000)} m`;
    } else if (distance < 100) {
      return `${distance.toFixed(1)} km`;
    } else {
      const miles = distance * 0.621371;
      return `${miles.toFixed(1)} mi`;
    }
  };
  
  // Helper: Fetch places using Mapbox
  const fetchPlaces = async (type, lat, lon) => {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${type}.json?proximity=${lon},${lat}&access_token=${MAPBOX_TOKEN}`
    );
    const data = await response.json();
    
    return data.features.map((place) => {
      // Get coordinates for the place
      const [placeLon, placeLat] = place.center;
      
      // Calculate distance
      const distanceInKm = calculateDistance(lat, lon, placeLat, placeLon);
      const formattedDistance = formatDistance(distanceInKm);
      
      // Generate static map image URL for the place
      const imageUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${placeLon},${placeLat},15,0/200x150?access_token=${MAPBOX_TOKEN}`;
      
      return {
        name: place.text,
        address: place.place_name,
        distance: formattedDistance,
        image: imageUrl,
      };
    });
  };
  // Helper: Determine weather emoji
  const getWeatherEmoji = (main) => {
    switch (main.toLowerCase()) {
      case "clear":
        return "☀️";
      case "clouds":
        return "☁️";
      case "rain":
        return "🌧️";
      case "snow":
        return "❄️";
      case "thunderstorm":
        return "⚡";
      default:
        return "🌤️";
    }
  };

  function AuthDialogToggle(){
    setshowAuthdialog(!ShowAuthdialog)
  }

  return (
    <>
    <div className="min-h-screen pb-24">
      {ShowAuthdialog && (
        <AuthDialog 
          isOpen={ShowAuthdialog} 
          onClose={() => setshowAuthdialog(false)}  
        />
      )}
      
      {/* Greeting Section with Weather */}
      <div className="bg-gradient-to-br from-blue-100 via-blue-200 to-blue-50 p-6 mb-6 shadow-lg rounded-lg">
        <div className="flex flex-col items-center">
          {timeIcon}
          <h2 className="text-3xl text-center font-bold mt-4 text-blue-700">
            {`${greeting} ${session ? ", "+session.user.metadata.full_name.split(" ")[0]:""}`}
          </h2>
          {weather && (
            <div className="flex items-center space-x-4 mt-4">
              <div className="text-5xl">{weather.emoji}</div>
              <div>
                <p className="text-lg font-semibold text-blue-600">
                  {weather.temp}°F - {weather.description}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-6">
        <Section
          title="Cafes Nearby"
          icon={<Coffee className="h-5 w-5 text-blue-600" />}
          items={cafes}
          scrollRef={cafeScrollRef}
        />

        <Section
          title="Hotels Nearby"
          icon={<Hotel className="h-5 w-5 text-blue-600" />}
          items={hotels}
        />
      </div>
    </div>

    {/* Floating Action Buttons */}
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white via-white/95 to-white/50 backdrop-blur-md border-t border-blue-100">
      <div className="max-w-lg mx-auto flex gap-3">
        <Button
          onClick={() => {
            if (!session) {
              AuthDialogToggle();
              return;
            }
          }}
          variant="outline"
          className="flex-1 h-12 bg-white border-blue-500 text-blue-500 hover:bg-blue-50 hover:shadow-lg transition-all duration-300 rounded-xl"
        >
          <Navigation className="mr-2 h-5 w-5" />
          Explore
        </Button>
        <Button 
          onClick={() => {
            if (!session) {
              AuthDialogToggle();
              return;
            }
          }}
          className="flex-[2] h-12 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl"
        >
          <Car className="mr-2 h-5 w-5" />
          Book a Ride
        </Button>
      </div>
    </div>
  </>
  );
}

// Reusable Section Component
function Section({ title, icon, items,scrollRef  }) {
    return (
      <section>
        <div className="flex items-center gap-2 mb-3">
          {icon}
          <h2 className="text-lg font-semibold">{title}</h2>
        </div>
        <div ref={scrollRef }  className="flex overflow-x-auto pb-4 gap-4 hide-scrollbar scroll-smooth">
          {items.map((item, index) => (
            <Card key={index} className="flex-shrink-0 w-48 border-blue-500">
              <CardContent className="p-3 bg-white shadow-md rounded-md">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-32 object-cover rounded-lg mb-2"
                />
                <h3 className="font-medium text-sm text-gray-700">{item.name}</h3>
                <div className="flex items-center text-gray-500 text-xs mt-1">
                  <MapPin className="h-3 w-3 mr-1 text-blue-400" />
                  <span>{item.distance}</span>
                </div>
                {item.address && (
                  <div className="text-xs text-gray-500 mt-1 truncate">
                    {item.address}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    );
  }
