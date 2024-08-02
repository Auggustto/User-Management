from fastapi import status, HTTPException
from datetime import timedelta
from typing import Annotated
from datetime import datetime, timedelta, timezone

import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from passlib.context import CryptContext



from app.models.user_model import UserModels
from app.services.password_services import validation_password



class UserLoginModels(UserModels):

    def create_access_token(self, data: dict, expires_delta: timedelta | None = None):
    
        # to get a string like this run:
        # openssl rand -hex 32
        SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
        ALGORITHM = "HS256"

        to_encode = data.copy()
        if expires_delta:
            expire = datetime.now(timezone.utc) + expires_delta
        else:
            expire = datetime.now(timezone.utc) + timedelta(minutes=15)
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
        return encoded_jwt

    # @catch_exceptions
    def user_login(self, metadata):
        
        user = super().check_user(metadata.email)
        ACCESS_TOKEN_EXPIRE_MINUTES = 30

        if user:
            
            ### Validation password ###
            if validation_password(password=metadata.password, password_registred=user.password):
                
                ### Create token ###
                access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
                access_token = self.create_access_token(
                    data={"sub": user.name}, expires_delta=access_token_expires
                )
                return {"email": metadata.email, "token": access_token}
            
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Email or password is incorrect")