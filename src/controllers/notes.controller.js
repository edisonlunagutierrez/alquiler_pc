import Note from "../models/Note.js";

export const renderNoteForm = (req, res) => res.render("notes/new-note");

export const createNewNote = async (req, res) => {
  const { nombre, documento, direccion, descripcion } = req.body;
  const errors = [];
  if (!nombre) {
    errors.push({ text: "Por favor escriba un nombre." });
  }
  if (!documento) {
    errors.push({ text: "Por favor escriba un documento" });
  }
  if (!direccion) {
    errors.push({ text: "Por favor escriba una direccion" });
  }
  if (!descripcion) {
    errors.push({
      text: "Por favor escriba una descripcion de los componentes",
    });
  }
  if (errors.length > 0)
    return res.render("notes/new-note", {
      errors,
      nombre,
      documento,
      direccion,
      descripcion,
    });

  const newNote = new Note({ nombre, documento, direccion, descripcion });
  newNote.user = req.user.id;
  await newNote.save();
  req.flash("success_msg", "Solicitud agregada");
  res.redirect("/notes");
};

export const renderNotes = async (req, res) => {
  const notes = await Note.find({ user: req.user.id })
    .sort({ date: "desc" })
    .lean();
  res.render("notes/all-notes", { notes });
};

export const renderEditForm = async (req, res) => {
  const note = await Note.findById(req.params.id).lean();
  if (note.user != req.user.id) {
    req.flash("error_msg", "No autorizado!");
    return res.redirect("/notes");
  }
  res.render("notes/edit-note", { note });
};

export const updateNote = async (req, res) => {
  const { nombre, documento, direccion, descripcion } = req.body;
  await Note.findByIdAndUpdate(req.params.id, {
    nombre,
    documento,
    direccion,
    descripcion,
  });
  req.flash("success_msg", "Solicitud actualizada correctamente");
  res.redirect("/notes");
};

export const deleteNote = async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "Solicitud eliminada correctamente");
  res.redirect("/notes");
};
