let nome = prompt("Qual é o seu nome?");




// blz, preciso criar uma recrisão no meu banco para que ele armazene meu user, preciso criar uma var que armazene meu username 


const username = {name:nome}

// criar a requisição, axios e depois post



function verifyUser(){
    const pull = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', username);

    pull
    .then(verifyUser);
    console.log(username);

}


verifyUser();