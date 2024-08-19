from fastapi import status, HTTPException
from sqlalchemy.exc import IntegrityError


from app.models.database.session_db import get_db_session
from app.models.database.models import Category

class CategoryModels(Category):
    
    def get_category_id(self, id: int):
        with get_db_session() as db:
            return db.query(Category).filter_by(id=id).first()
    
    def get_category(self, category: str):
        with get_db_session() as db:
            return db.query(Category).filter_by(category=category).first()
        
    
    def create_category(self, metadata: dict):
        with get_db_session() as db:
            
            check = self.get_category(str(metadata.category).upper())
            
            if check is not None:
                raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=f"Category: {metadata.category} already registered")
            
            task = Category(
                category=str(metadata.category).upper()
                )
            db.add(task)
            db.commit()
            return {"message": "Category added successfully"}
