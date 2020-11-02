import React, { Component, useEffect, useState } from 'react';

class Test extends Component {
    timer = null
    state = {
        counter: 0
    }
    componentDidMount() {
        this.timer = setInterval(() => {
            this.setState({ counter: this.state.counter + 1 }, () => {
                if (this.props.onUpdate) {
                    this.props.onUpdate(this.state.counter)
                }
            })
        }, 5000)
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }


    render() {
        return (
            <div>
                <button data-testid="counter" onClick={() => {
                    this.setState({ counter: this.state.counter + 1 }, () => {
                        if (this.props.onUpdate) {
                            this.props.onUpdate(this.state.counter)
                        }
                    })
                }}>{this.state.counter}</button>
            </div>
        );
    }
}

export default Test;