import { useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Loader2, Wifi, PinIcon, X } from "lucide-react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { useForm } from "react-hook-form"
import { searchIp, type SearchIpFormValues } from "@/lib/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { useGeo } from "@/context/GeoLocationContext"
import HistoryDialog from "./history-dialog"


export function IpSearchCard() {
  const { fetchGeoData, searchedGeoIpData, clearSearchedData } = useGeo()
  const form = useForm<SearchIpFormValues>({
    resolver: zodResolver(searchIp),
    defaultValues: {
      ip: ''
    }
  });
  const [isPending, startTransition] = useTransition();

  function onSubmit(values: SearchIpFormValues) {
    try {
      startTransition(async () => {
        const parsed = searchIp.parse(values);

        if (!parsed) {
          toast.error("Invalid IP address format");
          return;
        }

        const response = await fetchGeoData(values);
        if (!response.success) {
          toast.error("This is a private or reserved IP address")
        } else {
          toast.success("IP address found")
        }
      })
    } catch (error) {
      console.log(error);
      toast.error("Failed to search IP address")
    }
  };

  const handleClear = () => {
    clearSearchedData();
    form.reset();
  }

  return (
    <Card className="border-2 border-purple-200 dark:border-purple-800 h-fit transition-transform duration-300 hover:-translate-0.5 hover:border-purple-300 dark:hover:border-purple-700">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wifi className="w-5 h-5 text-purple-600" />
            IP Address Lookup
          </div>
          <HistoryDialog />
        </CardTitle>
        <CardDescription>Enter any IP address to discover its geographical location</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...form}>
          <form className="flex gap-2" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="ip"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="sr-only">IP Address</FormLabel>
                  <FormControl>
                    <Input placeholder="8.8.8.8" {...field} className="w-full" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending || form.watch("ip")?.trim() === ""} size="icon">
              {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            </Button>
            {form.watch("ip") && (
              <Button type="button" variant="outline" size="icon" onClick={handleClear}>
                <X className="w-4 h-4" />
              </Button>
            )}
          </form>
        </Form>
        {searchedGeoIpData ? (
          <div className="space-y-3 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 text-xs flex items-center gap-1"
              >
                <PinIcon className="size-4" />Located
                {searchedGeoIpData.ip && (
                  <span className="font-semibold"> {searchedGeoIpData.ip}</span>
                )}
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="font-medium">Latitude:</span>
                <p className="text-gray-600 dark:text-gray-300">{searchedGeoIpData.latitude}</p>
              </div>
              <div>
                <span className="font-medium">Longitude:</span>
                <p className="text-gray-600 dark:text-gray-300">{searchedGeoIpData.longitude}</p>
              </div>
              {searchedGeoIpData.city && (
                <div>
                  <span className="font-medium">City:</span>
                  <p className="text-gray-600 dark:text-gray-300">{searchedGeoIpData.city}</p>
                </div>
              )}
              {searchedGeoIpData.country && (
                <div>
                  <span className="font-medium">Country:</span>
                  <p className="text-gray-600 dark:text-gray-300">{searchedGeoIpData.country}</p>
                </div>
              )}
              {searchedGeoIpData.timezone && (
                <div className="col-span-2">
                  <span className="font-medium">Timezone:</span>
                  <p className="text-gray-600 dark:text-gray-300">{searchedGeoIpData.timezone}</p>
                </div>
              )}
              {searchedGeoIpData.hostname && (
                <div className="col-span-2">
                  <span className="font-medium">Hostname:</span>
                  <p className="text-gray-600 dark:text-gray-300">{searchedGeoIpData.hostname}</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400">No IP address searched yet.</p>
        )}
      </CardContent>
    </Card>
  )
}
