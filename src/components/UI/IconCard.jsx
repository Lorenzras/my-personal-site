import PropTypes from 'prop-types';

const IconCard = ({ imageFile, title, description }) => (
  <div>

    <div>
      {title}
      {imageFile}
    </div>
    <div>{description}</div>
  </div>
);

IconCard.propTypes = {
  imageFile: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default IconCard;
