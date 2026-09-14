# Pousada Leão Azul

Site da Pousada Leão Azul — Capitólio, Minas Gerais.

Site estático em HTML, CSS e JavaScript, sem build e sem dependências.

## Páginas

| Página | Conteúdo |
|---|---|
| `index.html` | Início, com busca de disponibilidade |
| `pousada.html` | Sobre a pousada, diferenciais, avaliações e FAQ |
| `capitolio.html` | Atrativos da região e experiências |
| `galeria.html` | Galeria de fotos com filtro por categoria |
| `localizacao.html` | Endereço, mapa, como chegar e contato |
| `reservas.html` | Solicitação de reserva (datas + pessoas) |

## Como editar

Quase tudo que muda com o tempo — contato, endereço, regras, avaliações e
perguntas frequentes — fica em um único arquivo: **`assets/js/dados.js`**.

Para trocar uma foto, basta salvar o arquivo em `assets/img/` com o nome
esperado. Nenhuma página precisa ser editada.

**As instruções completas estão em [LEIA-ME.md](LEIA-ME.md).**

## Rodar localmente

```bash
python -m http.server 5173
```

Depois acesse `http://localhost:5173`.
