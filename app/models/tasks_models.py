from fastapi import status, HTTPException
from datetime import datetime

from app.models.database.session_db import get_db_session
from app.models.database.models import Tasks
from app.models.user_models import UserModels



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
                created_at=datetime.now(),
                due_date=datetime.now()
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
            check.updated_at = datetime.now()
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