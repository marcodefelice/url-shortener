window.onload = function(){
    const form = document.getElementById('url-form')

    form.addEventListener('submit', event => {
        event.preventDefault();
        const msg = document.getElementById('response-message')
        var value = document.getElementById('userUrl').value;
        postUrl('/', value)
            .then(data => {

                msg.innerHTML = data.message
                msg.classList.toggle(addMsgAlert(data.status))
            })
    });

    async function postUrl(route, data){
        const response = await fetch(route, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({data: data})
        });
        const json = await response.json();
        json.status = response.status
        return json
    }

    function clearBox(elementID, classToRemove=null)
    {
        document.getElementById(elementID).innerHTML = "";
        if(classToRemove){
            document.getElementById(elementID).classList.remove(classToRemove)
        }
    }

    function addMsgAlert(status){
        switch(status){
            case 404:
                alertClass = 'alert-danger'
                break;
            case 422:
                alertClass = 'alert-warning'
                break;
            case 409:
                alertClass = 'alert-info'
                break;
            case 201:
                alertClass = 'alert-success'
                break;
        }
        return alertClass
    }
}


  
