const mongoose = require("mongoose");
const slugify = require("slugify");

const EventSchema = new mongoose.Schema(
   {
      title: {
         type: String,
         maxlength: [
            50,
            "Title must not exceed 50 characters",
         ],
         minlength: [
            5,
            "Title must contain at least 5 characters",
         ],
         trim: true,
         required: [true, "Event must have a title."],
         unique: true,
      },
      slug: String,
      picture: {
         type: String,
         default: "placeholder",
      },
      startDate: {
         type: Date,
         default: new Date().toLocaleDateString("en-GB"),
      },
      endDate: {
         type: Date,
         default: new Date().toLocaleDateString("en-GB"),
      },
      time: {
         type: String,
         required: [
            true,
            "Must have a time in string format",
         ],
      },
      link: {
         type: String,
         required: [true, "Must include an image"],
      },
      description: {
         type: String,
         required: [true, "Must have a description"],
      },
   },
   {
      timestamps: true,
   }
);

// Create a slug from title
EventSchema.pre("save", function (next) {
   this.slug = slugify(this.title, { lower: true });
   next();
});

module.exports = mongoose.model("Events", EventSchema);
