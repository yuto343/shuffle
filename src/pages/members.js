import React from "react";
import PageLayout from "../components/pageLayout";
import PageTitle from "../components/pageTitle";
import MemberCard from "../components/memberCard";
import { useStaticQuery, graphql } from "gatsby";
import SEO from "../components/seo";
const getData = graphql`
  {
    allMicrocmsLeadMembers {
      edges {
        node {
          id
          image {
            url
          }
          leadMembersId
          name
          sentence
          instagram
        }
      }
    }
  }
`;
function members() {
  const data = useStaticQuery(getData);
  const memberList = data.allMicrocmsLeadMembers.edges;
  console.log(data);
  console.log(memberList);
  return (
    <PageLayout>
      <PageTitle title="Members" />
      <SEO
        keywords={[`同志社大学`, `サークル`, `スノーボード`]}
        title="Members"
      />
      <div>
        <p className="font-display text-2xl text-center my-4">20-21</p>
        {memberList.map((d, idx) => {
          const instagram = d.node.instagram ? d.node.instagram : false;
          return (
            <MemberCard
              key={idx}
              name={d.node.name}
              image={d.node.image.url}
              sentence={d.node.sentence}
              instagram={instagram}
            />
          );
        })}
      </div>
    </PageLayout>
  );
}

export default members;
