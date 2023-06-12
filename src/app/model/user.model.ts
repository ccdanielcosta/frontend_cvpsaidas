export class User {
    fullName: string;
    email: string;
    password: string;
    user_type: string;

    //constructor(public id: string, public name: string) {}
}


export interface IUserResponse {
    total: number;
    results: User[];
  }