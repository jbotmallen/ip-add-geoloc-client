interface User {
    email: string;
    id?: string;
}

interface GeoData {
    ip: string;
    latitude?: number;
    longitude?: number;
    city?: string;
    region?: string;
    country?: string;
    loc?: string;
    org?: string;
    postal?: string;
    timezone?: string;
    hostname?: string;
    bogon?: boolean;
}

interface SearchHistoryItem {
    ip: string;
    city: string;
    country: string;
    timestamp: Date;
}

interface IPAddressCardProps {
    ipAddress: string;
    isSearched: boolean;
}

interface LocationDetailsProps {
    geoData: GeoData;
}

interface AdditionalInfoProps {
    geoData: GeoData;
}

interface SearchHistoryProps {
    searchHistory: SearchHistoryItem[];
    onHistoryClick: (ip: string) => void;
}

interface SearchActionsProps {
    onSearch: () => void;
    onClear: () => void;
    loading: boolean;
    searchIP: string;
}

interface ErrorAlertProps {
    error: string;
}

interface GeolocationInfoProps {
    geoData: GeoData | null;
    loading: boolean;
    searchIP: string;
}

interface DetailItemProps {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    value: string | undefined;
}

interface HistoryItemProps {
    item: SearchHistoryItem;
    index: number;
    onClick: () => void;
    showSeparator: boolean;
}