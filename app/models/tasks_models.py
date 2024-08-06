from fastapi import status, HTTPException
from datetime import datetime

from app.models.database.session_db import get_db_session
from app.models.database.models import Tasks
from app.models.user_models import UserModels



class TasksModels(UserModels):
    
    def check_user(self, email: str):
        return super().check_user(email)
    
    
    def create_task(self, metadata: dict):
        with get_db_session() as db:
            
            check = self.check_user(metadata.email)
            
            if check is None:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"E-mail: {metadata.email} not found.")
            task = Tasks(
                tags=metadata.name,
                email=metadata.email,
                title=metadata.title,
                description=metadata.description,
                user_id=check.id,
                status=metadata.status,
                created_at=datetime.now(),
                updated_at=datetime.now()
                )
            db.add(task)
            db.commit()
            return {"message": "Task added successfully"}