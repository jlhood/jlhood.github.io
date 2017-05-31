---
layout: single
title:  "Bad Habits We Learn in School"
tags: ['career','work-life-balance']
---

One of the most pervasive problems in the tech industry is poor work-life balance. Long hours and "death marches" can seem like the norm, especially when you're fresh out of college and hungry to prove yourself and jumpstart your career. The industry as a whole has a long way to go to address this common problem. However, in my experience, I've found that it is far more common to see individuals or teams unknowingly make poor decisions that quickly accelerate them towards burnout.

So what are these poor decisions and what makes them so common? I've noticed a pattern that seems to disproportionately affect recent college hires, but experienced engineers are by no means immune. My hypothesis is that these patterns or habits are actually formed while we're in school. Don't get me wrong, school does a lot to set you up for success in life, but believe it or not, it also teaches you a lot of bad habits that may work well in school, but set you up for failure in industry.

So I want you to picture yourself back in school and let's take a look at some examples:

## In School...

1. **Deadlines:** In school, deadlines come in the form of due dates. Due dates are set by your professor and are generally fixed and non-negotiable. While they may be challenging to meet, generally speaking, due dates are reasonable and achievable.
1. **Individual vs Collaborative:** In school, the vast majority of work is done individually. Sure, we may get the occasional group project, however that's generally the exception. In these group projects, it's not uncommon for one or two individuals to end up doing most of the work while the rest of the team coasts.
1. **Overtime Work:** In school, pulling all-nighters studying for a test or working on a big project is looked at as a normal, socially encouraged occurrence.
1. **Assignment Complete:** Once the due date comes, you turn in your work or take your test, receive a grade and--let's be honest--you never look at it again.

## In Industry...

Ok so you've spent years in school and eventually it leads to your first job in the tech industry! Congratulations! Ready to change the world? Ok!

You are given your first big project to work on, and you're given a deadline for the first deliverable. You may not even question it. In school you don't negotiate due dates. You just go on faith that they're generally reasonable and achievable. You get to work. Things move relatively quickly at first. Early reports to management are confident versions of "it's practically done!"

As time goes on, you keep discovering additional complexity that you hadn't realized was there. When you said you were almost done, maybe you weren't thinking about the fact that you'd have to write tests too. The deliverable date is approaching and you start to get a little panicky. No worries, you can just work extra hours to make up for it. Maybe pull a few all-nighters like in school...

Turns out the amount of work was much more than you initially thought and a few all-nighters don't seem to be getting you much closer. The deliverable date passes and the software is not done yet. At this point, you and maybe your teammates are working crazy hours (possibly mandated by management at this point), which is demoralizing, but you may not even question it. This is just how software development works right?

Management is pretty frustrated at this point, and you're seeing your career aspirations slip away one day at a time, so you make a decision: You decide to cut corners to make things go faster. Maybe you can save those tests for later, after launch. Maybe you can just hack a few things in here and there...

Eventually, the product is finally launched! Phew! You're exhausted, but at least you don't have to worry about it anymore right? In school you just throw old assignments away. Actually, you do. Unlike school, you have to maintain the things you build and deliver. If you cut corners on quality or worse, architecture, there will be many bugs. This leads to customer pain, which means operational pain for you.

Of course while this operational pain is going on, you're trying to work on the next deliverable for the project. At this point, the next deliverable is more likely to also be late, not only because some of the mistakes made during the first deliverable may be repeated, but now the development team also has the added burden of randomization due to ongoing operational problems. Add to that technical debt and increased risk of regressions due to cutting corners on the first deliverable and the cycle not only repeats itself, it actually gets worse each time around...

## The Vicious Cycle of Software Development

Congratulations! You've been burned by what I like to call the Vicious Cycle of Software Development. The basic cycle looks like this:

![Vicious Cycle (basic)](/images/vicious-cycle-basic.png)

As software gets later and later, it can turn into a date-driven death march, which leads to compromised quality, which leads to operational pain, which makes the next feature late, and so on and so on. If this cycle continues for a prolonged period of time, people will get burnt out and leave the team, which adds these additional consequences to the cycle:

![Vicious Cycle (prolonged)](/images/vicious-cycle-prolonged.png)

People get burnt out and eventually leave. Their knowledge of how the software works goes with them, making it even harder to develop new features in a timely manner.

Admittedly, the scenario I paint above is a worst-case scenario. However in my years as a software developer, I've seen teams fall into this cycle time and time again. I've described this vicious cycle in several talks and always see knowing smiles in the audience and people nodding their heads. It's surprisingly easy to get onto this path regardless of your experience level.

