import { Router } from 'express';

import multer from 'multer';
import multerConfig from './config/multer';

import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import FileController from './app/controllers/FileController';
import DeliverymanController from './app/controllers/DeliverymanController';
import PackageController from './app/controllers/PackageController';
import DeliverymanDashboardController from './app/controllers/DeliverymanDashboardController';
import DeliveriesController from './app/controllers/DeliveriesController';

import authMiddleware from './app/middlewares/auth';

const routes = Router();
const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);

routes.post('/files', upload.single('file'), FileController.store);

routes.post('/deliverymen', DeliverymanController.store);
routes.get('/deliverymen', DeliverymanController.index);
routes.put('/deliverymen/:id', DeliverymanController.update);
routes.delete('/deliverymen/:id', DeliverymanController.delete);

routes.get('/deliverymen/:id/deliveries', DeliveriesController.index);
routes.post('/deliverymen/:id/deliveries/:order', DeliveriesController.update);

routes.get('/deliverymen/:id/dashboard', DeliverymanDashboardController.index);
routes.put(
    '/deliverymen/:id/dashboard/:order',
    DeliverymanDashboardController.update
);

routes.post('/packages', PackageController.store);
routes.get('/packages', PackageController.index);
routes.put('/packages/:id', PackageController.update);
routes.delete('/packages/:id', PackageController.delete);

export default routes;
