import React, { Component } from 'react'

class AddSquare extends Component {
	constructor (props) {
	    super(props)
	}

	componentDidMount() {
		const { grid } = this.props
        this.setState({
            grid: grid
        })
    }

	clickButton = (event) => {
		event.preventDefault()
		const { update_grid } = this.props
		let el_id = event.target.id
		event.target.style.backgroundColor = 'red'
		event.target.disabled = true
		let new_grid = this.state.grid
		new_grid[el_id] = 11
		let neighbours = this.get_neighbours(el_id)
		//console.log(neighbours)
		let max_threat=0
		let threat_score = 0
		let threat_el = null
		for(let i=0; i<neighbours.length; i++){
			threat_score = this.get_threat_score(neighbours[i], new_grid)
			//console.log(neighbours[i], threat_score, max_threat)
			if (threat_score > max_threat) {
				max_threat = threat_score
				threat_el = neighbours[i]
			}
		}
		console.log('before ', threat_el)
		threat_el = this.counter_attack(new_grid, threat_el)
		console.log('threat at ', threat_el)
		new_grid[threat_el] = 0
		let target_el_id = document.getElementById(threat_el)
		target_el_id.style.backgroundColor = 'blue'
		update_grid(new_grid)
	}

	counter_attack(new_grid, threat_el){
		if(new_grid[threat_el] > 0 && new_grid[threat_el] < 11){
			return threat_el
		}
		else{
			let max_threat=0
			let threat_score = null
			for(var i=0; i<new_grid.length; i++) {
				if(new_grid[i] > 0 && new_grid[i] < 11){
					threat_score = this.get_threat_score(i, new_grid)
					if (threat_score > max_threat) {
						max_threat = threat_score
						threat_el = i
					}
				}
			}
			return threat_el
		}
	}

	get_threat_score(el, new_grid){
		let max = 0
		let threat_score = 0
		if (new_grid[el] === 0 || new_grid[el] === 11){
			return 0
		}
		if (this.checkEl(el-10) && this.checkEl(el-1) && this.checkEl(el-11)) {
			threat_score = new_grid[el-10] + new_grid[el-1] + new_grid[el-11]
			if (threat_score > max) {
				max = threat_score
			} 
		}
		if (this.checkEl(el-10) && this.checkEl(el-9) && this.checkEl(el+1)) {
			threat_score = new_grid[el-10] + new_grid[el-9] + new_grid[el+1]
			if (threat_score > max) {
				max = threat_score
			} 
		}
		if (this.checkEl(el-1) && this.checkEl(el+9) && this.checkEl(el+10)) {
			threat_score = new_grid[el-1] + new_grid[el+9] + new_grid[el+10]
			if (threat_score > max) {
				max = threat_score
			} 
		}
		if (this.checkEl(el+10) && this.checkEl(el+1) && this.checkEl(el+11)) {
			threat_score = new_grid[el+10] + new_grid[el+1] + new_grid[el+11]
			if (threat_score > max) {
				max = threat_score
			} 
		}
		return max
	}


	checkEl(el) {
		if (el < 1 || el > 100) {
			return null	
		}
		return el
	}

	get_neighbours(el_id) {
		let el = parseInt(el_id)
		let neigbours = []
		let new_el = null
		new_el = this.checkEl(el+10)
		new_el !== null ?  neigbours.push(new_el) : console.log()
		new_el = this.checkEl(el-10)
		new_el !== null ?  neigbours.push(new_el) : console.log()
		if (el %10 !== 9) {
			new_el = this.checkEl(el+1)
			new_el !== null ?  neigbours.push(new_el) : console.log()
		}
		if (el %10 !== 0) {
			new_el = this.checkEl(el-1)
			new_el !== null ?  neigbours.push(new_el) : console.log()
		}
		if (el %10 !== 9) {
			new_el = this.checkEl(el+11)
			new_el !== null ?  neigbours.push(new_el) : console.log()
		}
		if (el %10 !== 0) {
			new_el = this.checkEl(el-11)
			new_el !== null ?  neigbours.push(new_el) : console.log()
		}
		if (el %10 !== 0) {
			new_el = this.checkEl(el+9)
			new_el !== null ?  neigbours.push(new_el) : console.log()
		}
		if (el %10 !== 9) {
			new_el = this.checkEl(el-9)
			new_el !== null ?  neigbours.push(new_el) : console.log()
		}
		return neigbours
	}

	add_td(col) {
		let td_el = []
		for (let i=0; i<col.length; i++){
			td_el.push(	<td onClick = { this.clickButton }>
							<button id={col[i]} name={col[i]}>{col[i]}</button>
						</td>)
		}
		return td_el
	}

	render() {
		const { row } = this.props
		let column = []
		for (let i=0 ; i<10; i++){
			column.push(row*10 + i)
		}
		return (<tr>
            		{this.add_td(column)}
            	</tr>
			)
	}
}

export default AddSquare