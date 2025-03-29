import UserModel from "../models/userModel";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { getAccesstoken } from "../utils/getAccesstoken";
import { generatorRandomText } from "../utils/generatorRandomText";
dotenv.config();
const register = async (req: any, res: any) => {
  const body = req.body;
  const { name, email, password } = body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      throw new Error(`Tai khoan da ton tai`);
    }
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);
    body.password = hashpassword;
    const newUser: any = new UserModel(body);
    await newUser.save();
    delete newUser._doc.password;
    res.status(200).json({
      message: "Register",
      data: {
        ...newUser,
        token: await getAccesstoken({
          _id: newUser._id,
          email: newUser.email as string,
          rule: 1,
        }),
      },
    });
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
};
const login = async (req: any, res: any) => {
  const body = req.body;
  const { email, password } = body;
  try {
    const user: any = await UserModel.findOne({ email });

    if (!user) {
      throw new Error(`Tài khoản không tồn tại`);
    }
    const hashpassword = await bcrypt.compare(password, user.password);
    if (!hashpassword) {
      throw new Error(`Tên đăng nhập hoặc mật khẩu không đúng`);
    }
    delete user._doc.password;
    res.status(200).json({
      message: "Login successfuly",
      data: {
        ...user._doc,
        token: await getAccesstoken({
          _id: user._id,
          email: user.email,
          rule: user.rule ?? 1,
        }),
      },
    });
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
};
const loginWithGoogle = async (req: any, res: any) => {
  const body = req.body;
  const { name, email, photoURL } = body;
  try {
    const user: any = await UserModel.findOne({ email });
    if (user) {
      delete user._doc.password;
      res.status(200).json({
        message: "Login Google successfully",
        data: {
          ...user._doc,
          token: await getAccesstoken({
            _id: user._id,
            email: user.email,
            rule: user.rule ?? 1,
          }),
        },
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashpassword = await bcrypt.hash(generatorRandomText(6), salt);
      body.password = hashpassword;
      const newUser: any = new UserModel(body);
      await newUser.save();
      delete newUser._doc.password;
      res.status(200).json({
        message: "Login Google successfully",
        data: {
          ...newUser._doc,
          token: await getAccesstoken({
            _id: newUser._id,
            email: newUser.email,
            rule: 1,
          }),
        },
      });
    }
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
};
export { register, login, loginWithGoogle };
