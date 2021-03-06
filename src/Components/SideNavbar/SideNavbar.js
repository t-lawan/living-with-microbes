import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Colours, size } from "../Global/global.styles";
import { toggleData, toggleFutureStories, toggleNowStories } from "../../Store/action";
import { useLocation } from 'react-router-dom'
import { IsPage, PageURls } from "../../Utility/Misc";
const SideNavbarWrapper = styled.div`
  height: 100vh;
  padding: 1rem;
  @media (max-width: ${size.tabletL}) {
    padding: 0.5rem;

  }
`;

export const StyledLinks = styled(Link)`
  display: block;
  text-decoration: none;
  /* color: ${Colours.purple};
  :hover {
    color: ${Colours.green};
  } */
`;

const LinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const FilterLink = styled.span`
  display: block;
  text-decoration: underline;

  text-decoration: ${props => (props.isSelected ? "underline" : "none")};

  /* :hover {
    color: ${Colours.green};
  } */
`

const FilterWrapper = styled.div`
  margin-bottom: 2rem;
`

const SideNavbar = props => {

  
  let location = useLocation();
  return (
    <SideNavbarWrapper>
      <LinkWrapper> 
      <FilterWrapper>
        {IsPage(PageURls.FUTURE.id, location.pathname) ? (
          <>
          <FilterLink onClick={props.toggleFutureStories} isSelected={props.show_future_stories}> stories </FilterLink>
          </>
        ) : null}

        {IsPage(PageURls.NOW.id, location.pathname) ? (
          <>
          <FilterLink onClick={props.toggleNowStories} isSelected={props.show_now_stories}> stories </FilterLink>
          <FilterLink onClick={props.toggleData} isSelected={props.show_data}> data </FilterLink>

          </>
        ) : null}


      </FilterWrapper>
      </LinkWrapper>
    </SideNavbarWrapper>
  );
};

const mapStateToProps = state => {
  return {
    show_data: state.show_data,
    show_future_stories: state.show_future_stories,
    show_now_stories: state.show_now_stories
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleData: () => dispatch(toggleData()),
    toggleFutureStories:() => dispatch(toggleFutureStories()),
    toggleNowStories: () => dispatch(toggleNowStories())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideNavbar);
