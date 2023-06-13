$(function () {
    //criando tabuleiro
    var centro = document.createElement('center');

    var tabuleiro = document.createElement('table');

    var k = 0;

    for (var i = 0; i < 10; i++) {
        //criando elemento para as linhas
        var tr = document.createElement('tr');

        for (var j = 0; j < 20; j++) {
            //criando elemento para as colunas
            var td = document.createElement('td');
            td.setAttribute('class', 'celula celulamarrom');
            tr.appendChild(td);

            td.setAttribute('id', k++);
            tr.appendChild(td);
        }
        tabuleiro.appendChild(tr);
    }
    //configurando o tamanho do tabuleiro e a sua localização
    centro.appendChild(tabuleiro);
    tabuleiro.setAttribute('width', '500px');
    tabuleiro.setAttribute('height', '500px');
    tabuleiro.style.marginBottom = "15px";
    tabuleiro.style.marginTop = "10px";

    document.body.appendChild(centro);

    //definindo algumas variáveis
    var cols = document.getElementsByTagName("td");
    var verifica = new Array(cols.length);
    var restantes = 0;
    var Ouro = new Array(cols.length);
    var cliques = 0;

    //função que irá realizar as ações do jogo, tanto como completar os espaços 
    //com tesouro e também as ações de clique  e descoberta onde estão os tesouros

    function principal(opp) {

        //iniciando o select, zerando variáveis, preenchendo os espaços 
        //com a quantidade de ouro de acordo com a dificuldade selecionada

        cliques = 0;
        $("h4").html("Tentativas: " + cliques);

        for (var i = 0; i < verifica.length; i++) {
            verifica[i] = 0;
        }
        for (var i = 0; i < cols.length; i++) {
            cols[i].innerHTML = " ";
            cols[i].setAttribute('class', 'celula celulamarrom');
        }

        for (var i = 0; i < Ouro.length; i++) {
            Ouro[i] = 0;
        }

        //definindo o layout da tela pra cada dificuldade e também
        // o tamanho do array de tesouros de cada dificuldade
        var arraysorteado;
        if (opp == 1) {
            document.body.style.backgroundColor = '#228B22';
            document.getElementById("titulo").style.color = "#00FF00";
            arraysorteado = new Array(100);
            restantes = 100;
            $("h5").html("Encontre 100 tesouros!");
        }
        else if (opp == 2) {
            document.body.style.backgroundColor = '#008000';
            document.getElementById("titulo").style.color = "#FFA500";
            arraysorteado = new Array(50);
            restantes = 50;
            $("h5").html("Encontre 50 tesouros!");
        }
        else if (opp == 3) {
            document.body.style.backgroundColor = '#006400';
            document.getElementById("titulo").style.color = "#FF0000";
            arraysorteado = new Array(20);
            restantes = 20;
            $("h5").html("Encontre 20 tesouros!");
        }

        //definindo os as posições aleatórias
        for (var i = 0; i < arraysorteado.length; i++) {
            var numeroaleatorio = Math.trunc(Math.random() * (200 - 0) + 0);

            while (arraysorteado.includes(numeroaleatorio)) {
                numeroaleatorio = Math.trunc(Math.random() * (200 - 0) + 0);
            }

            arraysorteado[i] = numeroaleatorio;
        }

        //a posição sorteada que ficará com o ouro receberá o valor 1
        for (var i = 0; i < arraysorteado.length; i++) {
            Ouro[arraysorteado[i]] = 1;
        }

        //contando cliques e tesouros
        for (k = 0; k < cols.length; k++) {
            $(cols[k]).on("click", function (clicar) {
                $(this).off("click");

                //se a posição do array de ouro for 1, então ele vai ser o tesouro
                if (Ouro[clicar.target.id] == 1) {
                    this.innerHTML = '<img id = "tesouro" src = "./imagens/dinheiro.png" alt = "ouro"></img>';
                    this.setAttribute('class', 'celula celulaouro');
                    $("h5").html("Tesouros restantes: " + --restantes);
                    //se não for 1, então vai receber X
                } else {
                    this.innerHTML = '<img id = "errado" src = "./imagens/errado.png" alt = "errado"></img>';
                    this.setAttribute('class', 'celula celulavazia');
                }
                if (verifica[clicar.target.id] == 0) {
                    cliques++;
                    $("h4").html("Tentativas: " + cliques);
                }

                if (restantes == 0) {
                    alert("Parabéns, você desenterrou todos os tesouros possíveis!");
                }
                verifica[clicar.target.id] = 1;
            });
        }
    }
    //função para mudar a dificuldade do jogo
    $("#confirmardificuldade").on("click", function () {
        var opt = document.getElementById("selecionarDificuldade").options.selectedIndex;
        principal(opt);
    });
});