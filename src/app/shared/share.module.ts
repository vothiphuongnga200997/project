import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ParseService } from './services/parse.service';
import { AuthService } from './services/auth.service';
import { FormioModule } from 'angular-formio';
import { AngularMonacoEditorModule } from 'angular-monaco-editor';
import { LoadingComponent } from './modules/loading/loading.component';
import { LoadingService } from './services/loading.service';
import { MonacoSetupService } from './services/monaco-setup.service';
import { ShareDataService } from './services/share-data.service';
import { KafkaService } from './services/kafka.service';
import { AuthGuard } from './services/auth-guard.service';
import { ExecuteRobotService, ToastrService, RobotService, WorkFlowService, DownloadAgentService } from './services';
import { FileStoreService } from './services/file-store.service';
import { ScheduleService } from './services/schedule.service';
import { ElasticsearchService } from './services/elasticsearch.service';
import { TechnicalMetricService } from './services/technical-metric.service';
import { FileAgentService } from './services/file-agent.service';
import { QuickStartService } from './services/quickstart.service';
import { LibraryDependenciesService } from './services/library-dependencies.service';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */
@NgModule({
    imports: [CommonModule, FormsModule, AngularMonacoEditorModule],
    declarations: [LoadingComponent],
    exports: [CommonModule, FormsModule, FormioModule, AngularMonacoEditorModule, LoadingComponent],
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                ParseService,
                AuthGuard,
                AuthService,
                LoadingService,
                ShareDataService,
                MonacoSetupService,
                KafkaService,
                WorkFlowService,
                ExecuteRobotService,
                FileStoreService,
                FileAgentService,
                RobotService,
                ToastrService,
                DownloadAgentService,
                ScheduleService,
                ElasticsearchService,
                TechnicalMetricService,
                QuickStartService,
                LibraryDependenciesService,
            ],
        };
    }
}
