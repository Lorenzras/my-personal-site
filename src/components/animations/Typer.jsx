import Typewriter from 'typewriter-effect';

const delay = 500;

const roles = [
  ' Software Engineer.',
  'n RPA developer.',
  ' Backend developer.',
  ' Frontend developer.',
  ' Software developer.',
  ' Japanese Language Teacher.',
];

const Typer = () => (

  <Typewriter
    options={{
      loop: true,
      deleteSpeed: 10,
    }}
    onInit={(typewriter) => {
      typewriter
        .typeString('I\'m a')

        .typeString(roles[0])
        .pauseFor(delay)
        .deleteChars(roles[0].length)

        .typeString(roles[1])
        .pauseFor(delay)
        .deleteChars(roles[1].length)
        .pauseFor(delay)

        .typeString(roles[2])
        .pauseFor(delay)
        .deleteChars(roles[2].length)
        .pauseFor(delay)

        .typeString(roles[3])
        .pauseFor(delay)
        .deleteChars(roles[3].length)
        .pauseFor(delay)

        .typeString(roles[4])
        .pauseFor(delay)
        .deleteChars(roles[4].length)
        .pauseFor(delay)

        .typeString(roles[5])
        .pauseFor(delay)
        .deleteChars(roles[5].length)
        .pauseFor(delay)

        .start();
    }}
  />
);

export default Typer;
