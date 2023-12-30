const  express = require ('express')
const router = express.Router();
    const { getAddress, getAddresses, deleteAddress, createAddress, updateAddress} = require('../controllers/addressController');
const validateToken = require('../middleware/validateTokenHandler');


//Multiple HTTP methods per Route
router.use(validateToken)
router.route("/").get(getAddresses).post(createAddress);
router.route("/:id").get(getAddress).put(updateAddress).delete(deleteAddress)


module.exports = router;


