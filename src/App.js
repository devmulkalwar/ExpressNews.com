import './App.css';
import { useEffect, useRef, useState } from 'react';
import logo from './Images/logo.png';
import Card from './Components/Card';

function App() {
  const [data, setData] = useState([]);

  const apiKey = "ca21263aa9214b61934ba24a14f07d58";
  const url = "https://newsapi.org/v2/everything?q=";
  const hasEffectRun = useRef(false);

  async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${apiKey}`);
    const apiData = await res.json();
    console.log(apiData);
    setData(apiData.articles);
    document.getElementById("search-inp").value = "";
  }

  useEffect(() => {
    if (!hasEffectRun.current) {
      fetchNews("latest");
      hasEffectRun.current = true;
    }
  }, []);

  return (
    <div className="App">
      <header>
        <nav className="nav-bar">

          <div className="img-div">
            <img src={logo} alt="Company Logo" />
          </div>

          <div className="options-div">
            <ul>
              <li id="Home" onClick={() => fetchNews("latest")}>Home</li>
              <li id="Politics" onClick={() => fetchNews("Politics")}>Politics</li>
              <li id="Technology" onClick={() => fetchNews("Technology")}>Technology</li>
              <li id="Business" onClick={() => fetchNews("Business")}>Business</li>
              <li id="Sports" onClick={() => fetchNews("Sports")}>Sports</li>
              <li id="Entertainment" onClick={() => fetchNews("Entertainment")}>Entertainment</li>
            </ul>
          </div>
          <div className="search-div">
            <input type="text" name="" id="search-inp" placeholder="e.g. Science" />
            <button id="search-btn" onClick={() => {
              let search = document.getElementById("search-inp").value;
              if (search === "") return;
              else{
                fetchNews(search);
               
              }
               
            }} >Search</button>
          </div>
        </nav>
      </header>

      <main className="news-container">
        {data
          .filter(dataItem => dataItem.urlToImage)
          .map((dataItem, index) => (
            <Card
              key={index}
              urlToImage={dataItem.urlToImage}
              title={dataItem.title}
              publishedAt={dataItem.publishedAt}
              description={dataItem.description}
              source={dataItem.source.name}
              url={dataItem.url}
            />
          ))
        }
      </main>

    </div>
  );
}

export default App;
