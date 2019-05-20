import React from "react";
import { Mutation } from "react-apollo";
import { useInputWithReset } from "../Hooks";
import { AM_I_LOGGED_IN, REGISTER_USER } from "../Schema";

const RegisterUserForm = () => {
  const { setValue: setEmailField, ...emailField } = useInputWithReset("");
  const { setValue: setUsernameField, ...usernameField } = useInputWithReset(
    ""
  );
  const { setValue: setPasswordField, ...passwordField } = useInputWithReset(
    ""
  );

  return (
    <>
      <Mutation
        mutation={REGISTER_USER}
        refetchQueries={[{ query: AM_I_LOGGED_IN }]}
      >
        {(registerUser, { error }) => (
          <form
            onSubmit={e => {
              e.preventDefault();
              registerUser({
                variables: {
                  userRegistrationInfo: {
                    username: usernameField.value,
                    email: emailField.value,
                    password: passwordField.value
                  }
                }
              });
              setEmailField("");
              setPasswordField("");
              setUsernameField("");
            }}
          >
            <div className="fields">
              <div className="field">
                <label className="field-label" htmlFor="exercise-name">
                  Username:
                </label>
                <input
                  type="text"
                  className="field-input"
                  placeholder="Enter username"
                  {...usernameField}
                />
              </div>
              <div className="field">
                <label className="field-label" htmlFor="exercise-name">
                  Email:
                </label>
                <input
                  type="text"
                  className="field-input"
                  placeholder="Enter email"
                  {...emailField}
                />
              </div>
              <div className="field">
                <label className="field-label" htmlFor="target-muscles">
                  Password:
                </label>
                <input
                  type="password"
                  className="field-input"
                  placeholder="Enter password"
                  {...passwordField}
                />
              </div>
            </div>
            <button type="submit">Register</button>
            {/* // TODO: implement elegant user facing error messages */}
            {error ? (
              <div className="error-message">{error.message}</div>
            ) : (
              <></>
            )}
          </form>
        )}
      </Mutation>
    </>
  );
};

export default RegisterUserForm;