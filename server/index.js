'use strict';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

let cars = [];

app.get('/', function (_, resp) {
    resp.json(cars);
});

app.post('/', function (req, resp) {
    let urlcar = req.body.urlcar;
    let marcamodelo = req.body.marcamodelo;
    let ano = req.body.ano;
    let placa = req.body.placa;
    let cor = req.body.cor;

    let okParams = cars.some(function (item) {
        return item.placa === placa;
    });

    if (okParams) {
        return resp.json(cars);
    }

    let params = [urlcar, marcamodelo, ano, placa, cor];

    params = params.map(function (item) {
        return item.replace(/([\D\W])/g, '\$1');
    });

    okParams = params.every(validaParametros);

    if (okParams) {
        cars.push({
            urlcar: params[0],
            marcamodelo: params[1],
            ano: params[2],
            placa: params[3],
            cor: params[4],
        });
        return resp.json(cars);
    }
    resp.status(400).json({ erro: "Parametros invalidos" });
});



function validaParametros(item) {
    return !!item;
}

app.listen(3000);