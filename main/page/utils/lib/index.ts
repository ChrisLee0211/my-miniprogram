const BASECONFIG = {
    lottery_super: {
        RED:35,
        BULE: 12,
        RED_LIMIT:5,
        BULE_LIMIT:2,
    },
    lottery_double: {
        RED:33,
        BULE: 16,
        RED_LIMIT:6,
        BULE_LIMIT:1,
    }
}

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

const numberGenerator = (preset:number[], type:string): Item => {
    const config = BASECONFIG[type];
    const reds: number[] = [];
    const blues: number[] = [];
    const redPreset = preset.filter((num) => num < config.RED);
    const bluePreset = preset.filter((num) => num < config.BULE);
    for (let r = 0; r < config.RED_LIMIT; r++) {
        let random = getRandom(config.RED,redPreset)
        while (reds.includes(random)) {
            random = getRandom(config.RED,redPreset)
        };
        reds.push(random);
    }
    for (let b = 0; b < config.BULE_LIMIT; b++) {
        let random = getRandom(config.BULE,bluePreset)
        while (blues.includes(random)) {
            random = getRandom(config.BULE,bluePreset)
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

export const getLuckyNumbers = (count: number, preset: number[], type:string): Promise<randomGroup[]> => {
    const result: randomGroup[] = [];
    const cache: string[] = [];
    return new Promise((rs, rj) => {
        for (let i = 0; i < count; i++) {
           let randomGroup = numberGenerator(preset, type);
            while(isDuplicate(cache, randomGroup)) {
                randomGroup = numberGenerator(preset, type);
            };
            const {red, blue} = randomGroup;
            const normalizeRed = red.map(normalizeNumberIterator)
            const normalizeBlue = blue.map(normalizeNumberIterator)
            result.push({red:normalizeRed,blue:normalizeBlue})
        };
        rs(result);
    })
}