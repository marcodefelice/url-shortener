window.onload = function(){
    const form = document.getElementById('url-form')

    form.addEventListener('submit', event => {
        event.preventDefault();
        var value = document.getElementById('userUrl').value;
        postUrl('/', value)
            .then(data => {
                const result = document.getElementById('shortened-link')
                result.innerHTML = data.shortenedUrl
                result.href = data.shortenedUrl
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
        return json
    }
}


  
