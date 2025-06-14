$(document).ready(function() {
    let totalFilmes = 0;
    let totalSeries = 0;
    let duracaoTotal = 0;
    let somaAvaliacoes = 0;
    let quantidadeAvaliacoes = 0;
  
    function atualizarResumo() {
      $('#total-filmes').text(totalFilmes);
      $('#total-series').text(totalSeries);
      $('#duracao-total').text(duracaoTotal);
      const media = quantidadeAvaliacoes > 0 ? (somaAvaliacoes / quantidadeAvaliacoes).toFixed(2) : 0;
      $('#media-avaliacoes').text(media);
    }
  
    $('#formulario').on('submit', function(e) {
      e.preventDefault();
  
      const tipo = $('#tipo').val();
      const titulo = $('#titulo').val();
      const genero = $('#genero').val();
      const ano = parseInt($('#ano').val());
      const avaliacao = parseInt($('#avaliacao').val());
      const comentario = $('#comentario').val();
      const duracao = parseInt($('#duracao').val()) || 0;
  
      const item = $(`
        <div class="item" data-tipo="${tipo}">
          <strong>${tipo}</strong> - <em>${titulo}</em> (${ano})<br>
          Gênero: ${genero} <br>
          Duração: ${duracao} min <br>
          Avaliação: <span class="avaliacao-${avaliacao}">${avaliacao}/5</span> <br>
          Comentário: ${comentario}
        </div>
      `);
  
      $('#lista').append(item);
  
      if (tipo === 'Filme') totalFilmes++;
      else if (tipo === 'Série') totalSeries++;
  
      duracaoTotal += duracao;
      somaAvaliacoes += avaliacao;
      quantidadeAvaliacoes++;
  
      atualizarResumo();
  
      this.reset();
    });
  
    $('#filtro-filmes').click(function() {
      $('.item').hide().filter('[data-tipo="Filme"]').show();
    });
  
    $('#filtro-series').click(function() {
      $('.item').hide().filter('[data-tipo="Série"]').show();
    });
  
    $('#filtro-todos').click(function() {
      $('.item').show();
    });
  });
  