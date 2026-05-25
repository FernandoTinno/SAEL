class QueueNode:
    def __init__(self, valor):
        self.valor = valor
        self.next = None


class Queue:
    def __init__(self):
        self.front = None
        self.rear = None
        self._size = 0

    def enqueue(self, valor):
        novo_no = QueueNode(valor)

        if self.is_empty():
            self.front = novo_no
            self.rear = novo_no
        else:
            self.rear.next = novo_no
            self.rear = novo_no

        self._size += 1

    def dequeue(self):
        if self.is_empty():
            return None

        no_removido = self.front
        self.front = self.front.next
        self._size -= 1

        if self.front is None:
            self.rear = None

        return no_removido.valor

    def is_empty(self):
        return self.front is None

    def size(self):
        return self._size

    def to_list(self):
        itens = []
        atual = self.front

        while atual:
            itens.append(atual.valor)
            atual = atual.next

        return itens


class Node:
    def __init__(self, valor):
        self.valor = valor
        self.next = None


class LinkedList:
    def __init__(self):
        self.head = None
        self._size = 0

    def add_start(self, valor):
        novo_no = Node(valor)
        novo_no.next = self.head
        self.head = novo_no
        self._size += 1

    def add_end(self, valor):
        novo_no = Node(valor)

        if self.head is None:
            self.head = novo_no
            self._size += 1
            return

        atual = self.head
        while atual.next:
            atual = atual.next

        atual.next = novo_no
        self._size += 1

    def is_empty(self):
        return self.head is None

    def size(self):
        return self._size

    def to_list(self):
        itens = []
        atual = self.head

        while atual:
            itens.append(atual.valor)
            atual = atual.next

        return itens
