const mongoose = require("mongoose");

const ModSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: [true, "Mod name is required."],
         trim: true,
         maxlength: [
            50,
            "Name cannot exceed 50 characters.",
         ],
      },
      workshopUrl: {
         type: String,
         match: [
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
            "Please use a valid URL with HTTP or HTTPS",
         ],
      },
      image: {
         type: String,
         default: "no-photo.jpg",
      },
   },
   {
      timestamps: true,
   }
);

module.exports = mongoose.model("Mods", ModSchema);
