const Mod = require("../models/Mod");

// @desc     - Get all Mods
// @route    - GET /api/v1/mods
// @access   - Public
exports.getAllMods = async (req, res, next) => {
   try {
      const mods = await Mod.find();

      res.status(200).json({
         success: true,
         count: mods.length,
         data: mods,
      });
   } catch (error) {
      res.status(400).json({
         success: false,
         message: error,
      });
   }
};

// @desc     - Create a new mod
// @route    - POST /api/v1/mods
// @access   - Admin
exports.createMod = async (req, res, next) => {
   try {
      const mod = await Mod.create(req.body);

      res.status(201).json({ success: true, data: mod });
   } catch (error) {
      res.status(400).json({
         success: false,
         message: error.message,
      });
   }
};

// @desc     - Get Mod by ID
// @route    - POST /api/v1/mods/:id
// @access   - Public
exports.getModById = async (req, res, next) => {
   try {
      const mod = await Mod.findById(req.params.id);

      if (!mod) {
         return res.status(400).json({
            success: false,
            message: `Mod with id ${req.params.id} does not exist`,
         });
      }

      res.status(200).json({ success: true, data: mod });
   } catch (error) {
      res.status(400).json({
         success: false,
         data: error,
      });
   }
};

// @desc     - Update a Mod
// @route    - PUT /api/v1/mods/:id
// @access   - Admin
exports.updateModById = async (req, res, next) => {
   try {
      const mod = await Mod.findByIdAndUpdate(
         req.params.id,
         req.body,
         {
            new: true,
            runValidators: true,
         }
      );

      if (!mod) {
         return res.status(400).json({
            success: false,
            message: `Mod with id ${req.params.id} does not exist`,
         });
      }

      res.status(201).json({ success: true, data: mod });
   } catch (error) {
      res.status(400).json({
         success: false,
         message: error.message,
      });
   }
};

// @desc     - Delete a Mod
// @route    - DELETE /api/v1/mods/:id
// @access   - Admin
exports.deleteModById = async (req, res, next) => {
   try {
      const mod = await Mod.findByIdAndDelete(
         req.params.id
      );

      if (!mod) {
         return res.status(400).json({
            success: false,
            message: `Mod with id ${req.params.id} does not exist`,
         });
      }

      res.status(201).json({ success: true, data: [] });
   } catch (error) {
      res.status(400).json({
         success: false,
         message: error.message,
      });
   }
};
