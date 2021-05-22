import { Router } from "express";
import multer from "multer";

import createCategoryController from "../modules/cars/useCases/CreateCategory";
import { importCategoryController } from "../modules/cars/useCases/ImportCategory";
import { listCategoryController } from "../modules/cars/useCases/ListCategory";

const categoriesRoutes = Router();

const upload = multer({
  dest: "./tmp",
});

categoriesRoutes.post("/", (request, response) => {
  return createCategoryController().handle(request, response);
});

categoriesRoutes.get("/", (request, response) => {
  return listCategoryController.handle(request, response);
});

categoriesRoutes.post("/upload", upload.single("file"), (request, response) => {
  importCategoryController.handle(request, response);
});

export { categoriesRoutes };
