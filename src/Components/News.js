import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Lottie from "lottie-react";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const apiKey = process.env.REACT_APP_NEWS_API_KEY;

export class News extends Component {
  static defaultProps = {
    country: 'us',
    pageSize: 6,
    category: 'general'
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }
  capitalizeFirstLetter = (str) => {
    if (!str) return str; // handle empty or null
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
  }

  async updateNews() {
    this.props.setProgress(0);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(60);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    })
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNews();
  }

  fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData)
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
    })
  };

  render() {
    return (
      <>
        <h2 className='text-center' style={{ margin: '35px 0px' }}>NewsMonkey - Top Headlines From {this.capitalizeFirstLetter(this.props.category)} Category</h2>
        {this.state.loading && (
          <div className="d-flex justify-content-center mx-10 my-3">
            <Lottie
              path="/loading.json"
              loop
              autoplay
              style={{ width: 300 }}
            />
          </div>
        )}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length < this.state.totalResults}
          loader={
            <div className="d-flex justify-content-center my-3">
              <Lottie
                path="/loading.json"
                loop
                autoplay
                style={{ width: 150 }}
              />
            </div>
          }
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => {
                return <div className="col-md-4" key={element.url} >
                  <NewsItem title={element.title ? element.title.slice(0, 50) : ""} description={element.description ? element.description.slice(0, 80) : ""} imgUrl={element.urlToImage}
                    newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                </div>
              })}
            </div>

          </div>
        </InfiniteScroll>
      </>
    )
  }
}

export default News
