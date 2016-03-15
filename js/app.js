var querydate=moment();

document.getElementById("queryBtn").addEventListener("click", function () {
    var soql = document.getElementById("soql");
    var result = document.getElementById("result");
    force.query(soql.value,
        function (data) {
            result.innerHTML = JSON.stringify(data, undefined, 3);
        },
        function (error) {
            alert("Error: " + JSON.stringify(error));
        });
}, false);

document.getElementById("refreshBtn").addEventListener("click", afterLogin, false);

function showToken() {
    try {
        var tokentext = document.getElementById("oauth-token");
        tokentext.innerHTML = JSON.stringify(force.oauthStore());
        console.log("Token:" + force.oauthStore());
    } catch (e) {
        console.error(e);
    }
}
function showDate() {
    try {
        var datetext = document.getElementById("datestamp");
        datetext.innerText =  querydate.format("dddd, MMMM Do YYYY, h:mm:ss a"); ;
    } catch (e) {
        console.error(e);
    }
}
// Need two named areas
// <object_name>_summary (h2)
// <object_name>_changed (h2)
// <object_name>_table (tbody)
function getObjectsChanged(object_name,name_field) {
    var date = querydate;
    
    var query = 'select Id,'+name_field+', LastModifiedBy.Name, LastModifiedDate from '+object_name+' where LastModifiedDate > '+date.format()+' ORDER BY LastModifiedDate DESC limit 200';
    var soql = document.getElementById("soql");
    soql.innerText = query;
    force.query(query, function (response) {
        var str = '';
        for (var i = 0; i < response.records.length; i++) {
            str += '<tr>' +
            '<td>' + i + '</td>' +
            '<td>' + response.records[i].Id + '</td>' +
            '<td>' + response.records[i][name_field] + '</td>' +
            '<td>' + response.records[i].LastModifiedBy.Name + '</td>' +
            '<td>' + response.records[i].LastModifiedDate + '</td>' +
            '</tr>';
        }
        document.getElementById(object_name+'_table').innerHTML = str;
    });

    var changed = document.getElementById(object_name+"_changed");
    var changed2 = document.getElementById(object_name+"_summary");
    var query2 = 'select COUNT() from '+object_name+' where LastModifiedDate > '+date.format();
    force.query(query2, function (response) {
        try {
            changed.innerText = response.totalSize +' '+ object_name+ " changes.";
            changed2.innerText = response.totalSize +' '+ object_name+ " changes.";
        } catch(e) {
            console.error(e);
        }
    });       
}

function afterLogin() {
    querydate=moment().subtract(5,'m');
    showToken();
    showDate();
    getObjectsChanged('Contact','Name');
    getObjectsChanged('Case','CaseNumber');
    setTimeout(afterLogin,60000); // Refresh after 1 minute;
}

force.login(afterLogin);

