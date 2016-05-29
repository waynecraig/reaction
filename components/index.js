import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import Button from './button'
import { pressButton, releaseButton, startRound, cancelRound, endRound } from '../actions/index'
import { isMid } from '../reducers/marks'
import { STATUS_ACTIVE } from '../actions/index'

const style = {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'gray'
}

const rowStyle = {
    display: 'flex',
    flexGrow: '1',
}

class App extends Component {

    render() {

        const { marks, result, dispatch } = this.props

        return (
            <div
                style={style}
            >
                { marks.map((row, i) => (
                    <div key={i} style={rowStyle}>
                        { row.map((col, j) => (
                            <Button 
                                key={j} 
                                status={col} 
                                onTouchStart={()=>{
                                    if (isMid(marks.length, row.length, i, j)) {
                                        dispatch(startRound())
                                    }
                                    dispatch(pressButton(i,j))
                                }}
                                onTouchEnd={()=>{
                                    if (isMid(marks.length, row.length, i, j)) {
                                        cancelRound()
                                    }
                                    dispatch(releaseButton(i,j))
                                }}
                                onStatusChange={status=>{
                                    if (!isMid(marks.length, row.length, i, j) && 
                                        status===STATUS_ACTIVE) {
                                        dispatch(endRound())
                                    }
                                }}
                                label={result}
                            />
                        ))}
                    </div>
                ))}
            </div>
        )
    }

}

export default connect(state=>state)(App)
