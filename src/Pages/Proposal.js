import * as React from "react";
import TestEnvironment from "../Components/Environment/TestEnvironment";
import Layout from "../Components/Layout/Layout";
import ProposalEnvironment from "../Components/Environment/ProposalEnvironment";
import TwoColumnLayout from "../Components/Layout/TwoColumnLayout";

const Proposal = () => {

  return (
    <TwoColumnLayout>
        <ProposalEnvironment />
    </TwoColumnLayout>
  );
};

export default Proposal;