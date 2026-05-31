import { useCallback, useState } from 'react';
import { Folder, Mail, GitHub, LinkedIn, Phone, ArticleOutlined } from '@mui/icons-material';

import ShapeGrid from './components/ShapeGrid';
import ProjectCard from './components/ProjectCard';
import EmailDialog from './components/dialogs/EmailDialog';
import ContactDialog from './components/dialogs/ContactDialog';
import ResumeDialog from './components/dialogs/ResumeDialog/ResumeDialog';


const SkillBadge = ({ icon, img, text, cat }) => {

  const [imgFailed, setImgFailed] = useState(false);

  const renderIcon = () => {
    if (icon) {
      return <i className={`${icon} colored badge-icon`} aria-hidden="true" />;
    }
    if (img && !imgFailed) {
      return (
        <img
          src={img}
          alt={text}
          className="badge-icon"
          onError={() => setImgFailed(true)}
        />
      );
    }
    return <span className="badge-dot" style={{ background: COLORS[cat] }} />;
  };

  return (
    <div className="skill-badge">
      {renderIcon()}
      <span>{text}</span>
    </div>
  );
}

const PROJECTS = [
  {
    title: "E-tbayat MSWDO",
    role: "Contract • Full Stack Developer",
    description: `A Progressive Web Application (PWA) for 
      MSWDO Itbayat that digitizes household surveys, 
      automates data analytics, manages beneficiary records, 
      generates social welfare IDs, 
      and provides hazard mapping capabilities.`,
    status: "Live",
    year: "2026",
    stack: ['React', 'Node.js', 'MySQL', 'PWA'],
    link: "https://www.e-tbayatmswdo.com/"
  },
  {
    title: "Philippine Data Guardians Website",
    role: "Internship • Full Stack Developer",
    description: `A business website that includes a 
      responsive landing page, membership registration system, 
      and an admin dashboard for managing member records and 
      website-generated registrations efficiently.`,
    status: "Live",
    year: "2025",
    stack: ['React', 'Supabase', 'PostgreSQL', 'Responsive Website'],
    link: "https://www.phdataguardians.org/"
  }
];

const COLORS = {
  Frontend:  '#378ADD',
  Backend:   '#1D9E75',
  Languages: '#7F77DD',
  Database:  '#D85A30',
  DevOps:    '#BA7517',
  Tools:     '#888780',
};

const CATEGORIES = {
  Frontend: [
    { icon: 'devicon-react-original',     text: 'React' },
    { icon: 'devicon-html5-plain',        text: 'HTML5' },
    { icon: 'devicon-css3-plain',         text: 'CSS3' },
    { icon: 'devicon-javascript-plain',   text: 'JavaScript' },
  ],
  Backend: [
    { icon: 'devicon-nodejs-plain',       text: 'Node.js' },
    { icon: 'devicon-express-original',   text: 'Express' },
  ],
  Languages: [
    { icon: 'devicon-java-plain',         text: 'Java' },
    { icon: 'devicon-csharp-plain',       text: 'C#' },
    { icon: 'devicon-cplusplus-plain',    text: 'C++' },
  ],
  Database: [
    { icon: 'devicon-postgresql-plain',   text: 'PostgreSQL' },
    { icon: 'devicon-mysql-plain',        text: 'MySQL' },
    { icon: 'devicon-supabase-plain',     text: 'Supabase' },
  ],
  DevOps: [
    { icon: 'devicon-github-original',    text: 'GitHub' },
    { icon: 'devicon-vercel-original',    text: 'Vercel' },
  ],
  Tools: [
    { icon: 'devicon-figma-plain',        text: 'Figma' },
    { icon: 'devicon-git-plain',          text: 'Git' },
  ],
};

