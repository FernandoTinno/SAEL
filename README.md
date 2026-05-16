# Projeto SAEL - Sistema de administração e empréstimo de livros

### Integrantes:

Diogo Queiroz da Silva  
Fernando Tinno Venceslau  
Gabriel Alves Saran Audácio  

### Tecnologias:

Back-end: Python(FastApi)  
DB: PostgreSQL  
Front-end: React

# Instruções para executar o projeto

*Obs:*  Sujeito a alterações

## Clonar o repositório

```bash
git clone https://github.com/FernandoTinno/SAEL.git

```
## Configurar ambiente virtual
```bash
python -m venv venv
```
## Ativar ambiente virtual
```bash
venv\Scripts\activate
```
## Linux / macOS
```dash
source venv/bin/activate
```
## Instalar dependências
```bash
pip install -r requirements.txt
```
## Configurar banco de dados PostgreSQL
```bash
# Criar banco de dados PostgreSQL
# Configurar variáveis de ambiente no arquivo .env
```
## Executar o projeto
```bash
uvicorn main:app --reload
```
## Acessar a aplicação
```bash
http://localhost:8000
```
## Documentação da API
```bash
http://localhost:8000/docs
```

---

# Front-end (React)

## Acessar a pasta do front-end

```bash
cd frontend
```

## Instalar dependências do React

```bash
npm install
```

## Executar o front-end

```bash
npm run dev
```

## Acessar aplicação React

```bash
http://localhost:5173
```

---

# Observações

```bash
# Certifique-se de que o Node.js esteja instalado
# Certifique-se de que o PostgreSQL esteja em execução
# Execute o back-end e o front-end simultaneamente
```