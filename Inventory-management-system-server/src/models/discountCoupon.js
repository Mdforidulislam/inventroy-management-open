const { Schema, model } = require("mongoose");

const couponSchema = new Schema({
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  }
});

const Coupon = model('discountCoupon', couponSchema);

module.exports = Coupon;