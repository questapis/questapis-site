-- Expand all eight published Academy courses to three interactive lessons each.

insert into public.reward_rules (key, version, xp, gold, active) values
  ('starter-grove.clients',1,100,100,true),('starter-grove.anatomy',1,100,100,true),
  ('request-forest.methods',1,100,100,true),('request-forest.headers',1,100,100,true),
  ('json-jungle.objects',1,100,100,true),('json-jungle.types',1,100,100,true),
  ('endpoint-valley.paths',1,100,100,true),('endpoint-valley.pagination',1,100,100,true),
  ('auth-mountain.bearer',1,100,100,true),('auth-mountain.scopes',1,100,100,true),
  ('webhook-woods.security',1,100,100,true),('webhook-woods.retries',1,100,100,true),
  ('error-dungeon.families',1,100,100,true),('error-dungeon.workflow',1,100,100,true),
  ('developer-citadel.blueprint',1,100,100,true),('developer-citadel.final',1,100,150,true)
on conflict (key,version) do update set xp=excluded.xp,gold=excluded.gold,active=true;

insert into public.lessons (slug,course_id,title,summary,sort_order,status)
select seed.slug,course.id,seed.title,seed.summary,seed.sort_order,'published'::public.content_status
from (values
  ('clients-and-servers','api-basics','Clients, servers, and the journey','Understand the two sides of an API conversation.',2),
  ('anatomy-of-a-request','api-basics','Anatomy of a request','Recognize a method, URL, headers, and body.',3),
  ('http-methods','http-foundations','Choose the right HTTP method','Match common methods to their actions.',2),
  ('headers-and-bodies','http-foundations','Headers and request bodies','Separate request context from submitted data.',3),
  ('json-objects','json-essentials','Navigate nested objects','Follow labels through nested JSON.',2),
  ('json-types','json-essentials','Recognize JSON value types','Identify strings, numbers, booleans, arrays, and null.',3),
  ('path-parameters','endpoint-navigation','Find one resource with a path','Use path parameters to identify a resource.',2),
  ('pagination-and-filters','endpoint-navigation','Filter and paginate results','Request manageable parts of a collection.',3),
  ('bearer-tokens','authentication-safety','Send a bearer token safely','Use the Authorization header without exposing secrets.',2),
  ('authorization-scopes','authentication-safety','Understand roles and scopes','Separate authentication from authorization.',3),
  ('webhook-security','event-automation','Verify webhook signatures','Authenticate an incoming event before processing it.',2),
  ('webhook-retries','event-automation','Handle retries without duplicates','Make repeated delivery safe through idempotency.',3),
  ('status-code-families','error-debugging','Read status-code families','Use the first digit as a debugging direction.',2),
  ('debugging-workflow','error-debugging','Build a debugging workflow','Collect safe evidence and isolate one change at a time.',3),
  ('integration-blueprint','project-workshop','Create an integration blueprint','Map a user outcome to an API contract and interface states.',2),
  ('final-api-challenge','project-workshop','Final challenge: ship a resilient flow','Combine correct requests, security, retries, and user feedback.',3)
) as seed(slug,course_slug,title,summary,sort_order)
join public.courses course on course.slug=seed.course_slug
on conflict (slug) do update set course_id=excluded.course_id,title=excluded.title,summary=excluded.summary,sort_order=excluded.sort_order,status=excluded.status;

insert into public.lesson_versions (lesson_id,version,content,answer_key,published_at)
select lesson.id,1,jsonb_build_object('prompt',seed.prompt),jsonb_build_object('answer',seed.answer),now()
from (values
  ('clients-and-servers','Which side normally begins an API request?','client'),
  ('anatomy-of-a-request','Which request part identifies where it should go?','url'),
  ('http-methods','Which method usually creates a new resource?','post'),
  ('headers-and-bodies','What does Content-Type describe?','body-format'),
  ('json-objects','Where is the region value stored?','nested-path'),
  ('json-types','Which value is a boolean?','active-boolean'),
  ('path-parameters','What does 42 identify in /players/42?','specific-player'),
  ('pagination-and-filters','Why paginate a large collection?','manageable-chunks'),
  ('bearer-tokens','Where is a bearer token normally sent?','authorization-header'),
  ('authorization-scopes','What decides whether an authenticated user may perform an action?','authorization'),
  ('webhook-security','Why verify a webhook signature?','confirm-sender'),
  ('webhook-retries','What prevents a retried event from repeating its work?','idempotency'),
  ('status-code-families','Which family represents server errors?','5xx'),
  ('debugging-workflow','What should you preserve when asking support about a failed request?','request-id'),
  ('integration-blueprint','Which states should an integration plan include?','four-states'),
  ('final-api-challenge','What makes an API integration resilient?','resilient-flow')
) as seed(slug,prompt,answer)
join public.lessons lesson on lesson.slug=seed.slug
on conflict (lesson_id,version) do update set content=excluded.content,answer_key=excluded.answer_key,published_at=excluded.published_at;

