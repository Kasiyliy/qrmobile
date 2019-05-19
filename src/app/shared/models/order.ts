import {User} from './user';
import {Company} from './company';
import {OrderStatus} from './order-status';

export class Order {

    id: number;
    price: number;
    driver: User;
    client: User;
    description: string;
    completedByClient: boolean;
    completedByDriver: boolean;
    fromLocation: string;
    toLocation: string;
    company: Company;
    status: OrderStatus;
}
