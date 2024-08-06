from fastapi import APIRouter, status, Depends
from app.controllers.user_controller import UserController
from app.schemas.user_schemas import MetadaUser
from app.services.create_token_services import validation_token

user_routers = APIRouter(prefix='/task-schedule/api', tags=['Users'])

@user_routers.post('/user', status_code=status.HTTP_201_CREATED, tags=['Users'])
def create(metadata: MetadaUser):
    return UserController().create_user(metadata)

@user_routers.get('/user/{email}', status_code=status.HTTP_200_OK, tags=['Users'])
def read(email: str, current_user: str = Depends(validation_token)):
    return UserController().read_user(email)

@user_routers.put('/user/{email}', status_code=status.HTTP_200_OK, tags=['Users'])
def update(email: str, metadata: MetadaUser):
    return UserController().update_user(email, metadata)

@user_routers.delete('/user/{email}', status_code=status.HTTP_201_CREATED, tags=['Users'])
def delete(email: str):
    return UserController().delete_user(email)