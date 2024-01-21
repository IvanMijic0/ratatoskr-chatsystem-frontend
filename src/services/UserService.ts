import axios from "axios";

import { axiosInstance } from "../configuration";
import { ChatMessage, UserInfo } from "../types";

const fetchUsers = async ( query: string ): Promise<UserInfo[]> => {
	try {
		return ( await axiosInstance.get(`/user/search?username=${ query }`) ).data;
	} catch (error) {
		console.error('Error fetching users:', error);
		throw error;
	}
};

const fetchAllUsers = async (): Promise<UserInfo[]> => {
	try {
		return ( await axiosInstance.get('/user') ).data;
	} catch (error) {
		console.error('Error fetching all users:', error);
		throw error;
	}
};

const updateUser = async ( userId: string, userInfo: UserInfo ): Promise<void> => {
	try {
		await axiosInstance.patch(`/user/${ userId }`, userInfo);
	} catch (error) {
		console.error('Error updating user:', error);
		throw error;
	}
};

const removeUser = async ( userId: string ): Promise<void> => {
	try {
		await axiosInstance.delete(`/user/${ userId }`);
	} catch (error) {
		console.error('Error removing user:', error);
		throw error;
	}
};

const fetchUserFriends = async (): Promise<UserInfo[]> => {
	try {
		return ( await axiosInstance.get('/user/friends') ).data;
	} catch (error) {
		console.error('Error fetching user friends:', error);
		throw error;
	}
};

const fetchUserInformationForIds = async ( senderIds: ( string | undefined )[] ): Promise<UserInfo[]> => {
	try {
		return await Promise.all(
			senderIds?.map(async ( senderId ) => {
				return ( await axiosInstance.get(`/user/${ senderId }`) ).data;
			})
		);
	} catch (error) {
		console.error('Error fetching user information:', error);
		throw error;
	}
};

const confirmFriendRequest = async ( friendId: string ): Promise<void> => {
	try {
		await axiosInstance.post(`/user/add-friend/${ friendId }`);
	} catch (error) {
		console.log('Could not confirm friend request:', error);
		throw error;
	}
};

const fetchUserSpecific = async () => {
	try {
		return ( await axiosInstance.get(`/user/specific`) ).data;
	} catch (error) {
		console.error('Error fetching user specific data:', error);
	}
};

const deleteFriend = async ( friendId: string ): Promise<void> => {
	try {
		await axiosInstance.delete(`/user/delete-friend/${ friendId }`);
	} catch (error) {
		console.log('Could not delete friend:', error);
		throw error;
	}
};

const getDirectMessagings = async (): Promise<ChatMessage[]> => {
	try {
		return ( await axiosInstance.get(`/user/directmessagings`) ).data;
	} catch (error) {
		console.log('Could not get direct messagings:', error);
		throw error;
	}
};

const createDirectMessagings = async ( friendId: string ): Promise<void> => {
	try {
		await axiosInstance.post(`/user/directmessagings/${ friendId }`);
	} catch (error) {
		console.log('Could not create direct messaging:', error);
		throw error;
	}
};

const removeDirectMessagings = async ( directMessagingId: string ): Promise<void> => {
	try {
		await axiosInstance.delete(`/user/directmessagings/${ directMessagingId }`);
	} catch (error) {
		console.log('Could not delete direct messaging:', error);
		throw error;
	}
};

const checkIfMetaMaskAddressExists = async ( metaMaskAddress: string ): Promise<boolean> => {
	try {
		return ( await axios.get(`http://localhost:8080/api/v1/user/exists/${ metaMaskAddress }`) ).data;
	} catch (error) {
		console.error('Error checking if MetaMask address exists:', error);
		throw error;
	}
};

const setMetaMaskAddress = async ( metaMaskAddress: string ): Promise<void> => {
	try {
		await axiosInstance.post(`/user/set-meta-mask?metaMaskAddress=${ metaMaskAddress }`);
	} catch (error) {
		console.error('Error setting MetaMask address:', error);
		throw error;
	}
};

export default {
	fetchAllUsers,
	updateUser,
	removeUser,
	fetchUserInformationForIds,
	confirmFriendRequest,
	fetchUserSpecific,
	fetchUserFriends,
	deleteFriend,
	fetchUsers,
	getDirectMessagings,
	createDirectMessagings,
	removeDirectMessagings,
	checkIfMetaMaskAddressExists,
	setMetaMaskAddress
};