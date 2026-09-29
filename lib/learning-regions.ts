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

type LessonOverride = Pick<LearningQuest, "slug" | "title" | "duration" | "conceptTitle" | "paragraphs" | "request" | "response" | "responseNote" | "question" | "answers" | "correctAnswer" | "answerKey" | "explanation" | "rewardKey">;

function courseLesson(regionIndex: number, lesson: LessonOverride): LearningQuest {
  return { ...regions[regionIndex], ...lesson };
}

export const courseQuests: LearningQuest[][] = [
  [regions[0],
    courseLesson(0, { slug: "clients-and-servers", title: "Clients, servers, and the journey", duration: "7 minutes", conceptTitle: "A conversation needs two sides.", paragraphs: ["A client begins the conversation by asking for something.", "A server listens for requests, applies its rules, and sends a response.", "Your browser can be a client, while an API running in the cloud acts as the server."], request: "/example/library/books", response: { client: "browser", server: "library-api", books: 12 }, responseNote: "The browser asked; the library API answered.", question: "Which side normally begins an API request?", answers: ["The client", "The server"], correctAnswer: 0, answerKey: "client", explanation: "The client initiates the exchange by sending a request.", rewardKey: "starter-grove.clients" }),
    courseLesson(0, { slug: "anatomy-of-a-request", title: "Anatomy of a request", duration: "8 minutes", conceptTitle: "Four pieces tell the full story.", paragraphs: ["A method describes the action and a URL describes the destination.", "Headers carry context such as accepted formats or authentication.", "Some requests also include a body containing data to create or change."], request: "/example/trails/7?view=summary", response: { method: "GET", path: "/trails/7", query: { view: "summary" } }, responseNote: "Method, path, and query each answer a different question.", question: "Which request part identifies where it should go?", answers: ["The URL", "The response body"], correctAnswer: 0, answerKey: "url", explanation: "The URL points the request to its destination.", rewardKey: "starter-grove.anatomy" })],
  [regions[1],
    courseLesson(1, { slug: "http-methods", title: "Choose the right HTTP method", duration: "8 minutes", conceptTitle: "Verbs make intent clear.", paragraphs: ["GET reads, POST creates, PUT or PATCH updates, and DELETE removes.", "An API may support only some methods for an endpoint.", "Using the documented method prevents surprising or rejected requests."], request: "/example/companions", response: { POST: "create", GET: "list", PATCH: "update" }, responseNote: "The same resource can support different actions through methods.", question: "Which method usually creates a new resource?", answers: ["POST", "GET"], correctAnswer: 0, answerKey: "post", explanation: "POST usually submits data to create a resource.", rewardKey: "request-forest.methods" }),
    courseLesson(1, { slug: "headers-and-bodies", title: "Headers and request bodies", duration: "9 minutes", conceptTitle: "Context outside, data inside.", paragraphs: ["Headers describe the request, including its content type and credentials.", "The body carries the data being submitted.", "Content-Type: application/json tells the server how to read a JSON body."], request: "/example/quests", response: { contentType: "application/json", bodyAccepted: true }, responseNote: "The header explains how the server should interpret the body.", question: "What does Content-Type describe?", answers: ["The body’s format", "The user’s screen size"], correctAnswer: 0, answerKey: "body-format", explanation: "Content-Type tells the server how the body is encoded.", rewardKey: "request-forest.headers" })],
  [regions[2],
    courseLesson(2, { slug: "json-objects", title: "Navigate nested objects", duration: "9 minutes", conceptTitle: "Follow the labels inward.", paragraphs: ["A JSON object can contain another object as a value.", "Nested objects group related information without flattening every field.", "Read one label at a time: player, then location, then region."], request: "/example/player/atlas", response: { player: { name: "Atlas", location: { region: "JSON Jungle" } } }, responseNote: "The region value is nested inside player.location.", question: "Where is the region value stored?", answers: ["player.location.region", "player.name.region"], correctAnswer: 0, answerKey: "nested-path", explanation: "Each dot follows one nested object label.", rewardKey: "json-jungle.objects" }),
    courseLesson(2, { slug: "json-types", title: "Recognize JSON value types", duration: "9 minutes", conceptTitle: "Different values carry different meaning.", paragraphs: ["Strings hold text, numbers support arithmetic, and booleans represent true or false.", "null intentionally represents no value.", "Arrays and objects organize collections and related fields."], request: "/example/progress", response: { level: 4, active: true, title: "Pathfinder", companion: null }, responseNote: "The response contains a number, boolean, string, and null.", question: "Which value is a boolean?", answers: ["active", "title"], correctAnswer: 0, answerKey: "active-boolean", explanation: "true and false are boolean values.", rewardKey: "json-jungle.types" })],
  [regions[3],
    courseLesson(3, { slug: "path-parameters", title: "Find one resource with a path", duration: "8 minutes", conceptTitle: "The path can carry an identity.", paragraphs: ["A path parameter identifies a particular resource inside the URL.", "/players/42 asks for the player whose identifier is 42.", "API documentation often marks variable segments with braces such as /players/{id}."], request: "/example/players/42", response: { id: 42, name: "River" }, responseNote: "42 is the path parameter identifying one player.", question: "What does 42 identify in /players/42?", answers: ["A specific player", "The response format"], correctAnswer: 0, answerKey: "specific-player", explanation: "The path parameter selects one resource.", rewardKey: "endpoint-valley.paths" }),
    courseLesson(3, { slug: "pagination-and-filters", title: "Filter and paginate results", duration: "10 minutes", conceptTitle: "Ask for the right-sized answer.", paragraphs: ["Filters narrow a collection to matching results.", "Pagination divides a large result set into manageable pages.", "A response often includes a next cursor or page number so the client can continue."], request: "/example/quests?status=open&limit=2", response: { items: ["q1", "q2"], nextCursor: "q3" }, responseNote: "The next cursor tells the client where to continue.", question: "Why paginate a large collection?", answers: ["To return manageable chunks", "To change GET into POST"], correctAnswer: 0, answerKey: "manageable-chunks", explanation: "Pagination makes large result sets faster and easier to handle.", rewardKey: "endpoint-valley.pagination" })],
  [regions[4],
    courseLesson(4, { slug: "bearer-tokens", title: "Send a bearer token safely", duration: "9 minutes", conceptTitle: "Credentials travel in a header.", paragraphs: ["Many APIs expect a token in the Authorization header.", "The Bearer scheme tells the server how to interpret that token.", "HTTPS protects the request in transit, while server-side storage protects the token at rest."], request: "/example/private-quests", response: { authorization: "Bearer ••••••••", accepted: true }, responseNote: "The example masks the credential instead of displaying it.", question: "Where is a bearer token normally sent?", answers: ["The Authorization header", "A public URL parameter"], correctAnswer: 0, answerKey: "authorization-header", explanation: "Bearer tokens belong in the Authorization header.", rewardKey: "auth-mountain.bearer" }),
    courseLesson(4, { slug: "authorization-scopes", title: "Understand roles and scopes", duration: "10 minutes", conceptTitle: "Authenticated does not mean unlimited.", paragraphs: ["Authentication answers who is calling.", "Authorization decides what that identity may do.", "Scopes and roles should grant only the permissions required for the task."], request: "/example/admin/rewards", response: { authenticated: true, allowed: false, missingScope: "rewards:write" }, responseNote: "The caller is known but lacks permission for this action.", question: "What decides whether an authenticated user may perform an action?", answers: ["Authorization", "JSON formatting"], correctAnswer: 0, answerKey: "authorization", explanation: "Authorization evaluates permissions after identity is known.", rewardKey: "auth-mountain.scopes" })],
  [regions[5],
    courseLesson(5, { slug: "webhook-security", title: "Verify webhook signatures", duration: "10 minutes", conceptTitle: "Trust the signature, not the sender label.", paragraphs: ["A webhook request should include a cryptographic signature.", "The receiver recreates the signature with its secret and compares the values safely.", "Verification prevents an attacker from impersonating the real event sender."], request: "/example/webhooks/reward-earned", response: { signatureVerified: true, event: "reward.earned" }, responseNote: "Verification happens before processing the event.", question: "Why verify a webhook signature?", answers: ["To confirm the sender and payload", "To make the JSON prettier"], correctAnswer: 0, answerKey: "confirm-sender", explanation: "A valid signature authenticates the event and protects its integrity.", rewardKey: "webhook-woods.security" }),
    courseLesson(5, { slug: "webhook-retries", title: "Handle retries without duplicates", duration: "10 minutes", conceptTitle: "The same event may arrive twice.", paragraphs: ["Networks fail, so senders retry events that were not acknowledged.", "Store an event identifier and ignore work already completed for it.", "This idempotent design makes retries safe instead of destructive."], request: "/example/webhooks/delivery", response: { eventId: "evt_812", attempt: 2, processedOnce: true }, responseNote: "The second delivery is acknowledged without repeating the reward.", question: "What prevents a retried event from repeating its work?", answers: ["Idempotency", "A larger font"], correctAnswer: 0, answerKey: "idempotency", explanation: "Idempotency makes repeated delivery produce one intended outcome.", rewardKey: "webhook-woods.retries" })],
  [regions[6],
    courseLesson(6, { slug: "status-code-families", title: "Read status-code families", duration: "9 minutes", conceptTitle: "The first digit sets the direction.", paragraphs: ["2xx means success, 3xx means redirection, and 4xx points to the request.", "5xx indicates that the server could not fulfill a valid-looking request.", "The exact code and response body provide the next debugging clue."], request: "/example/status-tour", response: { "200": "success", "404": "not found", "500": "server error" }, responseNote: "Families give a fast summary before you inspect details.", question: "Which family represents server errors?", answers: ["5xx", "2xx"], correctAnswer: 0, answerKey: "5xx", explanation: "5xx codes report a server-side failure.", rewardKey: "error-dungeon.families" }),
    courseLesson(6, { slug: "debugging-workflow", title: "Build a debugging workflow", duration: "11 minutes", conceptTitle: "Observe before you change.", paragraphs: ["Capture the method, URL, headers, safe body fields, response, and request ID.", "Compare the request with the documentation and isolate one difference at a time.", "Never paste secret keys into logs, screenshots, or support messages."], request: "/example/debug/request", response: { requestId: "req_913", status: 422, safeToShare: true }, responseNote: "A request ID helps support find the matching server log.", question: "What should you preserve when asking support about a failed request?", answers: ["The request ID", "The secret API key"], correctAnswer: 0, answerKey: "request-id", explanation: "A request ID connects your report to server-side evidence without exposing secrets.", rewardKey: "error-dungeon.workflow" })],
  [regions[7],
    courseLesson(7, { slug: "integration-blueprint", title: "Create an integration blueprint", duration: "12 minutes", conceptTitle: "Turn an outcome into a contract.", paragraphs: ["Describe the user action and the information needed to complete it.", "Map that need to an endpoint, method, authentication, and response fields.", "Plan loading, empty, success, and error states before writing the final interface."], request: "/example/projects/blueprint", response: { outcome: "show nearby trails", statesPlanned: 4, ready: true }, responseNote: "The blueprint connects API behavior to the user experience.", question: "Which states should an integration plan include?", answers: ["Loading, empty, success, and error", "Success only"], correctAnswer: 0, answerKey: "four-states", explanation: "Real experiences need a useful response for every important state.", rewardKey: "developer-citadel.blueprint" }),
    courseLesson(7, { slug: "final-api-challenge", title: "Final challenge: ship a resilient flow", duration: "15 minutes", conceptTitle: "Bring the whole adventure together.", paragraphs: ["A resilient API flow sends the correct request and validates the response shape.", "It protects credentials, handles status codes, and avoids duplicate side effects.", "The final step is communicating clearly to the user in every state."], request: "/example/projects/final-check", response: { request: "valid", secrets: "protected", retries: "safe", userStates: "complete" }, responseNote: "Every region contributes one part of a production-ready integration.", question: "What makes an API integration resilient?", answers: ["Correct requests, protected secrets, safe retries, and handled states", "Assuming every request succeeds"], correctAnswer: 0, answerKey: "resilient-flow", explanation: "Resilience combines correctness, security, recovery, and clear user feedback.", rewardKey: "developer-citadel.final" })],
];

export const allAcademyQuests = courseQuests.flat();
