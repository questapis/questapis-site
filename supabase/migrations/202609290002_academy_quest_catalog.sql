-- Publish the complete eight-region beginner quest path.

insert into public.reward_rules (key, version, xp, gold, active) values
  ('starter-grove.intro', 1, 100, 150, true),
  ('request-forest.cycle', 1, 100, 100, true),
  ('json-jungle.reading', 1, 100, 100, true),
  ('endpoint-valley.parameters', 1, 100, 100, true),
  ('auth-mountain.keys', 1, 100, 100, true),
  ('webhook-woods.events', 1, 100, 100, true),
  ('error-dungeon.status', 1, 100, 100, true),
  ('developer-citadel.project', 1, 100, 100, true)
on conflict (key, version) do update set xp = excluded.xp, gold = excluded.gold, active = true;

insert into public.regions (slug, name, description, sort_order, status) values
  ('starter-grove', 'Starter Grove', 'A calm introduction to requests and responses.', 1, 'published'),
  ('forest-of-requests', 'Forest of Requests', 'Understand HTTP methods and the request-response cycle.', 2, 'published'),
  ('json-jungle', 'JSON Jungle', 'Read objects, arrays, labels, and values.', 3, 'published'),
  ('endpoint-valley', 'Endpoint Valley', 'Navigate URLs, paths, and query parameters.', 4, 'published'),
  ('auth-mountain', 'Auth Mountain', 'Protect API keys and understand authentication.', 5, 'published'),
  ('webhook-woods', 'Webhook Woods', 'Use events to connect applications.', 6, 'published'),
  ('dungeon-of-errors', 'Dungeon of Errors', 'Read status codes and debug failed requests.', 7, 'published'),
  ('developer-citadel', 'Developer Citadel', 'Plan an API-powered project from outcome to response.', 8, 'published')
on conflict (slug) do update set name = excluded.name, description = excluded.description, sort_order = excluded.sort_order, status = excluded.status;

insert into public.courses (slug, region_id, name, description, status)
select course.slug, region.id, course.name, course.description, 'published'::public.content_status
from (values
  ('api-basics', 'starter-grove', 'API Basics', 'Learn how software asks for and receives data.'),
  ('http-foundations', 'forest-of-requests', 'HTTP Foundations', 'Understand methods, requests, and responses.'),
  ('json-essentials', 'json-jungle', 'JSON Essentials', 'Read the structured data returned by APIs.'),
  ('endpoint-navigation', 'endpoint-valley', 'Endpoint Navigation', 'Work with resource paths and parameters.'),
  ('authentication-safety', 'auth-mountain', 'Authentication Safety', 'Use credentials without exposing secrets.'),
  ('event-automation', 'webhook-woods', 'Event Automation', 'Understand webhook delivery and handling.'),
  ('error-debugging', 'dungeon-of-errors', 'Error Debugging', 'Turn status codes into useful clues.'),
  ('project-workshop', 'developer-citadel', 'Project Workshop', 'Design a complete API feature flow.')
) as course(slug, region_slug, name, description)
join public.regions region on region.slug = course.region_slug
on conflict (slug) do update set region_id = excluded.region_id, name = excluded.name, description = excluded.description, status = excluded.status;

insert into public.lessons (slug, course_id, title, summary, sort_order, status)
select lesson.slug, course.id, lesson.title, lesson.summary, 1, 'published'::public.content_status
from (values
  ('what-is-an-api', 'api-basics', 'What is an API?', 'Understand requests and responses.'),
  ('request-response-cycle', 'http-foundations', 'The request-response cycle', 'Choose the right HTTP method for a request.'),
  ('reading-json', 'json-essentials', 'Read a JSON response', 'Find values inside objects and arrays.'),
  ('urls-and-parameters', 'endpoint-navigation', 'Navigate an endpoint', 'Use paths and query parameters.'),
  ('protecting-api-keys', 'authentication-safety', 'Protect an API key', 'Keep credentials out of public code.'),
  ('webhook-events', 'event-automation', 'Listen for a webhook', 'Respond when a subscribed event happens.'),
  ('debugging-status-codes', 'error-debugging', 'Decode a failed request', 'Use status codes and messages to debug.'),
  ('build-an-api-plan', 'project-workshop', 'Design your first API flow', 'Plan an API feature around a user outcome.')
) as lesson(slug, course_slug, title, summary)
join public.courses course on course.slug = lesson.course_slug
on conflict (slug) do update set course_id = excluded.course_id, title = excluded.title, summary = excluded.summary, sort_order = excluded.sort_order, status = excluded.status;

