from fastapi import APIRouter
from app.controllers.user_controller import UserController

routers = APIRouter(prefix='/task-schedule/api/', tags=['Users'])

@routers.get('/user', tags=['Create users'])
def check(metadata: MetadaUser):
    return UserController.create_user(metadata)