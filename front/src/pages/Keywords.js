import React, { useState } from "react";
import Modal from "react-modal";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Link } from "react-router-dom";

const GET_KEYWORDS = gql`
  query getKeys {
    getKeywords {
      name
      id
      text
    }
  }
`;
const ADD_KEYWORDS = gql`
  mutation addingKeyword($record: AddKeywordRecord!) {
    addKeyword(record: $record) {
      name
      text
    }
  }
`;
const Keywords = () => {
  const { data, error, loading } = useQuery(GET_KEYWORDS);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [keyword, setKeyword] = useState([]);
  const [addKeyword, { info }] = useMutation(ADD_KEYWORDS);
  console.log(data);

  const saveKeyword = (e) => {
    e.preventDefault();
    addKeyword({ variables: { record: { ...keyword } } });
    setKeyword([]);
    setModalIsOpen(false);
  };
  const addingKeyword = (e) => {
    const value = e.currentTarget.value;
    const name = e.currentTarget.name;
    setKeyword({ ...keyword, [name]: value });
  };

  const closeModal = (e) => {
    e.preventDefault();
    setModalIsOpen(false);
  };

  const openModal = (e) => {
    e.preventDefault();
    setModalIsOpen(true);
  };
  if (loading) {
    return <h2>Loading...</h2>;
  }
  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        ariaHideApp={false}
        onRequestClose={closeModal}
      >
        <form onSubmit={saveKeyword}>
          Name:
          <input name="name" onChange={addingKeyword} />
          Text:
          <input name="text" onChange={addingKeyword} />
          <button>Add</button>
        </form>
      </Modal>
      <div className="buttonTitle">
        <h2>Keywords</h2>
        <div>
          <button onClick={(e) => openModal(e)}>Stick To Note</button>
          <button style={{ marginLeft: "15px" }} onClick={(e) => openModal(e)}>
            Add Keyword
          </button>
        </div>
      </div>
      <ul className="listOfFolders">
        {data &&
          data.getKeywords.map((item) => (
            <li key={item.id} className="keywordsBackground">
              <Link to={`/keyword/${item.id}`} className="folderName">
                {item.name}
              </Link>
            </li>
          ))}
      </ul>
    </>
  );
};

export default Keywords;
