/* =============================================================================
   POUSADA LEÃO AZUL — fotos com troca livre de formato

   Para trocar qualquer foto do site, basta salvar o arquivo em assets/img/
   com o nome certo. Não é preciso editar nenhuma página.

   Ordem de preferência (PREFERENCIA, abaixo):
       .webp  →  .jpg  →  .jpeg  →  .png  →  .svg
   O .svg é o desenho provisório: só aparece enquanto a foto real não
   estiver na pasta.

   Se algum dia você quiser voltar a priorizar .jpg, basta trocar a ordem
   da lista — o código tenta todos os formatos, em qualquer ordem.

   Este arquivo é carregado no <head>, antes das imagens, para que a
   substituição aconteça já no primeiro carregamento.
   ========================================================================== */
(function () {
  'use strict';

  var PREFERENCIA = ['webp', 'jpg', 'jpeg', 'png', 'svg'];

  // O evento "error" de <img> não borbulha, por isso escutamos na fase
  // de captura (terceiro argumento = true), que alcança qualquer imagem
  // da página — inclusive as criadas depois pelo JavaScript.
  document.addEventListener('error', function (ev) {
    var img = ev.target;
    if (!img || img.tagName !== 'IMG') return;

    // separa "caminho/arquivo" de "extensão" (ignorando query string)
    var partes = img.src.split('?')[0].match(/^(.*)\.([A-Za-z0-9]+)$/);
    if (!partes) return;

    var base = partes[1];
    var extAtual = partes[2].toLowerCase();
    if (PREFERENCIA.indexOf(extAtual) < 0) return; // extensão fora da nossa lista

    /* Guardamos no próprio elemento quais extensões já falharam. Assim
       percorremos a lista inteira na ordem de preferência, sem depender
       da extensão que veio escrita no HTML e sem repetir tentativas
       (o que causaria laço infinito). */
    var jaTentadas = img.__fotoTentadas || (img.__fotoTentadas = []);
    if (jaTentadas.indexOf(extAtual) < 0) jaTentadas.push(extAtual);

    for (var i = 0; i < PREFERENCIA.length; i++) {
      if (jaTentadas.indexOf(PREFERENCIA[i]) < 0) {
        jaTentadas.push(PREFERENCIA[i]);
        img.src = base + '.' + PREFERENCIA[i];
        return;
      }
    }
    // acabaram os formatos: deixa a imagem como está, sem novo pedido
  }, true);
})();
