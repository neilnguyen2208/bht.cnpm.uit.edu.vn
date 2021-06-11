function _createDTPickerInstance(instanceID, onDateTimeChange) {
    jQuery(function () {
        jQuery('#dt-picker-input-' + instanceID).datetimepicker({
            format: 'Y-m-d H:i',
            inline: false,
            minDate: '+1970/01/02',
            startDate: '+1970/01/02',
            onChangeDateTime: function (dp, $input) {
                $input.val(new Date($input.val()).toISOString());
                onDateTimeChange($input.val());
            }
        });
    })
}

window.createDTPickerInstance = _createDTPickerInstance;