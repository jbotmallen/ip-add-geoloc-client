import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, MapPin, Navigation, SendIcon, ShareIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router';

interface LocationMapProps {
    geoData: GeoData | null;
    isSearched: boolean;
}

export const Map: React.FC<LocationMapProps> = ({ geoData, isSearched }) => {
    if (!geoData?.latitude || !geoData?.longitude) {
        return (
            <Card>
                <CardContent className="flex items-center justify-center h-96 text-gray-500">
                    <div className="text-center">
                        <MapPin className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                        <p>No location data available</p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    const { latitude: lat, longitude: lng } = geoData;

    const timestamp = Date.now();
    const openStreetMapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.01},${lat - 0.01},${lng + 0.01},${lat + 0.01}&layer=mapnik&layers=T&marker=${lat},${lng}&t=${timestamp}`;

    return (
        <Card className="overflow-hidden gap-2">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center">
                        <Navigation className="mr-2 h-5 w-5 text-blue-600" />
                        Location Map
                    </CardTitle>
                    <div className="flex gap-2">
                        <Badge variant={isSearched ? "default" : "outline"}>
                            {isSearched ? "Searched IP" : "Your IP"}
                        </Badge>
                        {geoData.ip && (
                            <Badge variant="secondary" className="font-mono text-xs">
                                {geoData.ip}
                            </Badge>
                        )}
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <div className="relative">
                    <iframe
                        key={`${geoData.ip}-${Date.now()}`}
                        width="100%"
                        height="400"
                        src={openStreetMapUrl}
                        className="w-full"
                        title={`Map for ${geoData.ip}`}
                    />
                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                        <div className="space-y-1 text-sm">
                            <p className="font-bold">
                                {geoData.city || geoData.region || geoData.country || 'Unknown Location'}
                            </p>
                            <p className="text-gray-600">
                                Lat: {lat.toFixed(4)}, Lng: {lng.toFixed(4)}
                            </p>
                            {geoData.org && (
                                <p className="text-xs text-gray-500">{geoData.org}</p>
                            )}
                        </div>
                    </div>
                </div>
                <Link to={openStreetMapUrl} target='_blank' className='flex items-center gap-1 mt-6 text-center justify-end px-5 hover:underline'>
                    <ExternalLink className="w-4 h-4 text-gray-500" />
                    <span className="text-xs text-gray-500">Powered by OpenStreetMap</span>
                </Link>
            </CardContent>
        </Card>
    );
};
