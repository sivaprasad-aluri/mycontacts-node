import express from "express";
import contactControllers from "../controllers/contactControllers.js";
import validateToken from "../middleware/validateTokenHandler.js";
const router = express.Router();

router.use(validateToken);
router
  .route("/")
  .get(contactControllers.getContacts)
  .post(contactControllers.createContact);
router
  .route("/:id")
  .get(contactControllers.getContact)
  .put(contactControllers.updateContact)
  .delete(contactControllers.deleteContact);

export default router;
