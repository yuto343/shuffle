import React from "react";
import PageLayout from "../components/pageLayout";
import shuffleLogo from "../images/shuffle-logo.svg";
import { graphql, useStaticQuery } from "gatsby";
import SEO from "../components/seo";
import Image from "gatsby-image";
import PageTitle from "../components/pageTitle";
const AboutPage = () => {
  const data = useStaticQuery(getImages);
  return (
    <PageLayout>
      <SEO
        keywords={[`同志社大学`, `サークル`, `スノーボード`]}
        title="About"
      />
      <div>
        <PageTitle title="About" />
        <div className="mt-8 text-md">
          <img
            src={shuffleLogo}
            className="mx-auto block md:w-1/4 w-1/2"
            alt="shufflelogo"
          />
          <div className="md:w-3/4 mx-auto w-11/12">
            <p className="mt-8">
              SHUFFLEは2012年4月に発足した同志社大学を拠点とした本格派スノーボード、フリースタイルスキー、スケートボードのサークルです。
            </p>
            <p className="mt-8">
              夏は大阪キングスやスノーヴァ羽島などのオフトレ施設で貸切セッション、冬は月に１回のペースで全体の合宿その他イベントを行っています。
            </p>
            <div className="pj-img-outer p-2 mt-8">
              <Image fluid={data.kings.childImageSharp.fluid} alt="kings" />
            </div>
            <div className="pj-img-outer p-2 mt-8">
              <Image fluid={data.hashima.childImageSharp.fluid} alt="hashima" />
            </div>
            <p className="my-8">
              気になった方は是非、shuffleのsnsや代表のsnsにご連絡ください！
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
export const getImages = graphql`
  {
    kings: file(relativePath: { eq: "kings.jpg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    hashima: file(relativePath: { eq: "gassyuku.jpg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`;

export default AboutPage;
