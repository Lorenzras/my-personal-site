// English page content.
export default {
  meta: {
    themeToggle: 'Switch light or dark theme',
    title: 'LenzLab | System integration, business apps and secure AI',
    description:
      'Connect Backlog, kintone, chat, accounting, your website and AI so data moves on its own. Built, secured and documented by one engineer in Japan.',
  },

  nav: {
    problems: 'Problems',
    services: 'Services',
    integrations: 'Integrations',
    work: 'Examples',
    contact: 'Contact',
  },

  hero: {
    kicker: 'LENZLAB · SYSTEM INTEGRATION · BUSINESS APPS · SECURE AI',
    prefix: 'Stop',
    suffix: '',
    pains: [
      'typing the same data twice',
      'redacting documents by hand',
      'exporting CSVs every Friday',
      'chasing status in chat',
    ],
    resolve: 'Automate it. Keep your data secure.',
    stateToday: 'By hand today',
    stateFixed: 'Automated',
    intro:
      'Your tools don’t talk to each other, so your staff do the copying. I connect Backlog, kintone, chat, accounting, your website and AI, so data is entered once and moves on its own, with security planned in from the start.',
    ctaPrimary: 'Tell me the problem',
    ctaSecondary: 'See examples',
  },

  pains: {
    kicker: 'THE PROBLEM',
    title: 'Where your team’s hours go',
    body: 'Each of these costs time every week and creates errors. Each has a fix that runs on its own once built.',
    stateToday: 'Today',
    stateFixed: 'With automation',
    items: [
      {
        id: 'retype',
        tag: 'Integration',
        pain: 'One customer is typed into kintone, Backlog, email and accounting. Four copies, four versions.',
        fix: 'Enter it once. The other systems update themselves, and you get an alert if a sync fails.',
        stat: { label: 'Example: entries per customer', from: '4', to: '1' },
        link: { href: '/work/kintone-backlog-sync/', label: 'See the sales and development sync' },
      },
      {
        id: 'status',
        tag: 'Notifications',
        pain: 'Important updates go unnoticed until a customer asks or a deadline passes.',
        fix: 'The right person can get a message in Slack, Chatwork, LINE WORKS or another chat tool the moment something changes in Backlog, kintone or any connected tool.',
        link: { href: '/work/kintone-chat-alerts/', label: 'See the chat alerts' },
      },
      {
        id: 'masking',
        tag: 'AI masking',
        pain: 'Staff spend hours blacking out names, addresses and ID numbers. One missed field is a data leak.',
        fix: 'AI flags and masks likely personal data. Your staff check and correct the result instead of redacting every page.',
        link: { href: '/work/ai-document-masking/', label: 'See the masking demo' },
      },
      {
        id: 'ai-risk',
        tag: 'Secure AI',
        pain: 'You want AI, but pasting customer data into a public chatbot is a risk you cannot take.',
        fix: 'AI runs on AWS Bedrock in the AWS region you choose. AWS states that Bedrock does not use your prompts or outputs to train models, or share them with model providers.',
      },
      {
        id: 'kintone',
        tag: 'Business apps',
        pain: 'Your business apps grew one script at a time. Now every change risks breaking something.',
        fix: 'Rebuilt as one tested, documented package, such as a kintone plugin. Upload it once, then add it to each app from settings. No copying scripts.',
        link: { href: '/work/kintone-daily-report/', label: 'See a business app package' },
      },
    ],
  },

  difference: {
    kicker: 'WHY LENZLAB',
    title: 'The engineer you brief builds it, secures it and documents it.',
    body: 'You talk directly to the engineer who builds it. AI-assisted development lets one engineer put a working prototype in front of you quickly. Every system is documented, so your team or another engineer can maintain it.',
    points: [
      {
        title: 'A working prototype first',
        body: 'See a slice running on your real data before you commit to the full build. Judge results, not slides.',
      },
      {
        title: 'Security notes at handover',
        body: 'Plain-language notes on who can access what, where secrets are stored and what is logged.',
      },
      {
        title: 'Documentation in English or Japanese, or both',
        body: 'Handover notes your Japanese staff and overseas colleagues can read. Code ownership is set out in the contract.',
      },
      {
        title: 'One contact from start to finish',
        body: 'The person you brief is the person who builds, tests and supports the system. Nothing gets lost in hand-offs.',
      },
    ],
  },

  services: {
    kicker: 'SERVICES',
    title: 'Start small. Decide with evidence.',
    body: 'Start with a first conversation and a short audit, so you see the plan and the cost before paying for a build. Scope and quote are agreed before work begins. Ongoing support is available after handover.',
    items: [
      {
        id: 'audit',
        name: 'Workflow Audit',
        forWho: 'Teams who know a task wastes time but not what to build.',
        outcome: 'A written plan for one workflow, a clear quote and the security risks spelled out.',
        includes: [
          'Interview with the people doing the work',
          'Map of the current process and data',
          'Recommended fix and quote',
          'Security risks in plain words',
        ],
      },
      {
        id: 'integration',
        name: 'Integration Build',
        forWho: 'Teams copying data by hand between Backlog, kintone, chat, accounting, their website or any SaaS.',
        outcome: 'Systems that update each other, with retries and alerts when something fails.',
        includes: [
          'Backlog, kintone, Kuroco, freee, ElevenLabs and more',
          'Webhooks and REST API connections',
          'Scheduled or real-time sync on serverless AWS',
          'Failure alerts and readable logs',
        ],
      },
      {
        id: 'ai',
        name: 'AI Document Workflow',
        forWho: 'Teams handling personal data or spending hours reading and checking documents.',
        outcome: 'AI that masks or extracts data on AWS Bedrock in the region you choose. A person approves every result.',
        includes: [
          'Personal data masking',
          'Data extraction into your business system',
          'AWS Bedrock in your chosen region',
          'Human review step built in',
        ],
      },
      {
        id: 'kintone',
        name: 'Business App and kintone Package',
        forWho: 'Teams whose custom scripts and apps are risky to change or copy.',
        outcome: 'A plugin or multi-app package you can install, configure and update without fear.',
        includes: [
          'Plugin with a settings screen',
          'Custom views and forms',
          'Rebuild of legacy JavaScript',
          'Tests, version history and install guide',
        ],
      },
    ],
  },

  integrations: {
    kicker: 'INTEGRATIONS',
    title: 'Enter it once. Every tool knows.',
    body: 'Keep the tools your team already uses. I connect them so data moves on its own. Most tools with an API or webhook can join.',
    hub: 'Your business',
    hint: 'Hover over or tap a tool.',
    nodes: [
      {
        id: 'backlog',
        name: 'Backlog',
        category: 'Project management',
        example: 'Backlog issues created from requests in other systems, with status synced back automatically.',
      },
      {
        id: 'slack',
        name: 'Slack',
        category: 'Chat',
        example: 'A short message to the right channel when a record is created, changed or overdue.',
      },
      {
        id: 'bedrock',
        name: 'AWS Bedrock',
        category: 'AI',
        example: 'Documents masked, summarized or read into fields, in the AWS region you choose.',
      },
      {
        id: 'freee',
        name: 'freee',
        category: 'Accounting',
        example: 'Invoices and deals sent to accounting without re-typing.',
      },
      {
        id: 'chatwork',
        name: 'Chatwork',
        category: 'Chat',
        example: 'Record changes and approval requests posted to the right group chat.',
      },
      {
        id: 'kuroco',
        name: 'Kuroco',
        category: 'Website and CMS',
        example: 'Website inquiries saved straight into your database, and your data published to your site.',
      },
      {
        id: 'kintone',
        name: 'kintone',
        category: 'Business apps',
        example: 'Packages, plugins and custom views, and kintone data shared with every other tool here.',
      },
      {
        id: 'elevenlabs',
        name: 'ElevenLabs',
        category: 'Voice',
        example: 'Natural voice audio generated from records, such as announcements or guidance messages.',
      },
      {
        id: 'lineworks',
        name: 'LINE WORKS',
        category: 'Chat',
        example: 'Field staff notified on their phones without logging in to another system.',
      },
      {
        id: 'google',
        name: 'Google Workspace',
        category: 'Office',
        example: 'Calendar events, Sheets and Drive files kept in step with your business records.',
      },
      {
        id: 'webhooks',
        name: 'Webhooks and REST APIs',
        category: 'Any service',
        example: 'Any tool that sends or accepts webhooks, connected with validation and retries.',
      },
      {
        id: 'aws',
        name: 'AWS',
        category: 'Hosting',
        example: 'Integrations run on serverless AWS, so there are no servers to patch. Updates are covered by ongoing support.',
      },
    ],
  },

  pipeline: {
    kicker: 'SECURE AI',
    title: 'Customer data is processed in the AWS region you choose',
    body: 'A document enters from your system, is checked and processed on AWS in the region you choose, and returns for a person to approve.',
    steps: [
      { id: 'in', label: 'Your system', sub: 'kintone, form or upload', detail: 'A staff member saves a record, submits a form or uploads a file as usual.' },
      { id: 'api', label: 'API Gateway and Lambda', sub: 'Authentication and validation', aws: true, detail: 'The request is authenticated and checked before anything is processed.' },
      { id: 'bedrock', label: 'AWS Bedrock', sub: 'Your chosen region', aws: true, detail: 'The model runs through AWS Bedrock in the AWS region you choose. AWS states that Bedrock does not use your prompts or outputs to train models, or share them with model providers.' },
      { id: 'out', label: 'Human review', sub: 'A person approves', detail: 'The result returns to your system. A person approves it before it is used.' },
    ],
    hint: 'Scroll to send a document through.',
    chip: 'Document',
    boundaryLabel: 'AWS (your chosen region)',
  },

  security: {
    kicker: 'SECURITY',
    title: 'Security basics, planned in from the start',
    body: 'Most leaks start small: a token with too much access, a key left in the code. These are the basics I set up and explain in plain words at handover. The exact setup depends on your tools and AWS account.',
    checks: [
      'API tokens and AWS roles limited to the apps and actions they need',
      'Secrets kept in AWS Secrets Manager, not in code or browser JavaScript',
      'Incoming requests checked with a token, signature or IP allowlist, depending on what each service supports',
      'Personal data kept out of logs, and out of AI prompts when the task does not need it',
      'AI processing in the AWS region you choose, with access logs of who called what',
      'A person reviews AI results before they are used',
    ],
  },

  process: {
    kicker: 'PROCESS',
    title: 'From manual task to running system',
    steps: [
      { title: 'Understand the task', body: 'Who does it, how often and where the data lives. The work comes first, not the technology.' },
      { title: 'Prototype on your data', body: 'A working slice, usually on one workflow. Judge it early and change course cheaply.' },
      { title: 'Build and secure', body: 'The full build, with access, secrets and personal data handled before anything goes live.' },
      { title: 'Hand over', body: 'Documentation in English or Japanese, or both, and a walkthrough. Code ownership is set out in the contract. Ongoing support available.' },
    ],
  },

  work: {
    kicker: 'EXAMPLES',
    title: 'What these systems look like',
    body: 'Each example has its own page. Your version is built around your tools and your data.',
    labels: {
      problem: 'Common problem',
      built: 'What this does',
      outcome: 'What changes',
      view: 'View details',
      comingSoon: 'Demo coming soon',
      demoNote: 'A full walkthrough of this system is being prepared for this page.',
      back: 'Back to all examples',
    },
    items: [
      {
        slug: 'ai-document-masking',
        title: 'AI document masking',
        problem: 'Documents are redacted by hand before they leave the team. It is slow, and one missed field is a leak.',
        built: 'An AWS Bedrock workflow flags likely names, addresses, phone and ID numbers, masks them and sends the result for review.',
        outcome: 'Staff review and approve masked documents instead of redacting every page.',
        tags: ['AWS Bedrock', 'PII masking', 'Human review'],
      },
      {
        slug: 'kintone-backlog-sync',
        title: 'Requests synced between sales and development',
        problem: 'Requests are logged in one system, then copied into Backlog by hand. The two drift apart.',
        built: 'A webhook integration creates Backlog issues from incoming requests and syncs status and comments both ways.',
        outcome: 'One request, one record. Sales and development see the same status without asking each other.',
        tags: ['Backlog', 'kintone', 'Webhooks'],
      },
      {
        slug: 'kintone-chat-alerts',
        title: 'Instant alerts in your team chat',
        problem: 'Important changes are missed because nobody watches every system all day.',
        built: 'Rules can post a short message to Chatwork, Slack or LINE WORKS when a chosen field changes or a deadline nears.',
        outcome: 'The right person hears about a change when it happens, in the chat tool they already use.',
        tags: ['Chatwork', 'Slack', 'LINE WORKS'],
      },
      {
        slug: 'kintone-daily-report',
        title: 'Daily reports in minutes',
        problem: 'Daily reports are long forms filled in from memory at the end of the day.',
        built: 'A business app package with a calendar-style day view where staff drag time blocks to log their work.',
        outcome: 'Reports take minutes, and managers see the whole day at a glance.',
        tags: ['kintone', 'React', 'Package'],
      },
      {
        slug: 'kuroco-kintone-forms',
        title: 'Website inquiries straight into your database',
        problem: 'Website inquiries arrive by email and are re-typed by hand, sometimes days later.',
        built: 'A Kuroco form connection validates each inquiry and saves it as a record with an owner assigned.',
        outcome: 'Every inquiry is recorded at once. No copying, nothing lost in an inbox.',
        tags: ['Kuroco', 'kintone', 'Webhooks'],
      },
    ],
  },

  contact: {
    kicker: 'CONTACT',
    title: 'What task is eating your team’s week?',
    body: 'Describe it in a sentence or two. You get an honest answer on how to fix it, and whether it is worth fixing.',
    cta: 'Send a message',
    languages: 'English and Japanese',
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
        ['Request', 'Order system integration (2 systems)', false],
        ['Staff note', 'Send the quote at next week’s meeting', false],
      ],
    },
  },
};
