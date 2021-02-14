import * as React from "react";
import { TwoColumnSection } from "../Global/global.styles";
import SideNavbar from "../SideNavbar/SideNavbar";
import Layout, { Main } from "./Layout";

const TwoColumnLayout = props => {
  return (
    <Layout>
      <TwoColumnSection>
        <SideNavbar />
        <Main>{props.children}</Main>
      </TwoColumnSection>
    </Layout>
  );
};

export default TwoColumnLayout;
