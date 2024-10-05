import axiosInstance from '../utils/axiosInstance';

class ProfileService {
    async getProfile() {
        try {
            const response = await axiosInstance.get('/api/profile/test');
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching profile data:', error);
            throw error;
        }
    };

}

export default new ProfileService()