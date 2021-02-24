import * as React from "react";
import TestEnvironment from "../Components/Environment/TestEnvironment";
import Layout from "../Components/Layout/Layout";
import ProposalEnvironment from "../Components/Environment/ProposalEnvironment";
import styled from "styled-components";
import { StyledLinks } from "../Components/SideNavbar/SideNavbar";
import { Colours } from "../Components/Global/global.styles";
import TopNavbar from "../Components/TopNavbar/TopNavbar";

const HomeWrapper = styled.div``;

const HomePageSection = styled.div`
  height: 100vh;
  width: 100vw;
`;

const FlexDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  justify-content: center;
  align-items: center;
`;

export const Title = styled.h1`
  /* color: ${Colours.yellow}; */
  transition: color 0.1s;
  :hover {
    /* color: ${Colours.purple}; */
  }
`;

const HomePageText = styled.p``;

const HomePageTextWrapper = styled.div`
  width: 60%;
`;

const HomePageLinksWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 60%;
  justify-content: space-around;
`;

const HomePageLinks = styled(StyledLinks)`
  font-size: 1.5rem;
  text-decoration: none;
  /* color: ${Colours.purple}; */
  transition: color 0.1s;
  :hover {
    /* color: ${Colours.yellow}; */
  }
`;

const Home = () => {
  return (
    <Layout>
      <HomeWrapper>
        <HomePageSection>
          <FlexDiv>
            <Title> With Microbes</Title>
            <HomePageTextWrapper>
              <HomePageText>
                Humans are part of nature, cities are part of nature and
                microbes are integral to how we live in nature. Once we
                understand that we live with microbes, we can see urban green
                spaces not as passive backdrops but a network of caring
                relationships, by imagining a future where urban agriculture is
                integral to public space.
              </HomePageText>
            </HomePageTextWrapper>
            <HomePageLinksWrapper>
              <HomePageLinks to={"/research"}>
                {" "}
                explore where we are now
              </HomePageLinks>
              <HomePageLinks to={"/proposal"}>
                {" "}
                explore a possible future
              </HomePageLinks>
            </HomePageLinksWrapper>
          </FlexDiv>
        </HomePageSection>

        <HomePageSection>
          <TopNavbar />
          <FlexDiv>
            <HomePageTextWrapper>
              <Title> The Project</Title>
              <HomePageText>
                Hendit qui nobitem rendaecuptur abo. Nem ipicaerum rem
                velliquiate quia nihiliqui temqui consequi debit ipit quia volum
                non et pa con necto tecepello ex excepelecto volorro etur? Andam
                acea quassedit des es ent.
              </HomePageText>
              <Title> The Proposal</Title>
              <HomePageText>
                Hendit qui nobitem rendaecuptur abo. Nem ipicaerum rem
                velliquiate quia nihiliqui temqui consequi debit ipit quia volum
                non et pa con necto tecepello ex excepelecto volorro etur? Andam
                acea quassedit des es ent.Mus quis ut que coremped eum remperion
                conet volori quiberum
              </HomePageText>
              <Title> The Biological Data</Title>
              <HomePageText>
                Hendit qui nobitem rendaecuptur abo. Nem ipicaerum rem
                velliquiate quia nihiliqui temqui consequi debit ipit quia volum
                non et pa con necto tecepello ex excepelecto volorro etur?
              </HomePageText>
              <Title> Collaborators</Title>
              <HomePageText>
                Cream Projects, Natural History Museum, RBKC, Oxford Nanopore
                Technologies
              </HomePageText>
            </HomePageTextWrapper>
          </FlexDiv>
        </HomePageSection>
      </HomeWrapper>
    </Layout>
  );
};

export default Home;
