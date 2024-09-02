import { LightningElement, api, wire } from 'lwc';
import { getFieldValue, getRecord } from 'lightning/uiRecordApi';

export default class LookupCell extends LightningElement {
    @api value;
    @api label;
    @api placeholder;
    @api object;
    @api fieldName;
    @api variant;

    get nameField(){
        return `${this.object}.Name`;
    }

    @wire( getRecord, { recordId: '$value', fields: '$nameField' })
    wiredRecord;

    get name(){
        return getFieldValue( this.wiredRecord?.data ?? {},  this.nameField );
    }

    _debouceTimer = null;
    handleChange(event) {
        clearTimeout( this._debouceTimer );

        this._debouceTimer = setTimeout(() => {
            
            const { recordId: value } = event.detail || {};
            if( this.value == value ){
                return;
            }

            const fieldChange = {
                fieldName: this.fieldName,
                object: this.object,
                oldValue: this.value,
                displayName: this.name,
                value,
            };

            // this is important else dt would not know something in the cell has changed and won't show Save/Cancel buttons
            this.value = value;

            const changeEvent = new CustomEvent('lookupchange', {
                detail: fieldChange,
                bubbles: true,
                composed: true
            });
            this.dispatchEvent(changeEvent);

        }, 3000);
    }

    /**
     * implementation required to check whether the selected value is valid or not
     */
    @api get validity(){
        return { valid: true };
    }

    @api showHelpMessageIfInvalid(){
        return 'Invalid input';
    }

}