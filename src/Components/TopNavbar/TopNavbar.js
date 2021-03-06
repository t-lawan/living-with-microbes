import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import {IsPage, PageURls } from "../../Utility/Misc";
import { StyledLinks } from "../SideNavbar/SideNavbar";
import { useLocation } from 'react-router-dom'
import { size } from "../Global/global.styles";
import { stopLoading } from "../../Store/action";

const TopNavbarWrapper = styled.div`
  width: 100vw;
  padding: 1rem 2rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  @media (max-width: ${size.tabletL}) {
  justify-content: flex-start;
  padding: 1rem 0.5rem;

  }
`;

const TopNavbarLink = styled(StyledLinks)`
    padding: 0 0.5rem;
    margin-right: 3rem;
    /* text-decoration: ${props => props.isSelected ?  "none" : "underline" }; */
    display: ${props => props.isSelected ?  "none" : "inherit" };
    @media (max-width: ${size.tabletL}) {
      margin: 0;
     }
`

const LinkWrapper = styled.div`
  display: flex;
  width: 62.5%;

  flex-direction: row;
  justify-content: start;
  @media (max-width: ${size.tabletL}) {
    justify-content: flex-start;
  /* justify-content: flex-start; */

  }
`;



const TopNavbar = props => {

let location = useLocation();
  let onClick =(id = PageURls.HOME.id) =>{
    if(props.isOnLoadingPage && !IsPage(id, location.pathname)) {
      props.stopLoading()
    }
  }
  return (
    <TopNavbarWrapper>
      <LinkWrapper>
         <TopNavbarLink to={PageURls.NOW.url} isSelected={IsPage(PageURls.NOW.id, location.pathname)} onClick={() => onClick(PageURls.NOW.id)}>walk 1: now</TopNavbarLink>
         <TopNavbarLink to={PageURls.FUTURE.url} isSelected={IsPage(PageURls.FUTURE.id, location.pathname)} onClick={() => onClick(PageURls.FUTURE.id)}>walk 2: future</TopNavbarLink> 
         <TopNavbarLink to={"/"} isSelected={IsPage(PageURls.HOME.id, location.pathname)} onClick={() => onClick(PageURls.HOME.id)}>about</TopNavbarLink>
      </LinkWrapper>
    </TopNavbarWrapper>
  );
};

const mapStateToProps = state => {
  return {
    show_data: state.show_data,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    stopLoading: () => dispatch(stopLoading()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopNavbar);
