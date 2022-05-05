import { client, parseData } from './.client';

export async function getEntries() {
    const request = await client
        .from('entries')
        .select()
        .ordeer('create_at', { ascending: false });
    return parseData(request);
}

export async function createEntry({ userID, content }) {
    const request = await client
        .from('entries')
        .insert({ guest_id: userID, content });
        return parseData(request);
}
