export default async function (): Promise<void> {
    process.env.MONGOMS_DOWNLOAD_URL =
        process.platform === 'win32'
            ? 'http://downloads.mongodb.org/win32/mongodb-win32-x86_64-2008plus-ssl-v4.0-latest.zip'
            : 'http://downloads.mongodb.org/linux/mongodb-linux-x86_64-debian92-latest.tgz';

    process.env.FABULA_CONFIG_PROFILE = 'e2e-test';

    process.stdout.write('\n');
    await require('mongodb-memory-server/postinstall');
}
