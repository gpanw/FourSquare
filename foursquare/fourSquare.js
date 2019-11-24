import React, { Component } from 'react'
import AddSquare from './addSquare'

class FourSquare extends Component {
    constructor (props) {
        super(props)
        let grid =[]
        for(let i=0; i<100; i++){
            grid.push(8)
        }
        this.state = {
            rows: 10,
            grid: grid
        }
    }

    update_grid = (new_grid) => {
        const { grid } = this.state
        this.setState({
            grid: new_grid
        })
    }

	render(){
        const { rows } = this.state
        let array_rows = []
        const { grid } = this.state
        for (let i=0; i < rows; i++) {
            array_rows.push(i)
        }
		return (<div>
				<h2>
					Four Square
				</h2>
				<table className="table table-striped" id='task-table'>
                    <tbody>
                        {array_rows.map((item, index) => {
                            return <AddSquare
                            update_grid = { this.update_grid }
                            grid = { grid }
                            row = { item }
                            key = { index }
                            />
                        })}
                    </tbody>
                </table>
			</div>)
        }
	} 

export default FourSquare