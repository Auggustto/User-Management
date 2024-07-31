from app.models.user_model import UserModels


class UserController(UserModels):
    
    def create_user(self, metadata):
        return super().create_user(metadata)