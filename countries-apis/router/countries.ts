import { Router } from "express";
import { fetchAllCountries, fetchCountryDetails, search } from "../controller/countries";

const router = Router();

router.get('/', fetchAllCountries);
router.get('/search', search);
router.get('/:code', fetchCountryDetails);

export default router;