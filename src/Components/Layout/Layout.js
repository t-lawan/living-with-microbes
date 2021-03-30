import * as React from "react";
// import { Helmet } from "react-helmet";
import { GlobalStyle, TwoColumnSection } from "../Global/global.styles";
import SideNavbar from "../SideNavbar/SideNavbar";
import styled from 'styled-components'
import LoadingPage from "../LoadingPage/LoadingPage";
import { Helmet, HelmetProvider } from 'react-helmet-async';
export const Main = styled.section`
  overflow: hidden;
`
const Layout = props => {
  let description = props.description ? props.description : "A series of interactive digital walks using metagenomics to reveal food gardens as spaces for mutual care and imagine a future where urban agriculture is essential to public life.";
  let url = "";
  let title = props.title ? props.title : "With Microbes: From Fear of Germs to Mutual Care via Urban Food Growing" ;
  return (
    <HelmetProvider>
      <Helmet
        htmlAttributes={{
          lang: "en"
        }}
        defaultTitle={title}
        title={title}
        defer={false}
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
      >
       <title itemProp="name" lang="en">{title}</title>
       <meta name="description" content={description} />
       <link rel="canonical" href={url} />
       <meta property="og:type" content="website" />
       <meta property="og:description" content={description} />
       <meta property="og:title" content={title} />
       <meta property="og:url" content={url} />
       <meta  name="twitter:title" content={title} />
       <meta  name="twitter:description" content={description} />
      </Helmet>
      <GlobalStyle />
      <LoadingPage />
      <Main>{props.children}</Main>
    </HelmetProvider>
  );
};

export default Layout;
