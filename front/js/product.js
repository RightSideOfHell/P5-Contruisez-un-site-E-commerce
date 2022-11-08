//récupérer les paramètres URL 
function getParameter (parameterName){
    let parameters = new URLSearchParams(window.location.search);
    return parameters.get(parameterName);
}


