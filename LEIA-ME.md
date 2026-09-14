# Pousada Leão Azul — site

Site estático (HTML + CSS + JavaScript, sem build e sem dependências).
Envie a pasta inteira para qualquer hospedagem — Hostinger, Netlify, Vercel,
GitHub Pages, cPanel — e o site funciona.

---

## Estrutura: uma página por categoria

```
index.html          Início — hero, busca de disponibilidade, a pousada,
                    Capitólio e avaliações
pousada.html        A Pousada — sobre, diferenciais, avaliações e FAQ
capitolio.html      Capitólio — atrativos da região e experiências
galeria.html        Galeria — fotos com filtro por categoria
localizacao.html    Localização — endereço, mapa, como chegar e contato
reservas.html       Reservas — datas, pessoas e contato

assets/
  css/estilo.css    Toda a identidade visual
  js/dados.js       ← O ÚNICO ARQUIVO QUE VOCÊ PRECISA EDITAR
  js/fotos.js       Faz o site aceitar .jpg/.png/.webp sem editar HTML
  js/main.js        Comportamento geral (menu, galeria, FAQ, SEO)
  js/reservas.js    Fluxo de reserva
  img/              Imagens
```

O menu e o rodapé são iguais em todas as páginas e estão escritos direto no HTML
de cada arquivo (sem depender de JavaScript, o que é melhor para o Google).
**Se você mudar um item do menu, precisa mudá-lo nas 6 páginas** — busque pelo
trecho `<nav class="nav"` e pelo `<ul class="menu__lista">` em cada arquivo.

---

## 1. O que preencher antes de publicar

Abra `assets/js/dados.js`. Tudo marcado com `← PREENCHER` ainda está provisório:

| Item | Onde |
|---|---|
| Horário de check-in | `regras.checkin` |
| Horário de check-out | `regras.checkout` |
| Nota média real do Google | `avaliacaoResumo.nota` |
| Total de avaliações do Google | `avaliacaoResumo.total` |

Já preenchidos: WhatsApp, telefone, e-mail, Instagram, endereço, CEP,
coordenadas, links do mapa, estacionamento, crianças, animais e formas de
pagamento.

**Nada foi inventado.** Enquanto um campo estiver como `null`, o site mostra um
texto neutro e um botão para o visitante perguntar no WhatsApp — em vez de exibir
uma informação errada.

---

## 2. Trocar as fotos  ← é só arrastar o arquivo

**Você não precisa editar nenhuma página.** Salve a foto na pasta `assets/img/`
com o nome da tabela abaixo e ela aparece sozinha no site.

Aceita **`.webp`, `.jpg`, `.jpeg` e `.png`**. O site procura nessa ordem e usa o
primeiro que encontrar. Enquanto a foto real não estiver na pasta, ele mostra o
desenho `.svg` provisório — por isso o site nunca fica com imagem quebrada.

> Exemplo: para trocar a foto do topo, salve **`hero.webp`** em `assets/img/`.
> Pronto. Não precisa mexer no `.svg` que já está lá — ele deixa de ser usado
> sozinho. (Se preferir, pode apagá-lo depois.)

**O `.webp` é o formato preferido** — o arquivo fica de 30% a 40% menor que o jpg
com a mesma qualidade, e todos os navegadores atuais abrem. As páginas já apontam
para `.webp`, então esse formato é encontrado de primeira.

