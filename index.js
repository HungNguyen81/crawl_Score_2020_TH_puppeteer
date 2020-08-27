const puppeteer = require('puppeteer');
const fs = require('fs');
var num = '';
var sbd = '';
var toan = '';
var van = '';
var nn = '';
var vatly = '';
var hoahoc = '';
var sinhhoc = '';
var lichsu = '';
var dialy = '';
var gdcd = '';
var data = [];

(async () => {
    var browser = puppeteer.launch({ headless: false });
    var page = await (await browser).newPage();


    for (let i = 28000001; i <= 28034923; i++) {
        await (await page).goto(`https://www.tienphong.vn/tra-cuu-diem-thi.tpo?cumthi=0&q=${i}`);

        // console.log('ok');
        const result = await (await page).evaluate(() => {
            try {
                let data = document.querySelectorAll('tbody > tr > td');
                let k = 0;
                data.forEach((i) => {
                    switch (k) {
                        case 0: num = i.innerHTML;
                            break;
                        case 1: sbd = i.innerHTML;
                            break;
                        case 2: toan = i.innerHTML;
                            break;
                        case 3: van = i.innerHTML;
                            break;
                        case 4: nn = i.innerHTML;
                            break;
                        case 5: vatly = i.innerHTML;
                            break;
                        case 6: hoahoc = i.innerHTML;
                            break;
                        case 7: sinhhoc = i.innerHTML;
                            break;
                        case 8: lichsu = i.innerHTML;
                            break;
                        case 9: dialy = i.innerHTML;
                            break;
                        case 10: gdcd = i.innerHTML;
                            break;
                    };
                    k++;
                });
                return {
                    num: num,
                    sbd: sbd,
                    toan: toan,
                    van: van,
                    ngoaingu: nn,
                    vatly: vatly,
                    hoahoc: hoahoc,
                    sinhhoc: sinhhoc,
                    lichsu: lichsu,
                    dialy: dialy,
                    Gdcd: gdcd
                };
            } catch (err) {
                console.log('empty');
            }

        });
        console.log(result);
        data.push(result);
        // console.log('end');
    };

    // console.log(data);
    const jsonString = JSON.stringify(data)
    fs.writeFile('./data/data_2020.json', jsonString, err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file')
        }
    })
    // console.log(data);

    await (await browser).close();
})();