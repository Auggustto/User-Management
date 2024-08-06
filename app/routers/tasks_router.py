from fastapi import APIRouter, status, Depends
from app.controllers.user_controller import UserController
from app.schemas.tasks_schemas import MetadaTasks
from app.services.create_token_services import validation_token

tasks_routers = APIRouter(prefix='/task-schedule/api', tags=['Tasks'])

@tasks_routers.post('/task', status_code=status.HTTP_201_CREATED, tags=['Tasks'])
def create(metadata: MetadaTasks):
    return UserController().create_user(metadata)