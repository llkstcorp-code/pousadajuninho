/* =============================================================================
   POUSADA LEÃO AZUL — fluxo de reserva (reservas.html)

   A reserva é simples: datas + quantidade de pessoas + contato.
   Não há escolha de quarto — a pousada confirma a acomodação e o valor
   de acordo com as datas e o tamanho do grupo.

   INTEGRAÇÃO FUTURA COM MOTOR DE RESERVAS
   -----------------------------------------------------------------------------
   Toda solicitação passa por UMA função: enviarSolicitacao(reserva).
   Hoje ela monta a mensagem do WhatsApp. Para integrar com HQBeds, Stays,
   Omnibees, Booking Engine ou um endpoint próprio, troque só o corpo dela.

   reserva = {
     checkin:'2026-09-12', checkout:'2026-09-15', noites:3,
     adultos:2, criancas:1, pessoas:3,
     nome:'', telefone:'', email:'', obs:''
   }
   ========================================================================== */
(function () {
  'use strict';

  const $  = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));

  window.iniciarReserva = function () {
    const form = $('#form-reserva');
    if (!form) return;

    const D = window.POUSADA || {};
    const H = D.hospedagem || {};

    const el = {
      checkin: $('#checkin'), checkout: $('#checkout'),
      adultos: $('#adultos'), criancas: $('#criancas'),
      confirmado: $('[data-confirmado]'), confirmadoDados: $('[data-confirmado-dados]'),
      enviar: $('[data-enviar]'),
      passos: $$('.passo'),
    };

    /* --- Datas ------------------------------------------------------------ */
    const iso = (d) => d.toISOString().slice(0, 10);
    const somaDias = (d, n) => new Date(d.getTime() + n * 86400000);
    const hoje = new Date();

    el.checkin.min = iso(hoje);
    el.checkout.min = iso(somaDias(hoje, 1));

    el.checkin.addEventListener('change', () => {
      if (!el.checkin.value) return;
      const min = iso(somaDias(new Date(el.checkin.value + 'T12:00:00'), 1));
      el.checkout.min = min;
      if (el.checkout.value && el.checkout.value <= el.checkin.value) el.checkout.value = min;
      atualizar();
    });

    /* --- Contadores de pessoas -------------------------------------------- */
    const LIM = {
      adultos:  [1, H.maxAdultos  || 60],
      criancas: [0, H.maxCriancas || 20],
    };
    function ajustar(campo, delta) {
      const inp = el[campo], [min, max] = LIM[campo];
      const v = Math.min(max, Math.max(min, parseInt(inp.value, 10) + delta));
      inp.value = v;
      $('[data-v="' + campo + '"]').textContent = v;
      $('[data-menos="' + campo + '"]').disabled = v <= min;
      $('[data-mais="' + campo + '"]').disabled = v >= max;
      atualizar();
    }
    $$('[data-menos]').forEach((b) => b.addEventListener('click', () => ajustar(b.dataset.menos, -1)));
    $$('[data-mais]').forEach((b) => b.addEventListener('click', () => ajustar(b.dataset.mais, +1)));

    /* --- Parâmetros vindos da busca do hero -------------------------------- */
    const par = new URLSearchParams(location.search);
    if (par.get('checkin')) el.checkin.value = par.get('checkin');
    if (par.get('checkout')) el.checkout.value = par.get('checkout');
    const numDe = (chave, campo) => {
      const v = parseInt(par.get(chave), 10);
      if (!isNaN(v)) el[campo].value = Math.min(LIM[campo][1], Math.max(LIM[campo][0], v));
    };
    numDe('adultos', 'adultos');
    numDe('criancas', 'criancas');

    /* --- Leitura ----------------------------------------------------------- */
    function noites() {
      if (!el.checkin.value || !el.checkout.value) return 0;
      const a = new Date(el.checkin.value + 'T12:00:00');
      const b = new Date(el.checkout.value + 'T12:00:00');
      const n = Math.round((b - a) / 86400000);
      return n > 0 ? n : 0;
    }
    function coletar() {
      const adultos = parseInt(el.adultos.value, 10);
      const criancas = parseInt(el.criancas.value, 10);
      return {
        checkin: el.checkin.value, checkout: el.checkout.value, noites: noites(),
        adultos: adultos, criancas: criancas, pessoas: adultos + criancas,
        nome: $('#nome').value.trim(), telefone: $('#telefone').value.trim(),
        email: $('#email').value.trim(), obs: $('#obs').value.trim(),
      };
    }

    const MESES = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
    function dataBR(s) {
      if (!s) return '—';
      const d = new Date(s + 'T12:00:00');
      return String(d.getDate()).padStart(2, '0') + ' ' + MESES[d.getMonth()] + ' ' + d.getFullYear();
    }
    function textoHospedes(r) {
      const p = [r.adultos + (r.adultos > 1 ? ' adultos' : ' adulto')];
      if (r.criancas > 0) p.push(r.criancas + (r.criancas > 1 ? ' crianças' : ' criança'));
      return p.join(' · ');
    }

    /* --- Resumo ao vivo ----------------------------------------------------- */
    function atualizar() {
      const r = coletar();
      const set = (k, v) => { const a = $('[data-resumo="' + k + '"]'); if (a) a.textContent = v; };

      set('checkin', dataBR(r.checkin));
      set('checkout', dataBR(r.checkout));
      set('noites', r.noites ? r.noites + (r.noites > 1 ? ' noites' : ' noite') : '—');
      set('hospedes', textoHospedes(r));

      passos(r);
    }

    function passos(r) {
      const ok = [
        Boolean(r.checkin && r.checkout && r.noites > 0), // 1 datas
        true,                                             // 2 hóspedes (sempre válido)
        Boolean(r.nome && r.telefone && r.email),         // 3 dados
      ];
      const pendente = ok.indexOf(false);
      const ativa = pendente === -1 ? 3 : pendente;
      el.passos.forEach((p, i) => {
        p.classList.toggle('passo--ok', i < 3 && ok[i]);
        p.classList.toggle('passo--ativo', i === ativa);
      });
    }

    /* --- Validação ---------------------------------------------------------- */
    const marcar = (c, ruim) => { const b = $('[data-campo="' + c + '"]'); if (b) b.classList.toggle('ruim', ruim); };

    function validar(r) {
      let ok = true; const falhas = [];
      const chk = (campo, ruim) => { marcar(campo, ruim); if (ruim) { ok = false; falhas.push(campo); } };

      chk('checkin', !r.checkin);
      chk('checkout', !r.checkout || r.noites <= 0);
      chk('nome', r.nome.length < 2);
      chk('telefone', r.telefone.replace(/\D/g, '').length < 10);
      chk('email', !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(r.email));

      if (!ok) {
        const alvo = $('[data-campo="' + falhas[0] + '"] input');
        if (alvo) {
          alvo.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setTimeout(() => alvo.focus({ preventScroll: true }), 420);
        }
      }
      return ok;
    }

    ['input', 'change'].forEach((ev) => form.addEventListener(ev, (e) => {
      const b = e.target.closest('[data-campo]');
      if (b) b.classList.remove('ruim');
      atualizar();
    }));

    /* --- Mensagem ----------------------------------------------------------- */
    function mensagem(r) {
      const l = ['*Solicitação de reserva — Pousada Leão Azul*', ''];
      l.push('*Check-in:* ' + dataBR(r.checkin));
      l.push('*Check-out:* ' + dataBR(r.checkout));
      l.push('*Noites:* ' + r.noites);
      l.push('*Pessoas:* ' + r.pessoas + ' (' + textoHospedes(r) + ')');
      l.push('', '*Nome:* ' + r.nome, '*Telefone:* ' + r.telefone, '*E-mail:* ' + r.email);
      if (r.obs) l.push('*Observações:* ' + r.obs);
      l.push('', 'Aguardo a confirmação de disponibilidade e do valor. Obrigado!');
      return l.join('\n');
    }

    /* --- Envio (ponto único de integração) ---------------------------------- */
    function enviarSolicitacao(r) {
      el.enviar.href = window.linkZap(mensagem(r));

      const lin = (k, v) => '<div class="resumo__l"><dt>' + k + '</dt><dd>' + v + '</dd></div>';
      el.confirmadoDados.innerHTML = '<dl>' +
        lin('Datas', dataBR(r.checkin) + ' → ' + dataBR(r.checkout)) +
        lin('Noites', String(r.noites)) +
        lin('Pessoas', r.pessoas + ' (' + textoHospedes(r) + ')') +
        lin('Nome', r.nome) +
        lin('Contato', r.telefone + ' · ' + r.email) +
        (r.obs ? lin('Observações', r.obs) : '') +
      '</dl>';

      form.style.display = 'none';
      el.confirmado.classList.add('on');
      el.confirmado.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.passos.forEach((p, i) => {
        p.classList.toggle('passo--ok', i < 4);
        p.classList.toggle('passo--ativo', i === 4);
      });
    }

    form.addEventListener('submit', (ev) => {
      ev.preventDefault();
      const r = coletar();
      if (validar(r)) enviarSolicitacao(r);
    });

    const editar = $('[data-editar]');
    if (editar) editar.addEventListener('click', () => {
      el.confirmado.classList.remove('on');
      form.style.display = '';
      form.scrollIntoView({ behavior: 'smooth', block: 'start' });
      atualizar();
    });

    /* --- Máscara de telefone ------------------------------------------------ */
    const tel = $('#telefone');
    tel.addEventListener('input', () => {
      let v = tel.value.replace(/\D/g, '').slice(0, 11);
      if (v.length > 6) v = '(' + v.slice(0, 2) + ') ' + v.slice(2, v.length - 4) + '-' + v.slice(-4);
      else if (v.length > 2) v = '(' + v.slice(0, 2) + ') ' + v.slice(2);
      else if (v.length > 0) v = '(' + v;
      tel.value = v;
    });

    /* --- Passos clicáveis ---------------------------------------------------- */
    el.passos.forEach((p) => p.addEventListener('click', () => {
      const b = $('[data-bloco="' + p.dataset.passo + '"]');
      if (b) b.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }));

    ajustar('adultos', 0);
    ajustar('criancas', 0);
    atualizar();
  };
})();
