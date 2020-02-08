import User from '../models/User';

class SessionController {
    async store(req, res) {
        const { email, password } = req.body;
    }
}

export default new SessionController();
