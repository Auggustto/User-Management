from fastapi import status, HTTPException
from app.models.database.models import User
from app.models.database.session_db import get_db_session
from app.services.password_services import hash_password


class UserModels:
    
    def check_user(self, email: str):
        with get_db_session() as db:
            return db.query(User).filter(User.email == email).first()
    
    
    def create_user(self, metadata: dict):
        with get_db_session() as db:
            
            check = self.check_user(metadata.email)
            
            if check is not None:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"E-mail: {metadata.email} already in use")
            user = User(
                name=metadata.name,
                email=metadata.email,
                password=hash_password(metadata.password),
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

    
    def update_user(self, email: str, metadata: dict):
        with get_db_session() as db:
            
            check_email = self.check_user(email)
            check_new_email = self.check_user(metadata.email)
            
            if check_email is None:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"User with email: {email} not found")
            
            elif check_new_email is not None:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"E-mail: {metadata.email} already in use")
            
            else:
                check_email.name=metadata.name,
                check_email.email=metadata.email,
                check_email.password=metadata.password,
                db.add(check_email)
                db.commit()
                return {"message": "User update successfully"}
            
    
    def delete_user(self, email: str):
        with get_db_session() as db:
            
            check = self.check_user(email)
            if check is None:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"User with email: {email} not found")
            
            check.account_status=False
            db.add(check)
            db.commit()
            return {"message": "User deletede successfully"}


