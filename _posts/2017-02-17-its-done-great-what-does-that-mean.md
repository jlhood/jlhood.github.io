---
layout: single
title: "\"It's Done!\" \"Great! What does that mean?\""
tags: ['scrum']
---

One of the unique challenges of software construction, versus other forms of construction, is that what software developers build is largely
intangible and invisible. Measuring and tracking progress of a software project is a very difficult task. It's critical for software developers
to realize that one of our key roles is to be able to clearly communicate task status to stakeholders. One of the cardinal sins
of software development is communicating that a task or project is farther along than it really is.

With that in mind, I'd like to share a phrase that has become a huge pet peeve of mine:

"It's done!"

I've heard this phrase uttered countless times by developers, and upon further questioning, it almost always turns out that there is still work
remaining. I'm not sure why developers have such a strong tendency to say "it's done" when it's not actually true, however I can say, it's
generally not out of malice or the desire to misinform. Usually, what I find is that they mean they are done with some piece of the task.
Maybe they've completed the functional changes (but there are still unit tests to write). Or maybe functional and unit test changes are finished
and they've submitted it for code review (but no one's reviewed it yet, which could lead to more work). And so on.

This is such a common problem, that the term "done-done-done", has become popular throughout Amazon as a way to basically say "no really, it's
completely done." I've tried using "done-done-done," but I find that after a while, you still end up running into the same problems.

I've come to the conclusion that "It's done" tells me absolutely nothing about the progress of a software task. Even worse, if most of the time
when developers say "It's done," it's actually not done, then that means most of the time you're lying to stakeholders. So "It's done"
is worse than worthless, it actually erodes trust between developers and stakeholders almost every time you use it!

To combat this problem, here are the phrases I've found useful for communicating status of a task:

1. Functional changes are in progress.
1. Functional changes are complete, unit test changes are in progress.
1. I've submitted a code review for the first draft of functional and unit test changes, and no one's looked at it yet.
1. The code review is currently on revision X (in which case the reviewer is a better person to ask for ETA on completion of the code review).
1. The changes are past code review and on their way to production.
1. The changes are deployed to production.

5 and 6 assume you're practicing Continuous Deployment. If not, you may need to break down release status further to better clarify progress.

Note, the word "done" at the overall task level has been completely removed from the conversation. I'm very anal about this on my teams. Anytime
a developer says "It's done" during daily standup, it immediately triggers a game of 20 questions where I try to determine which of the above phrases
best represents the current status. Most of the developers on the team have picked up on this and have learned to forego this game and just use
one of the above phrases.

From a developer's point of view, this may seem like a minor miscommunication, but erosion of trust between stakeholders and developers
is a very serious problem. When stakeholders don't trust their developers, they're more likely to interfere with the team's development process, for
example, forcing dates, which leads to mandated overtime work, reducing morale and productivity, as well as leading to cut corners and overall reduced
software quality. And to add insult to injury, when you actually are finished with a feature and inform your stakeholders, you can expect to get a
skeptical response at best. So no pats on the back for all your hard work. But honestly, you kind of deserve skepticism if you've been constantly lying
to them right?

I highly recommend teams practice reporting status in this way and hold each other accountable when status is communicated in a way that's unclear or
misleading. It's actually a pretty easy change to make once you get used to it, and the benefits of increased trust are well worth it.

Ok this blog post is done. 😜
