const quoteContaier = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const whatsapBtn = document.getElementById("whatsapp");
const facebookBtn = document.getElementById("facebook");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader")


async function getQuoteFromApi() {
    showLoadingSpinner();
    const proxyUrl = "https://cors-anywhere.herokuapp.com/"
    const apiUrl = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        // If Author is blank, add "Unknown"
        if (data.quoteAuthor === "") {
            authorText.innerText = "Unknown"
        } else {
            authorText.innerText = data.quoteAuthor;
        };
        // Reduce font-size for long quotes
        if (data.quoteText.length > 120) {
            quoteText.classList.add('long-quote')
        } else {
            quoteText.classList.remove('long-quote')
        }
        quoteText.innerText = data.quoteText;
        removeLoadingSpinner();
    } catch (err) {
        getQuoteFromApi();

    }
}

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContaier.hidden = true;
}

function removeLoadingSpinner() {
    if (!loader.hidden) {
        quoteContaier.hidden = false;
        loader.hidden = true;
    }
}

// Tweet Quote
function teewtQuote() {

    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(tweetUrl, "_blank")
}

// Share on Whatsapp
function whatsappShare() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const whatsappUrl = `whatsapp://send?text=${quote} - ${author}`
    window.open(whatsappUrl)
}

// Share on Facebook
function facebookShare() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const facebookUrl = `http://www.facebook.com/sharer.php?s=${quote}`;
    window.open(facebookUrl)
}



// Event Listener

newQuoteBtn.addEventListener('click', getQuoteFromApi);
twitterBtn.addEventListener('click', teewtQuote);
whatsapBtn.addEventListener('click', whatsappShare);
facebookBtn.addEventListener('click', facebookShare);

//  On Load
getQuote();
