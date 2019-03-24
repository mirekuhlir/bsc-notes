import React, { Component } from 'react';
import Note from './Note';
import ErrorMessage from './ErrorMessage';
import Loading from './Loading';
import Translate from '../localization/Translate';
import axios from 'axios';
import { API } from '../misc/config';
export default class NotesList extends Component {
  state = {
    notes: [],
    newNote: '',
    isLoading: false,
    error: null
  };
  async componentDidMount() {
    this.setState({ isLoading: true });

    try {
      const result = await axios.get(`${API}/notes`);
      this.setState({
        notes: result.data,
        isLoading: false
      });
    } catch (error) {
      this.setState({
        error,
        isLoading: false
      });
    }
  }

  handleChange = event => {
    this.setState({ newNote: event.target.value });
  };

  addNote = async event => {
    event.preventDefault();

    try {
      const result = await axios.post(`${API}/notes`, {
        title: this.state.newNote
      });
      const currentState = this.state.notes;
      this.setState({
        notes: [result.data, ...currentState],
        newNote: ''
      });
    } catch (error) {
      this.setState({
        error
      });
    }
  };

  deleteNote = async id => {
    try {
      await axios.delete(`${API}/notes/${id}`);
      const notesMinusNote = this.state.notes.filter(note => note.id !== id);
      this.setState({
        notes: notesMinusNote
      });
    } catch (error) {
      this.setState({
        error
      });
    }
  };

  saveEditedNote = async editedNote => {
    try {
      await axios.put(`${API}/notes/${editedNote.id}`, {
        title: editedNote.title
      });
      const editedState = this.state.notes.map(note => {
        if (note.id !== editedNote.id) {
          return note;
        }

        return {
          ...note,
          ...editedNote
        };
      });
      this.setState({
        notes: editedState
      });
    } catch (error) {
      this.setState({
        error
      });
    }
  };

  render() {
    const isEnabledButton = /\S/.test(this.state.newNote);
    const { isLoading, error } = this.state;

    let contentToDisplay = null;

    if (error) {
      contentToDisplay = <ErrorMessage error={error} />;
    } else if (isLoading) {
      contentToDisplay = <Loading />;
    } else {
      contentToDisplay = (
        <div className="d-flex flex-column pt-4 mb-4">
          <h2 className="text-center">
            <Translate string={'write-note'} />
          </h2>

          <form onSubmit={this.addNote}>
            <div className="form-group">
              <textarea
                id="note_input"
                className="form-control mb-3"
                rows="3"
                value={this.state.newNote}
                onChange={this.handleChange}
              />
              <div className="text-right">
                <button
                  className="btn btn-primary btn-lg btn-lg-min-width"
                  type="submit"
                  value="Submit"
                  disabled={!isEnabledButton}
                >
                  <Translate string={'add'} />
                </button>
              </div>
            </div>
          </form>
          {this.state.notes.map(note => (
            <Note
              key={note.id}
              note={note}
              deleteNote={this.deleteNote}
              saveEditedNote={this.saveEditedNote}
            />
          ))}
        </div>
      );
    }
    return <div className="container">{contentToDisplay}</div>;
  }
}
