
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// class Square extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       value: null,
//     };
//   }


//   render() {
//     return (
//       <div>
//         <button className="square" onClick={() => this.setState({ value: 'x' })}>{this.state.value} </button>
//       </div>
//     );
//   }

// }


// ReactDOM.render(<Square />, document.getElementById("root"));https://jsfiddle.net/69z2wepo/130095/



class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    alert('Thanksnfor submitting,A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
 
      <form value={this.state}
        onSubmit={this.onSubmit}>

        React form:<br />
        <label>
          Firstname:
    <input type="text" name="firstname" placeholder="firstname" />
        </label><br />
        <label>
          Lastname:
    <input type="text" name="lastname" placeholder="lastname" />
        </label><br />
        Gender:
        <select name='Gender' value='' validations>
          <option value=''>select</option>
          <option value='female'>Female</option>
          <option value='male'>Male</option>
        </select><br />
        <label>
          ContactNo:
    <input type="text" name="contactno" placeholder="contactno" />
        </label><br />
        <label>
          EmailAddress:
    <input type="text" name="emailaddress" placeholder="emailaddress" />
        </label>
        <input type="submit" value="Submit" />

      </form>

    );
  }
}
ReactDOM.render(<Form />, document.getElementById("root"))

