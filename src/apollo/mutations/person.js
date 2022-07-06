import { gql } from 'apollo-boost';

export const UPDATE_PERSON = gql`
  mutation updatePerson($person: PersonInput, $id: ID!) {
    updatePerson(person: $person, id: $id) {
      id
    }
  }
`;

export const DELETE_PERSON = gql`
  mutation deletePerson($id: ID!) {
    deletePerson(id: $id) {
      id
    }
  }
`;

export const DELETE_MULTIPLE_PEOPLE = gql`
  mutation deleteMultiplePeople($ids: [ID]) {
    deleteMultiplePeople(ids: $ids) {
      id
    }
  }
`;
