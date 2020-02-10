
export const initTasks = (data) => {
	return {
		type: 'INIT_TASKS',
		payload: data
	}
}

export const addTask = (data) => {
	return {
		type: 'ADD_TASK',
		payload: data
	}
}

export const delTask = (data) => {
	return {
		type: 'DEL_TASK',
		payload: data
	}
}

export const getTaskById = (data) => {
	return {
		type: 'GET_TASK_BY_ID',
		payload: data
	}
}

export const setTitle = (data) => {
	return {
		type: 'SET_TITLE',
		payload: data
	}
}

export const setBtnBack = (data) => {
	return {
		type: 'SET_BTN_BACK',
		payload: data
	}
}