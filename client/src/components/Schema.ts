import { gql } from "apollo-boost";

// All client-facing graphql queries/mutations
export const CREATE_EXERCISE = gql`
  mutation CreateExercise($exerciseName: String!, $targetMuscles: String!) {
    createExercise(exerciseName: $exerciseName, targetMuscles: $targetMuscles) {
      exerciseName
      targetMuscles
    }
  }
`;

export const READ_ALL_EXERCISES = gql`
  {
    exercise {
      id
      exerciseName
      targetMuscles
    }
  }
`;

export const UPDATE_EXERCISE = gql`
  mutation UpdateExercise(
    $exerciseName: String!
    $newExerciseName: String!
    $newTargetMuscles: String!
  ) {
    updateExercise(
      exerciseName: $exerciseName
      newExerciseName: $newExerciseName
      newTargetMuscles: $newTargetMuscles
    )
  }
`;

export const DELETE_EXERCISE = gql`
  mutation DeleteExercise($exerciseName: String!) {
    deleteExercise(exerciseName: $exerciseName)
  }
`;

export const REGISTER_USER = gql`
  mutation RegisterUser($userRegistrationInfo: UserRegistrationInfo!) {
    registerUser(userRegistrationInfo: $userRegistrationInfo) {
      id
      email
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      id
      email
    }
  }
`;

export const AM_I_LOGGED_IN = gql`
  {
    me {
      id
      username
      email
    }
  }
`;
