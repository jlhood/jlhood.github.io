---
layout: single
title:  "Twitch Livestream on Serverless Applications"
tags: ['AWS','serverless','serverless-applications']
---

Last week I did my first [Twitch livestream](https://www.youtube.com/watch?v=85CHEaIDBag&t=13s) for AWS to get the word out about serverless applications. I had a lot of fun getting to share why I'm so excited about serverless applications, and why I think with the introduction of the new [AWS Serverless Application Repository](https://aws.amazon.com/serverless/serverlessrepo/
), serverless applications will become an important evolution in the way we write software. This blog entry is a summary of what was covered in the livestream to help spread the word.

But first... Full Disclosure: I am the tech lead of the Serverless Application Repository, but I solemnly swear marketing did not put me up to writing this. All opinions are my own and do not represent the opinions of Amazon, its partners or subsidiaries, blah blah blah, you get what I'm saying. Ok let's get to it!

## What is Serverless?

Since serverless is still a relatively new concept for many developers, let's level-set and briefly cover what it is. Building a serverless system means you use technologies where management of servers/hosts is abstracted away from you as the developer/operator. There are still servers behind the scenes of course, but the provider manages complexities like ensuring there are enough hosts to handle steady-state and peak loads, and the provider ensures operating systems are up to date with latest patches, etc. AWS kickstarted the serverless movement when they launched [AWS Lambda](https://aws.amazon.com/lambda/) in 2014 and [Amazon API Gateway](https://aws.amazon.com/api-gateway/) 2015, enabling both frontend and backend applications to be written without having to worry about host management at all.

## What is a Serverless Application?

