import { searchIp, type SearchIpFormValues } from '@/lib/validation';
import api from '@/services/api';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export const useIPGeolocation = () => {
    const [currentIP, setCurrentIP] = useState<string>('');
    const [geoData, setGeoData] = useState<GeoData | null>(null);
    const [searchedIP, setSearchedIP] = useState<string>('');
    const [searchedGeoIpData, setSearchedGeoData] = useState<GeoData | null>(null);
    const [loadingCurrent, setLoadingCurrent] = useState<boolean>(false);

    const normalizeGeoData = (data: any): GeoData => {
        let latitude: number | undefined;
        let longitude: number | undefined;

        if (data.loc) {
            const [lat, lng] = data.loc.split(',').map((v: string) => parseFloat(v.trim()));
            latitude = lat;
            longitude = lng;
        } else if (data.latitude && data.longitude) {
            latitude = parseFloat(data.latitude);
            longitude = parseFloat(data.longitude);
        }

        return {
            ...data,
            latitude,
            longitude,
        };
    };

    const fetchUserIP = async (): Promise<void> => {
        setLoadingCurrent(true);
        try {
            const token = import.meta.env.VITE_API_TOKEN;
            if (!token) throw new Error('API token is not defined');

            const response = await axios.post<GeoData>(`https://ipinfo.io/json?token=${token}`);
            const data: GeoData = normalizeGeoData(response.data);

            if (response.status !== 200 || !data.ip) {
                toast.error('Failed to fetch your IP information');
                return;
            }

            setCurrentIP(data.ip);
            setGeoData(data);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                toast.error(err.response?.data?.message || "Server error");
            }
        } finally {
            setLoadingCurrent(false);
        }
    };

    const fetchGeoData = async (ip: SearchIpFormValues): Promise<{ success: boolean; data?: GeoData }> => {
        const parsed = searchIp.safeParse(ip);
        if (!parsed.success) {
            toast.error('Invalid IP address format');
            return { success: false, data: undefined };
        }

        try {
            const response = await api.post('/api/geolocations/search', { ip });
            if (response.status !== 200 || !response.data.success) {
                toast.error(response.data.message || 'Failed to fetch geolocation data');
                return { success: false, data: undefined };
            }

            const geoData: GeoData = normalizeGeoData(response.data.data);
            if (!geoData) {
                toast.error('No geolocation data received');
                return { success: false, data: undefined };
            }
            if (geoData.bogon) {
                toast.error('This is a private or reserved IP address');
                return { success: false, data: undefined };
            }

            setSearchedIP(ip.ip);
            setSearchedGeoData(geoData);

            return { success: true, data: geoData };
        } catch (err) {
            return { success: false, data: undefined };
        }
    };

    const fetchUserHistory = async () => {
        try {
            const response = await api.get('/api/geolocations/');
            if (response.status !== 200 || !response.data.success) {
                toast.error(response.data.message || 'Failed to fetch history');
                return [];
            }
            const historyData: GeoData[] = response.data.data.map((entry: any) => normalizeGeoData(entry));
            return { success: true, data: historyData };
        } catch (err) {
            if (axios.isAxiosError(err)) {
                toast.error(err.response?.data?.message || "Server error");
            }
            return [];
        }
    };

    const clearSearchedData = () => {
        setSearchedIP('');
        setSearchedGeoData(null);
    };

    useEffect(() => {
        fetchUserIP();
        fetchUserHistory();
    }, []);

    return {
        currentIP,
        geoData,
        loadingCurrent,
        searchedIP,
        searchedGeoIpData,
        fetchGeoData,
        setSearchedGeoData,
        fetchUserHistory,
        clearSearchedData,
    };
};
