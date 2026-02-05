import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {

    constructor(){
    super();
    console.log("Hello I am a constructor  from the News Component");
    this.state = {
        articles: [],
        loading: false,
        page:1
    }
  }

  async componentDidMount(){
    let url = "https://newsapi.org/v2/top-headlines?country=us&apiKey=0e88c67fb96243eca706518700500210&page=1&pageSize=20";
    
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData)
    this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults})
  }

   handleNextClick = async ()=>{
    console.log("Next");
    if(this.state.page + 1> Math.ceil(this.state.totalResults/20)){

    }
    else{
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=0e88c67fb96243eca706518700500210&page=${this.state.page + 1}&pageSize=20`;
    
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData)
    this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles
    })
    }
  }

   handlePreviousClick = async ()=>{
    console.log("Previous");
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=0e88c67fb96243eca706518700500210&page=${this.state.page - 1}&pageSize=20`;
    
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData)
    this.setState({
        page: this.state.page - 1,
        articles: parsedData.articles
    })
  }

  render() {
    return (
      <div className='container my-3'>
        <h2>NewsMonkey - Top Headlines</h2>
        <div className="row">
        {this.state.articles.map((element)=>{
            return <div className="col-md-4" key={element.url} >
            <NewsItem title={element.title?element.title.slice(0,50):""} description={element.description?element.description.slice(0,80):""} imgUrl ={element.urlToImage} newsUrl ={element.url}/>
            </div>
        })}
            
      </div>
      <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
        <button  type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
      </div>
    </div>
    )
  }
}

export default News
