import * as React from "react";
import styled from "styled-components";

const LoadingBarWrapper = styled.div`
  display: ${props => (props.show ? "flex" : "none")};

  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;

`;
const LoadingWrapper = styled.div`
  width: 80%;
  height: 1rem;
  background: #72869d;
`;
const LoadingProgressWrapper = styled.div`
  bottom: 0;
  width: ${props => props.percent};
  height: 100%;
  background: green;
`;
const LoadingBar = (props) => {
  let percent = 0;
  if (props.loaded && props.total) {
    percent = Math.round((props.loaded / props.total) * 100);
  }
  return (
    <LoadingBarWrapper show={props.show}>
      <LoadingWrapper>
        <LoadingProgressWrapper percent={`${percent}%`} />
      </LoadingWrapper>
    </LoadingBarWrapper>
  );
};

export default LoadingBar;
