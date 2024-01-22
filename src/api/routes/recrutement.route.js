const express = require("express");
const recrutControlleur = require("../controllers/recrutement.con");
const multer = require("../middlewares/multer");
const { auth } = require("../middlewares/auth.middleware");
const admin = require("../middlewares/admin.middleware");
const router = express.Router();
/**
 *  @swagger
 *  /api/registerRecrue/:idJob:
 *    post:
 *      description: Enregistrement d'un nouveau candidat
 *      parameters:
 *        - in : body
 *          name: recrutement
 *          schema:
 *            type: object
 *            required:
 *              - fullName
 *              - emailCandidat
 *              - cv
 *              - phoneNumber
 *              - city
 *              - state
 *              - country
 *              - about
 *            properties:
 *              fullName:
 *                type: string
 *              emailCandidat:
 *                type: string
 *              cv:
 *                type: string
 *              phoneNumber:
 *                type: string
 *              city:
 *                type: string
 *              state:
 *                type: string
 *              country:
 *                type: string
 *              about:
 *                type: string
 *        - in : params
 *          name: job
 *          schema:
 *            type: object
 *            required:
 *              - idJob
 *            properties:
 *              idJob:
 *                type: Integer
 *      responses:
 *        '201':
 *          description: Le candidat a était ajouter correctement
 *        '404':
 *          description: Candidat éxiste déjà
 *        '400':
 *          description: Le job n'éxiste pas
 *        '401':
 *          description: Le champ est vide
 *        '403':
 *          description: le id est invalide
 */
router.post(
  "/registerRecrue/:id",
  multer,

  recrutControlleur.registerRecrue
);
/**
 *  @swagger
 *  /api/getRecrues:
 *    get:
 *      description: Affichage des différents candidats
 *      parameters:
 *        - in : body
 *          name: job
 *          schema:
 *            type: object
 *            required:
 *              - title
 *            properties:
 *              title:
 *                type: String
 *      responses:
 *        '200':
 *          description: Successfuly
 */
router.get("/getRecrues", auth, recrutControlleur.getRecrues);
/**
 *  @swagger
 *  /api/getRecrue/:id:
 *    get:
 *      description: Affichage d'un candidat byId
 *      parameters:
 *        - in : params
 *          name: recrutement
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
 *        '404':
 *          description: Candidat n'éxiste pas
 *        '403':
 *          description: le id est invalide
 */
router.get("/getRecrue/:id", auth, recrutControlleur.getRecrue);
/**
 *  @swagger
 *  /api/setStatus(recrue)/:id:
 *    put:
 *      description: Modification de status d'un candidat
 *      parameters:
 *        - in : body
 *          name: recrutement
 *          schema:
 *            type: object
 *            required:
 *              - status
 *            properties:
 *              status:
 *                type: string
 *        - in : params
 *          name: recrutement
 *          schema:
 *            type: object
 *            required:
 *              - id
 *            properties:
 *              id:
 *                type: Integer
 *      responses:
 *        '201':
 *          description: Le status a était bien modifier
 *        '404':
 *          description: Candidat n'éxiste pas
 *        '400':
 *          description: Bad request
 *        '403':
 *          description: le id est invalide
 */
router.put("/status/:id", auth, admin, recrutControlleur.setStatus);
/**
 *  @swagger
 *  /api/deleteRecrue/:id:
 *    delete:
 *      description: Suppression d'une recrue
 *      parameters:
 *        - in : params
 *          name: recrutement
 *          schema:
 *            type: object
 *            required:
 *              - id
 *            properties:
 *              id:
 *                type: Integer
 *      responses:
 *        '201':
 *          description: La recrue a était supprimer
 *        '404':
 *          description: La recrue n'éxiste pas
 *        '403':
 *          description: le id est invalide
 */
router.delete("/deleteRecrue/:id", auth, admin, recrutControlleur.deleteRecrue);
/**
 *  @swagger
 *  /api/deleteRecrues(deleteAll):
 *    delete:
 *      description: Suppression de tout les Recrues
 *      responses:
 *        '200':
 *          description: delete all recrues successfully
 */
router.delete("/deleteRecrues", auth, admin, recrutControlleur.deleteRecrues);
module.exports = router;
