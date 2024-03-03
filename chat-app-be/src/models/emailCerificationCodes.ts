import { Schema, model, Types } from 'mongoose';

const emailCerificationCodes = new Schema(
    {
        id: String,
        email: String,
        code: Number,
        created_at: Date,
        expires_at: Date,
    },
    {
        collection: 'email_cerification_codes',
    },
);

export default model('EmailCerificationCodes', emailCerificationCodes);
