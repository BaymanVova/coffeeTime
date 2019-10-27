/*tslint:disable*/
class BaseRequest {
    protected static handleError = (e: any) => {
        console.error(e);
        throw e;
    };

    protected fetch(path: string, options: any): Promise<any> {
        const url = `http://176.31.32.73:8000${path}`;
        console.log("fetch: ",url,options)
        return fetch(url, options);
    }
}

export class CafeClientRequest extends BaseRequest {

    getAll(sessionId: string, config: any = {}): Promise<CafeInfo[] | null> {
        return this.fetch(
            `/api/Cafe/GetAll`,
            Object.assign({
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                },
                method: 'POST',
                body: JSON.stringify(sessionId)
            }, config))
            .then((response) => response.json())
            .catch(BaseRequest.handleError);
    }

    getCafe(cafeRequest: CafeRequest, config: any = {}): Promise<CafeInfo | null> {
        return this.fetch(
            `/api/Cafe/GetCafe`,
            Object.assign({
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                },
                method: 'POST',
                body: JSON.stringify(cafeRequest)
            }, config))
            .then((response) => response.json())
            .catch(BaseRequest.handleError);
    }
}

export class ProductClientRequest extends BaseRequest {

    getAll(session: string, config: any = {}): Promise<ProductBriefInfo[] | null> {

        return this.fetch(
            `/api/Product/GetAll`,
            Object.assign({
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                },
                method: 'POST',
                body: JSON.stringify(session)
            }, config))

            .then((response) => response.json())
            .catch(BaseRequest.handleError);
    }

    getProductsCafe(myCafe: CafeRequest, config: any = {}): Promise<ProductBriefInfo[] | null> {

        return this.fetch(
            `/api/Product/GetProductsCafe`,
            Object.assign({
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                },
                method: 'POST',
                body: JSON.stringify(myCafe)
            }, config))

            .then((response) => response.json())
            .catch(BaseRequest.handleError);
    }

    getProduct(myProduct: ProductRequest, config: any = {}): Promise<ProductFullInfo | null> {

        return this.fetch(
            `/api/Product/GetProduct`,
            Object.assign({
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                },
                method: 'POST',
                body: JSON.stringify(myProduct)
            }, config))

            .then((response) => response.json())
            .catch(BaseRequest.handleError);
    }
}

export class UserClientRequest extends BaseRequest {

    register(item: UserRequest, config: any = {}): Promise<string | null> {
        console.log("register ",item);
        return this.fetch(
            `/api/User/Register`,
            Object.assign({
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                },
                method: 'POST',
                body: JSON.stringify(item)
            }, config))

            .then((response) =>{
                console.log("из метода регистрации, ",response);
                return response.json();}
            )
            .catch(BaseRequest.handleError);
    }

    authorization(item: UserRequest, config: any = {}): Promise<string | null> {
        console.log("authorization: ", item);
        return this.fetch(
            `/api/User/Authorization`,
            Object.assign({
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                },
                method: 'POST',
                body: JSON.stringify(item)
            }, config))

            .then((response) => { console.log("authorization2: ", response);
                return response.json();})
            .catch(BaseRequest.handleError);
    }
}

export class FavoriteClientRequest extends BaseRequest {
    set(myProduct: ProductRequest, config: any = {}): Promise<boolean | null> {

        return this.fetch(
            `/api/Favorite/Set`,
            Object.assign({
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                },
                method: 'POST',
                body: JSON.stringify(myProduct)
            }, config))

            .then((response) => response.json())
            .catch(BaseRequest.handleError);
    }

    unset(myProduct: ProductRequest, config: any = {}): Promise<boolean | null> {

        return this.fetch(
            `/api/Favorite/Unset`,
            Object.assign({
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                },
                method: 'POST',
                body: JSON.stringify(myProduct)
            }, config))

            .then((response) => response.json())
            .catch(BaseRequest.handleError);
    }

}

export class CafeInfo implements ICafeInfo {
    id?: string | undefined;
    name: string;
    address: string;
    coordinates: string;
    description: string;
    images?: string | undefined;

    constructor(data?: ICafeInfo) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    static fromJS(data: any): CafeInfo {
        let result = new CafeInfo();
        result.init(data);
        return result;
    }

    init(data?: any) {
        if (data) {
            this.id = data["id"];
            this.name = data["name"];
            this.address = data["address"];
            this.coordinates = data["coordinates"];
            this.description = data["description"];
            this.images = data["images"];
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["address"] = this.address;
        data["coordinates"] = this.coordinates;
        data["description"] = this.description;
        data["images"] = this.images;
        return data;
    }
}

export interface ICafeInfo {
    id?: string | undefined;
    name: string;
    address: string;
    coordinates: string;
    description: string;
    images?: string | undefined;
}

export class CafeRequest implements ICafeRequest {
    sessionId: string;
    cafeId: string;

