import React, { Component } from 'react'

class HeaderComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    render() {
        return (
            <div>
                <header>
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div><a href="https://github.com/n0tx" className="navbar-brand">Product Management</a></div>
                    </nav>
                </header>
                <br></br>
            </div>
        )
    }
}

export default HeaderComponent
