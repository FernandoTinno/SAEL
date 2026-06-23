from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

try:
    from biblioteca import SistemaBiblioteca
except ImportError:
    from .biblioteca import SistemaBiblioteca


app = FastAPI()
sistema = SistemaBiblioteca()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Livro(BaseModel):
    titulo: str
    autor: str
    ano: int
    quantidade: int


class Membro(BaseModel):
    nome: str
    identificador: str


class Emprestimo(BaseModel):
    titulo_livro: str
    identificador_membro: str


def livro_para_json(livro):
    return {
        "titulo": livro.titulo,
        "autor": livro.autor,
        "ano": livro.ano,
        "quantidade": livro.quantidade,
        "disponiveis": livro.disponiveis,
        "fila_espera": [membro.nome for membro in livro.fila_espera.to_list()],
    }


def membro_para_json(membro):
    return {
        "nome": membro.nome,
        "identificador": membro.identificador,
        "livros_emprestados": membro.livros_emprestados,
        "historico": membro.historico.to_list(),
    }


@app.post("/livros")
def cadastrar_livro(livro: Livro):
    livro_cadastrado = sistema.cadastrar_livro(
        livro.titulo,
        livro.autor,
        livro.ano,
        livro.quantidade,
    )

    return {
        "status": "sucesso",
        "mensagem": f"Livro '{livro.titulo}' cadastrado!",
        "livro": livro_para_json(livro_cadastrado),
    }


@app.get("/livros")
def listar_livros(busca: str = "", ordem: str = ""):
    livros = sistema.buscar_livros(busca)

    if ordem in ("asc", "desc"):
        livros = sistema.ordenar_livros(livros, ordem)

    return [livro_para_json(livro) for livro in livros]


@app.post("/membros")
def cadastrar_membro(membro: Membro):
    membro_cadastrado = sistema.cadastrar_membro(
        membro.nome,
        membro.identificador,
    )

    return {
        "status": "sucesso",
        "mensagem": f"Membro '{membro.nome}' cadastrado!",
        "membro": membro_para_json(membro_cadastrado),
    }


@app.get("/membros")
def listar_membros():
    return [membro_para_json(membro) for membro in sistema.listar_membros()]


@app.post("/emprestimos")
def emprestar_livro(emprestimo: Emprestimo):
    mensagem = sistema.emprestar_livro(
        emprestimo.titulo_livro,
        emprestimo.identificador_membro,
    )

    return {"mensagem": mensagem}


@app.post("/devolucoes")
def devolver_livro(devolucao: Emprestimo):
    mensagem = sistema.devolver_livro(
        devolucao.titulo_livro,
        devolucao.identificador_membro,
    )

    return {"mensagem": mensagem}
