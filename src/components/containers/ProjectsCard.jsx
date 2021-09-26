import PropTypes, { string } from 'prop-types';
import Typewriter from 'typewriter-effect';

const ProjectsCard = ({ title, description, link }) => (
  <a href={`${link}`} target="_blank" className=" p-2 h-28 mx-auto rounded-xl flex flex-col space-x-4 w-72" rel="noreferrer">
    <div className="
    p-4 h-24 shadow-md rounded-md |
    transition duration-500 ease-in-out bg-white hover:bg-yellow-50 transform hover:-translate-y-1 hover:scale-110"
    >
      <div className="text-black">{title}</div>
      <p className="text-xs text-gray-500">
        <Typewriter
          options={{
            strings: description,
            loop: true,
            autoStart: true,
            delay: 10,
            deleteSpeed: 10,
          }}
        />

      </p>
    </div>
  </a>
);

ProjectsCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.arrayOf(string).isRequired,
  link: PropTypes.string.isRequired,
};

export default ProjectsCard;
