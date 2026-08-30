document.addEventListener('DOMContentLoaded', function() {

  // ==========================================
  // CÓDIGO DO MODAL DE AJUDA
  // ==========================================
  const btnAjudaDestaque = document.querySelector('.botao-ajuda-destaque');
  const btnAjudaMenu = document.querySelector('.botao-ajuda-menu');
  const btnFecharModal = document.querySelector('.botao-fechar-modal');
  const modalOverlay = document.querySelector('.modal-overlay');

  function abrirModal() {
    if (modalOverlay) modalOverlay.classList.add('ativo');
  }

  function fecharModal() {
    if (modalOverlay) modalOverlay.classList.remove('ativo');
  }

  if (btnAjudaDestaque) btnAjudaDestaque.addEventListener('click', abrirModal);
  if (btnAjudaMenu) btnAjudaMenu.addEventListener('click', abrirModal);
  if (btnFecharModal) btnFecharModal.addEventListener('click', fecharModal);

  if (modalOverlay) {
    modalOverlay.addEventListener('click', function(e) {
      if (e.target === modalOverlay) fecharModal();
    });
  }

  // ==========================================
  // CÓDIGO DE CONTROLE DE FONTE (ACESSIBILIDADE)
  // ==========================================
  let tamanhoFonteAtual = 1;
  const valorAdicionado = 0.1;
  const valorSubtraido = 0.1;

  const botaoAumentar = document.getElementById('aumentar-fonte');
  const botaoDiminuir = document.getElementById('diminuir-fonte');

  function aumentaFonte() {
    tamanhoFonteAtual += valorAdicionado;
    document.documentElement.style.fontSize = tamanhoFonteAtual + 'rem';
  }

  function diminuiFonte() {
    if (tamanhoFonteAtual > 0.6) {
      tamanhoFonteAtual -= valorSubtraido;
      document.documentElement.style.fontSize = tamanhoFonteAtual + 'rem';
    }
  }

  if (botaoAumentar) {
    botaoAumentar.addEventListener('click', aumentaFonte);
  }

  if (botaoDiminuir) {
    botaoDiminuir.addEventListener('click', diminuiFonte);
  }

  // ==========================================
  // CÓDIGO DE LEITURA EM VOZ ALTA (COM PAUSA/RETOMADA)
  // ==========================================
  const btnLerVoz = document.getElementById('btn-ler-voz');
  let lendo = false;

  function finalizarLeitura() {
    lendo = false;
    if (btnLerVoz) {
      btnLerVoz.textContent = '🔊 Ler em Voz Alta';
    }
  }

  function lerEmVozAlta() {
    if (!('speechSynthesis' in window)) {
      alert('Seu navegador não suporta a função de leitura em voz alta.');
      return;
    }

    if (lendo) {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        btnLerVoz.textContent = '⏸️ Pausar Leitura';
      } else {
        window.speechSynthesis.pause();
        btnLerVoz.textContent = '▶️ Retomar Leitura';
      }
      return;
    }

    window.speechSynthesis.cancel();

    const secoes = document.querySelectorAll('.bloco-secao');
    let textoParaLer = '';

    secoes.forEach(function(secao) {
      if (window.getComputedStyle(secao).display !== 'none') {
        textoParaLer = secao.innerText;
      }
    });

    if (!textoParaLer) {
      textoParaLer = document.querySelector('main').innerText;
    }

    const mensagem = new SpeechSynthesisUtterance(textoParaLer);
    mensagem.lang = 'pt-BR';

    mensagem.onstart = function() {
      lendo = true;
      btnLerVoz.textContent = '⏸️ Pausar Leitura';
    };

    mensagem.onend = finalizarLeitura;
    mensagem.onerror = finalizarLeitura;

    window.speechSynthesis.speak(mensagem);
  }

  if (btnLerVoz) {
    btnLerVoz.addEventListener('click', lerEmVozAlta);
  }

});
