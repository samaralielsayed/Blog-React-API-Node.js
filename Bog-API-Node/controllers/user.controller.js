const {
    createNewUser,
    findUserByEmail,
    findAllUsers,
    updatUsertServise
} = require("../services/user.service");
const {
    validateCreateUser,
    validateUpdateUser
} = require("../validation/users.validator");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");



const createUser = async (req, res) => {

    try {
        const {
            error,
            value
        } = validateCreateUser(req.body);
        if (error) {
            res.status(400).send('Please Enter Valid Data')
            return;
        }

        const passwordHash = await bcrypt.hash(value.password, 10);
        const name = value.name;
        const email = value.email;
        const isAdmin = value.isAdmin;
        const image = value.image;

        const userFind = await findUserByEmail(email);
        if (userFind) {
            return res.status(409).json({
                message: "Email already registered."
            });
            // return res.json({message:"This Email Already Exist, Please Enter Another Email"});
        }


        const newUser = await createNewUser({
            name,
            email,
            image,
            passwordHash,
            isAdmin
        });

        return res.status(201).json({
            status: "success",
            message: "User successfully registered"
        })
    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
}

const login = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Error  Email Or Password"
            });
        }
        const user = await findUserByEmail(email);
        if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
            return res.status(401).json({
                message: "Incorrect Email or Password"
            });
        }
        const token = jwt.sign({
            email
        }, 'jwtSecret', {
            expiresIn: '1h'
        });
        // res.header({jwt:token}).json({message:"Access Granted",email,token:token,status: "success",user:user });
        res.setHeader('Authorization', `Bearer ${token}`);
        res.status(200).json({
            message: "Access Granted",
            email,
            token: token,
            status: "success",
            user: user
        });

    } catch (userLoginError) {
        res.status(500).json(userLoginError.message);

    }
}

const updateCurrentUserProfile = async (req, res) => {

    try {
        const {
            error,
            value
        } = validateUpdateUser(req.body);
        if (error) {
            res.status(400).json({
                message: "Invalid form field.."
            })
            return;
        }

        const user = req.user;
        if (!user) {
            return res.status(404).json("incorrect email")
        }

        if (value.password) {
            const passwordHash = await bcrypt.hash(value.password, 10);
            await updatUsertServise({
                email: user.email
            }, {
                passwordHash
            })
        }

        const fileId = req.fileId
        await updatUsertServise({
            email: user.email
        }, {
            ...req.body,
            fileId
        })
        const updatedUser = await findUserByEmail(user.email);
        res.json({
            status: "success",
            user: updatedUser
        });
    } catch (error) {
        res.status(404).json("Invalid request" + error.message)
        return;
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await findAllUsers();
        res.send({status: "success",users:users});
    } catch (error) {
        res.status(404).json({
            message: 'Invalid request',
            error: error.message
        })
        return;
    }

}
const getCurrentUserProfile = async (req, res) => {
    try {
      const user = req.user;
    
      if (!user) {
        return res.status(404).send("incorrect email");
      }
      
  
      res.send({status: "success",user:user});
    } catch (error) {
      console.log(error.message);
      res.status(500).send("An error occurred while fetching the user profile.");
    }
  };

//   const logoutUser = async (req, res) => {
//     try {
      
//       localStorage.removeItem('token');
   
//       res.send({status: "success",message: "Logout successful"});
//     } catch (error) {
//       console.log(error.message);
//       res.status(500).send("Logout failed");
//     }
//   };

module.exports = {
    createUser,
    login,
    updateCurrentUserProfile,
    getAllUsers,
    getCurrentUserProfile,
    // logoutUser

}