import request from '@/utils/request';

export function fetchAllUsers() {
    return request(`/api/users/all_users`);
}

export function add(params) {
    return request(`/api/users/add_report/${localStorage.userId}`, {
        method: 'POST',
        body: JSON.stringify(params),
    });
}

export function fetchMyReports({ page, pageSize }) {
    return request(`/api/users/reports/${page}/${pageSize}/${localStorage.userId}`);
}