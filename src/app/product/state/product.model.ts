import { ID } from '@datorama/akita';

export interface Product {
    id: ID; 
    image: string;
    name: string;
    price: number;
}