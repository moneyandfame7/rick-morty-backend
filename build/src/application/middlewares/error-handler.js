import { CustomError } from '../api-error.js';
const errorHandler = (err, req, res, next) => {
    if (err instanceof CustomError) {
        return res.status(400).send({ error: err.serializeErrors() });
    }
    res.status(500).json({ error: { message: 'Something broke!' } });
};
export default errorHandler;