insert into public.quest_definitions (lesson_id,name,objective,reward_rule_key,status)
select lesson.id,lesson.title,seed.prompt,seed.reward_key,'published'::public.content_status
from (values
  ('clients-and-servers','Which side normally begins an API request?','starter-grove.clients'),('anatomy-of-a-request','Which request part identifies where it should go?','starter-grove.anatomy'),
  ('http-methods','Which method usually creates a new resource?','request-forest.methods'),('headers-and-bodies','What does Content-Type describe?','request-forest.headers'),
  ('json-objects','Where is the region value stored?','json-jungle.objects'),('json-types','Which value is a boolean?','json-jungle.types'),
  ('path-parameters','What does 42 identify in /players/42?','endpoint-valley.paths'),('pagination-and-filters','Why paginate a large collection?','endpoint-valley.pagination'),
  ('bearer-tokens','Where is a bearer token normally sent?','auth-mountain.bearer'),('authorization-scopes','What decides whether an authenticated user may perform an action?','auth-mountain.scopes'),
  ('webhook-security','Why verify a webhook signature?','webhook-woods.security'),('webhook-retries','What prevents a retried event from repeating its work?','webhook-woods.retries'),
  ('status-code-families','Which family represents server errors?','error-dungeon.families'),('debugging-workflow','What should you preserve when asking support about a failed request?','error-dungeon.workflow'),
  ('integration-blueprint','Which states should an integration plan include?','developer-citadel.blueprint'),('final-api-challenge','What makes an API integration resilient?','developer-citadel.final')
) as seed(slug,prompt,reward_key)
join public.lessons lesson on lesson.slug=seed.slug
where not exists (select 1 from public.quest_definitions existing where existing.lesson_id=lesson.id);

update public.quest_definitions quest set name=lesson.title,objective=seed.prompt,reward_rule_key=seed.reward_key,status='published'
from public.lessons lesson
join (values
  ('clients-and-servers','Which side normally begins an API request?','starter-grove.clients'),('anatomy-of-a-request','Which request part identifies where it should go?','starter-grove.anatomy'),
  ('http-methods','Which method usually creates a new resource?','request-forest.methods'),('headers-and-bodies','What does Content-Type describe?','request-forest.headers'),
  ('json-objects','Where is the region value stored?','json-jungle.objects'),('json-types','Which value is a boolean?','json-jungle.types'),
  ('path-parameters','What does 42 identify in /players/42?','endpoint-valley.paths'),('pagination-and-filters','Why paginate a large collection?','endpoint-valley.pagination'),
  ('bearer-tokens','Where is a bearer token normally sent?','auth-mountain.bearer'),('authorization-scopes','What decides whether an authenticated user may perform an action?','auth-mountain.scopes'),
  ('webhook-security','Why verify a webhook signature?','webhook-woods.security'),('webhook-retries','What prevents a retried event from repeating its work?','webhook-woods.retries'),
  ('status-code-families','Which family represents server errors?','error-dungeon.families'),('debugging-workflow','What should you preserve when asking support about a failed request?','error-dungeon.workflow'),
  ('integration-blueprint','Which states should an integration plan include?','developer-citadel.blueprint'),('final-api-challenge','What makes an API integration resilient?','developer-citadel.final')
) as seed(slug,prompt,reward_key) on seed.slug=lesson.slug
where quest.lesson_id=lesson.id;
