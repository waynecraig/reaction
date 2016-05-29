import React, { Component, PropTypes } from 'react';
import {
    STATUS_INIT,
    STATUS_READY,
    STATUS_ACTIVE
} from '../actions/index'

const initStyle = {
    flexGrow: '1',
    border: 'solid',
    borderWidth: '1px'
}

const getBackgroundColor = status => {
    switch (status) {
        case STATUS_INIT:
            return 'gray';
        case STATUS_READY:
            return 'blue';
        case STATUS_ACTIVE:
            return 'yellow';
    }
}

export default class extends Component {

    render() {

        const { status=STATUS_INIT, onTouchStart, onTouchEnd, label } = this.props

        const style = Object.assign({}, initStyle, {
            backgroundColor: getBackgroundColor(status)
        })

        return (
            <div
                style={style}
                onTouchStart={e=>{
                    e.preventDefault();
                    e.stopPropagation();
                    onTouchStart();
                }}
                onTouchEnd={e=>{
                    e.preventDefault();
                    e.stopPropagation();
                    onTouchEnd();
                }}
            >
                {label}
            </div>
        )
    }

    componentDidUpdate() {
        this.props.onStatusChange(this.props.status)
    }

}
