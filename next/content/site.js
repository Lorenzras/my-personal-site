// All page content lives here. Edit this file to update the site.
//
// Anything marked `suggested: true` is an idea Claude proposed, not something
// Lenz has confirmed. It renders with a "Proposed" badge. Delete it, or
// remove the flag once it's true.

export const profile = {
  name: 'Lorenz Ras',
  short: 'Lenz',
  role: 'kintone packages · AI integrations · AWS',
  location: 'Based in Japan',
  email: 'contact@lenzlab.com',
  github: 'https://github.com/Lorenzras',
  kicker: 'LENZLAB · 業務改善エンジニア',
  // The hero cycles through these: "Stop ____."
  painVerbs: ['re-typing the same data', 'redacting PDFs by hand', 'exporting CSVs every Friday', 'fearing your kintone JS'],
  intro:
    'I build kintone packages and AI integrations for teams in Japan, so the busywork runs itself and your data stays where it should.',
  languages: 'English · Tagalog · 日本語 OK',
};

// The page opens with problems, not tech. Each pain gets crossed out and
// replaced by what I build for it.
export const pains = [
  {
    id: 'kintone',
    tag: 'kintone',
    pain: 'Your kintone apps grew one customization at a time. Now nobody dares touch the JavaScript.',
    fix: 'I rebuild it as a proper package: versioned, tested, documented, and installable on every app or domain in one step.',
  },
  {
    id: 'masking',
    tag: 'AI masking',
    pain: 'Someone spends hours blacking out names, addresses and My Number before a document can be shared.',
    fix: 'An AI integration finds personal data and masks it automatically. People review the result instead of doing the work.',
    link: { href: '/masking/', label: 'See the masking demo' },
  },
  {
    id: 'retype',
    tag: 'Integration',
    pain: 'The same customer is typed into kintone, Excel, email and the accounting tool. Every copy is slightly different.',
    fix: 'One source of truth, with the other systems kept in sync by an integration you never have to think about.',
  },
  {
    id: 'ai-risk',
    tag: 'AWS Bedrock',
    pain: 'You want AI, but you can’t paste customer data into a public chatbot.',
    fix: 'I run models through AWS Bedrock inside your own AWS account, so prompts and documents stay in your environment.',
  },
  {
    id: 'security',
    tag: 'Security',
    pain: 'API tokens sit in plain browser JavaScript and every app has full admin access.',
    fix: 'Security basics come first: least-privilege tokens, secrets kept server-side, IP limits and logs you can actually read.',
  },
];

export const services = [
  {
    id: 'kintone',
    title: 'kintone packages',
    jp: 'kintoneパッケージ',
    body: 'Plugins and customization packages built like real software: shared code, settings screens, version history and a clean install.',
    points: ['Plugins with settings UI', 'React-based custom views', 'Multi-app packages', 'Migration of legacy JS'],
  },
  {
    id: 'ai',
    title: 'AI integrations',
    jp: 'AI連携',
    body: 'Practical AI wired into the tools you already use. Document masking is the first; each one solves a single, measurable chore.',
    points: ['Personal data masking', 'Document understanding', 'Human review step', 'Runs on AWS Bedrock'],
  },
  {
    id: 'integrations',
    title: 'System integrations',
    jp: 'システム連携',
    body: 'kintone talking to the rest of your stack through APIs and webhooks, with retries and alerts when something fails.',
    points: ['Webhooks & REST APIs', 'Chat notifications', 'Scheduled syncs', 'Serverless on AWS'],
  },
  {
    id: 'security',
    title: 'Security basics',
    jp: 'セキュリティ基本対策',
    body: 'Not a buzzword sticker. Every project ships with the basics done right, and I explain what was done in plain words.',
    points: ['Least-privilege access', 'No secrets in the browser', 'Input validation', 'Audit-friendly logs'],
  },
];

