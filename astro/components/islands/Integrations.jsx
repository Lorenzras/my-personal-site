import withMotion from './withMotion';
import Integrations from '../Integrations';

// One file per island so each loads only its own code.
export default withMotion(Integrations);
