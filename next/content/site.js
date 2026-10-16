// All page content lives here. Edit this file to update the site.

export const profile = {
  name: 'Lorenz Ras',
  role: 'Full-stack Software Engineer',
  location: 'Toyohashi, Aichi, Japan',
  email: 'contact@lenzlab.com',
  github: 'https://github.com/Lorenzras',
  tagline: 'If it repeats, I automate it.',
  intro:
    'Software engineer from the Philippines, building in Japan. I turn manual, repetitive work into pipelines that run themselves.',
};

// Each station is one machine on the conveyor line.
export const stations = [
  {
    id: 'frontend',
    label: 'Frontend',
    color: '#38bdf8',
    items: ['React', 'Vue', 'Next.js', 'Tailwind', 'Bootstrap'],
    blurb: 'Interfaces people actually enjoy using.',
  },
  {
    id: 'backend',
    label: 'Backend',
    color: '#a78bfa',
    items: ['Node', 'Deno', 'Go', 'PHP / Laravel', 'Java'],
    blurb: 'APIs and services that keep the line moving.',
  },
  {
    id: 'rpa',
    label: 'RPA',
    color: '#f59e0b',
    items: ['UiPath', 'Power Automate', 'VBA', 'Python', 'Pascal'],
    blurb: 'Bots that log in, type, validate and never get tired.',
  },
  {
    id: 'ai',
    label: 'AI & Data',
    color: '#f472b6',
    items: ['Embeddings', 'Machine Learning', 'Image Processing', 'SQL', 'MongoDB'],
    blurb: 'Making machines see, sort and understand.',
  },
  {
    id: 'cloud',
    label: 'Cloud',
    color: '#34d399',
    items: ['AWS Amplify', 'Netlify', 'Kintone', 'Heroku'],
    blurb: 'Shipping it fast, cheap and reliably.',
  },
];

// Projects shown in the showroom. Add `model: '/models/your-file.glb'`
// to show a 3D model on the pedestal instead of the default crate.
export const projects = [
  {
    title: 'Handwriting Stroke Classifier',
    tags: ['Python', 'ML', 'Image Processing'],
    description: 'Classifies the ends of handwritten strokes as jump, stop or hook.',
    link: 'https://github.com/Lorenzras/ClassifyLineEnd',
  },
  {
    title: 'RuneScape Clay Miner',
    tags: ['Java', 'Pascal', 'Bots'],
    description: 'Automated miner with an injected Java client and colour pattern detection.',
    link: 'https://github.com/Lorenzras/RSBot-src',
  },
  {
    title: 'Kintone Daily Reports',
    tags: ['React', 'Kintone'],
    description: 'Drag-and-drop daily reporting modelled on a calendar day view.',
    link: 'https://github.com/Lorenzras/kintone-customize',
  },
  {
    title: 'Legacy Software Encoder',
    tags: ['UiPath', 'RPA'],
    description: 'Automates login, input and validation on legacy desktop systems.',
  },
  {
    title: 'Real Estate Scraper',
    tags: ['UiPath', 'VBA'],
    description: 'Collects listings from real estate sites into clean data.',
  },
  {
    title: 'Kintone x Chatwork',
    tags: ['JavaScript', 'Webhooks'],
    description: 'Posts to Chatwork whenever a Kintone record changes.',
    link: 'https://github.com/Lorenzras/kintone-customize',
  },
];
