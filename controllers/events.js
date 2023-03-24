const Event = require("../models/Event");

// @desc     - Gets all events
// @route    - GET /api/v1/events
// @access   - Public
exports.getAllEvents = async (req, res, next) => {
   try {
      let query;

      // Copy req.query
      const reqQuery = { ...req.query };

      // Fields to exclude
      const removeFields = ["page", "limit"];

      // Loop over removeFields and delete from reqQuery
      removeFields.forEach(
         (param) => delete reqQuery[param]
      );

      // Create query string
      let queryStr = JSON.stringify(reqQuery);

      // Finding resource
      query = Event.find(JSON.parse(queryStr));

      //Pagination
      const page = parseInt(req.query.page, 10) || 1;
      const limit = parseInt(req.query.limit, 10) || 9;
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const total = await Event.countDocuments();

      query = query.skip(startIndex).limit(limit);

      // Executing query
      const events = await query;

      // Pagination result
      const pagination = {};

      if (endIndex < total) {
         pagination.next = {
            page: page + 1,
            limit,
         };
      }

      if (startIndex > 0) {
         pagination.prev = {
            page: page - 1,
            limit,
         };
      }

      res.status(200).json({
         success: true,
         total,
         pageCount: events.length,
         pagination,
         data: events,
      });
   } catch (error) {
      res.status(400).json({
         success: false,
         message: error.message,
      });
   }
};

// @desc     - Gets single event
// @route    - GET /api/v1/events/:id
// @access   - Public
exports.getEventById = async (req, res, next) => {
   try {
      const event = await Event.findById(req.params.id);

      if (!event) {
         return res.status(400).json({
            success: false,
            message: `Event with id ${req.params.id} does not exist`,
         });
      }

      res.status(200).json({ success: true, data: event });
   } catch (error) {
      res.status(400).json({
         success: false,
         message: error.message,
      });
   }
};

// @desc     - Create an event
// @route    - POST /api/v1/events
// @access   - Admin
exports.createEvent = async (req, res, next) => {
   try {
      const event = await Event.create(req.body);

      res.status(201).json({ success: true, data: event });
   } catch (error) {
      res.status(400).json({
         success: false,
         message: error.message,
      });
   }
};

// @desc     - Update an event
// @route    - PUT /api/v1/events/:id
// @access   - Admin
exports.updateEventById = async (req, res, next) => {
   try {
      const event = await Event.findByIdAndUpdate(
         req.params.id,
         req.body,
         {
            new: true,
            runValidators: true,
         }
      );

      if (!event) {
         return res.status(400).json({
            success: false,
            message: `Event with id ${req.params.id} does not exist`,
         });
      }

      res.status(201).json({ success: true, data: event });
   } catch (error) {
      res.status(400).json({
         success: false,
         message: error.message,
      });
   }
};

// @desc     - Delete an event
// @route    - POST /api/v1/events/:id
// @access   - Admin
exports.deleteEventById = async (req, res, next) => {
   try {
      const event = await Event.findByIdAndDelete(
         req.params.id
      );

      if (!event) {
         return res.status(400).json({
            success: false,
            message: `Event with id ${req.params.id} does not exist`,
         });
      }

      res.status(201).json({ success: true, data: {} });
   } catch (error) {
      res.status(400).json({
         success: false,
         message: error.message,
      });
   }
};
