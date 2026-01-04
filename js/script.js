// Selecionando os campos de entrada (Inputs e Select)
const inputDescricao = document.getElementById("input-description");
const inputValor = document.getElementById("input-value");
const selectTipo = document.getElementById("select-type");

//  Selecionando o botão de ação
const btnAdicionar = document.getElementById("inputBtn");

//  Selecionando os elementos de exibição (Lista e Saldo)
const listaDespesas = document.getElementById("expenses-ul");
const spanSaldo = document.getElementById("saldo-atual");

// declarando o array de despesas
const despesas = [];

// =======================
// Mostrar na tela
// =======================
function mostrarnaTela() {
  listaDespesas.innerHTML = "";
  despesas.forEach((el) => {
    let li = document.createElement("li");
    li.innerText = `Descrição: ${el.descricao} | Valor R$ ${el.valor.toFixed(
      2
    )} | Tipo: ${el.tipo}`;

    if (el.tipo === "entrada") {
      li.classList.add("entrada");
    } else if (el.tipo === "saída") {
      li.classList.add("saida");
    }

    // botão remover
    let btnExcluir = document.createElement("button");
    btnExcluir.classList.add("id", "btn-excluir");
    btnExcluir.innerText = "Excluir";

    btnExcluir.addEventListener("click", () => {
      removerDespesa(el.id);
    });

    li.appendChild(btnExcluir);
    listaDespesas.appendChild(li);
  });
}

// Saldo

function atualizarSaldo() {
  let saldo = 0;
  despesas.forEach((el) => {
    if (el.tipo === "entrada") {
      saldo += el.valor;
    } else if (el.tipo === "saída") {
      saldo -= el.valor;
    }
  });
  spanSaldo.innerText = `R$ ${saldo.toFixed(2)}`;
}

// remover despesa

function removerDespesa(id) {
  const novaLista = despesas.filter((el) => el.id !== id);

  despesas.length = 0;
  despesas.push(...novaLista);

  mostrarnaTela();
  atualizarSaldo();
}

// botão adicionar

btnAdicionar.addEventListener("click", (e) => {
  let descricao = inputDescricao.value;
  let valor = parseFloat(inputValor.value);
  let tipo = selectTipo.value;
  e.preventDefault();

  // validações

  if (descricao.trim() === "") {
    alert("Por favor, informe a descrição.");
    return;
  }

  if (inputValor.value === "") {
    alert("Por favor, informe um valor.");
    return;
  }

  if (isNaN(valor)) {
    alert("O valor precisa ser um número válido.");
    return;
  }

  if (valor <= 0) {
    alert("O valor precisa ser maior que zero.");
    return;
  }

  let objetoDespesa = {
    id: Date.now(),
    descricao: descricao,
    valor: valor,
    tipo: tipo,
  };

  despesas.push(objetoDespesa);
  mostrarnaTela();
  atualizarSaldo();

  // limpar os campos
  inputDescricao.value = "";
  inputValor.value = "";
});
