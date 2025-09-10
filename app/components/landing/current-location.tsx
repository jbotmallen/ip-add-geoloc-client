import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Loader2, PinIcon } from "lucide-react"
import { useGeo } from "@/context/GeoLocationContext"
import { Link } from "react-router"


export function CurrentLocationCard() {
    const { geoData, loadingCurrent } = useGeo();

    return (
        <Card className="border-2 border-blue-200 dark:border-blue-800 h-fit transition-transform duration-300 hover:-translate-0.5 hover:border-blue-300 dark:hover:border-blue-700">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    Your Current Location
                </CardTitle>
                <CardDescription>Allow location access to see your geographical data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
                {loadingCurrent ? (
                    <Button disabled={loadingCurrent || !!geoData} className="w-full">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Getting Location...
                    </Button>
                ) : (
                    <Button asChild className="w-full">
                        <Link to="#current-location-map" className="w-full flex items-center justify-center gap-2">
                            <MapPin className="w-4 h-4" />
                            Go to Map
                        </Link>
                    </Button>
                )}
                {geoData && (
                    <div className="space-y-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                        <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 flex items-center gap-1">
                                <PinIcon className="size-4" />Located
                                <span className="font-semibold">{geoData.ip}</span>
                            </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                                <span className="font-medium">Latitude:</span>
                                <p className="text-gray-600 dark:text-gray-300">{geoData.latitude}</p>
                            </div>
                            <div>
                                <span className="font-medium">Longitude:</span>
                                <p className="text-gray-600 dark:text-gray-300">{geoData.longitude}</p>
                            </div>
                            {geoData.city && (
                                <div>
                                    <span className="font-medium">City:</span>
                                    <p className="text-gray-600 dark:text-gray-300">{geoData.city}</p>
                                </div>
                            )}
                            {geoData.country && (
                                <div>
                                    <span className="font-medium">Country:</span>
                                    <p className="text-gray-600 dark:text-gray-300">{geoData.country}</p>
                                </div>
                            )}
                            {geoData.timezone && (
                                <div>
                                    <span className="font-medium">Timezone:</span>
                                    <p className="text-gray-600 dark:text-gray-300">{geoData.timezone}</p>
                                </div>
                            )}
                            {geoData.hostname && (
                                <div>
                                    <span className="font-medium">Hostname:</span>
                                    <p className="text-gray-600 dark:text-gray-300">{geoData.hostname}</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