The current definition of a serverless application is kind of [tautological](https://xkcd.com/703/) in that it is an application built entirely out of serverless technologies. While this is true, it doesn't capture what I think is really interesting and important about serverless applications. The [AWS Serverless Application Model (SAM)](https://github.com/awslabs/serverless-application-model) gets us closer to a workable definition. It defines a serverless application as a collection of cloud resources that don't require server management. So a serverless application is a collection of resources like AWS Lambda Functions, Amazon S3 Buckets, Amazon DynamoDB Tables, etc. There isn't really a requirement for which resources must be in a serverless application. For example, you can have a serverless application that does not contain any AWS Lambda Functions at all. However, you would not include an Amazon EC2 Instance in a serverless application.

## The AWS Serverless Application Repository

At re:Invent 2017, AWS announced the private preview launch of the [AWS Serverless Application Repository](https://aws.amazon.com/serverless/serverlessrepo/), which later became generally available in Febrary of 2018. The Serverless Application Repository allows you to discover, configure, and deploy serverless applications to your AWS account. You can also publish your own serverless applications for others to deploy.

Companies like Datadog, HERE, and Splunk have already published serverless applications to help customers more easily integrate with their products and services. I think this is a very smart way for businesses to use the Repository.

However, there is another type of serverless application that I am especially excited about and will devote the rest of this blog entry to: Serverless Applications can be used as generic, reusable components to save time building larger, more complex serverless applications. During the Twitch livestream, I talked through a few serverless applications I wrote to showcase the potential of this pattern.

## AWS Serverless SQS Event Source

One of the powerful things about AWS Lambda functions is their ability to be "triggered" by other AWS services. For example, putting an object to an Amazon S3 bucket or putting an item to a DynamoDB table can trigger your Lambda function to take some action asynchronously. While Lambda is integrated with many AWS services, one notable exception is Amazon Simple Queue Service (Amazon SQS). The [AWS Serverless SQS Event Source](https://github.com/awslabs/aws-serverless-sqs-event-source) serverless application fills this gap by providing an app you can deploy to poll an SQS queue you specify and invoke your Lambda function to process messages on that queue. Let's take a look at the application architecture:

![SQS Event Source App Architecture](https://github.com/awslabs/aws-serverless-sqs-event-source/raw/master/images/app-architecture.png)

1. The SQSPoller Lambda function is triggered every 1 minute by a CloudWatch Events Rule (think of it like a cloud-based cron).
1. If messages are received from the queue, the SQSPoller invokes the MessageProcessor Lambda function (given as a parameter when you deploy the application) to process a batch of messages.
1. The MessageProcessor function is expected to return a response indicating processing results of the message. Depending on the processing result, the SQSPoller will either delete the message from the queue (success case) or retry the message again later.

The use of a user-defined Lambda function as an extension point is very powerful. It allows the SQS Event Source app to stay generic and focused on handling interactions with the SQS queue, while delegating the application-specific message handling logic to the Lambda function you specify at deploy time. Another thing that's powerful about using Lambda in this way is that, although I decided to write this serverless application in Java, the MessageProcessor Lambda function provided by the user can be written in any language supported by the AWS Lambda runtime. The fact that I used Java is just an implementation detail that doesn't affect users of the app.

What I really like about this example is it shows that, although AWS's speed of feature delivery is incredibly fast, rather than waiting for AWS to fill in a feature gap, serverless applications empower you to fill the gap yourself! Then the Serverless Application Repository allows you to share your solution with others so they can benefit too. As this idea becomes more widespread, it'll become more and more likely that someone else may have already filled the gap for you and you can just use their app, further saving you time.

While filling in feature gaps is great, let's take a look at an example of an app that provides an event source for Lambda that AWS probably wouldn't ever support as a 1st party feature...

## AWS Serverless Twitter Event Source

The [AWS Serverless Twitter Event Source](https://github.com/awslabs/aws-serverless-twitter-event-source) app turns a Twitter search query into an AWS Lambda event source by invoking a given Lambda function to process tweets found. It works by periodically polling the freely available [Twitter Standard Search API](https://developer.twitter.com/en/docs/tweets/search/overview/standard) and invoking a Lambda function you provide to process any tweets returned. Let's take a look at its architecture:

![Twitter Event Source App Architecture](https://github.com/awslabs/aws-serverless-twitter-event-source/raw/master/images/app-architecture.png)

1. The TwitterSearchPoller Lambda function is periodically triggered by a CloudWatch Events Rule.
1. In stream mode, a DynamoDB table is used to keep track of a checkpoint, which is the latest tweet timestamp found by past searches.
1. The poller function calls the Twitter Standard Search API and searches for tweets using the search text provided as an app parameter.
1. The TweetProcessor Lambda function (provided by the app user) is invoked with any new tweets that were found after the checkpoint timestamp.
1. If stream mode is not enabled, the TweetProcessor Lambda function will be invoked with all search results found, regardless of whether they had been seen before.

This app is a little more complex due to the additional "stream mode" feature. However again, the key here is that the app is written in a generic way. You provide the search query text as a parameter to the app when you deploy it to your account. The app handles interactions with Twitter's Search API, but delegates the actual processing of the tweets returned to a Lambda function you specify. Your Lambda function can do whatever it wants with the tweets that are passed to it by the app.

## Retweet Leaderboard

In order to show an example of what you could do with a generic app like this, I decided to write a fun, interactive game that the Twitch viewers could play live. During the livestream, we asked our viewers who also had a Twitter account to tweet a specific tweet that had a certain combination of hashtags. The goal of the game was to get as many people as possible to retweet their tweet. The Twitter handles with the most retweets would appear on a leaderboard UI that was updating in realtime throughout the livestream. It was a fun way to engage with the Twitch audience, but more importantly, I built the [Retweet Leaderboard](https://github.com/jlhood/retweet-leaderboard) game as a serverless application that relies on the Twitter Event Source app to send it the latest tweets by players of the game. Here's the architecture of the Retweet Leaderboard app:

![Retweet Leaderboard App Architecture](https://github.com/jlhood/retweet-leaderboard/raw/master/images/app-architecture.png)

1. The AWS Serverless Twitter Event Source app periodically invokes the TweetProcessor Lambda function to process tweet search results.
1. The TweetProcessor updates the Leaderboard DynamoDB table with latest tweet counts for each Twitter user.
1. The UI makes a GET request to the LeaderboardApi, which invokes the GetLeaderboard Lambda function to return the latest results. Results are returned in leaderboard order where the largest number of retweets wins. If there is a tie in retweets, number of favorites is used as a tie-breaker.

This app was really fun to write and the audience seemed to enjoy the game. However, what I think is really powerful about this pattern is (1) this app does not need to interact with the Twitter Search API directly at all thanks to the Twitter Event Source app, and (2) it was insanely quick to write. I had the idea for the Retweet Leaderboard game literally the day before the Twitch broadcast while having breakfast with my kids. I went to work and had the initial version working that afternoon. Already having the Twitter Event Source app available really accelerated development of the Retweet Leaderboard game, which was really exciting.

## What's Next?

Hopefully at this point, you're as excited by the potential of serverless applications as I am. I know this is a big statement, but I honestly believe they have the potential to be the next evolution in the way we write software. While serverless technologies remove huge amounts of *infrastructure* complexity and *operational* burden from the developer, I believe serverless applications remove *application-level* complexity and *development* burden from the developer. This will bring us another big step towards being able to focus more and more time on the unique business logic of our applications by reducing the amount of generic integration logic we have to write.

My hope in writing the above apps is to inspire others to get involved and write more apps like these. As a community, we can unlock many different event sources for AWS Lambda, further increasing our ability to use it in our applications. We can also write serverless apps that solve common generic problems in serverless architectures (I hope to write more on this soon).

If you're interested in learning more, but aren't sure where to start, check out the Twitch livestream and then look at the apps I've written above. All 3 of them are open source and publicly available on the AWS Serverless Application Repository. If you look at the Retweet Leaderboard app, I include full installation instructions to allow you to deploy and recreate the game that we played on Twitch.

Let me know what you think!