So what can we do? Here are some tips for avoiding or reversing the vicious cycle.

**Tip 1: Deadlines should be based on estimates from multiple people and treated as goals/forecasts rather than hard, immovable barriers.**

Remember the bad habit we learned in school that deadlines are generally reasonable and non-negotiable? That's not true in software development! Very few deadlines are hard, immovable deadlines. Most are really goals to get teams focused on delivery. Dates can be aggressive, but you should not treat them as if they are sacred. The benefit of aggressive deadlines is it forces priority and requirements decisions to reduce the deliverable to the minimum viable product that solves the customer's needs. Development teams should treat software deadlines as goals/forecasts. Throughout the project there should be ongoing, open communication about how actual progress compares to the goal.

Note that software estimation is very difficult and when we're wrong, we tend to be wrong on the side of underestimation. So combat underestimation by coming up with a system for estimation that involves multiple people to reduce bias.

**Tip 2: Learn how to communicate status effectively, and handle decisions around missed expectations as a team.**

In the vicious cycle scenario, as the deadline approached and there was still a large amount of work to do, two key mistakes were made: Status was not reported in a useful way ("It's almost done!") and the developer unilaterally decided to work extra hours and pull all-nighters when they thought the project was behind schedule. Again, this behavior lines up well with our school experience. In school, we never had to deal with reporting status. The due date came and you handed in your assignment or took a test. Also, since most of the work was done individually, you are used to making all of your decisions by yourself, especially when it comes to pulling all-nighters.

I have [a whole post](http://jlhood.com/its-done-great-what-does-that-mean/) I've written regarding communicating effective status, so I'll defer to that for the first problem. For the second problem, if reality is not matching expected timelines, it's critically important to have an open conversation with your team, including management as early as possible. The earlier you surface problems, the more options you have to handle them. The discussion should consist of (1) root causing why things are taking longer than expected and (2) deciding on a path forward.

When deciding a path forward, working extra hours is an option, however it should be the last option. There are other much better options to consider such as

1. Resetting expectations - management may be fine with it being later than planned.
1. Challenging requirements/scope of a feature - sometimes there's a smarter/smaller/easier way to get the customer what they really need.
1. Drop lower priority features

You should work to build a team culture where there is open communication and handle decisions around missed expectations together as a team. When adopting this model, newer developers are frequently surprised by how often management is ok with dropping features or punting things forward to future iterations. Without that conversation, you might have worked yourself to exhaustion trying to deliver something that didn't actually matter that much to the business.

**Tip 3: Treat quality as an inseparable part of a feature that cannot be deprioritized.**

If you or team members are ever considering deprioritizing quality, ask yourself this question: Which would you rather choose: (1) A known, fixed upfront cost, or (2) an unknown, variable cost that can come up anytime, while you're trying to deliver other features? I hope you picked option 1. Option 1 is prioritizing quality up front. Deprioritizing quality leads you right into the operational pain stage of the vicious cycle, which causes future software to be late.

For me, the phrase "deprioritizing quality" doesn't even make sense. Prioritization happens at the feature level and quality is a non-severable part of a feature that cannot be deprioritized. When I discuss priorities with management, I always list things out at the feature level. That way there isn't even a discussion about deprioritizing quality. Although to their credit, I find most managers understand this and it is more common for developers to deprioritize quality and cut corners when trying to deliver faster. Don't fall into that temptation! As a developer, you own delivering quality software. Put in the work now to invest in quality. It will pay itself back many times over in the long term.

**Tip 4: Always strive to build a team culture of trust and open communication.**

Communication and collaboration are key to succeeding in industry. The scope and size of various projects and software at many companies is so vast, it's not possible for a single person to understand it all. In order to succeed, you have to learn to work well with others and communicate, especially when you really don't want to, like when things are not progressing as planned. One of the reasons I like Scrum so much is that you get to practice having these discussions constantly, during daily standups and retrospectives. Also, the frequent iteration cycle (in theory) prevents you from going too far off the rails without some kind of checkpoint to catch it. However I've also seen teams just go through the motions of Scrum without actually practicing it.

If you struggle with confrontation or difficult conversations, I highly recommend reading [Crucial Confrontations](https://www.amazon.com/Crucial-Confrontations-Resolving-Promises-Expectations/dp/0071446524). I didn't have a good model for healthy communication growing up, and that book completely changed the way I view and deal with confrontation, both in my professional and personal life.

* * *

Wow, this post ended up being a lot longer than I had intended, but I hope you find it helpful! 😅 Have you experienced the vicious cycle of software development? Do you have additional tips for reversing it or avoiding it altogether?
