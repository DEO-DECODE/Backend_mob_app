export const sendToken = async (user, statusCode, res, message, next) => {
  try {
    const token = user.getJWTToken();
    const options = {
      httpOnly: true,
      expires: new Date(
        // Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        Date.now() + 15 * 24 * 60 * 60 * 1000
      ),
    };
    const { password, ...userWithoutPassword } = user.toObject();
    console.log(userWithoutPassword);
    res.status(statusCode).cookie("token", token, options).json({
      user: userWithoutPassword,
      message,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
