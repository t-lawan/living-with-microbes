import * as React from "react";
import TestEnvironment from "../Components/Environment/TestEnvironment";
import TwoColumnLayout from "../Components/Layout/TwoColumnLayout";
import NowEnvironment from "../Components/Environment/NowEnvironment";

const Now = () => {
  let title = "Now | With Microbes"
  let description = "This virtual walk takes you through three food gardens inviting you to see the microorganisms that live within and around them."

  return (
    <TwoColumnLayout title={title} description={description}>
        <NowEnvironment />
    </TwoColumnLayout>
  );
};

export default Now;