import axios, { AxiosError } from "axios";
import { showError } from "../components/md_snack_tip_event_receiver";
import { getRequestErrorMsg } from "./error_msg";

const axiosInstance = axios.create({
    headers: {
        'content-type': 'application/json'
    },
    timeout: 5000
});

axiosInstance.interceptors.response.use((resp) => resp, (error: AxiosError) => {
    if (!error.response) {
        showError('一米哇肝奶！！！工口发生！？');
        return;
    }
    if (error.response.status >= 500) {
        showError('服务出现问题啦！！快联系梦月！');
        return;
    }
    if (error.response.status === 403) {
        showError('你没有权限做这个啦！！');
        return;
    }
    if (error.response.status === 404) {
        showError('404 Not Found');
        return;
    }
    showError(getRequestErrorMsg(error.response.config.url!!, error.response.status))
});

export default axiosInstance;