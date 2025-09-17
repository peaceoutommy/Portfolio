import { memo } from 'react';
import PropTypes from 'prop-types';
import { SiTailwindcss, SiBlazor, SiMongodb, SiMariadb, SiDotnet } from "react-icons/si";
import { TbBrandMysql } from "react-icons/tb";

/**
 * Icon - Component for rendering the appropriate icon based on the provided name
 * Can be used for skills, technologies, social media, or any other icon needs
 */
const Icons = ({ name }) => {
  // Function to get the appropriate icon based on the name
  const renderIcon = () => {
    // Map names to their corresponding icons (mix of Font Awesome and react-icons)
    switch (name) {
      // Programming Languages & Frontend
      case 'React': return <i className="fab fa-react"></i>;
      case 'JavaScript': return <i className="fab fa-js"></i>;
      case 'Tailwind CSS': return <SiTailwindcss />;
      case 'Blazor': return <SiBlazor />;
      case 'HTML/CSS': return <i className="fab fa-html5"></i>;

      // Backend
      case 'Node.js': return <i className="fab fa-node-js"></i>;
      case '.NET': return <SiDotnet />;
      case 'C#': return <i className="fas fa-hashtag"></i>;
      case 'Express': return <i className="fas fa-server"></i>;
      case 'Python': return <i className="fab fa-python"></i>;
      case 'Php': return <i className="fab fa-php"></i>;

      // Databases
      case 'MySQL': return <TbBrandMysql />;
      case 'SQL Server': return <i className="fas fa-server"></i>;
      case 'MongoDB': return <SiMongodb />;
      case 'MariaDB': return <SiMariadb />;

      // Version Control
      case 'Git': return <i className="fab fa-git-alt"></i>;
      case 'GitHub': return <i className="fab fa-github"></i>;
      case 'GitLab': return <i className="fab fa-gitlab"></i>;

      // Social media
      case 'LinkedIn': return <i className="fab fa-linkedin"></i>;
      case 'Twitter': return <i className="fab fa-twitter"></i>;
      case 'Instagram': return <i className="fab fa-instagram"></i>;
      case 'Facebook': return <i className="fab fa-facebook"></i>;
      case 'YouTube': return <i className="fab fa-youtube"></i>;
      case 'Email': return <i className="far fa-envelope"></i>;

      // General UI
      case 'Download': return <i className="fas fa-download"></i>;
      case 'User': return <i className="fas fa-user"></i>;
      case 'Calendar': return <i className="far fa-calendar-alt"></i>;
      case 'Clock': return <i className="far fa-clock"></i>;
      case 'Search': return <i className="fas fa-search"></i>;
      case 'Settings': return <i className="fas fa-cog"></i>;
      case 'Home': return <i className="fas fa-home"></i>;
      case 'Star': return <i className="fas fa-star"></i>;
      case 'Heart': return <i className="fas fa-heart"></i>;
      case 'Comment': return <i className="far fa-comment"></i>;

      // Navbar
      case 'Palette': return <i className="fas fa-palette"></i>

      // Projects
      case 'ExternalLink': return <i className="fas fa-external-link-alt"></i>

      // Actions
      case 'Apply': return <i className="fas fa-check"></i>;
      case 'Cancel': return <i className="fas fa-times"></i>;

      // Default
      default: return <i className="fas fa-code"></i>;
    }
  };

  return renderIcon();
};

Icons.propTypes = {
  name: PropTypes.string.isRequired
};

export default memo(Icons);