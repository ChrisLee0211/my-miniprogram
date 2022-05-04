const RED = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33];
const RED_LIMIT = 6
const BULE = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
const BULE_LIMIT = 2

const getRandom = (limit: number, preset:number[]) => {
    let result = 0;
    while (result === 0 || result > limit) {
        result = Math.floor(Math.random() * 100);
        if(preset.includes(result)) {
            break;
        }
    };
    return result;
}

const numberGenerator = (preset:number[]): Item => {
    const reds: number[] = [];
    const blues: number[] = [];
    const redPreset = preset.filter((num) => num < RED.length);
    const bluePreset = preset.filter((num) => num <BULE.length);
    for (let r = 0; r < RED_LIMIT; r++) {
        let random = getRandom(RED.length,redPreset)
        while (reds.includes(random)) {
            random = getRandom(RED.length,redPreset)
        };
        reds.push(random);
    }
    for (let b = 0; b < BULE_LIMIT; b++) {
        let random = getRandom(BULE.length,bluePreset)
        while (blues.includes(random)) {
            random = getRandom(BULE.length,bluePreset)
        };
        blues.push(random);
    };
    return {
        red:reds.sort((a,b) => a-b),
        blue: blues.sort((a,b) => a-b)
    }
}

const isDuplicate = (cache:string[], group:Item):boolean => {
    const {red, blue} = group;
    const redString = red.join('-');
    const blueString = blue.join('-');
    const wholeString = redString + '-' + blueString;
    if(cache.includes(wholeString)) {
        return true
    } else {
        cache.push(wholeString);
        return false
    }
}

const normalizeNumberIterator = (num,index) => {
    if(num < 10) {
        return `0${num}`
    }
    return num.toString()
}

interface Item {
    red: number[],
    blue: number[]
}

interface randomGroup {
    red: string[],
    blue: string[],
}

export const getLuckyNumbers = (count: number, preset: number[]): Promise<randomGroup[]> => {
    const result: randomGroup[] = [];
    const cache: string[] = [];
    return new Promise((rs, rj) => {
        for (let i = 0; i < count; i++) {
           let randomGroup = numberGenerator(preset);
            while(isDuplicate(cache, randomGroup)) {
                randomGroup = numberGenerator(preset);
            };
            const {red, blue} = randomGroup;
            const normalizeRed = red.map(normalizeNumberIterator)
            const normalizeBlue = blue.map(normalizeNumberIterator)
            result.push({red:normalizeRed,blue:normalizeBlue})
        };
        rs(result);
    })
}