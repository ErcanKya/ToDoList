import React, { Component } from 'react';

class CatchError extends Component {

    componentDidMount() {
        this.reroute();
    }

    reroute = async () => {
        this.props.history.push('/');
    }
    
    render() {
        return (
            <div>
                {/* errorScreen */}
            </div>
        );
    }
}

export default CatchError;