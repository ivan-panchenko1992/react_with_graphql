import { gql } from '@apollo/client';

export const GET_ALL_WORKERS = gql`
  query {
    getAllWorkers {
      firstName, lastName, position, id,
    }
  }
`
export const GET_WORKER = gql`
  query getWorker($id: Int){
    getWorker(id: $id) {
      firstName, lastName, position, id,
    }
  }
`
