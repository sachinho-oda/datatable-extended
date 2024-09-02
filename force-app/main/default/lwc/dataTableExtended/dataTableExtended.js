
import LightningDatatable from 'lightning/datatable';
import lookupCellReadOnly from './lookupCellReadOnly.html';
import lookupCellEditable from './lookupCellEditable.html';
import picklistCellReadOnly from './picklistCellReadOnly.html';
import picklistCellEditable from './picklistCellEditable.html';

export default class DataTableExtended extends LightningDatatable {
    static customTypes = {
        lookup:{
            template: lookupCellReadOnly,
            editTemplate: lookupCellEditable,
            standardCellLayout: true,
            typeAttributes: [ 'label', 'placeholder', 'object', 'variant', 'fieldName', 'value', 'valueReadOnly', ] // if any additional values are to be passed to the attribute / property needs to be added here
        },
        picklist: {
            template: picklistCellReadOnly,
            editTemplate: picklistCellEditable,
            standardCellLayout: true,
            typeAttributes: [ 'label', 'placeholder', 'options', 'value', 'variant', ]
        },
        //... add more custom types as needed
    };



}