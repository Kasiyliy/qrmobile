import {Session} from './session';
import {User} from './user';

export class Attendance {

    id: number;
    altitude: number;
    longitude: number;
    latitude: number;
    session: Session;
    user: User;
    deviceId: string;
}
