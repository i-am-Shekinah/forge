import { apiFetch } from './api';

export async function registerUser(data: {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}) {
    return apiFetch('/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}


export async function loginUser(data: {
    email: string;
    password: string;
}) {
    return apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify(data),
    })
}