(function (DOM) {
  'use strict';

  function app() {

    let $campoImagemCarro = new DOM('[data-js="imgCarro"]');
    let $campoMarcaModelo = new DOM('[data-js="marcamodelo"]');
    let $campoAnoCarro = new DOM('[data-js="ano"]');
    let $campoPlacaCarro = new DOM('[data-js="placa"]');
    let $campoCorCarro = new DOM('[data-js="cor"]');
    let $butaoEnviar = new DOM('[data-js="enviar"]');
    let $tableCar = new DOM('[data-js="carroscadastrados"]');

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

    function setCarroInTable(content) {
      let cars = JSON.parse(content);
      let fragment = document.createDocumentFragment();
      let mapCars = cars.map(function (item) {
        let $tableRow = document.createElement('tr');
        let arrAtributes = [item.urlcar, item.marcamodelo, item.ano, item.placa, item.cor];

        let tds = arrAtributes.map(function (item, index) {
          let td = document.createElement('td');
          if (index === 0) {
            let img = document.createElement('img');
            img.setAttribute('src', item);
            td.appendChild(img);
            return td;
          }
          td.appendChild(document.createTextNode(item));
          return td;
        });

        $tableRow.appendChild(tds);


      });

    }

    function setExcludeButton(row) {
      let td = document.createElement('td');
      let button = document.createElement('button');
      button.appendChild(document.createTextNode('Excluir'));
      td.appendChild(button);
      button.addEventListener('click', function () {
        var removed = this.parentElement.parentElement;
        removed.remove();
      }, false)
      return row.appendChild(td);
    }


    function setNomeETelefone(content) {
      if (content === null) {
        return;
      }
      let answer = JSON.parse(content);
      let $nomeLoja = new DOM('[data-js="nomeloja"]');
      let $telefoneLoja = new DOM('[data-js="telefoneloja"]');

      $nomeLoja.get()[0].appendChild(document.createTextNode(answer.name));
      $telefoneLoja.get()[0].appendChild(document.createTextNode(answer.phone));
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
      $campoImagemCarro.element[0].value = "";
      $campoMarcaModelo.element[0].value = "";
      $campoAnoCarro.element[0].value = "";
      $campoPlacaCarro.element[0].value = "";
      $campoCorCarro.element[0].value = "";
    }

    function setCarroNoServer() {
      let campoImg = "urlcar=" + $campoImagemCarro.element[0].value.trim();
      let marcamodelo = "marcamodelo=" + $campoMarcaModelo.element[0].value.trim();
      let ano = "ano=" + $campoAnoCarro.element[0].value.trim();
      let placa = "placa=" + $campoPlacaCarro.element[0].value.trim();
      let cor = "cor=" + $campoCorCarro.element[0].value.trim();

      let queryString = [campoImg, marcamodelo, ano, placa, cor];
      queryString = queryString.reduce(function (acc, att) {
        return acc += '&' + att;
      });

      getURL('http://localhost:3000', 'POST', function (content, error) {
        if (error === null) {
          //return setCarroinTable(content);
        }
        console.log(error);
      }, queryString);

    }

    function initializing() {

      getURL('js/company.json', 'GET', function (content, error) {
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
        setCarroNoServer();
        setCarroInTable();
        limparCampos();
      });
    }

    return {
      init: initializing()
    }
  }
  app().init;
})(window.DOMLib);