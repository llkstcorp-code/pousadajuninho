/* =============================================================================
   POUSADA LEÃO AZUL — ARQUIVO DE CONFIGURAÇÃO
   -----------------------------------------------------------------------------
   Este é o ÚNICO arquivo que precisa ser editado para atualizar o conteúdo
   do site: contato, endereço, regras, perguntas frequentes e avaliações.

   Tudo que estiver marcado com  ← PREENCHER  ainda não foi informado e está
   com um valor provisório. Troque pelo dado real antes de publicar o site.
   ========================================================================== */

const POUSADA = {

  /* ---------------------------------------------------------------------------
     1. CONTATO
     ------------------------------------------------------------------------ */
  contato: {
    // Número do WhatsApp em formato internacional, apenas dígitos.
    // Exemplo: 5537999998888  (55 = Brasil, 37 = DDD, restante = número)
    whatsapp: '5537988527585',
    // Como o telefone aparece escrito no site
    telefoneExibicao: '(37) 98852-7585',
    email: 'pousadaleaoazul@gmail.com',
    instagram: 'https://www.instagram.com/pousadadojuninho_/',
    instagramExibicao: '@pousadadojuninho_',
  },

  /* ---------------------------------------------------------------------------
     2. ENDEREÇO E LOCALIZAÇÃO
     ------------------------------------------------------------------------ */
  endereco: {
    logradouro: 'Condominio Passarinho',     // ← PREENCHER
    bairro: 'Turvo',                    // ← PREENCHER
    cidade: 'Capitólio',
    estado: 'MG',
    cep: '37930-000',                    // ← PREENCHER (CEP real)
    // Link direto do Google Maps (compartilhar > copiar link)
    googleMaps: 'https://maps.app.goo.gl/jXCC1dA57s7zr56E8',
    // Link do "Como chegar" (rota)
    comoChegar: 'https://www.google.com/maps/dir//Pousada+Leao+Azul,+Rod+Mg+050+KM+304+-+Condominio+Passarinho+-+Defrente+Trilha+do+Sol+Acomoda%C3%A7%C3%B5es+para+55+pessoas+37,+98852-7585+ou+37-999389432+-+TURVO,+Capit%C3%B3lio+-+MG,+37930-000/@-20.7117246,-46.6029821,15z/data=!4m8!4m7!1m0!1m5!1m1!1s0x94b4207090585d01:0x5bea247e07a2c432!2m2!1d-46.2022651!2d-20.661077?entry=ttu&g_ep=EgoyMDI2MDgxMC4wIKXMDSoASAFQAw%3D%3D',
    /* Mapa incorporado. Google Maps > Compartilhar > Incorporar um mapa.
       Pode colar o código <iframe> inteiro OU só a URL do src — o site
       aceita as duas formas e extrai o endereço sozinho. */
    mapaEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3733.2088488011063!2d-46.2048450239954!3d-20.661080561491673!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94b4207090585d01%3A0x5bea247e07a2c432!2sPousada%20Leao%20Azul!5e0!3m2!1spt-BR!2sbr!4v1786622033604!5m2!1spt-BR!2sbr',
    // Coordenadas reais da pousada, extraídas dos links do Google acima.
    latitude: '-20.661077',
    longitude: '-46.2022651',
  },

  /* ---------------------------------------------------------------------------
     3. HORÁRIOS E REGRAS
     Deixe como null enquanto a informação não estiver confirmada — o site
     exibe automaticamente uma mensagem convidando o visitante a confirmar
     pelo WhatsApp, em vez de mostrar um dado incorreto.
     ------------------------------------------------------------------------ */
  regras: {
    checkin: null,        // ex.: '14h'   ← PREENCHER
    checkout: null,       // ex.: '12h'   ← PREENCHER
    estacionamento: 'Sim, gratuíto e seguro para seu carro', // ex.: 'Sim, gratuito no local'  ← PREENCHER
    criancas: 'Suas crianças serão muito bem-vindas aqui na nossa Pousada, tenho certeza que elas vão se divertir',       // ex.: 'Sim, crianças são bem-vindas'  ← PREENCHER
    animais: 'Todo animal precisa de um espaço grande grande para se divertir, aqui é o lugar certo',        // ex.: 'Consulte-nos'  ← PREENCHER
    formasPagamento: 'Pix, cartão e dinheiro',// ex.: 'Pix, cartão e dinheiro'  ← PREENCHER
  },

  /* ---------------------------------------------------------------------------
     4. HOSPEDAGEM
     O site não trabalha com escolha de quarto: a pessoa informa as datas e
     quantas pessoas vão, e a pousada confirma o valor e a acomodação.
     ------------------------------------------------------------------------ */
  hospedagem: {
    // Limite dos contadores do formulário de reserva.
    maxAdultos: 60,
    maxCriancas: 20,
  },


  /* ---------------------------------------------------------------------------
     5. AVALIAÇÕES
     A lista está vazia de propósito: nenhuma avaliação foi inventada.
     Ao receber avaliações reais (Google, Booking, Airbnb...), adicione aqui:

     { nota: 5, nome: 'Nome do hóspede', data: '2026-03-14',
       comentario: 'Texto da avaliação.', origem: 'Google' }

     A seção de avaliações do site aparece automaticamente assim que
     houver ao menos um item nesta lista.
     ------------------------------------------------------------------------ */
  avaliacoes: [
    {
      nota: 5,
      nome: 'Folha Interativa Ibiá',
      data: null,          // ← PREENCHER se quiser exibir a data
      origem: 'Google',        // ← PREENCHER (ex.: 'Google') se quiser exibir a plataforma
      comentario: 'Carnavalizando em Capitólio, na Pousada Leão Azul e foi maravilhoso. Júnior e Adriano são ótimos anfitriões. Liberdade total para usar a cozinha e confraternizar na área comum. Ótima ocasião para fazer novas amizades. Voltaremos sempre que der.',
    },
    {
      nota: 5,
      nome: 'Rennan Pires',
      data: null,
      origem: 'Google',
      comentario: 'Lugar excelente, com um bom café da manhã, quartos com cama confortável e limpos, você já acorda com o som dos pássaros e vista para a represa, os donos nos recepcionaram com muito carinho, mesmo sendo meia noite, além de fazerem de tudo para que nos sentimos em casa.',
    },
    {
      nota: 5,
      nome: 'Pauliinha Sousa',
      data: null,
      origem: 'Google',
      comentario: 'Pousada excelente, todos os chalés com banheiros, ótima localização, capacidade para atender mais de 50 pessoas. Área de churrasco e piscina com uma maravilhosa vista para lagoa de furnas. Super recomendada!',
    },
    {
      nota: 5,
      nome: 'Angela Garcia',
      data: null,
      origem: 'Google',
      comentario: 'Lugar incrível, tudo muito bom, a funcionária que nos receberam Jane è maravilhosa, os quartos são excelentes a área de churrasqueira tbem top ótima para grupo próximo a tudo dos melhores lugares em capitólio o Júnior anfitrião e muito atencioso só tenho a agradecer',
    },
    {
      nota: 5,
      nome: 'Gabriel Sbrana',
      data: null,
      origem: 'Google',
      // Texto reproduzido exatamente como o hóspede escreveu, sem correções.
      comentario: 'Pousada bem localizada, com internet sem fio (wi-fi), quartos e banheiros limpos, camas confortáveis, instalações adequadas para receber grupos grandea ou pequenos, e ainda possui uma boa vista das formações naturais das redondezas.',
    },
  ],

  /* Nome anterior da pousada. Usado nos dados estruturados (SEO) para que
     quem procurar pelo nome antigo no Google encontre o site.
     Deixe null se não quiser mais associar os dois nomes. */
  nomeAnterior: 'Pousada do Juninho',

  /* Observação exibida abaixo das avaliações.
     Serve para explicar o nome anterior da pousada, que aparece em avaliações
     antigas. Deixe null para não exibir nada.

     Está null porque as avaliações do Google já citam “Pousada Leão Azul”,
     que agora é o nome atual — não há divergência para explicar. */
  avaliacoesObs: null,

  /* Nota média e total de avaliações (null = não exibir).

     ATENÇÃO: os valores abaixo refletem apenas as 5 avaliações publicadas neste
     site. Troque pela nota média e pelo total REAIS do perfil do Google — são
     eles que aparecem nos dados estruturados e podem virar estrelas no
     resultado de busca.                                        ← PREENCHER */
  avaliacaoResumo: {
    nota: null,           // ← PREENCHER com a nota real do perfil (ex.: 4.8)
    total: null,          // ← PREENCHER com o total real do perfil (ex.: 87)
    plataforma: 'Google',
    // Link direto e estável para o perfil no Google Maps.
    // Gerado a partir do identificador do local (CID), não quebra como os
    // links de compartilhamento do Google Travel.
    link: 'https://maps.google.com/?cid=6623146325714322482',
  },

  /* ---------------------------------------------------------------------------
     6. PERGUNTAS FREQUENTES
     Respostas com valor null usam automaticamente um texto neutro que
     encaminha o visitante ao WhatsApp — assim nada é inventado.
     Para responder, basta trocar o null pelo texto entre aspas.
     ------------------------------------------------------------------------ */
  faq: [
    { pergunta: 'Qual o horário de check-in?', resposta: null, campo: 'checkin' },
    { pergunta: 'Qual o horário de check-out?', resposta: null, campo: 'checkout' },
    { pergunta: 'A pousada possui Wi-Fi?', resposta: 'Sim. O Wi-Fi é gratuito e está disponível para os hóspedes durante toda a estadia.' },
    { pergunta: 'O café da manhã está incluso?', resposta: 'Sim. O café da manhã completo está incluso na diária e é servido na pousada, antes de você sair para os passeios.' },
    { pergunta: 'Como funciona a reserva?', resposta: 'Você pode solicitar a reserva pelo formulário da página de Reservas ou falar direto com a gente pelo WhatsApp. Confirmamos a disponibilidade das datas, combinamos a forma de pagamento e a reserva está feita.' },
    { pergunta: 'A pousada possui estacionamento?', resposta: 'Sim, possui estacionamento para seu carro ficar em segurança.', campo: 'estacionamento' },
    { pergunta: 'A pousada aceita crianças?', resposta: 'Traga as crianças para vir divertir na nossa pousada.', campo: 'criancas' },
    { pergunta: 'Como chegar à pousada?', resposta: 'Estamos estrategicamente próximos a todas as atrações: a apenas 5 minutos dos Canyons, Lagoa Azul e Restaurante do Turvo, e a 20 minutos do centro de Capitólio.. Na seção Localização você encontra o endereço completo, o mapa e o botão "Como chegar", que abre a rota direto no Google Maps a partir de onde você estiver.' },
    { pergunta: 'A pousada ajuda com informações sobre passeios?', resposta: 'Qualquer informação que precisar, como lugares para turistar pela região, horários, e qualquer coisa do tipo, informamos com maior prazer para nossos hóspedes' },
  ],

  /* ---------------------------------------------------------------------------
     7. TEXTOS DE APOIO
     ------------------------------------------------------------------------ */
  textos: {
    // Mensagem inicial pré-preenchida ao abrir o WhatsApp
    whatsappMensagem: 'Olá! Vim pelo site da Pousada Leão Azul e gostaria de informações sobre hospedagem.',
    // Frase usada quando um dado ainda não foi informado
    semInformacao: 'Fale com a gente pelo WhatsApp para confirmar essa informação.',
  },
};

// Disponibiliza o objeto globalmente (o site é estático, sem build).
window.POUSADA = POUSADA;

