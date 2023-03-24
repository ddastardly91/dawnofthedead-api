const express = require("express");
const {
   getAllEvents,
   createEvent,
   updateEventById,
   getEventById,
   deleteEventById,
} = require("../controllers/events");
const router = express.Router();

router.route("/").get(getAllEvents).post(createEvent);

router
   .route("/:id")
   .get(getEventById)
   .put(updateEventById)
   .delete(deleteEventById);

module.exports = router;
