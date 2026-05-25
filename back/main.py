from biblioteca import SistemaBiblioteca


sistema = SistemaBiblioteca()

sistema.cadastrar_livro("Dom Casmurro", "Machado de Assis", 1899, 1)
sistema.cadastrar_membro("Diogo", "M001")
sistema.cadastrar_membro("Fernando", "M002")
sistema.cadastrar_membro("Gabriel", "M003")

print(sistema.emprestar_livro("Dom Casmurro", "M001"))
print(sistema.emprestar_livro("Dom Casmurro", "M002"))
print(sistema.emprestar_livro("Dom Casmurro", "M003"))

livro = sistema.buscar_livro("Dom Casmurro")
membro_diogo = sistema.buscar_membro("M001")
membro_fernando = sistema.buscar_membro("M002")
membro_gabriel = sistema.buscar_membro("M003")

print("Disponiveis:", livro.disponiveis)
print("Fila de espera:", [membro.nome for membro in livro.fila_espera.to_list()])
print("Historico Diogo:", membro_diogo.historico.to_list())
print("Historico Fernando:", membro_fernando.historico.to_list())
print("Historico Gabriel:", membro_gabriel.historico.to_list())

print(sistema.devolver_livro("Dom Casmurro", "M001"))

print("Disponiveis:", livro.disponiveis)
print("Fila de espera:", [membro.nome for membro in livro.fila_espera.to_list()])
print("Livros do Fernando:", membro_fernando.livros_emprestados)
print("Historico Fernando:", membro_fernando.historico.to_list())
print("Historico Gabriel:", membro_gabriel.historico.to_list())
