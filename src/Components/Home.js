import React, { useEffect, useState } from "react";
import db from "../firebase-config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "@firebase/firestore";
import "../style/noteitemsstyle.css";
import { Modal, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";

export const Home = (props) => {
  const [notes, setNotes] = useState({});
  const [newtitle, setNewTitle] = useState("");
  const [newdescription, setNewDescription] = useState("");
  const [newtag, setNewTag] = useState("Default");
  const usersCollectionRef = collection(db, "notes");

  useEffect(() => {
    const getNotesfunc = async () => {
      const data = await getDocs(usersCollectionRef);
      setNotes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getNotesfunc(); // eslint-disable-next-line
  }, []);

  const fetchAllNotesfunc = async () => {
    const data = await getDocs(usersCollectionRef);
    setNotes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const addNotesfunc = async (e) => {
    e.preventDefault();
    await addDoc(usersCollectionRef, {
      title: newtitle,
      description: newdescription,
      tag: newtag,
    });
    props.showAlert("Note Added Successfully", true);
    setNewTitle("");
    setNewDescription("");
    setNewTag("");
    fetchAllNotesfunc();
  };

  const [modalId, setModalId] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [modalDescription, setModalDescription] = useState("");
  const [modalTag, setModalTag] = useState("");

  const modalTriggerFunc = (Nid, Ntitle, Ndescription, Ntag) => {
    setModalShow(true);
    setModalId(Nid);
    setModalTitle(Ntitle);
    setModalDescription(Ndescription);
    setModalTag(Ntag);
  };

  const handleUpdatefunc = async (Utitle, Udesc, Utag) => {
    setModalShow(false);
    let id = modalId;
    const noteDoc = doc(db, "notes", id);
    const newFields = { title: Utitle, description: Udesc, tag: Utag };
    await updateDoc(noteDoc, newFields);
    fetchAllNotesfunc();
  };

  const handleDeleteFunc = async (id) => {
    let reply = window.confirm("are you sure you want to delete the note");
    if (reply) {
      const userDoc = doc(db, "notes", id);
      await deleteDoc(userDoc);
      props.showAlert("Note Deleted Successfully", true);
    } else {
      props.showAlert("Note not Deleted", true);
    }
    fetchAllNotesfunc();
  };

  const [modalShow, setModalShow] = useState(false);
  const handleModalClose = () => setModalShow(false);

  return (
    <>
      <div className="container">
        <div className="addSection">
          <div className="container mt-5">
            <h2 className="mt-2">Add a note</h2>
            <form className="my-3" method="" action="">
              <div className="mb-3">
                <label className="form-label">Note title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={newtitle}
                  className="form-control"
                  onChange={(e) => {
                    setNewTitle(e.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Note Description</label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={newdescription}
                  className="form-control"
                  onChange={(e) => {
                    setNewDescription(e.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Tag</label>
                <input
                  type="text"
                  id="tag"
                  name="tag"
                  className="form-control"
                  value={newtag}
                  onChange={(e) => {
                    setNewTag(e.target.value);
                  }}
                />
              </div>

              <button
                disabled={newtitle.length < 3 || newdescription.length < 3}
                type="submit"
                className="btn btn-primary"
                onClick={addNotesfunc}
              >
                Add Note
              </button>
            </form>
          </div>
        </div>

        <Modal show={modalShow} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit your notes</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="formBasicEmail"
                style={{ display: "none" }}
              >
                <Form.Label>Note id</Form.Label>
                <Form.Control
                  type="text"
                  id="etitle"
                  name="etitle"
                  value={modalId}
                />
              </Form.Group>

              <Form.Group className="mb-4 mt-2" controlId="formBasicEmail">
                <Form.Label>Note title</Form.Label>
                <Form.Control
                  type="text"
                  id="etitle"
                  name="etitle"
                  value={modalTitle}
                  onChange={(e) => {
                    setModalTitle(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="formBasicEmail">
                <Form.Label>Note Description</Form.Label>
                <Form.Control
                  type="text"
                  id="edescription"
                  value={modalDescription}
                  name="edescription"
                  className="form-control"
                  onChange={(e) => {
                    setModalDescription(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="formBasicEmail">
                <Form.Label>Note Tag</Form.Label>
                <Form.Control
                  type="text"
                  id="etag"
                  name="etag"
                  className="form-control"
                  value={modalTag}
                  onChange={(e) => {
                    setModalTag(e.target.value);
                  }}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleModalClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                handleUpdatefunc(modalTitle, modalDescription, modalTag);
              }}
            >
              Update Note
            </Button>
          </Modal.Footer>
        </Modal>

        <div className="notesSection">
          {!notes.length ? (
            <h2 className="text-center mt-4">No-Notes in Database</h2>
          ) : (
            <h2 className="text-center mt-4">your Notes</h2>
          )}

          <div className="card-Div">
            {!notes.length
              ? ""
              : notes.map((note, k) => {
                  k++;
                  return (
                    <div className="card" id="card" key={k}>
                      <span
                        id="badge"
                        className="translate-middle badge rounded-pill bg-success"
                      >
                        {note.tag}
                      </span>
                      <div className="card-body">
                        <span
                          className="card-title"
                          style={{ fontWeight: "600" }}
                        >
                          {note.title}
                        </span>
                        <p
                          className="card-text mt-1 pt-1"
                          style={{ borderTop: "2px solid grey" }}
                        >
                          {note.description.length < 160
                            ? note.description
                            : note.description.slice(0, 160) + `...`}
                          ...
                        </p>
                      </div>
                      <div id="iDiv">
                        <span
                          onClick={() => {
                            handleDeleteFunc(note.id);
                          }}
                        >
                          <i
                            className="fas fa-trash-alt mx-2"
                            style={{ cursor: "pointer" }}
                          ></i>
                        </span>
                        <span
                          onClick={() => {
                            modalTriggerFunc(
                              note.id,
                              note.title,
                              note.description,
                              note.tag
                            );
                          }}
                        >
                          <i
                            className="fas fa-edit mx-2"
                            style={{ cursor: "pointer" }}
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                          ></i>
                        </span>
                      </div>
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
