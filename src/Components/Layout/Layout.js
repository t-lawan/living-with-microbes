import * as React from "react";
import { Helmet } from "react-helmet";
import { GlobalStyle, TwoColumnSection } from "../Global/global.styles";
import SideNavbar from "../SideNavbar/SideNavbar";
import styled from 'styled-components'
import LoadingPage from "../LoadingPage/LoadingPage";

export const Main = styled.section`

`
const Layout = props => {
  let description = "Living With Microbes";
  let url = "https://demomovingimage.net/";
  let title = "Living With Microbes";

  return (
    <>
      <Helmet
        htmlAttributes={{
          lang: "en"
        }}
        title={title}
        meta={[
          {
            rel: "canonical",
            href: `${url}`
          },
          {
            name: `description`,
            content: description
          },
          {
            property: `og:title`,
            content: title
          },
          {
            property: `og:description`,
            content: description
          },
        //   {
        //     property: `og:image`,
        //     content: SharingUrl
        //   },
          {
            property: `og:image:width`,
            content: `720`
          },
          {
            property: `og:image:height`,
            content: `720`
          },
          {
            property: `og:type`,
            content: `website`
          },
          {
            property: `og:url`,
            content: `${url}`
          },
          {
            name: `twitter:card`,
            content: `summary`
          },
          {
            name: `twitter:title`,
            content: title
          },
          {
            name: `twitter:description`,
            content: description
          }
        ]}
      />
      <GlobalStyle />
      <LoadingPage />
      <Main>{props.children}</Main>
    </>
  );
};

export default Layout;
