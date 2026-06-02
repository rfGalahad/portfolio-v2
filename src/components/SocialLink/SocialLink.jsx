import './SocialLink.css';

const SocialLink = ({ icon: Icon, link, action }) =>
  action ? (
    <button onClick={action} className="footer-link footer-link-btn">
      <Icon sx={{ fontSize: 26 }} />
    </button>
  ) : (
    <a href={link} className="footer-link" target="_blank" rel="noopener noreferrer">
      <Icon sx={{ fontSize: 26 }} />
    </a>
  );

export default SocialLink;