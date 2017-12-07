import { v4 as uuid } from 'uuid';

export type Uuid = string;

export const generateId = (): Uuid => uuid();

export const defaultId: Uuid = '00000000-0000-0000-0000-000000000000';
