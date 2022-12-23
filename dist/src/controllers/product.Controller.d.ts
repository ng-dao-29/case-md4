<<<<<<< HEAD
export declare class ProductController {
    static showFromCreate(req: any, res: any, next: any): Promise<void>;
=======
export declare class ProductCTL {
    static formCreate(req: any, res: any): void;
>>>>>>> a48fd8d59a005c6ce405a27716f38cb708a2e494
    static create(req: any, res: any): Promise<void>;
    static list(req: any, res: any): Promise<void>;
    static delete(req: any, res: any): Promise<void>;
    static formUpdate(req: any, res: any): Promise<void>;
    static update(req: any, res: any): Promise<void>;
    static search(req: any, res: any, next: any): Promise<void>;
    static addToCart(req: any, res: any): Promise<void>;
}
