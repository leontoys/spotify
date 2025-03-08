import React from 'react';

const List = ({ results }) => {
  return (
    <div className="track-list">
      {results.length === 0 ? (
        <div className="no-results">
          <p>No tracks found. Try a different search!</p>
        </div>
      ) : (
        results.map((track) => (
          <div className="track-card" key={track.id}>
            {/* Track Cover Art */}
            {track.album.images.length > 0 && (
              <img
                className="track--image"
                src={track.album.images[0].url}
                alt={track.name + ' cover art'}
              />
            )}

            {/* Track Details */}
            <div className="track--content">
              <h3 className="track--title">{track.name}</h3>
              <p className="track--artist">
                <small>ARTIST: {track.artists[0].name}</small>
              </p>
              <p className="track--album">
                <small>ALBUM: {track.album.name}</small>
              </p>
              <p className="track--preview">
                {track.preview_url && (
                  <audio controls>
                    <source src={track.preview_url} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                )}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default List;