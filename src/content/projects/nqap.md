---
title: 'Project: Netques Application Platform'
date: 2023-04-24
slug: nqap
share:
  title: 'Project: Netques Application Platform'
  description: Some description of the thing
  image: /nqap/nqap-jumbo.png
---

![NQAP Main logo](/nqap/nqap-jumbo.png)

When the pandemic started slowing down and we were coming off of the Pandemic Relief project [LINK], we decided to move that platform to the next level: A second iteration where we could support any grant and loan application. Bank loans, student loans, PHD grants, government refunds, etc. Whatever process requied an application and review, we wanted to be able to support it.

For those not familiar with the original project (which I assume is everybody), the oversimplified tl;dr is: The platform allows applicants to fill out a form indicating why they are in need of the relief money. The reviewers will review the case and grant the money, ask for more info or reject the application.

With this new version we wanted to support almost any process. So the focus for this project was on extensibility. After all, different processes different wishes. What works for a student union, probably won't work for a bank. 

This was by far the biggest project I had ever lead, or even worked on. So let's stop and think about the designs before jumping head-first into it.

![A very related image of a person doing work](/nqap/office-worker.png)

## The design phase

The basics were simple. Every project (or 'form' as we decided to call it) should have its own questions, presentation and review. This is effectively just a configuration file stored in the database. But we're creating for the future. And the future is uncertain! So `interfaces` was the name of the game. An interface for questions, one for review blocks, another one for event hooks, there's one for data validations, etc. 

So once we are done with our basic functionalities, it should be trivial to add a new question type, another validation, some custom actions that happens after submission and much, much more. 

When we went live, we had about five different question types. At the time of writing we are already up to twenty! We started with three types of review blocks, where we now have ten. Custom logic event hooks have expanded even more than that.

During the design phase we had bi-weekly meetings about the state of the design document. The structure of getting that design done was: I write a bunch of stuff that seems like good ideas to me. Then we have a meeting, and (smart) people tear it apart, rinse, repeat. You want some technical people for this, as things tend to get a bit abstract at times. The key is not to try and spec everything out into too much detail, but definitely think about it enough to avoid painting yourself into a corner. This is where my team and their varying specialties really shine. 

## The GDPR-Compliant Tech Stack

So now the design is done, great! How are we going to host it? Our clients are mainly in the EU. On top of that they are in the education, government and financial sector. You better belief there's a whole host of lawyers and data protection officers you need to satisfy. 

![A typical Data Protection Officer](/nqap/angry-german-dpo.png)

Compliance, privacy and security were not mere suggestions. They were first-class citizens in the project. So how do you set-up a GDPR-compliant tech stack? Well, step 1: Let go of any hope of ever using anything like AWS, GCP, Digital Ocean, and any other cloud service or hosting provider that's not headquartered inside of the EU. Hosting data anywhere outside the EU is just a non-starter. Using companies that have their HQ outside the EU is already problematic. 

Tangent: Specifically companies headquartered in the US, are an immediate no-go. The US's privacy laws are so bad that after years of EU-US negotiations (see: Safe Harbor Framework, and Privacy Shield Frameworks as a good starting point) eventually the EU has just given up on the US regarding private data. So if anyone wants to back us in setting up a GDPR-compliant AWS-clone in the EU, hit me up.

I personally feel strongly about privacy protections as well. I was born for this challenge. I also love open source software. Especially when privacy is concerned, if I can't see what your code is doing, then how am I supposed to trust it? So that means, OSS all the way, baby!

Aside: Yes, the code of both the Pandemic Relief project and NQAP are also proprietary, however in our defense: the former has already been through an independent audit, and the latter surely will follow at some point.

### Infrastructure: Open source and Open standards

Kubernetes! It's about time we throw in some buzzwords. We host all our stuff on Kubernetes clusters. Object Storage is done on S3-compatible storage. As a database Mysql and MariaDB have my heart (there's room for Postgres as well). The worker queue is powered by RabbitMq. Authentication is done with Keycloak. Everything is hosted by our GDPR compliant MSP with whom we have a contract about data protections.

### The code stack

The front-end runs... *drumroll* Angular! 

I know, I know, calm down. Everybody loves to hate on Angular. Often myself included. But when we started this project, it was the framework I was most comfortable with by far and could execute the fastest in. So it made sense. And still I think it's a pretty decent framework. 

The opinionated nature of Angular makes it rather easy to onboard new developers. Unlike React, where there's a million ways of doing the same thing (including a lot of terrible ways), Angular is pretty straight forward in how it works. Any Angular project you'll see, you'll be able to work with fairly quickly. (Also it was created by a slightly less evil company than React.) Nowadays my front-end framework-not-a-framework of choice is Sveltekit. 

The back-end runs NestJs. In combination with Angular on the front-end I think this actually makes a lot of sense. Both frameworks have _very_ similar paradigms with regards to components, sevices, dependency injection, etc. So if you know Angular, NestJs is pretty easy.

Sure, it would've been great to build the back-end in Go or Rust, but again knowledge, experience, and speed were serious considerations in this decision.

Our application isn't a compute-heavy one, so not choosing the most efficient language is fine. NestJs and Node scale quite nicely horizontally. So in a Kuberneter cluster, this works great. When we outgrow our bridges with NestJs I'll be happy to port the whole thing over to Rust.

## We are live!

The platform has been live for close to a year now! We've been constantly adding new features such as new question types, statistics, more review functions, more complex workflows, external identity verifications, etc. We won't be slowing down any time soon!

