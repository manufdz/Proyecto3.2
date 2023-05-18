const express = require("express");
const User = require("../models/Users");
const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  try {
    const {
      name,
      surname,
      age,
      email,
      phonenumber,
      adress,
      zipcode,
      password,
    } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      return res.status(401).send({
        succes: false,
        message: "Ya hay un usuario creado con este email!",
      });
    }

    if (name.length < 3) {
      return res.status(400).send({
        success: false,
        message: "el nombre es demasiado corto",
      });
    }

    if (name.length > 15) {
      return res.status(400).send({
        success: false,
        message: "el nombre es demasiado largo",
      });
    }

    if (!name) {
      return res.status(400).send({
        success: false,
        message: "el campo (nombre) está vacío",
      });
    }

    if (surname.length < 5) {
      return res.status(400).send({
        success: false,
        message: "el apellido es demasiado corto",
      });
    }

    if (surname.length > 25) {
      return res.status(400).send({
        success: false,
        message: "el apellido es demasiado largo",
      });
    }

    if (!surname) {
      return res.status(400).send({
        success: false,
        message: "el campo (apellido) está vacío",
      });
    }

    if (age < 18) {
      return res.status(400).send({
        success: false,
        message: "debes cumplir la edad mínima para registrate:)",
      });
    }

    if (!age) {
      return res.status(400).send({
        success: false,
        message: "el campo (edad) está vacío",
      });
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      return res.status(400).send({
        success: false,
        message: "La dirección de correo electrónico no es válida.",
      });
    }

    if (!email) {
      return res.status(400).send({
        success: false,
        message: "el campo (email) está vacío",
      });
    }

    if (phonenumber.length < 8) {
      return res.status(400).send({
        success: false,
        message: "número de teléfono demasiado corto",
      });
    }

    if (phonenumber.length > 8) {
      return res.status(400).send({
        success: false,
        message: "número de teléfono demasiado largo",
      });
    }

    if (!phonenumber) {
      return res.status(400).send({
        success: false,
        message: "el campo (teléfono) está vacío",
      });
    }

    if (adress.length < 5) {
      return res.status(400).send({
        success: false,
        message: "la dirección es demasiado corta",
      });
    }

    if (adress.length > 25) {
      return res.status(400).send({
        success: false,
        message: "la dirección es demasiado larga",
      });
    }

    if (!adress) {
      return res.status(400).send({
        success: false,
        message: "el campo (dirección) está vacío",
      });
    }

    if (zipcode.length < 5) {
      return res.status(400).send({
        success: false,
        message: "el zip es demasiado corto",
      });
    }

    if (zipcode.length > 5) {
      return res.status(400).send({
        success: false,
        message: "el zip es demasiado largo",
      });
    }

    if (!zipcode) {
      return res.status(400).send({
        success: false,
        message: "el campo (zip) está vacío",
      });
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;

    if (!passwordRegex.test(password)) {
      return res.status(400).send({
        success: false,
        message: "La contraseña no cumple con los requisitos.",
      });
    }

    if (password.length < 8) {
      return res.status(400).send({
        success: false,
        message: "la contraseña debe incluir al menos 8 caracteres",
      });
    }

    if (!password) {
      return res.status(400).send({
        succes: false,
        message: "el campo (contraseña) está vacío",
      });
    }

    let newUser = new User({
      name,
      surname,
      age,
      email,
      phonenumber,
      adress,
      zipcode,
      password,
    });
    await newUser.save();
    return res.send({
      succes: true,
      newUser,
      message: "usuario creado correctamente!",
    });
  } catch (error) {
    return res.send({
      succes: false,
      message: error.message,
    });
  }
});

userRouter.get("/users", async (req, res) => {
  try {
    const Users = await User.find({});
    return res.send({
      succes: true,
      message: "aqui estan todos los usuarios de la BD",
      Users,
    });
  } catch (error) {
    return res.send({
      succes: false,
      message: error.message,
    });
  }
});
userRouter.get("/user/:userID", async (req, res) => {
  try {
    const { userID } = req.params;
    const user = await User.findById(userID);
    return res.send({
      succes: true,
      message: "ususario encontrado!",
      user,
    });
  } catch (error) {
    return res.send({
      succes: false,
      message: error.message,
    });
  }
});

userRouter.delete("/user/:userID", async (req, res) => {
  try {
    const { userID } = req.params;
    await User.findByIdAndDelete(userID);
    return res.send({
      succes: true,
      message: "usuario borrado de la BD.",
    });
  } catch (error) {
    return res.send({
      succes: false,
      message: error.message,
    });
  }
});

userRouter.put("/user/:userID", async (req, res) => {
  try {
    const { userID } = req.params;
    const { age, email } = req.body;
    await User.findByIdAndUpdate(userID, { age, email });
    return res.send({
      succes: true,
      message: "datos de usuario actualizados en la BD.",
    });
  } catch (error) {
    return res.send({
      succes: false,
      message: error.message,
    });
  }
});

module.exports = userRouter;
