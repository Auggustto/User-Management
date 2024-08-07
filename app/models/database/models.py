from sqlalchemy import Integer, String, Column, DateTime, Boolean, LargeBinary, ForeignKey, func
from sqlalchemy.orm import relationship
from datetime import datetime
from app.models.database.base import Base
from app.services.get_current_date_and_time_br_services import format_datetime


class User(Base):
    __tablename__ = 'user'
    
    id = Column(Integer, primary_key=True)
    name = Column(String, unique=False)
    email = Column(String(30), unique=True, nullable=False)
    password = Column(String, nullable=False)
    account_status = Column(Boolean, nullable=False)
    
    tasks = relationship("Tasks", back_populates="user")
    
    def as_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "account_status": self.account_status,
            "tasks": [task.as_dict() for task in self.tasks]
        }
        

class Tasks(Base):
    __tablename__ = 'tasks'

    id = Column(Integer, primary_key=True)
    tags = Column(String(15), unique=False)
    title = Column(String(50), unique=False)
    description = Column(String, unique=False)
    user_id = Column(Integer, ForeignKey('user.id'), nullable=False)
    status = Column(String, unique=False)
    created_at = Column(DateTime, nullable=False)
    due_date = Column(DateTime, nullable=False)
    updated_at = Column(DateTime, nullable=True)
    
    user = relationship("User", back_populates="tasks")
    
    def as_dict(self):
        return {
            "tags": self.tags,
            "title": self.title,
            "description": self.description,
            "user_id": self.user_id,
            "status": self.status,
            "created_at": self.created_at,
            "due_date": self.due_date,
            "updated_at": self.updated_at
        }