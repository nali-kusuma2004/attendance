import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "nalikusuma2004@gmail.com",
    pass: "NAlikusuma1234&&",
  },
});