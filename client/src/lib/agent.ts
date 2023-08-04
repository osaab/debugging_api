import axios, { AxiosError, AxiosResponse } from "axios";

const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000));

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(async (response) => {
    if (process.env.NODE_ENV === 'development') await sleep();

    return response;
}, (error: AxiosError) => {
    if (error.response) {
        const { data, status } = error.response as AxiosResponse;

        switch (status) {
            case 400:
                if (data.errors) {
                    const modelStateErrors: string[] = [];
                    for (const key in data.errors) {
                        if (data.errors[key]) {
                            modelStateErrors.push(data.errors[key]);
                        }
                    }
                    throw modelStateErrors.flat();
                }
                console.error(data.title);
                break;
            case 401:
                // toast.error(data.title);
                break;
            case 403:
                console.error('You are not allowed to do that!');
                break;
            case 404:
                console.log("Hittade inte api")
                break;
            case 500:
                console.log("SERVER ERROR!!!")
                break;
            default:
                break;
        }
    } else if (error.request) {
        // request made - no response received
        console.error(error.request);
    } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error', error.message);
    }

    return Promise.reject(error);
});



const requests = {
    get: (url: string, params?: URLSearchParams, config?: {}) => axios.get(url, { ...config, params }).then(responseBody),
    post: (url: string, body?: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string, body?: {}) => axios.delete(url, { data: body }).then(responseBody),
};


const Category = {
    getAllCategories: () => requests.get(`categories`),
};


const agent = {
    Category
};

export default agent;
