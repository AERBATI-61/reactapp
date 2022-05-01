import React, {Component} from 'react';
import PropTypes from 'prop-types';
class User extends Component {
    render() {
        const {name, surname, salary} = this.props
        return (
            <div>
                <form action="">
                    <input type="text" name="" id=""/>
                    <button>Gonder</button>
                </form>

                <ul>
                    <li>name: Arafat</li>
                    <li>surname: Emin</li>
                    <li>salary: 5000</li>
                </ul>
                <hr/>
                <ul>
                    <li>name: {this.props.name}</li>
                    <li>surname: {this.props.surname} </li>
                    <li>salary: {this.props.salary} </li>
                </ul>
                <ul>
                    {/*Destructing*/}
                    {/*const {name, surname, salary} = this.props*/}
                    <li>name: {name}</li>
                    <li>surname: {surname} </li>
                    <li>salary: {salary} </li>
                </ul>
            </div>
        );
    }
}
User.propTypes = {
    name : PropTypes.string.isRequired,
    surname : PropTypes.string.isRequired,
    salary : PropTypes.string.isRequired,
}
User.defaultProps = {
    name : "Bilgi Yok",
    surname : "Bilgi Yok",
    salary : "Bilgi Yok",
}
export default User;