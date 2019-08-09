import * as pako from 'pako';

export class Tools {
    static bytesToString(arr) {
        let str = '';

        for (let i = 0; i < arr.length; i++) {
            str += String.fromCharCode(arr[i]);
        }

        return str;
    }

    static getTextContent(node) {
        return node != null ? node[node.textContent === undefined ? 'text' : 'textContent'] : '';
    }

    static parseXml(xml) {
        let parser = new DOMParser();
        return parser.parseFromString(xml, 'text/xml');
    }

    static decode(data) {
        try {
            let node = this.parseXml(data).documentElement;

            if (node != null && node.nodeName === 'mxfile') {
                let diagrams = node.getElementsByTagName('diagram');

                if (diagrams.length > 0) {
                    data = this.getTextContent(diagrams[0]);
                }
            }
        } catch (e) {
            console.error(e);
            return;
        }

        try {
            data = atob(data);
        } catch (e) {
            console.error(e);
            return;
        }

        try {
            data = this.bytesToString(pako.inflateRaw(data));
        } catch (e) {
            console.error(e);
            return;
        }

        try {
            data = decodeURIComponent(data);
        } catch (e) {
            console.error(e);
            return;
        }

        return data;
    }
}
