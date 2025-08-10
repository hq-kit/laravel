import { Icon } from '@tabler/icons-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: model.User;
}

export interface NavItem {
    title: string;
    href?: string;
    icon?: Icon;
}

export interface PaginationProps {
    meta: {
        from: number;
        to: number;
        total: number;
        current_page: number;
        last_page: number;
        path: string;
        per_page: number;
        links: {
            active: boolean;
            label: string;
            url: string | null;
        }[];
    };
    links: {
        first: string | null;
        last: string | null;
        next: string | null;
        prev: string | null;
    };
    attributes?: PageProps;
}

export interface FlashProps {
    type: string;
    message: string;
}

export interface FormDataProps {
    method: 'post' | 'put';
    title: string;
    url: string;
}

export interface PageProps {
    perPage: number;
    search: string;
    sort: string;
    dir: 'asc' | 'desc';
    filter?: string[];
}

export interface SharedData {
    auth: Auth;
    ziggy: Config & { location: string };
    flash: FlashProps;

    [key: string]: unknown;
}
