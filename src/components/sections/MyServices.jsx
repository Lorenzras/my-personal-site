import { StaticImage } from 'gatsby-plugin-image';
import { Element } from 'react-scroll';
import Col from '../containers/Col';
import InnerContainer from '../containers/InnerContainer';
import H2 from '../headers/H2';
import TitleMini from '../UI/TitleMini';
import SkillsCard from '../containers/SkillsCard';
import SkillDescription from '../UI/SkillDescription';

const imageClasses = 'w-16 h-auto';

const MyServices = () => (
  <Element name="myServices">
    <InnerContainer id="myServices">
      <Col>
        <TitleMini>WHAT I DO</TitleMini>
        <H2>Specializing In</H2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center">
          <SkillsCard>
            <div className="flex-shrink-0">
              <StaticImage
                className={imageClasses}
                src="../../assets/images/cloud.png"
                alt="cloud"
              />
            </div>
            <SkillDescription
              title="Hosting and Cloud"
              description="AWS Amplify, AWS EC2, Netflify, Google Cloud, Kintone, Shared Host"
            />
          </SkillsCard>
          <SkillsCard>
            <div className="flex-shrink-0">
              <StaticImage
                className={imageClasses}
                src="../../assets/images/agile.png"
                alt="cloud"
              />
            </div>
            <SkillDescription
              title="Software"
              description="VB.net, C#, C++, COBOL, Pascal, and other Legacy Systems"
            />
          </SkillsCard>
          <SkillsCard>
            <div className="flex-shrink-0">
              <StaticImage
                className={imageClasses}
                src="../../assets/images/backend.png"
                alt="cloud"
              />
            </div>
            <SkillDescription
              title="Backend"
              description="PHP (Laravel, CI, Wordpress), Python, C++, Node, Deno, Java"
            />
          </SkillsCard>
          <SkillsCard>
            <div className="flex-shrink-0">
              <StaticImage
                className={imageClasses}
                src="../../assets/images/frontend.png"
                alt="cloud"
              />
            </div>
            <SkillDescription
              title="Frontend"
              description="Javascript (React and Vue). CSS (Bulma, Tailwind and Bootstrap)"
            />
          </SkillsCard>
          <SkillsCard>
            <div className="flex-shrink-0">
              <StaticImage
                className={imageClasses}
                src="../../assets/images/rpa.png"
                alt="cloud"
              />
            </div>
            <SkillDescription
              title="RPA"
              description="VBA, UiPath, Microsoft Powerautomate, Python, Pascal, Java"
            />
          </SkillsCard>
          <SkillsCard>
            <div className="flex-shrink-0">
              <StaticImage
                className={imageClasses}
                src="../../assets/images/database.png"
                alt="cloud"
              />
            </div>
            <SkillDescription
              title="Database"
              description="SQLite, SQL, MongoDb, MS Access, Firebase"
            />
          </SkillsCard>
        </div>
      </Col>
    </InnerContainer>
  </Element>
);

export default MyServices;
