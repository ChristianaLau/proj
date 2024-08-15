import axios from 'axios';

const apiKey = process.env.NEXT_PUBLIC_USDA_API_KEY;

if (!apiKey) {
    throw new Error('API key is not defined');
}

export const fetchFoodData = async (query: string) => {
    const options = {
        method: 'GET',
        url: 'https://api.nal.usda.gov/fdc/v1/foods/search',
        params: {
            query: query,
            api_key: apiKey,
        },
    };

    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error response data:', error.response?.data);
            console.error('Error response status:', error.response?.status);
            console.error('Error response headers:', error.response?.headers);
            console.error('Error request data:', error.request);
            console.error('Error message:', error.message);
            console.error('Error config:', error.config);

            throw new Error(`Failed to fetch data: ${error.message}`);
        } else {
            console.error('Unexpected error:', error);
            throw new Error('An unexpected error occurred');
        }
    }
};
