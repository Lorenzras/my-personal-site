// English page content. Items with `confirm: true` need Lenz's sign-off.
export default {
  meta: {
    title: 'LenzLab | kintone packages, integrations and private AI',
    description:
      'kintone packages, system integrations and AI document workflows for teams in Japan. Built, secured and documented by one engineer, inside your own AWS account.',
  },

  nav: {
    problems: 'Problems',
    services: 'Services',
    integrations: 'Integrations',
    work: 'Work',
    contact: 'Contact',
  },

  hero: {
    kicker: 'LENZLAB · KINTONE, INTEGRATIONS, PRIVATE AI',
    prefix: 'Stop',
    suffix: '',
    pains: [
      'typing the same data twice',
      'redacting documents by hand',
      'exporting CSVs every Friday',
      'chasing status in chat',
    ],
    resolve: 'Automate it. Keep the data yours.',
    intro:
      'Manual work costs hours and invites mistakes. I build kintone packages, integrations and AI workflows that remove it, from first call to handover.',
    ctaPrimary: 'Name the chore',
    ctaSecondary: 'See it running',
  },

  pains: {
    kicker: 'THE PROBLEM',
    title: 'Where your team’s hours go',
    body: 'Each of these costs time every week and creates errors. Each has a fix that runs on its own once built.',
    painLabel: 'Problem',
    fixLabel: 'Fix',
    items: [
      {
        id: 'retype',
        tag: 'Integration',
        pain: 'One customer is typed into kintone, Backlog, email and accounting. Four copies, four versions.',
        fix: 'Enter it once. The other systems update themselves, and you get an alert if a sync fails.',
        link: { href: '/work/kintone-backlog-sync/', label: 'See the kintone and Backlog sync' },
      },
      {
        id: 'masking',
        tag: 'AI masking',
        pain: 'Staff spend hours blacking out names, addresses and ID numbers. One missed field is a data leak.',
        fix: 'AI finds and masks the personal data. Your staff check the result instead of doing the work.',
        link: { href: '/work/ai-document-masking/', label: 'See the masking demo' },
      },
      {
        id: 'kintone',
        tag: 'kintone',
        pain: 'Your kintone apps grew one script at a time. Now every change risks breaking something.',
        fix: 'One package: versioned, tested, documented and installed on every app in one step.',
        link: { href: '/work/kintone-daily-report/', label: 'See a kintone package' },
      },
      {
        id: 'status',
        tag: 'Notifications',
        pain: 'Key record changes go unnoticed until a customer asks or a deadline passes.',
        fix: 'The right person gets a message in Slack, Chatwork or LINE WORKS the moment a record changes.',
        link: { href: '/work/kintone-chat-alerts/', label: 'See the chat alerts' },
      },
      {
        id: 'ai-risk',
        tag: 'Private AI',
        pain: 'You want AI, but pasting customer data into a public chatbot is a risk you cannot take.',
        fix: 'Models run on AWS Bedrock in your own AWS account. Prompts and documents never leave it.',
      },
    ],
  },

  difference: {
    kicker: 'WHY LENZLAB',
    title: 'The person you brief is the person who builds it.',
    body: 'No sales layer and no subcontractor. One engineer builds, secures and documents your system.',
    points: [
      {
        title: 'A working prototype first',
        body: 'See a slice running on your real data before you commit to the full build. Judge results, not slides.',
      },
      {
        title: 'Security on every delivery',
        body: 'Every project ships with a one-page security sheet: who can access what, where secrets live, what is logged.',
      },
      {
        title: 'Documented in English and Japanese',
        body: 'Handover notes your Japanese staff and overseas colleagues can both read. You own the code.',
      },
      {
        title: 'Fixed scope, fixed price',
        body: 'One deliverable, one quote. Easy to approve internally, and no surprise invoices.',
      },
    ],
  },

  services: {
    kicker: 'SERVICES',
    title: 'Fixed scope. One quote.',
    body: 'Start with an audit, so you never pay to build the wrong thing. Any build can add a monthly care plan.',
    items: [
      {
        id: 'audit',
        name: 'Workflow Audit',
        forWho: 'Teams who know a task wastes time but not what to build.',
        outcome: 'A written plan for one workflow, a fixed quote and the security risks spelled out.',
        includes: [
          'Interview with the people doing the work',
          'Map of the current process and data',
          'Recommended fix and fixed quote',
          'Fee credited if you proceed with the build',
        ],
        price: 'From ¥50,000',
        confirm: true,
      },
      {
        id: 'kintone',
        name: 'kintone Package',
        forWho: 'Teams whose kintone scripts are risky to change or copy to new apps.',
        outcome: 'A plugin or multi-app package you can install, configure and update without fear.',
        includes: [
          'Plugin with a settings screen',
          'Custom views and forms',
          'Rebuild of legacy JavaScript',
          'Tests, version history and install guide',
        ],
        price: 'From ¥300,000',
        confirm: true,
      },
      {
        id: 'integration',
        name: 'Integration Build',
        forWho: 'Teams copying data by hand between kintone, Backlog, chat, accounting or a website.',
        outcome: 'Systems that update each other, with retries and alerts when something fails.',
        includes: [
          'Webhooks and REST API connections',
          'Scheduled or real-time sync',
          'Serverless hosting on AWS',
          'Failure alerts and readable logs',
        ],
        price: 'From ¥200,000',
        confirm: true,
      },
      {
        id: 'ai',
        name: 'AI Document Workflow',
        forWho: 'Teams handling personal data or spending hours reading and checking documents.',
        outcome: 'AI that masks or extracts data inside your AWS account. A person approves every result.',
        includes: [
          'Personal data masking',
          'Data extraction into kintone records',
          'AWS Bedrock in your own account',
          'Human review step built in',
        ],
        price: 'From ¥400,000',
        confirm: true,
      },
    ],
  },

  integrations: {
    kicker: 'INTEGRATIONS',
    title: 'Enter it once. Every tool knows.',
    body: 'kintone at the center. Anything with an API or webhook connects to it. Select a tool to see what it does for you.',
    hub: 'kintone',
    hint: 'Hover over or tap a tool.',
    nodes: [
      {
        id: 'backlog',
        name: 'Backlog',
        category: 'Project management',
        example: 'Backlog issues created from kintone records, with status synced back automatically.',
      },
      {
        id: 'bedrock',
        name: 'AWS Bedrock',
        category: 'AI',
        example: 'Documents masked, summarized or read into fields. Data stays in your AWS account.',
      },
      {
        id: 'elevenlabs',
        name: 'ElevenLabs',
        category: 'Voice',
        example: 'Natural voice audio generated from records, such as announcements or guidance messages.',
      },
      {
        id: 'kuroco',
        name: 'Kuroco',
        category: 'Website and CMS',
        example: 'Website inquiries saved straight into kintone, and kintone data published to your site.',
      },
      {
        id: 'webhooks',
        name: 'Webhooks and REST APIs',
        category: 'Any service',
        example: 'Any tool that sends or accepts webhooks, connected with validation and retries.',
      },
      {
        id: 'slack',
        name: 'Slack',
        category: 'Chat',
        example: 'A short message to the right channel when a record is created, changed or overdue.',
      },
      {
        id: 'chatwork',
        name: 'Chatwork',
        category: 'Chat',
        example: 'Record changes and approval requests posted to the right group chat.',
      },
      {
        id: 'lineworks',
        name: 'LINE WORKS',
        category: 'Chat',
        example: 'Field staff notified on their phones without logging in to kintone.',
      },
      {
        id: 'google',
        name: 'Google Workspace',
        category: 'Office',
        example: 'Calendar events, Sheets and Drive files kept in step with kintone records.',
      },
      {
        id: 'freee',
        name: 'freee',
        category: 'Accounting',
        example: 'Invoices and deals in kintone sent to accounting without re-typing.',
      },
      {
        id: 'aws',
        name: 'AWS',
        category: 'Hosting',
        example: 'Integrations run on serverless AWS, so there is no server for you to maintain.',
      },
    ],
  },

  pipeline: {
    kicker: 'PRIVATE AI',
    title: 'Customer data never leaves your AWS account',
    body: 'A record leaves kintone, is checked and processed inside your own AWS account, and returns for a person to approve.',
    steps: [
      { id: 'in', label: 'kintone', sub: 'Record or file', detail: 'A staff member saves a record or uploads a file in kintone as usual.' },
      { id: 'api', label: 'API Gateway and Lambda', sub: 'Authentication and validation', aws: true, detail: 'The request is authenticated and checked before anything is processed.' },
      { id: 'bedrock', label: 'AWS Bedrock', sub: 'Your account, your region', aws: true, detail: 'The model runs in your own AWS account. Your data does not train it.' },
      { id: 'out', label: 'Review in kintone', sub: 'A person approves', detail: 'The result returns to kintone. A person approves it before it is used.' },
    ],
    hint: 'Scroll to send a record through.',
    boundaryLabel: 'Your AWS account',
  },

  security: {
    kicker: 'SECURITY',
    title: 'The basics most vendors skip',
    body: 'One leaked token can expose every app. Checked on every project, explained in plain words at handover.',
    checks: [
      'API tokens limited to the apps and actions they need',
      'Secrets kept server-side, never in browser JavaScript',
      'IP restrictions and authentication on every endpoint',
      'Inputs validated before they reach a model or database',
      'Personal data masked before it is logged or shared',
      'Handover notes on what runs where and who has access',
    ],
  },

  process: {
    kicker: 'PROCESS',
    title: 'From chore to running system',
    steps: [
      { title: 'Understand the chore', body: 'Who does it, how often and where the data lives. The work comes first, not the technology.' },
      { title: 'Prototype on your data', body: 'A working slice, usually on one app. Judge it early and change course cheaply.' },
      { title: 'Build and secure', body: 'The full build, with access, secrets and personal data handled before anything goes live.' },
      { title: 'Hand over', body: 'Documentation in two languages, a walkthrough and code you own. Optional care plan.' },
    ],
  },

  work: {
    kicker: 'WORK',
    title: 'Systems you can see running',
    body: 'Each has its own demo page. Your version is built for your apps and your data.',
    labels: {
      problem: 'Problem',
      built: 'What was built',
      outcome: 'Outcome',
      view: 'View demo',
      comingSoon: 'Demo coming soon',
      demoNote: 'A full walkthrough of this system is being prepared for this page.',
      back: 'Back to all work',
    },
    items: [
      {
        slug: 'ai-document-masking',
        title: 'AI document masking',
        problem: 'Forms were redacted by hand before leaving the team. Slow, and one missed field is a leak.',
        built: 'An AWS Bedrock workflow that detects names, addresses, phone and ID numbers, masks them and sends the result for review.',
        outcome: 'Staff approve masked documents instead of redacting every page themselves.',
        tags: ['AWS Bedrock', 'Security', 'kintone'],
      },
      {
        slug: 'kintone-backlog-sync',
        title: 'kintone and Backlog sync',
        problem: 'Requests were logged in kintone, then copied into Backlog by hand. The two drifted apart.',
        built: 'A webhook integration that creates Backlog issues from kintone records and syncs status and comments both ways.',
        outcome: 'One request, one record. Sales and development see the same status without asking each other.',
        tags: ['kintone', 'Backlog', 'Webhooks'],
      },
      {
        slug: 'kintone-chat-alerts',
        title: 'kintone change alerts to chat',
        problem: 'Key record changes were missed because nobody watches kintone all day.',
        built: 'Rules that post a short message to Chatwork, Slack or LINE WORKS when a chosen field changes or a deadline nears.',
        outcome: 'The right person hears about a change when it happens, in the chat tool they already use.',
        tags: ['kintone', 'Chatwork', 'Slack'],
      },
      {
        slug: 'kintone-daily-report',
        title: 'kintone daily report package',
        problem: 'Daily reports were long forms filled in from memory at the end of the day.',
        built: 'A kintone package with a calendar-style day view where staff drag time blocks to log their work.',
        outcome: 'Reports take minutes, and managers see the whole day at a glance.',
        tags: ['kintone', 'React', 'Package'],
      },
      {
        slug: 'kuroco-kintone-forms',
        title: 'Website inquiries into kintone',
        problem: 'Website inquiries arrived by email and were re-typed into kintone, sometimes days later.',
        built: 'A Kuroco form connection that validates each inquiry and saves it as a kintone record with an owner assigned.',
        outcome: 'Every inquiry lands in kintone at once. No copying, nothing lost in an inbox.',
        tags: ['Kuroco', 'kintone', 'Webhooks'],
      },
    ],
  },

  contact: {
    kicker: 'CONTACT',
    title: 'What chore is eating your team’s week?',
    body: 'Describe it in a sentence or two. You get an honest answer on how to fix it, and whether it is worth fixing.',
    cta: 'Send a message',
    languages: 'English, Japanese and Tagalog',
  },

  masking: {
    kicker: 'DEMO',
    title: 'AI document masking',
    body: 'Personal data is found and masked automatically. A person reviews the result before it is shared.',
    comingSoon: 'The full interactive demo is coming soon.',
    ask: 'Want this for your documents? Ask about the AI Document Workflow.',
    back: 'Back to home',
    link: { href: '/work/ai-document-masking/', label: 'Open the masking demo' },
    labels: {
      masked: 'MASKED',
      reveal: 'Click to show the original',
      hide: 'Click to mask again',
      hint: 'Click a masked field to compare it with the original.',
    },
    doc: {
      title: 'Service application form',
      status: '{n} items masked · Awaiting review',
      rows: [
        ['Applicant name', 'Taro Yamada', true],
        ['Address', '1-2-3 Sakae, Naka-ku, Nagoya, Aichi', true],
        ['Phone number', '090-1234-5678', true],
        ['Individual Number', '1234 5678 9012', true],
        ['Request', 'kintone setup support (3 apps)', false],
        ['Staff note', 'Send the quote at next week’s meeting', false],
      ],
    },
  },
};
