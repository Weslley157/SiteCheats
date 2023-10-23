window.sr = ScrollReveal({ reset: true });
sr.reveal('.efeito1', { rotate: { x: 0, y: 90, z: 0 }, duration: 2000 });

sr.reveal('.efeito2', { rotate: { x: 20, y: 100, z: 0 }, duration: 2000 });
// window.onload = function () {
//     document.getElementById('verificar-btn').addEventListener('click', valida);
   
// };
window.addEventListener('load', function() {

  var overlay = document.getElementById('load-overlay');
  var body = document.body;
  
  // Desativa a barra de rolagem
   body.style.overflow = 'hidden';
  
  setTimeout(function() {
    overlay.style.display = 'none';
    
    // Restaura a barra de rolagem
    body.style.overflow = 'auto';
  }, 1000);
});

const form = document.getElementById('form');
const campos = document.querySelectorAll('.inputuser');
 const spans = document.querySelectorAll('.labelin');
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;


function seterro(index) {
  campos[index].style.borderBottom = '1px solid red';
  if(index == 0){
  spans[index].textContent = 'Email deve ser valido';
  spans[index].style.color = 'red';
  }
  if(index == 1){
    spans[index].textContent = 'Senha deve ter mais de 2 caracteres';
    spans[index].style.color = 'red';
    }
    if(index == 2){
      spans[index].textContent = 'Nome deve ser valido';
      spans[index].style.color = 'red';
      }
}
function ok(index) {
  campos[index].style.borderBottom = '2px solid green';

  if(index == 3){
    spans[index].textContent = 'Email:';
    spans[index].style.color = 'green';
    }
    if(index == 1){
      spans[index].textContent = 'Senha:';
      spans[index].style.color = 'green';
      }
      if(index == 0){
        spans[index].textContent = 'Nome:';
        spans[index].style.color = 'green';
        }

 
}


function usuariovalidovalido()
{
  if (campos[0].value.length < 3) {
    seterro(0);
  }
  else
  {
ok(0);
  }
  
}

function senhavalido()
{
  if (campos[1].value.length < 3) {
    seterro(1);
  }
  else
  {
ok(1);
  }
  
}

function emailvalido()
{
  if (emailRegex.test(campos[3].value)) {
    
    ok(3);
  }
  else
  {
    seterro(3);
  }
  
}




var carrinhoItens = [];

function valida() {// Começar com o valor verdadeiro
  nomevalido();
  senhavalido();
  emailvalido();
  var valido = true;
  

  if(carrinhoItens.length<1)
  {
    var spanfinal = $("#nenhumitemform");
    spanfinal.text("Você deve ter algum item selecionado");
   valido = false;
  }

    
    if (valido) {
      
        var carrinhoItensSalvos = localStorage.getItem('carrinhoItens');
        if (carrinhoItensSalvos) {
          carrinhoItens = JSON.parse(carrinhoItensSalvos);
        }
        
        var textoItens = carrinhoItens.map(function(item) {
          return  item.nome + " " + item.preco +"<br>";
        }).join("\n");

        var formula = "Usuário: " + str_nome + "<br>Email: " + email + "<br>Itens: " + textoItens ;//+ "<br>Valor total: R$ "+total.toFixed(2);
        var pmodal = $("#modall-content");
        pmodal.html(formula);
  
        $("#modalfinal").modal("show");
        return true;
    }
}

