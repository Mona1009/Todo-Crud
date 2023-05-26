const router = require("express").Router();
const itemController = require('../controllers/itemController');
const { verifyAuth } = require("../middleware/auth");

router.post("/", itemController.item_create);
router.put("/:itemId", itemController.item_update);
router.delete("/:itemId", itemController.item_delete);
router.get("/getItemPaginate", itemController.getItemPaginate);

module.exports = router;
