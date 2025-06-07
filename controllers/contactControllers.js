import asyncHandler from "express-async-handler";
import { contactModel } from "../models/contactModel.js";

//@desc Get all contacts
//@route GET /api/contact
//@access private
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await contactModel.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});

//@desc Get single contacts
//@route GET /api/contact
//@access private
const getContact = asyncHandler(async (req, res) => {
  const contact = await contactModel.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Get Error: No Contact found with this id!");
  }
  res.status(200).json(contact);
});

//@desc create contact!
//@route GET /api/contact
//@access private
const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All Fields are mandatory!!!");
  }

  const contact = await contactModel.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });

  res.status(201).json(contact);
});

//@desc Update contact!
//@route GET /api/contact
//@access private
const updateContact = asyncHandler(async (req, res) => {
  const contact = await contactModel.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact Not Found!!!");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("Unknown User: Not Authorized to update the user!!");
  }

  const updateContact = await contactModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updateContact);
});

//@desc Delete contact!
//@route GET /api/contact
//@access private
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await contactModel.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact Not Found!!!");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("Unknown User: Not Authorized to delete the user!");
  }

  await contactModel.deleteOne({ _id: req.params.id });
  res.status(200).json(contact);
});

export default {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
};
