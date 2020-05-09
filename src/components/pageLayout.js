import PropTypes from "prop-types";
import React from "react";
import { Link } from "gatsby";
import shuffleLogo from "../images/shuffle-logo.svg";
function PageLayout({ children }) {
  const links = [
    { name: "Blogs", href: "/blogs/" },
    { name: "About", href: "/about/" },
    { name: "Members", href: "/members/" },
    { name: "Movies", href: "/movies/" },
  ];
  return (
    <div className=" bg-pj-gray text-white min-h-screen w-full lg:flex">
      <div className="md:w-1/4   items-center justify-center h-screen font-display hidden lg:flex">
        <div className="fixed text-center">
          <div>
            <img className="block  mx-auto " src={shuffleLogo} />
          </div>
          <nav>
            <ul className="w-40 mx-auto">
              {links.map((d, idx) => {
                return (
                  <li key={idx} className="mt-8 w-full pj-button ">
                    <Link to={d.href} className=" px-4 py-2 block w-full">
                      {d.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
      <div className="lg:hidden fixed w-full  bg-pj-gray bottom-0 z-10  pj-sp-navbar  h-16">
        <ul className="flex justify-around items-center mt-5">
          {links.map((d, idx) => {
            return (
              <li key={idx} className=" w-1/5 pj-button ">
                <Link
                  to={d.href}
                  className=" px-4 py-2 block w-full text-xxs font-display text-center"
                >
                  {d.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="lg:flex hidden h-screen justify-center items-center">
        <div className="pj-section-bar"></div>
      </div>
      <div className="md:hidden w-full">
        <Link to="/">
          <img src={shuffleLogo} className="block mx-auto w-1/3 p-3" />
        </Link>
      </div>
      <main className="mx-auto w-full md:p-4">{children}</main>
      <div className="lg:hidden w-full h-16"></div>
    </div>
  );
}

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default PageLayout;
