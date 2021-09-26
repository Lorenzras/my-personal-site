import { Element } from 'react-scroll';
import Marquee from 'react-fast-marquee';
import PropTypes, { any } from 'prop-types';
import TitleMini from '../UI/TitleMini';

import H2 from '../headers/H2';
import Description from '../UI/Description';
import InnerContainer from '../containers/InnerContainer';
import Col from '../containers/Col';
import ProjectsCard from '../containers/ProjectsCard';

const contents1 = [
  {
    title: 'Runescape - Clay Miner',
    description: ['An automatic clay miner for Runescape.', 'Inject written with Java.', 'Pattern and color detector written with Pascal'],
    link: 'https://github.com/Lorenzras/RSBot-src',
  },
  {
    title: 'Handwriting - Stroke End',
    description: ['Classifies handwritten stroke.', 'Classifications may be jump, stop, or hook.', 'Written in Python.', 'Takes advantage of Machine Learning and Digital Image Processing.'],
    link: 'https://github.com/Lorenzras/ClassifyLineEnd',
  },
  {
    title: 'Attendance Monitor',
    description: ['Written in ReactJS.', 'Allows user to easily register leaves and day-offs.', 'Customization written for Kintone.'],
    link: 'https://github.com/Lorenzras/kintone-customize/tree/main/app-108-yasumikanri',
  },
  {
    title: 'Car Rental Reservation',
    description: ['Written in ReactJS.', 'Rent Company Car with ease.', 'Customization written for Kintone.'],
    link: 'https://github.com/Lorenzras/kintone-customize/tree/main/app-carReservation',
  },
  {
    title: 'Daily Reporting System',
    description: ['Written in ReactJS.', 'Patterned to Google Calendar\'s Day View.', 'Allows user to input tasks with drag and drop.', 'Customization written for Kintone'],
    link: 'https://github.com/Lorenzras/kintone-customize',
  },
  {
    title: 'AWS Deployment',
    description: ['I deploy sites to AWS.', 'SEO? Make your static site fast!', 'Migration from shared host to AWS.'],
    link: 'https://aws.amazon.com/',
  },

];

const contents2 = [
  {
    title: 'Realestate Website Scrapper',
    description: ['Get data from RealEstate websites.', 'Developed with UiPath.', 'Written partially in VBA.'],
    link: 'https://www.uipath.com/',
  },
  {
    title: 'Legacy Software Encoder',
    description: ['Processes data from legacy softwares.', 'Automate login, input, and validation.', 'Avoid\'s human error.', 'Developed in UiPath'],
    link: 'https://www.uipath.com/',
  },
  {
    title: 'Game Botting',
    description: ['Mining? Crafting? Skilling? Training?', 'Lets Automate it!', 'Takes advantage DIP and Machine Learning.', 'Automates repetitive tasks.', 'Simulates human movement to avoid detection.', 'Written in C++ or Python.'],
    link: 'https://www.runescape.com',
  },
  {
    title: 'Kintone and Chatwork Integration',
    description: ['Written in Javascript.', 'Automatically sends message to Chatwork on any Kintone record manipulation.', 'Uses Kintone Webhook.', 'Uses Chatwork API.'],
    link: 'https://github.com/Lorenzras/kintone-customize/',
  },
  {
    title: 'Kintone and Website Integration',
    description: ['Written in Javascript.', 'Saves data to kintone when user submits form.', 'Automatically send email to both user and the web site owner.'],
    link: 'https://github.com/Lorenzras/kintone-customize/',
  },
  {
    title: 'Translation JP -> EN',
    description: ['I translate Philippine Documents.', 'Japanese to English', '和英翻訳'],
    link: 'https://translate.google.co.jp/?hl=en&sl=ja&tl=en&text=%E3%82%B0%E3%83%BC%E3%82%B0%E3%83%AB%E3%81%AE%E7%BF%BB%E8%A8%B3%E3%81%8C%E5%90%88%E3%81%A3%E3%81%A6%E3%81%BE%E3%81%99%E3%81%8B%EF%BC%9F&op=translate',
  },

];

const ProjectList = ({ contents, direction }) => {
  const marqueeContent = contents.map(
    ({ title, description, link }) => (
      <ProjectsCard
        title={title}
        description={description}
        link={link}
      />
    ),
  );

  return (
    <div className="w-screen mt-12">
      <Marquee
        direction={direction}
        gradient={false}
        speed={20}
        pauseOnHover
      >
        {marqueeContent}
      </Marquee>
    </div>
  );
};

const Projects = () => (
  <Element name="projects">
    <InnerContainer id="projects">
      <Col>
        <TitleMini>PROJECTS</TitleMini>
        <H2>
          Some Of My Work.
        </H2>
        <Description maxWidth="screen-md">
          Choose your pill.
        </Description>
        <ProjectList direction="left" contents={contents1} />
        <ProjectList direction="right" contents={contents2} />
      </Col>
    </InnerContainer>
  </Element>
);

ProjectList.propTypes = {
  contents: PropTypes.arrayOf(any).isRequired,
  direction: PropTypes.string.isRequired,
};

export default Projects;
