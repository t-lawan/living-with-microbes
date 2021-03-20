import * as React from "react";
import Layout from "../Components/Layout/Layout";
import styled from "styled-components";
import { StyledLinks } from "../Components/SideNavbar/SideNavbar";
import { Colours, size } from "../Components/Global/global.styles";
import TopNavbar from "../Components/TopNavbar/TopNavbar";
import { PageURls } from "../Utility/Misc";

const HomeWrapper = styled.div``;

const HomePageSection = styled.div`
  height: 100vh;
  width: 100vw;
  @media (max-width: ${size.tabletL}) {
    height: ${props => (props.isFullscreenInMobile ? "100vh" : "auto")};

    padding: 1rem 0;
  }
`;

const FlexDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  justify-content: center;
  align-items: baseline;
`;

export const Title = styled.h1`
  text-align: center;
  margin: 0;
  padding: 0;
`;

const HomePageText = styled.p``;

const HomePageTextWrapper = styled.div`
  /* width: 60%; */
  @media (max-width: ${size.tabletL}) {
    /* width: 90%; */
  }
`;

export const TwoColumnGrid = styled.div`
  display: grid;
  grid-template-columns: 3fr 5fr;
  grid-column-gap: 1rem;
  padding: 1rem;
`;
const HomePageLinksWrapper = styled.div`
  display: flex;
  flex-direction: row;
  /* width: 60%; */
  justify-content: space-around;

  @media (max-width: ${size.tabletL}) {
    /* width: 90%; */
  }
`;

const HomePageLinks = styled(StyledLinks)`
  font-size: 1.5rem;
  text-decoration: underline;
  text-align: center;
  padding: 1rem;
  padding-left: 0;
`;

const Home = () => {
  return (
    <Layout>
      <HomeWrapper>
        <HomePageSection isFullscreenInMobile>
          <TwoColumnGrid>
            <div>
              <HomePageText> With Microbes</HomePageText>
            </div>
            <FlexDiv>
              <HomePageTextWrapper>
                <HomePageText>
                  A series of interactive digital walks reveal the microbial
                  diversity that exists within the urban spaces that we inhabit
                  daily: our homes, our streets and our public transport
                  infrastructure to imagine a future where urban agriculture is
                  essential to public life. You will encounter urban food
                  gardens that exist as bridges between human and microbial
                  life. Inside them, you can breathe in, touch and eat microbes
                  and participate in feeding, tending and respecting the soil in
                  our cities - a sacred living material that is essential to all
                  lifeforms.
                </HomePageText>
              </HomePageTextWrapper>
              <HomePageLinksWrapper>
                <HomePageLinks to={PageURls.NOW.url}>
                  {" "}
                  explore where we are now
                </HomePageLinks>
                <HomePageLinks to={PageURls.FUTURE.url}>
                  {" "}
                  explore a possible future
                </HomePageLinks>
              </HomePageLinksWrapper>
            </FlexDiv>
          </TwoColumnGrid>
        </HomePageSection>

        <HomePageSection>
          <TwoColumnGrid>
            <div>
              <HomePageText> With Microbes</HomePageText>
            </div>
            <FlexDiv>
              <HomePageTextWrapper>
                <HomePageText>
                  Before we can establish new relationships of care within the
                  built environment, we need to first acknowledge that our
                  cities are inhabited not only by humans, but also by diverse
                  communities of microorganisms that are essential to our
                  survival. This project explores the potential of this emerging
                  technology and questions whether it can help us build closer
                  connections with the natural world that surrounds us. If this
                  data can demonstrate the entanglement of human and microbial
                  life then it can provide architects and urban planners with a
                  new perspective needed to build cities that cater for all
                  forms of life. If we integrated urban agriculture into the
                  fabric of our cities, it might encourage greater care between
                  humans and microorganisms.
                </HomePageText>
                <Title> Collaborators</Title>
                <HomePageText>
                  Cream Projects, Natural History Museum, RBKC, Oxford Nanopore
                  Technologies
                </HomePageText>
              </HomePageTextWrapper>
            </FlexDiv>
          </TwoColumnGrid>
          <TopNavbar />
        </HomePageSection>
      </HomeWrapper>
    </Layout>
  );
};

export default Home;
