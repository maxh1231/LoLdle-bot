import { authStore } from '../stores/authStore';

export const sendMessage = async (classic: number[][]): Promise<void> => {
    const obj = {
        username: authStore.getState().user.username,
        avatar: authStore.getState().user.avatar,
        classic: classic,
    };
    console.log(obj);
    const response = await fetch('/api/discord/message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
    });
    const data = await response.json();
    console.log(data);
};
