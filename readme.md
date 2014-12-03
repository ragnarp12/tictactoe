Project Template for TicTacToe
=========

Getting started with this project template. After this you should have the project up-and-running on a Digital Ocean droplet server.

### DIGITAL OCEAN

Droplet server setup:

* Create account on [DigitalOcean](http://digitalocean.com)
  -- Use referral...
* Create or use existing SSH key (no passphrase)
* Create droplet (512mb, Ubuntu 14.04)
* Log into droplet via ssh
``` 
ssh root@<ipaddress>
``` 

* Follow instructions
  [Ubuntu Linux Setup](http://docs.docker.com/installation/ubuntulinux/)
  or run [script](https://github.com/stefaneg/tictactoe/blob/master/provisioning/production/server-init.sh) (untested).

When installing docker, use curl -ssL option

To establish ssh link (selecting SSH key did not work for me):

``` 
cat ~/.ssh/id_rsa.pub | ssh root@<ipaddress> "cat >> ~/.ssh/authorized_keys"
``` 


### DOCKER

Docker setup and installation

* MacOsX - install boot2docker. Follow [online instructions](https://docs.docker.com/installation/#installation).
  Windows - you must install a 64bit Linux VM and use that. Use Docker install instructions for your selected distro.
  boot2docker for windows does not work for the purposes of this project.
* Remember - docker only works in boot2docker console unless you add DOCKER… environment variables.
* Create account on docker.com, <yourname> refers to docker username

 
### GITHUB

* fork this project - clone fork to src/ruprojects/tictactoe directory, or where ever you keep your project sources.
* ensure you have latest node/npm
* edit dockerbuild.sh
  * line “docker build -t gulli/tictactoe ./dist/“
  * change gulli to <yourname>
* make sure docker is running (boot2docker)
* run 
``` 
npm install
bower install
./dockerbuild
``` 
* run 
``` 
docker push <yourname>/tictactoe"
```

On Digital Ocean server (production)

``` 
docker run -p 80:8080 -d -e "NODE_ENV=production" <yourname>/tictactoe
``` 

Navigate to http://yourServerIpAddress  and you should have yeoman landing page.


### Project backlog

*	Can update latest version in production (manually) (automatically to latest) ( by push of a button )
  
  Including changes to data structure.

* Can get feedback on failing tests and diagnostics .

  Commit stage / continuous integration.
    - Get grunt to run

*	Can play tic-tac-toe against another user.
  * Implement using TDD
  * Acceptance TDD
  * Controller TDD
  * DOM - TicTacToe directive with TDD
  * Server side, API TDD

*	Can play-back any given game to see how it was played.

  Use event sourcing - record every user interaction

*	Can get an email when I win a match.

  Implement an acceptance test, using test double to simulate email sending

*	Can downgrade to selected version by push of a button.

  Implement rollback, including down migrations

*	Can playback old games after data structure has changed.

  Database migration

*	Can see how many users played Tic-Tac-Toe in a given period.

  Metrics and monitoring

*	Can know how many users our application supports on given hardware.

  Automated capacity testing

*	Can be sure that latest version in production supports happy path after upgrade.

  Acceptance test through UI
  Acceptance test through API

*	Can update to latest version with zero downtime.

  Blue/Green deployment and testing

*	Can be sure that deployment is not continued if key resources are missing.

  Env smoke tests
  Auto rollback

*	Can be sure that deployment is not continued if configuration parameter is not set.

  Env smoke tests
  Auto rollback

*	Can continue playing even if the whole world is playing back games.

  CQRS - separate deployment for playback.
  
* Can play [Ultimate TicTacToe](http://mathwithbaddrawings.com/2013/06/16/ultimate-tic-tac-toe/)
  with another user.
  
  If you're done with all the rest and feel bored in the course.

  
=== More stories for consideration
  
* Can provision a new environment in cloud (Digital Ocean) with minimal input.
  Script server provisioning. [Droplet API](https://developers.digitalocean.com/#droplets)

### Useful grunt commands
``` 
grunt watch:mochaTest
``` 
 execute server side tests as soon as anything changes.
 
``` 
grunt test watch
``` 
 

#### Thursday 27.11
Goal is to run dockerbuild, upload to dockerhub. Create account and droplet on 
Digital Ocean, configure as a docker host and run tictactoe template project.
When you can open page on you digital ocean server, you're done.

#### Friday 28.11
Goal is to implement rudimentary Commit stage using Thoughtworks GO.
When you have task success in Go after running grunt and/or dockerbuild shell script,
you're done.

#### Monday 01.12
Goal is to finish first two stories in the backlog. A commit stage which fails on
tests, and deploy latest to production at the push of a button in Go build pipeline interface.
When you have a failing build due to test failure, and you can deploy to your Digital
Ocean server at the push of a button, you're done.

Hints: 

* Start with making sure you can execute each step successfully from the command line
before integrating into script and testing in build.
* Use [Karma JUnit Reporter](https://github.com/karma-runner/karma-junit-reporter) for 
integrating nicely with Go. Publish the test report using "Test Report" artifact type
in Go (under Job -> Artifacts tab).
* ./dockerbuild.sh must exit with failure if grunt fails, or if docker build fails. [Exit shell script based on exit code](http://stackoverflow.com/questions/90418/exit-shell-script-based-on-process-exit-code). 
  Good way to fail build is to modify a test to fail.
  
* You must have an .ssh key installed on the server. Use ssh command to execute necessary docker commands on Digital Ocean server.
* Do not include docker push in ./dockerbuild.sh
* Docker command order is kill, rm, pull, run. Use --name parameter to make this easy.
* Remember .dockercfg


If done early, start collecting examples to use for specifying your tic-tac-toe
game. Use an event-based approach rather than a state-based approach.



### Tuesday 02.12

Goal of the day is to finish collecting examples for the tic-tac-toe game, using
event based approach. When you have as good a list of examples as you think you
can do in a reasonable amount of time, start writing server side code using TDD
approach demoed today. Use code in stefaneg/tictactoe as a reference, do not copy.
Commit on each test pass. You're done when you have "game won" and "game draw" events
implemented.



