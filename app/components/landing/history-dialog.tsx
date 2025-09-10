import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { History, PointerIcon, WifiCog } from "lucide-react"
import { useGeo } from "@/context/GeoLocationContext"

export default function HistoryDialog() {
    const [open, setOpen] = useState(false)
    const [selectedEntry, setSelectedEntry] = useState<GeoData | null>(null)
    const { setSearchedGeoData, fetchUserHistory, searchedGeoIpData } = useGeo();
    const [history, setHistory] = useState<GeoData[]>([]);

    const listVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 },
    }

    const handleSelect = () => {
        if (selectedEntry) {
            setSearchedGeoData(selectedEntry);
            setOpen(false);
        }
    }

    useEffect(() => {
        const loadHistory = async () => {
            const response = await fetchUserHistory();
            if (response && 'data' in response) {
                setHistory(response.data);
            }
        };
        if (open) {
            loadHistory();
        }
    }, [open, fetchUserHistory]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="icon" variant="ghost" title="Get IP History">
                    <History className="w-4 h-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="flex flex-col gap-0 p-0 sm:max-h-[min(640px,80vh)] sm:max-w-lg [&>button:last-child]:top-3.5">
                <DialogHeader className="contents space-y-0 text-left">
                    <DialogTitle className="border-b px-6 py-4 text-base">
                        <div className="flex items-center gap-2">
                            <WifiCog className="size-5" />
                            <h1>IP Address History ({history.length})</h1>
                        </div>
                    </DialogTitle>
                    <div
                        className="overflow-y-auto"
                    >
                        {history.length === 0 ? (
                            <div className="p-6 text-sm text-gray-500">
                                No history available.
                            </div>
                        ) : (
                            <motion.ul
                                className="divide-y"
                                variants={listVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                {history.map((entry, index) => (
                                    <motion.li
                                        key={index}
                                        variants={itemVariants}
                                        className={`cursor-pointer px-6 py-4 ${selectedEntry?.ip === entry.ip ? "bg-primary hover:bg-primary/90" : "hover:bg-gray-50 "
                                            }`}
                                        onClick={() => setSelectedEntry(entry === selectedEntry ? null : entry)}
                                    >
                                        <div className="font-medium">{entry.ip}</div>
                                        <div className="text-sm text-gray-500">
                                            {entry.city}, {entry.country} - {entry.timezone}
                                        </div>
                                    </motion.li>
                                ))}
                            </motion.ul>
                        )}
                    </div>
                </DialogHeader>
                <DialogFooter className="border-t px-6 py-4 sm:items-center">
                    <DialogClose asChild>
                        <Button type="button" variant="outline">
                            Cancel
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button type="button" onClick={handleSelect} disabled={!selectedEntry} className="flex items-center gap-1">
                            <PointerIcon className="size-4" />
                            Select
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
