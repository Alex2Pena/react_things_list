// Import just the "Component" part of the React library
import React, { Component } from 'react';
// Create a web app with a top level App component
import './App.css';

// App component should…
// have thingList data stored in its state.
// render 3 nested components
// Header
// ThingList
// Footer
class App extends Component {
  // Create a constructor to create initial state and add it to props
  constructor(props) {
    super(props);
    this.state = {
      // thingList should be an array of plain old JavaScript objects (aka POJO) that represent a thing that has a name.
      // E.g. {name:’rake’}
      things: [
        { id: 1, title: "Thing 1", description: "Was named first" },
        { id: 2, title: "Thing 2", description: "Was named second" },
      ]
    }
    this.thingMaker = this.thingMaker.bind(this);
  };

  thingMaker(thing) {
    const things = [...this.state.things, thing];
    this.setState({things});
  }

  render() {
    return (
      <div className="App">
        {/* Give Components the access the whatever state is needed */}
        <Header thingCount = {this.state.things.length} />
        <ThingList things = {this.state.things} thingMaker = {this.thingMaker} />
        <Footer />
      </div>
    );
  }
}


// Header component should…
// receive a things count as a prop
// display a heading
// display the current count of things
function Header(props) {
  // Display the number of things by accessing the props
  return <h1>Things Total: {props.thingCount}</h1>
}


// ThingList component should…
// receive a list of things as a prop
// receive a function to call when a new thing is created.
// Display an unordered list composed of ThingItem components
// Display a form that allows creation of a thing
// When user creates new thing the rest of application should update appropriately.
// Header thing count should update
// ThingList should add a new ThingItem to end of list
// ThingItem component should…
// receive a name as a prop

// ThingsList needs to be a class that extends Component to use state without hooks
class ThingList extends Component {
  render() {
    // console.log(this.props)
    return (
      <div>
        <ThingForm thingMaker={this.props.thingMaker} />
        <ul>
          {this.props.things.map(thing => (
            <ThingItem key={thing.id} title={thing.title} description={thing.description} />
          ))}
        </ul>
      </div>
    )
  }
}

class ThingForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title:'', description:'' };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    console.log(props)
  }

  handleTitleChange(event) {
    this.setState({ title: event.target.value });
  }
  handleDescriptionChange(event) {
    this.setState({ description: event.target.value });
  }

  handleSubmit(event) {
    // alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
    this.props.thingMaker(this.state)
  }

  componentDidUpdate(){
    console.log("Current State:", this.state)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Title:
          <input type="text" value={this.state.title} onChange={this.handleTitleChange} />
          <br></br>
          Description:
          <input type="text" value={this.state.description} onChange={this.handleDescriptionChange} />
        </label>
        <br></br>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

function ThingItem(props) {
  return (
    <div>
      <li> {props.title} - {props.description} </li>
    </div>
  )
}


// Footer component should…
// Display some placeholder text (e.g. lorem ipsum)
function Footer(props) {
  return <h3>Footer Comming Soon </h3>
}
export default App;
