import './QuoteStyle.css';
import { useState, useEffect } from 'react';


function Quote(){
    const [quotesData, setQuotesData] =useState([]);
    const [quote, setQuote] =useState('');
    const [author, setAuthor] =useState('');
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setQuotesData(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (!loading) {
            randomQuote(); // Call randomQuote once the fetch is completed
        }
    }, [loading]);
   

   function randomQuote() {
    console.log('inside randomQuote')
    console.log(quotesData);
    if (quotesData.quotes && quotesData.quotes.length > 0) {
        console.log('inside randomQuote if')
      const randomIndex = Math.floor(Math.random() * quotesData.quotes.length);
      const randomQuote = quotesData.quotes[randomIndex];
      //console.log(randomQuote)
      setQuote(randomQuote.quote);
      setAuthor(randomQuote.author);
      changeBackgroundColor();
    }
    

    }
  
    function prepareTweet(){
        return 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
        encodeURIComponent('"' + quote + '" ' + author)
    }
  /* 
   function prepareTumbler(){
        return 'https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=' +
        encodeURIComponent(author) +
        '&content=' +
        encodeURIComponent(quote) +
        '&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button'
    }
*/
    function changeBackgroundColor() {
        // Generate a random color
        const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
        document.body.style.backgroundColor = randomColor;
        document.getElementById("text").style.color = randomColor;
        document.getElementById("author").style.color = randomColor;
        document.getElementById("new-quote").style.backgroundColor = randomColor;
        document.getElementById("tweet-quote").style.color = randomColor;
      }
    return (
        <div id="container">
        {/*<div id="quote-box">
            <div id="text">{quote}</div>
            <div id="author">{author}</div>
            <div id="buttons">
              {/*   <a id="tumblr-quote" title="Post this quote on tumblr!" href={prepareTumbler()}>
                <img src="./tumblr - Copy.png"/>
                </a> */}  {/*
                <a id="tweet-quote"  title="Tweet this quote!" href={prepareTweet()}>
                Tweet Me!
                </a>
                 <button id="new-quote" onClick={randomQuote}>New Quote</button>
            </div>
    </div>   */}

{loading ? (
                <div>Loading...</div>
            ) : (
                <div id="quote-box" >
                    <div id="text">{quote}</div>
                    <div id="author">{author}</div>
                    <div id="buttons">
                        <a id="tweet-quote" title="Tweet this quote!" href={prepareTweet()}>
                            Tweet Me!
                        </a>
                        <button id="new-quote" onClick={randomQuote}>New Quote</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Quote;