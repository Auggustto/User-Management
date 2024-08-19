from fastapi import APIRouter, status, Depends
from app.controllers.category_contoller import CategoryController
from app.schemas.category_schemas import MetadaCategory
from app.services.create_token_services import validation_token

category_routers = APIRouter(prefix='/task-schedule/api', tags=['Category'])

@category_routers.post('/category', status_code=status.HTTP_201_CREATED, tags=['Category'])
def create(metadata: MetadaCategory, current_user: str = Depends(validation_token)):
    return CategoryController().create_category(metadata)

@category_routers.get('/category/{id}', status_code=status.HTTP_200_OK, tags=['Category'])
def read(id, current_user: str = Depends(validation_token)):
    return CategoryController().read_category(id)