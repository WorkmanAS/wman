import mailTransporter from "../../../src/services/nodemailer";

export default async function handler(req: any, res: any) {
  try {
    const { name, phone } = JSON.parse(req.body);

    await mailTransporter.sendMail({
      from: process.env.MAIL_ADDRESS,
      to: process.env.MAIL_RECIPIENT,
      subject: "Ny forespørsel | wman.no",
      text: name + " " + "ber om å ringe tilbake på " + phone,
    });

    res.status(200).json("OK");
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: "Something went wrong" });
  }
}
