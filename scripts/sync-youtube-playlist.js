/**
 * Fetch videos from a YouTube playlist via its RSS feed
 * and write them to src/data/youtube-playlist.json
 *
 * Usage: node scripts/sync-youtube-playlist.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const PLAYLIST_ID = 'PLJqWcTqh_zKH-673NddaSqiQFIWMMopf_';
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?playlist_id=${PLAYLIST_ID}`;
const OUTPUT_PATH = path.join(__dirname, '..', 'src', 'data', 'youtube-playlist.json');

function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
      res.on('error', reject);
    }).on('error', reject);
  });
}

async function main() {
  const xml = await fetch(FEED_URL);

  // Simple XML parsing — extract <entry> blocks
  const entries = [];
  const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
  let match;

  while ((match = entryRegex.exec(xml)) !== null) {
    const entry = match[1];
    const title = (entry.match(/<title>(.*?)<\/title>/) || [])[1] || '';
    const videoId = (entry.match(/<yt:videoId>(.*?)<\/yt:videoId>/) || [])[1] || '';
    const published = (entry.match(/<published>(.*?)<\/published>/) || [])[1] || '';
    const author = (entry.match(/<author>[\s\S]*?<name>(.*?)<\/name>/) || [])[1] || '';

    if (videoId) {
      entries.push({
        title,
        videoId,
        url: `https://www.youtube.com/watch?v=${videoId}`,
        date: published.split('T')[0],
        author,
      });
    }
  }

  // Sort by date descending
  entries.sort((a, b) => b.date.localeCompare(a.date));

  const output = {
    playlistId: PLAYLIST_ID,
    playlistUrl: `https://www.youtube.com/playlist?list=${PLAYLIST_ID}`,
    lastUpdated: new Date().toISOString(),
    videos: entries,
  };

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2));
  console.log(`Synced ${entries.length} videos from playlist -> ${OUTPUT_PATH}`);
}

main().catch((err) => {
  console.error('Failed to sync playlist:', err.message);
  process.exit(1);
});
