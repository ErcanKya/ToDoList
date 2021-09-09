import React, { Component } from 'react';

class CatchError extends Component {

    componentDidMount() {
        this.reroute();
    }

    reroute = async () => {
        this.props.history.push('/login');
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