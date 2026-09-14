/* =============================================================================
   POUSADA LEÃO AZUL — comportamento geral
   Depende de: assets/js/dados.js (window.POUSADA)
   ========================================================================== */
(function () {
  'use strict';

  const D = window.POUSADA || {};
  const $  = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));

  /* --- Ícones -------------------------------------------------------------- */
  const IC = {
    zap: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23a8.2 8.2 0 0 1 5.82 2.41 8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.23 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.79.97-.14.16-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.84-.2-.49-.41-.42-.56-.43h-.48c-.16 0-.43.06-.65.31-.23.25-.86.84-.86 2.05s.88 2.38 1 2.54c.13.17 1.74 2.65 4.2 3.72.59.25 1.05.4 1.4.52.59.19 1.13.16 1.55.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.29Z"/></svg>',
    pessoa: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="8" r="3.4"/><path d="M4.5 20.2a7.5 7.5 0 0 1 15 0"/></svg>',
    cama: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M3 18v-8h13a5 5 0 0 1 5 5v3M3 18h18M3 13h5M5.5 7.5h4"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m4.5 12.5 5 5 10-11"/></svg>',
    seta: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h13m-5-6 6 6-6 6"/></svg>',
    estrela: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m12 2.6 2.9 5.9 6.5.95-4.7 4.6 1.1 6.45L12 17.45 6.2 20.5l1.1-6.45-4.7-4.6 6.5-.95Z"/></svg>',
    balao: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M21 12a8.5 8.5 0 0 1-12.4 7.55L3.5 21l1.45-5.1A8.5 8.5 0 1 1 21 12Z"/></svg>',
  };
  window.ICONES = IC;

  /* --- Utilidades ---------------------------------------------------------- */
  const moeda = (v) => Number(v).toLocaleString('pt-BR', {
    style: 'currency', currency: 'BRL', minimumFractionDigits: 0, maximumFractionDigits: 0,
  });
  window.fmtMoeda = moeda;

  function linkZap(msg) {
    const num = (D.contato && D.contato.whatsapp) || '';
    const txt = msg || (D.textos && D.textos.whatsappMensagem) || '';
    return 'https://wa.me/' + num + '?text=' + encodeURIComponent(txt);
  }
  window.linkZap = linkZap;

  const enderecoLinha = () => {
    const e = D.endereco || {};
    return [e.logradouro, e.bairro].filter(Boolean).join(' — ');
  };

  /* --- 1. Preenche contatos ------------------------------------------------ */
  function aplicarDados() {
    const c = D.contato || {}, e = D.endereco || {};

    $$('[data-zap]').forEach((a) => {
      a.href = linkZap(a.getAttribute('data-zap') || undefined);
      a.target = '_blank'; a.rel = 'noopener';
    });
    $$('[data-tel]').forEach((a) => {
      a.href = 'tel:+' + String(c.whatsapp || '').replace(/\D/g, '');
      if (a.hasAttribute('data-txt')) a.append(c.telefoneExibicao || '');
    });
    $$('[data-email]').forEach((a) => {
      a.href = 'mailto:' + (c.email || '');
      if (a.hasAttribute('data-txt')) a.append(c.email || '');
    });
    $$('[data-instagram]').forEach((a) => {
      a.href = c.instagram || '#'; a.target = '_blank'; a.rel = 'noopener';
      if (a.hasAttribute('data-txt')) a.append(c.instagramExibicao || '');
    });
    $$('[data-endereco]').forEach((el) => { el.textContent = enderecoLinha(); });
    $$('[data-cidade]').forEach((el) => {
      el.textContent = [e.cidade, e.estado].filter(Boolean).join(' / ') + (e.cep ? ' · ' + e.cep : '');
    });
    $$('[data-maps]').forEach((a) => { a.href = e.googleMaps || '#'; a.target = '_blank'; a.rel = 'noopener'; });
    $$('[data-rota]').forEach((a) => { a.href = e.comoChegar || '#'; a.target = '_blank'; a.rel = 'noopener'; });
    /* Mapa: aceita tanto a URL do embed quanto o bloco <iframe> inteiro que o
       Google entrega em "Compartilhar > Incorporar um mapa". Se vier o bloco
       completo, extraímos apenas o endereço do src. */
    const mapa = $('[data-mapa]');
    if (mapa && e.mapaEmbed) {
      const bruto = String(e.mapaEmbed).trim();
      const doSrc = bruto.match(/src\s*=\s*["']([^"']+)["']/i);
      const url = doSrc ? doSrc[1] : bruto;
      if (/^https?:\/\//i.test(url)) mapa.src = url;
      else console.warn('[Pousada] endereco.mapaEmbed não contém uma URL válida:', bruto.slice(0, 80));
    }
    $$('[data-ano]').forEach((el) => { el.textContent = new Date().getFullYear(); });
  }

  /* --- 2. Cabeçalho e menu ------------------------------------------------- */
  function cabecalho() {
    const topo = $('.topo');
    if (topo) {
      const atualizar = () => topo.classList.toggle('topo--sombra', window.scrollY > 4);
      atualizar();
      window.addEventListener('scroll', atualizar, { passive: true });
    }

    const btn = $('.hamb'), menu = $('#menu');
    if (!btn || !menu) return;
    const alternar = (abrir) => {
      const on = abrir === undefined ? !menu.classList.contains('aberto') : abrir;
      menu.classList.toggle('aberto', on);
      document.body.classList.toggle('trava', on);
      btn.setAttribute('aria-expanded', String(on));
      menu.setAttribute('aria-hidden', String(!on));
    };
    btn.addEventListener('click', () => alternar());
    $$('#menu a').forEach((a) => a.addEventListener('click', () => alternar(false)));
    document.addEventListener('keydown', (ev) => { if (ev.key === 'Escape') alternar(false); });
    window.addEventListener('resize', () => { if (window.innerWidth >= 1080) alternar(false); });
  }

  /* --- 3. Revelação -------------------------------------------------------- */
  function revelar() {
    const alvos = $$('.rev');
    if (!alvos.length) return;
    if (!('IntersectionObserver' in window)) { alvos.forEach((e) => e.classList.add('vis')); return; }
    const obs = new IntersectionObserver((ents) => {
      ents.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('vis'); obs.unobserve(en.target); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });
    alvos.forEach((e) => obs.observe(e));
  }

  /* --- 4. WhatsApp flutuante e barra mobile -------------------------------- */
  function flutuantes() {
    const zap = $('.zap-flut'), barra = $('.barra-mob');
    if (!zap && !barra) return;
    const atualizar = () => {
      const passou = window.scrollY > 420;
      if (zap) zap.classList.toggle('on', passou);
      if (barra) barra.classList.toggle('on', passou);
    };
    atualizar();
    window.addEventListener('scroll', atualizar, { passive: true });
  }

  /* --- 6. FAQ -------------------------------------------------------------- */
  function montarFaq() {
    const alvo = $('[data-faq]');
    if (!alvo) return;
    const regras = D.regras || {};
    const neutro = (D.textos && D.textos.semInformacao) || '';
    const limite = parseInt(alvo.getAttribute('data-limite') || '0', 10);
    let itens = D.faq || [];
    const filtro = alvo.getAttribute('data-filtro');
    if (filtro) {
      const chaves = filtro.split(',').map((s) => s.trim().toLowerCase());
      itens = itens.filter((i) => chaves.some((k) => i.pergunta.toLowerCase().includes(k)));
    }
    if (limite > 0) itens = itens.slice(0, limite);

    alvo.innerHTML = itens.map((item, i) => {
      let r = item.resposta;
      if (!r && item.campo && regras[item.campo]) r = regras[item.campo];
      const pendente = !r;
      return (
        '<details' + (i === 0 ? ' open' : '') + '>' +
          '<summary><span>' + item.pergunta + '</span><span class="faq__ic" aria-hidden="true"></span></summary>' +
          '<div class="faq__r"><p>' + (r || neutro) + '</p>' +
          (pendente ? '<a class="faq__zap" data-zap="Olá! Gostaria de saber: ' + item.pergunta + '" href="#">' + IC.zap + ' Perguntar no WhatsApp</a>' : '') +
          '</div>' +
        '</details>'
      );
    }).join('');
  }

  /* --- 7. Avaliações ------------------------------------------------------- */
  function montarAvaliacoes() {
    const alvo = $('[data-avaliacoes]');
    if (!alvo) return;
    const lista = D.avaliacoes || [];
    const res = D.avaliacaoResumo || {};
    const box = $('[data-media]');

    if (box) {
      if (res.nota) {
        const miolo =
          '<span class="media__n">' + String(res.nota).replace('.', ',') + '</span>' +
          '<div><div class="estrelas">' + Array.from({ length: Math.round(res.nota) }, () => IC.estrela).join('') + '</div>' +
          '<p class="mini">' + [res.total ? res.total + ' avaliações' : null, res.plataforma].filter(Boolean).join(' · ') + '</p></div>';
        // se houver link do perfil, a nota média vira clicável
        box.innerHTML = res.link
          ? '<a class="media media__lk" href="' + res.link + '" target="_blank" rel="noopener">' + miolo + '</a>'
          : '<div class="media">' + miolo + '</div>';
      } else {
        box.innerHTML = '';
      }
    }

    // botão "ver todas no Google"
    const btnPerfil = $('[data-avaliacoes-link]');
    if (btnPerfil) {
      if (res.link && lista.length) {
        btnPerfil.href = res.link;
        btnPerfil.classList.remove('oculto');
        if (res.plataforma) btnPerfil.textContent = 'Ver todas as avaliações no ' + res.plataforma;
      } else {
        btnPerfil.classList.add('oculto');
      }
    }

    // observação sobre o nome anterior da pousada (só aparece se houver avaliações)
    const obs = $('[data-avaliacoes-obs]');
    if (obs) {
      if (lista.length && D.avaliacoesObs) obs.textContent = D.avaliacoesObs;
      else obs.classList.add('oculto');
    }

    if (!lista.length) {
      alvo.classList.remove('notas');
      alvo.innerHTML =
        '<div class="vazio">' + IC.balao +
        '<h3 class="t3">As avaliações dos hóspedes aparecem aqui</h3>' +
        '<p>Esta seção está pronta para receber as avaliações reais de quem já se hospedou. Nenhum depoimento fictício é exibido.</p>' +
        '<a class="btn btn--contorno btn--p" data-zap="Olá! Me hospedei na Pousada Leão Azul e gostaria de deixar uma avaliação." href="#">Deixar minha avaliação</a>' +
        '</div>';
      return;
    }

    alvo.classList.add('notas');
    alvo.innerHTML = lista.map((a) => {
      const data = a.data ? new Date(a.data + 'T12:00:00').toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }) : '';
      // data e plataforma são opcionais: a linha só aparece se houver algum dos dois
      const rodape = [data, a.origem].filter(Boolean).join(' · ');
      return (
        '<article class="nota rev">' +
          '<div class="estrelas" aria-label="Nota ' + a.nota + ' de 5">' + Array.from({ length: Math.round(a.nota || 0) }, () => IC.estrela).join('') + '</div>' +
          '<p class="nota__txt">“' + a.comentario + '”</p>' +
          '<div class="nota__pe"><span class="nota__ini" aria-hidden="true">' + (a.nome || '?').trim().charAt(0).toUpperCase() + '</span>' +
          '<div><p class="nota__nome">' + a.nome + '</p>' +
          (rodape ? '<p class="nota__data">' + rodape + '</p>' : '') +
          '</div></div>' +
        '</article>'
      );
    }).join('');
  }

  /* --- 8. Galeria: filtros + lightbox -------------------------------------- */
  function galeria() {
    const grade = $('.galeria');
    if (!grade) return;

    // filtros por categoria
    const botoes = $$('.filtro');
    botoes.forEach((b) => {
      b.addEventListener('click', () => {
        const cat = b.dataset.cat;
        botoes.forEach((o) => o.setAttribute('aria-pressed', String(o === b)));
        $$('.galeria__item', grade).forEach((it) => {
          it.classList.toggle('oculto', cat !== 'todos' && it.dataset.cat !== cat);
        });
      });
    });

    const lupa = document.createElement('div');
    lupa.className = 'lupa';
    lupa.setAttribute('role', 'dialog');
    lupa.setAttribute('aria-modal', 'true');
    lupa.setAttribute('aria-label', 'Foto ampliada');
    lupa.innerHTML =
      '<button class="lupa__btn lupa__x" aria-label="Fechar"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg></button>' +
      '<button class="lupa__btn lupa__ant" aria-label="Anterior"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg></button>' +
      '<img alt="">' +
      '<button class="lupa__btn lupa__prox" aria-label="Próxima"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg></button>' +
      '<p class="lupa__n"></p>';
    document.body.appendChild(lupa);

    const img = $('img', lupa), conta = $('.lupa__n', lupa);
    let i = 0;
    const visiveis = () => $$('.galeria__item', grade).filter((e) => !e.classList.contains('oculto'));
    const mostrar = (n) => {
      const v = visiveis();
      if (!v.length) return;
      i = (n + v.length) % v.length;
      const f = $('img', v[i]);
      img.src = f.src; img.alt = f.alt;
      conta.textContent = (i + 1) + ' / ' + v.length;
    };
    const abrir = (n) => { mostrar(n); lupa.classList.add('aberta'); document.body.style.overflow = 'hidden'; };
    const fechar = () => { lupa.classList.remove('aberta'); document.body.style.overflow = ''; };

    grade.addEventListener('click', (ev) => {
      const it = ev.target.closest('.galeria__item');
      if (!it) return;
      ev.preventDefault();
      abrir(visiveis().indexOf(it));
    });
    $('.lupa__x', lupa).addEventListener('click', fechar);
    $('.lupa__ant', lupa).addEventListener('click', () => mostrar(i - 1));
    $('.lupa__prox', lupa).addEventListener('click', () => mostrar(i + 1));
    lupa.addEventListener('click', (ev) => { if (ev.target === lupa) fechar(); });
    document.addEventListener('keydown', (ev) => {
      if (!lupa.classList.contains('aberta')) return;
      if (ev.key === 'Escape') fechar();
      if (ev.key === 'ArrowRight') mostrar(i + 1);
      if (ev.key === 'ArrowLeft') mostrar(i - 1);
    });
  }

  /* --- 9. Busca de disponibilidade (hero) ---------------------------------- */
  function buscaHero() {
    const form = $('[data-busca]');
    if (!form) return;
    const hoje = new Date();
    const iso = (d) => d.toISOString().slice(0, 10);
    const ci = $('[name=ci]', form), co = $('[name=co]', form);
    if (ci) ci.min = iso(hoje);
    if (co) co.min = iso(new Date(hoje.getTime() + 86400000));

    if (ci) ci.addEventListener('change', () => {
      if (!ci.value) return;
      const min = iso(new Date(new Date(ci.value + 'T12:00:00').getTime() + 86400000));
      co.min = min;
      if (!co.value || co.value <= ci.value) co.value = min;
    });

    form.addEventListener('submit', (ev) => {
      ev.preventDefault();
      const p = new URLSearchParams();
      if (ci && ci.value) p.set('checkin', ci.value);
      if (co && co.value) p.set('checkout', co.value);
      const h = $('[name=hospedes]', form);
      if (h && h.value) p.set('adultos', h.value);
      window.location.href = 'reservas.html' + (p.toString() ? '?' + p.toString() : '');
    });
  }

  /* --- 10. SEO: dados estruturados ----------------------------------------- */
  function schema() {
    const e = D.endereco || {}, c = D.contato || {}, r = D.avaliacaoResumo || {};
    const d = {
      '@context': 'https://schema.org',
      '@type': 'LodgingBusiness',
      name: 'Pousada Leão Azul',
      alternateName: D.nomeAnterior || undefined,
      description: 'Pousada em Capitólio, Minas Gerais. Hospedagem com café da manhã, Wi-Fi e localização estratégica para as cachoeiras, os cânions e o Lago de Furnas.',
      url: location.origin + location.pathname.replace(/[^/]*$/, ''),
      telephone: '+' + String(c.whatsapp || '').replace(/\D/g, ''),
      email: c.email || undefined,
      priceRange: 'R$$',
      address: {
        '@type': 'PostalAddress',
        streetAddress: [e.logradouro, e.bairro].filter(Boolean).join(', '),
        addressLocality: e.cidade, addressRegion: e.estado,
        postalCode: e.cep, addressCountry: 'BR',
      },
      geo: { '@type': 'GeoCoordinates', latitude: e.latitude, longitude: e.longitude },
      amenityFeature: [
        { '@type': 'LocationFeatureSpecification', name: 'Café da manhã', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Wi-Fi gratuito', value: true },
      ],
      sameAs: [c.instagram].filter(Boolean),
    };
    if (r.nota && r.total) d.aggregateRating = { '@type': 'AggregateRating', ratingValue: r.nota, reviewCount: r.total };

    const s = document.createElement('script');
    s.type = 'application/ld+json';
    s.textContent = JSON.stringify(d);
    document.head.appendChild(s);
  }

  /* --- Início -------------------------------------------------------------- */
  function iniciar() {
    montarFaq();
    montarAvaliacoes();
    aplicarDados();
    cabecalho();
    flutuantes();
    galeria();
    buscaHero();
    revelar();
    schema();
    if (typeof window.iniciarReserva === 'function') window.iniciarReserva();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar);
  else iniciar();
})();
