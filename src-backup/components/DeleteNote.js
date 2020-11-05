import React from 'react';
import { useMutation } from '@apollo/client';
import { withRouter } from 'react-router-dom';
import ButtonAsLink from './ButtonAsLink';
import { DELETE_NOTE } from '../gql/mutation';
// to refetch
import { GET_MY_NOTES, GET_NOTES } from '../gql/query';

const DeleteNote = props => {
  const [deleteNote] = useMutation(DELETE_NOTE, {
    variables: {
      id: props.noteId
    },
    // refetch the note list queries to update the cache
    // the book is incorrect
    // refetchQueries: [{ query: GET_MY_NOTES, GET_NOTES }],
    refetchQueries: [{ query: GET_MY_NOTES }, { query: GET_NOTES }],
    onCompleted: data => {
      // redirect the user to the "my notes" page
      // ini saya ganti juga dari push jadi replace, agar ketika user tekan back, dia tidak balik ke deleted note tadi
      // props.history.push('/mynotes');
      props.history.replace('/mynotes');
    }
  });
  return <ButtonAsLink onClick={deleteNote}>Delete Note</ButtonAsLink>;
};
export default withRouter(DeleteNote);
