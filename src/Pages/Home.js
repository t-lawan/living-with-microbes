import * as React from "react";
import TestEnvironment from "../Components/Environment/TestEnvironment";
import Layout from "../Components/Layout/Layout";
import ProposalEnvironment from "../Components/Environment/ProposalEnvironment";
import styled from 'styled-components'
import { StyledLinks } from "../Components/SideNavbar/SideNavbar";
import { Colours } from "../Components/Global/global.styles";

const HomeWrapper = styled.div`
  height: 100vh;
  width: 100vw;
`

const FlexDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  justify-content: center;
  align-items: center;
`

const Title = styled.h1`
  color: ${Colours.yellow};
  transition: color 0.1s;
  :hover {
    color: ${Colours.purple};
  }
`

const HomePageLinks = styled(StyledLinks)`
  font-size: 1.5rem;
  text-decoration: none;
  color: ${Colours.purple};
  transition: color 0.1s;
  :hover {
    color: ${Colours.yellow};
  }
`

const Home = () => {

  return (
    <Layout>
      <HomeWrapper>
      <FlexDiv>
        <Title> Living With Microbes</Title>
        <HomePageLinks to={'/research'}> Research</HomePageLinks>
        <HomePageLinks to={'/proposal'}> Proposal</HomePageLinks>
      </FlexDiv>


      </HomeWrapper>
    </Layout>
  );
};

export default Home;