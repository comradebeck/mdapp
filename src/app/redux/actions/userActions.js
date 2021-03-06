import axios from '../../../helpers/request';
import localdb from '../../../helpers/localdb';
import * as types from './actionTypes';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';

export function getUserDetails(id) {
	return function (dispatch) {
		dispatch(beginAjaxCall());
		return axios.get(`/user/me/${id}`, {
				headers: {
					'Authorization': localdb.getItem('token')
				}
			})
			.then(userDetailsResponse => {
				dispatch({type: types.LOAD_USER_DETAILS_SUCCESS, payload: userDetailsResponse.data.data});
			})
			.catch(userDetailsError => {
				dispatch(ajaxCallError());
				throw(userDetailsError);
			});
	}
}
