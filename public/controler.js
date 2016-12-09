angular.module('sorteioApp', [])
  .controller('sorteioController', function($scope) {

    //var sorteio = $scope;

    init();

    $scope.addNome = function(){

        if (!$scope.formAdd.$valid) {
            alert('Permitido somente letras! cabra safado');
            return;
        }

		$scope.count += 1; 
    	var nomeCabra = {id: $scope.count, nome: $scope.nomeJogador};
    	$scope.nomes.push(nomeCabra);

    	$scope.nomeJogador = '';
    	$scope.isTemJogadores = true;
    };

    $scope.sortearNovamente = function(){
        
        $scope.nomesSorteados = [];
        $scope.idsSorteados = [];
        $scope.jogadoresFora = [];

        $scope.sortearDuplas();        
    };

    $scope.sortearDuplas = function(){

    	var qtdDuplas = Math.floor($scope.nomes.length / 2);

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
    				$scope.idsSorteados.push(numeroSorteado);
    				continue;
    			}

    			if (jogador2 == null) {
    				jogador2 = numeroSorteado;
    				$scope.idsSorteados.push(numeroSorteado);
    			}

    			if (jogador1 != null && jogador2 != null) {
					break;
				}
    		}

    		preencherSorteados(jogador1, jogador2);

    	}


    	processaJogadoresFora();

    };

    $scope.resetSorteio = function(){
    	init();
    };

    function processaJogadoresFora(){

		$scope.nomes.forEach(function(obj){

			var t = obj;

			if (!containsNumeroSorteado(obj.id)) {
				$scope.jogadoresFora.push(t);
				$scope.isJogadorFora = true;
			}

		});    

    };


	function preencherSorteados(jogador1, jogador2){

		var duplaSorteada = {};
		duplaSorteada.jogadores = [];

		$scope.nomes.forEach(function(obj){

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

		$scope.nomesSorteados.push(duplaSorteada);
		
		$scope.isTemSorteados = true;
	};



    function containsNumeroSorteado(numeroSorteado){

	    var i = $scope.idsSorteados.length;

	    while (i--) {
	       if ($scope.idsSorteados[i] === numeroSorteado) {
	           return true;
	       }

	    }

	    return false;
    };

    function sortearNumero(){
    	return Math.floor((Math.random() * $scope.nomes.length) + 1);
    };

    function init(){
    	$scope.count = 0;
	    $scope.nomes = [];
	    $scope.nomesSorteados = [];
	    $scope.idsSorteados = [];
	    $scope.isTemSorteados = false;
	    $scope.isTemJogadores = false;
	    $scope.isJogadorFora = false;
	    $scope.jogadoresFora = [];
    };

  });