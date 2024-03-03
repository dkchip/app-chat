import bcrypt from 'bcrypt';

const comparePassword = (password: string, hashPassword: string) => {
    return bcrypt.compareSync(password, hashPassword);
};

export default comparePassword;
