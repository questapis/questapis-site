export type LearningQuest = {
  slug: string;
  courseSlug: string;
  name: string;
  topic: string;
  description: string;
  title: string;
  duration: string;
  conceptTitle: string;
  paragraphs: string[];
  request: string;
  response: Record<string, unknown>;
  responseNote: string;
  question: string;
  answers: [string, string];
  correctAnswer: 0 | 1;
  answerKey: string;
  explanation: string;
  rewardKey: string;
  x: number;
  y: number;
};

export const regions: LearningQuest[] = [
  {
    slug: "what-is-an-api", courseSlug: "api-basics", name: "Starter Grove", topic: "The internet and APIs",
    description: "Discover how apps ask each other for information, then try a simulated request.", title: "What is an API?", duration: "5 minutes",
    conceptTitle: "A way for apps to talk.",
    paragraphs: ["An API is a set of rules that lets one piece of software ask another for information or an action.", "A weather app sends a request to a weather service. The service sends a response containing the forecast.", "The app turns that data into something useful, such as a reminder to bring a jacket."],
    request: "/example/weather?place=starter-grove", response: { place: "Starter Grove", weather: "Clear skies", temperatureC: 18 }, responseNote: "The response is JSON: labels paired with values.",
    question: "In the weather example, what is the response?", answers: ["The app asking for the forecast", "The weather data sent back by the service"], correctAnswer: 1, answerKey: "weather-data", explanation: "The request asks; the response brings information back.", rewardKey: "starter-grove.intro", x: 16, y: 76,
  },
  {
    slug: "request-response-cycle", courseSlug: "http-foundations", name: "Forest of Requests", topic: "Requests, responses, and HTTP",
    description: "Learn what goes into a request, what comes back, and how HTTP methods describe an action.", title: "The request-response cycle", duration: "6 minutes",
    conceptTitle: "Every request has a job.",
    paragraphs: ["An HTTP method describes what a client wants to do. GET asks to read information; POST usually asks to create something.", "A request can include a URL, headers, and a body. The server reads those pieces and returns a response.", "Choosing the right method makes an API easier to understand and safer to use."],
    request: "/example/creatures/42", response: { id: 42, name: "Moss Fox", habitat: "request-forest" }, responseNote: "GET reads a resource without asking the server to create one.",
    question: "Which HTTP method is normally used to read information?", answers: ["GET", "POST"], correctAnswer: 0, answerKey: "get", explanation: "GET requests retrieve information; POST requests commonly create it.", rewardKey: "request-forest.cycle", x: 35, y: 60,
  },
  {
    slug: "reading-json", courseSlug: "json-essentials", name: "JSON Jungle", topic: "Reading structured data",
    description: "Find your way through objects, arrays, and the small pieces of data that make up a response.", title: "Read a JSON response", duration: "7 minutes",
    conceptTitle: "Data with a predictable shape.",
    paragraphs: ["JSON represents information with objects, arrays, labels, and values.", "Objects use curly braces. Arrays use square brackets and contain a list of values.", "You can follow a label such as name or skills to find the exact value your app needs."],
    request: "/example/explorer", response: { name: "Nova", level: 3, skills: ["requests", "json"] }, responseNote: "skills is an array because it holds more than one value.",
    question: "Which field in the example is an array?", answers: ["name", "skills"], correctAnswer: 1, answerKey: "skills-array", explanation: "skills uses square brackets and contains a list of values.", rewardKey: "json-jungle.reading", x: 17, y: 39,
  },
  {
    slug: "urls-and-parameters", courseSlug: "endpoint-navigation", name: "Endpoint Valley", topic: "URLs and parameters",
    description: "Learn where a request goes and how parameters help you ask for the information you need.", title: "Navigate an endpoint", duration: "7 minutes",
    conceptTitle: "A precise address for data.",
    paragraphs: ["An endpoint is a URL where an API accepts a particular kind of request.", "Path parameters identify a resource, while query parameters refine a request after a question mark.", "Readable endpoint names help developers predict where information lives."],
    request: "/example/quests?difficulty=beginner", response: { count: 2, difficulty: "beginner", quests: ["First Call", "JSON Trail"] }, responseNote: "difficulty is a query parameter that filters the result.",
    question: "What does ?difficulty=beginner do here?", answers: ["Filters the quests", "Changes the HTTP method"], correctAnswer: 0, answerKey: "filters-results", explanation: "A query parameter narrows or changes the information requested.", rewardKey: "endpoint-valley.parameters", x: 39, y: 22,
  },
  {
    slug: "protecting-api-keys", courseSlug: "authentication-safety", name: "Auth Mountain", topic: "API keys and authentication",
    description: "Understand how applications identify themselves and why keys need to stay protected.", title: "Protect an API key", duration: "8 minutes",
    conceptTitle: "A credential, not a decoration.",
    paragraphs: ["An API key helps a service identify the application making a request.", "Secret keys belong in protected server-side configuration, not public browser code or repositories.", "If a key leaks, rotate it: create a replacement, update the application, then revoke the old key."],
    request: "/example/private-profile", response: { status: 401, error: "Missing API key" }, responseNote: "A 401 response means the request could not be authenticated.",
    question: "Where should a secret API key be stored?", answers: ["In public browser code", "In protected server configuration"], correctAnswer: 1, answerKey: "server-secret", explanation: "Server-side secrets are kept away from visitors and public source code.", rewardKey: "auth-mountain.keys", x: 60, y: 16,
  },
  {
    slug: "webhook-events", courseSlug: "event-automation", name: "Webhook Woods", topic: "Events and automation",
    description: "Explore how one application can notify another when something happens.", title: "Listen for a webhook", duration: "7 minutes",
    conceptTitle: "Let the event come to you.",
    paragraphs: ["Polling repeatedly asks whether something changed. A webhook sends a message when the change happens.", "The receiving application exposes an endpoint and verifies that each event came from the expected sender.", "Fast acknowledgement and safe retry handling make webhook systems reliable."],
    request: "/example/webhooks/quest-completed", response: { event: "quest.completed", questId: "q_104", delivered: true }, responseNote: "The event name tells the receiver what happened.",
    question: "When is a webhook normally sent?", answers: ["When a subscribed event happens", "Only when a user refreshes the page"], correctAnswer: 0, answerKey: "event-happens", explanation: "Webhooks push a message when an event occurs.", rewardKey: "webhook-woods.events", x: 79, y: 35,
  },
  {
    slug: "debugging-status-codes", courseSlug: "error-debugging", name: "Dungeon of Errors", topic: "Status codes and debugging",
    description: "Turn an unexpected response into useful clues by reading status codes and error details.", title: "Decode a failed request", duration: "8 minutes",
    conceptTitle: "Errors are clues.",
    paragraphs: ["Status codes summarize what happened: 2xx succeeded, 4xx points to the request, and 5xx points to the server.", "Read the response body before changing code; useful APIs return a human-readable message or error code.", "Change one thing at a time and keep the request ID when contacting support."],
    request: "/example/quests/missing-quest", response: { status: 404, code: "NOT_FOUND", message: "Quest does not exist" }, responseNote: "404 says the requested resource was not found.",
    question: "What does a 404 response usually mean?", answers: ["The resource was not found", "The request succeeded"], correctAnswer: 0, answerKey: "not-found", explanation: "A 404 means the requested resource was not found.", rewardKey: "error-dungeon.status", x: 62, y: 57,
  },
  {
    slug: "build-an-api-plan", courseSlug: "project-workshop", name: "Developer Citadel", topic: "Projects and challenges",
    description: "Bring the pieces together in a practical plan for an API-powered project.", title: "Design your first API flow", duration: "10 minutes",
    conceptTitle: "Build from a clear contract.",
    paragraphs: ["A useful integration starts with a user need, not an endpoint. Define the outcome first.", "Write down the method, endpoint, authentication, request data, success response, and likely errors.", "Test with safe example data, handle failure states, then connect the result to the user experience."],
    request: "/example/projects/trail-planner", response: { project: "Trail Planner", method: "GET", handlesErrors: true, ready: true }, responseNote: "A small request contract makes the implementation testable.",
    question: "What should come first when planning an API feature?", answers: ["The user outcome", "A random endpoint"], correctAnswer: 0, answerKey: "user-outcome", explanation: "The user outcome guides which API and data the feature actually needs.", rewardKey: "developer-citadel.project", x: 81, y: 77,
  },
];
