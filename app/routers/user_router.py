from fastapi import APIRouter, status
from app.controllers.user_controller import UserController
from app.schemas.user_schemas import MetadaUser

user_routers = APIRouter(prefix='/task-schedule/api', tags=['Users'])

@user_routers.post('/user', status_code=status.HTTP_201_CREATED, tags=['Users'])
def create(metadata: MetadaUser):
    return UserController().create_user(metadata)

@user_routers.get('/user/{email}', status_code=status.HTTP_200_OK, tags=['Users'])
def read(email: str):
    return UserController().read_user(email)

@user_routers.put('/user/{email}', status_code=status.HTTP_200_OK, tags=['Users'])
def update(email: str, metadata: MetadaUser):
    return UserController().update_user(email, metadata)

# @user_routers.delete('/user', status_code=status.HTTP_201_CREATED, tags=['Users'])
# def delete(metadata: MetadaUser):
#     return UserController().create_user(metadata)