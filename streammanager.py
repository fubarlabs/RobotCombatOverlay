"""
TOPICS

topic       | description
------------|-------------------------------------------------------------------------
botcontrol  | Arena controller sends match state
            | provides match state + time remaining (seconds) + match length (seconds)
------------|-------------------------------------------------------------------------
timecontrol | Send restart signal and time modifier to arena controller
            | format: r for reset, a<int> to add <int> seconds
------------|-------------------------------------------------------------------------
matchupdate | Match info
            | Needs to contain: weight class, red robot, blue robot, match type

"""
import robotdata

print(robotdata.robots.keys())