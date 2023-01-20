let nome = prompt("Qual é o seu nome?");




// blz, preciso criar uma recrisão no meu banco para que ele armazene meu user, preciso criar uma var que armazene meu username 


const username = {name:nome}

// criar a requisição, axios e depois post

verifyUser();

function verifyUser(){
    const pull = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', username);

    pull
    .then(verifyUser);
    console.log(username);

}





function pullServMsg(){
    const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');

    promise.then(sucessoConversa);
    promise.catch(erroConversa);
}

function erroConversa(){
    console.log("erro");
}

function sucessoConversa(pull){
    let mensagensCorpo = document.querySelector('.mensagens');
    mensagensCorpo.innerHTML ='';

    for(i=0; i<300;i++){
        let hora = pull.data[i].time;
        let de = pull.data[i].from;
        let para = pull.data[i].to;
        let textoMensagem = pull.data[i].text;
        let tipo = resposta.data[i].type;

        mensagensCorpo.innerHTML +=`<div data-test="message" class="${tipo}"> (${hora}) ${de} para ${para}:${textoMensagem}</div> `;


    }

    mensagensCorpo.querySelector('div:last-child').scrollIntoView();

}


let mensagensCorpo = document.querySelector('.mensagens');


// a funcao sucessoCOnversa vai precisar passar tudo que tem na conversa, hora nome e etc, preciso pensar niss