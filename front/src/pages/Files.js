import React, { useState } from "react";
import { gql } from "apollo-boost";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import filesImg from "../assets/files.png";
const GET_FILES = gql`
  query getAllFiles {
    getAllFiles {
      name
      id
      folder {
        name
        uid
      }
      notes {
        name
      }
    }
  }
`;

const ADD_FILE = gql`
  mutation addingFile($record: AddFileRecord!) {
    addFile(record: $record) {
      id
      name
      iconUrl
      order
    }
  }
`;

const REMOVE_FILE = gql`
  mutation deleteFile($record: RemoveFileRecord!) {
    removeFile(record: $record) {
      id
    }
  }
`;

const Files = () => {
  const { loading, error, data } = useQuery(GET_FILES, {
    fetchPolicy: "network-only",
    partialRefetch: true,
  });
  const [file, setFile] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [addFile] = useMutation(ADD_FILE, {
    update(store, response) {
      const data = store.readQuery({
        query: GET_FILES,
      });
      data.getAllFiles.push(response.data.addFile);
      store.writeQuery({ query: ADD_FILE, data });
    },
  });

  const [removesFile] = useMutation(REMOVE_FILE, {
    update(store, response) {
      const data = store.readQuery({ query: GET_FILES });
      data.getAllFiles = data.getAllFiles.filter(
        (file) => file.id !== response.data.removeFile.id
      );
      store.writeQuery({ query: REMOVE_FILE, data });
    },
  });
  const addingFile = (e) => {
    const value = e.currentTarget.value;
    const name = e.currentTarget.name;
    if (name === "order") {
      const newVal = parseInt(value);
      console.log(typeof newVal);
      setFile({ ...file, order: newVal });
    }
    setFile({ ...file, [name]: value });
  };

  const removeFile = (e, id) => {
    e.preventDefault();
    if (!id) {
      return alert("please refresh");
    }
    removesFile({ variables: { record: { id } } });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  const saveFile = (e) => {
    e.preventDefault();
    file.order = parseInt(file.order);
    addFile({
      variables: { record: { ...file } },
    });
    setFile("");
    setModalIsOpen(false);
  };
  const closeModal = (e) => {
    e.preventDefault();
    setModalIsOpen(false);
  };
  const openModal = (e) => {
    e.preventDefault();
    setModalIsOpen(true);
  };
  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        ariaHideApp={false}
        onRequestClose={closeModal}
      >
        <form onSubmit={saveFile}>
          Name:
          <input autoComplete="off" name="name" onChange={addingFile} />
          IconUrl:
          <input autoComplete="off" name="iconUrl" onChange={addingFile} />
          Order:
          <input autoComplete="off" name="order" onChange={addingFile} />
          <button>Add</button>
        </form>
      </Modal>
      <div className="buttonTitle">
        <h2>Files</h2>

        <button style={{ marginLeft: "15px" }} onClick={(e) => openModal(e)}>
          Add File
        </button>
      </div>
      <ul className="listOfFolders">
        {data &&
          data.getAllFiles.map((item) => (
            <li key={item.id} className="filesBackground">
              <img src={filesImg} />
              <Link to={`/file/${item.id}`} className="folderName">
                {item.name}
              </Link>
              <ul className="detailedFile">
                <li>Notes: {item.notes ? item.notes.length : 0}</li>
              </ul>
              <button
                onClick={(e) => removeFile(e, item.id)}
                className="fileRemoveButton"
              >
                Remove
              </button>
            </li>
          ))}
      </ul>
    </>
  );
};
export default Files;
