import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { mediaData } from "@/data/zkevm-tracker";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Video, Mic, FileText, Presentation } from "lucide-react";

const typeIcons: Record<string, React.ReactNode> = {
  talk: <Presentation className="w-5 h-5" />,
  video: <Video className="w-5 h-5" />,
  podcast: <Mic className="w-5 h-5" />,
  'blog-external': <FileText className="w-5 h-5" />,
};

const typeLabels: Record<string, string> = {
  talk: 'Talk',
  video: 'Video',
  podcast: 'Podcast',
  'blog-external': 'Article',
};

export default function MediaPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-[1200px] mx-auto px-4">

          <div className="mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Media</h1>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Talks, presentations, and external content from the zkVM team.
            </p>
          </div>

          {mediaData.length === 0 ? (
            <div className="text-center py-20">
              <Video className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-foreground mb-2">Coming Soon</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Media content is being collected. Check back soon for talks,
                presentations, and other resources from the zkVM team.
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {mediaData.map((item, i) => (
                <a
                  key={i}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Card className="hover:shadow-md transition-shadow h-full">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="text-muted-foreground">
                          {typeIcons[item.type]}
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {typeLabels[item.type]}
                        </Badge>
                        <span className="text-xs text-muted-foreground ml-auto">{item.date}</span>
                      </div>
                      <h3 className="font-semibold text-foreground mb-2 inline-flex items-center gap-1">
                        {item.title}
                        <ExternalLink className="w-3 h-3 text-muted-foreground" />
                      </h3>
                      {item.description && (
                        <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                      )}
                      {(item.speaker || item.event) && (
                        <p className="text-xs text-muted-foreground">
                          {item.speaker && <span>{item.speaker}</span>}
                          {item.speaker && item.event && <span> &middot; </span>}
                          {item.event && <span>{item.event}</span>}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
          )}

        </div>
      </main>
      <Footer />
    </div>
  );
}
