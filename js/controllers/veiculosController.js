app.controller('veiculoController',function($scope, $http){
 
 
      
        $scope.cadVeiculo = 'nao';
        $('input#input_text, textarea#textarea1').characterCounter();
        $('select').material_select();
        Materialize.updateTextFields();
        $scope.Veiculo = objVeiculo();
    
    
    
// inicio - Lista os veiculos cadastrados
        $scope.listVeiculos = function(){        
            $http.get('api/listVeiculos')
                .success(function(data){              
                    $scope.veiculos = data.listVeiculos;             
                })
                .error(function(){
                    alert("Falha em obter dados");
                });
    }    
    $scope.listVeiculos();
// fim - Lista os veiculos cadastrados
    
// inicio - Deleta o veiculo selecionado    
    $scope.delVeiculo = function(deletado){    
        
        if(!confirm("Tem certeza que deseja excluir?")) return false;
        
        $http.get('api/delVeiculo/'+deletado)
            .success(function(data){           
                if(data.erro){
                    console.log(data.erro);
                    console.log(data.msg);
                    $scope.listVeiculos();
                    $scope.titulo_modal = "Falhamos! :(";
                    $scope.msg = data.msg;
                    $('#AlertaExclusao').openModal();
                } else {
                    console.log('entrou no sucesso de gravacao!');
                    console.log(data.erro);
                    $scope.listVeiculos();
                    $scope.titulo_modal = "Veiculo excluido com sucesso! :D";
                    $scope.msg = "E isso ai agora e só lancar as OS's!";
                    $('#AlertaExclusao').openModal();
                    
                } 
             
                
            })
            .error(function(){
             
                console.log('teste');

            });
   
    }
    
// fim - Deleta o veiculo selecionado  
    
// inicio - Editar cadastro dos veiculos
    

// inicio - abre e fecha a tela de cadastro       
        $scope.abrirCadastro = function(status){
            $scope.cadVeiculo = status;
            $scope.listVeiculos();
        }
// fim - abre e fecha a tela de cadastro
    
// inicio - busca dados dos selects do formulario de cadastro
    $scope.dadosCadOs = function(){
        
        $http.get('api/dadosCadOs/unidades')
            .success(function(data){              
                $scope.unidades = data.dadosCadOs;                
            })
            .error(function(){
                alert("Falha em obter dados");
            });  
            
        $http.get('api/dadosCadOs/marcas')
            .success(function(data){              
                $scope.marcas = data.dadosCadOs;
         
            })
            .error(function(){
                alert("Falha em obter dados");
            });
        
        $http.get('api/dadosCadOs/modelos_veiculos')
            .success(function(data){              
                $scope.modelos = data.dadosCadOs;
               
            })
            .error(function(){
                alert("Falha em obter dados");
            });
            
        $http.get('api/dadosCadOs/ccustos')
            .success(function(data){              
                $scope.ccustos = data.dadosCadOs;
              
            })
            .error(function(){
                alert("Falha em obter dados");
            });
    }
    $scope.dadosCadOs();
    
// fim - busca dados dos selects do formulario de cadastro
    
    
    
     // inicio - cadastra os dados de OS e produtos no banco de dados.    
    $scope.cadastroVeiculo = function(){        
        $http
            .post('api/cadVeiculo',  $scope.Veiculo)
            .success(function(data){
                if(!data.erro) {
                    // deu certo o cadastro
                    
                   $scope.titulo_modal = "Deu tudo certo! :D";
                    $scope.msg = "Cadastrado com sucesso!";
                    $('#cadAlerta').openModal();
                    
                    $scope.Veiculo = objVeiculo();
                    
                } else {
                    $('#cadAlertaN').openModal();
                }
                
             console.log(data);   
            })
            .error(function(){
                alert("Falha geral da aplicação!");
            });
    }; 
 // fim - cadastra os dados de OS e produtos no banco de dados.
    
});


function objVeiculo(){
    return {   
        placa : "",
        modelo : "",
        marca : "",
        unidade : "",
        ccusto : "",      
   
    };
}