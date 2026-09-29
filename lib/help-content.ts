export const faqGroups = [
  {
    title: "Starting the Academy",
    questions: [
      { question: "Do I need coding experience?", answer: "No. Starter Grove begins with programs, the internet, clients, servers, and data before asking you to read or write code." },
      { question: "How many quests are available?", answer: "Twenty-four interactive quests are available across eight complete courses: APIs, HTTP, JSON, endpoints, authentication, webhooks, debugging, and project planning. You can open any course, and signed-in learners can save each completion once." },
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
      { question: "Why did an email link not keep me signed in?", answer: "Verification links establish a session in the browser that opens them. QuestAPIs now validates callback errors and preserves that session before continuing to onboarding. If you open the link on another device or browser, return to the original browser and sign in once with your verified account." },
      { question: "Who sends account emails?", answer: "Account verification and password-recovery messages are delivered through the configured QuestAPIs authentication mail service. A branded support@questapis.dev sender is being prepared; until custom SMTP is connected and verified, messages may show the authentication provider's default sender." },
      { question: "Can I buy a premium plan now?", answer: "No. Final prices have not been set and QuestAPIs does not fake successful payments. Stripe will first be connected in test mode on staging." },
      { question: "Does buying a cosmetic affect API access?", answer: "No. Cosmetics use earned virtual gold. API and Academy premium access comes from separately verified plan entitlements or grants." },
      { question: "Can a cosmetic purchase use a price sent by my browser?", answer: "No. The database loads the published item price, locks your wallet during the transaction, checks ownership and balance, and commits the ledger, deduction, purchase, and inventory together." },
      { question: "What happens when I rotate an API key?", answer: "Create the replacement, update your server configuration, verify it, and then revoke the old key. Revoked keys fail immediately. Raw keys are shown once and cannot be recovered from the stored hash." },
    ],
  },
];
