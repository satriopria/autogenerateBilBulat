let operasiDipilih;

const validasi = (jmlSoal, pjgSoal, operasi, soalNeg, jawNeg) => {
    operasiDipilih = [];

    for (i of operasi) operasiDipilih.push(i.value);

    if (operasiDipilih.length == 0 || soalNeg == null || jawNeg == null) {
        document.getElementById("notifikasi").innerHTML = "*Mohon isi form yang kosong";
        return 0;
    } else if (jmlSoal.value == "" || pjgSoal.value == "") {
        document.getElementById("notifikasi").innerHTML = "*Input tidak valid";
        return 0;
    } else {
        document.getElementById("notifikasi").innerHTML = "";
        return [jmlSoal.value, pjgSoal.value, operasiDipilih, soalNeg.value, jawNeg.value];
    }
}

const generate = (jmlSoal, pjgSoal, operasi, soalNeg, jawNeg) => {
    const getMathematicalValue = str => new Function('return ' + str)()
    let soalJawab = {
        "soal": [],
        "jawab": []
    }
    let soal = [];
    // let answer = [];
    let timer1 = 0;
    // while (soal.length < jmlSoal && timer1 < 1000*jmlSoal) {
    while (soalJawab["soal"].length < jmlSoal && timer1 < 1000 * jmlSoal) {
        let angka = [], op = [], soalMentah = [];
        let timer2 = 0;
        let pjgx = Math.ceil(Math.random() * (pjgSoal - 1)) + 1;
        while (angka.length < pjgx && timer2 < 1000 * pjgx) {
            let tmp;
            if (soalNeg == "0") {
                tmp = (Math.ceil(Math.random() * 100)).toString()
            } else {
                tmp = (Math.random() < 0.5 ? -1 : 1) * Math.ceil(Math.random() * 100)
                tmp = tmp < 0 ? `(${tmp})` : tmp.toString()
            }

            angka.push(tmp);
            soalMentah.push(tmp);

            tmp = operasi[Math.floor(Math.random() * operasi.length)]
            op.push(tmp);

            soalMentah.push(tmp);

            timer2++;
        }

        soalMentah.pop();

        let answer = getMathematicalValue(soalMentah.join(""));
        // console.log(soalMentah);

        if (answer % 1 == 0) {
            // if (jawNeg == "0") answer > 0 ? soal.push(`${soalMentah.join(' ')} = ... (${answer})`) : ""
            // else soal.push(`${soalMentah.join(' ')} = ... (${answer})`)
            if (jawNeg == "0") {
                if (answer > 0) {
                    soalJawab["soal"].push(`${soalMentah.join(' ')} = ....`)
                    soalJawab["jawab"].push(answer)
                }
            }else{
                soalJawab["soal"].push(`${soalMentah.join(' ')} = ....`)
                soalJawab["jawab"].push(answer)
            }
        }

        // console.log(`${soalMentah} => ${answer}`);
        // soal.push(soalMentah.join(' ') + " = ....");
        timer1++;
    }
    return soalJawab;
}