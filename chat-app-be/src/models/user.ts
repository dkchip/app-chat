import mongoose, { Schema, model } from 'mongoose';

const usersSchema = new Schema({
    id: String,
    email: String,
    password: String,
    first_name: String,
    last_name: String,
    full_name: String,
    username: String,
    avatar: String,
    background_image: String,
    last_username_change: Date,
    friends: [{ type: Schema.Types.ObjectId, ref: 'Friends' }],
    created_at: Date,
    updated_at: Date,
});

export default model('Users', usersSchema);
