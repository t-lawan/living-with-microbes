import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Colours } from "../Global/global.styles";
import { toggleAnnotations, toggleData, toggleContext } from "../../Store/action";
import { useLocation } from 'react-router-dom'
import { IsPage, PageURls } from "../../Utility/Misc";
const SideNavbarWrapper = styled.div`
  height: 100vh;
  padding: 1rem;
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
  /* color: ${props => (props.isSelected ? "pink" : Colours.purple)}; */

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
        <FilterLink onClick={props.toggleContext} isSelected={props.show_context}> Context </FilterLink>
        <FilterLink onClick={props.toggleAnnotations} isSelected={props.show_annotations}> Annotations </FilterLink>
        <FilterLink onClick={props.toggleData} isSelected={props.show_data}> Data </FilterLink>
      </FilterWrapper>

      {!IsPage(PageURls.RESEARCH.id, location.pathname) ?  <StyledLinks to={PageURls.RESEARCH.url}>Go to Research</StyledLinks> : null}
      {!IsPage(PageURls.PROPOSAL.id, location.pathname) ?  <StyledLinks to={PageURls.PROPOSAL.url}>Go to Proposal</StyledLinks> : null}
        <StyledLinks to={"/"}>Home</StyledLinks>
      </LinkWrapper>
    </SideNavbarWrapper>
  );
};

const mapStateToProps = state => {
  return {
    show_annotations: state.show_annotations,
    show_context: state.show_context,
    show_data: state.show_data,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleAnnotations: () => dispatch(toggleAnnotations()),
    toggleData: () => dispatch(toggleData()),
    toggleContext: () => dispatch(toggleContext()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideNavbar);
