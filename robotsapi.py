from fastapi import FastAPI
import robotdata
ROBOTS = robotdata.robots

app = FastAPI()



@app.get('/')
async def root():
    return "Welcome to my half-assed API for accessing robot namees"

@app.get('/{weight_class}')
async def read_weight_class(weight_class: str):
    return ROBOTS[weight_class]