    constructor(data?: ICafeRequest) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    static fromJS(data: any): CafeRequest {
        let result = new CafeRequest();
        result.init(data);
        return result;
    }

    init(data?: any) {
        if (data) {
            this.sessionId = data["sessionId"];
            this.cafeId = data["cafeId"];
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["sessionId"] = this.sessionId;
        data["cafeId"] = this.cafeId;
        return data;
    }
}

export interface ICafeRequest {
    sessionId: string;
    cafeId: string;
}

export class ProductBriefInfo implements IProductBriefInfo {
    id: string;
    cofeId: string;
    name: string;
    price: number;
    favorite: boolean;
    imagesPath?: string | undefined;

    constructor(data?: IProductBriefInfo) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    static fromJS(data: any): ProductBriefInfo {
        let result = new ProductBriefInfo();
        result.init(data);
        return result;
    }

    init(data?: any) {
        if (data) {
            this.id = data["id"];
            this.cofeId = data["cofeId"];
            this.name = data["name"];
            this.price = data["price"];
            this.favorite = data["favorite"];
            this.imagesPath = data["imagesPath"];
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["cofeId"] = this.cofeId;
        data["name"] = this.name;
        data["price"] = this.price;
        data["favorite"] = this.favorite;
        data["imagesPath"] = this.imagesPath;
        return data;
    }
}

export interface IProductBriefInfo {
    id: string;
    cofeId: string;
    name: string;
    price: number;
    favorite: boolean;
    imagesPath?: string | undefined;
}

export class ProductRequest implements IProductRequest {
    sessionId: string;
    productId: string;

    constructor(data?: IProductRequest) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    static fromJS(data: any): ProductRequest {
        let result = new ProductRequest();
        result.init(data);
        return result;
    }

    init(data?: any) {
        if (data) {
            this.sessionId = data["sessionId"];
            this.productId = data["productId"];
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["sessionId"] = this.sessionId;
        data["productId"] = this.productId;
        return data;
    }
}

export interface IProductRequest {
    sessionId: string;
    productId: string;
}

export class ProductFullInfo implements IProductFullInfo {
    id: string;
    productName: string;
    price: number;
    cofeId: string;
    cofeName: string;
    favarite: boolean;
    attribute: AttributeInfo[] = [];
    imagesPath?: string | undefined;

    constructor(data?: IProductFullInfo) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    static fromJS(data: any): ProductFullInfo {
        let result = new ProductFullInfo();
        result.init(data);
        return result;
    }

    init(data?: any) {
        if (data) {
            this.id = data["id"];
            this.productName = data["productName"];
            this.price = data["price"];
            this.cofeId = data["cofeId"];
            this.cofeName = data["cofeName"];
            this.favarite = data["favarite"];
            if (data["attribute"] && data["attribute"].constructor === Array) {
                this.attribute = [];
                for (let item of data["attribute"])
                    this.attribute.push(AttributeInfo.fromJS(item));
            }
            this.imagesPath = data["imagesPath"];
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["productName"] = this.productName;
        data["price"] = this.price;
        data["cofeId"] = this.cofeId;
        data["cofeName"] = this.cofeName;
        data["favarite"] = this.favarite;
        if (this.attribute && this.attribute.constructor === Array) {
            data["attribute"] = [];
            for (let item of this.attribute)
                data["attribute"].push(item.toJSON());
        }
        data["imagesPath"] = this.imagesPath;
        return data;
    }
}

export interface IProductFullInfo {
    id: string;
    productName: string;
    price: number;
    cofeId: string;
    cofeName: string;
    favarite: boolean;
    attribute: AttributeInfo[];
    imagesPath?: string | undefined;
}

export class AttributeInfo implements IAttributeInfo {
    id: string;
    description: string;
    iconType: string;

    constructor(data?: IAttributeInfo) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    static fromJS(data: any): AttributeInfo {
        let result = new AttributeInfo();
        result.init(data);
        return result;
    }

    init(data?: any) {
        if (data) {
            this.id = data["id"];
            this.description = data["description"];
            this.iconType = data["iconType"];
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["description"] = this.description;
        data["iconType"] = this.iconType;
        return data;
    }
}

export interface IAttributeInfo {
    id: string;
    description: string;
    iconType: string;
}

export class UserRequest implements IUserRequest {
    email?: string | undefined;
    password: string;

    constructor(data?: IUserRequest) {
        console.log("data, ",data);
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    static fromJS(data: any): UserRequest {
        let result = new UserRequest();
        result.init(data);
        return result;
    }

    init(data?: any) {
        if (data) {
            this.email = data["email"];
            this.password = data["password"];
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["email"] = this.email;
        data["password"] = this.password;
        return data;
    }
}

export interface IUserRequest {
    email?: string | undefined;
    password: string;
}
