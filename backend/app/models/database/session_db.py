from contextlib import contextmanager
from backend.app.models.database.connection import SessionLocal

@contextmanager
def get_db_session():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()