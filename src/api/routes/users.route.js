const express = require("express");

const userController = require("../controllers/user");

const router = express.Router();

const { auth } = require("../middlewares/auth.middleware");
const admin = require("../middlewares/admin.middleware");

router.post("/resete", auth, userController.userController.resetPassword);
/**
 *  @swagger
 *  /api/getUserById:
 *    get:
 *      description: Affichage d'un User à partir de son id
 *      parameters:
 *        - in : body
 *          name: user
 *          schema:
 *            type: object
 *            required:
 *              - IdUser
 *            properties:
 *              IdUser:
 *                type: Integer
 */
router.get("/", userController.userController.getUser);

router.get("/admin", [auth, admin], userController.userController.getUsers);
router.get("/logout", [auth], userController.userController.logout);
router.patch("/update", auth, userController.userController.update);
router.patch(
  "/role/:id",
  [auth, admin],
  userController.userController.updateRole
);

router.delete(
  "/delete/:id",
  [auth, admin],
  userController.userController.delete
);

router.post("/login", userController.userController.authentification); // localhost:5000/api/login
/**
 *  @swagger
 *  /api/register/:
 *    post:
 *      description: Enregistrement d'un nouveau user
 *      parameters:
 *        - in : body
 *          name: user
 *          schema:
 *            type: object
 *            required:
 *              - fullName
 *              - email
 *              - phoneNumber
 *              - city
 *              - state
 *              - country
 *              - occupation
 *              - password
 *            properties:
 *              fullName:
 *                type: string
 *              email:
 *                type: string
 *              password:
 *                type: string
 *              phoneNumber:
 *                type: string
 *              city:
 *                type: string
 *              state:
 *                occupation: string
 *              country:
 *                type: string
 *      responses:
 *        '406':
 *          description: This email already exists
 *        '405':
 *          description: Invalid email
 *        '204':
 *          description: Invalid Data
 *        '400':
 *          description: Password must be at least 6 characters
 *        '201':
 *          description: Registration completed successfully
 */
router.post("/register", userController.userController.inscription);
router.delete("/deleteAll", userController.userController.deleteAll);
/**
 *  @swagger
 *  /api/getUsers:
 *    get:
 *      description: Affichage des différents Users
 */
router.get("/getAll", userController.userController.getAll);
// for forget password
router.post("/forgotPassword", userController.userController.passwordForgot); // localhost:5000/api/forgotPassword
router.post(
  "/updatePassword/:id/:token",
  userController.userController.updatePassord
);

//for validation

router.patch("/validation/:email", userController.userController.validation);

module.exports = router;
