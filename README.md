# CIRCUIT BREAKER DEMOSTRATION

Welcome to this project!

I would first like to explain what the heck this collection of code tries to accomplish.
This tries to demonstrate the [circuit-breaker](https://martinfowler.com/bliki/CircuitBreaker.html) pattern implmented by Netflix as [Hystrix](https://github.com/Netflix/Hystrix).
Hystrix's main use case, is to prevent execution of code that invokes inreliable services or hardware.
Things that are prone to timeouts, crashing under high load, low availablity, and the list can go on and on.
In general, Hystrix was made to protect your code for everybody else.
It also has the ability to notify when code, wrapped in a Hystrix circuit breaker, has opened the circuit and is sending canned responses or failiure, for each invokation.
Effectively re-routing all traffic away from the area that has failed.

What I have created is a constant stream of data that is piplined to the front-end application. 
The fun part is that part of the stream is routed through a trouble-maker.
The trouble maker can be in a state where all invokations throw an exception. 
In addition to being alway blowing up, the trouble maker can also have variable latency.
Meaning invocation time of the trouble maker's method can vary.

This is all done to allow simulation of a shoddy third party service. 
Code that is not mine, but can affect how my code performs. 
Effectivly making us look bad.

So all invocations are wrapped in a Hystrix Command.
In an attempt to demonstrate some of the functionality the circuit-breaker API provides.
The state of the HystrixCommand and HystrixThreadPool, will be displayed in the Hystrix Dashboard.

There are three controls:
    
1. Number of Requests synchronously queued to execute.
1. How long each synchronous request will take.
1. Wether or not each invokation will throw an exception.


As an example if the number of requests is set to 50 requests per second, and request latency is set to 500ms per request.
All you are really going to get is 2 requests per second.