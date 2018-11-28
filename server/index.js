'use strict';
//basicamente, para contruir um server no node vamos usar algumas libs
//podemos instalar o nodemon para manter a aplicação sempre rodando
// a cada alteração, ele derruba o server e sobe de novo, tirando a 
// necessidade de fazer isso manualmente
// modulo para criação de api rest com node
//lib express
// para instalar localmente usar o comando:
// npm install --save express
// sempre lembrar de criar o package.json e deixar um objeto em branco
// ao rodar esse comando, será criado uma pasta chamada node_modules
// aonde serão salvos os modulos e dependencias
//dentro desse arquivo, é bom colocar o 'use strict';
// não tem problemas com scope global no node, pq pra setar uma váriavel
// no escopo global é preciso forçar, porém é bom usar o use strict

// para requisitar um arquivo
// o node vai procurar na pasta node_module se tem um diretoria chamado 
// express, e se lá dentro tem um arquivo iniciador ou index.js
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');

var users = [{ username: 'Gege', age: 21 },
{ username: 'Tete', age: 19 },
{ username: 'Pitoco', age: 32 }];

// executando o express aparentemente.
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// aqui estamos settando uma chamada normal a raiz dessa api, com o metodo
// get, bem intuitivo
// ao ser chamado esse método, essa função de callback será chamada
// xD  
// req = request, resp = response, 21 anos de curso, já tá obvio
// lembrando, se retornar direto, vai ficar carregando até o infinito
// método send do resp que retorna a resposta pro front
app.get('/', function (_, resp) {
    resp.json({ gege: "lindinho" });
});
//lembrando que nas apis REST ssó são retornados objetos json

//adicionando porta em que será ouvido esse servidor
//para resolver o problema do cors, que é o cross orgin session, ou algo assim
// é preciso baixar uma depedencia aqui no server e botar ela pra executar
// o comando para instalar o modulo cors para permitir esse acesso é 
// npm install --save cors
// depois disso, devemos setar o modulo
// como? fazemos uma váriavel receber um require('cors');
// e passando essa váriavel sendo executada dentro do método use do express
// assim, será resolvido o problema (resolvido o problema pra esse curos
// nao meta o louco)


// podemos acessar um parametro váriavel aqui no node com a seguinte sintaxe
app.get('/user/:username', function (req, resp) {
    var username = req.params.username;
    var exist = users.some(function (user) {
        return username === user.username;
    });
    if (!exist) {
        return resp.status(404).json({ Erro: 'Usuario não identificado' });
    }
    resp.json(users.filter(function (item) {
        return item.username === username;
    }));
});
// explicando, quando é colocado dois pontos algo, como no exemplo acima
// aquela parte da url vira uma váriavel
// com isso, podemos ter um url dinamica, e o server também é preparado
// pra lidar com isso
// lembrando que o método é params do parametro requisition, acessando
// o objeto com mesmo nome do parametro passado na url

// criei uma váriavel com um array, que retorna quando o usuario é existe
// baseado na url váriavel

//agora, vamos construir um método post
app.post('/', function (req, resp) {
    var username = req.body.username;
    var age = req.body.age;
    var exist = users.some(function (user) {
        return username === user.username;
    });
    if (!exist) {
        users.push({ username: username, age: age });
    }
    resp.json(users);
});

// para conseguir identificar uma query string e transformala em objeto
// precisamos de uma dependencia chamada body parser
// o comando para instalar essa dependencia é o seguinte:
// npm install --save body-parser
// depois settamos ele junto com as outras dependencias

app.listen('3000');