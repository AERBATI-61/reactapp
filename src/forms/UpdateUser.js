import React, {Component} from 'react';
import UserConsumer from "../context";
import axios from "axios";


class UpdateUser extends Component {
    state = {
        name: "",
        surname: "",
        salary: "",
        department: "",
        error: false
    }



    changeInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    componentDidMount = async () => {
        const {id} = this.props.match.params;
        const responce = await axios.get(`http://localhost:3004/users/${id}`);
        const {name, surname, salary, department} = responce.data;
        this.setState({
            name,
            surname,
            salary,
            department
        });
    }


    validateForm = () => {
        const {name, surname, salary, department} = this.state
        if (name === "" || surname === "" || salary === "" || department === ""){
            return false
        }
        return true
    }

    updateUser = async (dispatch, e) => {
        e.preventDefault();
        const {id} = this.props.match.params;
        const {name, surname, salary, department} = this.state;
        const updatedUser = {
            name,
            surname,
            salary,
            department
        };

        if (!this.validateForm()){
            this.setState({
                error: true
            })
            return;
        }

        const responce = await axios.put(`http://localhost:3004/users/${id}`, updatedUser);
        dispatch({type: "UPDATE_USER", payload: responce.data});


        this.props.history.push("/");

    }


    render() {
        const {name, surname, salary, department, error} = this.state
        return <UserConsumer>
            {
                value => {
                    const {dispatch} = value
                    return (
                        <div className={"col-md-12 mb-4"}>


                                <div className={"card"}>
                                    <div className={"card-header"}>
                                        <h4>Kullanici Duzenleme Formu</h4>
                                    </div>
                                    <div className="card-body">

                                        {
                                            error ?
                                                <div className="alert alert-danger">
                                                    Lutfen bilgilerinizi Kontrol ediniz.
                                                </div>
                                                :null
                                        }
                                        <form action="" onSubmit={this.updateUser.bind(this, dispatch)}>

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

                        </div>
                    );
                }
            }
        </UserConsumer>
    }
}
export default UpdateUser;