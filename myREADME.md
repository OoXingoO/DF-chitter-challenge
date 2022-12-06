Chitter Challenge
=================
### Getting started - *dependencies installed*:
---
#### **Client side**:
- `npx create-react-app` - to create React application
- `npm install` - to install all dependencies
- `npm install -g json-server` - to install JSON server
- `npm i axios dotenv` - use axios to obtain data from JSON server
- `npm i --save react-router-dom@latest` - install react router

#### **Server side**:
- `npm init` - to initialise folder as npm project
- `npm i -g nodemon` - allows edits without having to stop & start application over again
- `npm install --save express dotenv` - to setup Express web application framework to build a basic web server && install dotenv for environmental variable loading
- `npm i --save-dev mocha` - Mocha testing framework
- `npm i --save-dev chai chai-http` - extended assertion library with http integration
- `npm i cors` - cross origin resource sharing npm package
- `npm i body-parser` - creates middleware for handling json req.body
- `npm i mongoose` - Mongoose provide interaction between server & MongoDB


### Standard Acceptance Criteria
```
As a trainee software engineer
So that I can let people know what I am doing  
I want to post a message (peep) to chitter

As a trainee
So that I can see what others are saying  
I want to see all peeps in reverse chronological order

As a trainee
So that I can better appreciate the context of a peep
I want to see the time at which it was made

As a trainee
So that I can post messages on Chitter as me
I want to sign up for Chitter

As a trainee
So that only I can post messages on Chitter as me
I want to log in to Chitter

As a trainee
So that I can avoid others posting messages on Chitter as me
I want to log out of Chitter
```

Additional requirements:
------

* You don't have to be logged in to see the peeps.
* Trainee software engineers sign up to chitter with their email, password, name and a username (e.g. ewithers@digitalfutures.com, password123, Edward Withers, dearshrewdwit).
* The username and email are unique.
* Peeps (posts to chitter) have the name of the trainee and their user handle.
* Your README should indicate the technologies used, and give instructions on how to install and run the tests.

### Extended Acceptance Criteria

```
As a trainee
So that I can stay constantly tapped in to the shouty box of Chitter
I want to receive an email if I am tagged in a Peep

As a trainee
In order to start a conversation as a DFA trainee Software Engineer
I want to reply to a peep from another trainee.
```
