import PageLayout from "@/components/PageLayout";
import { mediaData } from "@/data/zkevm-tracker";
import playlistData from "@/data/youtube-playlist.json";
import { ExternalLink } from "lucide-react";

function getYouTubeId(url: string): string | null {
  const match = url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

export default function MediaPage() {
  const allMedia = [
    ...mediaData.map((item) => ({
      title: item.title,
      url: item.url,
      date: item.date,
      event: item.event,
      speaker: item.speaker,
    })),
    ...playlistData.videos.map((video) => ({
      title: video.title,
      url: video.url,
      date: video.date,
      event: 'L1-zkEVM Breakout',
      speaker: undefined,
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

      {/* Thumbnail grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {allMedia.map((item, i) => {
          const videoId = getYouTubeId(item.url);
          return (
            <a
              key={i}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video rounded-lg overflow-hidden mb-3 bg-muted">
                {videoId ? (
                  <img
                    src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                )}
                {/* Play overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--accent-orange)' }}>
                    <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                </div>
              </div>

              {/* Info */}
              <span className="text-xs text-muted-foreground">{item.date}{item.event && ` · ${item.event}`}</span>
              <h3 className="text-base font-semibold text-foreground group-hover:text-[var(--accent-orange)] transition-colors mt-1 line-clamp-2">
                {item.title}
              </h3>
              {item.speaker && (
                <span className="text-xs text-muted-foreground mt-1 block">{item.speaker}</span>
              )}
            </a>
          );
        })}
      </div>
    </PageLayout>
  );
}
