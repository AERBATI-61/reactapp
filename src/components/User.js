import React, {Component} from 'react';
import PropTypes from 'prop-types';
// import {isVisible} from "@testing-library/user-event/dist/utils";
// import {type} from "@testing-library/user-event/dist/type";
import UserConsumer from "../context";
import axios from "axios";
import {Link} from "react-router-dom";

class User extends Component {
    state = {isVisible: false}

    onClickEvent = (e) => {
        this.setState({
            isVisible: !this.state.isVisible
        })
    }

    onDeleteUser = async (dispatch, e) => {
        const {id} = this.props
        await axios.delete(`http://localhost:3004/users/${id}`)
        dispatch({type: "DELETE_USER", payload: id});
    }

    // componentWillUnmount() {
    //     console.log("componentWillUnmount");
    // }

    render() {
        const {id, name, surname, salary, department} = this.props
        const {isVisible} = this.state
        return (
            <UserConsumer>
                {
                    value => {
                        const {dispatch} = value;
                        return (
                            <div className={"col-md-12 mb-4"}>
                                <div className={"card"}
                                     style={isVisible ? {backgroundColor: "#B2BABB ", color: "white"} : null}>
                                    <div className="card-header d-flex justify-content-between">
                                        <h4 className={"d-inline"} onClick={this.onClickEvent}>
                                            {name} {surname}
                                        </h4>
                                        <i onClick={this.onDeleteUser.bind(this, dispatch)}
                                           className={"btn btn-danger"}>sil</i>
                                    </div>
                                </div>
                                {
                                    isVisible ? <div className={"card-body"}>
                                            <p className={"card-text"}>Salary: {salary}</p>
                                            <p className={"card-text"}>Department: {department}</p>
                                        <Link to={`update/${id}`} className={"btn btn-dark btn-block"}>Update User</Link>

                                        </div>
                                        : null
                                }
                            </div>
                        );
                    }
                }
            </UserConsumer>
        )
    }
}

User.propTypes = {
    name: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
    salary: PropTypes.string.isRequired,
    department: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,

}

User.defaultProps = {
    name: "Bilgi Yok",
    surname: "Bilgi Yok",
    salary: "Bilgi Yok",
    department: "Bilgi Yok",
    id: "Bilgi Yok",
}

export default User;