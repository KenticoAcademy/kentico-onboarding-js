import { API_PREFIX } from '../constants/apiPrefix';

export const urlBuilder = (id: Guid) => `${API_PREFIX}/${id}`;
