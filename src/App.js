import React, {useState, useEffect} from 'react';
import Parser from 'rss-parser';

const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
const GUMACA_URL = "https://news.google.com/rss/search?q=gumaca+quezon&hl=en-PH&gl=PH&ceid=PH:en";
const QUEZON_URL = "https://news.google.com/rss/search?q=quezon+-city&hl=en-PH&gl=PH&ceid=PH:en";

const NewsItem = ({title, link, contentSnippet, pubDate}) => (
  <li>
    <h2>{title}</h2>
    <p><em>{pubDate}</em></p>
    <p>{contentSnippet}</p>
    <p><a rel="noopener noreferrer" href={link} target="_blank">{link}</a></p>
  </li>
);

function App() {
  const [activeTab, setActiveTab] = useState('gumaca-quezon');
  const [gumacaNewsItems, setGumacaNewsItems] = useState([]);
  const [quezonNewsItems, setQuezonNewsItems] = useState([]);

  useEffect(() => {
    const parser = new Parser();
    parser.parseURL(CORS_PROXY + GUMACA_URL)
      .then((feed) => {
        console.log(feed.items);
        setGumacaNewsItems(feed.items);
      });
    parser.parseURL(CORS_PROXY + QUEZON_URL)
      .then((feed) => {
        console.log(feed.items);
        setQuezonNewsItems(feed.items);
      });
  }, []);

  const handleClick = (e) => {
    e.preventDefault(e);
    setActiveTab(e.target.dataset.location);
  };

  return (
    <div className="container">
      <h1>Team Gumaca News</h1>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a onClick={handleClick} data-location="gumaca-quezon" href="#gumaca-quezon" className={"nav-link " + (activeTab === 'gumaca-quezon' ? 'active' : '')}>Gumaca</a>
        </li>
        <li className="nav-item">
          <a onClick={handleClick} data-location="quezon-province" href="#quezon" className={"nav-link " + (activeTab === 'quezon-province' ? 'active' : '')}>Quezon Prov.</a>
        </li>
      </ul>
      <div className={"row " + (activeTab === "gumaca-quezon" ? "active" : "inactive")}>
        <ul id="gumaca-quezon">
            { gumacaNewsItems.map((item) => <NewsItem key={item.guid} {...item} />) }
        </ul>
      </div>
      <div className={"row " + (activeTab === "quezon-province" ? "active" : "inactive")}>
        <ul id="quezon-province">
            { quezonNewsItems.map((item) => <NewsItem key={item.guid} {...item} />) }
        </ul>
      </div>
    </div>
  );
}

export default App;
