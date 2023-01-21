let nome = prompt("Qual é o seu nome?");

const objUsername = 
{
     name: nome
    
}


let mensagensCorpo = document.querySelector('.mensagens');
const mensagem = document.querySelector('footer input');

verifyUser();

function verifyUser() {
    const resposta = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', objUsername);

   

    resposta
    .then(usuarioVerificado);
    

}

function conection() {

    const mantendoConexao = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', objUsername);

    mantendoConexao.then()
    mantendoConexao.catch()

}



function sucessoConversa(resposta) {
    let mensagensCorpo = document.querySelector('.mensagens');
    mensagensCorpo.innerHTML = '';

    for (i = 0; i < 100; i++) {
        let hora = resposta.data[i].time;
        let de = resposta.data[i].from;
        let para = resposta.data[i].to;
        let textoMensagem = resposta.data[i].text;
        let tipo = resposta.data[i].type;

        if (tipo === 'status' || tipo === 'message' ){
        mensagensCorpo.innerHTML += `<div data-test="message" class="${tipo}"> (${hora}) ${de} para ${para}:${textoMensagem}</div> `;

        }


        if (tipo === 'private_message' && (nome === para || nome === de)) {
            mensagensCorpo.innerHTML += `<div data-test="message" class="${tipo}"> (${hora}) ${de} para ${para}:${textoMensagem} " </div>  `;


        }

    }

    mensagensCorpo.querySelector('div:last-child').scrollIntoView();

}

function erroConversa(erro) {
    console.log("erro");
    console.log(erro);
    window.location.reload();
}

function batePapoServ() {
    const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');

    promise.then(sucessoConversa);
    promise.catch(erroConversa);
}


function enviarMensagemParaChat(){


    const msg = {
        from: nome,
        to: "Todos",
        text: mensagem.value,
        type: "message" 
    }

    const enviar = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', msg);

    mensagem.value = "";

    enviar.then(pegarConversaNoServidor);
    enviar.catch(erroConversa);
    batePapoServ();
}



function usuarioVerificado (){
   
    

    batePapoServ()
    setInterval(function (){ 
        batePapoServ()
    } ,3000)
    
    setInterval(conection, 1000);
}

document.addEventListener("keypress", function (e){


if (e.key === "Enter") {

    const btn = document.querySelector('footer img')
    btn.click();
}
})