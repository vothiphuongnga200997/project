import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({
    providedIn: 'root',
})
export class InspectService {
    public structureData: any;
    element: any;
    public inspectType: string = '';
    public recoderType: Array<any> = [];
    public url = environment.config.INSPECTOR_SOCKET_URL;
    public websocket: any;
    public isDisable = true;
    public recordData: Array<any> = [];
    public recordDataSubject: Subject<Array<any>> = new Subject<Array<any>>();
    public type: string = '';
    public InspectElement: Array<any> = [];
    constructor() {}

    doWebSocket() {
        this.websocket = new WebSocket(this.url);

        this.websocket.onopen = e => {
            this.onOpen(e);
        };

        this.websocket.onmessage = e => {
            this.onMessage(e);
        };

        this.websocket.onerror = e => {
            this.onError(e);
        };

        this.websocket.onclose = e => {
            this.onClose(e);
        };
    }

    onOpen(event) {
        this.logMessage('CONNECTED');
        this.recordData = [];
    }

    onMessage(event) {
        console.log(this.recordData);
        this.logMessage(event.data);
        // websocket.close();
    }

    onError(event) {
        console.log(event);
        this.logMessage(event.data);
    }

    onClose(event) {
        this.logMessage('DISCONNECTED');
    }

    logMessage(data) {
        console.log(data);
        if (this.inspectType === 'Web' && data !== 'CONNECTED' && data !== 'DISCONNECTED') {
            this.pushInspect(data);
        } else if (data[0] === '{' || data[0] === '[') {
            //   && data[0] !== 's' && data[0] !== 'E'
            data = data.replace(/(\r\n|\n|\r)/gm, ' ');
            if (this.recoderType[0] === 'Web') {
                this.pushRecord(data);
            } else {
                if (data.split('\\').length > 1) {
                    data = data.split('\\').join('\\\\');
                }
                this.type === 'recorder' ? this.pushRecord(data) : this.pushInspect(data);
            }
        } else {
            let stopRecordWeb = data.split(', ')[1];
            if (data === 'stopRecordWeb' || stopRecordWeb === 'stopRecordWeb') {
                this.webRecordSentData();
            }
        }
    }

    sendMessage(message) {
        this.logMessage(message);
        this.websocket.send(message);
    }

    parseData(data: Array<any>) {
        return data.map(r => {
            let event = r.Event || '';
            let selector;
            let selectorType;
            let keyPress = r.KeyChar || '';
            let processId = r.ProcessId || '';
            let processName = r.ProcessName || '';
            let windowSelectorType;
            let windowSelector;
            if (r.Name) {
                selectorType = 'text';
                selector = r.Name;
            } else if (r.id) {
                selectorType = 'id';
                selector = r.Id;
            } else if (r.ClassName) {
                selectorType = 'class_name';
                selector = r.ClassName;
            } else {
                selectorType = '';
                selector = '';
            }
            if (r.WindowClassName) {
                (windowSelectorType = 'class_name'), (windowSelector = r.WindowClassName);
            } else if (r.WindowName) {
                windowSelectorType = 'title';
                windowSelector = r.WindowName;
            } else if (r.Id) {
                windowSelectorType = 'id';
                windowSelector = r.WindowId;
            } else {
                windowSelectorType = '';
                windowSelector = '';
            }
            return {
                event: this.eventMap()[event],
                selectorType: selectorType,
                selector: selector,
                keyPress: keyPress,
                processId: processId,
                processName: processName,
                windowSelectorType: windowSelectorType,
                windowSelector: windowSelector,
            };
        });
    }

    eventMap() {
        return {
            LeftClick: 'Click Item',
            LeftDblClick: 'Double Click Item',
            RightClick: 'Right Click Item',
            MiddleClick: 'Middle Click Item',
            KeyboardInput: 'Key Press',
        };
    }

    pushInspect(data) {
        if (data[0] !== 's' && data[0] !== 'E' && data[0] !== 'D' && data[0] !== 'C') {
            let jsonData = JSON.parse(data);
            if (this.inspectType === 'Web' && jsonData.id && jsonData.command === 'click') {
                this.InspectElement.push(jsonData);
                this.element.scrollIntoView(false);
            } else if (this.inspectType === 'Application') {
                try {
                    jsonData.Framework = jsonData.Framework === 'None' ? '' : jsonData.Framework;
                    if (
                        jsonData.AutomationId !== '' ||
                        jsonData.Name !== '' ||
                        jsonData.PrimaryIdentification !== '' ||
                        jsonData.Framework !== ''
                    ) {
                        this.InspectElement.push(jsonData);
                        this.element.scrollIntoView(false);
                    }
                } catch (err) {}
            }
        }
    }

    pushRecord(data) {
        let jsonData = JSON.parse(data);
        if (this.recoderType[0] === 'Web') {
            try {
                this.recordData.push(jsonData);
            } catch (err) {}
        } else if (this.recoderType[0] === 'Application') {
            try {
                this.recordData = this.parseData(jsonData);
                this.recordDataSubject.next(this.recordData);
            } catch (err) {}
        }
    }

    webRecordSentData() {
        try {
            this.recordDataSubject.next(this.recordData);
        } catch (err) {}
    }
}
