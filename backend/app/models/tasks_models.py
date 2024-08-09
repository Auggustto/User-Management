from fastapi import status, HTTPException

from backend.app.models.database.session_db import get_db_session
from backend.app.models.database.models import Tasks
from backend.app.models.user_models import UserModels
from backend.app.services.get_current_date_and_time_br_services import get_current_time



class TasksModels(UserModels):
    
    def check_user(self, email: str):
        return super().check_user(email)
    
    def check_task(self, id: int):
        with get_db_session() as db:
            return db.query(Tasks).filter(Tasks.id == id).first()
    
    
    def create_task(self, email: str, metadata: dict):
        with get_db_session() as db:
            
            check = self.check_user(email)
            
            if check is None:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"E-mail: {metadata.email} not found.")
            task = Tasks(
                tags=metadata.tags,
                title=metadata.title,
                description=metadata.description,
                user_id=check.id,
                status=metadata.status,
                created_at=get_current_time(),
                due_date=get_current_time()
                )
            db.add(task)
            db.commit()
            return {"message": "Task added successfully"}
        
    
    def read_task(self, id: int):
        check = self.check_task(id)
        
        if check is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Task with id: {id} not found.")
        return check.as_dict()
    
    
    def update_task(self, id: int, metadata: dict):
        with get_db_session() as db:
            
            check = self.check_task(id)
            
            if check is None:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Task with id: {id} not found.")
            
            check.tags = metadata.tags
            check.title = metadata.title
            check.description = metadata.description
            check.status = metadata.status
            check.updated_at = get_current_time()
            db.add(check)
            db.commit()
            return {"message": "Task updated successfully"}
        
        
    def delete_task(self, id: int):
        with get_db_session() as db:
            
            check = self.check_task(id)
            
            if check is None:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Task with id: {id} not found.")
            
            db.delete(check)
            db.commit()
            return {"message": "Task deleted successfully"}