import React, { Component } from 'react'

export class MewsItem extends Component {
  
  render() {
    let {title, description,imgUrl, newsUrl} = this.props;
    return (
      <div className='my-3'>
        <div className="card">
          <img src={!imgUrl?"www.oregonlive.com/resizer/v2/6NCIE6LQFBH6PO64DU2BHKP4GI.JPG?auth=6f1846249a4ab91672ebe9f6eed79734c6311f0aa0ddf11db1638b88babe0182&width=1280&smart=true&quality=90":imgUrl} className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <a  rel="noreferrer" href={newsUrl} target="_blank"className="btn btn-sm btn-dark">Read more</a>
          </div>
        </div>
      </div>
    )
  }
}

export default MewsItem
