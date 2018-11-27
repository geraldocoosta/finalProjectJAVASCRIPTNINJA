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
      setExcludeButton($tableRow);
      $tableCar.get()[0].appendChild($tableRow);
    }

    function setExcludeButton(row){
      let td = document.createElement('td');
      let button = document.createElement('button');
      button.appendChild(document.createTextNode('Excluir'));
      td.appendChild(button);
      button.addEventListener('click',function(){
        var removed = this.parentElement.parentElement;
        removed.remove();
      },false)
      return row.appendChild(td);
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
      if (content === null){
        return;
      }
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
      $campoImagemCarro.element[0].value = "";
      $campoMarcaModelo.element[0].value = "";
      $campoAnoCarro.element[0].value = "";
      $campoPlacaCarro.element[0].value = "";
      $campoCorCarro.element[0].value = "";
    }

    function initializing() {

      getURL('js/company.json', function (content, error) {
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
  app().init;
})(window.DOMLib);