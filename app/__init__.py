from fastapi import FastAPI

### import schemas of routers ###
from app.routers.start import routers
from app.routers.user_router import user_routers
from app.routers.login_router import user_login_routers



app = FastAPI()

### include all routers ###
app.include_router(router=routers)
app.include_router(router=user_routers)
app.include_router(router=user_login_routers)