function App() {

  const [active, setActive] = useState('All');
  const [emailOpen, setEmailOpen] = useState(false);
  const [phoneOpen, setPhoneOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);

  const normalize = (item, cat) => {
    if (typeof item === 'string') {
      return { 
        icon: null, 
        img: null, 
        text: item, cat 
      };
    }
    return { 
      icon: null, 
      img: null, 
      ...item, 
      cat 
    };
  };

  const allItems = Object.entries(CATEGORIES).flatMap(([cat, arr]) =>
    arr.map(item => normalize(item, cat))
  );

  const tabs = ['All', ...Object.keys(CATEGORIES)];
  const items = active === 'All'
    ? allItems
    : CATEGORIES[active].map(item => normalize(item, active));

  const SOCIAL_LINKS = [
    { icon: Mail, action: () => setEmailOpen(true) },
    { icon: LinkedIn, link: 'https://www.linkedin.com/in/ruther-frith-solloso-8158a6162' },
    { icon: GitHub, link: 'https://github.com/rfGalahad' },
    { icon: Phone, action: () => setPhoneOpen(true) },
    { icon: ArticleOutlined, action: () => setResumeOpen(true) },
  ];

  const handleCloseEmail = useCallback(() => setEmailOpen(false), []);
  const handleClosePhone = useCallback(() => setPhoneOpen(false), []);
  const handleCloseResume = useCallback(() => setResumeOpen(false), []);

  return (
    <>
      <ShapeGrid 
        speed={0.3}
        squareSize={80}
        direction='diagonal'
        borderColor="#171616"
      />

      <EmailDialog 
        open={emailOpen} 
        onClose={handleCloseEmail} 
      />

      <ContactDialog
        open={phoneOpen} 
        onClose={handleClosePhone}
      />

      <ResumeDialog 
        open={resumeOpen} 
        onClose={handleCloseResume} 
      />
    
      <div className="container">
          <section className="info-section">
            <div className="developer">
              <h1 className="developer-name">Ruther Solloso</h1>
              <p className="developer-title">Junior Full Stack Developer</p>
              <p className="developer-description">
                A fresh graduate with experience in web development through internship and government contract work. 
                Skilled in building responsive web applications using modern technologies.
              </p>
            </div> 
      
            <div className="skills">
              <div className="tab-filters">
                {tabs.map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActive(tab)}
                    className={`tab-btn ${active === tab ? 'active' : ''}`}
                  >
                    {tab}
                    <span className="tab-count">
                      {tab === 'All' ? allItems.length : CATEGORIES[tab].length}
                    </span>
                  </button>
                ))}
              </div>

              <div className="badges-wrap">
                {items.map((item, i) => (
                  <SkillBadge
                    key={`${item.cat}-${item.text}`}
                    icon={item.icon}
                    img={item.img}
                    text={item.text}
                    cat={item.cat}
                    style={{ animationDelay: `${i * 30}ms` }}
                  />
                ))}
              </div>
            </div>
          </section>

          <section className="project-section">
            <div className="project-header">
              <Folder sx={{ fontSize: 22 }} />
              <p className="project-header-title">Projects</p>
            </div>
            {PROJECTS.map((project, index) => (
              <ProjectCard
                key={index}
                title={project.title}
                role={project.role}
                description={project.description}
                status={project.status}
                year={project.year}
                stack={project.stack}
                link={project.link}
              />
            ))}
          </section>

          <footer>
            <div className="footer-links">
              {SOCIAL_LINKS.map((link, index) => (
                link.action ? (
                  <button
                    key={index}
                    onClick={link.action}
                    className="footer-link footer-link-btn"
                    aria-label="Send email"
                  >
                    <link.icon sx={{ fontSize: 26 }} />
                  </button>
                ) : (
                  <a key={index} href={link.link} className="footer-link" target="_blank" rel="noopener noreferrer">
                    <link.icon sx={{ fontSize: 26 }} />
                  </a>
                )
              ))}
            </div>
            <p className="footer-text">
              © 2026. All rights reserved.
            </p>
          </footer>
      </div>
    </>
  )
}

export default App
