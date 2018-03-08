
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


// ReactDOM.render(<Square />, document.getElementById("root"));



class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lastName: '',
      firstName: '',
    };
  }
  render() {
    return (


      <form>
        <label>
          Firstname:
    <input type="text" name="firstname" placeholder="firstname" />
        </label><br />
        <label>
          Lastname:
    <input type="text" name="lastname" placeholder="lastname" />
        </label><br />
        <label>
          ContactNo:
    <input type="text" name="contactno" placeholder="contactno" />
        </label>
        <input type="submit" value="Submit" />
      </form>


    );
  }
}
ReactDOM.render(<Form />, document.getElementById("root"))

