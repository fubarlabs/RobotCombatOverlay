"""
Event structure:

    type: user, update

"""

import asyncio
import websockets
import json
import logging

logging.basicConfig()

USERS = set()
VALUE = ""

def users_event():
    return json.dumps({'type': 'users', 'count': len(USERS)})

async def stream_overlay(websocket):
    global USERS, VALUE
    try:
        # register and announce user
        USERS.add(websocket)
        websockets.broadcast(USERS, users_event())

        # send current state to user, currently a placeholder
        # await websocket.send(f"current saved value: {VALUE}")

        # manage state changes
        async for message in websocket:
            VALUE = message
            # websockets.broadcast(USERS, f"new value: {VALUE}")
    
    finally:
        # unregister user
        USERS.remove(websocket)
        websockets.broadcast(USERS, users_event())

async def main():
    async with websockets.serve(stream_overlay, 'localhost', 8001):
        await asyncio.Future()

if __name__ == '__main__':
    asyncio.run(main())