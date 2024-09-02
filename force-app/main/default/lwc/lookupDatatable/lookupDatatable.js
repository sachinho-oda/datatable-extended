import { LightningElement } from 'lwc';

const columns = [
    {
        label: 'Name',
        fieldName: 'Name',
        type: 'text',
        editable: true,
    },
    {
        label: 'Owner',
        fieldName: 'OwnerId',
        type: 'lookup',
        editable: true,
        typeAttributes: {
            object: 'User',
            label: 'Search Users',
            variant: 'label-hidden',
            fieldName: 'OwnerId',
            value: { fieldName: 'OwnerId' },
            valueReadOnly: { fieldName: 'OwnerName' },
            contextId: { fieldName: 'Id' },
        }
    },
];


export default class LookupDatatable extends LightningElement {
    data = [
        {
            Id: '001aXXXXXXXXXXXXXX',
            Name: 'Acme Corporation',
            OwnerId: '005XXXXXXXXXXXXX',
            OwnerName: 'Api User',
            CustomNumber: 10
        },
        {
            Id: '001bXXXXXXXXXXXXXX',
            Name: 'Acme Corporation',
            OwnerId: '005XXXXXXXXXXXXXXX',
            OwnerName: 'Portal User',
            CustomNumber: 20
        },
    ];
    columns = columns;

}
