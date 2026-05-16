const fs = require('fs');
const path = require('path');

// ADDRESS REPLACEMENT
const oldAddress = /# 90, Smart Avenue,\s*<br>\s*5th Floor, Coles Road, Frazer Town Bangalore - 560005/gi;
const oldAddressNoBr = /# 90, Smart Avenue, 5th Floor, Coles Road, Frazer Town Bangalore - 560005/gi;
const newAddress = 'Plot No 7, Ganga Niwas, Opposite Vaishnavi Hardware, Near Vitoba Lawn, Pipla Road, Pipla, Nagpur-440034, Maharashtra';

// PHONE REPLACEMENT
const oldPhone1 = /\+91\s*9590666333/g;
const oldPhone2 = /\+91\s*7204422577/g;
const oldPhoneLink1 = /9590666333/g; // Catching tel: and wa.me links
const oldPhoneLink2 = /7204422577/g;
const newPhone = '+91 9765974946';
const newPhoneLink = '9765974946';

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

console.log("--- STARTING GLOBAL UPDATE ---");

walkDir('./', (filePath) => {
    if (filePath.endsWith('.html')) {
        let content = fs.readFileSync(filePath, 'utf8');
        let originalContent = content;

        // Replace Address
        content = content.replace(oldAddress, newAddress);
        content = content.replace(oldAddressNoBr, newAddress);

        // Replace Phone Text
        content = content.replace(oldPhone1, newPhone);
        content = content.replace(oldPhone2, newPhone);

        // Replace Phone Links (tel: and whatsapp)
        content = content.replace(oldPhoneLink1, newPhoneLink);
        content = content.replace(oldPhoneLink2, newPhoneLink);

        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`UPDATED: ${filePath}`);
        }
    }
});

console.log("--- FINISHED! All info updated. ---");