insert into public.lesson_versions (lesson_id, version, content, answer_key, published_at)
select lesson.id, 1, jsonb_build_object('prompt', seed.prompt), jsonb_build_object('answer', seed.answer), now()
from (values
  ('what-is-an-api', 'In the weather example, what is the response?', 'weather-data'),
  ('request-response-cycle', 'Which HTTP method is normally used to read information?', 'get'),
  ('reading-json', 'Which field in the example is an array?', 'skills-array'),
  ('urls-and-parameters', 'What does the difficulty query parameter do?', 'filters-results'),
  ('protecting-api-keys', 'Where should a secret API key be stored?', 'server-secret'),
  ('webhook-events', 'When is a webhook normally sent?', 'event-happens'),
  ('debugging-status-codes', 'What does a 404 response usually mean?', 'not-found'),
  ('build-an-api-plan', 'What should come first when planning an API feature?', 'user-outcome')
) as seed(lesson_slug, prompt, answer)
join public.lessons lesson on lesson.slug = seed.lesson_slug
on conflict (lesson_id, version) do update set content = excluded.content, answer_key = excluded.answer_key, published_at = excluded.published_at;

insert into public.quest_definitions (lesson_id, name, objective, reward_rule_key, status)
select lesson.id, seed.name, seed.objective, seed.reward_key, 'published'::public.content_status
from (values
  ('what-is-an-api', 'First request', 'Identify the response in an API exchange.', 'starter-grove.intro'),
  ('request-response-cycle', 'Method trail', 'Choose the method used to retrieve data.', 'request-forest.cycle'),
  ('reading-json', 'Array expedition', 'Recognize an array in a JSON response.', 'json-jungle.reading'),
  ('urls-and-parameters', 'Parameter pass', 'Explain how a query parameter filters results.', 'endpoint-valley.parameters'),
  ('protecting-api-keys', 'Secret summit', 'Choose a safe location for an API key.', 'auth-mountain.keys'),
  ('webhook-events', 'Event listener', 'Recognize when webhook delivery occurs.', 'webhook-woods.events'),
  ('debugging-status-codes', '404 escape', 'Interpret a not-found response.', 'error-dungeon.status'),
  ('build-an-api-plan', 'First integration', 'Begin an API plan with the user outcome.', 'developer-citadel.project')
) as seed(lesson_slug, name, objective, reward_key)
join public.lessons lesson on lesson.slug = seed.lesson_slug
where not exists (select 1 from public.quest_definitions existing where existing.lesson_id = lesson.id);

update public.quest_definitions quest
set name = seed.name, objective = seed.objective, reward_rule_key = seed.reward_key, status = 'published'
from public.lessons lesson
join (values
  ('what-is-an-api', 'First request', 'Identify the response in an API exchange.', 'starter-grove.intro'),
  ('request-response-cycle', 'Method trail', 'Choose the method used to retrieve data.', 'request-forest.cycle'),
  ('reading-json', 'Array expedition', 'Recognize an array in a JSON response.', 'json-jungle.reading'),
  ('urls-and-parameters', 'Parameter pass', 'Explain how a query parameter filters results.', 'endpoint-valley.parameters'),
  ('protecting-api-keys', 'Secret summit', 'Choose a safe location for an API key.', 'auth-mountain.keys'),
  ('webhook-events', 'Event listener', 'Recognize when webhook delivery occurs.', 'webhook-woods.events'),
  ('debugging-status-codes', '404 escape', 'Interpret a not-found response.', 'error-dungeon.status'),
  ('build-an-api-plan', 'First integration', 'Begin an API plan with the user outcome.', 'developer-citadel.project')
) as seed(lesson_slug, name, objective, reward_key) on seed.lesson_slug = lesson.slug
where quest.lesson_id = lesson.id;
