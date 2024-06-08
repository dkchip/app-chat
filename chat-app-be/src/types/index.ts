export interface UploadedFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    buffer: Buffer;
    size: number;
}

export interface User {
    _id: string;
    id: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    full_name: string;
    username: string;
    background_image: string;
    last_username_change: Date;
    avatar: string;
    created_at: Date;
    updated_at: Date;
}
