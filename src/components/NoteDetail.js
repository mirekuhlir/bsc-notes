import React, { Component } from 'react';
import axios from 'axios';
import { API } from '../misc/config';
import Translate from '../localization/Translate';
import { Link } from 'react-router-dom';
import Note from './Note';
import ErrorMessage from './ErrorMessage';
import Loading from './Loading';
export default class NoteDetail extends Component {
  state = {
    note: {},
    isLoading: false,
    error: null
  };

  async componentDidMount() {
    this.setState({ isLoading: true });

    try {
      const result = await axios.get(
        `${API}/notes/${this.props.match.params.id}`
      );

      this.setState({
        note: result.data,
        isLoading: false
      });
    } catch (error) {
      this.setState({
        error,
        isLoading: false
      });
    }
  }

  saveEditedNoteDetail = async editedNote => {
    try {
      await axios.put(`${API}/notes/${editedNote.id}`, {
        title: editedNote.title
      });
      this.setState({
        note: editedNote
      });
    } catch (error) {
      this.setState({
        error
      });
    }
  };

  deleteNoteDetail = async id => {
    try {
      await axios.delete(`${API}/notes/${id}`);
      this.setState({
        note: {}
      });
    } catch (error) {
      this.setState({
        error
      });
    }
    this.props.history.push('/');
  };

  render() {
    const { isLoading, error } = this.state;

    let contentToDisplay = null;

    if (error) {
      contentToDisplay = <ErrorMessage error={error} />;
    } else if (isLoading) {
      contentToDisplay = <Loading />;
    } else {
      contentToDisplay = (
        <div>
          <div className="row pt-2">
            <div className="col">
              <h3 className="text-center">
                <Translate string={'note-detail'} />
              </h3>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Note
                key={this.state.note.id}
                note={this.state.note}
                saveEditedNote={this.saveEditedNoteDetail}
                deleteNote={this.deleteNoteDetail}
              />
            </div>
          </div>
          <div className="row">
            <div className="col text-right pb-3">
              <Link to={'/'} className="btn btn-primary btn-min-width">
                <Translate string={'back'} />
              </Link>
            </div>
          </div>
        </div>
      );
    }
    return <div className="container">{contentToDisplay}</div>;
  }
}
