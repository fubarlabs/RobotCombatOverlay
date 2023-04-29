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
matchinfo   | Match info
            | Needs to contain: weight class, red robot, blue robot, match type

"""

# HOST = "192.168.1.138"

# Home Ethernet:
# HOST = "192.168.1.31"

# Phone Hotpost:
HOST = "192.168.68.131"

PORT = 1883

match_info = {
    "weight": "Weight Class",
    "red": "Red Robot",
    "blue": "Blue Robot",
    "match": "Match Name"
}

import paho.mqtt.client as mqtt
import json

def on_connect(client, userdata, flags, rc):

    print(f"Connected with result code {rc}")
    client.subscribe("timecontrol")
    client.subscribe("matchinfo")

def on_message(client, userdata, msg):
    global match_info
    print(f"Topic: {msg.topic} *** Payload: {msg.payload}")
    if msg.topic == 'matchinfo':
        print('Time to update the current match')
        match_string = msg.payload.decode("utf-8")
        match_info = json.loads(match_string)
    print(match_info)
        

client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message

client.connect(HOST, PORT, 60)

client.loop_forever()