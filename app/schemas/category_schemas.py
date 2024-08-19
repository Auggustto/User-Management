from pydantic import BaseModel, field_validator

class MetadaCategory(BaseModel):
    
    category: str
