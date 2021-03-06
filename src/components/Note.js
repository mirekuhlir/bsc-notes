import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Translate from '../localization/Translate';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root');

export default class Note extends Component {
  state = {
    isEditing: false,
    note: this.props.note,
    noteBeforeCancel: this.props.note,
    modalIsOpen: false
  };

  handleChange = event => {
    this.setState({ note: { title: event.target.value } });
  };

  handleButton = (stateName, value) => {
    this.setState({ [stateName]: value });
  };

  render() {
    const isEnabledButton = /\S/.test(this.state.note.title);
    return (
      <div className="card mb-3">
        <div className="card-body">
          {this.state.isEditing ? (
            <form
              onSubmit={event => {
                event.preventDefault();
                const editedNote = {
                  id: this.props.note.id,
                  title: this.state.note.title
                };
                this.props.saveEditedNote(editedNote);
                this.setState({
                  isEditing: false,
                  noteBeforeCancel: this.state.note
                });
              }}
            >
              <div className="form-group mb-0">
                <textarea
                  className="form-control"
                  value={this.state.note.title}
                  onChange={this.handleChange}
                />
                <div className="text-right mt-3">
                  <button
                    className="btn btn-primary btn-min-width"
                    type="submit"
                    value="Submit"
                    disabled={!isEnabledButton}
                  >
                    <Translate string={'save'} />
                  </button>
                  <button
                    className="btn btn-danger ml-3 btn-min-width"
                    type="button"
                    onClick={() => {
                      this.setState({
                        isEditing: false,
                        note: this.state.noteBeforeCancel
                      });
                    }}
                  >
                    <Translate string={'cancel'} />
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <div className="note-text">
              <Link to={`/${this.props.note.id}`}>
                <div>{this.props.note.title}</div>
              </Link>
              <hr />
              <div className="text-right">
                <button
                  className="btn btn-primary btn-min-width"
                  type="button"
                  name="edit"
                  onClick={() => {
                    this.handleButton('isEditing', true);
                  }}
                >
                  <Translate string={'edit'} />
                </button>

                <button
                  className="btn btn-danger ml-3 btn-min-width"
                  type="button"
                  name="delete"
                  onClick={() => {
                    this.handleButton('modalIsOpen', true);
                  }}
                >
                  <Translate string={'delete'} />
                </button>
                <Modal
                  isOpen={this.state.modalIsOpen}
                  onAfterOpen={this.afterOpenModal}
                  onRequestClose={() => {
                    this.handleButton('modalIsOpen', false);
                  }}
                  style={customStyles}
                  contentLabel="Modal"
                  shouldReturnFocusAfterClose={false}
                >
                  <div className="text-center align-self-center">
                    <h4>
                      <Translate string={'delete-note'} />
                    </h4>
                    <hr />
                    <div className="d-flex justify-content-between">
                      <div className="col">
                        <button
                          className="btn btn-danger btn-min-width"
                          onClick={() =>
                            this.props.deleteNote(this.props.note.id)
                          }
                        >
                          <Translate string={'yes'} />
                        </button>
                      </div>
                      <div className="col">
                        <button
                          className="btn btn-primary btn-min-width"
                          onClick={() => {
                            this.handleButton('modalIsOpen', false);
                          }}
                          type="button"
                        >
                          <Translate string={'no'} />
                        </button>
                      </div>
                    </div>
                  </div>
                </Modal>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

Note.propTypes = {
  saveEditedNote: PropTypes.func.isRequired,
  deleteNote: PropTypes.func.isRequired,
  note: PropTypes.object.isRequired
};
