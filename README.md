# Projeto SAEL - Sistema de administração e empréstimo de livros

### Integrantes:

Diogo Queiroz da Silva  
Fernando Tinno Venceslau  
Gabriel Alves Saran Audácio  

### Tecnologias:

Back-end: Python (FastAPI)  
Front-end: React (Vite)

> **Obs.:** Os dados ficam em memória (não há banco de dados). Ao reiniciar o
> back-end, os cadastros voltam ao estado inicial.

# Funcionalidades

- Cadastro de livros e de membros
- Empréstimo e devolução de livros (limite de 2 livros por membro)
- Fila de espera (estrutura de fila) para livros indisponíveis
- Histórico de atividades por membro (lista encadeada)
- Busca de livros por título ou autor e ordenação do acervo por título (A–Z / Z–A)

# Instruções para executar o projeto

> É necessário rodar o **back-end** e o **front-end** ao mesmo tempo, em
> terminais separados.

## 1. Clonar o repositório

```bash
git clone https://github.com/FernandoTinno/SAEL.git
cd SAEL
```

## 2. Back-end (Python / FastAPI)

Em um terminal:

```bash
cd back

# (opcional) criar e ativar um ambiente virtual
python -m venv .venv
# Windows:
.venv\Scripts\activate
# Linux/Mac:
source .venv/bin/activate

# instalar dependências
pip install fastapi "uvicorn[standard]"

# iniciar a API em http://localhost:8000
uvicorn api:app --reload --port 8000
```

## 3. Front-end (React / Vite)

Em outro terminal:

```bash
cd front

# instalar dependências
npm install

# iniciar a aplicação em http://localhost:5173
npm run dev
```

## 4. Acessar a aplicação

Abra no navegador:

```
http://localhost:5173
```

# Observações

- Certifique-se de que o **Node.js** e o **Python** estejam instalados.
- O front-end consome a API em `http://localhost:8000`; mantenha o back-end em
  execução enquanto usa a aplicação.
