import mongoose, { Schema } from 'mongoose';

const AuthSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true
    },
    token: {
        type: String,
        required: true
    }
})

const Auth = mongoose.model("auth", AuthSchema)

export default Auth;