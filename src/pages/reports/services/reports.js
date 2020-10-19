import request from '@/utils/request';

export function fetchAllUsers() {
    return request(`/api/users/all_users`);
};

export function add(params) {
    return request(`/api/users/add_report/${localStorage.userId}`, {
        method: 'POST',
        body: JSON.stringify(params),
    });
};

export function fetchMyReports({ page, pageSize }) {
    return request(`/api/users/reports/${page}/${pageSize}/${localStorage.userId}`);
};

export function fetchInfo(id) {
    return request(`/api/users/report_detail/${localStorage.userId}/${id}`);
};

export function update(params) {
    return request(`/api/users/edit_report/${localStorage.userId}/${params.id}`, {
        method: 'POST',
        body: JSON.stringify(params),
    });
};

export function remove(id) {
    return request(`/api/users/delete_report/${localStorage.userId}/${id}`, {
        method: 'DELETE',
    });
};
