import React, { Component } from 'react';

class Phone extends Component {
    render() {
        return (
            <div>
                {this.props.number}
            </div>
        );
    }
}

export default Phone;