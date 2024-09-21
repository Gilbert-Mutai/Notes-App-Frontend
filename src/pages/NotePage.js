import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";
// import { type } from "@testing-library/user-event/dist/type";

const NotePage = () => {
  let { id: noteId } = useParams();
  let [note, setNote] = useState(null);
  let navigate = useNavigate();

  let getNote = async () => {
    if (noteId === "new") return;
    let response = await fetch(`/api/notes/${noteId}/`);
    let data = await response.json();
    setNote(data);
  };

  let createNote = async () => {
    await fetch(`/api/notes/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
  };

  let updateNote = async () => {
    await fetch(`/api/notes/${noteId}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
  };

  let deleteNote = async () => {
    await fetch(`/api/notes/${noteId}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    navigate("/");
  };

  let handleSubmit = async () => {
    if (noteId !== "new" && note.body=== '') {
      deleteNote();
    } else if (noteId !== "new") {
      updateNote();
    }else if( noteId === 'new' && note !== null){
      createNote()
    }

    navigate("/");
  };

  useEffect(() => {
    getNote();
  }, [noteId]);


  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <ArrowLeft onClick={handleSubmit} />
        </h3>
        {noteId !== "new" ? (
          <button onClick={deleteNote}>Delete</button>
        ) : (
          <button onClick={handleSubmit}>Done</button>
        )}
      </div>

      <textarea
        onChange={(e) => setNote({ ...note, body: e.target.value })}
        value={note?.body || ""}
      ></textarea>
    </div>
  );
};

export default NotePage;
