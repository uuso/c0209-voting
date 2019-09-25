
function voteFor(candidate){
    if (candidate === null) {
        console.log('Error in voting param.')
        return;
    }
    console.log(`Voting for ${candidate}.`)
    const ajax = new XMLHttpRequest();
    ajax.open(method = 'POST', URL = `https://sf-pyw.mosyag.in/sse/vote/${String(candidate)}`, async = false); ajax.send();
    
    // window.location.href = "./vote_results.html"
}
function renewBars() {
    const pBars = {
        cats: document.querySelector("#cats_pb"),
        dogs: document.querySelector("#dogs_pb"),
        parrots: document.querySelector("#parrots_pb")
    }
    
    const header = new Headers({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': '*'
    });
    const url = new URL('https://sf-pyw.mosyag.in/sse/vote/stats');
    const ES = new EventSource(url, header);
    
    let votes = null;
    
    ES.onmessage = ({data}) => {
        votes = JSON.parse(data);
        
        total = votes["cats"] + votes["dogs"] + votes["parrots"]
        percent = total / 100
    
        pBars.cats.style.width = `${Math.floor(votes.cats / percent)}%`;
        pBars.cats.textContent = votes.cats;
        
        pBars.dogs.style.width = `${Math.floor(votes.dogs / percent)}%`;
        pBars.dogs.textContent = votes.dogs;
        
        pBars.parrots.style.width = `${Math.floor(votes.parrots / percent)}%`;
        pBars.parrots.textContent = votes.parrots;
    
    }
}



// /sse/vote/cats — увеличивает на 1 число голосов за "коты"
// /sse/vote/dogs — увеличивает на 1 число голосов за "собаки"
// /sse/vote/parrots — увеличивает на 1 число голосов за "попугаи"
// Также сервер предоставляет GET-запрос со статистикой голосования

// /sse/vote/stats — это SSE-стрим с текущими результатами голосования
// Для вашего удобства мы подняли backend-сервер по адресу https://sf-pyw.mosyag.in