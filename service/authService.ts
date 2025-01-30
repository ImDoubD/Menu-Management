import bcrypt from 'bcrypt';
import User from '../model/userModel';
import { generateToken } from '../utils/jwtUtils';

class AuthService {
  async register(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword });
    return user;
  }

  async login(email: string, password: string) {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error('Invalid email or password');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error('Invalid email or password');

    const token = generateToken(user.id);
    return { token, userId: user.id };
  }
}

export default new AuthService();