import { DocumentNode } from "apollo-boost";
import React, { useState } from "react";
import {
  Mutation,
  MutationFn,
  MutationOpts,
  OperationVariables
} from "react-apollo";
import { Input } from "../inputs/InputTypes";
import Field from "./modules/Field";

interface MutationFormProps extends MutationOpts {
  mutation: DocumentNode;
  inputs: Input[];
  ctaText: string;
}

enum MutationStatus {
  UNREQUESTED = "UNREQUESTED",
  LOADING = "LOADING",
  ERROR = "ERROR",
  SUCCESS = "SUCCESS"
}

const MutationForm: React.FC<MutationFormProps> = ({
  mutation,
  refetchQueries,
  variables,
  inputs,
  onCompleted,
  ctaText
}) => {
  const [mutationStatus, setMutationStatus] = useState(
    MutationStatus.UNREQUESTED
  );

  return (
    <Mutation
      mutation={mutation}
      refetchQueries={refetchQueries}
      onCompleted={() => {
        setMutationStatus(MutationStatus.SUCCESS);
        onCompleted;
      }}
      onError={() => {
        setMutationStatus(MutationStatus.ERROR);
      }}
    >
      {(
        mutationFunction: MutationFn<any, OperationVariables>,
        { error }: any
      ) => (
        <form
          onSubmit={e => {
            e.preventDefault();
            mutationFunction({
              variables
            });
            setMutationStatus(MutationStatus.LOADING);
          }}
        >
          <div className="fields">
            {inputs.map((input, i) => (
              <Field key={i} {...input} />
            ))}
          </div>
          {mutationStatus === MutationStatus.SUCCESS ||
          mutationStatus === MutationStatus.LOADING ? (
            <button>{mutationStatus}</button>
          ) : (
            <button type="submit">{ctaText}</button>
          )}
          {error ? (
            error.graphQLErrors.map((error: any, i: any) => (
              <div className="error-message" key={i}>
                {error.message}
              </div>
            ))
          ) : (
            <></>
          )}
        </form>
      )}
    </Mutation>
  );
};

export default MutationForm;
