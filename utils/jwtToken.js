export const sendToken = async (user, statusCode, res, message) => {
  try {
    const token = user.getJWTToken();
    const options = {
      httpOnly: true,
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
    };
    res.status(statusCode).cookie("token", token, options).json({
      user,
      token,
      message,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
