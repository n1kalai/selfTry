import React, { useState } from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
const Notes = () => {
  const GET_NOTES = gql`
    query getAllNotes {
      getAllNotes {
        name
        id
        keywords {
          name
        }
      }
    }
  `;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { loading, error, data } = useQuery(GET_NOTES);
  console.log(data);

  const openModal = (e) => {
    e.preventDefault();
    setModalIsOpen(true);
  };
  return (
    <>
      <div className="buttonTitle">
        <h2>Notes</h2>

        <button style={{ marginLeft: "15px" }} onClick={(e) => openModal(e)}>
          Add Note
        </button>
      </div>
      <ul className="listOfFolders">
        {data && data.getAllNotes
          ? data.getAllNotes.map((item) => (
              <li key={item.id} className="noteBackground">
                <Link to={`/note/${item.id}`} className="folderName">
                  {item.name}
                </Link>
                <ul className="detailedNote">
                  <li>Keywords: {item && item.keywords.length} </li>
                </ul>
              </li>
            ))
          : "No Notes For This FIle"}
      </ul>
    </>
  );
};

export default Notes;
