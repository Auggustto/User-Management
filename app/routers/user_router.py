from fastapi import APIRouter, status
from app.controllers.user_controller import UserController
from app.schemas.user_schemas import MetadaUser

user_routers = APIRouter(prefix='/task-schedule/api', tags=['Users'])

@user_routers.post('/user', status_code=status.HTTP_201_CREATED, tags=['Users'])
def check(metadata: MetadaUser):
    return UserController().create_user(metadata)