$(document).ready(function() {
    $("#carouselExampleCaptions").carousel();

  // Animar o carousel automaticamente a cada 3 segundos
  setInterval(function() {
    $("#carouselExampleCaptions").carousel("next");
  }, 4000);
    
  
    // Verificar se existem itens salvos no armazenamento local e carregá-los para o carrinho
    var carrinhoItensSalvos = localStorage.getItem('carrinhoItens');
    if (carrinhoItensSalvos) {
      carrinhoItens = JSON.parse(carrinhoItensSalvos);



      atualizarCarrinho();
    }




  
    function atualizarCarrinho() {
      var total = 0;
      var contadorCarrinho = $(".contador-carrinho");
      contadorCarrinho.text(carrinhoItens.length);
  
     // var itensCarrinho = $("#itensCarrinho");
      var itensCarrinhoForm = $("#itensCarrinhoForm");
      var itensCarrinhoModal = $("#itensCarrinhoModal");
     
      itensCarrinhoForm.empty();
      itensCarrinhoModal.empty();
    //  itensCarrinho.empty();
  
    carrinhoItens.forEach(function(item) {
    //  var liForm = $("<li class='list-group-item'></li>").text(item.nome + " (ID: " + item.id + ") - " + item.dias + " dias"); // Inclua o campo dias ao texto
      var liModal = $("<li></li>").text(item.nome + " (ID: " + item.id + ")" +" - " + item.dias); // Inclua o campo dias ao texto
     // itensCarrinhoForm.append(liForm);
      itensCarrinhoModal.append(liModal);
      var preco = parseFloat(item.preco.replace(/\D/g, '')); // Remove caracteres não numéricos e converte para float
      total += preco;
    });
    
      var itemmodal = $("#valormodal");
      var totalCarrinho = $("#valorp");
      totalCarrinho.text("Valor total: R$ " + total.toFixed(2));
      itemmodal.text("Valor total: R$ " + total.toFixed(2));
      
      // Salvar os itens do carrinho no armazenamento local
      localStorage.setItem('carrinhoItens', JSON.stringify(carrinhoItens));

      var itemform = $("#valormodalformm");
      var itemformad = $("#valormodaladi");
      var itemformfinal = $("#valormodalff");
      
      itemform.text("Valor total: R$ " + total.toFixed(2));
      itemformad.text("Valor total: R$ " + total.toFixed(2));
      itemformfinal.text("Valor total: R$ " + total.toFixed(2));
    }



  
    $(".btn-adicionar-carrinho").click(function() {
      var item = {
          id: $(this).data("id"),
          nome: $(this).siblings(".titulocard").text(),
          preco: $(this).siblings(".card-text").text(),
          dias: $(this).siblings(".dias").text() // Adicione esta linha para obter a quantidade de dias do item
      };
      carrinhoItens.push(item);
      atualizarCarrinho();
      alert("Item adicionado ao carrinho!");
  });
  
  
    $(".btn-carrinho").click(function() {
      $("#carrinhoModal").modal("show");
    });

    $("#btnComprar").click(function() {
      var nomesItens = carrinhoItens.map(function(item) {
          return item.nome;
      });
      var idsItens = carrinhoItens.map(function(item) {
          return item.id;
      });
      var precosItens = carrinhoItens.map(function(item) {
          return item.preco;
      });
      var diasItens = carrinhoItens.map(function(item) { // Adicione esta linha para obter a quantidade de dias de cada item
          return item.dias;
      });
  
      var carrinhoItensInput = document.getElementById('carrinhoItensInput');
      var carrinhoIDsInput = document.getElementById('carrinhoIDsInput');
      var carrinhoPrecosInput = document.getElementById('carrinhoPrecosInput');
      var carrinhoDiasInput = document.getElementById('carrinhoDiasInput'); // Adicione esta linha para obter o campo do input de dias
  
      carrinhoItensInput.value = nomesItens.join(", ");
      carrinhoIDsInput.value = idsItens.join(", ");
      carrinhoPrecosInput.value = precosItens.join(", ");
      carrinhoDiasInput.value = diasItens.join(","); // Adicione esta linha para definir o valor do campo de dias
  
      // Envie o formulário programaticamente
      var carrinhoForm = document.getElementById('carrinhoForm');
      carrinhoForm.submit();
  });
  


  $("#limparcompra").click(function() {

         carrinhoItens = []; // Limpar o carrinho
         atualizarCarrinho();
            });
  
    $("#btnLimparCarrinho").click(function() {
      carrinhoItens = []; // Limpar o carrinho
      atualizarCarrinho();
    });

    $("#limparitemsem").click(function() {
      carrinhoItens = []; // Limpar o carrinho
      atualizarCarrinho();
      });
      $("#limparitem").click(function() {
        carrinhoItens = []; // Limpar o carrinho
        atualizarCarrinho();
        });
      $("#limparitemformmodal").click(function() {
        carrinhoItens = []; // Limpar o carrinho
        atualizarCarrinho();
        });
      $("#btnAdicionarItem").click(function() {
        $("#adicionarcarrinho").modal("show");
      });
  });


  