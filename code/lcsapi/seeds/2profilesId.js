const profiles = [];
const totalProfiles = 50;

for (let i = 1; i <= totalProfiles; i++) {
    profiles.push({
        lpa_esim: `lpa-esim-${i}`,
        iccid: `iccid-${i}`,
        imsi: `imsi-${i}`,
        mnc: `mnc-${Math.floor(Math.random() * 100) + 1}`, // Random MNC
        mcc: `mcc-${Math.floor(Math.random() * 100) + 1}`, // Random MCC
        number: `number-${i}`,
        brand: `brand-${Math.floor(Math.random() * 5) + 1}`, // Random brand ID
        ki: `ki-${i}`,
        norm_ref: `norm-ref-${i}`,
        type: 'default',
        countryCode: 'default',
        operator: 'default',
        description: `Description for profile ${i}`,
        status: Math.floor(Math.random() * 2), // Random status 0 or 1
        activeDate: new Date(Date.now() - Math.floor(Math.random() * 10000000000)), // Random date in the past
        created_at: new Date(),
        updated_at: new Date(),
    });
}

exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('profilesId').del()
        .then(function () {
            // Inserts seed entries
            return knex('profilesId').insert(profiles);
        });
};
