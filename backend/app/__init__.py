from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

### import schemas of routers ###
from app.routers.start import routers
from app.routers.user_router import user_routers
from app.routers.login_router import user_login_routers
from app.routers.tasks_router import tasks_routers


app = FastAPI()

# Lista de origens permitidas
origins = [
    "http://localhost:3000",  # Por exemplo, se o frontend estiver rodando nessa porta
    "http://localhost:8000",  # Se você estiver consumindo a API de uma outra aplicação rodando em localhost
]

# Configuração do CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Permitir todos os métodos (GET, POST, etc)
    allow_headers=["*"],  # Permitir todos os cabeçalhos
)

### include all routers ###
app.include_router(router=routers)
app.include_router(router=user_routers)
app.include_router(router=user_login_routers)
app.include_router(router=tasks_routers)


