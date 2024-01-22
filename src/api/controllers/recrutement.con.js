const Job = require("../models/job");
const Recrutement = require("../models/recrutement");
exports.registerRecrue = async (req, res) => {
  try {
    if (
      !req.body.fullName ||
      !req.body.email ||
      !req.file ||
      !req.body.about ||
      !req.body.phoneNumber ||
      !req.body.city ||
      !req.body.state ||
      !req.body.country
    )
      return res.status(401).json({ error: "le champ est vide" });
    const re = await Recrutement.findOne({ email: req.body.email });
    if (re) return res.status(404).json({ error: "le candidat existe déjà" });
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(403).json({ message: "le id est invalide" });
    const job = await Job.findById({ _id: req.params.id }).populate(
      "recrutements"
    );
    if (!job) return res.status(400).json({ message: "le job n'éxiste pas" });
    const re1 = new Recrutement({
      title: job.title,
      fullName: req.body.fullName,
      email: req.body.email,
      about: req.body.about,
      phoneNumber: req.body.phoneNumber,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
      cv: req.file.filename,
    });
    await re1.save();
    res
      .status(201)
      .json({ message: "le candidat a était ajouter correctement" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "erreur de serveur" });
  }
};
exports.getRecrues = async (req, res) => {
  try {
    const re = await Recrutement.find().select("-__v").populate("job");
    re.cv = "http://localhost:8001/" + re.cv;
    console.log(re);
    res.status(200).json(re);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "erreur de serveur" });
  }
};
exports.getRecrue = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(403).json({ message: "le id est invalide" });
    const re = await Recrutement.findOne({ _id: req.params.id })
      .select("-__v")
      .populate("job");
    if (!re)
      return res.status(404).json({ message: "le candidat n'éxiste pas" });
    re.cv = "http://localhost:8001/" + re.cv;
    res.status(200).json(re);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "erreur de serveur" });
  }
};
exports.setStatus = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(403).json({ message: "le id est invalide" });
    const re = await Recrutement.findOne({ _id: req.params.id });
    if (!re)
      return res.status(404).json({ message: "le candidat n'éxiste pas" });
    if (
      (re.status === "pending" && req.body.status === "brouillon") ||
      (re.status === "validated" && req.body.status === "brouillon") ||
      (re.status === "refused" && req.body.status === "brouillon") ||
      (re.status === "validated" && req.body.status === "pending") ||
      (re.status === "refused" && req.body.status === "pending") ||
      (re.status === "refused" && req.body.status === "validated") ||
      (re.status === "validated" && req.body.status === "refused")
    )
      return res.status(400).json({ message: "Bad request" });
    re.status = req.body.status;
    await re.save();
    res
      .status(201)
      .json({ message: "le status de l'utilisateur a était bien modifier" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "erreur de serveur" });
  }
};
exports.deleteRecrue = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(403).json({ message: "le id est invalide" });
    const re = await Recrutement.findOneAndDelete({ _id: req.params.id });
    if (!re) return res.status(404).json({ message: "la recrue n'éxiste pas" });

    res.status(201).json({ message: "la recrue a était bien supprimer" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "erreur de serveur" });
  }
};
exports.deleteRecrues = async (req, res) => {
  try {
    await Recrutement.deleteMany({});
    return res
      .status(200)
      .json({ msg: "delete all recrutements successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "erreur de serveur" });
  }
};
