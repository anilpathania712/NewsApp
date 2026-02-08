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
    const nextPage = this.state.page + 1;
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${apiKey}&page=${nextPage}&pageSize=${this.props.pageSize}`;

    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState({
      page: nextPage,
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
    });
    if (parsedData.articles.length === 0) {
      this.setState({ totalResults: this.state.articles.length });
      return;
    }

  };


  render() {
    return (
      <>
        <div className="container pt-5"> <h2 className="text-center fw-bold" style={{ margin: "32px 0 28px", letterSpacing: "0.4px" }} >
          NewsMonkey
          <span className="text-muted fw-normal"> {" "}— Top Headlines from{" "} </span>
          <span className="text-primary">
            {this.capitalizeFirstLetter(this.props.category)}
          </span>
        </h2>
        </div>

        {/* LOADER */}
        {this.state.loading && (
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
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length < this.state.totalResults}
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

              {this.state.articles.map((element, index) => (
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

}

export default News
