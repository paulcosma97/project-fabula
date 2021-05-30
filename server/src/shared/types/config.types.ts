export enum DatabaseProvider {
    MongoDB = 'mongodb',
    InMemoryMongoDB = 'inmemory-mongodb',
}

export default interface GlobalConfiguration {
    database: {
        host: string;
        port: number;
        name: string;
        user: string;
        password: string;
        provider: DatabaseProvider;
    };
    http: {
        port: number;
    };
}

export type DatabaseConfiguration = GlobalConfiguration['database'];
export type HTTPConfiguration = GlobalConfiguration['http'];
