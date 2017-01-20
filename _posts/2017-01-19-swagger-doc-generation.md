---
layout: single
title:  "Swagger Document Generation without Launching a Webserver"
tags: ['swagger','jaxrs','rest']
---

I just spent a ridiculously long time trying to figure out how to use [swagger-core](https://github.com/swagger-api/swagger-core) to generate
a swagger document from JAX-RS annotated Java classes. All I was able to find via Google were pages like [this](http://dev.haufe.com/generate-swagger/)
that talk about how easy it is and then only show examples of launching a swagger application, which provides a webserver endpoint that provides
a generated swagger document. However they don't give an example of just generating the document as a string for use in code without having to
stand up a webserver.

So in the hopes that this will save someone else the headache I just went through, here's the code required to generate a swagger document from a
JAX-RS annotated class in yaml or json format.

{% gist jlhood/b335859ebea41192ef2cfdec735576c6 %}

`Reader.read()` also accepts a `Set` of classes as input if you want to generate a single swagger document from multiple resource classes.

You're welcome, Internets. :-P
