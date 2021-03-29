import React, { useRef } from "react";
import Layout from "../Components/Layout/Layout";
import styled from "styled-components";
import { StyledLinks } from "../Components/SideNavbar/SideNavbar";
import { Colours, size } from "../Components/Global/global.styles";
import TopNavbar from "../Components/TopNavbar/TopNavbar";
import { PageURls } from "../Utility/Misc";
import { useLocation } from "react-router-dom";

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

export const Title = styled.p`
  text-align: center;
  margin: 0;
  padding: 0;
`;

const SpecialTextWrapper = styled.div`
  padding: 1.5rem 0;
`;

const CollaboratorText = styled.p`
  margin: 0;
  padding: 0;
  margin-bottom: 0.5rem;
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
  grid-row-gap: 10rem;
  padding: 1rem;
  @media (max-width: ${size.tabletL}) {
    /* width: 90%; */
    grid-row-gap: 1rem;
    grid-template-columns: 1fr;
  }
`;
const HomePageLinksWrapper = styled.div`
  display: flex;
  flex-direction: row;
  /* width: 60%; */
  justify-content: space-between;
  width: 90%;
  @media (max-width: ${size.tabletL}) {
    /* width: 90%; */
    flex-direction: column;
    align-items: baseline;
  }
`;

const HomePageLinks = styled(StyledLinks)`
  /* font-size: 1.5rem; */
  text-decoration: underline;
  text-align: center;
  padding: 1rem;
  padding-left: 0;
  @media (max-width: ${size.tabletL}) {
    padding: 0;
  }
`;

const Home = () => {
  let location = useLocation();
  const aboutSection = useRef(null);
  const homeWrapper = useRef(null);

  if (location.hash === "#about" && aboutSection && homeWrapper) {
    setTimeout(() => {
      console.log('ABOUT', aboutSection.current)
      console.log('HOME', homeWrapper.current)
      if(aboutSection.current) {
        aboutSection.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }
    }, 1000);
  }
  return (
    <Layout>
      <HomeWrapper ref={homeWrapper}>
        <HomePageSection>
        <TwoColumnGrid>
          <div>
            <HomePageText> With Microbes</HomePageText>
          </div>
          <HomePageTextWrapper>
            <HomePageText>
              A series of interactive digital walks reveal the microbial
              diversity that exists within the urban spaces that we inhabit
              daily: our homes, our streets and our public transport
              infrastructure to imagine a future where urban agriculture is
              essential to public life. You will encounter urban food gardens
              that exist as bridges between human and microbial life. Inside
              them, you can breathe in, touch and eat microbes and participate
              in feeding, tending and respecting the soil in our cities - a
              sacred living material that is essential to all lifeforms.
            </HomePageText>
          </HomePageTextWrapper>
          <div>
            <HomePageText> Interactive Walks</HomePageText>
          </div>
          <HomePageLinksWrapper>
            <HomePageLinks to={PageURls.NOW.url}>
              enter walk 1: now
            </HomePageLinks>
            <HomePageLinks to={PageURls.FUTURE.url}>
              enter walk 2: future
            </HomePageLinks>
          </HomePageLinksWrapper>
          </TwoColumnGrid>
          </HomePageSection>
          <TwoColumnGrid>
          <div ref={aboutSection}>
            <HomePageText> About</HomePageText>
          </div>
          <FlexDiv>
            <HomePageTextWrapper>
              <HomePageText>
                Before we can establish new relationships of care within the
                built environment, we need to first acknowledge that our cities
                are inhabited not only by humans, but also by diverse
                communities of microorganisms that are essential to our
                survival.
              </HomePageText>
              <HomePageText>
                This project explores the potential of this emerging technology
                and questions whether it can help us build closer connections
                with the natural world that surrounds us. If this data can
                demonstrate the entanglement of human and microbial life then it
                can provide architects and urban planners with a new perspective
                needed to build cities that cater for all forms of life. If we
                integrated urban agriculture into the fabric of our cities, it
                might encourage greater care between humans and microorganisms.
              </HomePageText>
            </HomePageTextWrapper>
          </FlexDiv>
          <div>
            <HomePageText> Collaborators</HomePageText>
          </div>
          <HomePageTextWrapper>
            <CollaboratorText>Concept and design: Ioana Man</CollaboratorText>
            <CollaboratorText>
              Web experience and development: Cream Projects and Akinsola
              Lawanson
            </CollaboratorText>
            <CollaboratorText>
              Metagenomic analysis: Darren Chooneea, NHM Molecular Lab
            </CollaboratorText>
            <CollaboratorText>
              Sequencing technology: Oxford Nanopore Technologies
            </CollaboratorText>
            <CollaboratorText>
              Base 3d geometry: 3D City Model of London © 2021 AccuCities
            </CollaboratorText>
            <SpecialTextWrapper>
              <HomePageText>
                {" "}
                Special thanks to: Sumitra Upham and Design Museum, Regular
                Practice, Dr Darren Chooneea, Ben Smith, Lisa Wilkinson, Patrick
                Markey-Bell, Nadja Ellinger, Dr Sue Ishaq, Dr Gwynne Mhuireach,
                Jake Robinson, Harry Watkins
              </HomePageText>
            </SpecialTextWrapper>
          </HomePageTextWrapper>
        </TwoColumnGrid>
      </HomeWrapper>
    </Layout>
  );
};

export default Home;
