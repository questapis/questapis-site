export const faqGroups = [
  {
    title: "Starting the Academy",
    questions: [
      { question: "Do I need coding experience?", answer: "No. Starter Grove begins with programs, the internet, clients, servers, and data before asking you to read or write code." },
      { question: "How many quests are available?", answer: "Twenty-four interactive quests are available across eight complete courses: APIs, HTTP, JSON, endpoints, authentication, webhooks, debugging, and project planning. Each quest has five guided pages with reading, a field exercise, reflection, an interactive lab, and a knowledge check." },
      { question: "How long does the Academy take?", answer: "Each quest is designed for about 67 minutes of deliberate learning. Completing all 24 quests is roughly 27 hours, though you can pause between pages, repeat labs, and move at your own pace." },
      { question: "Is the Academy free?", answer: "The Explorer foundation is designed to include free beginner lessons and limited playground use. Final premium features and prices have not been announced." },
      { question: "Will I lose progress if I miss a day?", answer: "No. Streaks celebrate consistency without removing XP, gold, achievements, or completed lessons when you take a break." },
      { question: "Can I install QuestAPIs like an app?", answer: "Yes. On iPhone or iPad, open QuestAPIs in Safari, tap Share, then Add to Home Screen. On Android, open it in Chrome and choose Install app or Add to Home screen. Supported desktop browsers also offer an install button in the address bar or browser menu." },
      { question: "Are XP and gold real money?", answer: "No. Gold is earned virtual currency used only for learning rewards and cosmetics. It cannot be withdrawn or exchanged for cash." },
    ],
  },
  {
    title: "Using APIs",
    questions: [
      { question: "What is the Grove API?", answer: "It is a read-only development sandbox that lets learners make a real HTTP request and inspect a predictable JSON response. Its data is illustrative, not a production data source." },
      { question: "Where should I store an API key?", answer: "Store secret keys on your server or in a protected environment-variable system. Do not publish them in browser code, screenshots, repositories, or support messages." },
      { question: "Why did my request return 401?", answer: "A 401 response means the server could not verify the supplied API key. Confirm the x-api-key header, ensure the key has not been revoked, and never add extra spaces." },
      { question: "Are the Quest Engine and Player APIs live in v2?", answer: "No. They are planned Phase 2 products. The catalog clearly distinguishes the working Grove development sandbox from planned or legacy references." },
    ],
  },
  {
    title: "Accounts and billing",
    questions: [
      { question: "How is lesson progress saved?", answer: "After you sign in, the server validates a published lesson answer and asks the database to record the completion and one-time reward atomically. Refreshing or repeating the request cannot award the same lesson reward twice." },
      { question: "Can I reset my password?", answer: "Yes. Use Forgot password on the sign-in screen, then follow the secure link sent to your email to choose a new password." },
      { question: "Why did an email link not keep me signed in?", answer: "Verification links establish a session in the browser that opens them. QuestAPIs validates callback errors and preserves that session before continuing to onboarding. If you open the link on another device or browser, return to the original browser and sign in once with your verified account. The header checks the real account session rather than a saved explorer nickname." },
      { question: "Who sends account emails?", answer: "Account verification and password-recovery messages are delivered through the configured QuestAPIs authentication mail service using the branded support@questapis.dev sender." },
      { question: "Can I buy a premium plan now?", answer: "Not with real money yet. QuestAPIs has a Stripe sandbox checkout for testing the Adventurer subscription, invoices, usage billing, and account portal. Live purchasing stays disabled until pricing, tax registrations, and the complete payment flow are approved." },
      { question: "How does usage-based billing work?", answer: "An eligible Adventurer subscription records billable API requests on the server and sends them to Stripe with a stable event ID so retries cannot double-count usage. Your Stripe-hosted billing portal will show invoices and subscription controls once sandbox setup is complete." },
      { question: "Does buying a cosmetic affect API access?", answer: "No. Cosmetics use earned virtual gold. API and Academy premium access comes from separately verified plan entitlements or grants." },
      { question: "Can a cosmetic purchase use a price sent by my browser?", answer: "No. The database loads the published item price, locks your wallet during the transaction, checks ownership and balance, and commits the ledger, deduction, purchase, and inventory together." },
      { question: "What happens when I rotate an API key?", answer: "Create the replacement, update your server configuration, verify it, and then revoke the old key. Revoked keys fail immediately. Raw keys are shown once and cannot be recovered from the stored hash." },
    ],
  },
];
