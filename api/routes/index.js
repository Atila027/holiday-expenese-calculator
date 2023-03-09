const express = require('express');
const router = express.Router();

/**
 * GET /
 * @author Tomas Atila <atila423027@gmail.com>
 */
router.get('/', async (request, response, next) => {
  return response.json({
    message: 'Holiday expenses server is running'
  });
});

module.exports = router;
