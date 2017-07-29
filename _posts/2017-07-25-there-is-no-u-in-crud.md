---
layout: single
title:  "There is No U in CRUD"
tags: ['rest','swagger','crud','design']
---

REST is built around the concept of resources, represented as URIs. Making an HTTP call specifying an HTTP verb and a resource URI takes an action on the specified resource. Most REST frameworks provide generators where you specify a resource name, and the framework generates scaffolding around it. Unfortunately, many of these generators use the CRUD model (Create, Read, Update, Delete) as the default starting point. The resource is defined as a bag of attributes, using something like JSONSchema or a language-specific data object definition and then method stubs are generated to create, read, update and delete that resource.

While it's good to give developers a starting point to work from, I have a big problem with using CRUD as that starting point for an API. The U in CRUD is my least favorite, although I'm not fond of the other letters, depending on the use case. But let's talk about U. Generic update methods allow the client to update any field of the resource and then overwrite the existing version with the new version. However, if you allow clients to do this, your service API provides little value on top of whatever underlying datastore it's using. One of the key value-adds of a service layer is enforcing business constraints on top of the underlying data, and resources *always* end up having business constraints.

But can't we add business constraints to our update method? Let's use a simple bank account resource as an example and see what happens. First, clients shouldn't be able to call an API and just update their account balance to whatever they want. There might be a minimum balance for the account. Ok, so you add some checks to the update method such that if the account balance value is changed, it must be within a specified range. Problem solved? Well, no, not really. Any balance adjustment should be recorded as some kind of transaction, right? Was this a credit? A debit? A transfer? What if the client tries to change the account number? Is this allowed at all? Could that break other data relationships? It's not hard to see how your update method implementation can quickly turn to spaghetti code the more questions we ask. I've seen teams go down this path where their code tries to infer what the intent of the client is from which fields are changed, and the code ends up a total mess.

So what's the alternative? Personally, I'm a big fan of [Domain-Driven Design (DDD)](https://en.wikipedia.org/wiki/Domain-driven_design) for designing any kind of API. DDD is based around the idea that software should be modeled after the real-world problem being solved. It creates a language for describing software in terms of key business objects called *Entities* or *Aggregates*. It also defines terms such as *Services*, *Value Objects*, and *Repositories*, which work together to solve problems in a particular business domain, or *Bounded Context* in DDD terms. You don't have to use REST to use DDD, however, I find it works especially naturally with REST APIs, because REST resources map very well to DDD entities.

So what does all this mean? **It means your API should be centered around domain objects and the *business operations* they provide**. Business operations are the key alternative to the generic update method and all of its pitfalls. Let's use the banking example from earlier to illustrate.

For a banking API, an obvious domain object (or entity in DDD terms) is an account, which models a bank account. Rather than following the CRUD model for accounts, we should define specific business operations that make sense to perform on a bank account. Here's a good starter set of write operations:

1. Open - open a new account.
1. Close - close an existing account.
1. Debit - remove money from an account.
1. Credit - add money to an account.

These operations are specific and can enforce certain business constraints. For example, we may not want to allow crediting a closed account, and we can enforce our minimum balance check as part of the debit operation. On the read side, we can also provide specific queries that match our client use cases:

1. Load - load single account by its account id.
1. Transaction history - list transaction history for an account.
1. Customer accounts - list accounts for the given customer id.

Now that we know what our business operations are, here's an example of mapping them to a REST API:

1. POST /account - open a new account.
1. PUT /account/&lt;accountId&gt;/close - close an existing account.
1. PUT /account/&lt;accountId&gt;/debit - remove money from an account.
1. PUT /account/&lt;accountId&gt;/credit - add money to an account.
1. GET /account/&lt;acountId&gt; - load single account by its account id
1. GET /account/&lt;accountId&gt;/transactions - list transaction history for an account.
1. GET /accounts/query/customerId/&lt;customerId&gt; - list accounts for the given customer id.

This looks a lot different than a basic CRUD API, but the key is that the operations allowed are specific and well-defined. This results in a better experience, both for the service implementor, as well as the client. The service implementation no longer has to guess what business operation is implied based on which attributes are updated. Instead, the business operation is explicit, which leads to simpler, more maintainable code. On the client side, it's much clearer exactly what operations can and cannot be performed. If the API is documented well, for example, using a [Swagger](https://swagger.io/) definition, it will also be very clear what the constraints of each API are.

Defining your APIs this way requires more up front thinking than a simple CRUD generator, but I think this is a very good thing. If you're planning on exposing your API as a public endpoint, you are going to have to support that API for a very, very long time. Basically think of it as forever by software standards. I always encourage teams to take time up front on the things that are hard to change later, and APIs are the first example I give.

So resist the urge to follow the CRUD model for service APIs (REST or otherwise). Instead, use DDD to define your API in terms of domain objects and the business operations that can be performed against them.

If you want to see more examples of defining APIs in terms of domain objects, I recommend checking out the Amazon Web Services APIs. Look up the developer guide for any service and they should start with a section labeled "Key Concepts" or something similar. There, they describe the conceptual domain objects of the service. For example, S3 defines objects like Buckets, Objects, and Permissions. Kinesis has streams and shards. Once you understand the domain objects of a service, look at the API reference and skim the list of APIs for that service. What you'll notice is the API is built around these domain objects, making it more intuitive to understand and use.

Hope this helps!
