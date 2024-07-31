from app.models.database.models import User
from app.models.database.session_db import get_db_session


class UserModels:
    
    def check_user(self, email):
        pass
    
    def create_user(self, metadata):
        with get_db_session() as db:
            
            user = User(
                name=metadata.name,
                email=metadata.email,
                password=metadata.password,
                account_status=True
                )
            db.add(user)
            db.commit()
            
            return {"message": "User added successfully"}
        
        
    def read_user(self, user_email):
        pass
    
    def update_user(self, user_id, new_password):
        pass
    
    def delete_user(self, user_id):
        pass


