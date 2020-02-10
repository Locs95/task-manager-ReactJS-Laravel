import React,{ Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setTitle, setBtnBack } from '../../store/actions/tasks';
import { Link } from 'react-router-dom';

import './TaskEdit.scss';

class TaskEdit extends Component {

	constructor(props) {
		super(props);
		this.state = {
			id: null,
			title: ''
		}
		this.changeTaskTitle = this.changeTaskTitle.bind(this);
		this.saveTask = this.saveTask.bind(this);
		this.removeTask = this.removeTask.bind(this);
	}

    componentDidMount() {
        this.setState({
			id: this.props.match.params.id,
			title: this.props.location.state.title
		});
		this.props.onSetTitle(this.props.location.state.title);
		this.props.onSetBtnBack(false);

    }

    saveTask(e) {
    	e.preventDefault();

			const url = `/api/list/${this.state.id}`;
    	axios.post(url, {
    		title: this.props.title
    	}).then(response => {
    		this.props.history.push('/');
    	});
    }

    removeTask() {

			const url = `/api/list/${this.state.id}`;
    	axios.delete(url)
    	.then(response => {
    		this.props.history.push('/');
    	});
    }

    changeTaskTitle(e) {
    	this.props.onSetTitle(e.target.value);
    }

    componentDidUpdate() {

    	if(this.props.title !== this.state.title) {
    		 this.props.onSetBtnBack(false);
    	} else {
    		 this.props.onSetBtnBack(true);
    	}

    }

	render() {

		return (
			<div className="TaskEdit">
				<div className="TaskEdit__caption">
					<div>
						<h1 className="TaskList__title">Задача № {this.state.id}</h1>
					</div>
					<div>
						<button className="TaskEdit__btn TaskEdit__btn_del" onClick={this.removeTask}>Удалить</button>
					</div>
				</div>
				<div className="TaskEdit__form">
				   <form onSubmit={(event) => this.saveTask(event)}>
				   	  <div className="TaskEdit__formgroup">
				   	  	<label htmlFor="">Краткое пописание</label>
				   	  	<input
				   	  		type="text"
				   	  		defaultValue={this.state.title}
				   	  		onChange={this.changeTaskTitle}
				   	  		className="TaskEdit__input"/>
				   	  </div>
				   	  <div>
				   	  	{
				   	  		(this.props.btnBack)
				   	  		? <Link to="/" className="TaskEdit__btn TaskEdit__btn_back">Вернуться в список</Link>
				   	  		: <button type="submit" className="TaskEdit__btn TaskEdit__btn_save">Сохранить</button>
				   	  	}
				   	  </div>
				   </form>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		title: state.tasks.title,
		btnBack: state.tasks.btnBack
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onSetTitle: (title) => dispatch(setTitle(title)),
		onSetBtnBack: (bool) => dispatch(setBtnBack(bool))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskEdit);
