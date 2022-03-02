/**
* Obtains parameters from the hash of the URL
* @return Object
*/
function getHashParams() {
  var hashParams = {};
  var e, r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1);
  while ( e = r.exec(q)) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
}


var params = getHashParams();

var access_token = params.access_token,
    refresh_token = params.refresh_token,
    error = params.error;

window.onload = function(){
  if(document.getElementById('access_token_1')){
    document.getElementById('access_token_1').value = access_token; // planning to move this server-side when more familiar with express
  }
  if(document.getElementById('access_token_2')){
    document.getElementById('access_token_2').value = access_token;
  }
};
