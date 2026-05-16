const fs = require('fs');
const path = require('path');

// ADDRESS REPLACEMENT
const oldAddress = /# 90, Smart Avenue,\s*<br>\s*5th Floor, Coles Road, Frazer Town Bangalore - 560005/gi;
const oldAddressNoBr = /# 90, Smart Avenue, 5th Floor, Coles Road, Frazer Town Bangalore - 560005/gi;
const newAddress = 'Plot No 7, Ganga Niwas, Opposite Vaishnavi Hardware, Near Vitoba Lawn, Pipla Road, Pipla, Nagpur-440034, Maharashtra';

// PHONE REPLACEMENT
const oldPhone1 = /\+91\s*9590666333/g;
const oldPhone2 = /\+91\s*7204422577/g;
const oldPhoneLink1 = /9590666333/g; 
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

        // Replace Phone
        content = content.replace(oldPhone1, newPhone);
        content = content.replace(oldPhone2, newPhone);
        content = content.replace(oldPhoneLink1, newPhoneLink);
        content = content.replace(oldPhoneLink2, newPhoneLink);

        // Replace Academy Images 1 to 10
        for (let i = 1; i <= 10; i++) {
            const oldImg = new RegExp(`https://makeupstudiobysuu\\.com/wp-content/uploads/2024/03/academy${i}\\.webp`, 'g');
            const newImg = `wp-content/themes/sangpress-2.0/assets/images/${i}.png`;
            content = content.replace(oldImg, newImg);
        }

        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`UPDATED: ${filePath}`);
        }
    }
});

console.log("--- FINISHED! All info and 10 images updated. ---");
