'use client';

import { useState } from 'react';
import { MapPin, Calendar, Sparkles, Loader2, Plane, Hotel, Utensils, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface ItineraryDay {
  day: number;
  activities: string[];
}

interface DestinationInfo {
  name: string;
  description: string;
  highlights: string[];
  itinerary: ItineraryDay[];
}

const mockDestinations: Record<string, DestinationInfo> = {
  'singapore': {
    name: 'Singapore',
    description: 'A vibrant city-state known for its modern skyline, diverse culture, and world-class attractions.',
    highlights: [
      'Marina Bay Sands & Gardens by the Bay',
      'Sentosa Island & Universal Studios',
      'Chinatown & Little India',
      'Orchard Road Shopping',
      'Hawker Centers & Local Cuisine'
    ],
    itinerary: [
      { day: 1, activities: ['Arrival & Check-in', 'Marina Bay Sands', 'Gardens by the Bay', 'Supertree Grove Light Show'] },
      { day: 2, activities: ['Sentosa Island', 'S.E.A. Aquarium', 'Beaches & Resorts', 'Cable Car Ride'] },
      { day: 3, activities: ['Chinatown Food Tour', 'Buddha Tooth Relic Temple', 'Clarke Quay', 'Singapore River Cruise'] },
    ]
  },
  'malaysia': {
    name: 'Malaysia',
    description: 'A diverse country offering a mix of modern cities, colonial architecture, rainforests, and beautiful beaches.',
    highlights: [
      'Petronas Towers in Kuala Lumpur',
      'George Town Street Art',
      'Cameron Highlands Tea Plantations',
      'Langkawi Beaches',
      'Diverse Local Cuisine'
    ],
    itinerary: [
      { day: 1, activities: ['Arrival in Kuala Lumpur', 'Petronas Towers', 'KLCC Park', 'Bukit Bintang Shopping'] },
      { day: 2, activities: ['Batu Caves', 'Central Market', 'Chinatown (Petaling Street)', 'Jalan Alor Food Street'] },
      { day: 3, activities: ['Day Trip to Genting Highlands', 'Cable Car Ride', 'Theme Park', 'Casino & Entertainment'] },
    ]
  },
  'japan': {
    name: 'Japan',
    description: 'A fascinating blend of ancient traditions and cutting-edge modern technology.',
    highlights: [
      'Tokyo\'s Shibuya & Shinjuku',
      'Kyoto Temples & Shrines',
      'Mount Fuji Views',
      'Osaka Street Food',
      'Bullet Train Experience'
    ],
    itinerary: [
      { day: 1, activities: ['Arrival in Tokyo', 'Shibuya Crossing', 'Meiji Shrine', 'Tokyo Tower'] },
      { day: 2, activities: ['Asakusa & Senso-ji Temple', 'Akihabara', 'Ueno Park', 'Shinjuku Nightlife'] },
      { day: 3, activities: ['Day Trip to Mount Fuji', 'Lake Kawaguchi', 'Hot Springs (Onsen)', 'Chureito Pagoda'] },
    ]
  },
  'thailand': {
    name: 'Thailand',
    description: 'The Land of Smiles, famous for its tropical beaches, ornate temples, and vibrant street life.',
    highlights: [
      'Grand Palace & Wat Pho',
      'Phuket Beaches',
      'Chiang Mai Temples',
      'Floating Markets',
      'Thai Street Food'
    ],
    itinerary: [
      { day: 1, activities: ['Arrival in Bangkok', 'Grand Palace', 'Wat Pho (Reclining Buddha)', 'Wat Arun Sunset'] },
      { day: 2, activities: ['Chatuchak Weekend Market', 'Jim Thompson House', 'Asiatique Riverfront', 'Khao San Road'] },
      { day: 3, activities: ['Damnoen Saduak Floating Market', 'Maeklong Railway Market', 'Ayutthaya Day Trip', 'River Cruise'] },
    ]
  }
};

export default function Home() {
  const [destination, setDestination] = useState('');
  const [days, setDays] = useState(3);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DestinationInfo | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const normalizedDest = destination.toLowerCase().trim();
    const destinationData = mockDestinations[normalizedDest] || {
      name: destination.charAt(0).toUpperCase() + destination.slice(1),
      description: `A wonderful destination waiting to be explored! Here's a suggested itinerary for ${days} days.`,
      highlights: [
        'Local Landmarks & Attractions',
        'Cultural Sites & Museums',
        'Famous Local Cuisine',
        'Shopping Districts',
        'Natural Scenery'
      ],
      itinerary: Array.from({ length: days }, (_, i) => ({
        day: i + 1,
        activities: [
          'Explore local attractions',
          'Try authentic local cuisine',
          'Visit cultural sites',
          'Shopping & leisure time'
        ]
      }))
    };

    // Adjust itinerary to match requested days
    if (destinationData.itinerary.length !== days) {
      destinationData.itinerary = Array.from({ length: days }, (_, i) => ({
        day: i + 1,
        activities: destinationData.itinerary[i]?.activities || [
          'Explore local attractions',
          'Try authentic local cuisine',
          'Visit cultural sites',
          'Shopping & leisure time'
        ]
      }));
    }

    setResult(destinationData);
    setLoading(false);
  };

  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
          <Plane className="w-8 h-8 text-primary-foreground" />
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-3">
          Travel Planner
        </h1>
        <p className="text-muted-foreground text-lg">
          Plan your perfect trip with personalized itinerary suggestions
        </p>
      </div>

      {/* Input Form */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                <MapPin className="inline w-4 h-4 mr-1" />
                Destination
              </label>
              <Input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="e.g., Singapore, Malaysia, Japan, Thailand"
                required
              />
              <p className="text-sm text-muted-foreground mt-1">
                Try: Singapore, Malaysia, Japan, or Thailand
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                <Calendar className="inline w-4 h-4 mr-1" />
                Number of Days
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="1"
                  max="14"
                  value={days}
                  onChange={(e) => setDays(parseInt(e.target.value))}
                  className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-2xl font-bold text-primary w-12 text-center">
                  {days}
                </span>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading || !destination.trim()}
              className="w-full"
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Planning your trip...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Generate Itinerary
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Results */}
      {result && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                Your {result.name} Adventure
              </CardTitle>
              <CardDescription>
                {result.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Highlights */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                  <Camera className="w-5 h-5 mr-2 text-primary" />
                  Notable Places to Visit
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {result.highlights.map((highlight, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 p-3 bg-muted rounded-lg"
                    >
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span className="text-foreground">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Itinerary */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                  <Hotel className="w-5 h-5 mr-2 text-primary" />
                  Your {days}-Day Itinerary
                </h3>
                <div className="space-y-4">
                  {result.itinerary.map((day) => (
                    <Card key={day.day} className="border-border hover:shadow-md transition-shadow">
                      <CardContent className="pt-4">
                        <div className="flex items-center mb-3">
                          <Badge variant="default" className="w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3 p-0">
                            {day.day}
                          </Badge>
                          <h4 className="font-semibold text-foreground">
                            Day {day.day}
                          </h4>
                        </div>
                        <ul className="space-y-2 ml-11">
                          {day.activities.map((activity, idx) => (
                            <li key={idx} className="flex items-start space-x-2">
                              <Utensils className="w-4 h-4 text-muted-foreground mt-0.5" />
                              <span className="text-muted-foreground">{activity}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Tips */}
              <div className="p-4 bg-primary/10 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">💡 Travel Tips</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Book accommodations in advance for better rates</li>
                  <li>• Check local weather before packing</li>
                  <li>• Download offline maps for easy navigation</li>
                  <li>• Try local street food for authentic experiences</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </main>
  );
}
