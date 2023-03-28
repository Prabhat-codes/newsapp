import React from 'react'
import NewsItem from './NewsItem'
import {useEffect, useState} from 'react'
const News = () => {
    const [articles,setArticles]=useState([]);
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    useEffect(() => {
      (async ()=> {
        setLoading(true)
        let data = await fetch(`https://newsapi.org/v2/everything?q=tesla&from=2023-02-28&sortBy=publishedAt&apiKey=76ea8d2e1c07449d8fc9f53a18ffb3db`)
        let parsedData=await data.json();
        setLoading(false);
        setArticles(parsedData.articles);
      })();
    });
    
    return (
        <div className="container">
            <h2>News App</h2>
            <div className="row">
                {articles.map((element) => {
                   return <div className="col-md-3">
                        <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description} imageUrl={element.urlToImage} key={element.url} url={element.url} />
                    </div>
                })}
            </div>
            <div className="container">
                <button disabled={loading} type="button" className="btn btn-primary" onClick={()=>{setPage(page+1)}}>Load More</button>
                
            </div>

        </div>
    )
}

export default News