import React,{ Component } from 'react';
import TaskAdd from '../TaskAdd/TaskAdd';
import TaskItem from '../TaskItem/TaskItem';
import axios from 'axios';
import { connect } from 'react-redux';
import { initTasks } from '../../store/actions/tasks';

import './TaskList.scss';

class TaskList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			 setNotFound: false
		}
	}

	getTaskList() {

		const url = '/api/list';
		let self = this;
		axios.get(url)
		.then(response => {
			 self.props.onInitTasks(response.data);
			 self.setState({
					setNotFound: true
			 });
		});
	}

	componentDidMount() {
	    this.getTaskList();
	}

	eachTask(item, i) {
		return (
			<TaskItem
				key={i}
				id={item.id}
				title={item.title}
			/>
		)
	}

	renderTaskList() {
		return (
			this.props.tasks.map(this.eachTask)
		)
	}

	render() {
		return (
			<div className="TaskList">
				<div className="TaskList__caption">
					<div>
						<h1 className="TaskList__title">Список задач</h1>
					</div>
					<div>
						<TaskAdd />
					</div>
				</div>
				<div className="TaskList__list">
				   {
				   	  (this.props.tasks.length > 0)
				   	  ? this.renderTaskList()
				   	  : (this.state.setNotFound)
								? <h3 className="TaskList__align-center">Нет задач</h3>
								: ''
				   }
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		tasks: state.tasks.tasks
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onInitTasks: (tasks) => dispatch(initTasks(tasks))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
