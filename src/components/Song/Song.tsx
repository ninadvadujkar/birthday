const Song = () => {
  return (
    <audio autoPlay>
      <source src="birthday-song.mp3" type="audio/mp3" />
      Your browser does not support the audio element.
    </audio>
  );
};

export default Song;
