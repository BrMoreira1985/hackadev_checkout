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
let _cardCupom = document.querySelectorAll(".cardCupom");
let valorTotal = 0;
let valorSubTotal = 508.0;
let valorFrete = 0;
let prazoFrete = '';
let quantidadeParcelas = 0;
let desconto = 0;
let formaPagamento = '';
let tipoParcelamento = "";
const lockScreen = screen.orientation.lock('portrait');

function atualizaResumo(parametro, valor){

  valorTotal = parseFloat((valorSubTotal * (1 - (desconto/100))) + valorFrete).toFixed(2);

  if(parametro == 'subtotal')
  return;

  if(parametro == 'frete')
  _frete.innerHTML = valor;

  if(parametro == 'total'){
   _valorTotal.innerHTML = valor; 
   _valorTotalResumo.innerHTML = valor;
  }
  
  if(parametro == 'prazo')
  _prazoEntrega.innerHTML = valor;

  if(parametro == 'pagamento')
  _pagamento.innerHTML = valor;

  if(parametro == 'parcelas')
  _parcelas.innerHTML = valor;

}

function adicionaFrete(valor, prazo) {
  valorTotal = valorSubTotal + valor;
  valorTotal = valorTotal.toFixed(2);
  prazoFrete = `Até ${prazo} dias úteis`;
  valorFrete = `R$ ${valor},00`;
  if (prazo === 0) prazoFrete = `Imediato`;

  atualizaResumo('total', `R$ ${valorTotal}`);
  atualizaResumo('prazo', prazoFrete);
  atualizaResumo('frete',`${valorFrete}`);
}

function selecionaPagamento(pagamento, parcelas) {
  
  if (typeof parcelas === "number") {
    tipoParcelamento = calcParcelamento(parcelas);
    quantidadeParcelas = parcelas;
  } else {
    tipoParcelamento = parcelas;
  }

  if (parcelas === "Aguardando definir" && quantidadeParcelas > 0)
    tipoParcelamento = calcParcelamento(quantidadeParcelas);

    atualizaResumo('pagamento', pagamento);
    atualizaResumo('parcelas', tipoParcelamento);
  if (parcelas !== "Aguardando definir") mostraFinalizar();
}

function calcParcelamento(parcelas) {
  let valores = parseFloat((valorTotal / parcelas).toFixed(2)).toFixed(2);
  let texto = `${parcelas} x de R$ ${valores}`;
  return texto;
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

function mostrarCupom(){
  let quantidade = _cardCupom.length;

  for(let i = 0; i < quantidade; i++)
  _cardCupom[i].classList.add("cupom__show");
}

function defineParcelamento() {
  let quantidade = _qtdParcelas.length;

  for (let i = 0; i < quantidade; i++) {
    let qtd = parseInt(_qtdParcelas[i].innerHTML);
    _qtdParcelas[i].innerHTML = calcParcelamento(qtd);
  }
}
