import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import "../styles/App.css";
const GET_FOLDERS = gql`
  query getFolders {
    getAllFolders {
      name
      uid
      files {
        name
        iconUrl
        notes {
          name
          text
          keywords {
            name
            id
          }
        }
      }
      user {
        firstName
        lastName
      }
    }
  }
`;

const ADD_FOLDER = gql`
  mutation addingFolder($record: AddFolderRecord!) {
    addFolder(record: $record) {
      uid
      name
    }
  }
`;

const DELETE_FOLDER = gql`
  mutation delete($record: RemoveFolderRecord!) {
    deleteFolder(record: $record) {
      uid
    }
  }
`;

const Home = () => {
  const [folder, setFolder] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { loading, error, data: datas } = useQuery(GET_FOLDERS, {
    fetchPolicy: "network-only",
    partialRefetch: true,
  });
  const [addFolder, { data }] = useMutation(ADD_FOLDER, {
    update(store, response) {
      const data = store.readQuery({ query: GET_FOLDERS });
      data.getAllFolders.push(response.data.addFolder);
      store.writeQuery({ query: ADD_FOLDER, data });
    },
  });

  const [deleteFolder] = useMutation(DELETE_FOLDER, {
    update(store, response) {
      const data = store.readQuery({ query: GET_FOLDERS });
      console.log("Data", data);
      console.log("store", store);
      console.log("response", response);

      data.getAllFolders = data.getAllFolders.filter(
        (fold) => fold.uid !== response.data.deleteFolder.uid
      );
      store.writeQuery({ query: DELETE_FOLDER, data });
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  const addingFolder = (e) => {
    const value = e.currentTarget.value;
    setFolder(value);
  };

  const saveFolder = (e) => {
    e.preventDefault();
    addFolder({ variables: { record: { name: folder } } });
    setFolder("");
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

  const removeFolder = (e, uid, files, user) => {
    e.preventDefault();
    if (files && files.length > 0) {
      console.log(files);
      return alert("connected to file");
    }

    if (user) {
      return alert("connected to user");
    }
    deleteFolder({ variables: { record: { uid } } });
  };
  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        ariaHideApp={false}
        onRequestClose={closeModal}
      >
        <form onSubmit={saveFolder}>
          <input autoComplete="off" name="name" onChange={addingFolder} />
          <button>Add</button>
        </form>
      </Modal>
      <div className="buttonTitle">
        <h2>Folders</h2>
        <button onClick={(e) => openModal(e)}>Add Folder</button>
      </div>
      <ul className="listOfFolders">
        {datas.getAllFolders.map((item) => (
          <li key={item.uid} className="folderBackground">
            <Link to={`/folder/${item.uid}`} className="folderName">
              {item.name}
            </Link>
            <button
              onClick={(e) => removeFolder(e, item.uid, item.files, item.user)}
            >
              Remove
            </button>
            <ul className="detailedFolder">
              <li>Files: {(item.files && item.files.length) || 0}</li>
              <li>User: {item.user ? item.user.firstName : "No User"}</li>
            </ul>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Home;
