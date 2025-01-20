import multer from "multer";
import path from "path";

/** @MulterFile used to type check file */
/** @MulterCallback used to type check callback function in the multer storage */
interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
  path: string;
  buffer: Buffer;
}

interface MulterCallback {
  (error: Error | null, destination: string): void;
}

const storage = multer.diskStorage({
  destination: function (
    req: Express.Request,
    file: MulterFile,
    cb: MulterCallback
  ) {
    cb(null, "src/public/uploads");
  },
  filename: function (
    req: Express.Request,
    file: MulterFile,
    cb: MulterCallback
  ) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });
export default upload;
