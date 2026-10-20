-- ============================================================
-- Rote2Real - 20-Day Exercise Seed Data
-- Insert into rote2real_exercises (see rote2real-schema.sql)
-- Wording is kept beginner-friendly and global-audience-safe.
-- ============================================================

INSERT INTO rote2real_exercises
  (day_number, title, description, category, requires_evidence, evidence_type, order_index, is_active)
VALUES
(1,  'Take Your First Step',
     'You don''t need to be ready, you just need to start. Write a short paragraph: what do you want to build over the next 20 days, and why?',
     'reflection', TRUE, 'text', 1, TRUE),

(2,  'Show What You Can Do',
     'Your degree isn''t your portfolio. Pick one thing you''ve actually built or done (even something small) and write a few lines describing it, with a link if you have one.',
     'reflection', TRUE, 'text', 2, TRUE),

(3,  'Write Your Problem Statement',
     'Create a GitHub repository. Add a problem.md file describing a real problem in 5 simple points.',
     'build', TRUE, 'link', 3, TRUE),

(4,  'Build a Tiny Digital Artifact',
     'In 30 minutes, create one small digital artifact relevant to your field (e.g. modify a script, create a structured dataset, document a calculation, record an observation).',
     'build', TRUE, 'link', 4, TRUE),

(5,  'Build Instead of Buy',
     'Pick a project idea you like. Identify the smallest part of it you could build yourself, and build just that part.',
     'build', TRUE, 'link', 5, TRUE),

(6,  'Fix Your First Bug',
     'Take something you or someone else built, find something that doesn''t work, and fix it. Document what the bug was and how you fixed it.',
     'debug', TRUE, 'text', 6, TRUE),

(7,  'Use AI the Right Way',
     'Ask an AI tool to explain a piece of code or a concept. Modify one part yourself, test it, and commit it with a note on what you changed and why.',
     'ai-literacy', TRUE, 'link', 7, TRUE),

(8,  'Start Your 48-Hour MVP (Day 1)',
     'Pick one small working idea. Today: understand the problem, plan your approach, build a first version, and test it.',
     'build', TRUE, 'text', 8, TRUE),

(9,  'Finish and Demonstrate Your MVP (Day 2)',
     'Continue yesterday''s MVP: fix issues, improve it, document it, commit your work, and demonstrate it (a screenshot, video, or short writeup).',
     'build', TRUE, 'link', 9, TRUE),

(10, 'The Interdisciplinary Challenge',
     'Find someone studying something different from you (or imagine their perspective). Document one shared real-world problem together, from both angles.',
     'collaboration', TRUE, 'text', 10, TRUE),

(11, 'Tell Your GitHub Story',
     'Create your first repository if you don''t already have one. Add a README that describes what you''re learning and building.',
     'build', TRUE, 'link', 11, TRUE),

(12, 'Build Evidence, Not Certificates',
     'A certificate says you attended. Evidence shows you did it. Pick one: a repo, a commit, a bug fix, a prototype, a test, or a demo, and produce it.',
     'evidence', TRUE, 'link', 12, TRUE),

(13, 'The 7-Step Build Sprint',
     'Pick a tiny problem and move through all 7 steps in miniature today: define it, research it, design a solution, build, test, improve, and demonstrate.',
     'build', TRUE, 'text', 13, TRUE),

(14, 'Overcome the Fear of Starting',
     'You don''t need to know everything, just the next step. Create a repository, save one file in it, and make your first commit.',
     'build', TRUE, 'link', 14, TRUE),

(15, 'Stop Watching, Start Building',
     'Instead of watching another tutorial or saving another link, build one small thing today, however imperfect.',
     'build', TRUE, 'link', 15, TRUE),

(16, 'Bring Digital Skills to Your Field',
     'Every discipline needs digital literacy now. If you''re in science or another field, connect data, computation, or documentation to your subject, starting with GitHub.',
     'build', TRUE, 'link', 16, TRUE),

(17, 'Not a Coder? Start Here',
     'Being tech-ready isn''t about coding. Pick one: documentation, a research workflow, a process map, or a clear problem definition, and produce it.',
     'documentation', TRUE, 'text', 17, TRUE),

(18, 'Be a Mentor for a Day',
     'Instead of giving someone the answer, ask a peer or junior three guiding questions (What have you tried? What did you learn? What''s your next step?). Write up the conversation.',
     'mentorship', TRUE, 'text', 18, TRUE),

(19, 'Ask Better Questions About Your Own Work',
     'Instead of "what did I study," write down what you actually built this program, and name one thing you could improve about it.',
     'reflection', TRUE, 'text', 19, TRUE),

(20, 'Demonstrate Your Micro-MVP Journey',
     'Bring together everything you built across the 20 days into one final showcase: a short summary and a demo of your favorite piece of work.',
     'final-demo', TRUE, 'link', 20, TRUE);
