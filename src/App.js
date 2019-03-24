import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { LocalizationContext } from './localization/LocalizationContext';
import Header from './components/Header';
import NotesList from './components/NotesList';
import NoteDetail from './components/NoteDetail';

class App extends Component {
  state = {
    preferedLanguage: 'en'
  };

  changeLanguage = ({ currentTarget: { id } }) => {
    this.setState({
      preferedLanguage: id
    });
  };

  render() {
    return (
      <LocalizationContext.Provider value={this.state.preferedLanguage}>
        <BrowserRouter>
          <Header changeLanguage={this.changeLanguage} />
          <Switch>
            <Route exact path="/" component={NotesList} />
            <Route path="/:id" component={NoteDetail} />
          </Switch>
        </BrowserRouter>
      </LocalizationContext.Provider>
    );
  }
}

export default App;
