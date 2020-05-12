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
          leader
        }
      }
    }
  }
`;
function members() {
  const data = useStaticQuery(getData);
  const leadMemberList = data.allMicrocmsLeadMembers.edges.filter((member) => {
    return member.node.leader === true;
  });
  const otherMemberList = data.allMicrocmsLeadMembers.edges.filter((member) => {
    return member.node.leader === false;
  });
  return (
    <PageLayout>
      <PageTitle title="Members" />
      <SEO
        keywords={[`同志社大学`, `サークル`, `スノーボード`]}
        title="Members"
      />
      <div>
        <p className="font-display text-2xl text-center my-4">
          [20-21] LaedMembers!
        </p>
        {leadMemberList.map((d, idx) => {
          const instagram = d.node.instagram ? d.node.instagram : false;
          const image = d.node.image ? d.node.image.url : false;
          return (
            <MemberCard
              key={idx}
              name={d.node.name}
              image={image}
              sentence={d.node.sentence}
              instagram={instagram}
            />
          );
        })}
      </div>
      <div>
        <p className="font-display text-2xl text-center mt-12 mb-10">
          - Other Members -
        </p>
        {otherMemberList.map((d, idx) => {
          const instagram = d.node.instagram ? d.node.instagram : false;
          const image = d.node.image ? d.node.image.url : false;
          return (
            <MemberCard
              key={idx}
              name={d.node.name}
              image={image}
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
