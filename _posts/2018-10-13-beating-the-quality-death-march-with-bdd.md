---
layout: single
title:  "Beating the Quality Death March with BDD"
tags: ['quality','testing']
---

I have yet to meet a software developer or manager who would disagree with the statement, "We should build quality software." However, ensuring quality can feel like an uphill battle. I used to have this [Despair.com](https://despair.com/) poster in a frame on my desk, but it unfortunately got lost during one of the many building moves that happen when you work at Amazon. 😂

[![Despair.com: Quality](/images/quality.png)](https://despair.com/products/quality)

I've come a long way in my career when it comes to software quality. At my first job, we didn't even write automated tests *at all*. Every change was tested manually at the time you developed it *\*shudder\**. I think it's because I've seen that side of software development that I've become such a huge quality advocate. Now, I've led multiple teams at Amazon to develop critical services and web UIs where each commit goes through a full continuous deployment pipeline with automated unit and integration tests and other safeguards to ensure quality all the way to production, so I have a lot to say on the subject.

What I wanted to cover today is a common developer question I get: How do you ensure integration tests get written for your software?

At this point, most teams/companies are on board with writing unit tests. It's relatively easy to enforce a rule on your team that all functional changes must include unit test changes in the same commit/PR. While code coverage is not a perfect metric, it is a decent measurable indicator that this policy is being enforced.

However, unit tests alone [are](https://twitter.com/thepracticaldev/status/845638950517706752) [just](https://twitter.com/thepracticaldev/status/892788721350836225) [not](https://twitter.com/thepracticaldev/status/852508104914874369) [enough](https://twitter.com/thepracticaldev/status/687672086152753152). Ensuring integration tests are written can be tricky though. The key problem is you usually can't test a service or website until you've built enough of it to process an end-to-end request. If you don't think carefully about how you're going to structure the delivery of the features of your product, you can end up saving all integration tests until the very end of the project where it's common for them to get deprioritized due to deadlines.

I wanted to share a solution to this problem that I've tried on multiple teams and have found to be extremely effective in solving this problem: Behavior-Driven Development (BDD).

## What is BDD?

BDD is a development methodology derived from Test-Driven Development (TDD) that focuses on defining feature requirements in terms of concrete scenarios *before* developing the solution, then turning those scenarios into executable tests that verify the solution meets the requirements.

Let me give you an example. Let's say you're writing a simple banking service that allows you to open accounts and make deposits and withdrawals. You might receive a bullet-list of requirements for this service, e.g.,

1. Users can open and close a checking or savings account with an initial balance.
1. Users can deposit or withdraw money from an open account as long as they don't overdraw the account.
1. Savings accounts have a minimum balance of $100.
1. ...

These high-level requirements are a starting point, but when you use BDD, the next step is to break up this project into features and then write detailed scenarios for each feature using simple language that can be read and understood by both developers and key stakeholders. For example, the above requirements would be described in the following feature file:

```gherkin
Feature: Basic Account operations
  As a customer
  I want to be able to open checking and savings accounts, and credit and debit my accounts
  So I can buy stuff online^H^H^H^H^H save my money

Scenario: Customer creates a checking account
  When the customer opens a checking account with a $0 balance
  Then a new checking account should be created
  And the checking account should have a balance of $0

Scenario: Customer creates a savings account with the minimum balance
  When the customer opens a savings account with a $100 balance
  Then a new savings account should be created
  And the savings account should have a balance of $100

Scenario: Customer creates a savings account with less than the minimum balance
  When the customer opens a savings account with a $50 balance
  Then the call should fail

Scenario: Customer credits their account
  Given the customer has a checking account with a $0 balance
  When the customer credits their checking account $10
  Then the checking account should have a balance of $10

Scenario: Customer debits their account
  Given the customer has a checking account with a $50 balance
  When the customer debits their checking account $10
  Then the checking account should have a balance of $40
...
```

The format for these scenarios is very simple. The only real structure is that steps starting with the word "Given" are preconditions or assumptions, steps starting with "When" are the action that's taken, and steps starting with "Then" are assertions on side effects of the actions taken. "And" can be used to chain multiple steps together.

Once the feature files are reviewed and approved, you build the feature. After that, tools like [Cucumber](https://cucumber.io/) allow you to map each step in the feature file to a function in code and run the feature file as an executable test. Put a step in your CI/CD pipeline to execute the feature file and you now have automated acceptance tests for your feature that are run everytime you make a change to your codebase!

## Why BDD works

Like I said, I've used BDD on multiple teams now and it's been incredibly effective. Here's what I like about it:

First, writing the feature files increases collaboration, ensuring developers, management, and key stakeholders are all on the same page about what the expected behavior of the system should be *before* it's built. The feature file example I gave above may seem simple to write, but you'd be surprised how many questions come up while trying to write one. Developers are awesome at thinking of all kinds of hairy edge case scenarios, and having to write them out drives requirements clarification questions back to management/stakeholders. This removes a lot of wasted time and effort lost due to requirement misunderstandings that are very expensive to fix later in the process. I find after management has been through a few cycles of this, they love it, because they have confidence that their team is building the right thing and it will work (and continue to work!) once it's built.

Second, it gives developers a systematic way to ensure automated integration tests are actually written. With unit tests, you set a rule that tests should be written for each commit/PR. With integration tests, you set a rule that tests should be written for each feature. Break your project into small, incremental features, and now you are ensuring integration tests are written incrementally as the software is developed.

With both management and developers seeing benefits, you don't get in situations where you deprioritize integration tests, because priority discussions happen at the *feature level* and writing integration tests is incremental rather than being this giant, insurmountable task at the very end of the whole project when you're feeling pressure to launch.

## BDD Pitfalls

Hopefully at this point, I've made the benefits of BDD pretty clear. Maybe you're interested in trying it on your own team. Great! I highly recommend it. However, I've also used this in practice on several teams and wanted to cover some common pitfalls to watch out for when going down this path.

### Pitfall 1: Features are too big

Since integration tests are written for each feature, in order to develop integration tests incrementally, you have to break down projects into multiple features. This practice has many other benefits as well, so I recommend it regardless of whether you're using BDD or not, but for BDD specifically, if your "feature" is the whole product or project, then you're back in the same boat of saving writing integration tests until the very end where they're likely to get cut due to time pressure.

So if you go to write the feature file and it feels like a daunting, never ending task, your feature is probably too big and needs to be further broken down. If you're practicing Scrum, think of a feature as something that should fit inside of a sprint. If you're not practicing Scrum, my team's sprints are 2 weeks, so you can use that amount of time as a guideline. 😊

### Pitfall 2: Using BDD for unit tests

The first book I read on BDD was [BDD in Action](https://www.amazon.com/BDD-Action-Behavior-driven-development-lifecycle/dp/161729165X/ref=sr_1_1?ie=UTF8&qid=1539442121&sr=8-1&keywords=bdd+in+action). It does a great job of explaining the benefits I describe above in more detail. However, it also advocates for not only using BDD at the acceptance test level as I describe above but at the unit test level as well. There are many things I enjoyed about that book, but I think using BDD at the unit test level is a complete waste of time.

When you think about it, what you're doing with BDD is maintaining a mapping between a human-readable description of how your software should work and the code that actually ensures it works this way. There is overhead in maintaining this mapping, but it's worth it *as long as someone other than a developer reads the human-readable description*. Why would a manager/stakeholder waste their time reading a feature file at the unit test level? They shouldn't, since they should be more concerned that the system behavior meets the requirements and less concerned about the low-level implementation details. I've also never seen developers read feature files at the unit test level, because it's usually easier for them to read the test code itself. So these mappings are being maintained for absolutely no benefit. Just don't do it.

### Pitfall 3: Having non-developers write feature files

Many BDD books advocate for this idealized world where product managers or stakeholders write the feature files directly. I think the idea is it will force them to actually think through the detailed requirements before handing them to developers. I've never seen this actually work in practice. While the feature file language may seem very open-ended and expressive to a developer, it is still a pretty constraining format for a product manager to use, and they tend to be much more comfortable writing actual prose in a document editor like Word.

Also, as I'll cover below, since scenario steps have to map to executable code, writing feature files becomes a bit of an art where you not only specify requirements, but do it in such a way that the underlying step implementations are maintainable. A product manager will quickly become frustrated when developers code review their feature file and have all kinds of comments related to implementation of the feature scenario steps and fewer comments about the actual scenario content.

Finally, I think having developers translate requirements documents into feature files really helps them internalize the requirements of the feature. It also empowers them to ask many questions about different edge case scenarios that the product team may not have considered. If a developer was just handed a feature file, they may not scrutinize it or think through it the same way they do when they write it themselves.

### Pitfall 4: Scenarios contain too many low-level details

When developers write feature files, they're also thinking about the underlying step implementations. Tools like Cucumber provide rich features for parameterizing steps, even allowing tables of data to be passed into a step implementation function. It's very tempting as a developer to try to minimize duplication in the step implementation functions by pushing more details into parameters which show up in your feature file.

I recommend using the step parameters feature of Cucumber *very sparingly* and to *never* use more advanced features like data tables. You should optimize for readability of the feature files by non-developers, which usually means pushing lower level, superfluous details about the scenario down into the step implementation. Do yourself (and your management/stakeholders) a favor and DON'T write scenarios like this:

```gherkin
# Don't do this!
Scenario: Customer creates a checking account
  When the customer opens an account with the following data
  | First Name | Last Name | Type     | InitialBalance |
  | This       | Sucks     | CHECKING | 0.00           |
  Then the new account should have the following data
  | First Name | Last Name | Type     | Balance |
  | This       | Sucks     | CHECKING | 0.00    |
```

Hopefully it's clear that all this additional detail takes away from the readability of the scenario. While precise, your product manager and stakeholders' eyes will glaze over as they try to parse the meaning out of the unnecessary details.

### Pitfall 5: Step implementations can turn into spaghetti code

Good patterns for step implementations is probably worth a separate blog post, but I'll try to condense this down to the essentials. BDD tools allow each step in a scenario to map to a function call. However, for a given scenario, it's very common that the steps need data that was collected in a previous step. This means your functions will have to share data between them. Ok so maybe you can make a class to hold your step definition functions and use instance variables to share the data between functions. However, you usually want to group your step definitions into separate logical groups so you don't have a single monster class full of step definitions, and you'll inevitably end up writing scenarios that use steps spanning more than one class. So basically, you need some global data that's shared between step implementation functions. If you don't have an organized way to manage this global data, and instead set it somewhat randomly as you implement steps, you're going to end up with a spaghetti mess that's very difficult to maintain.

The solution I've found to work well is to have a single class that manages writing the global data. It can be read from within any step implementation function, but it's only written in one specific place. For example, when using BDD to test service APIs, I create a proxy class that wraps calls to that service. The proxy class saves any relevant information that may be needed by step implementation functions. Here's an example of what that might look like in Java:

```java
public class BankingServiceProxy {
    private final BankingService service;

    // ...

    public void openAccount(OpenAccountRequest request) {
        BankAccountTestData.clearLastException();
        BankAccountTestData.setOpenAccountRequest(request);
        try {
            OpenAccountResponse response = service.openAccount(request);
            BankAccountTestData.setAccountId(response.getAccountId());
            BankAccountTestData.setOpenAccountResponse(response);
        } catch (Exception e) {
            BankAccountTestData.setLastException(e);
            // suppress exceptions. Step implementations will check last exception to assert on call failures
        }
    }

    // ...
}
```

Then your step implementation for `When the customer opens a checking account with a $0 balance` looks something like this (annotations are specific to Cucumber-JVM):

```java
public class AccountSteps {
    private final BankingServiceProxy proxy;

    // ...

    @When("the customer opens a (.*) account with a \\$(.*) balance$")
    public void the_customer_opens_an_account(String accountType, int initialBalance) {
        OpenAccountRequest request = new OpenAccountRequest()
            .withAccountType(accountType)
            .withInitialBalance(initialBalance);
        proxy.openAccount(request);
    }
}
```

Note that the step implementation leaves saving global data to the proxy class. Then later steps can perform verifications on the saved data:

```java
    @Then("a new (.*) account should be created")
    public void a_new_account_should_be_created(String accountType) {
        assertThat(BankAccountTestData.getLastException()).isNull();
        assertThat(BankAccountTestData.getOpenAccountResponse()).isNotNull();
        assertThat(BankAccountTestData.getOpenAccountResponse().getStatus()).isEqualTo(BankAccount.Status.OPEN);
        assertThat(BankAccountTestData.getOpenAccountResponse().getType()).isEqualTo(AccountType.valueOf(accountType.toUpperCase()));
        // ...
    }

    @Then("the call should fail")
    public void the_call_should_fail() {
        assertThat(BankAccountTestData.getLastException()).isNotNull();
    }
```

### Pitfall 6: Test slowness

As your suite of feature files grows, test run times can increase quite a bit. Frequently, the tests are doing similar setup/teardown operations, which can take time. I honestly haven't found a silver bullet solution to this problem, because at this point, the benefits of BDD still far outweigh issues of long-running acceptance tests enough that we haven't really dug into a good solution to this.

However, here are a few tips:

1. You can chain multiple When/Then groups into a single scenario to save on redundant test setup steps. Don't go so overboard with this that your feature file becomes one long scenario. I tend to favor separate scenarios, but sometimes it makes sense to combine them. Use judgement to make sure you're not compromising the readability of the feature file to non-developers.
1. Make your step implementation global data class thread safe and use unique test data for each scenario so you can run your scenarios in parallel. I haven't found a parallel test runner for Cucumber that I can just plug into our current build setup without much effort so I don't have a good recommendation there. If others do, please comment! A quick and dirty solution is to setup your automated CI/CD pipeline to run each feature file as a separate test run so they can be run in parallel.

## Conclusion

When used correctly, BDD is a very effective way to increase team collaboration, remove waste from the development process, and ensure integration tests are built incrementally along with every feature of a product. Hopefully this post sparks your interest in giving it a try!