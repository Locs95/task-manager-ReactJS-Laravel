const initialState = {
	tasks: [],
	title: '',
	btnBack: true
}

const tasks = (state = initialState, action) => {
	switch(action.type) {
		case 'INIT_TASKS':
			return {
				tasks: action.payload
			}
		case 'ADD_TASK':
			return {
				...state,
				tasks: [...state.tasks, action.payload]
			}
		case 'DEL_TASK':
			return {
				...state,
				tasks: state.tasks.filter((item) => item.id !== action.payload)
			}
		case 'GET_TASK_BY_ID':
			return {
				...state,
				tasks: state.tasks.filter((item) => item.id == action.payload)
			}
		case 'SET_TITLE':
			return {
				...state,
				title: action.payload
			}
		case 'SET_BTN_BACK':
			return {
				...state,
				btnBack: action.payload
			}
		default:
			return state
	}
} 

export default tasks;