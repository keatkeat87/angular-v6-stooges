
import { AbstractFormComponent } from './abstract-form.component';
import { ChangeDetectorRef } from '@angular/core';
import { EGroup } from '../../entity/models/EGroup';
import { EControl } from '../../entity/models/EControl';
import { METADATA_KEY } from '../../decorators/metadata-key';
import { UniqueMetadata } from '../../decorators/Unique';


export abstract class AbstractAdminFormComponent extends AbstractFormComponent {

    constructor(
        cdr: ChangeDetectorRef
    ) {
        super(cdr);
    }

    eGroup: EGroup;
    uniqueDisplayNames: string
    displayKeys: string[]

    protected buildUniqueDisplayNames() {
        if (!this.eGroup || !this.displayKeys) console.error('要 build fGroup, displayKeys 先');
        let uniques: { displayName: string, uniqueMetadata: UniqueMetadata }[] = [];
        for (let key of this.displayKeys) {
            let fControl = this.eGroup.get(key) as EControl;
            let uniqueMetadatas = fControl.getMetadata(METADATA_KEY.Unique) as UniqueMetadata[];
            if (uniqueMetadatas) {
                uniqueMetadatas.forEach(uniqueMetadata => {
                    uniques.push({
                        displayName: fControl.displayName,
                        uniqueMetadata
                    });
                });
            }
        }

        this.uniqueDisplayNames = uniques.groupBy((a, b) => {
            return a.uniqueMetadata.name === b.uniqueMetadata.name;
        }).map(g => g.map(v => v.displayName).join(',')).join(' or ');
    }
}
