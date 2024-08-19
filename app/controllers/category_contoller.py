from app.models.category_models import CategoryModels

class CategoryController(CategoryModels):
    
    def create_category(self, metadata: dict):
        return super().create_category(metadata)
    
    def read_category(self, id: int):
        return super().read_category(id)
    
    def update_category(self, id: int, metadata: dict):
        return super().update_category(id, metadata)