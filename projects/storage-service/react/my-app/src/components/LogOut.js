import React from "react";
export default class LogOut extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.logOut = this.logOut.bind(this);
    }
    logOut() {
        sessionStorage.removeItem('jwt-secret');
    }
    render() {
        return (
            <div>
                {this.logOut}
            </div>
        )
    }
}