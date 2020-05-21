import React, { useState } from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { Link } from "react-router-dom";

const FIND_NOTE = gql`
  query findNoteById($record: FindNoteByIdRecord!) {
    findNoteById(record: $record) {
      name
      text
      id
      keywords {
        name
        text
        id
      }
    }
  }
`;
const File = (props) => {
  const id = props.match.params.id;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { loading, error, data } = useQuery(FIND_NOTE, {
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
        <h2>{data && data.findNoteById.name} >> Notes</h2>
        <div>
          <button onClick={(e) => openModal(e)}>Stick To File</button>
          <button style={{ marginLeft: "15px" }} onClick={(e) => openModal(e)}>
            Add Note
          </button>
        </div>
      </div>
      <ul className="listOfFolders">
        {data && data.findNoteById && data.findNoteById.keywords
          ? data.findNoteById.keywords.map((item) => (
              <li key={item.id} className="keywordsBackground">
                <Link to={`/keyword/${item.id}`} className="folderName">
                  {item.name}
                </Link>
              </li>
            ))
          : "No Notes For This FIle"}
      </ul>
    </>
  );
};

export default File;
