import {User} from './user';
import {CarType} from './car-type';
import {Company} from './company';

export class Car {

    id: number;
    plateNumber: string;
    name: string;
    user: User;
    carType: CarType;
    company: Company;
}
