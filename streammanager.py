import asyncio
import websockets
import json
import logging

logging.basicConfig()

USERS = set()
VALUE = ""

def users_event():
    return json.dumps({'type': 'users', 'count': len(USERS)})

def value_event():
    return json.dumps({'type': 'value', 'value': VALUE})

async def stream_overlay(websocket):
    global USERS, VALUE
    try:
        # register user
        USERS.add(websocket)
        websockets.broadcast(USERS, users_event())

        # send current state to user, currently a placeholder
        await websocket.send(value_event())

        # manage state changes
        async for message in websocket:
            event = json.loads(message)
            if event['type'] == 'update':
                VALUE = event['value']
                print(f'Updated the value to {VALUE}')
                websockets.broadcast(USERS, value_event())
            else:
                logging.error(f'unsupported event: {event}')
    
    finally:
        # unregister user
        USERS.remove(websocket)
        websockets.broadcast(USERS, users_event())

async def main():
    async with websockets.serve(stream_overlay, 'localhost', 8001):
        await asyncio.Future()

if __name__ == '__main__':
    asyncio.run(main())