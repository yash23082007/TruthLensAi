export default function AudioArtwork() {
  return <div className="audio-artwork" aria-label="Abstract audio signal artwork"><div className="audio-orb orb-one" /><div className="audio-orb orb-two" /><div className="audio-rings"><i /><i /><i /></div><div className="wave-bars">{Array.from({ length: 31 }, (_, index) => <span key={index} style={{ '--bar': `${24 + ((index * 19) % 64)}%`, '--delay': `${index * 0.06}s` }} />)}</div><p>voice signal</p></div>;
}
