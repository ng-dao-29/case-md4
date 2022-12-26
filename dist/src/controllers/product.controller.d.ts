export declare class ProductController {
    static showFromCreate(req: any, res: any): Promise<void>;
    static create(req: any, res: any): Promise<any>;
    static list(req: any, res: any): Promise<void>;
    static delete(req: any, res: any): Promise<void>;
    static formUpdate(req: any, res: any): Promise<void>;
    static update(req: any, res: any): Promise<void>;
    static search(req: any, res: any, next: any): Promise<void>;
    static getProductId(req: any, res: any): Promise<void>;
    static addCart(req: any, res: any): Promise<void>;
    static showCart(req: any, res: any): Promise<void>;
    static skipProduct(req: any, res: any): Promise<void>;
    static oder(req: any, res: any): Promise<void>;
}
