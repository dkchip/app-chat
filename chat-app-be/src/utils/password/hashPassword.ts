import bcrypt from 'bcrypt';

const hashPassword = (password:string) => {
    return bcrypt.hashSync(password,10)
}

export default hashPassword;