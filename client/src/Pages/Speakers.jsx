import "../styles/gallery.css";
import "../styles/speakers.css";
import bgVideo from "../assets/bgpursuit.webm";
import PlaceholderImg from "../assets/pursuitlogo.png";

// Importing Speaker Images
import AmitMolke from "../assets/speakers/Amit Molke.jpeg";
import DrRSMahamune from "../assets/speakers/Dr.R.S.Mahamune.jpeg";
import YogeshMurumkar from "../assets/speakers/Mr. Yogesh P Murumkar.jpg";
import NakulDeshmukh from "../assets/speakers/Nakul Deshmukh.png";
import RiyaDangra from "../assets/speakers/Riya Dangra.jpeg";
import PranavKheldar from "../assets/speakers/Pranav Kheldar.jpg";
import ChetanTajane from "../assets/speakers/Mr. Chetan Tajane.png";
import DeveshBadgujar from "../assets/speakers/DEVESH BADGUJAR.png";
const speakers = [
  { name: "Mr. Yogesh P Murumkar", title: "CEO & Corporate Trainer, Bharat Software Solutions", image: YogeshMurumkar },
  { name: "Mr. Nakul Deshmukh", title: "Founder iBase Electrosoft LLP", image: NakulDeshmukh },
  { name: "Mr. Amit Molke", title: "SAP Associate in Bristlecone", image: AmitMolke },
  { name: "Mr. Devesh Badgujar", title: "DE Intern @ Coditation | Full-Stack Developer | AI/ML & Real-Time Systems Developer | Founder StockNotify", image: DeveshBadgujar },
  { name: "Miss. Riya Dangra", title: "Software engineer in apexa iQ", image: RiyaDangra },
  { name: "Mr. Pranav Kheldar", title: "Alumni of SSGMCE", image: PranavKheldar },
  { name: "Mr. Chetan Tajane", title: "Founder, CIATS (Centre of Innovation and Advance Technical Skills)", image: ChetanTajane },
  { name: "Dr. R.S. Mahamune", title: "Faculty SSGMCE", image: DrRSMahamune },
];

const Speakers = () => {
  return (
    <section className="gallery-section">
      <video
        className="gallery-bg-video"
        src={bgVideo}
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="gallery-title-card">
        <span className="gallery-title-text">Speakers</span>
      </div>

      <div className="speakers-wrapper">
        <p className="speakers-intro">
          Meet the minds inspiring Pursuit 2026 — innovators, builders, and
          leaders shaping the future.
        </p>
        <div className="speakers-grid">
          {speakers.map((speaker, index) => (
            <article key={index} className="speaker-card">
              <div className="speaker-avatar">
                <img src={speaker.image} alt={speaker.name} />
              </div>
              <h3 className="speaker-name">{speaker.name}</h3>
              <p className="speaker-title">{speaker.title}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Speakers;
