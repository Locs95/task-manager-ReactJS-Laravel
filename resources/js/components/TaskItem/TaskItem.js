import React,{ Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { delTask } from '../../store/actions/tasks';
import { Link } from 'react-router-dom';

import './TaskItem.scss';

class TaskItem extends Component {
	constructor(props) {
		super(props);
		this.removeTask = this.removeTask.bind(this);
	}

	removeTask(id) {
		const url = `/api/list/${id}`;
		axios.delete(url)
		.then(response => {
			this.props.onDelTask(id);
		});

	}

	render() {
		return (
			<div className="TaskItem">
				<div className="TaskItem__num"><span>Задача №{this.props.id}</span></div>
				<div className="TaskItem__desc"><span>{this.props.title}</span></div>
				<div className="TaskItem__btns">
					<div>
					  <Link
					  	to={{
					  		pathname: "/items/" + this.props.id,
					  		state: {
					  			title: this.props.title
					  		}
					  	}}
					  	className="TaskItem__btn TaskItem__btn_edit"></Link>
					</div>
					<div>
						<button className="TaskItem__btn TaskItem__btn_del" onClick={() => this.removeTask(this.props.id)}></button>
					</div>
				</div>
			</div>
		)
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onDelTask: (id) => dispatch(delTask(id))
	}
}

export default connect(null, mapDispatchToProps)(TaskItem);
