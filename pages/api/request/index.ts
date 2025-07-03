import mailTransporter from "../../../src/services/nodemailer";
import fs from "fs";
import { toBase64 } from "../../../src/utils";

export default async function handler(req: any, res: any) {
  try {
    const { subject, email, name, service, phone, company, message, file } =
      JSON.parse(req.body);

    let html = `
    <bold>Avsenderens navn: </bold><p>${name}</p>
    <br />
    <bold>Avsenderens epost: </bold><p>${email}</p>
    <br />
    <bold>Avsenderens telefon: </bold><p>${phone}</p>
    `;

    if (company) {
      html += `
      <br />
      <bold>Bedrift: </bold><p>${company}</p>
      `;
    }

    if (service) {
      html += `
      <br />
      <bold>Etterspurt tjeneste: </bold><p>${service}</p>
      `;
    }

    if (message) {
      html += `
      <br />
      <bold>Melding: </bold><br /><p>${message}</p>
      `;
    }

    await mailTransporter.sendMail({
      from: process.env.MAIL_ADDRESS,
      to: process.env.MAIL_RECIPIENT,
      subject: `Ny forespørsel: ${subject} | wman.no`,
      html,
      ...(file && {
        attachments: [
          {
            filename: file.name,
            path: file.content,
          },
        ],
      }),
    });

    res.status(200).json("OK");
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ statusCode: 500, message: "Something went wrong" });
  }
}
