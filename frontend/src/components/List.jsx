import React from 'react';

const List = ({ results }) => {
  return (
    <div className="card-list">
      {results.length === 0 ? (
        <div className="no-results">
          <p>No tracks found. Try a different search!</p>
        </div>
      ) : (
        results.map((track) => (
          <div className="card" key={track.id}>
              <iframe 
              width="250px"
              height="200px"
              src={`https://open.spotify.com/embed/track/${track.id}`}
              frameBorder="0"
              allow="encrypted-media"
              title={track.name}
            ></iframe>              
          </div>
        ))
      )}
    </div>
  );
};

export default List;