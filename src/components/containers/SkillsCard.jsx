import PropTypes from 'prop-types';

const SkillsCard = ({ children }) => (
  <div className="p-6 w-full min-h-32 max-h-48 mx-auto rounded-xl shadow-md flex items-center space-x-4 bg-gradient-to-r from-white to-yellow-50">
    {children}
  </div>
);

SkillsCard.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SkillsCard;
