import React, {Component} from 'react';
import posed from 'react-pose';
import UserConsumer from "../context";
import axios from "axios";

const Animation = posed.div({
    visible: {
        opacity: 1,
        applyAtStart: {
            display: "block"
        }
    },
    hidden: {
        opacity: 0,
        applyAtEnd: {
            display: "none"
        }
    }
})

class AddUser extends Component {
    state = {
        visible: false,
        name: "",
        surname: "",
        salary: "",
        department: "",
        error: false
    }

    validateForm = () => {
        const {name, surname, salary, department} = this.state
        if (name === "" || surname === "" || salary === "" || department === ""){
            return false
        }
        return true
    }

    changeVisibility = (e) => {
        this.setState({
            visible: !this.state.visible
        })
    }

    changeInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    addUser = async (dispatch, e) => {
        e.preventDefault();
        const {name, surname, salary, department} = this.state
        const newUser = {
            name,
            surname,
            salary,
            department,
        }
        if (!this.validateForm()){
            this.setState({
                error: true
            })
            return;
        }

        const responce = await axios.post("http://localhost:3004/users", newUser)
        dispatch({type: "ADD_USER", payload: responce.data});



        //Redirect
        this.props.history.push("/");
    }


    render() {
        const {visible, name, surname, salary, department, error} = this.state
        return <UserConsumer>
            {
                value => {
                    const {dispatch} = value
                    return (
                        <div className={"col-md-12 mb-4"}>
                            <button onClick={this.changeVisibility}
                                    className={"btn btn-info btn-block mb-2"}>{visible ? "Form'u Kapat" : "Form'u Goster"}</button>
                            <Animation pose={visible ? "visible" : "hidden"}>
                                <div className={"card"}>
                                    <div className={"card-header"}>
                                        <h4>Kullanici Ekleme Formu</h4>
                                    </div>

                                    <div className="card-body">
                                        {
                                            error ?
                                                <div className="alert alert-danger">
                                                    Lutfen bilgilerinizi Kontrol ediniz.
                                                </div>
                                                :null
                                        }
                                        <form action="" onSubmit={this.addUser.bind(this, dispatch)}>

                                            <div className="form-group">
                                                <input type="text" name={"name"} id={"id"} placeholder={"Enter Name"}
                                                       className={"form-control"} value={name}
                                                       onChange={this.changeInput}/>
                                            </div>

                                            <div className="form-group">
                                                <input type="text" name={"surname"} id={"surname"}
                                                       placeholder={"Enter Surname"}
                                                       className={"form-control"} value={surname}
                                                       onChange={this.changeInput}/>
                                            </div>

                                            <div className="form-group">
                                                <input type="text" name={"salary"} id={"salary"}
                                                       placeholder={"Enter Salary"}
                                                       className={"form-control"} value={salary}
                                                       onChange={this.changeInput}/>
                                            </div>

                                            <div className="form-group">
                                                <input type="text" name={"department"} id={"department"}
                                                       placeholder={"Enter Department"} className={"form-control"}
                                                       value={department} onChange={this.changeInput}/>
                                            </div>

                                            <button className={"btn btn-success btn-block"}>Kullanici Ekle</button>

                                        </form>
                                    </div>
                                </div>
                            </Animation>
                        </div>
                    );
                }
            }
        </UserConsumer>
    }
}
export default AddUser;