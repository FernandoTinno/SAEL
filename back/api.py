from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Permite que o React (rodando em outra porta) faça requisições para o FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mocks em memória (Listas normais do Python). 
# Quando o Bloco 1 ficar pronto, você trocará isso pelas estruturas criadas pelo seu grupo.
MOCK_LIVROS = []
MOCK_MEMBROS = []

class Livro(BaseModel):
    titulo: str
    autor: str
    ano: int
    quantidade: int

class Membro(BaseModel):
    nome: str
    identificador: str

@app.post("/livros")
def cadastrar_livro(livro: Livro):
    MOCK_LIVROS.append(livro.model_dump())
    return {"status": "sucesso", "mensagem": f"Livro '{livro.titulo}' cadastrado!"}

@app.get("/livros")
def listar_livros():
    return MOCK_LIVROS

@app.post("/membros")
def cadastrar_membro(membro: Membro):
    MOCK_MEMBROS.append(membro.model_dump())
    return {"status": "sucesso", "mensagem": f"Membro '{membro.nome}' cadastrado!"}

@app.get("/membros")
def listar_membros():
    return MOCK_MEMBROS