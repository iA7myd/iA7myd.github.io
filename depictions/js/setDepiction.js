function iOSVersion() {
  var match = (navigator.appVersion).split('OS ');
  if (match.length > 1) {
    return match[1].split(' ')[0].split('_').join('.');
  }
  return false;
}

$(function(){
    var bundle = getQueryVariable('p');

    if(bundle != undefined){
        //Now fetch the appropriate file from this query string
    }


    console.log(getQueryVariable('p'));
    console.log("Fetching XML");
    var getUrl = window.location;
    var baseUrl = getUrl .protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];
    console.log(baseUrl + "/"+ bundle + "/info.xml");

    $.ajax({
        type: "GET",
        url: baseUrl + "/" + bundle + "/info.xml",
        dataType: "xml",
        success: function (xml) {
            console.log("Beginning XML Parsing");

            // Parse the xml file and get data
            $(xml).find('packageInfo').each(function(){
                  // document.getElementById("packageTitle").innerHTML = $(this).find("name").text();
                   //document.getElementById("bundleId").innerHTML = $(this).find("bundleId").text();
                   //document.getElementById("version").innerHTML = $(this).find("version").text();
                   document.getElementById("miniOS").innerHTML = $(this).find("miniOS").text();
                   document.getElementById("maxiOS").innerHTML = $(this).find("maxiOS").text();
                   document.getElementById("compatitle_").innerHTML = iOSVersion();          
           
           
           
        

                   $(xml).find('appurl').each(function(){
                       $("#applink" ).append('<a href="' +$(this).text()+ '"target="_blank"><label stylee="font-size: 12px; ">Here</label>');

                   });

                   
                   $(xml).find('description').each(function(){
                       $("#description" ).append('<li>' +$(this).text()+ '</li>');
                   });      

                   $(xml).find('dependency').each(function(){
                       $("#dependencies" ).append('<li>' +$(this).text()+ '</li>');
                   });

                   $(xml).find('linkName').each(function(){
                       $("#dependencies" ).append('<li>' +$(this).text()+ '</li>');
                   });

                   $(xml).find('change').each(function(){
                       $("#changeLog" ).append('<h1>' + $(this).find("changeVersion").text() + '</h1>');
                       $(this).find('changeDescription').each(function(){
                            $("#changeLog" ).append('<h2>' + $(this).text()+ '<h2>');
                       });
                       $("#changeLog" ).append();
                   });
                   

          $(xml).find('images').each(function(){
                       if ($(this).find("picone").text()){
                       $("#screenshot" ).append('<div style="text-align:center;"><a href="'+$(xml).find("bundleId").text()+ '/' +$(this).find("picone").text()+'"><img width=95% src="'+$(xml).find("bundleId").text()+ '/' +$(this).find("picone").text()+'"/></a><br></div>');
                       }
                         if ($(this).find("pictow").text()){
                       $("#screenshot" ).append('<div style="text-align:center;"><a href="'+$(xml).find("bundleId").text()+ '/' +$(this).find("pictow").text()+'"><img width=95% src="'+$(xml).find("bundleId").text()+ '/' +$(this).find("pictow").text()+'"/></a><br></div>');
                       }
                         if ($(this).find("picthree").text()){
                       $("#screenshot" ).append('<div style="text-align:center;"><a href="'+$(xml).find("bundleId").text()+ '/' +$(this).find("picthree").text()+'"><img width=95% src="'+$(xml).find("bundleId").text()+ '/' +$(this).find("picthree").text()+'"/></a><br></div>');}
                         if ($(this).find("picfoor").text()){
               $("#screenshot" ).append('<div style="text-align:center;"><a href="'+$(xml).find("bundleId").text()+ '/' +$(this).find("picfoor").text()+'"><img width=95% src="'+$(xml).find("bundleId").text()+ '/' +$(this).find("picfoor").text()+'"/></a><br></div>');
               }
                   });
                           

            });

        }
    });


});


function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    console.log('Query variable %s not found', variable);
}
