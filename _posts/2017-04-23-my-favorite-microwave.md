---
layout: single
title:  "My Favorite Microwave"
tags: ['design']
---

I recently read [this blog post](https://delighted.com/blog/the-microwave-curse), which describes how microwaves have gotten caught in the trap of adding features that no one needs while usability for the core use cases suffers. Not only do I agree, but it reminded me of my absolute favorite microwave I've ever used...

I was fresh out of college working at IBM, and they had microwaves in the break area for heating up lunches. Most of them were fairly standard microwaves, however one microwave stood out from all the rest. In addition to the usual buttons, it had a monochrome LCD display with 8 soft keys around it.

When you first plugged the microwave in, it would boot up and a little black and white animation of a chef would appear on the LCD display and *bow to you*. Then you would have to step through a welcome wizard introducing features of the microwave. The usual things like defrosting/cooking different types of meat were there, but it also had features I'd never seen on a microwave. For example, it came with recipes stored in it that you could search through. Once out of the welcome wizard, the LCD display was used for a complex menu system with all kinds of options.

The best part? The physical start button on the microwave was broken.

![facepalm](/images/face-palm-picard.jpg)

But not to worry, there was a workaround! You could also start the microwave by stepping through *just a few* menu screens using the soft keys.

![double facepalm](/images/double-face-palm.jpg)

I loved this microwave and thought it should be installed in every break area used by engineers to serve as the perfect example of overengineering the crap out of something. It seems so ridiculous when you look at the end result, but it can be so easy to overengineer a solution, especially in software, where requirements are often unclear and fluid.

I'm definitely not immune to overengineering, however the primary tool I've found that helps prevent it is [domain-driven design](https://en.wikipedia.org/wiki/Domain-driven_design). Most of my up front design time is spent breaking a problem down into a set of domain objects with clearly defined responsibilities. If you do this well, you can solve the immediate problem at hand, but also create a design that is flexible to handle future requirements, either by slightly modifying existing domain objects or adding new ones. While this is a simple concept, it is definitely not easy to do consistently and requires a lot of practice.

Do you have any overengineering stories? What are your tips for preventing it?
