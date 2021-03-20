import * as React from "react";
import { TwoColumnSection } from "../Global/global.styles";
import SideNavbar from "../SideNavbar/SideNavbar";
import Layout, { Main } from "./Layout";
import styled from 'styled-components'

const TwoColumnLayoutWrapper = styled.div`
`

const SideNavbarWrapper = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;

`

const TwoColumnMain = styled(Main)`
  height: 100vh;
`

const TwoColumnLayout = props => {
  return (
    <Layout title={props.title} description={props.description}>
      <TwoColumnLayoutWrapper>
        <SideNavbarWrapper>
          <SideNavbar />
        </SideNavbarWrapper>
        <TwoColumnMain>{props.children}</TwoColumnMain>
      </TwoColumnLayoutWrapper>
    </Layout>
  );
};

export default TwoColumnLayout;
