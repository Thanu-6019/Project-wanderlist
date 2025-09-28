import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  temperature: number;
  weather: string;
  imageUrl: string;
  lat?: number;
  lon?: number;
  tags?: string[];
  rating?: number;
}

const TravelExplorer = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ... destinationData stays the same as in your original code

  // [Insert your destinationData array here exactly as before]

  // Weather and image fetching remain unchanged
  // [Insert fetchWeatherData and fetchDestinationImage functions here]

  useEffect(() => {
    const loadDestinations = async () => {
      setLoading(true);
      setError(null);
      try {
        const destinationsWithData = await Promise.all(
          destinationData.map(async (dest) => {
            const weatherData = await fetchWeatherData(dest.lat, dest.lon);
            const imageUrl = await fetchDestinationImage(dest.name);
            return {
              ...dest,
              temperature: weatherData.temperature,
              weather: weatherData.weather,
              imageUrl: imageUrl
            };
          })
        );
        setDestinations(destinationsWithData);
      } catch (error) {
        setError('Failed to load destination data. Please check your API keys.');
        console.error('Error loading destinations:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDestinations();
  }, []);

  // ... rest of your handlers remain unchanged

  // Background: Beautiful Beach
  // Features: Cloud with icons and text

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 md:p-8">
      {/* Beach background for opening view */}
      <div className="fixed inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center bg-no-repeat opacity-40"></div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-12 md:mb-16 relative z-10">
          <div className="inline-flex items-center justify-center bg-gradient-to-r from-primary to-purple-600 text-white px-6 py-2 rounded-full text-sm mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></span>
            Live Weather Updates
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-6">
            Travel Explorer
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
            Everything you need to plan your perfect trip in one beautiful, easy-to-use platform
          </p>
        </div>

        {/* Search Section */}
        <Card className="mb-12 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Find Your Dream Destination
            </CardTitle>
            <CardDescription className="text-lg">
              Search by city, country, or activity to explore travel opportunities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="search" className="sr-only">Search destinations</Label>
                <Input
                  id="search"
                  type="text"
                  placeholder="🌍 Search destinations (e.g., Paris, beaches, hiking, culture...)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-12 text-lg border-2 border-primary/20 focus:border-primary"
                />
              </div>
              <Button type="submit" className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 h-12 px-8 text-white">
                Explore Now
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Features Section inside a animated floating Cloud */}
        <div className="relative flex justify-center mb-12">
          <div
            className="relative bg-white shadow-lg p-8 rounded-[60%] w-full md:w-[85%] lg:w-[80%] mx-auto animate-[floatCloud_12s_linear_infinite] border-t border-b border-blue-100"
            style={{
              boxShadow: "0 8px 36px 12px rgba(80,160,250,0.10), 0 0 80px 16px rgba(120,180,255,0.05)",
              minHeight: "230px"
            }}
          >
            {/* extra "bubbles" */}
            <div className="absolute top-[-40px] left-[13%] w-24 h-24 bg-white rounded-full shadow-md opacity-70"></div>
            <div className="absolute top-[-20px] right-[14%] w-20 h-20 bg-white rounded-full shadow-md opacity-50"></div>
            <div className="absolute bottom-[-20px] left-[23%] w-16 h-16 bg-white rounded-full shadow-md opacity-40"></div>
            <div className="absolute bottom-[-24px] right-[18%] w-16 h-16 bg-white rounded-full shadow-md opacity-50"></div>
            {/* Features grid */}
            <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-transparent border-0 text-center p-6 shadow-none">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  🌍
                </div>
                <h3 className="font-semibold text-lg mb-2">Discover Destinations</h3>
                <p className="text-sm text-gray-600">
                  Explore amazing places around the world with stunning photography and detailed information.
                </p>
              </Card>
              <Card className="bg-transparent border-0 text-center p-6 shadow-none">
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  📸
                </div>
                <h3 className="font-semibold text-lg mb-2">Beautiful Photos</h3>
                <p className="text-sm text-gray-600">
                  View high-quality images that capture the essence and beauty of each destination.
                </p>
              </Card>
              <Card className="bg-transparent border-0 text-center p-6 shadow-none">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  📅
                </div>
                <h3 className="font-semibold text-lg mb-2">Plan Your Trip</h3>
                <p className="text-sm text-gray-600">
                  Get all the information you need to plan your perfect adventure, from weather to activities.
                </p>
              </Card>
              <Card className="bg-transparent border-0 text-center p-6 shadow-none">
                <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  ☀️
                </div>
                <h3 className="font-semibold text-lg mb-2">Weather Updates</h3>
                <p className="text-sm text-gray-600">
                  Stay informed with real-time weather information for your chosen destinations.
                </p>
              </Card>
            </div>
          </div>
        </div>

        {/* ...The rest of your main content (Loading, Error, Destinations, etc.) stays as you had it */}
      </div>

      {/* Floating Cloud Animation Keyframes: Add to your global CSS (e.g., index.css or tailwind config) */}
      {/* 
      @keyframes floatCloud {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-16px); }
        100% { transform: translateY(0px); }
      }
      .animate-[floatCloud_12s_linear_infinite] {
        animation: floatCloud 12s linear infinite;
      }
      */}
    </div>
  );
};

export default TravelExplorer;
