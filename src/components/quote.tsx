import { useEffect, useState } from "react";

import "./quote.css";

type Quote = {
  quote: string;
  author: string;
};

export default function Quote() {
  const [quote, setQuote] = useState<Quote>();

  const fetchQuote = async () => {
    try {
      const url = "https://api.api-ninjas.com/v1/quotes";
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "X-Api-Key": import.meta.env.VITE_API_KEY,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const result = await response.json();
        setQuote(result[0]);
      } else {
        console.log(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (!quote) {
      fetchQuote();
    }
  }, [quote]);

  return (
    <section id="quote-box">
      <aside id="text">{quote?.quote}</aside>
      <span id="author">{quote?.author}</span>
      <button id="new-quote" onClick={fetchQuote}>
        New Quote
      </button>
      <a
        id="tweet-quote"
        href="https://twitter.com/intent/tweet"
        target="_blank"
      >
        Tweet Quote
      </a>
    </section>
  );
}
