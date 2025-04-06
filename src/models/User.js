import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  name: { type: String },
  avatar: { type: String },
  credits: { type: Number, required: true, default: 1000 },
  gender: { type: String, enum: ["erkek", "kadın", "diğer"] },
  birthDate: { type: Date },
  zodiacSign: { type: String },
}, { timestamps: true });

function getZodiacSign(date) {
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1;

  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Kova";
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return "Balık";
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Koç";
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Boğa";
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "İkizler";
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Yengeç";
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Aslan";
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Başak";
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Terazi";
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Akrep";
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Yay";
  return "Oğlak";
}

UserSchema.pre("save", function (next) {
  if (this.birthDate) {
    this.zodiacSign = getZodiacSign(this.birthDate);
  }
  next();
});

UserSchema.set('toJSON', {
  transform: function (doc, ret) {
    const formatDate = (date) =>
      new Date(date).toLocaleString("tr-TR", {
        timeZone: "Europe/Istanbul"
      });

    if (ret.birthDate) ret.birthDate = formatDate(ret.birthDate);
    if (ret.createdAt) ret.createdAt = formatDate(ret.createdAt);
    if (ret.updatedAt) ret.updatedAt = formatDate(ret.updatedAt);

    return ret;
  }
});



export default mongoose.model("User", UserSchema);
