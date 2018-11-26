(function (DOM) {
  'use strict';

  /*
  Vamos estruturar um pequeno app utilizando módulos.
  Nosso APP vai ser um cadastro de carros. Vamos fazê-lo por partes.
  A primeira etapa vai ser o cadastro de veículos, de deverá funcionar da
  seguinte forma:
  - No início do arquivo, deverá ter as informações da sua empresa - nome e
  telefone (já vamos ver como isso vai ser feito)
  - Ao abrir a tela, ainda não teremos carros cadastrados. Então deverá ter
  um formulário para cadastro do carro, com os seguintes campos:
    - Imagem do carro (deverá aceitar uma URL)
    - Marca / Modelo
    - Ano
    - Placa
    - Cor
    - e um botão "Cadastrar"
  Logo abaixo do formulário, deverá ter uma tabela que irá mostrar todos os
  carros cadastrados. Ao clicar no botão de cadastrar, o novo carro deverá
  aparecer no final da tabela.
  Agora você precisa dar um nome para o seu app. Imagine que ele seja uma
  empresa que vende carros. Esse nosso app será só um catálogo, por enquanto.
  Dê um nome para a empresa e um telefone fictício, preechendo essas informações
  no arquivo company.json que já está criado.
  Essas informações devem ser adicionadas no HTML via Ajax.
  Parte técnica:
  Separe o nosso módulo de DOM criado nas últimas aulas em
  um arquivo DOM.js.
  E aqui nesse arquivo, faça a lógica para cadastrar os carros, em um módulo
  que será nomeado de "app".
  */

  function app() {

    let $campoImagemCarro = new DOM('[data-js="imgCarro"]');
    let $campoMarcaModelo = new DOM('[data-js="marcamodelo"]');
    let $campoAnoCarro = new DOM('[data-js="ano"]');
    let $campoPlacaCarro = new DOM('[data-js="placa"]');
    let $campoCorCarro = new DOM('[data-js="cor"]');
    let $butaoEnviar = new DOM('[data-js="enviar"]');
    let $tableCar = new DOM('[data-js="carroscadastrados"]');

    function getURL(url, callback) {
      var req = new XMLHttpRequest();
      req.open('GET', url);
      req.addEventListener('readystatechange', function () {
        if (req.readyState === 4 && req.status === 200) {
          callback(req.responseText);
        }
        if (req.status !== 200) {
          callback(null, new Error('Request failed' + req.statusText));
        }
      }, false);
      req.addEventListener('error', function () {
        callback(null, new Error("Network error"));
      }, false);
      req.send();
    }

    function setCarroInTable() {
      let $tableRow = document.createElement('tr');
      let $tableData = returnArrayWithElements();
      populeRow($tableRow, $tableData);
      $tableCar.get()[0].appendChild($tableRow);
    }

    function returnArrayWithElements() {
      let arrayElements = [$campoImagemCarro, $campoMarcaModelo, $campoAnoCarro, $campoPlacaCarro, $campoCorCarro];
      return arrayElements.map(function (item) {
        let td = document.createElement('td');
        let copyElement = item.get()[0].value;
        td.appendChild(document.createTextNode(copyElement));
        return td;
      });
    }


    function setNomeETelefone(content) {
      let answer = JSON.parse(content);
      let $nomeLoja = new DOM('[data-js="nomeloja"]');
      let $telefoneLoja = new DOM('[data-js="telefoneloja"]');

      $nomeLoja.get()[0].appendChild(document.createTextNode(answer.name));
      $telefoneLoja.get()[0].appendChild(document.createTextNode(answer.phone));
    }

    function populeRow(row, arrData) {
      arrData.forEach(function (item, index) {
        if (index === 0) {
          let tagImg = document.createElement('img');
          tagImg.setAttribute('src', $campoImagemCarro.get()[0].value);
          return row.appendChild(tagImg);
        }
        return row.appendChild(item);
      });
    }

    function validateInputs() {
      if (!/^[\d]{4}$/.test($campoAnoCarro.get()[0].value)) {
        return false;
      }
      if (!/^[a-z]{3}[\d]{4}$/i.test($campoPlacaCarro.get()[0].value.replace(/[\W]/g, ''))) {
        return false;
      }
      return true;
    }

    function limparCampos() {
      $campoImagemCarro.value = "";
      $campoMarcaModelo.value = "";
      $campoAnoCarro.value = "";
      $campoPlacaCarro.value = "";
      $campoCorCarro.value = "";
    }

    function initializing() {

      getURL('company.json', function (content, error) {
        if (error != null) {
          console.log('Erro na requisição ' + error);
        }
        setNomeETelefone(content);
      });

      $butaoEnviar.on('click', function (e) {
        e.preventDefault();
        if (!validateInputs()) {
          alert("Preencha com dados validos");
          limparCampos();
          return;
        }
        setCarroInTable();
        limparCampos();
      });

    }

    return {
      init: initializing()
    }


  }

  app();
})(window.DOMLib);