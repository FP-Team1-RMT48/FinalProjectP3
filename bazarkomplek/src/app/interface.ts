import { ObjectId } from "mongodb"

export type Event = {
    name: string,
    slug: string,
    location: string,
    eventImg: string,
    lapak: number,
    startDate: string,
    endDate: string
}


export type Product = {
    _id: ObjectId;
    sellerId: ObjectId;
    name: string;
    slug: string;
    images: string;
    description: string;
    excerpt: string;
    type: string;
    status: [string];
    price: number;
    eventId: ObjectId;
};

export type NewProduct = {
    sellerId: string;
    name: string;
    slug: string;
    images: string;
    description: string;
    excerpt: string;
    type: string;
    status: [string];
    price: number;
    eventId: ObjectId;
};

export type Pagination = {
    data: Product[];
    currentPage: number;
    currentData: number;
    totalData: number;
    totalPage: number;
    hashMore: boolean;
}

export type Myresponse<T = null> = {
    data?: T;
    error?: string[]
    message: string;
}