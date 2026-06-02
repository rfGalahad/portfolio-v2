import { useState } from 'react';

import { BADGE_COLORS } from '../../constants/colors';

import './SkillBadge.css';


const SkillBadge = ({ icon, img, text, category }) => {

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
    return <span className="badge-dot" style={{ background: BADGE_COLORS[category] }} />;
  };

  return (
    <div className="skill-badge">
      {renderIcon()}
      <span>{text}</span>
    </div>
  );
}

export default SkillBadge;