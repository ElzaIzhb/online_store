let container = '';

function sendRequest() {

    let msg = document.getElementById('msg').value;

    let array = Array.from(msg);

    console.log(array);

    let tmpl_card = document.getElementById('tmpl_card');
        
    container+= tmpl_card.innerHTML.replace('${message}', msg);
        
    console.log(container);
        
    document.getElementById('box__body').innerHTML = container;    
            
    document.getElementById('msg').value = '';

}









    