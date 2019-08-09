import { Component, OnInit, Input, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { KafkaService, ShareDataService } from '../../services';
// import { CodeViewComponent } from '../../../pages/codeview/codeview.component';
import * as moment from 'moment';
import { CONFIG } from '../../../shared/config';

@Component({
    selector: 'ngx-console',
    templateUrl: './console.component.html',
    styleUrls: ['./console.component.scss'],
})
export class ConsoleComponent implements OnInit, OnDestroy {
    @Input('cmdContent') cmdContent: string;
    @ViewChild('divScroll') divScroll: ElementRef;
    fileName: string = 'Robot';
    listLogConsole = [];
    public isClosedScript = false;
    constructor(private kafkaService: KafkaService, private shareDataService: ShareDataService) {
        let self = this;
        let interval = setInterval(function() {
            if (self.shareDataService.data['currentFileName']) {
                // <CodeViewComponent>self.shareDataService.data['currentFileName'].subscribe((value: string) => {
                self.shareDataService.data['currentFileName'].subscribe((value: string) => {
                    self.fileName = value.substring(0, value.indexOf('.robot'));
                });
                clearInterval(interval);
            }
        }, 100);
    }

    ngOnInit() {}

    ngOnDestroy() {
        this.kafkaService.unsubscribeTopics();
    }

    async changeTopicConsoleLog(idRobot: string) {
        let self = this;
        this.kafkaService.subscribeTopics([CONFIG.PREFIX_KAFKA_TOPIC_STRING_RESULT_LOG + idRobot], data => {
            if (data.error) {
                console.error('data.mesage');
            }
            if (data.length) {
                data.forEach(item => {
                    let dataLog = self.parseJSON(item);
                    if (dataLog.startTime || dataLog.close) {
                        this.listLogConsole.push(dataLog);
                    }
                    setTimeout(function() {
                        let objDiv = self.divScroll.nativeElement;
                        objDiv.scrollTop = objDiv.scrollHeight;
                    }, 100);
                });
            }
        });
    }
    trackByFn(index, item) {
        return item.timestamp;
    }

    parseJSON(dataJSON) {
        let dataLog = {
            startTime: '',
            endTime: '',
            timeStamp: '',
            message: '',
            level: '',
            status: '',
            close: false,
            childLayout: 0,
        };
        if (this.cmdContent.length === 10) {
            this.cmdContent = 'Running';
        } else {
            this.cmdContent = 'Running...';
        }
        if (!dataJSON) {
            return dataLog;
        }
        if (dataJSON.suite) {
            this.isClosedScript = false;
            this.cmdContent = '';
            let result = dataJSON.result;
            if (result.endtime) {
                dataLog.level = this.fileName;
                dataLog.endTime = result.endtime;
            } else {
                dataLog.level = this.fileName;
            }
            dataLog.startTime = result.starttime;
            if (result.status) {
                dataLog.status = result.status;
            }
            if (result.message) {
                dataLog.message = result.message;
            }
        }

        if (dataJSON.data) {
            let result = dataJSON.result;
            if (result.endtime) {
                dataLog.level = dataJSON.data.replace(/\"/g, '');
                dataLog.endTime = result.endtime;
            } else {
                dataLog.level = dataJSON.data.replace(/\"/g, '');
            }
            dataLog.startTime = result.starttime;
            if (result.status) {
                dataLog.status = result.status;
            }
            if (result.message) {
                dataLog.message = result.message;
            }
            dataLog.childLayout = 1;
        }

        if (dataJSON.name) {
            let result = dataJSON.attributes;
            if (result.endtime) {
                dataLog.level = dataJSON.name.replace(/\"/g, '') + ' \u2003 ';
                for (let i = 0; i < result.args.length; i++) {
                    dataLog.level += result.args[i] + ' \u2003 ';
                }
                dataLog.endTime = result.endtime;
            } else {
                dataLog.level = dataJSON.name.replace(/\"/g, '') + ' \u2003 ';
                for (let i = 0; i < result.args.length; i++) {
                    dataLog.level += result.args[i] + ' \u2003 ';
                }
            }
            dataLog.startTime = result.starttime;
            if (result.status) {
                dataLog.status = result.status;
            }
            if (result.message) {
                dataLog.message = result.message;
            }
            if (result.libname) {
                dataLog.childLayout = 3;
            } else {
                dataLog.childLayout = 2;
            }
        }

        if (dataJSON.message) {
            let result = dataJSON.message;
            if (result.level === 'INFO' && !this.isClosedScript) {
                if (this.listLogConsole[this.listLogConsole.length - 1]) {
                    this.listLogConsole[this.listLogConsole.length - 1].message = result.message;
                }
            }
        }

        if (dataJSON.close) {
            dataLog.close = true;
            this.isClosedScript = true;
            this.kafkaService.unsubscribeTopics();
        }
        return dataLog;
    }

    formatDate(dateString: string) {
        let momentObj = moment(dateString);
        return momentObj.format('DD-MM-YYYY HH:mm:ss.SSS');
    }
}
