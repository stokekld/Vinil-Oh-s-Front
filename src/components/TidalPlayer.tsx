interface TidalPlayerProps {
  tidalId: string | number;
}

export function TidalPlayer({ tidalId }: TidalPlayerProps) {
  return (
    <div className="tidal-player-container">
      <label className="player-label">Play on Tidal</label>
      <div className="tidal-embed-wrapper">
        <iframe
          src={`https://embed.tidal.com/tracks/${tidalId}`}
          width="100%"
          height="120"
          allow="encrypted-media; fullscreen; clipboard-write https://embed.tidal.com; web-share"
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
          style={{ colorScheme: 'dark' }}
          title="TIDAL Embed Player"
        />
      </div>
    </div>
  );
}
