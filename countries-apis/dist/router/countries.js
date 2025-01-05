"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const countries_1 = require("../controller/countries");
const router = (0, express_1.Router)();
router.get('/', countries_1.fetchAllCountries);
router.get('/search', countries_1.search);
router.get('/:code', countries_1.fetchCountryDetails);
exports.default = router;
