export declare class Auth {
    static formLogin(req: any, res: any): void;
    static formRegister(req: any, res: any): void;
    static logOut(req: any, res: any, next: any): void;
    static register(req: any, res: any): Promise<void>;
}
