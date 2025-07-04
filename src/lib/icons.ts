import {
    AudioWaveform,
    BookOpen,
    Bot,
    Command,
    Database,
    GalleryVerticalEnd,
    Frame,
    PieChart,
    Map,
    Settings2,
    SquareTerminal,
    Users,
    type LucideIcon,
  } from "lucide-react"

export const iconMap: Record<string, LucideIcon> = {
    gallery: GalleryVerticalEnd,
    waveform: AudioWaveform,
    command: Command,
    frame: Frame,
    piechart: PieChart,
    map: Map,
    users: Users,
    "square-terminal": SquareTerminal,
    bot: Bot,
    "book-open": BookOpen,
    "settings-2": Settings2,
    database: Database,
}; 