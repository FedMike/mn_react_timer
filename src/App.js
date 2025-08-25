import React from 'react';

export default class App extends React.Component {
    state = {
        count: 0,
        isCounting: false,
    };

    componentDidMount() {
        if (localStorage.getItem('count')) {
            this.setState({count: parseInt(localStorage.getItem('count'))})
        } else {
            localStorage.setItem('count', 0);
        }
    }

    componentDidUpdate() {
        localStorage.setItem('count', this.state.count);
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    handleStart = () => {
        this.setState({isCounting: true});
        this.timerId = setInterval(() => {
            this.setState(prev => ({count: prev.count + 1}));
        }, 1000)
    }

    handleStop = () => {
        this.setState({isCounting: false});
        clearInterval(this.timerId);
    }

    handleReset = () => {
        this.setState({count: 0, isCounting: false});
        clearInterval(this.timerId);
        localStorage.setItem('count', 0);
    }

    render() {
        return (
            <div className="App">
                <h1>React Timer</h1>
                <h3>{this.state.count}</h3>
                {!this.state.isCounting ? (
                    <button onClick={this.handleStart}>Start</button>
                ) : (
                    <button onClick={this.handleStop}>Stop</button>
                )}
                <button onClick={this.handleReset}>Reset</button>
            </div>
        );
    }
}
