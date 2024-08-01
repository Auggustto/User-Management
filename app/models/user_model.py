from fastapi import status, HTTPException
from app.models.database.models import User
from app.models.database.session_db import get_db_session


class UserModels:
    
    def check_user(self, email):
        with get_db_session() as db:
            return db.query(User).filter(User.email == email).first()
    
    
    def create_user(self, metadata):
        with get_db_session() as db:
            
            check = self.check_user(metadata.email)
            
            if check is not None:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"E-mail: {metadata.email} already in use")
            user = User(
                name=metadata.name,
                email=metadata.email,
                password=metadata.password,
                account_status=True
                )
            db.add(user)
            db.commit()
            return {"message": "User added successfully"}

        
    def read_user(self, email: str):
        with get_db_session() as db:
            check = self.check_user(email)
            if check is None:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"User with email: {email} not found")
            return check.as_dict()

    
    def update_user(self, email, metadata):
        with get_db_session() as db:
            check = self.check_user(email)
            if check is None:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"User with email: {email} not found")
            user = User(
                name=metadata.name,
                email=metadata.email,
                password=metadata.password,
                account_status=True
                )
            db.add(user)
            db.commit()
            return {"message": "User update successfully"}
            
    
    def delete_user(self, user_id):
        pass


