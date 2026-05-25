from estruturas import LinkedList, Queue


def demonstrar_fila():
    fila_espera = Queue()

    fila_espera.enqueue("Diogo")
    fila_espera.enqueue("Fernando")
    fila_espera.enqueue("Gabriel")

    print("Fila de espera:", fila_espera.to_list())
    print("Primeiro atendido:", fila_espera.dequeue())
    print("Fila após atendimento:", fila_espera.to_list())


def demonstrar_lista_encadeada():
    historico = LinkedList()

    historico.add_end("Emprestimo do livro Dom Casmurro")
    historico.add_end("Emprestimo do livro A Dança dos Dragões")
    historico.add_start("Cadastro do membro Raphael")

    print("Historico do membro:", historico.to_list())


if __name__ == "__main__":
    demonstrar_fila()
    demonstrar_lista_encadeada()
