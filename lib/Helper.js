
module.exports = {
    range: (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    },
    choice: (apalo) => {
        var rand = Math.floor(Math.random() * choices.length);
        return apalo[rand];
    },
    randNum: (number) => {
        result = '';
        const lists = '0123456789';
        const charlength = lists.length;
        for (let i = 0; i < number; i++) {
            result += lists.charAt(Math.floor(Math.random() * charlength));
        }
        return result;
    },
    randomAgent: () => {
        var browser = [
            'Chrome',
            'Firefox',
            'Safari',
            'Opera'
        ];
        var os = [
            'Windows NT 5.1', 
            'Windows NT 6.1', 
            'Windows NT 6.2', 
            'Windows NT 6.3',
            'Windows NT 10.0',
            'Macintosh; Intel Mac OS X 10.8',
            'Macintosh; Intel Mac OS X 10.9',
            'Macintosh; Intel Mac OS X 10.10',
            'Macintosh; Intel Mac OS X 10.11',
            'Macintosh; Intel Mac OS X 10.12',
            'X11; Linux',
            'X11; Ubuntu; Linux'
        ];
        return browser[Math.floor(Math.random() * browser.length)] + "/" + Math.floor(Math.random() * (8 - 1 + 1) + 1) + "." + Math.floor(Math.random() * (9 - 0 + 1) + 0) + " (" + os[Math.floor(Math.random() * os.length)] + " " + Math.floor(Math.random() * (7 - 1 + 1) + 1) + "." + Math.floor(Math.random() * (9 - 0 + 1) + 0) + "; en-US;)";
    }
}