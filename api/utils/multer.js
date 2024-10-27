import multer from "multer";

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() +
        " _ " +
        Math.round(Math.random() * 1000000) +
        " _ " +
        file.fieldname
    );
  },
});

// console.log(storage);

// multer for brand logo

export const userMulter = multer({ storage }).single("userPhoto");
export const brandMulter = multer({ storage }).single("brandLogo");
export const blogMulter = multer({ storage }).single("blogLogo");
export const productMulter = multer({ storage }).array("productLogo");
