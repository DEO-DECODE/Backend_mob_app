import { errorHandler } from "../middlewares/errorHandler.js";
// export const makePayment = async (req, res) => {
//   try {
//     const amount = req.body.amount * 100;
//     const options = {
//       amount: amount,
//       currency: "INR",
//       receipt: "d.jrajsingh81@gmail.com",
//     };
//     razorpayInstance.orders.create(options, (err, order) => {
//       if (!err) {
//         res.status(200).send({
//           success: true,
//           msg: "Payment Done",
//           order_id: order.id,
//           amount: amount,
//           key_id: RAZORPAY_ID_KEY,
//           product_name: req.body.name,
//           description: req.body.description,
//           contact: "7231950617",
//           name: "Deo Raj",
//           email: "d.jrajsingh81@gmail.com",
//         });
//       } else {
//         return next(errorHandler(400, "Something Went Wrong"));
//       }
//     });
//   } catch (error) {
//     next(error);
//   }
// };
