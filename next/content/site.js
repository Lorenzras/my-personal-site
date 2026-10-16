// All page content lives here. Edit this file to update the site.

export const profile = {
  name: 'Lorenz Ras',
  role: 'Full-stack Engineer · Automation Builder',
  location: 'Toyohashi, Aichi, Japan',
  email: 'contact@lenzlab.com',
  github: 'https://github.com/Lorenzras',
  kicker: 'LENZLAB · 自動化工場',
  tagline: 'If it repeats, I automate it.',
  taglineJp: '繰り返すなら、自動化する。',
  intro:
    'Built in the Philippines, running in Japan. Feed me messy spreadsheets, paper forms and copy-paste chores. I ship back systems that run themselves.',
  hint: 'Scroll to start the line ↓',
};

// Each station is one machine on the conveyor line, in the order work flows.
export const stations = [
  {
    id: 'rpa',
    label: 'RPA',
    jp: 'ロボット',
    color: '#f59e0b',
    items: ['UiPath', 'Power Automate', 'VBA', 'Python', 'Pascal'],
    action: 'Typing… stamping 済',
    blurb: 'Bots that log in, type, check and never ask for overtime.',
  },
  {
    id: 'ai',
    label: 'AI & Data',
    jp: '解析',
    color: '#f472b6',
    items: ['Embeddings', 'Machine Learning', 'Image Processing', 'SQL', 'MongoDB'],
    action: 'Scanning → vectors',
    blurb: "Teaching machines to see pixels and understand meaning. Started with game bots, now it's embeddings.",
  },
  {
    id: 'backend',
    label: 'Backend',
    jp: '処理',
    color: '#a78bfa',
    items: ['Node', 'Deno', 'Go', 'PHP / Laravel', 'Java'],
    action: 'Routing… 200 OK',
    blurb: 'APIs and pipes that keep data flowing. Currently adding Go to the toolbox.',
  },
  {
    id: 'frontend',
    label: 'Frontend',
    jp: '画面',
    color: '#38bdf8',
    items: ['React', 'Vue', 'Next.js', 'Tailwind', 'Kintone UI'],
    action: 'Assembling UI',
    blurb: 'Screens people actually like using, from Kintone add-ons to sites like this one.',
  },
  {
    id: 'cloud',
    label: 'Cloud',
    jp: '出荷',
    color: '#34d399',
    items: ['AWS Amplify', 'Netlify', 'Kintone', 'Heroku'],
    action: 'Deploying ✓',
    blurb: 'Packed, deployed, monitored. Shipped fast and cheap, and it stays up.',
  },
];

export const sections = {
  showroom: {
    kicker: 'SHOWROOM · 展示室',
    title: 'Off the line',
    body: 'Real things this factory built. Click a pedestal or a card to inspect.',
  },
  contact: {
    kicker: 'SHIPPING DOCK · 出荷',
    title: 'Got a chore that should run itself?',
    body: "Tell me what eats your team's week. I'll design the machine.",
    signoff: 'English · Tagalog · 日本語 OK',
  },
};

// Projects shown in the showroom. Add `model: '/models/your-file.glb'`
// to show your own 3D model on the pedestal. `exhibit` picks the built-in
// placeholder (ore, stroke, calendar, terminal, house, bubble) until then.
export const projects = [
  {
    title: 'Handwriting Stroke Classifier',
    tags: ['Python', 'ML', 'Image Processing'],
    exhibit: 'stroke',
    description: 'Classifies the ends of handwritten strokes as jump, stop or hook.',
    link: 'https://github.com/Lorenzras/ClassifyLineEnd',
  },
  {
    title: 'RuneScape Clay Miner',
    tags: ['Java', 'Pascal', 'Bots'],
    exhibit: 'ore',
    description: 'Automated miner with an injected Java client and colour pattern detection.',
    link: 'https://github.com/Lorenzras/RSBot-src',
  },
  {
    title: 'Kintone Daily Reports',
    tags: ['React', 'Kintone'],
    exhibit: 'calendar',
    description: 'Drag-and-drop daily reporting modelled on a calendar day view.',
    link: 'https://github.com/Lorenzras/kintone-customize',
  },
  {
    title: 'Legacy Software Encoder',
    tags: ['UiPath', 'RPA'],
    exhibit: 'terminal',
    description: 'Automates login, input and validation on legacy desktop systems.',
  },
  {
    title: 'Real Estate Scraper',
    tags: ['UiPath', 'VBA'],
    exhibit: 'house',
    description: 'Collects listings from real estate sites into clean data.',
  },
  {
    title: 'Kintone x Chatwork',
    tags: ['JavaScript', 'Webhooks'],
    exhibit: 'bubble',
    description: 'Posts to Chatwork whenever a Kintone record changes.',
    link: 'https://github.com/Lorenzras/kintone-customize',
  },
];
