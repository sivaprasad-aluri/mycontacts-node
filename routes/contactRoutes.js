import express from "express";
import contactControllers from "../controllers/contactControllers.js";
const router = express.Router();

/* getting all of the contacts! */
router
  .route("/")
  .get(contactControllers.getContacts)
  .post(contactControllers.createContact);

/* getting a contact based on id! */
router
  .route("/:id")
  .get(contactControllers.getContact)
  .put(contactControllers.updateContact)
  .delete(contactControllers.deleteContact);

export default router;
