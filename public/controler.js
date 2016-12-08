angular.module('sorteioApp', [])
  .controller('SorteioController', function() {
    var sorteio = this;

    init();

    sorteio.addNome = function(){
		sorteio.count += 1; 
    	var nomeCabra = {id: sorteio.count, nome: sorteio.nomeJogador}
    	sorteio.nomes.push(nomeCabra);

    	sorteio.nomeJogador = '';
    	sorteio.isTemJogadores = true;
    };


    sorteio.sortearDuplas = function(){

    	sorteio.isTemJogadores = false;

    	var qtdDuplas = Math.floor(sorteio.nomes.length / 2);

    	for (var j = 0; j < qtdDuplas; j++) {

    		var jogador1 = null;
    		var jogador2 = null;

    		while(true){

    			var numeroSorteado = sortearNumero();

    			if (containsNumeroSorteado(numeroSorteado)) {
    				continue;
    			}

    			if (jogador1 == null) {
    				jogador1 = numeroSorteado;
    				sorteio.idsSorteados.push(numeroSorteado);
    				continue;
    			}

    			if (jogador2 == null) {
    				jogador2 = numeroSorteado;
    				sorteio.idsSorteados.push(numeroSorteado);
    			}

    			if (jogador1 != null && jogador2 != null) {
					break;
				}
    		}

    		preencherSorteados(jogador1, jogador2);

    	}


    	processaJogadoresFora();

    };

    sorteio.resetSorteio = function(){
    	init();
    };

    function processaJogadoresFora(){

		sorteio.nomes.forEach(function(obj){

			var t = obj;

			if (!containsNumeroSorteado(obj.id)) {
				sorteio.jogadoresFora.push(t);
				sorteio.isJogadorFora = true;
			}

		});    

    };


	function preencherSorteados(jogador1, jogador2){

		var duplaSorteada = {};
		duplaSorteada.jogadores = [];

		sorteio.nomes.forEach(function(obj){

			var t = obj;

			if (obj.id === jogador1) {
				t.jogador = 1;
				duplaSorteada.jogadores.push(t);
				return;
			} 

			if (obj.id === jogador2) {
				t.jogador = 2;
				duplaSorteada.jogadores.push(t);
				return;
			}

		});

		sorteio.nomesSorteados.push(duplaSorteada);
		
		sorteio.isTemSorteados = true;
	};



    function containsNumeroSorteado(numeroSorteado){

	    var i = sorteio.idsSorteados.length;

	    while (i--) {
	       if (sorteio.idsSorteados[i] === numeroSorteado) {
	           return true;
	       }

	    }

	    return false;
    };

    function sortearNumero(){
    	return Math.floor((Math.random() * sorteio.nomes.length) + 1);
    };

    function init(){
    	sorteio.count = 0;
	    sorteio.nomes = [];
	    sorteio.nomesSorteados = [];
	    sorteio.idsSorteados = [];
	    sorteio.isTemSorteados = false;
	    sorteio.isTemJogadores = false;
	    sorteio.isJogadorFora = false;
	    sorteio.jogadoresFora = [];
    };

  });