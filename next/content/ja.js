// Japanese page content. Same shape as en.js.
export default {
  meta: {
    title: 'LenzLab | kintoneパッケージ開発・システム連携・セキュアなAI活用',
    description:
      'kintoneのパッケージ開発、Backlogなど各種サービスとのシステム連携、AWS Bedrockを使ったAI文書処理。お客様のAWS環境内で、設計から構築・セキュリティ対策・ドキュメント作成まで一人のエンジニアが責任を持って担当します。',
  },

  nav: {
    problems: '課題',
    services: 'サービス',
    integrations: '連携',
    work: '事例',
    contact: 'お問い合わせ',
  },

  hero: {
    kicker: 'LenzLab · kintone・システム連携・AI活用',
    prefix: '',
    suffix: 'を、やめる。',
    pains: [
      '同じデータの二重入力',
      '手作業の黒塗り',
      '毎週のCSV出力',
      'チャットでの進捗確認',
    ],
    resolve: '自動化して、データは自社の手元に。',
    intro:
      '手作業は時間を奪い、ミスを招きます。kintoneパッケージ、システム連携、AIワークフローでその作業をなくします。ご相談から引き渡しまで一貫して対応します。',
    ctaPrimary: 'お悩みを相談する',
    ctaSecondary: '動作例を見る',
  },

  pains: {
    kicker: '課題',
    title: 'チームの時間は、ここで失われています',
    body: 'どれも毎週の時間を奪い、ミスの原因になる作業です。そして一度仕組みを作れば、自動で回り続けます。',
    painLabel: '課題',
    fixLabel: '解決策',
    items: [
      {
        id: 'retype',
        tag: 'システム連携',
        pain: '一人の顧客情報を、kintone、Backlog、メール、会計ソフトに個別入力。4つの写しが、それぞれ食い違います。',
        fix: '入力は一度だけ。他のシステムは自動で更新され、同期に失敗したときは通知が届きます。',
        link: { href: '/work/kintone-backlog-sync/', label: 'kintoneとBacklogの連携を見る' },
      },
      {
        id: 'masking',
        tag: 'AIマスキング',
        pain: '氏名・住所・番号の黒塗りに何時間も。一箇所の見落としが、そのまま情報漏えいになります。',
        fix: 'AIが個人情報を検出してマスク。担当者は作業ではなく、結果の確認に専念できます。',
        link: { href: '/work/ai-document-masking/', label: 'マスキングのデモを見る' },
      },
      {
        id: 'kintone',
        tag: 'kintone',
        pain: 'スクリプトを継ぎ足してきたkintoneアプリ。変更のたびに、どこかが壊れる不安があります。',
        fix: 'バージョン管理・テスト・ドキュメントを備えた一つのパッケージに。全アプリへ一度で導入できます。',
        link: { href: '/work/kintone-daily-report/', label: 'kintoneパッケージの例を見る' },
      },
      {
        id: 'status',
        tag: '通知',
        pain: '重要なレコードの変更に、顧客からの問い合わせや期限切れで初めて気づきます。',
        fix: 'レコードが変わった瞬間、担当者にSlack・Chatwork・LINE WORKSで通知が届きます。',
        link: { href: '/work/kintone-chat-alerts/', label: 'チャット通知を見る' },
      },
      {
        id: 'ai-risk',
        tag: 'セキュアなAI',
        pain: 'AIは使いたい。でも顧客データを公開型のAIチャットに貼り付けるリスクは負えません。',
        fix: 'AIモデルはお客様自身のAWS環境上のAWS Bedrockで動作。プロンプトも文書も外部に出ません。',
      },
    ],
  },

  difference: {
    kicker: '選ばれる理由',
    title: 'ご相談を受けた本人が、そのまま開発します。',
    body: '営業担当も下請けも挟みません。一人のエンジニアが構築・セキュリティ対策・ドキュメント作成まで担当します。',
    points: [
      {
        title: 'まずは動く試作品から',
        body: '本開発の前に、実際のデータで動く一部をご確認いただけます。資料ではなく、結果で判断してください。',
      },
      {
        title: 'すべての納品にセキュリティ資料',
        body: '誰が何にアクセスできるか、認証情報の保管場所、記録される内容を1枚にまとめてお渡しします。',
      },
      {
        title: '日本語・英語の両方で文書化',
        body: '国内のスタッフにも海外の同僚にも読める引き継ぎ資料をご用意します。ソースコードはお客様のものです。',
      },
      {
        title: '範囲も価格も、事前に確定',
        body: '成果物ひとつに見積もりひとつ。社内稟議が通しやすく、想定外の請求もありません。',
      },
    ],
  },

  services: {
    kicker: 'サービス',
    title: '範囲を決めて、見積もりは一回。',
    body: 'まずは業務診断から。見当違いのものに費用をかけることはありません。各開発には月額の保守プランも追加できます。',
    items: [
      {
        id: 'audit',
        name: '業務診断',
        forWho: 'ムダな作業があるのは分かっているが、何を作ればよいか決めかねている方に。',
        outcome: '対象業務ひとつの改善計画書、確定見積もり、セキュリティ上のリスクを明文化してお渡しします。',
        includes: [
          '実際に作業する方へのヒアリング',
          '現状の業務フローとデータの整理',
          '改善策のご提案と確定見積もり',
          '開発へ進む場合、診断費用を充当',
        ],
        price: '50,000円〜',
        confirm: true,
      },
      {
        id: 'kintone',
        name: 'kintoneパッケージ開発',
        forWho: 'kintoneのスクリプトの変更や他アプリへの展開に不安がある方に。',
        outcome: '安心して導入・設定・更新できるプラグイン、または複数アプリ構成のパッケージ。',
        includes: [
          '設定画面付きのプラグイン',
          'カスタムビュー・フォーム',
          '既存JavaScriptの再構築',
          'テスト・更新履歴・導入手順書',
        ],
        price: '300,000円〜',
        confirm: true,
      },
      {
        id: 'integration',
        name: 'システム連携開発',
        forWho: 'kintone、Backlog、チャット、会計ソフト、Webサイトの間でデータを手作業で転記している方に。',
        outcome: 'システム同士が自動で更新し合い、失敗時は再試行と通知で確実に対応します。',
        includes: [
          'WebhookとAPIによる接続',
          '定期実行またはリアルタイム同期',
          'AWS上のサーバーレス構成',
          '障害通知と読みやすいログ',
        ],
        price: '200,000円〜',
        confirm: true,
      },
      {
        id: 'ai',
        name: 'AI文書処理ワークフロー',
        forWho: '個人情報を扱う方、文書の読み取りや確認に多くの時間を割いている方に。',
        outcome: 'お客様のAWS環境内でAIがマスキングやデータ抽出を実施。結果はすべて担当者が承認します。',
        includes: [
          '個人情報のマスキング',
          'kintoneレコードへのデータ抽出',
          'お客様自身のAWS環境でAWS Bedrockを利用',
          '人による確認工程を標準装備',
        ],
        price: '400,000円〜',
        confirm: true,
      },
    ],
  },

  integrations: {
    kicker: '連携',
    title: '入力は一度。すべてのツールに行き渡る。',
    body: '中心はkintone。APIやWebhookを備えたサービスなら接続できます。ツールを選ぶと、できることが表示されます。',
    hub: 'kintone',
    hint: 'ツールにカーソルを合わせるか、タップしてください。',
    nodes: [
      {
        id: 'backlog',
        name: 'Backlog',
        category: 'プロジェクト管理',
        example: 'kintoneのレコードからBacklogの課題を作成し、状態を自動で同期します。',
      },
      {
        id: 'bedrock',
        name: 'AWS Bedrock',
        category: 'AI',
        example: '文書のマスキング、要約、項目への読み取り。データはお客様のAWS環境内にとどまります。',
      },
      {
        id: 'elevenlabs',
        name: 'ElevenLabs',
        category: '音声',
        example: 'レコードの内容から、お知らせや案内メッセージなどの自然な音声を生成します。',
      },
      {
        id: 'kuroco',
        name: 'Kuroco',
        category: 'Webサイト・CMS',
        example: 'Webサイトの問い合わせをkintoneへ直接登録し、kintoneのデータをサイトに公開します。',
      },
      {
        id: 'webhooks',
        name: 'Webhook・API',
        category: 'その他のサービス',
        example: 'Webhookを送受信できるツールなら、検証と再試行の仕組み付きで接続します。',
      },
      {
        id: 'slack',
        name: 'Slack',
        category: 'チャット',
        example: 'レコードの作成・変更・期限超過時に、適切なチャンネルへ短いメッセージを送ります。',
      },
      {
        id: 'chatwork',
        name: 'Chatwork',
        category: 'チャット',
        example: 'レコードの変更や承認依頼を、該当するグループチャットに投稿します。',
      },
      {
        id: 'lineworks',
        name: 'LINE WORKS',
        category: 'チャット',
        example: '現場のスタッフは、kintoneにログインしなくてもスマートフォンで通知を受け取れます。',
      },
      {
        id: 'google',
        name: 'Google Workspace',
        category: 'オフィスツール',
        example: 'カレンダーの予定、スプレッドシート、ドライブのファイルをkintoneのレコードと同期します。',
      },
      {
        id: 'freee',
        name: 'freee',
        category: '会計',
        example: 'kintoneの請求書や案件情報を、再入力なしで会計に連携します。',
      },
      {
        id: 'aws',
        name: 'AWS',
        category: 'ホスティング',
        example: '連携はAWSのサーバーレス環境で動作。お客様側でサーバーを管理する必要はありません。',
      },
    ],
  },

  pipeline: {
    kicker: 'セキュアなAI',
    title: '顧客データは、お客様のAWS環境から出ません',
    body: 'kintoneのレコードは、お客様自身のAWS環境内で検証・処理され、担当者の承認のためにkintoneへ戻ります。',
    steps: [
      { id: 'in', label: 'kintone', sub: 'レコード・ファイル', detail: '担当者がいつもどおりkintoneでレコードを保存、またはファイルをアップロードします。' },
      { id: 'api', label: 'API Gateway・Lambda', sub: '認証と入力検証', aws: true, detail: '処理の前に、リクエストの認証と内容の検証を行います。' },
      { id: 'bedrock', label: 'AWS Bedrock', sub: 'お客様の環境・指定リージョン', aws: true, detail: 'AIモデルはお客様自身のAWS環境で動作。データが学習に使われることはありません。' },
      { id: 'out', label: 'kintoneで確認', sub: '担当者が承認', detail: '結果はkintoneに戻り、担当者が承認してから利用されます。' },
    ],
    hint: 'スクロールするとレコードが流れます。',
    boundaryLabel: 'お客様のAWS環境',
  },

  security: {
    kicker: 'セキュリティ',
    title: '多くの開発会社が省く、基本の対策',
    body: 'トークンが一つ漏れるだけで、全アプリが危険にさらされます。全案件で確認し、引き渡し時に分かりやすくご説明します。',
    checks: [
      'APIトークンは必要なアプリと操作だけに限定',
      '認証情報はサーバー側で管理し、ブラウザに置かない',
      'すべての接続口にIP制限と認証を設定',
      'AIやデータベースに渡す前に入力を検証',
      'ログ記録や共有の前に個人情報をマスク',
      '何がどこで動き、誰がアクセスできるかを文書化',
    ],
  },

  process: {
    kicker: '進め方',
    title: '手作業から、動く仕組みへ',
    steps: [
      { title: '業務を理解する', body: '誰が、どのくらいの頻度で、どのデータを扱うのか。技術より先に、業務を把握します。' },
      { title: '実データで試作', body: '多くの場合、一つのアプリで動く部分を作成。早い段階で判断でき、方向転換も低コストです。' },
      { title: '構築とセキュリティ対策', body: '本開発では、権限・認証情報・個人情報の扱いを本番稼働前に確実に整えます。' },
      { title: '引き渡し', body: '日英2言語のドキュメント、操作説明、お客様が所有するソースコード。保守プランも選べます。' },
    ],
  },

  work: {
    kicker: '事例',
    title: '実際に動く仕組みをご覧ください',
    body: 'それぞれにデモページがあります。実際の導入は、お客様のアプリとデータに合わせて構築します。',
    labels: {
      problem: '課題',
      built: '構築内容',
      outcome: '成果',
      view: 'デモを見る',
      comingSoon: 'デモ準備中',
      demoNote: 'この仕組みの詳しい紹介を、本ページで準備しています。',
      back: '事例一覧に戻る',
    },
    items: [
      {
        slug: 'ai-document-masking',
        title: 'AIによる文書マスキング',
        problem: '社外に出す前の書類を手作業で黒塗り。時間がかかり、一箇所の見落としが情報漏えいに直結していました。',
        built: 'AWS Bedrockで氏名・住所・電話番号・各種番号を検出してマスクし、確認待ちとして回すワークフロー。',
        outcome: '担当者は全ページを黒塗りする代わりに、マスク済みの文書を承認するだけになりました。',
        tags: ['AWS Bedrock', 'セキュリティ', 'kintone'],
      },
      {
        slug: 'kintone-backlog-sync',
        title: 'kintoneとBacklogの連携',
        problem: 'kintoneで受けた依頼をBacklogへ手作業で転記。二つの内容が次第にずれていました。',
        built: 'kintoneのレコードからBacklogの課題を作成し、状態とコメントを双方向に同期するWebhook連携。',
        outcome: '一つの依頼に、一つの記録。営業と開発が問い合わせ合わずに同じ状況を把握できます。',
        tags: ['kintone', 'Backlog', 'Webhook'],
      },
      {
        slug: 'kintone-chat-alerts',
        title: 'kintoneの変更をチャットに通知',
        problem: '一日中kintoneを見ている人はおらず、重要なレコードの変更が見逃されていました。',
        built: '指定した項目の変更や期限の接近を検知し、Chatwork・Slack・LINE WORKSに短く通知するルール。',
        outcome: '変更が起きたその時に、普段使っているチャットで担当者に届きます。',
        tags: ['kintone', 'Chatwork', 'Slack'],
      },
      {
        slug: 'kintone-daily-report',
        title: 'kintone日報パッケージ',
        problem: '日報は終業時に記憶を頼りに書く、長い入力フォームでした。',
        built: 'カレンダー形式の画面で、時間帯をドラッグして作業を記録できるkintoneパッケージ。',
        outcome: '日報は数分で完了。管理者は一日の動きをひと目で把握できます。',
        tags: ['kintone', 'React', 'パッケージ'],
      },
      {
        slug: 'kuroco-kintone-forms',
        title: 'Webサイトの問い合わせをkintoneへ',
        problem: 'サイトからの問い合わせはメールで届き、数日後にkintoneへ再入力されることもありました。',
        built: 'Kurocoのフォームと連携し、問い合わせを検証して担当者付きのkintoneレコードとして登録する仕組み。',
        outcome: 'すべての問い合わせが即座にkintoneへ。転記も、受信箱での埋もれもありません。',
        tags: ['Kuroco', 'kintone', 'Webhook'],
      },
    ],
  },

  contact: {
    kicker: 'お問い合わせ',
    title: 'チームの時間を奪っている作業は何ですか？',
    body: '一言、二言でお聞かせください。解決方法と、そもそも解決する価値があるかを率直にお答えします。',
    cta: 'メッセージを送る',
    languages: '日本語・英語・タガログ語に対応',
  },

  masking: {
    kicker: 'デモ',
    title: 'AIによる文書マスキング',
    body: '個人情報を自動で検出してマスクします。共有前に、担当者が結果を確認します。',
    comingSoon: '操作できるデモは近日公開予定です。',
    ask: 'お手元の書類にも導入しませんか？AI文書処理ワークフローについてお気軽にご相談ください。',
    back: 'ホームに戻る',
    link: { href: '/work/ai-document-masking/', label: 'マスキングのデモを開く' },
    labels: {
      masked: 'マスク済',
      reveal: 'クリックで元の内容を表示',
      hide: 'クリックで再びマスク',
      hint: 'マスクされた項目をクリックすると、元の内容と比較できます。',
    },
    doc: {
      title: 'サービス申込書',
      status: '{n}件をマスク済 · 確認待ち',
      rows: [
        ['氏名', '山田 太郎', true],
        ['住所', '愛知県名古屋市中区栄1-2-3', true],
        ['電話番号', '090-1234-5678', true],
        ['マイナンバー', '1234 5678 9012', true],
        ['ご依頼内容', 'kintone導入支援（3アプリ）', false],
        ['担当者メモ', '来週の打ち合わせで見積書を送付', false],
      ],
    },
  },
};
