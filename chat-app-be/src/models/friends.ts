import { Schema, model } from 'mongoose';

const friendsSchema = new Schema({
    requester: { type: Schema.Types.ObjectId, ref: 'Users' },
    recipient: { type: Schema.Types.ObjectId, ref: 'Users' },
    status: Number,
    created_at: Date,
    updated_at: Date,
});

export default model('Friends', friendsSchema);
