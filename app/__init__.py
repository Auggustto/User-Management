from fastapi import FastAPI

### import schemas of routers ###
from app.routers.start import routers

app = FastAPI()

### include all routers ###
app.include_router(router=routers)