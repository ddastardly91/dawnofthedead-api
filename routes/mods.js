const express = require("express");
const {
   getAllMods,
   createMod,
   getModById,
   updateModById,
   deleteModById,
} = require("../controllers/mods.js");
const router = express.Router();

router.route("/").get(getAllMods).post(createMod);

router
   .route("/:id")
   .get(getModById)
   .put(updateModById)
   .delete(deleteModById);

module.exports = router;
