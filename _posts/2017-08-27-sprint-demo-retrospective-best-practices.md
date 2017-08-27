---
layout: single
title:  "Sprint Demo/Retrospective Best Practices"
tags: ['agile','scrum','demo','retrospective']
---

Scrum is my personal development methodology of choice. A key reason I like Scrum so much is because it allows you to frequently practice estimating software and evaluating how well you did after the sprint is complete through retrospective. I frequently call out late software as the most common first step down the path of the [Vicious Cycle of Software Development](/bad-habits-we-learn-in-school/#the-vicious-cycle-of-software-development), so I'm passionate about helping teams get this right.

Often, teams I've spent time with aren't sure what to talk about during retrospective meetings. They may discuss what went well and what didn't in the sprint in a freeform way. I've seen cases where they just play up accomplishments and minimize failures. Or when discussing failures, they may use the time as a venting session and fail to exit with any concrete plans for preventing making the same mistakes again next time.

Here's the structure/format I've found that has worked well across multiple teams. On the last day of the sprint, have a combined meeting for demo and retrospective. I generally schedule 2 hours for this and then we can always finish early if we run out of things to talk about, but adjust as needed for your team.

## Demo

Sprint Demo is where you get to share the accomplishments from the sprint with your team. A common pitfall I see is for developers to be reluctant to demo their accomplishments, because they think the accomplishments are not significant enough to impress management or stakeholders. Don't think of sprint demos as being for management and/or stakeholders. I always coach devs to give demos to their teammates, not management. This helps them feel less nervous and removes the pressure of everything having to go perfectly. Sprint demos should not be thought of as a vehicle to impress. I've found they are much more valuable as a knowledge sharing, and even bug finding tool.

You may not realize it, but there are probably people on your team who have no idea what you're actually working on. This can be surprising to some because everyone participates in estimating all sprint stories during planning. But the level of understanding a person needs to contribute to a story-level estimate is different than having a deep understanding of the feature. A demo can really solidify the concept for other devs on the team. This is helpful in a few ways. It increases everyone's sense of ownership over all of the team's software, and in teams that practice devops, it provides some of the cross-training necessary to support the team's software in production.

Demos can also be great for finding bugs. If you remove the expectation that the demo has to impress people, you'll start getting a lot of questions like, "What happens if you click on X, or enter Y input?" Ideally everything works correctly and the team just learns about how the software is expected to behave in those circumstances, however sometimes the software doesn't work correctly and can be fixed before causing any customer-facing issues.

Remember, it's important to celebrate accomplishments, no matter how small they may seem relative to the entire project. Integration tests and backend APIs may seem like they're not worth demoing, but demo them anyway.

## Retrospective

Retrospective is, in my opinion, the most critical part of practicing Scrum. It's the key opportunity to improve your development process for future sprints. I've found the best way to start the discussion is with objective data. The scrum master should prepare the following data prior to Retrospective (ideally through an automated script) and lead off by presenting it to the team:

1. Number of stories complete/incomplete. Be very strict about this. If it's not fully complete, do not count it as complete.
1. Point completion % = (sum of estimated points on completed stories / sum of estimated points on all committed stories * 100%). It's important to note I'm only paying attention to the estimated points here. This gives better visibility into how well your estimate ended up matching reality.
1. Avg velocity = (sum of estimated points on completed stories / number of available dev days in the sprint * 100%). This is your measured velocity per person, per available day. It's important to note that number of available dev days is computed as part of sprint capacity planning. So this is the number of days in the sprint * number of devs minus any planned days out of the sprint (vacation, holidays, oncall, etc). For our team, we also subtracted the last day of the sprint for all devs to account for time spent on sprint overhead (planning/demo/retrospective).
1. Trending Avg velocity = mean avg of the avg velocity values for the last 6 (or whatever you choose) sprints. This value should be used to set your capacity for next sprint.
1. Emergent stories (stories created after planning). Not a metric, but these should be discussed during retrospective. Why weren't these accounted for during planning? What can we do to minimize emergent work and foresee this kind of work in future sprints?
1. Ballooning stories (stories that took longer than estimated). These should be discussed. Why did this take longer than expected? What can we do to improve our estimates for this kind of work in future plannings?

Gathering this data forces your team to take an objective look at how successful the sprint was. The goal, of course is all stories complete and a completion % of 100%. On the teams I've been on, the completion rate has always started out much lower than this. This starts a great discussion into what happened. **It's important to understand that retrospective should not be a blaming/shaming session.** If management and team members have put time and effort into creating a healthy, psychologically safe team environment, chances are good that everyone's doing their best. Focus on finding the root causes of the problem and then determine concrete mechanisms you can put in place to prevent the mistakes from being repeated.

Examples of actions taken in the past are to add items to existing checklists or create new checklists. I'm a strong advocate of checklists as a simple, lightweight mechanism for ensuring consistency. For example, a story may have ballooned because you completely forgot to call out integration tests during planning, resulting in underestimation. A feature checklist can help your team consistently consider creating subtasks for all aspects of a feature. Another learning from the past was if we are adopting new technologies/frameworks, we may need to lower capacity (either at the individual or team level) to account for ramp up time. When we ran into this on one team, our retrospective action item was to add an item to our capacity planning checklist to ask this question in the future, prior to planning.

Another best practice is to review action items from past retrospectives and determine if the changes you tried are actually helping or not. It's very important to understand that modifying your process does not always mean adding something new. Sometimes tweaking something or removing it completely is best. That way your process stays lean and doesn't start to become the dreaded bureaucracy.

If you don't feel you're getting much value out of your demo/retrospective meetings or worse, you don't even have them, I encourage you to try out this format and see if it helps. If you have any other tips on demos/retrospective, please add them to the comments!
