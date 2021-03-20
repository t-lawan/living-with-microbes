import * as React from "react";
import TestEnvironment from "../Components/Environment/TestEnvironment";
import Layout from "../Components/Layout/Layout";
import FutureEnvironment from "../Components/Environment/FutureEnvironment";
import TwoColumnLayout from "../Components/Layout/TwoColumnLayout";

const Future = () => {
  let title = "Possible Future | With Microbes"
  let description = "Looking towards the future, what would a city look like where public infrastructure is designed to enable interaction between humans and microorganisms via structures that support edible plants?"
  return (
    <TwoColumnLayout title={title} description={description}>
        <FutureEnvironment />
    </TwoColumnLayout>
  );
};

export default Future;