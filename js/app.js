var soql = document.getElementById("soql");
var result = document.getElementById("result");
var tokentext  = document.getElementById("oauth-token");

document.getElementById("queryBtn").addEventListener("click", function() {
    try {
      tokentext.innerHTML = JSON.stringify(force.oauthStore());
      console.log("Token:"+force.oauthStore());
    } catch(e) {
    }
    force.query(soql.value,
        function (data) {
            result.innerHTML = JSON.stringify(data, undefined, 3);
        },
        function (error) {
            alert("Error: " + JSON.stringify(error));
        });
}, false);

force.login();
