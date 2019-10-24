var url_base = "https://api.github.com/users/";
var url;

$( document ).ready(function() {
  var sPageURL = window.location.search.substring(1);
  if(sPageURL != ""){
    search(sPageURL);
  }
});

function setSearchParam(){
  var input = document.getElementById('user-input').value;
  search(input);
}

function search(input) {
  url = url_base + input;
  reset()
  fetch(url)
    .then(response => response.json())
    .then(json => {
      if (json.message == 'Not Found') {
        $('#infos-user').hide();
        $('#infos-user-not-found').show();
        document.getElementById('username-not-found').innerText = 'Usuário não encontrado!';
        window.location.href = '#infos-user-not-found';
      } else {
        $('#infos-user-not-found').hide();
        $('#infos-user').show();
        $('#repos-box').hide();
        $('#starred-box').hide();
        window.location.href = '#infos-user';
        document.getElementById('username').innerText = json.login;
        document.getElementById('avatar').setAttribute('src', json.avatar_url);
        document.getElementById('bio').innerText = json.bio;
        document.getElementById('html-url').setAttribute('href', json.html_url);
      }
    })
}

function reset() {
  document.getElementById('username').innerText = '';
  document.getElementById('avatar').setAttribute('src', 'http://via.placeholder.com/462x462/B2FFC9?text=Find+a+GitHub+user');
  document.getElementById('bio').innerText = '';
  document.getElementById('html-url').setAttribute('href', '');
}

function searchRepos() {
  resetRepos();
  var urlSearch = url + "/repos";
  fetch(urlSearch)
    .then(response => response.json())
    .then(json => {
      $('#repos-box').show();
      window.location.href = '#repos-box';
      if (json.length > 0) {
        for (var i = 0; i < json.length; i++) {
          if (json[i].html_url != null) {
            var a = document.createElement("A");
            var br = document.createElement("BR");
            a.setAttribute("id", "html-url-" + i);
            a.setAttribute('href', json[i].html_url);
            a.setAttribute("target", "_blank");
            a.setAttribute("class", "repos-a");
            a.innerHTML = json[i].description;
            document.getElementById("repos-response").appendChild(a);
            document.getElementById("repos-response").appendChild(br);
          }
        }
      } else {
        var p = document.createElement("P");
        p.setAttribute("id", "not-found");
        p.innerHTML = "Nenhum Repositório encontrado!"
        document.getElementById("repos-response").appendChild(p);
      }
    })
}

function resetRepos(){
  const myNode = document.getElementById("repos-response");
  while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
  }
}

function searchStarred() {
  resetStarred();
  var urlSearch = url + "/starred";
  fetch(urlSearch)
    .then(response => response.json())
    .then(json => {
      $('#starred-box').show();
      window.location.href = '#starred-box';
      if (json.length > 0) {
        for (var i = 0; i < json.length; i++) {
          if (json[i].html_url != null) {
            var a = document.createElement("A");
            var br = document.createElement("BR");
            a.setAttribute('href', json[i].html_url);
            a.setAttribute("target", "_blank");
            a.setAttribute("class", "repos-a");
            a.innerHTML = json[i].description;
            document.getElementById("starred-response").appendChild(a);
            document.getElementById("starred-response").appendChild(br);
          }
        }
      } else {
        var p = document.createElement("P");
        p.innerHTML = "Nenhum Favorito encontrado!"
        document.getElementById("starred-response").appendChild(p);
      }
    })
}

function resetStarred(){
  const myNode = document.getElementById("starred-response");
  while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
  }
}
