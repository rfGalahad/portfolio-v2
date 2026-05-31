import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import "./ProjectCard.css";

const ProjectCard = ({
  title = "E-tbayat MSWDO",
  role = "Full Stack Developer",
  description = "A progressive web application for managing MSWDO Itbayat's surveys and data.",
  status = "Live",
  year = "2024",
  stack = ["React", "Node.js", "PostgreSQL", "PWA"],
  link = "https://etbayat.vercel.app/"
}) => {
  return (
    <div 
      className="project-card" 
      onClick={() => window.open(link, "_blank")}>

      {/* Status badge + year */}
      <div className="top-row">
        <span className="status-badge">
          <span className="status-dot" />
          {status}
        </span>
        <span className="year">{year}</span>
      </div>

      {/* Title & role */}
      <div className="title-row">
        <p className="title">{title}</p>
        <OpenInNewIcon fontSize="small" sx={{ color: 'rgba(255,255,255,0.6)' }} />
      </div>  
      <p className="role">{role}</p>

      {/* Description */}
      <p className="description">{description}</p>

      <div className="divider" />

      {/* Tech stack */}
      <div className="tech-stack">
        {stack.map((tech) => (
          <span key={tech} className="tech-pill">
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;