export default interface GlobalConfiguration {
    database: {
        host: string;
        port: number;
        name: string;
        user: string;
        password: string;
    };
    http: {
        port: number;
    };
}

export type DatabaseConfiguration = GlobalConfiguration['database'];
export type HTTPConfiguration = GlobalConfiguration['http'];

