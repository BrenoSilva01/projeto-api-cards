let qtdeJogadores;
let jogo;
let opcaoValida = null;

function selecionarJogo(botaoClicado) {
  const seletor = "." + botaoClicado;

  // 1 - buscar o botao que foi selecionado anteriormente
  const botaoAnterior = document.querySelector(".selecionar-jogo .selecionado");

  // 2 - verificar se existe algum elemento com a classe selecionado
  if (botaoAnterior !== null) {
    // 2.1 - remover a classe selecionado
    botaoAnterior.classList.remove("selecionado");
  }

  // 3 - buscar o botao cliado e trazer para o js
  const botaoSelecionado = document.querySelector(seletor);
  // 4 - adicionar a classe selecionado no botao clicado
  botaoSelecionado.classList.add("selecionado");

  jogo = botaoSelecionado.innerHTML;
}

function SelecionarQtd(botao) {
  const botaoSelecionado = document.querySelector(
    ".qtd-jogadores .selecionado"
  );
  if (botaoSelecionado !== null) {
    botaoSelecionado.classList.remove("selecionado");
  }

  // 2 - alterar o elemento
  botao.classList.add("selecionado");

  qtdeJogadores = botao.innerHTML;
}
 // funcao finalizar
async function finalizar() {
  const tipoJogoSelecionado = document.querySelector(
    ".selecionar-jogo .selecionado"
  );
  const qtdJogadoresSelecionada = document.querySelector(
    ".qtd-jogadores .selecionado"
  );

  if (!tipoJogoSelecionado || !qtdJogadoresSelecionada) {
    alert("Por favor, selecione o tipo de jogo e a quantidade de jogadores.");
  } else {
    document.querySelector(".selecionar-jogo").classList.add("escondido");
    document.querySelector(".topo").classList.add("escondido");
    const loading = document.querySelector(".loading-overlay");
    loading.classList.remove("escondido");

    const paragrafo = document.querySelector(".mensagem-iniciando");
    paragrafo.innerHTML =
      "INICIANDO POKER 100 com o jogo " +
      jogo +
      " com " +
      qtdeJogadores +
      " jogadores ";

    // Adiciona o delay simulado
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // chamada api
    const response = await fetch(
      "https://deckofcardsapi.com/api/deck/new/draw/?count=5"
    );
    const data = await response.json();

    // criar container
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.gap = "10px";
    container.style.marginTop = "30px";
    container.style.justifyContent = "center";
    container.style.flexWrap = "wrap";

    data.cards.forEach((card) => {
      const img = document.createElement("img");
      img.src = card.image;
      img.alt = card.code;
      img.style.width = "80px";
      container.appendChild(img);
    });

    // inserir container
    document
      .querySelector(".conteudo")
      .insertAdjacentElement("afterend", container);

    // voltar icone
    const homeIcon = document.createElement("i");
    homeIcon.className = "fa-solid fa-house";
    homeIcon.style.fontSize = "30px";
    homeIcon.style.display = "block";
    homeIcon.style.margin = "30px auto";
    homeIcon.style.cursor = "pointer";
    homeIcon.onclick = () => (window.location.href = "index.html");

    // Insere o ícone depois do container das cartas
    container.insertAdjacentElement("afterend", homeIcon);

    // esconder o loading
    loading.classList.add("escondido");
  }
}
 // funcao perguntar idade
function perguntarIdade() {
  const ano = Number(prompt("Digite o Ano Nascimento:"));
  const idade = 2024 - ano;
  //condicao caso a idade nao seja valida
  if (ano == null || ano == "" || ano > 2024) {
    alert("Por favor, digite uma idade válida.");
    return;
  }
  if (idade < 18) {
    //1 pegar o elelmento no html e trazer para JS
    const paragrafo = document.querySelector(".aviso");
    //2 alterar o conteudo do texto do paragrafo
    paragrafo.innerHTML =
      "Ops, Voce tem " +
      idade +
      " anos, a idade necessaria para acessar o jogo é +18!";
  } else {
    //fazer com que ao entrar suma, o botao "entrar"
    const btn = document.querySelector(".botao-entrar");
    btn.classList.add("escondido");
    //alert("voce tem |"+ idade + "anos| e pode jogar");
    const paragrafo = document.querySelector(".aviso");
    paragrafo.innerHTML = "Voce entrou na Selecao de Jogo (+18)";

    const paragrafo2 = document.querySelector(".aviso");
    paragrafo2.classList.add("centralizar");

    const painel = document.querySelector(".selecionar-jogo");
    painel.classList.remove("escondido");
  }
}
