from app.models.user_model import UserModels
from app.services.validator_email_services import validation_format_email


class UserController(UserModels):
    
    def create_user(self, metadata):
        return super().create_user(metadata)
    
    def read_user(self, email: str):
        if validation_format_email(email):
            return super().read_user(email)
        
    def update_user(self, email: str, metadata):
        if validation_format_email(email):
            return super().update_user(email, metadata)
    
    def delete_user(self, email: str):
        if validation_format_email(email):
            return super().delete_user(email)