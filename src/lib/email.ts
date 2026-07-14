import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

interface BookingDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  endTime: string;
  services: Array<{ name: string; price: number; duration: number }>;
  total: number;
  note?: string;
}

const moisFR = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
const joursFR = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];

function formatDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  return `${joursFR[d.getDay()]} ${d.getDate()} ${moisFR[d.getMonth()]} ${d.getFullYear()}`;
}

export async function sendBookingEmailToOwner(booking: BookingDetails) {
  const servicesHtml = booking.services
    .map((s) => `<tr><td style="padding:8px 0;border-bottom:1px solid #eee">${s.name}</td><td style="padding:8px 0;border-bottom:1px solid #eee;text-align:right">${s.duration} min</td><td style="padding:8px 0;border-bottom:1px solid #eee;text-align:right;font-weight:600">${s.price}€</td></tr>`)
    .join("");

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#fff">
      <div style="background:#000;color:#fff;padding:30px;text-align:center">
        <h1 style="font-size:18px;font-weight:300;letter-spacing:3px;margin:0">NOUVELLE RÉSERVATION</h1>
      </div>
      <div style="padding:30px">
        <h2 style="font-size:14px;color:#999;text-transform:uppercase;letter-spacing:2px;margin:0 0 15px">Client</h2>
        <p style="margin:0 0 5px;font-size:16px"><strong>${booking.firstName} ${booking.lastName}</strong></p>
        <p style="margin:0 0 5px;color:#666">${booking.email}</p>
        <p style="margin:0 0 20px;color:#666">${booking.phone}</p>

        <h2 style="font-size:14px;color:#999;text-transform:uppercase;letter-spacing:2px;margin:0 0 15px">Date & Heure</h2>
        <p style="margin:0 0 20px;font-size:16px"><strong>${formatDate(booking.date)}</strong> · ${booking.time} - ${booking.endTime}</p>

        <h2 style="font-size:14px;color:#999;text-transform:uppercase;letter-spacing:2px;margin:0 0 15px">Prestation(s)</h2>
        <table style="width:100%;border-collapse:collapse;margin:0 0 10px">
          ${servicesHtml}
          <tr><td style="padding:12px 0;font-weight:700">Total</td><td></td><td style="padding:12px 0;text-align:right;font-weight:700;font-size:18px">${booking.total}€</td></tr>
        </table>

        ${booking.note ? `<h2 style="font-size:14px;color:#999;text-transform:uppercase;letter-spacing:2px;margin:20px 0 10px">Note du client</h2><p style="margin:0;color:#666;font-style:italic">${booking.note}</p>` : ""}
      </div>
      <div style="background:#f8f8f8;padding:20px;text-align:center;font-size:12px;color:#999">
        LH Medical Aesthetics · Rue d'Amercoeur 21/32, 4020 Liège
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"LH Medical Aesthetics" <${process.env.EMAIL_USER}>`,
    to: "lola.lila05@hotmail.com",
    subject: `Nouvelle réservation — ${booking.firstName} ${booking.lastName} · ${formatDate(booking.date)} à ${booking.time}`,
    html,
  });
}

export async function sendBookingConfirmationToClient(booking: BookingDetails) {
  const servicesHtml = booking.services
    .map((s) => `<tr><td style="padding:8px 0;border-bottom:1px solid #eee">${s.name}</td><td style="padding:8px 0;border-bottom:1px solid #eee;text-align:right">${s.duration} min</td><td style="padding:8px 0;border-bottom:1px solid #eee;text-align:right;font-weight:600">${s.price}€</td></tr>`)
    .join("");

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#fff">
      <div style="background:#000;color:#fff;padding:30px;text-align:center">
        <h1 style="font-size:18px;font-weight:300;letter-spacing:3px;margin:0">CONFIRMATION DE RENDEZ-VOUS</h1>
      </div>
      <div style="padding:30px">
        <p style="font-size:16px;margin:0 0 25px">Bonjour <strong>${booking.firstName}</strong>,</p>
        <p style="color:#666;line-height:1.6;margin:0 0 25px">Votre rendez-vous chez LH Medical Aesthetics a bien été enregistré. Voici les détails :</p>

        <div style="background:#f8f8f8;padding:20px;margin:0 0 25px">
          <p style="margin:0 0 10px;font-size:16px"><strong>${formatDate(booking.date)}</strong></p>
          <p style="margin:0;font-size:16px;color:#666">${booking.time} - ${booking.endTime}</p>
        </div>

        <h2 style="font-size:14px;color:#999;text-transform:uppercase;letter-spacing:2px;margin:0 0 15px">Prestation(s)</h2>
        <table style="width:100%;border-collapse:collapse;margin:0 0 10px">
          ${servicesHtml}
          <tr><td style="padding:12px 0;font-weight:700">Total</td><td></td><td style="padding:12px 0;text-align:right;font-weight:700;font-size:18px">${booking.total}€</td></tr>
        </table>

        <p style="color:#666;font-size:14px;margin:25px 0 0">Paiement sur place.</p>

        <div style="margin:30px 0;padding:20px;border:1px solid #eee">
          <p style="margin:0 0 5px;font-size:14px;color:#999">Adresse</p>
          <p style="margin:0;font-weight:500">Rue d'Amercoeur 21/32, 4020 Liège</p>
          <p style="margin:10px 0 0;font-size:14px;color:#999">Téléphone</p>
          <p style="margin:0;font-weight:500">+32 497 38 86 44</p>
        </div>

        <p style="color:#999;font-size:13px;line-height:1.6;margin:0">Pour annuler ou modifier votre rendez-vous, contactez-nous par téléphone ou par email.</p>
      </div>
      <div style="background:#f8f8f8;padding:20px;text-align:center;font-size:12px;color:#999">
        LH Medical Aesthetics · Rue d'Amercoeur 21/32, 4020 Liège
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"LH Medical Aesthetics" <${process.env.EMAIL_USER}>`,
    to: booking.email,
    subject: `Votre rendez-vous — ${formatDate(booking.date)} à ${booking.time}`,
    html,
  });
}
