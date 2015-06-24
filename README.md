# wsmax
Inspired by: http://www.jayway.com/2015/04/13/600k-concurrent-websocket-connections-on-aws-using-node-js/

## Why
How many concurrent connections can we maintain on an EC2 micro instance?

## How
[thor](https://github.com/observing/thor) vs [ws](https://github.com/websockets/ws).

## Test
If you're not actually moving data over the connections you have open, it's easy to open an extremely large number (10k+), even on a machince with limited resources. An example of how to use thor to generate a "realistic" test is included in package.json:

``` bash
$ npm test ws://my-url:5000
```

This tells thor to open 750 concurrent connections, each bouncing 30 256-byte messages to the server and back every ~1s. This seems to be about the limit of what a straight ec2 micro with 1G of ram can handle. You should adjust the flags to thor and the server response size / interval if your use case differs.
