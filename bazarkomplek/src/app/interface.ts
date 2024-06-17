import { ObjectId } from "mongodb";

export type Event = {
  _id: string;
  name: string;
  location: string;
  eventImg: string;
  startDate: string;
  endDate: string;
  eventSlug: string;
  filledLapakSlots: number;
  lapakSlots: number;
};
export type AdminEvent = {
  map(
    arg0: (e: AdminEvent, idx: number) => import("react").JSX.Element
  ): import("react").ReactNode;
  _id: string;
  name: string;
  location: string;
  eventImg: string;
  startDate: string;
  endDate: string;
  eventSlug: string;
  filledLapakSlots: number;
  lapakSlots: number;
};

export type User = {
  _id: ObjectId | string;
  username: string;
  email: string;
  location: string;
  phoneNumber: string;
  isAdmin: boolean;
};

export type EventWithProducts = {
  _id: string;
  name: string;
  location: string;
  eventImg: string;
  startDate: string;
  endDate: string;
  eventSlug: string;
  filledLapakSlots: number;
  lapakSlots: number;
  EventProducts: Product[];
};

export type Product = {
  _id: ObjectId | string;
  sellerId: ObjectId | string;
  name: string;
  slug: string;
  image: string;
  description: string;
  excerpt: string;
  type: string;
  category: string;
  status: string;
  price: number;
  eventId: ObjectId | string;
};

export type productWithEvent = Product & {
  event: Event;
};

export type productWithUser = Product & {
  user: User;
};

export type Transaction = {
  _id: ObjectId;
  productId: ObjectId;
  buyerId: ObjectId;
  sellerId: ObjectId;
  status: string;
};

export type EditedProduct = Omit<Product, "_id" | "sellerId" | "eventId">;

export type NewProduct = {
  sellerId: string;
  name: string;
  slug?: string;
  image: string;
  description: string;
  excerpt: string;
  type: string;
  category: string;
  status: string;
  price: number;
  eventId: ObjectId;
};

export type NewProductInput = Omit<NewProduct, "sellerId" | "slug" | "status">;

export type NewTransaction = {
  productId: string;
  buyerId: string;
  sellerId: string;
  createdAt: string;
};

export type TransactionInput =Omit<NewTransaction, "createdAt">

export type TransactionWithProductDetail = NewTransaction & {
    productDetail: Product
}

export type Pagination = {
  data: Product[] | Transaction[];
  currentPage: number;
  currentData: number;
  totalData: number;
  totalPage: number;
  hashMore: boolean;
};

export type Myresponse<T = null> = {
  data?: T;
  error?: string[];
  message: string;
};

export type ConfirmationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};
