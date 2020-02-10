import React,{ Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { addTask } from '../../store/actions/tasks';

import './TaskAdd.scss';

class TaskAdd extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			errorInput: false,
			showModal: false
		}
		this.openTaskAddModal = this.openTaskAddModal.bind(this);
		this.closeTaskAddModal = this.closeTaskAddModal.bind(this);
		this.handleTitleInput = this.handleTitleInput.bind(this);
		this.createTask = this.createTask.bind(this);
	}

	openTaskAddModal(e) {
		e.preventDefault();

		this.setState({
			showModal: true
		});
	}

	resetLocalState() {
		this.setState({
			title: '',
			errorInput: false,
			showModal: false
		});
	}

	closeTaskAddModal(e) {
		e.preventDefault();
		this.resetLocalState();
	}

	handleTitleInput(e) {
		this.setState({
			title: e.target.value
		});
		(e.target.value.split('').length > 0)
		? this.setState({ errorInput: false })
		: this.setState({ errorInput: true })
	}

	createTask(e) {
		e.preventDefault();

		let self = this;

		if(this.state.title.split('').length > 0) {
			this.setState({ errorInput: false });
			
			const url = '/api/list';
			axios.post(url,{
				title: this.state.title
			})
			.then(response => {

				 this.props.onAddTask({
				 	id: response.data.id,
				 	title: this.state.title
				 });


				 this.resetLocalState();
			});

		} else {
			this.setState({ errorInput: true });
		}


	}

	render() {
		return (
			<div className="TaskAdd">
				<button className="TaskAdd__btn" onClick={this.openTaskAddModal}>Добавить</button>

				<div className={"TaskAdd__modal "+ (this.state.showModal ? 'TaskAdd__d-block':'TaskAdd__d-none')}>

					<div className="TaskAdd__modal-content">
					  <form onSubmit={this.createTask}>
						<div className="TaskAdd__modal-header">
							<div><a href="#" className="TaskAdd__modal-close" onClick={this.closeTaskAddModal}></a></div>
						</div>
						<div className="TaskAdd__modal-body">
							<p className="TaskAdd__modal-title">Краткое описание</p>
							<div className="TaskAdd__modal-formgroup">
								<input type="text" value={this.state.title} onChange={this.handleTitleInput} className="TaskAdd__modal-input"/>

								 <span className={"TaskAdd__modal__error-msg " + (this.state.errorInput ? 'TaskAdd__show' : 'TaskAdd__hide')}>Заголовок не может быть пустым</span>

							</div>
							<div className="TaskAdd__align-right">
								<button type="submit" className="TaskAdd__btn">Создать</button>
							</div>
						</div>
						</form>
					</div>
				</div>

			</div>
		)
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onAddTask: (task) => dispatch(addTask(task))
	}
}

export default connect(null, mapDispatchToProps)(TaskAdd);
