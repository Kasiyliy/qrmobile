import {User} from './user';
import {Qr} from './qr';

export class Session {

    id: number;
    altitude: number;
    longitude: number;
    latitude: number;
    qr: Qr;
    user: User;

}