// The animated Bedrock pipeline diagram, left to right. Steps marked `aws`
// sit inside the dashed "Your AWS account" box.
export const pipeline = {
  title: 'How an AI integration runs',
  body: 'A record or file comes in from kintone, gets processed inside your AWS account, and comes back for a person to check.',
  steps: [
    { id: 'in', label: 'kintone', sub: 'record or file' },
    { id: 'api', label: 'API Gateway + Lambda', sub: 'auth · validation', aws: true },
    { id: 'bedrock', label: 'AWS Bedrock', sub: 'your account, your region', aws: true },
    { id: 'out', label: 'Review in kintone', sub: 'person approves' },
  ],
};

export const securityChecks = [
  'API tokens scoped to only the apps and actions they need',
  'Secrets stay server-side, never in customization JavaScript',
  'IP restrictions and authentication on every endpoint',
  'Inputs validated before anything reaches a model or a database',
  'Personal data masked before it’s logged or shared',
  'Clear handover notes: what runs where, and who can access it',
];

// Proposed integration ideas for Lenz to confirm. They render with a
// "Proposed" badge until `suggested` is removed.
export const ideas = [
  {
    title: 'Invoice & form reading',
    body: 'Scanned invoices or application forms read by AI and turned into kintone records for a person to confirm.',
    suggested: true,
  },
  {
    title: 'Ask your kintone',
    body: 'Search records in plain Japanese or English, with answers that link back to the source record.',
    suggested: true,
  },
  {
    title: 'Japanese ⇄ English records',
    body: 'Comments and records translated in place, so mixed-language teams work from the same data.',
    suggested: true,
  },
  {
    title: 'Inbox to kintone',
    body: 'Customer emails summarised, classified and filed as kintone records with the right owner.',
    suggested: true,
  },
  {
    title: 'Chat notifications',
    body: 'kintone changes posted to Chatwork, Slack or LINE WORKS, with a short AI summary of what changed.',
    suggested: true,
  },
  {
    title: 'Accounting sync',
    body: 'Orders and invoices in kintone kept in sync with tools like freee or Money Forward.',
    suggested: true,
  },
];

export const process = [
  { title: 'Hear the pain', body: 'We start with the chore, who does it and how long it takes. Not with technology.' },
  { title: 'Small prototype', body: 'A working slice on your real data, usually on one app, so you can judge it early.' },
  { title: 'Secure by default', body: 'Access, secrets and personal data handled properly before anything goes live.' },
  { title: 'Hand over', body: 'Documentation, a short walkthrough, and code you own. No black boxes.' },
];

export const projects = [
  {
    title: 'Document masking with AI',
    tags: ['AWS Bedrock', 'AI', 'Security'],
    description: 'Detects and masks personal information in business documents before they are shared.',
    link: '/masking/',
    linkLabel: 'Demo',
    featured: true,
  },
  {
    title: 'kintone Daily Reports',
    tags: ['React', 'kintone'],
    description: 'Drag-and-drop daily reporting modelled on a calendar day view.',
    link: 'https://github.com/Lorenzras/kintone-customize',
  },
  {
    title: 'kintone × Chatwork',
    tags: ['JavaScript', 'Webhooks'],
    description: 'Posts to Chatwork whenever a kintone record changes.',
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
    title: 'Handwriting Stroke Classifier',
    tags: ['Python', 'ML'],
    description: 'Classifies the ends of handwritten strokes as jump, stop or hook.',
    link: 'https://github.com/Lorenzras/ClassifyLineEnd',
  },
];

export const contact = {
  kicker: 'CONTACT · お問い合わせ',
  title: 'What chore is eating your team’s week?',
  body: 'Tell me the pain in a sentence or two. I’ll reply with how I would fix it, and whether it’s worth fixing at all.',
};

// Placeholder copy for the masking demo page (video or motion demo comes later).
export const maskingDemo = {
  kicker: 'DEMO · 個人情報マスキング',
  title: 'AI document masking',
  body: 'A full demo is on the way. Below is a preview of what it does: personal data is found and masked, then a person reviews it.',
  doc: [
    ['申込者氏名', '山田 太郎', true],
    ['住所', '愛知県名古屋市中区栄 1-2-3', true],
    ['電話番号', '090-1234-5678', true],
    ['マイナンバー', '1234 5678 9012', true],
    ['申込内容', 'kintone 導入支援（3 アプリ）', false],
    ['担当者メモ', '来週の打ち合わせで見積提出', false],
  ],
};
