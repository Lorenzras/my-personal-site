import PropTypes from 'prop-types';

const SkillDescription = ({ title, description }) => (
  <div>
    <div className="text-xl font-medium text-black">{title}</div>
    <p className="text-gray-500">{description}</p>
  </div>
);

SkillDescription.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default SkillDescription;
