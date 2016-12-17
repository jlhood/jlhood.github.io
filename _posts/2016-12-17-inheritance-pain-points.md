---
layout: single
title:  "Inheritance Pain Points"
tags: ['OOP','inheritance','composition','anti-patterns']
excerpt: "I recently read [this excellent DZone article](https://dzone.com/articles/is-inheritance-dead) by Nehme Bilal, 
detailing why inheritance is a poor choice for extending an object's functionality and how the decorator pattern 
is superior. Nehme gives an example of how using inheritance for extension in a language that does not support 
multiple inheritance can cause a combinatorial subclass explosion. This is a decent example, however honestly, in 
practice, I don't think developers run into this problem often enough to make them stop using inheritance for 
this purpose. Also, the decorator solution can cause a proliferation of interfaces throughout your code, which 
can get cumbersome. I think the more general design principle of preferring composition to inheritance serves as 
better guidance than \"use decorator everywhere.\" 

In this post, I'll bring up a recent, concrete example of where the use of inheritance as an extension point caused 
real pain and the change I made to address it. This involved replacing the use of inheritance with composition without 
using the decorator pattern."
---

I recently read [this excellent DZone article](https://dzone.com/articles/is-inheritance-dead) by Nehme Bilal,
detailing why inheritance is a poor choice for extending an object's functionality and how the decorator pattern
is superior. Nehme gives an example of how using inheritance for extension in a language that does not support
multiple inheritance can cause a combinatorial subclass explosion. This is a decent example, however honestly, in
practice, I don't think developers run into this problem often enough to make them stop using inheritance for
this purpose. Also, the decorator solution can cause a proliferation of interfaces throughout your code, which
can get cumbersome. I think the more general design principle of preferring composition to inheritance serves as
better guidance than "use decorator everywhere."

In this post, I'll bring up a recent, concrete example of where the use of inheritance as an extension point caused
real pain and the change I made to address it. This involved replacing the use of inheritance with composition without
using the decorator pattern.

A project I'm working on is using [Dropwizard metrics](http://metrics.dropwizard.io/3.1.0/) (formerly Codahale
metrics) for capturing and reporting software metrics. We're publishing our metrics to
[AWS CloudWatch](https://aws.amazon.com/cloudwatch/), so I was excited to find [BlackLocus](http://blacklocus.com/)
had already written a [CloudWatch Reporter](https://github.com/blacklocus/metrics-cloudwatch).

The CloudWatchReporter class not only supports translating Dropwizard metrics to CloudWatch metric data, it also allows
you to access CloudWatch-specific features through the existing Dropwizard metrics interface. For example, you can encode
CloudWatch dimensions into your metric name, which is very cool!

This all looked great until I looked under the hood and realized that the CloudWatchReporter class extends
[ScheduledReporter](http://metrics.dropwizard.io/3.1.0/apidocs/com/codahale/metrics/ScheduledReporter.html), a
convenience class provided by Dropwizard metrics for periodically reporting metrics on a background thread according
to a pre-defined schedule. 

{% gist jlhood/285ad648cd99e67f09cda938dfdc531b %}

This tightly couples all of that great CloudWatchReporter functionality I wanted to use to a ScheduledReporter. This
was a problem for me because I'm working on an application where I want metrics logged *per-request*, not according
to some pre-defined time-based schedule. To make matters worse, this is for a serverless application that executes in an
[AWS Lambda](https://aws.amazon.com/lambda/) function. So using ScheduledReporter with its background threads is a
really bad idea since, with serverless, there's no guarantee that the lambda function's container will continue to exist
after the request is complete.

To address this problem, I ended up forking the metrics-cloudwatch package and refactoring it so CloudWatchReporter is
now a standalone reporter. This decouples all of that great CloudWatchReporter functionality from ScheduledReporter. I
also added a ScheduledCloudWatchReporter convenience class, which essentially takes the place of the previous
CloudWatchReporter:

{% gist jlhood/340b04605f5459a5f5cd219e8f807565 %}

Note that ScheduledCloudWatchReporter takes a CloudWatchReporter as a constructor arg (composition) and delegates to it
to actually report the metrics to CloudWatch.

Yay! Now I can use CloudWatchReporter in my serverless app to report metrics per-request. Other users can use
ScheduledCloudWatchReporter if they want periodic metrics logging. I had submitted
[an issue](https://github.com/blacklocus/metrics-cloudwatch/issues/20) to BlackLocus on this,
but didn't hear back, so I went ahead and published [my fork](https://github.com/jlhood/metrics-cloudwatch) to Maven
Central for others to use. Since the new changes are not backwards-compatible with BlackLocus' metrics-cloudwatch, I
updated the major version to 1.0.0 and removed a lot of deprecated stuff.

It should be noted that I didn't completely eliminate inheritance from the solution. ScheduledCloudWatchReporter still
extends ScheduledReporter. This is because Dropwizard metrics' abstract ScheduledReporter class forces the use of
inheritance in order to use ScheduledReporter. I think this was a poor choice on the part of Dropwizard metrics when
implementing ScheduledReporter and should be considered the root cause of the problem. If I get around to it, I'll send
them a proposal PR to address it, however maintaining backwards-compatibility is tricky with these kinds of changes,
unfortunately.

Hopefully this post helps show a real-world example of where inheritance used as an extension point for objects can
cause some real pain and how composition can address the problem.

Do you have examples where inheritance has caused you similar pain? Think I could have solved it better? Let me know
in the comments.
