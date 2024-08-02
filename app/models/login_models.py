from fastapi import status, HTTPException
from app.models.user_model import UserModels
from app.services.password_services import validation_password



class UserLoginModels(UserModels):
    
    # @catch_exceptions
    def user_login(self, metadata):
        
        check_user = super().check_user(metadata.email)
        
        if check_user:
            return {"email": metadata.email, "token": validation_password(password=metadata.password, password_registred=check_user.password)}
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Email or password is incorrect")