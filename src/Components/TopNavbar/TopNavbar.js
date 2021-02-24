import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import {IsPage, PageURls } from "../../Utility/Misc";
import { StyledLinks } from "../SideNavbar/SideNavbar";
import { useLocation } from 'react-router-dom'
import { size } from "../Global/global.styles";

const TopNavbarWrapper = styled.div`
  width: 100vw;
  padding: 1rem 2rem;
`;

const TopNavbarLink = styled(StyledLinks)`
    padding: 0 0.5rem;
    text-decoration: ${props => props.isSelected ?  "none" : "underline" };
`

const LinkWrapper = styled.div`
  display: flex;
  width: 100%;

  flex-direction: row;
  justify-content: flex-end;
  @media (max-width: ${size.tabletL}) {
    justify-content: center;
  }
`;



const TopNavbar = props => {

let location = useLocation();
  
  return (
    <TopNavbarWrapper>
      <LinkWrapper>
         <TopNavbarLink to={PageURls.RESEARCH.url} isSelected={IsPage(PageURls.RESEARCH.id, location.pathname)}>now</TopNavbarLink>
         <TopNavbarLink to={PageURls.PROPOSAL.url} isSelected={IsPage(PageURls.PROPOSAL.id, location.pathname)}>future</TopNavbarLink> 
        <TopNavbarLink to={"/"} isSelected={IsPage(PageURls.HOME.id, location.pathname)}>about</TopNavbarLink>
      </LinkWrapper>
    </TopNavbarWrapper>
  );
};

const mapStateToProps = state => {
  return {
    show_annotations: state.show_annotations,
    show_context: state.show_context,
    show_data: state.show_data,
  };
};


export default connect(
  mapStateToProps,
  null
)(TopNavbar);
