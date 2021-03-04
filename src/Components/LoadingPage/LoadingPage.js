import * as React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import LoadingBar from "../LoadingBar/LoadingBar";
import { Colours, size } from "../Global/global.styles";
import { useLocation } from "react-router-dom";
import { IsPage, PageURls } from "../../Utility/Misc";
import { Title } from "../../Pages/Home";
import TopNavbar from "../TopNavbar/TopNavbar";

const LoadingPageWrapper = styled.div`
  display: ${props => (props.show ? "flex" : "none")};
  position: fixed;
  height: 100vh;
  width: 100vw;

  z-index: 100;
  background: ${Colours.grey};
`;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  align-items: center;
  @media (max-width: ${size.tabletL}) {
  }
`;

const TextWrapper = styled.div`
  width: 60%;
  text-align: center;
  @media (max-width: ${size.tabletL}) {
    width: 90%;
    margin-top: 2rem;
  }

  @media (max-width: ${size.mobileM}) {
    width: 90%;
    margin-top: 0.5rem;
  }
`;

const LoadingBarWrapper = styled.div`
  width: 60%;
  padding-bottom: 2rem;

  @media (max-width: ${size.tabletL}) {
    width: 90%;
    padding-bottom: 1rem;
  }
`;

const Text = styled.p`
  @media (max-width: ${size.tabletL}) {
    margin-top: 1rem;
  }
`;

const LoadingPage = props => {
  let location = useLocation();
  return (
    <LoadingPageWrapper show={props.is_loading}>
      <ContentWrapper>
        <TopNavbar isOnLoadingPage={true} />

        <TextWrapper>
          {IsPage(PageURls.FUTURE.id, location.pathname) ? (
            <React.Fragment>
              <Title> What could the future look like?</Title>
              <Text>
                {" "}
                Please scroll to go on a walk and explore sidewalk interventions
                that weave food growing into the spaces we inhabit on a daily
                basis. This is a possible future where we could causually snack
                along a walk.You will encounter espaliered trees hosted on
                building facades and edible hedges that make space for
                encounters between humans and microorganisms. You will also see
                stories from this future where maintenance and care bring us
                closer to biodiversity across all scales. Please feel free to
                switch off any of these layers in the side panel.{" "}
              </Text>
            </React.Fragment>
          ) : null}
          {IsPage(PageURls.NOW.id, location.pathname) ? (
            <React.Fragment>
              <Title> Where are we now?</Title>
              <Text>
                {" "}
                Please scroll to go on a walk and explore three community food
                gardens in the London borough of Kensington & Chelsea. You will
                start from the courtyard of an apartment block, continue along
                the street and end up at a train station.Metagenomic technology
                allows us to learn what organisms live where, so data clouds
                will show you the microbial communities that live in these
                spaces. You will also encounter stories that explain what
                architecture has to do with microbes. Please feel free to switch
                off any of these layers in the side panel.{" "}
              </Text>
            </React.Fragment>
          ) : null}
        </TextWrapper>
        <LoadingBarWrapper>
          <LoadingBar show={true} loaded={props.loaded} total={props.total} />
        </LoadingBarWrapper>
      </ContentWrapper>
    </LoadingPageWrapper>
  );
};
const mapStateToProps = state => {
  return {
    is_loading: state.is_loading,
    has_loaded: state.has_loaded,
    loaded: state.loaded,
    total: state.total
  };
};



export default connect(
  mapStateToProps,
  null
)(LoadingPage);
