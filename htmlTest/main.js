(function () {
    'use strict';

    function app() {
        function getURL(path, method, callback, sendArguments) {
            let req = new XMLHttpRequest();
            req.open(method, path);
            req.addEventListener('readystatechange', function () {
                if (req.status === 200 && req.readyState === 4)
                    callback(req.responseText);
                else if (req.status === 400)
                    callback(null, new Error("Request failed" + req.statusText));
            }, false);
            req.addEventListener('error', function () {
                callback(null, new Error("Network error"));
            }, false);
            if (method !== 'GET') {
                req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            }
            req.send(sendArguments);
        }

        return {
            init: function () {
                getURL('http://localhost:3000', 'GET', function (content, error) {
                    if (error !== null) {
                        return console.log(JSON.parse(content));
                    }
                    console.log(error);
                });

                getURL('http://localhost:3000', 'POST', function (content, error) {
                    if (error !== null) {
                        return console.log(JSON.parse(content));
                    }
                    console.log(error);
                }, 'username=gegerallllldo&age=21');
            }
        }
    }
    app().init();

    // um pouco sobre o método ajax, tem o método abort, auto explicativo
    // pode-se fazer um abort ao receber somente os cabeçalhos, com o readtstate
    // junto com esse método, não perderei tempo com isso
    // quando usado o método post, deve ser usado o método setRequestHeader
    // ta sentando o tipo do cabeçalho da requisição, no caso, o mais usado é
    // para setar o Content-Type, geralmente com o valor 'aplication/www-form-urlencoded'
    // no send, será enviado o valor no formato de query string
})();