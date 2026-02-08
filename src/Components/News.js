import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Lottie from "lottie-react";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const apiKey = process.env.REACT_APP_NEWS_API_KEY;

const News = (props)=> {

  const[articles,setArticles] = useState([]);
  const[loading,setLoading] = useState(true);
  const[page,setPage] = useState(1);
  const[totalResults,settotalResults] = useState(0);
  
  const capitalizeFirstLetter = (str) => {
    if (!str) return str; // handle empty or null
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

   const updateNews= async ()=> {
    props.setProgress(0);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles)
    settotalResults( parsedData.totalResults)
    setLoading(false)
    props.setProgress(100);
  }

  useEffect(()=>{
    document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
    updateNews();
    // eslint-disable-next-line
  },[])

  const fetchMoreData = async () => {
    const nextPage = page + 1;
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${apiKey}&page=${nextPage}&pageSize=${props.pageSize}`;

    let data = await fetch(url);
    let parsedData = await data.json();
    setPage(nextPage)
    setArticles(articles.concat(parsedData.articles))
    settotalResults(parsedData.totalResults)

    if (parsedData.articles.length === 0) {
      settotalResults(articles.length);
      return;
    }

  };

    return (
      <>
        <div className="container pt-5"> <h2 className="text-center fw-bold" style={{ margin: "32px 0 28px", letterSpacing: "0.4px" }} >
          NewsMonkey
          <span className="text-muted fw-normal"> {" "}— Top Headlines from{" "} </span>
          <span className="text-primary">
            {capitalizeFirstLetter(props.category)}
          </span>
        </h2>
        </div>

        {/* LOADER */}
        {loading && (
          <div className="d-flex justify-content-center my-4">
            <Lottie
              path="/loading.json"
              loop
              autoplay
              style={{ width: 260 }}
            />
          </div>
        )}

        {/* NEWS LIST */}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length < totalResults}
          loader={
            <div className="d-flex justify-content-center my-2">
              <Lottie
                path="/loading.json"
                loop
                autoplay
                style={{ width: 160 }}
              />
            </div>
          }
        >
          <div className="container">
            <div className="row g-4">

              {articles.map((element, index) => (
                <div
                  className="col-12 col-sm-6 col-md-4"
                  key={`${element.url}-${index}`}
                >
                  <NewsItem
                    title={
                      element.title
                        ? element.title.slice(0, 60)
                        : ""
                    }
                    description={
                      element.description
                        ? element.description.slice(0, 100)
                        : ""
                    }
                    imgUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              ))}

            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }

 News.defaultProps = {
    country: 'us',
    pageSize: 6,
    category: 'general'
  }

   News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

export default News
