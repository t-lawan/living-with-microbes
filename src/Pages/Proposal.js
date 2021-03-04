import * as React from "react";
import TestEnvironment from "../Components/Environment/TestEnvironment";
import Layout from "../Components/Layout/Layout";
import FutureEnvironment from "../Components/Environment/FutureEnvironment";
import TwoColumnLayout from "../Components/Layout/TwoColumnLayout";

const Proposal = () => {

  return (
    <TwoColumnLayout>
        <FutureEnvironment />
    </TwoColumnLayout>
  );
};

export default Proposal;