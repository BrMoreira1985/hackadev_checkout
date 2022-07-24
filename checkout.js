let _checkout = document.querySelector(".checkout");
let _valorTotal = document.querySelector("#ValorTotal");
let _valorTotalResumo = document.querySelector("#ValorTotalResumo");
let _prazoEntrega = document.querySelector("#PrazoEntrega");
let _pagamento = document.querySelector("#Pagamento");
let _parcelas = document.querySelector("#Parcelas");
let _frete = document.querySelector("#Frete");
let _fog = document.querySelector("#Fog");
let _sacola = document.querySelector("#Sacola");
let _opcaoParcela = document.querySelectorAll(".parcelas");
let _opcoesPagamento = document.querySelectorAll(".OpcoesPagamento");
let _qtdParcelas = document.querySelectorAll(".qtdParcelas");
let _botaoFinalizar = document.querySelector(".botaoFinalizar");
let valorTotal = 0;
let valorSubTotal = 285.0;
let quantidadeParcelas = 0;

function adicionaFrete(valor, prazo) {
  valorTotal = valorSubTotal + valor;
  valorTotal = valorTotal.toFixed(2);
  let prazoFrete = `Até ${prazo} dias úteis`;
  let valorFrete = `R$ ${valor},00`;
  if (prazo === 0) prazoFrete = `Imediato`;

  _valorTotal.innerHTML = `R$ ${valorTotal}`;
  _valorTotalResumo.innerHTML = `R$ ${valorTotal}`;
  _prazoEntrega.innerHTML = prazoFrete;
  _frete.innerHTML = `${valorFrete}`;
}

function selecionaPagamento(pagamento, parcelas) {
  let tipoParcelamento = "";

  if (typeof parcelas === "number") {
    tipoParcelamento = calcParcelamento(parcelas);
    quantidadeParcelas = parcelas;
  } else {
    tipoParcelamento = parcelas;
  }

  if (parcelas === "Aguardando definir" && quantidadeParcelas > 0)
    tipoParcelamento = calcParcelamento(quantidadeParcelas);

  _pagamento.innerHTML = pagamento;
  _parcelas.innerHTML = tipoParcelamento;
  if (parcelas !== "Aguardando definir") mostraFinalizar();
}

function calcParcelamento(parcelas) {
  let valores = (valorTotal / parcelas).toFixed(2);
  let texto = `${parcelas} x de R$ ${valores}`;
  return texto;
}

function changeScreen() {
  // _checkout.setAttribute("class", "hidden");
}

function fechaSacola() {
  _fog.classList.remove("mostrar__opacidade");
  _sacola.classList.remove("mostrar__slide");
}

function abreSacola() {
  _fog.classList.add("mostrar__opacidade");
  _sacola.classList.add("mostrar__slide");
}

function mostraParcelas() {
  let length = _opcaoParcela.length;

  for (let i = 0; i < length; i++)
    _opcaoParcela[i].classList.add("parcelas__show");
}

function escondeParcelas() {
  let length = _opcaoParcela.length;

  for (let i = 0; i < length; i++)
    _opcaoParcela[i].classList.remove("parcelas__show");
}

function mostraPagamentos() {
  defineParcelamento();
  let quantidade = _opcoesPagamento.length;

  for (let i = 0; i < quantidade; i++)
    _opcoesPagamento[i].classList.add("pagamento__show");
}

function mostraFinalizar() {
  _botaoFinalizar.classList.add("botao__show");
}

function defineParcelamento() {
  let quantidade = _qtdParcelas.length;

  for (let i = 0; i < quantidade; i++) {
    let qtd = parseInt(_qtdParcelas[i].innerHTML);
    _qtdParcelas[i].innerHTML = calcParcelamento(qtd);
  }
}
