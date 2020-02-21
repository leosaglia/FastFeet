import Package from '../models/Package';

class PackageController {
    async store(req, res) {
        const order = await Package.create(req.body);
        return res.json(order);
    }
}

export default new PackageController();
