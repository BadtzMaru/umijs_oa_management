import request from '@/utils/request';

export function fetch({ page, pageSize }) {
    return request(`/api/users/get_users/${page}/${pageSize}`);
}