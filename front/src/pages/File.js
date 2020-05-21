import React, { useState } from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
const FIND_FILE = gql`
  query findFileById($record: FindFileByIdRecord!) {
    findFileById(record: $record) {
      name
      id
      notes {
        name
        id
        keywords {
          name
        }
      }
    }
  }
`;

const STICK_FOLDER = gql`
  mutation fileToFolder($record: StickFileToFolderRecord!) {
    stickFileToFolder(record: $record) {
      name
      uid
      files {
        name
      }
    }
  }
`;

// const UPLOAD_FILE = gql`
//   mutation upfile($record: UploadFileIdRecord) {
//     uploadFiles(record: $record) {
//       name
//     }
//   }
// `;

const UP_FILE = gql`
  mutation upsfile($file: FileUploadRecord!) {
    uploadFiles(file: $file)
  }
`;

const GET_FOLDERS = gql`
  query getFolders {
    getAllFolders {
      uid
      name
    }
  }
`;

const File = (props) => {
  const id = props.match.params.id;
  const initialState = {
    folderId: "",
    fileId: id,
  };
  const {
    error: folderError,
    data: folders,
    loading: folderLoading,
  } = useQuery(GET_FOLDERS);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [record, setRecord] = useState(initialState);
  const [file, setFile] = useState([]);
  console.log("file", file);
  const [uploadFiles] = useMutation(UP_FILE);
  const [stickFileToFolder] = useMutation(STICK_FOLDER, {
    variables: { record: { ...record } },
  });
  const { loading, error, data } = useQuery(FIND_FILE, {
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
    return <p>{error}</p>;
  }
  // stick file to folder
  const setFolder = (e) => {
    e.preventDefault();
    const value = e.currentTarget.value;
    setRecord({ ...record, folderId: value });
  };

  const stickFile = (e) => {
    e.preventDefault();
    stickFileToFolder({ variables: { record: { ...record } } });
  };

  const uploadedFile = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("image", file);
    return await uploadFiles({
      variables: {
        record: { ...fd },
        headers: { "Content-Type": "multipart/form-data" },
      },
    });
    // send to gql
  };

  const uploadFile = (e) => {
    e.preventDefault();
    const file = e.currentTarget.files[0];

    setFile(file);
    console.log(e.currentTarget.files[0]);
  };
  return (
    <>
      <div className="buttonTitle">
        <h2>{data && data.findFileById.name} >> Notes</h2>
        <div>
          <select onChange={setFolder}>
            <option>Select Folder</option>
            {folders &&
              folders.getAllFolders.map((folder) => (
                <option value={folder.uid}>{folder.name}</option>
              ))}
          </select>
          <button onClick={stickFile}>Stick To Folder</button>

          <button style={{ marginLeft: "15px" }} onClick={(e) => openModal(e)}>
            Add Note
          </button>
        </div>
      </div>
      <ul className="listOfFolders">
        {data && data.findFileById.notes
          ? data.findFileById.notes.map((item) => (
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
      <form onSubmit={uploadedFile} encType="multipart/form-data">
        <input type="file" name="file" onChange={uploadFile} />
        <button>upload</button>
      </form>
    </>
  );
};

export default File;
