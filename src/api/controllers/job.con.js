const { default: mongoose } = require("mongoose");
const Job = require("../models/job");
const Recrutement = require("../models/recrutement");
const User = require("../models/user.model");
const ObjectId = require("mongoose");
exports.registerJob = async (req, res) => {
  try {
    if (!req.body.title || !req.body.contract || !req.body.content)
      return res.status(400).json({ error: "le champ est vide" });

    let job = await Job.findOne({ title: req.body.title });
    if (job) return res.status(404).json({ error: "le job existe déjà " });
    const user = await User.findOne(req.user.role).populate("job");

    job = new Job({
      title: req.body.title,
      content: req.body.content,
      contract: req.body.contract,
      createdAt: Date(),
      createdBy: user,
    });

    await job.save();
    res.status(201).json({ message: "le job a était ajouter correctement" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "erreur de serveur" });
  }
};
exports.getJobs = async (req, res) => {
  try {
    const job = await Job.find()
      .select("-__v")
      .populate("recrutements", "-__v")
      .populate("createdBy", "-password -__v");

    res.status(200).json(job);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "erreur de serveur" });
  }
};
exports.setJob = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(403).json({ message: "le id est invalide" });
    const job = await Job.findOne({ _id: req.params.id }).populate(
      "recrutements"
    );

    if (!job) return res.status(404).json({ message: "le job n'éxiste pas" });
    const job1 = await Job.findOne({ title: req.body.title });
    if (job1)
      return res.status(401).json({ message: "le title de job existe déjà" });
    await Recrutement.updateMany(
      { title: job.title },
      { title: req.body.title }
    ).populate("job");
    if (!req.body.title || !req.body.contract || !req.body.content)
      return res.status(400).json({ error: "le champ est vide" });
    job.title = req.body.title;

    job.content = req.body.content;
    job.contract = req.body.contract;
    job.createdAt = Date();

    await job.save();

    res.status(201).json({ message: "le job a était bien modifier" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "erreur de serveur" });
  }
};
exports.getJob = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(403).json({ message: "le id est invalide" });

    let job = await Job.findOne({ _id: req.params.id })
      .select("-__v")
      .populate("recrutements", "-__v")
      .populate("createdBy", "-password -__v");

    if (!job) return res.status(404).json({ message: "le job n'éxiste pas" });
    const re = await Recrutement.find({ title: job.title }).populate("job");
    job.recrutements = re;
    await job.save();
    res.status(200).json(job);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "erreur de serveur" });
  }
};
exports.deleteJob = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(403).json({ message: "le id est invalide" });
    const job = await Job.findOne({ _id: req.params.id }).populate(
      "recrutements"
    );
    if (!job) return res.status(404).json({ message: "le job n'éxiste pas" });
    const re = await Recrutement.deleteMany({ title: job.title });
    await job.delete();

    res.status(201).json({ message: "le job a était bien supprimer" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "erreur de serveur" });
  }
};
exports.deleteJobs = async (req, res) => {
  try {
    await Job.deleteMany({});
    return res.status(200).json({ msg: "delete all jobs successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "erreur de serveur" });
  }
};
