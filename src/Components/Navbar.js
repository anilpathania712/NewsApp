import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {

  const closeNavbar = () => {
    const nav = document.getElementById("navbarSupportedContent");
    if (nav && nav.classList.contains("show")) {
      nav.classList.remove("show");
    }
  };

  return (
    <>
      <style>{`
        .navbar-custom {
          font-family: "Inter", "Segoe UI", sans-serif;
          backdrop-filter: blur(14px);
          background: rgba(15, 15, 20, 0.75);
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }

        /* Brand */
        .navbar-custom .navbar-brand {
          letter-spacing: 0.6px;
          transition: all 0.3s ease;
        }

        .navbar-custom .navbar-brand:hover {
          text-shadow: 0 0 12px rgba(255,193,7,0.7);
          transform: translateY(-1px);
        }

        /* Nav links */
        .navbar-custom .nav-link {
          position: relative;
          font-weight: 500;
          padding: 8px 18px;
          color: #dcdcdc !important;
          transition: color 0.25s ease;
        }

        /* Hover underline */
        .navbar-custom .nav-link::after {
          content: "";
          position: absolute;
          left: 50%;
          bottom: 2px;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #ffc107, #ffdd55);
          transition: all 0.3s ease;
          transform: translateX(-50%);
          border-radius: 4px;
        }

        .navbar-custom .nav-link:hover {
          color: #fff !important;
        }

        .navbar-custom .nav-link:hover::after {
          width: 60%;
        }

        /* Active */
        .navbar-custom .active-nav {
          color: #b38d1b !important;
        }

        .navbar-custom .active-nav::after {
          width: 70%;
          box-shadow: 0 0 8px rgba(255,193,7,0.8);
        }

        /* Mobile */
        @media (max-width: 991px) {
          .navbar-custom {
            backdrop-filter: blur(10px);
          }

          .navbar-custom .nav-link {
            padding: 12px 0;
            font-size: 1.05rem;
          }
        }
      `}</style>

      <nav className="navbar navbar-expand-lg navbar-dark fixed-top navbar-custom">
        <div className="container-fluid px-3 px-lg-4">

          <Link to="/" className="navbar-brand fw-bold d-flex align-items-center gap-2">
            <span className="badge bg-warning text-dark fs-6 rounded-circle px-2">📰</span>
            <span className="fs-5">NewsMonkey</span>
          </Link>

          {/* Mobile Toggle */}
          <button
            className="navbar-toggler border-0 shadow-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Menu */}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto text-center gap-lg-3 mt-3 mt-lg-0">

              {[
                ["Home", "/"],
                ["Business", "/business"],
                ["Entertainment", "/entertainment"],
                ["Health", "/health"],
                ["Science", "/science"],
                ["Sports", "/sports"],
                ["Technology", "/technology"],
              ].map(([label, path]) => (
                <li className="nav-item" key={path}>
                  <NavLink
                    to={path}
                    className={({ isActive }) =>
                      `nav-link ${isActive ? "active-nav" : ""}`
                    }
                    onClick={closeNavbar}
                  >
                    {label}
                  </NavLink>
                </li>
              ))}

            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
  export default Navbar
