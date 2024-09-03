Lightning Datatable Extended w/ Record lookup


Inline editing within datatables is a powerful feature that allows users to quickly update records directly without leaving the data. However, integrating a Lightning record picker into these editable cells — especially for lookup fields — can be a complex. This article introduces a reusable Lightning Web Component (LWC) that simplifies this process, making it easier for developers to enhance their datatables with record pickers without lookup for any custom alternatives.


* Overview: This asset uses two base components ( lightning-datatable x lightning-record-picker ) and combines them to bring easy record lookups with configurable properties that works across multiple objects.
* Problem Statement: We all know lightning-datatable comes with support to limited data types while inline editing. Yet, customers often expect much more—everything from images, buttons, and picklist to custom formats and record selection, all within the same table. We often consider writing custom datatable in such cases. However, this comes with significant trade-offs: which are additional development efforts, plenty of code and losing out on valuable features like sorting, column resizing, text wrapping, infinite scroll and lazy loading that matter for UX.

The Reusable Asset

* Overview of the Asset: The asset can be used to easily implement record lookups along with inline edit enabled. There are so many benefits of using this asset comparing custom data tables or custom lookup component. The asset integrates two of the really useful base component ( lightning-datatable x lightning-record-picker ). 
* This component streamlines the data entry process, improving user experience by combining the efficiency of inline editing with the power of the Lightning record picker. It’s reusable across different objects and fields, making it a versatile tool for any Salesforce project. It handles lookup fields during inline editing, enabling users to select related ( or unrelated ) records without leaving the datatable.



* Key Features:
    * Seamless integration with existing datatable components.
    * Works with all Custom Objects and most of the Standard objects ( listed here )
    * Filter record based on multiple fields with custom filter logic
    * Display two fields on record suggestion ( the primary field with a title )

Section 3: Implementation Guide

* Step-by-Step Instructions:
    * Creating the Custom Cell Component: We will need to create another standalone component that uses lightning-record-picker to display record lookup. We will later integrate it and this will act as datatable cell.

lookupCell

lookupCell_readOnly.html
lookupCell.html
lookupCell.js
lookupCell.js-meta.xml

    * Integrating with Datatable: It uses a custom lwc that extends lightning-datatable. Extending the base datatable component will let us access all the features of the base component. Additionally, Import the template that calls the standalone ( lookup ) cell component and configure the properties.

dataTableExtended

lookupCellReadOnly.html
lookupCellEditable.html
dataTableExtended.js
dataTableExtended.js-meta.xml

Code Snippets:

* Lookup Cell component:

lookupCell.html

<!-- Record picker -->
    <lightning-record-picker
        data-inputable="true"
        label={label}
        placeholder={placeholder}
        object-api-name={object}
        value={value}
        onchange={handleChange}
    ></lightning-record-picker>

lookupCell.js

/**Implementation of the change event fired by lightning-record-picker */
handleChange(event) {
        const { recordId: value } = event.detail || {};
        if( this.value == value ){
            return;
        }

        const fieldChange = {
            fieldName: this.fieldName,
            object: this.object,
            oldValue: this.value,
            value, //In most cases, only this value would matter but if you've comparatively complex usecase, you can pass any additional context values too
        };

        // this is important else dt would not know something in the cell has changed and won't show Save/Cancel buttons
        this.value = value;

        const changeEvent = new CustomEvent('lookupchange', {
            detail: fieldChange,
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(changeEvent);
    }
   
    /**
     * implementation required to check whether the selected value is valid or not
     */
    @api validity = { valid: true } 

* Extending the datatable:

lookupCellEditable.html

<template>
    <c-lookup-cell
        data-inputable="true"
        lwc:spread={typeAttributes}
    ></c-lookup-cell>
</template>

lookupCellReadOnly.html

<template>
    <span class="common-readonly__template">
        {typeAttributes.valueReadOnly} <!-- notice the use of typeAttributes -->
    </span>
</template>

dataTableExtended.js

import lookupCellReadOnly from './lookupCellReadOnly.html';
import lookupCellEditable from './lookupCellEditable.html';

static customTypes = {
        lookup:{
            template: lookupCellReadOnly,
            editTemplate: lookupCellEditable,
            standardCellLayout: true,
            typeAttributes: [ 'label', 'placeholder', 'object', 'variant', 'fieldName', 'value', 'valueReadOnly', ] // if any additional values are to be passed to the attribute / property needs to be added here
        },
        //... add more custom types as needed
    };

Using the new datatable:

yourCustomComponentUsingDatatable.html

<c-data-table-extended
    key-field="Id"
    data={data}
    columns={columns}
    draft-values={draftValues}
    show-row-number-column
    hide-checkbox-column
    oncellchange={handleCellChange}
    onsave={handleSave}>
</c-data-table-extended>

yourCustomComponentUsingDatatable.js

const columns = [
    {
        label: 'Name',
        fieldName: 'Name',
        type: 'text',
        editable: true,
    },
    // any additional columns.....,
    {
        label: 'Owner',
        fieldName: 'OwnerId',
        type: 'lookup',
        editable: true, //configures your column as datatable, see additional section as well
        typeAttributes: {
            object: 'User',
            label: 'Search Users', // these properties -> */
            variant: 'label-hidden', // -> will be passed -> */
            fieldName: 'OwnerId', // -> to the lightning-record-picker -> */
            value: { fieldName: 'OwnerId' }, // -> and will be accessible -> */
            valueReadOnly: { fieldName: 'OwnerName' }, // -> thru typeAttributes property */
            contextId: { fieldName: 'Id' },
        }
    },
];

Section 4: Benefits and Use Cases

* Enhanced User Experience: By integrating the record picker within the datatable's inline editing, users can manage related records more efficiently. This improves data accuracy and saves time, especially when dealing with multiple records.
* Reusability Across Projects: This component is designed to be reusable across various projects. Whether you're working with standard or custom objects, this solution can be adapted to fit different requirements.

Section 5: Best Practices and Considerations

* Performance Tips: When using this component with large datasets, consider implementing lazy loading or pagination to ensure smooth performance.
* Limitations and Workarounds: While the component handles most use cases well, there might be scenarios with complex field dependencies that require additional customisation. For these cases, extending the component with conditional logic could be beneficial. It already highlights how to pass additional filters to the record picker.

Section 6: Conclusion

* Summary: The reusable LWC presented in this article offers a solution for integrating Lightning record pickers into datatable cells with inline editing. By following the steps outlined, developers can enhance their applications with improved data entry and editing capabilities.
* Call to Action: Try implementing this component in your projects, and consider contributing to its improvement or sharing your experiences with the community. Feel free to fork the repository and add more custom types and raise a PR.

Section 7: Additional Resources

* lightning-record-picker
* lightning-data-table
* Extending datatable with custom types
* Implementing inline editing in lightning-datatable

