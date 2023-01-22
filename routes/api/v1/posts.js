const express= require('express');
const router = express.Router();

const postApi= require('../../../controller/api/v1/post_api');
router.get('/',postApi.index);

module.exports = router;