export type Product = {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: number;
    icon: string;
    image: string | null;
    category: string;
    is_available: boolean;
};

export type CartItem = {
    product: Product;
    quantity: number;
    temperature: 'hot' | 'cold';
    sweetness: 'regular' | 'less' | 'none';
    extraMilk: boolean;
    toppings: string[];
    remark: string;
    unitPrice: number;
};

export type OrderItem = {
    id: number;
    product_id: number;
    product_name: string;
    unit_price: number;
    quantity: number;
    subtotal: number;
    temperature: string;
    sweetness: string;
    extra_milk: boolean;
    toppings: string[] | null;
    remark: string | null;
};

export type Order = {
    id: number;
    customer_name: string | null;
    customer_contact: string | null;
    pickup_time: string | null;
    table_number: string | null;
    order_type: string;
    customer_address: string | null;
    delivery_area: string | null;
    payment_method: string | null;
    status: string;
    total_price: number;
    notes: string | null;
    items: OrderItem[];
    created_at: string;
    updated_at: string;
};

export type GardenImage = {
    id: number;
    image_url: string;
    caption: string | null;
    sort_order: number;
};
