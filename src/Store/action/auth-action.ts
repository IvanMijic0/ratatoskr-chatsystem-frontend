import { ThunkDispatch } from 'redux-thunk';
import axiosInstance from '../../Configuration/axios-instance.ts';
import { RootState } from "../store.ts";
import { AnyAction } from "redux";
import { setIsAuthenticated, setTokens } from "../index.ts";
import axios from 'axios';
import { AppThunk } from "../../Types";

const validateTokenAsync = (): AppThunk => {
	return async ( dispatch: ThunkDispatch<RootState, unknown, AnyAction> ) => {
		try {
			await axiosInstance.post('/auth/validateToken');
			dispatch(setIsAuthenticated(true));
		} catch (error) {
			dispatch(setIsAuthenticated(false));
		}
	};
};

const setAuthData = (
	loginData?: { usernameOrEmail: string | null; password: string | null },
	googleLoginData?: {
		email: string;
		firstName: string;
		lastName: string;
		googleId: string;
		avatarImageUrl: string;
	}
): AppThunk => {
	return async ( dispatch: ThunkDispatch<RootState, unknown, AnyAction> ) => {
		try {
			const {
				data: { token, refreshToken },
			} = await axios.post(
				`http://localhost:8080/api/v1/auth/${ loginData != undefined ? 'login' : 'loginWithGoogle' }`,
				loginData != undefined ? loginData : googleLoginData
			);

			dispatch(setTokens({ token, refreshToken }));

			triggerReload();
		} catch (error: any) {
			console.error('Authentication Error:', error);
			const errorMessage = error.response?.data?.statusText || 'Authentication failed.';
			throw new Error(errorMessage);
		}
	};
};

const triggerReload = () => {
	window.location.reload();
};

export { validateTokenAsync, setAuthData };