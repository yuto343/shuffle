import React from "react";
import { Link } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import shuffleLogo from "../images/shuffle-logo.svg";
import twitterLogo from "../images/logos/twitter.svg";
import instagramLogo from "../images/logos/instagram.svg";
import youtubeLogo from "../images/logos/youtube.svg";

function IndexPage() {
  const links = [
    { name: "Blogs", href: "/blogs/" },
    { name: "About", href: "/about/" },
    { name: "Members", href: "/members/" },
    { name: "Movies", href: "/movies/" },
  ];
  const socialMedias = [
    {
      name: "instagram",
      href: "https://www.instagram.com/shuffle_snowboarding/",
      src: instagramLogo,
    },
    {
      name: "twitter",
      href: "https://twitter.com/shuffle_du",
      src: twitterLogo,
    },
    {
      name: "youtube",
      href: "https://www.youtube.com/channel/UCy5FkdbGKziUA4JQDCPGU1Q",
      src: youtubeLogo,
    },
  ];
  return (
    <Layout>
      <SEO
        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
        title="Home"
      />

      <section className="text-center font-display tracking-widest md:text-md text-sm">
        <img
          alt="Cat and human sitting on a couch"
          className="block md:w-1/5 w-1/2 mx-auto "
          src={shuffleLogo}
        />
        <p className="mt-1">- shuffle snowboarding official website -</p>
        <ul className="md:flex items-center justify-center mt-8 ">
          {links.map((d, idx) => {
            return (
              <li key={idx} className="mx-8 mt-4 ">
                <Link
                  className="px-8 py-2 pj-button block md:w-full w-1/2 mx-auto "
                  to={d.href}
                >
                  {d.name}
                </Link>
              </li>
            );
          })}
        </ul>
        <p className="mt-16">or check our riding at social media! </p>
        <ul className="flex items-center justify-center mt-8 ">
          {socialMedias.map((d, idx) => {
            return (
              <li
                key={idx}
                className="w-12 h-12 pj-button-icon flex justify-center items-center mx-4"
              >
                <a className="" href={d.href}>
                  <img className=" p-2" src={d.src} />
                </a>
              </li>
            );
          })}
        </ul>
      </section>
    </Layout>
  );
}

export default IndexPage;
