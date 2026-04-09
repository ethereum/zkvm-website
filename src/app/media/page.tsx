import PageLayout from "@/components/PageLayout";
import { mediaData } from "@/data/zkevm-tracker";
import playlistData from "@/data/youtube-playlist.json";
import { ExternalLink, Video, Presentation } from "lucide-react";

export default function MediaPage() {
  const allMedia = [
    ...mediaData.map((item) => ({
      title: item.title,
      url: item.url,
      date: item.date,
      type: item.type,
      description: item.description,
      speaker: item.speaker,
      event: item.event,
    })),
    ...playlistData.videos.map((video) => ({
      title: video.title,
      url: video.url,
      date: video.date,
      type: 'video' as const,
      description: undefined,
      speaker: undefined,
      event: 'L1-zkEVM Breakout',
    })),
  ].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <PageLayout
      title="Media"
      description="Talks, presentations, and external content from the zkVM team."
    >
      {/* Playlist link */}
      <div className="mb-10">
        <a
          href={playlistData.playlistUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-[var(--accent-link)] hover:underline inline-flex items-center gap-1"
        >
          View full L1-zkEVM Breakout playlist on YouTube <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* All media as rows */}
      <div className="divide-y divide-border">
        {allMedia.map((item, i) => (
          <a
            key={i}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block py-8 px-4 -mx-4 rounded-lg group hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm text-muted-foreground">{item.date}</span>
              {item.event && (
                <span className="text-xs text-muted-foreground">· {item.event}</span>
              )}
            </div>
            <h3 className="text-2xl font-bold text-foreground group-hover:text-[var(--accent-orange)] transition-colors inline-flex items-center gap-2">
              {item.type === 'video' ? <Video className="w-5 h-5 flex-shrink-0" /> : <Presentation className="w-5 h-5 flex-shrink-0" />}
              {item.title}
              <ExternalLink className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
            </h3>
            {item.description && (
              <p className="text-sm text-muted-foreground mt-2 max-w-[700px]">{item.description}</p>
            )}
            {item.speaker && (
              <span className="text-sm text-muted-foreground mt-1 block">{item.speaker}</span>
            )}
          </a>
        ))}
      </div>
    </PageLayout>
  );
}
