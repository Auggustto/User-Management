from app.models.category_models import CategoryModels

class CategoryController(CategoryModels):
    
    def create_category(self, metadata: dict):
        return super().create_category(metadata)
    
    def read_category(self, id: int):
        return super().create_category(id)