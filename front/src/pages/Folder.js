import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Link } from "react-router-dom";
import filesImg from "../assets/files.png";
const Folder = (props) => {
  const id = props.match.params.id;
  const FOLDER_ID = gql`
    query folder_id($record: FindFolderByIdRecord!) {
      getFolderById(record: $record) {
        name
        user {
          firstName
          lastName
        }
        files {
          name
          iconUrl
          id
          notes {
            name
          }
        }
      }
    }
  `;
  const { loading, error, data } = useQuery(FOLDER_ID, {
    variables: { record: { id } },
    fetchPolicy: "network-only",
    partialRefetch: true,
  });
  console.log(data);
  return (
    <>
      <h2>{data && data.getFolderById.name} >> Files</h2>
      <ul className="listOfFolders">
        {data && data.getFolderById.files
          ? data.getFolderById.files.map((item) => (
              <li className="filesBackground" key={item.id}>
                <img src={filesImg} alt="gela" />
                <Link to={`/file/${item.id}`} className="folderName">
                  {" "}
                  {item.name}
                </Link>
                <ul className="detailedFile">
                  <li>Notes: {item.notes ? item.notes.length : 0}</li>
                </ul>
              </li>
            ))
          : "No Files In This Folder"}
      </ul>
    </>
  );
};

export default Folder;
