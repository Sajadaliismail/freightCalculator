export const importZones = {
  Afghanistan: 7,
  Albania: 7,
  Algeria: 8,
  "American Samoa": 8,
  Andorra: 7,
  Angola: 8,
  Anguilla: 8,
  Antigua: 8,
  Argentina: 8,
  Armenia: 8,
  Aruba: 8,
  Australia: 6,
  Austria: 7,
  Azerbaijan: 8,
  Bahamas: 8,
  Bahrain: 1,
  Bangladesh: 2,
  Barbados: 8,
  Belarus: 7,
  Belgium: 4,
  Belize: 8,
  Benin: 8,
  Bermuda: 8,
  Bhutan: 6,
  Bolivia: 8,
  Bonaire: 8,
  "Bosnia & Herzegovina": 7,
  Botswana: 8,
  Brazil: 7,
  Brunei: 6,
  Bulgaria: 7,
  "Burkina Faso": 8,
  "Burma (Myanmar)": 6,
  Burundi: 8,
  Cambodia: 6,
  Cameroon: 8,
  Canada: 5,
  "Canary Islands, The": 7,
  "Cape Verde": 8,
  "Cayman Islands": 8,
  "Central African Republic": 8,
  Chad: 8,
  Chile: 8,
  China: 9,
  Colombia: 8,
  Comoros: 8,
  Congo: 8,
  "Cook Islands": 8,
  "Costa Rica": 8,
  Croatia: 7,
  Cuba: 8,
  Curacao: 8,
  Cyprus: 7,
  "Czech Republic, The": 7,
  Denmark: 7,
  Djibouti: 8,
  Dominica: 8,
  "Dominican Republic": 8,
  "East Timor": 6,
  Ecuador: 8,
  Egypt: 1,
  "El Salvador": 8,
  "Equatorial Guinea": 8,
  Eritrea: 8,
  Estonia: 7,
  Ethiopia: 8,
  "Falkland Islands": 8,
  "Faroe Islands": 8,
  "Fiji Islands": 8,
  Finland: 7,
  France: 1,
  "French Guiana": 8,
  Gabon: 8,
  Gambia: 8,
  Georgia: 8,
  Germany: 4,
  Ghana: 8,
  Gibraltar: 7,
  Greece: 7,
  Greenland: 8,
  Grenada: 8,
  Guadeloupe: 8,
  Guam: 8,
  Guatemala: 8,
  Guernsey: 7,
  "Guinea Bissau": 8,
  "Guinea Republic": 8,
  Guyana: 8,
  Haiti: 8,
  "Honduras Republic": 8,
  "Hong Kong": 10,
  Hungary: 7,
  Iceland: 7,
  India: 1,
  Indonesia: 6,
  Iran: 3,
  Iraq: 7,
  Ireland: 4,
  Israel: 8,
  Italy: 4,
  "Ivory Coast": 8,
  Jamaica: 8,
  Japan: 6,
  Jersey: 7,
  Jordan: 3,
  Kazakhstan: 8,
  Kenya: 8,
  Kiribati: 8,
  "Korea, North": 6,
  "Korea, South": 6,
  Kosovo: 8,
  Kuwait: 1,
  Kyrgystan: 8,
  Laos: 6,
  Latvia: 7,
  Lebanon: 3,
  Lesotho: 8,
  Liberia: 8,
  Libya: 8,
  Liechtenstein: 4,
  Lithuania: 7,
  Luxembourg: 4,
  Macau: 8,
  Macedonia: 7,
  Madagascar: 8,
  Malawi: 8,
  Malaysia: 6,
  Maldives: 8,
  Mali: 8,
  Malta: 7,
  "Marshall Islands": 8,
  Martinique: 8,
  Mauritania: 8,
  Mauritius: 8,
  Mayotte: 8,
  Mexico: 8,
  "Moldova, Republic Of": 7,
  Monaco: 1,
  Mongolia: 7,
  Montenegro: 7,
  Montserrat: 8,
  Morocco: 8,
  Mozambique: 8,
  Namibia: 8,
  Nauru: 8,
  Nepal: 6,
  Netherlands: 4,
  Nevis: 8,
  "New Caledonia": 8,
  "New Zealand": 6,
  Nicaragua: 8,
  Niger: 8,
  Nigeria: 8,
  Niue: 8,
  Norway: 7,
  Oman: 1,
  Pakistan: 1,
  Panama: 8,
  "Papua New Guinea": 8,
  Paraguay: 8,
  Peru: 8,
  Philippines: 1,
  Poland: 7,
  Portugal: 7,
  "Puerto Rico": 8,
  Qatar: 1,
  "Reunion, Island Of": 8,
  Romania: 7,
  "Russian Federation": 7,
  Rwanda: 8,
  Saipan: 8,
  Samoa: 8,
  "San Marino": 8,
  "Sao Tome & Principe": 8,
  "Saudi Arabia": 3,
  Senegal: 8,
  Serbia: 7,
  Seychelles: 8,
  "Sierra Leone": 8,
  Singapore: 1,
  Slovakia: 7,
  Slovenia: 7,
  "Solomon Islands": 8,
  Somalia: 8,
  Somaliland: 8,
  "South Africa": 7,
  "South Sudan": 8,
  Spain: 7,
  "Sri Lanka": 2,
  "St. Barthelemy": 8,
  "St. Eustatius": 8,
};

export const zoneRates = [
  120, 120, 140, 145, 190, 314.25, 345.75, 130, 140, 120,
];

export const countryNames = Object.keys(importZones);

export const validateData = (data) => {
  const error = {};
  console.log(data);
  let err = false;
  if (data.selectedExport === data.selectedImport) {
    error.countrySelected = true;
    err = true;
  }
  for (const [key, value] of Object.entries(data)) {
    if (!value) {
      error[key] = true;
      err = true;
    }
  }
  return { error, err: err };
};

export const calculatePrice = (data) => {
  const zoneRates = [120, 120, 140, 145, 190, 314.25, 345.75, 130, 140, 120];
  let country;
  const extraRates = [
    33.75, 19.5, 33, 36.75, 50.25, 74.25, 81.75, 15.75, 19.5, 25.5,
  ];
  const volume = (data.length * data.width * data.height) / 1000;
  if (data.mode === "import") country = data.selectedImport;
  else if (data.mode === "export") country = data.selectedExport;
  const rate = importZones[country];
  const finalRate = zoneRates[rate];
  if (volume > data.weight) {
    if (volume <= 70) return volume * finalRate;
    else {
      let extraVolume = Math.floor((volume - 70) / 0.5);
      return (extraVolume + volume) * finalRate;
    }
  } else {
    if (data.weight <= 70) return data.weight * finalRate;
    else {
      let extraWeight = Math.floor((data.weight - 70) / 0.5);
      return (extraWeight + data.weight) * finalRate;
    }
  }
};
