---
layout: single
title:  "Just-in-Time Documentation"
tags: ['design','documentation']
---

One of the most interesting tenets of the [Agile Manifesto](http://agilemanifesto.org/) is valuing "working software over comprehensive documentation,"
which is often misinterpreted as, "documentation is not important, just write code." This sentiment is captured perfectly in this [Dilbert](http://dilbert.com/)
comic:

![Dilbert: Agile Programming](/images/dilbert-agile.png)

Managers aren't the only ones guilty of misinterpreting this. I've seen software developers take this tenet as license to drop documentation completely.
Another common pitfall I see is developers getting caught in the false dilemma of thinking they either need Waterfall levels of design documentation or
none at all. In reality, the right balance is somewhere in the middle, but it tends to vary based on the situation. In this post, I'll cover a strategy
I like to call "Just-in-Time Documentation," which helps me find the right balance for any given feature or project.

## Design Documentation

The general mentality of Just-in-Time Documentation comes from the insight that writing code is just like any other form of writing.

Sometimes in writing, you know what you're going to write and you just do it. Writing an email is a good example of this. Usually, there's no preparation
necessary. You just write it, do some minor revisions and you're done. Similarly, in code, sometimes you know where you're going to make a change and you
just do it, like fixing a minor bug or adding a small enhancement to a class. You write the change, do some minor revisions and you're done.

However sometimes in writing, you go to write something and find you aren't sure where to begin or what to write. You need to get your thoughts organized
before you are ready to write your draft. The writing process has a step called pre-writing, which is made for this. You might do some free writing to
brainstorm ideas or make an outline. You might write a paragraph or two covering a key idea you want to get across. At some point, your thoughts are
organized to a point where you're ready to write.

I apply the exact same principle to writing code. Sometimes I go to make a change and I'm not sure where to begin. At that point, I open a basic text editor
and start doing a pre-writing exercise. I don't worry about grammar or formatting, hence the text editor. I write, very informally, about what problem I'm
trying to solve, what I know and any open questions I have. I brainstorm some options for how I can solve the problem. I might list out some possible
files/classes I'll need to create or change. As I do this, the solution becomes clearer and at some point, I'm able to put together a simple bullet-list
outline of changes I plan to make. At that point, I might grab someone and walk through the outline with them to sanity check and make sure there isn't
something major I've missed. Then I write my change. I generally save these kinds of pre-writing exercises somewhere, like the project's issue tracker.

Some might call this writing an implementation or detailed design document and getting it reviewed, but I find those terms tend to make people think of
polished documents and heavyweight review processes. I like thinking of it as pre-writing, because it helps keep me focused on doing the minimal effort
to ensure I'm writing a quality solution, rather than wasting time polishing a document.

As the size and complexity of a feature grows, so does the amount of pre-writing required, especially when multiple developers are going to be collaborating
on a feature. Here are some tips to keep the documentation lightweight in these circumstances:

1. When the number of collaborators is small (~2-4 people), the pre-writing serves as an artifact proving that the people who are going to be writing
the feature have talked about it and are on the same page about how they're going to do it. The discussion and general agreement is what's important here,
not a perfect, polished document.
1. Keep in mind that in the writing process, pre-writing is an umbrella term. It provides example methods like outlines, but there are many different ways
to get your thoughts organized. Similarly with a complex feature, don't think writing a design document is the only form of pre-writing available.
Writing prototype code is another great type of pre-writing. Consider writing the interface of a key API and some sample client code. Or use an online
mockup tool to create simple UI mockups. Whatever it takes to help you and any other collaborators to understand what you're planning to build.

## User Documentation

User documentation is different than design documentation in that it has a higher bar for completeness. If I'm writing code for a product or library that
is going to be used outside of my team, writing good user documentation has several benefits. It increases adoption rates by improving users' initial
experience with your product/library. It also adds a degree of polish to your project, which can increase users' confidence that your code actually works.

However the principle of Just-in-Time Documentation can still be applied to user documentation in the following ways:

1. Don't write user documentation until you actually have users! Everyone wants to believe they're writing the next Spring framework, however until you
actually have users, spend your time making the software work well.
1. Start with a modest amount of documentation. For most github projects, a well-written README is enough. "Complete" documentation doesn't mean a full
user manual. It means you put care into the documentation you do write. Scale your documentation appropriately based on the number of users.
1. Write your documentation for the right audience. Writing documentation for a developer library? A pom.xml, build.gradle and some sample code might be
all you need.

## Conclusion

Hopefully this helps dispell the myth that Agile is synonymous with "no documentation." Documentation is an important piece of writing quality software, but
it should be limited to only what's necessary and appropriate, given the size and complexity of the task at hand. Just-in-Time Documentation is my strategy
for accomplishing this.

Give it a try and let me know what you think!
