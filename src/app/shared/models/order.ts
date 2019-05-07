import {User} from './user';

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
}
