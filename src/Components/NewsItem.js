import React, { Component } from 'react'

export class NewsItem extends Component {

  render() {
    let {
      title,
      description,
      imgUrl,
      newsUrl,
      author,
      date,
      source
    } = this.props;

    const fallbackImage =
      "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&auto=format&fit=crop&q=60";

    return (
      <>
        {/* INTERNAL CSS */}
        <style>
          {`
      .news-card {
        border-radius: 18px;
        overflow: hidden;
        background: #ffffff;
        transition: all 0.35s ease;
        box-shadow: 0 8px 24px rgba(0,0,0,0.08);
      }

      .news-card:hover {
        transform: translateY(-8px);
        box-shadow: 0 20px 45px rgba(0,0,0,0.15);
      }

      .news-image-wrapper {
        overflow: hidden;
      }

      .news-image-wrapper img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s ease;
      }

      .news-card:hover .news-image-wrapper img {
        transform: scale(1.08);
      }

      .news-badge {
        top: 14px;
        right: 14px;
        z-index: 2;
        font-size: 0.65rem;
        padding: 6px 12px;
        letter-spacing: 0.5px;
        background: linear-gradient(135deg, #0dcaf0, #0aa2c0);
      }

      .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .line-clamp-3 {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .news-btn {
        border-radius: 999px;
        padding: 6px 16px;
        font-size: 0.8rem;
        transition: all 0.25s ease;
      }

      .news-btn:hover {
        background-color: #000;
        transform: translateX(4px);
      }

      /* Responsive tweaks */
      @media (max-width: 576px) {
        .news-card {
          border-radius: 14px;
        }

        .card-title {
          font-size: 1rem;
        }

        .card-text {
          font-size: 0.85rem;
        }
      }
    `}
        </style>

        {/* CARD */}
        <div className="my-3 h-100">
          <div className="card h-100 border-0 position-relative news-card">

            {/* Source Badge */}
            <span className="position-absolute badge rounded-pill text-white news-badge">
              {source || "NEWS"}
            </span>

            {/* Image */}
            <div className="ratio ratio-16x9 bg-light news-image-wrapper">
              <img
                src={imgUrl || fallbackImage}
                alt={title || "News image"}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = fallbackImage;
                }}
              />
            </div>

            {/* Content */}
            <div className="card-body d-flex flex-column">
              <h5 className="card-title fw-semibold mb-2 line-clamp-2">
                {title || "No title available"}
              </h5>

              <p className="card-text text-muted mb-3 line-clamp-3">
                {description || "No description available"}
              </p>

              <p className="card-text mt-auto mb-2">
                <small className="text-muted">
                  {author ? `By ${author}` : "By Unknown"} •{" "}
                  {date
                    ? new Date(date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })
                    : "—"}
                </small>
              </p>

              <a
                href={newsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-dark btn-sm news-btn align-self-start"
              >
                Read more →
              </a>
            </div>
          </div>
        </div>
      </>
    );

  }

}

export default NewsItem
