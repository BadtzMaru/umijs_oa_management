import request from '@/utils/request';

export function fetch({ page, pageSize }) {
    return request(`/api/users/get_users/${page}/${pageSize}`);
}

export function add(params) {
    return request(`/api/users/add_user/`, {
        method: 'POST',
        body: JSON.stringify(params),
    });
}

export function edit(id, params) {
    return request(`/api/users/edit_user/${id}`, {
        method: 'POST',
        body: JSON.stringify(params),
    });
}

export function remove(id) {
    return request(`/api/users/delete_user/${id}`, {
        method: 'DELETE',
    });
}