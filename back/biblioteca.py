from estruturas import LinkedList, Queue

class Livro:
    def __init__(self, titulo, autor, ano, quantidade):
        self.titulo = titulo
        self.autor = autor
        self.ano = ano
        self.quantidade = quantidade
        self.disponiveis = quantidade
        self.fila_espera = Queue()

class Membro:
    def __init__(self, nome, identificador):
        self.nome = nome
        self.identificador = identificador
        self.livros_emprestados = []
        self.historico = LinkedList()

class SistemaBiblioteca:
    def __init__(self):
        self.livros = LinkedList()
        self.membros = []

    def cadastrar_livro(self, titulo, autor, ano, quantidade):
        livro = Livro(titulo, autor, ano, quantidade)
        self.livros.add_end(livro)
        return livro

    def cadastrar_membro(self, nome, identificador):
        membro = Membro(nome, identificador)
        self.membros.append(membro)
        return membro

    def buscar_livro(self, titulo):
        for livro in self.livros.to_list():
            if livro.titulo == titulo:
                return livro
        return None

    def buscar_membro(self, identificador):
        for membro in self.membros:
            if membro.identificador == identificador:
                return membro
        return None

    def emprestar_livro(self, titulo_livro, identificador_membro):
        livro = self.buscar_livro(titulo_livro)
        membro = self.buscar_membro(identificador_membro)

        if livro is None:
            return "Livro nao encontrado."

        if membro is None:
            return "Membro nao encontrado."

        if len(membro.livros_emprestados) >= 2:
            return "Limite de 2 livros atingido."
            
        if livro.titulo in membro.livros_emprestados:
            return "Membro ja possui este livro."

        if livro.disponiveis > 0:
            livro.disponiveis -= 1
            membro.livros_emprestados.append(livro.titulo)
            membro.historico.add_end(f"Emprestou: {livro.titulo}")
            return "Livro emprestado com sucesso."

        livro.fila_espera.enqueue(membro)
        membro.historico.add_end(f"Entrou na fila: {livro.titulo}")
        return "Livro indisponivel. Membro entrou na fila de espera."

    def devolver_livro(self, titulo_livro, identificador_membro):
        livro = self.buscar_livro(titulo_livro)
        membro = self.buscar_membro(identificador_membro)

        if livro is None:
            return "Livro nao encontrado."

        if membro is None:
            return "Membro nao encontrado."

        if livro.titulo not in membro.livros_emprestados:
            return "Este membro nao esta com esse livro."

        membro.livros_emprestados.remove(livro.titulo)
        membro.historico.add_end(f"Devolveu: {livro.titulo}")

        while not livro.fila_espera.is_empty():
            proximo_membro = livro.fila_espera.dequeue()

            if len(proximo_membro.livros_emprestados) >= 2:
                proximo_membro.historico.add_end(
                    f"Pulado na fila (limite de 2 livros): {livro.titulo}"
                )
                continue

            proximo_membro.livros_emprestados.append(livro.titulo)
            proximo_membro.historico.add_end(f"Recebeu pela fila: {livro.titulo}")
            return f"Livro devolvido e emprestado para {proximo_membro.nome}."

        livro.disponiveis += 1
        return "Livro devolvido com sucesso."

    def listar_livros(self):
        return self.livros.to_list()

    def listar_membros(self):
        return self.membros