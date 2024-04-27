const intNums: Map<string, number> = new Map<string, number>();
intNums.set("M", 1000);
intNums.set("D", 500);
intNums.set("C", 100);
intNums.set("L", 50);
intNums.set("X", 10);
intNums.set("V", 5);
intNums.set("I", 1);
intNums.set("O", 0);
type Bumblor = string;

// Function to convert Bumblor numeral to Arabic integer
export function bumblor2arabic(Bumblor: string): number {
    //Negative handling
    let isNegative = false;
    let negativeCount = 0;

    //Multiples handling
    let arabicInt = 0;
    let Mcount = 0;
    let Dcount = 0;
    let Ccount = 0;
    let Lcount = 0;
    let Xcount = 0;
    let Vcount = 0;
    let Icount = 0;
    let zeroCount = 0;

    let lastNumSize = Number.POSITIVE_INFINITY;

    if(Bumblor == "O"){
        return 0;
    }

    if(Bumblor != Bumblor.toUpperCase()){
        throw new Error("Malformed Number");
    }

    if(Bumblor.includes(' ')){
        throw new Error("Malformed Number");
    }

    for(let i = 0; i < Bumblor.length; i++){
        const num = Bumblor.charAt(i);

        if(num != "-"){
            const currentNumSize = intNums.get(num);

            if(currentNumSize == undefined){
                throw new Error("Malformed Number");
            }

            if(currentNumSize > lastNumSize){
                throw new Error("Malformed Number");
            }

            lastNumSize = currentNumSize;
        }

        if(num == "O"){
            zeroCount++;

            if(zeroCount > 0){
                throw new Error("Malformed Number");
            }
        }
        if(i < 0 && num == '-'){
            throw new Error("Malformed Number");
        }

        if(num == "-"){
            negativeCount++;
            isNegative = true;

            if(i >= 1 || negativeCount > 1){
                throw new Error("Malformed Number");
            }
        }

        //More than 4
        if(num == "M"){
            Mcount++;

            if(Mcount > 4){
                throw new Error("Malformed Number");
            }
        }

        if(num == "C"){
            Ccount++;

            if(Ccount > 4){
                throw new Error("Malformed Number");
            }
        }

        if(num == "X"){
            Xcount++;

            if(Xcount > 4){
                throw new Error("Malformed Number");
            }
        }

        if(num == "I"){
            Icount++;

            if(Icount > 4){
                throw new Error("Malformed Number");
            }
        }

        //More than 1
        if(num == "D"){
            Dcount++;

            if(Dcount > 1){
                throw new Error("Malformed Number");
            }
        }

        if(num == "L"){
            Lcount++;

            if(Lcount > 1){
                throw new Error("Malformed Number");
            }
        }

        if(num == "V"){
            Vcount++;

            if(Vcount > 1){
                throw new Error("Malformed Number");
            }
        }

        if(num != "-"){
            let number: number = intNums.get(num);

            if(number){
                arabicInt += number;
            }
        }
    }

    if(isNegative){
        arabicInt = arabicInt * -1;
    }

    if(arabicInt < -4999 || arabicInt > 4999){
        throw new Error("Out of Range");
    }

    return arabicInt;
}

// Function to convert Arabic integer to Bumblor numeral
export function arabic2bumblor(arabic: number): string {
    let bumblorNumeral = "";
    let positiveInt = Math.abs(arabic);
    let truncInt = Math.trunc(positiveInt);

    if(truncInt == 0){
        return "O";
    }

    if(arabic < -4999 || arabic > 4999){
        throw new Error("Out of Range");
    }

    if(truncInt > 0){
        const sortedNums =
            Array.from(intNums).sort((a, b) => b[1] - a[1]);
        let countRepeat: {[key: string]: number} = {};

        while(truncInt != 0){
            const nearest = sortedNums.find(items =>{
                return items[1] <= truncInt && !(countRepeat[items[0]] >= 4 &&
                ["M", "C", "X", "I"].includes(items[0]));
            });

            truncInt = truncInt - nearest[1];
            bumblorNumeral += nearest[0];
            countRepeat[nearest[0]] = (countRepeat[nearest[0]] || 0) + 1;
        }

        if(arabic < 0){
            bumblorNumeral = `-${bumblorNumeral}`;
        }
    }

    return bumblorNumeral;
}