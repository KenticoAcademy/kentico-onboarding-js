import React, { PureComponent } from 'react';
import { AddLine } from '../components/AddLine';
import { ListMember } from '../components/ListMember';
import { generateUid } from '../UidGenerator';

export class List extends PureComponent {

  constructor() {
    super();
    this.state = {
      notes: [],
    };

    this.handleAddNewNote = this.handleAddNewNote.bind(this);
    this.handleDeleteNotes = this.handleDeleteNotes.bind(this);
    this.handleNoteUpdate = this.handleNoteUpdate.bind(this);
    this.handleEditModeChanges = this.handleEditModeChanges.bind(this);
  }

  handleAddNewNote(noteToBeAdded) {
    const addNote = {
      text: noteToBeAdded.text,
      edit: noteToBeAdded.edit,
      changes: noteToBeAdded.changes,
      uid: generateUid(),
    };
    this.setState({
      notes: [...this.state.notes, addNote],
    });
  }

  handleDeleteNotes(note) {
    this.setState({
      notes: this.state.notes.filter(arrayNote => arrayNote !== note),
    });
  }

  handleNoteUpdate(prevNote, newNote) {
    const prevNoteIndex = this.state.notes.indexOf(prevNote);
    const copy = JSON.parse(JSON.stringify(this.state.notes));
    copy[prevNoteIndex] = {
      text: newNote.changes ? newNote.changes : prevNote.text,
      edit: newNote.edit,
      changes: '',
      uid: prevNote.uid,
    };
    this.setState({
      notes: copy,
    });
  }

  handleEditModeChanges(newEditMode, note) {
    const index = this.state.notes.indexOf(note);
    const copy = JSON.parse(JSON.stringify(this.state.notes));
    copy[index].edit = newEditMode;
    this.setState({
      notes: copy,
    });
  }

  render() {
    return (
      <div className="row">
        <ul className="list-group">
          {this.state.notes.map((note, i) =>
            <ListMember
              note={note}
              number={i + 1}
              key={note.uid}
              handleDeleteNotes={this.handleDeleteNotes}
              handleSaveEdit={this.handleNoteUpdate}
              handleEditModeChanges={this.handleEditModeChanges}
              handleChanges={this.handleChanges}
            />
          )
          }
          <AddLine
            addNewNote={this.handleAddNewNote}
          />
        </ul>
      </div>
    );
  }
}
