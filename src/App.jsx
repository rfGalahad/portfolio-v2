import { useMemo, useState } from 'react';
import { Folder, Mail, GitHub, LinkedIn, Phone, ArticleOutlined } from '@mui/icons-material';

import SkillBadge from './components/SkillBadge';
import ShapeGrid from './components/ShapeGrid';
import ProjectCard from './components/ProjectCard';
import SocialLink from './components/SocialLink';
import EmailDialog from './components/dialogs/EmailDialog';
import ContactDialog from './components/dialogs/ContactDialog';
import ResumeDialog from './components/dialogs/ResumeDialog';
import ProjectDialog from './components/dialogs/ProjectDialog';

import { toSkillItem } from './utils/skills';
import { PROJECTS } from './config/projects';
import { TECH_STACK } from './config/techStack';
import { TECH_STACK_TABS } from './constants/techStack';
import { useDialog } from './hooks/useDialog';



function App() {
 
  const [active, setActive] = useState('All');

  const email  = useDialog();
  const phone  = useDialog();
  const resume = useDialog();
  const project = useDialog();

  const allItems = useMemo(() => Object.entries(TECH_STACK).flatMap(([cat, arr]) =>
    arr.map(item => toSkillItem(item, cat))
  ), []);

  const items = useMemo(() => {
    return active === 'All'
      ? allItems
      : TECH_STACK[active].map(item => toSkillItem(item, active));
  }, [active, allItems]);

  const socialLinks = useMemo(() => [
    { icon: Mail, action: email.onOpen, ariaLabel: 'Send email' },
    { icon: LinkedIn, link: 'https://www.linkedin.com/in/ruther-frith-solloso-8158a6162' },
    { icon: GitHub, link: 'https://github.com/rfGalahad' },
    { icon: Phone, action: phone.onOpen, ariaLabel: 'View phone number' },
    { icon: ArticleOutlined, action: resume.onOpen, ariaLabel: 'View resume' },
  ], [email.onOpen, phone.onOpen, resume.onOpen]);

  return (
    <>
      <ShapeGrid 
        speed={0.3}
        squareSize={80}
        direction='diagonal'
        borderColor="#171616"
      />

      <EmailDialog 
        open={email.open} 
        onClose={email.onClose} 
      />

      <ContactDialog
        open={phone.open} 
        onClose={phone.onClose}
      />

      <ResumeDialog 
        open={resume.open} 
        onClose={resume.onClose} 
      />

      <ProjectDialog
        open={project.open}
        onClose={project.onClose}
        project={project.data}
      />
    
      <div className="container">
          <section className="info-section">
            {/* DEVELOPER INFO */}
            <div className="developer">
              <h1 className="developer-name">Ruther Solloso</h1>
              <p className="developer-title">
                IT | Cybersecurity | Junior Full-Stack Developer 
              </p>
              <p className="developer-description">
                A fresh BSIT graduate with hands-on experience in web development 
                through internship and government contract work, currently building 
                foundational knowledge in cybersecurity alongside modern web technologies.
              </p>
            </div> 
      
            {/* TECH STACK */}
            <div className="skills">
              <div className="tab-filters">
                {TECH_STACK_TABS.map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActive(tab)}
                    className={`tab-btn ${active === tab ? 'active' : ''}`}
                  >
                    {tab}
                    <span className="tab-count">
                      {tab === 'All' ? allItems.length : TECH_STACK[tab].length}
                    </span>
                  </button>
                ))}
              </div>

              <div className="badges-wrap">
                {items.map((item) => (
                  <SkillBadge
                    key={`${item.cat}-${item.text}`}
                    icon={item.icon}
                    img={item.img}
                    text={item.text}
                    category={item.cat}
                  />
                ))}
              </div>
            </div>
          </section>
          
          {/* PROJECTS */}
          <section className="project-section">
            <div className="project-header">
              <Folder sx={{ fontSize: 22 }} />
              <p className="project-header-title">Projects</p>
            </div>
            {PROJECTS.map((proj) => (
              <ProjectCard
                key={proj.title}
                {...proj}
                onClick={() => project.onOpen(proj)} 
              />
            ))}
          </section>

          {/* FOOTER */}
          <footer>
            <div className="footer-links">
              {socialLinks.map((link) => (
                <SocialLink
                  key={link.ariaLabel ?? link.link}
                  {...link}
                />
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
