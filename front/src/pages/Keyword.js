import React, { useState } from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { Link } from "react-router-dom";

const FIND_KEYWORD = gql`
  query keywordid($record: FindKeywordByIdRecord!) {
    getKeyWordById(record: $record) {
      name
      text
      id
    }
  }
`;
const Keyword = (props) => {
  const id = props.match.params.id;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { loading, error, data } = useQuery(FIND_KEYWORD, {
    variables: { record: { id } },
  });
  console.log(data);
  const openModal = (e) => {
    e.preventDefault();
    setModalIsOpen(true);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.log("errpr", error);
    return <p>{error}</p>;
  }
  return (
    <>
      <div className="buttonTitle">
        <h2>{data && data.getKeyWordById.name}</h2>
        <div>
          <button onClick={(e) => openModal(e)}>Stick To Note</button>
          <button style={{ marginLeft: "15px" }} onClick={(e) => openModal(e)}>
            Add Keyword
          </button>
        </div>
      </div>
    </>
  );
};

export default Keyword;