O `.jpg` continua funcionando normalmente. A única diferença é que ele custa uma
tentativa a mais por foto (o navegador procura o `.webp`, não acha, e vai no
`.jpg`). Se quiser eliminar isso, converta as fotos para webp em
[squoosh.app](https://squoosh.app).

Para inverter a preferência, edite a primeira linha de `assets/js/fotos.js`:

```js
var PREFERENCIA = ['webp', 'jpg', 'jpeg', 'png', 'svg'];
```

| Nome do arquivo | Onde aparece | Proporção |
|---|---|---|
| `hero` | Foto grande do topo da página inicial | horizontal 5:3 |
| `pousada` | Página inicial, A Pousada e resumo da reserva | 4:3 |
| `pousada-2` | Galeria (áreas comuns) | 4:3 |
| `quarto-1` | Galeria (acomodações) | 4:3 |
| `capitolio-cachoeira`, `capitolio-canions`, `capitolio-lago`, `capitolio-lancha`, `capitolio-mirante` | Página Capitólio e página inicial | variadas |
| `experiencias` | Seção de passeios, na página Capitólio | 16:10 |
| `galeria-1` a `galeria-10` | Galeria | variadas |
| `og-imagem` | Imagem que aparece ao compartilhar o link | 1200×630 |

Escreva o nome **exatamente** como está na tabela, tudo em minúsculas, sem
acento e sem espaço — só acrescente a extensão (`hero.webp`).

**Exceção — a imagem de compartilhamento.** O `og-imagem` precisa ser **`.jpg`**,
porque WhatsApp e Facebook nem sempre leem webp na prévia do link. Salve
`og-imagem.jpg` em 1200×630.

> Fotos horizontais em ~2000px de largura e verticais em ~1400px dão boa
> qualidade sem pesar. Comprima em [squoosh.app](https://squoosh.app) antes de subir.

**Para trocar as categorias da galeria** (Quartos, Café da manhã, Áreas comuns,
Fachada, Natureza), edite o atributo `data-cat` de cada foto em `galeria.html`.

---

## 3. Como funciona a reserva

A pessoa informa **as datas**, **quantas pessoas** vão e os **dados de contato**.
Não há escolha de quarto: a acomodação e o valor são confirmados por você,
conforme o tamanho do grupo e a disponibilidade.

São 5 etapas: Datas → Hóspedes → Seus dados → Resumo → Confirmação.

Ao enviar, o site monta uma mensagem já formatada e abre o WhatsApp da pousada
com tudo preenchido — datas, noites, número de pessoas, nome, telefone, e-mail
e observações.

O limite dos contadores fica em `dados.js`:

```js
hospedagem: {
  maxAdultos: 60,
  maxCriancas: 20,
},
```

A busca de disponibilidade da página inicial leva as datas e o número de pessoas
direto para o formulário, que já aparece preenchido.

---

## 4. Configurar o mapa

1. Abra o Google Maps e busque o endereço da pousada.
2. **Compartilhar → Copiar link** → cole em `endereco.googleMaps`.
3. **Compartilhar → Incorporar um mapa → Copiar HTML** → cole em `endereco.mapaEmbed`.
   Pode colar o **código `<iframe>` inteiro** ou só a URL que está dentro do
   `src="..."` — o site aceita as duas formas e extrai o endereço sozinho.
4. Para o botão "Como chegar":
   `https://www.google.com/maps/dir/?api=1&destination=ENDEREÇO+DA+POUSADA`

---

## 5. Avaliações

As 5 avaliações reais já estão em `dados.js`, reproduzidas exatamente como os
hóspedes escreveram. Para adicionar outra:

```js
avaliacoes: [
  { nota: 5, nome: 'Ana Paula', data: '2026-03-14',
    comentario: 'Texto exato da avaliação.', origem: 'Google' },
],
```

`data` e `origem` são opcionais — sem eles, o rodapé do cartão não aparece.

**Importante:** `avaliacaoResumo.nota` e `.total` hoje refletem só as 5
avaliações publicadas aqui. Troque pelos números reais do seu perfil do Google —
são eles que vão para os dados estruturados e podem virar estrelas na busca.

O campo `nomeAnterior` guarda "Pousada do Juninho", nome sob o qual o site
esteve no ar por um período. Ele só alimenta os dados estruturados (SEO), para
que quem procurar por esse nome ainda encontre a pousada. Apague quando não
fizer mais sentido manter a ponte entre os nomes.

O texto `avaliacoesObs` está `null`: ele existia para explicar por que as
avaliações do Google citavam um nome diferente do site. Como os dois voltaram a
ser "Pousada Leão Azul", não há mais divergência a explicar.

---

## 6. Perguntas frequentes

Em `dados.js`, na lista `faq`. Onde `resposta: null`, o site usa um texto neutro e
mostra um botão "Perguntar no WhatsApp". Troque o `null` pelo texto real para
responder de vez.

Algumas perguntas puxam a resposta de `regras` (pelo campo `campo`), então
preencher `regras.checkin` já responde a pergunta do check-in sozinho.

Cada página mostra só as perguntas relevantes — isso é definido pelo atributo
`data-filtro` no HTML. A página **A Pousada** mostra a lista completa.

---

## 7. Integrar com um motor de reservas no futuro

Hoje o formulário monta a solicitação e a envia pelo WhatsApp já formatada.

Toda solicitação passa por **uma única função** — `enviarSolicitacao(reserva)`, em
`assets/js/reservas.js` (há um comentário explicativo no topo do arquivo). Para
integrar com HQBeds, Stays, Omnibees, Booking Engine ou um endpoint próprio, basta
trocar o corpo dessa função por uma chamada à API, mantendo o objeto `reserva`:

```js
{
  checkin: '2026-09-12', checkout: '2026-09-15', noites: 3,
  adultos: 2, criancas: 1, pessoas: 3,
  nome: '', telefone: '', email: '', obs: ''
}
```

A busca da página inicial já envia os dados por URL
(`reservas.html?checkin=...&checkout=...&adultos=...`), e o formulário se
preenche sozinho com isso.

---

## 8. SEO

Já configurado:

- `<title>` e `<meta description>` próprios em cada uma das 6 páginas, com os
  termos *pousada em Capitólio*, *pousada Capitólio MG*, *hospedagem em Capitólio*,
  *onde ficar em Capitólio*, *pousada próxima às cachoeiras*.
- Um `<h1>` por página, `<h2>` por seção, `<h3>` nos itens.
- `canonical`, Open Graph e Twitter Card em todas as páginas.
- Dados estruturados `LodgingBusiness` (schema.org) gerados a partir de `dados.js`,
  incluindo endereço, coordenadas, telefone, nota média e o nome anterior.

**Depois de publicar:** cadastre o site no
[Google Search Console](https://search.google.com/search-console) e vincule o
**Perfil da Empresa no Google**. Para busca local, esse perfil pesa mais que o
site — e ele já está com o nome "Pousada Leão Azul", igual ao do site, o que
ajuda o Google a tratar os dois como o mesmo estabelecimento.

---

## 9. Rodar localmente

```bash
python -m http.server 5173
```

Depois acesse `http://localhost:5173`.

---

## 10. Identidade visual

| Cor | Valor | Uso |
|---|---|---|
| Azul da marca | `#43E1FA` | Botão de reserva, selos, ícones, destaques |
| Azul forte | `#0C93B8` | Links e textos sobre fundo branco |
| Azul escuro | `#076B87` | Ícones sobre fundo claro |
| Quase preto | `#0F1720` | Textos, rodapé e faixas escuras |
| Cinza de fundo | `#F4F7F9` | Blocos alternados |
| Linha | `#DFE5EA` | Bordas e divisórias |

Tudo fica no bloco `:root`, no topo de `assets/css/estilo.css` — mudar lá muda o
site inteiro.

**Cantos dos botões e cartões:** o projeto usa cantos retos.

```css
--raio:   4px;   /* botões, campos, selos */
--raio-g: 6px;   /* cartões e blocos */
```

Para cantos 100% vivos, troque os dois por `0`. Para arredondar um pouco, use `8px`.

**Tipografia:** Plus Jakarta Sans em toda a interface, via Google Fonts.
Instrument Serif está carregada e disponível na classe `.serif`, caso você queira
um título com serifa em algum ponto.
