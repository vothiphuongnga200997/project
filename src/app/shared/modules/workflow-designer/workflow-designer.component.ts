import { Component, ViewChild, ElementRef, HostListener, Output, EventEmitter, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Tools } from './convert-tools';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'workflow-designer',
    templateUrl: './workflow-designer.component.html',
    styleUrls: ['./workflow-designer.component.scss'],
})
export class WorkflowDesignerComponent implements OnInit {
    public workflowURL = `${environment.config.DRAWER_IFRAME_URL}/embed`;
    urlSafe: SafeResourceUrl;
    @Output() onWorkflowDesignerExportXML = new EventEmitter();

    @ViewChild('workflowDesigner') workflowDesigner: ElementRef;
    workflowDesignerWindow: Window;
    // tslint:disable-next-line:max-line-length
    rootXmlData = `<mxGraphModel dx="1798" dy="795" grid="0" gridSize="10" guides="0" tooltips="0" connect="1" arrows="1" fold="1" page="0" pageScale="1" pageWidth="2339" pageHeight="3300" background="#FFFFFF" math="0" shadow="1"><root><mxCell id="0"/><mxCell id="1" parent="0"/><mxCell id="C6X_jamwe-lSHq62HaKt-1" value="" style="group;resizable=0;movable=1;rotatable=0;cloneable=0;deletable=0;editable=0;" parent="1" vertex="1" connectable="0"><mxGeometry x="160" y="21" width="160" height="80" as="geometry"/></mxCell><object label="DONE" type="root" id="C6X_jamwe-lSHq62HaKt-6"><mxCell style="ellipse;whiteSpace=wrap;html=1;aspect=fixed;fillColor=#4ca6ff;strokeColor=none;gradientColor=none;gradientDirection=east;fontSize=14;fontColor=#FFFFFF;editable=0;movable=1;resizable=0;rotatable=1;cloneable=1;deletable=0;connectable=1;" parent="1" vertex="1"><mxGeometry x="649" y="416" width="80" height="80" as="geometry"/></mxCell></object><mxCell id="FWOeX1tSebjcFLhIFQJm-1" value="" style="group;deletable=0;" parent="1" vertex="1" connectable="0"><mxGeometry x="-371" y="21" width="160" height="80" as="geometry"/></mxCell><mxCell id="C6X_jamwe-lSHq62HaKt-2" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;deletable=0;cloneable=0;" parent="1" source="C6X_jamwe-lSHq62HaKt-3" edge="1"><mxGeometry relative="1" as="geometry"><mxPoint x="-211" y="61" as="targetPoint"/></mxGeometry></mxCell><object label="START" type="root" id="C6X_jamwe-lSHq62HaKt-3"><mxCell style="ellipse;whiteSpace=wrap;html=1;aspect=fixed;fillColor=#4ca6ff;strokeColor=none;gradientColor=none;gradientDirection=east;fontSize=14;fontColor=#FFFFFF;editable=0;movable=1;resizable=0;rotatable=1;cloneable=0;deletable=0;connectable=1;" parent="1" vertex="1"><mxGeometry x="-371" y="21" width="80" height="80" as="geometry"/></mxCell></object></root></mxGraphModel>`;
    constructor(public sanitizer: DomSanitizer) {}

    ngOnInit() {
        this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.workflowURL);
    }

    @HostListener('window:message', ['$event'])
    onMessage(messageEvent: MessageEvent) {
        if (messageEvent.origin === environment.config.DRAWER_IFRAME_URL) {
            this.workflowDesignerWindow = this.workflowDesigner.nativeElement.contentWindow;
            let message = JSON.parse(messageEvent.data);
            if (message.event === 'configure') {
                console.log('-> Workflow configure');
                this.windowPostMessage({
                    action: 'configure',
                    config: {},
                });
            }
            if (message.event === 'init') {
                console.log('-> Workflow init');
                this.windowPostMessage({ action: 'load', xml: this.rootXmlData });
            }
            if (message.event === 'load') {
                console.log('-> Workflow load');
            }
            if (message.event === 'export') {
                console.log('-> Workflow export');
                let exportData = Tools.decode(message.xml);
                this.onWorkflowDesignerExportXML.emit(exportData);
            }
        }
    }

    public exportDiagramXML() {
        this.windowPostMessage({ action: 'export', format: 'xml' });
    }

    public importDiagramXML(inputXML) {
        this.windowPostMessage({ action: 'load', xml: inputXML });
    }

    windowPostMessage(message) {
        this.workflowDesignerWindow.postMessage(JSON.stringify(message), '*');
    }
}
