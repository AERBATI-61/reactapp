/*
    App.js icinde bunlar olmali
    import Mounting from "./LifeCycle/Mounting";
    <Mounting mount = "mount"/>
 */

import React, {Component} from 'react';

class Mounting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            a:20
        }
        console.log("constructor")
    }
    componentDidMount() {
        console.log("componentDidMount");
        this.setState({
            a:30
        })
    }

    componentDidUpdate = (prevProps, prevState) => {
        console.log("componentDidUpdate");
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log("shouldComponentUpdate");
        return false; // true oldugunda render islemi ile update isslemi gerceklesiyor aksi halde calismaz
    }



    render() {
        console.log("Render");
        //  this.setState({
        //     a:30
        // })
        return (
            <div>
                <h1>Mounting</h1>
            </div>
        );
    }
}

export default Mounting;