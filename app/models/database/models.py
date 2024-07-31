from sqlalchemy import Integer, String, Column, DateTime, Boolean, LargeBinary, ForeignKey, func
from sqlalchemy.orm import relationship
from app.models.database.base import Base

class Company(Base):
    __tablename__ = 'user'
    
    id = Column(Integer, primary_key=True)
    name = Column(String, unique=False)
    email = Column(String(30), unique=True, nullable=False)
    password = Column(String, nullable=False)
    account_status = Column(Boolean, nullable=False)
    
    def as_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "account_status": self.account_status
        }
