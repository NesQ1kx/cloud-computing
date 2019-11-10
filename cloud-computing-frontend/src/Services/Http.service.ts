import axios from 'axios';

export class HttpService {
    private static instansce: HttpService;

    static getInstance() {
        if (!HttpService.instansce) {
            HttpService.instansce = new HttpService();
        }

        return HttpService.instansce
    }

    public get(url: string) {
        return axios.get(url);
    }

    public post<T>(url: string, body: T) {
        return axios.post(url, body);
    }
}