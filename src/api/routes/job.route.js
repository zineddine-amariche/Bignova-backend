const express = require("express");
const jobControlleur = require("../controllers/job.con");
const { auth } = require("../middlewares/auth.middleware");
const admin = require("../middlewares/admin.middleware");

const router = express.Router();
/**
 *  @swagger
 *  /api/registerJob:
 *    post:
 *      description: Enregistrement d'un nouveau job
 *      parameters:
 *        - in : body
 *          name: job
 *          schema:
 *            type: object
 *            required:
 *              - contract
 *              - title
 *              - createdAt
 *              - content
 *            properties:
 *              contract:
 *                type: string
 *              title:
 *                type: string
 *              createdAt:
 *                type: string
 *              content:
 *                type: string
 *      responses:
 *        '404':
 *          description: Le job existe déjà
 *        '400':
 *          description: Le champ est vide
 *        '201':
 *          description: Le job a était ajouter correctement
 */
router.post("/registerJob", auth, admin, jobControlleur.registerJob);
/**
 *  @swagger
 *  /api/getJobs:
 *    get:
 *      description: Affichage des différents jobs
 *      responses:
 *        '200':
 *          description: Successfuly
 */
router.get("/getJobs", jobControlleur.getJobs);
/**
 *  @swagger
 *  /api/setJob/:id:
 *    put:
 *      description: Modification d'un job
 *      parameters:
 *        - in : body
 *          name: job
 *          schema:
 *            type: object
 *            required:
 *              - contract
 *              - title
 *              - createdAt
 *              - content
 *            properties:
 *              contract:
 *                type: string
 *              title:
 *                type: string
 *              createdAt:
 *                type: string
 *              content:
 *                type: string
 *        - in : params
 *          name: job
 *          schema:
 *            type: object
 *            required:
 *              - id
 *            properties:
 *              id:
 *                type: Integer
 *      responses:
 *        '201':
 *          description: Le job a était bien modifier
 *        '404':
 *          description: Le job n'éxiste pas
 *        '401':
 *          description: le title de job existe déjà
 *        '400':
 *          description: le champ est vide
 *        '403':
 *          description: le id est invalide
 */
router.put("/setJob/:id", auth, admin, jobControlleur.setJob);
/**
 *  @swagger
 *  /api/getJob/:id:
 *    get:
 *      description: Affichage d'un job byId
 *      parameters:
 *        - in : params
 *          name: job
 *          schema:
 *            type: object
 *            required:
 *              - id
 *            properties:
 *              id:
 *                type: Integer
 *      responses:
 *        '200':
 *          description: Successfuly
 *        '403':
 *          description: le id est invalide
 */
router.get("/getJob/:id", auth, jobControlleur.getJob);
/**
 *  @swagger
 *  /api/deleteJob/:id:
 *    delete:
 *      description: Suppression d'un job
 *      parameters:
 *        - in : params
 *          name: job
 *          schema:
 *            type: object
 *            required:
 *              - id
 *            properties:
 *              id:
 *                type: Integer
 *      responses:
 *        '201':
 *          description: Le job a était supprimer
 *        '404':
 *          description: Le job n'éxiste pas
 *        '403':
 *          description: le id est invalide
 */
router.delete("/deleteJob/:id", auth, admin, jobControlleur.deleteJob);
/**
 *  @swagger
 *  /api/deleteJobs(deleteAll):
 *    delete:
 *      description: Suppression de tout les Jobs
 *      responses:
 *        '200':
 *          description: delete all jobs successfully
 */
router.delete("/deleteJobs", auth, admin, jobControlleur.deleteJobs);
module.exports = router;
