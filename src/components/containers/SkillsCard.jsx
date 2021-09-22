import PropTypes from 'prop-types';
import Reveal, { reveal3 } from '../animations/Reveal';

const SkillsCard = ({ children }) => (
  <Reveal variants={reveal3}>
    <div className="p-6 w-full h-28 mx-auto rounded-xl shadow-md flex items-center space-x-4 bg-gradient-to-r from-white to-yellow-50">
      {children}
    </div>
  </Reveal>
);

SkillsCard.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SkillsCard;
