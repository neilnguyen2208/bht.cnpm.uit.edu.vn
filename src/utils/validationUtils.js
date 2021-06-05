//#region validation html elements not 
const errorSelector = '.form-error-label';
const formGroupSelector = '.form-group';

// Đối tượng `Validator`
export function validation(conditions) {
    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }
    var selectorRules = {};

    // Hàm thực hiện validate
    function validate(element, rule) {
        var errorElement = getParent(element, formGroupSelector).querySelector(errorSelector);
        var errorMessage;

        // Lấy ra các rules của selector
        var rules = selectorRules[rule.selector];

        // Lặp qua từng rule & kiểm tra
        // Nếu có lỗi thì dừng việc kiểm
        for (var i = 0; i < rules.length; ++i) {
            if (element.classList.contains('text-input') || element.classList.contains('text-area')) {
                errorMessage = rules[i](element.value);
                if (errorMessage) break;
            }
            else
                if (element.classList.contains('combobox')) {
                    document.getElementById("d-e-" + element.id).innerText = rules[i](false);
                    if (errorMessage) break;
                }
                else
                    if (element.classList.contains('ckeditor')) {
                        //kiem tra xem co class dummy invalid hay khong
                        document.getElementById("d-e-" + element.id).innerText = rules[i](false);
                        if (errorMessage) break;
                    }
                    else
                        if (element.classList.contains('form-radio') || element.classList.contains('form-checkbox')) {
                            errorMessage = rules[i](formElement.querySelector(rule.selector + ':checked'));
                        }
                        else if (element.classList.contains('file-input')) {
                            errorMessage = rules[i](element.files);
                        }
                        else if (element.classList.contains('ReCAP')) {
                            document.getElementById("d-e-" + element.id).innerText = rules[i](false);

                        }
            if (errorMessage) break;
        }

        if (errorMessage) {
            errorElement.innerText = errorMessage;
            getParent(element, formGroupSelector).classList.add('invalid');

        } else {
            errorElement.innerText = '';
            getParent(element, formGroupSelector).classList.remove('invalid');
        }

        return !errorMessage;
    }

    // Lấy element của form cần validate
    var formElement = document.querySelector(conditions.form);
    if (formElement) {

        // Lặp qua mỗi rule và xử lý (lắng nghe sự kiện blur, input, ... cho truong hop cac html input thoi), va tu xu ly cho cac custom input
        conditions.rules.forEach(function (rule) {

            // Lưu lại các rules cho mỗi input
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            } else {
                selectorRules[rule.selector] = [rule.test];
            }
            var elements = formElement.querySelectorAll(rule.selector);
            Array.from(elements).forEach(function (element) {
                if (element.classList.contains('text-input')
                    || element.classList.contains('form-checkbox')
                    || element.classList.contains('form-radio')

                    || element.classList.contains('text-area')) {

                    //xu ly cac HTMLInputElement
                    // Xử lý trường hợp blur khỏi input
                    // if (conditions.blur) {
                    // document.getElementById(element.id).onblur = function () {
                    //     validate(element, rule);
                    // }
                    // }

                    // Xử lý mỗi khi người dùng nhập vào input
                    document.getElementById(element.id).oninput = function () {
                        var errorElement = getParent(element, formGroupSelector).querySelector(errorSelector);
                        errorElement.innerText = '';
                        getParent(element, formGroupSelector).classList.remove('invalid');
                    }

                    //neu la HTMLInputElement => vong lap tiep theo
                    return;
                }

                if (element.classList.contains('file-input')) {
                    document.getElementById(element.id).onchange = function () {
                        validate(element, rule);
                    }
                    return;
                }

                if (element.classList.contains('combobox')
                ) {
                    validate(element, rule);
                    return;
                }

                if (element.classList.contains('ckeditor')
                ) {
                    validate(element, rule);
                    return;
                }

                if (element.classList.contains('ReCAP')
                ) {
                    validate(element, rule);
                    return;
                }
            });
        });
    }

}

// Định nghĩa rules
// Nguyên tắc của các rules:
// 1. Khi có lỗi => Trả ra message lỗi
// 2. Khi hợp lệ => Không trả ra cái gì cả (undefined)
validation.isRequired = function (selector, type, message) {
    if (type === 'text-input' || type === 'text-area') {
        return {
            selector: '#' + selector,
            type: type,
            test: function (value) {
                return (value && value !== '') ? '' : message || 'Vui lòng nhập trường này'
            }
        };
    }
    if (type === 'combobox') {
        return {
            selector: '#combobox-wrapper-' + selector,
            type: type,
            test: function (value) {
                //  kiem tra xem co class dummy invalid hay khong o ben tren
                return value ? undefined : message || 'Vui lòng chọn một option'
            }
        }
    }
    if (type === 'ckeditor') {
        return {
            selector: '#cke-wrapper-' + selector,
            type: type,
            test: function (value) {

                //  kiem tra xem co class dummy invalid hay khong o ben tren
                return value ? undefined : message || 'Vui lòng nhập trường này'
            }
        }
    }
    if (type === 'file-input') {
        return {
            selector: '#file-input-' + selector,
            type: type,
            test: function (value) {
                //  kiem tra xem co file nao torng chuoi hay khong
                return value.length > 0 ? undefined : message || 'Vui lòng nhập trường này'
            }
        }
    }
    if (type === 'checkbox') {
        return {
            selector: '#' + selector,
            type: type,
            test: function (value) {
                //  kiem tra xem co file nao torng chuoi hay khong
                return value ? undefined : message || 'Vui lòng xác nhận!'
            }
        }
    }
    if (type === "ReCAP") {
        return {
            selector: '#ReCAP-wrapper-' + selector,
            type: type,
            test: function (value) {

                //  kiem tra xem co file nao torng chuoi hay khong
                return value ? undefined : message || 'Vui lòng xác nhận captcha!'
            }
        }
    }
}

//chua check
validation.isEmail = function (selector, type, message) {
    return {
        selector: '#' + selector,
        type: type,
        test: function (value) {
            var regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return regex.test(String(value).toLowerCase()) ? undefined : message || 'Trường này phải là email';
        }
    };
}

//chua check
validation.minLength = function (selector, type, min, message) {
    return {
        selector: '#' + selector,
        type: type,
        test: function (value) {
            return value.length >= min ? undefined : message || `Vui lòng nhập tối thiểu ${min} kí tự`;
        }
    };
}

//chua check
validation.isSameContent = function (selector, type, confirmID, message) {
    return {
        selector: '#' + selector,
        type: type,
        test: function (value) {
            return value === document.getElementById(confirmID).value ? undefined : message || 'Giá trị nhập vào không chính xác';
        }
    }
}

validation.noSpecialChar = function (selector, type, message) {
    return {
        selector: '#' + selector,
        type: type,
        test: function (value) {
            return !/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/.test(value) ? undefined : message || 'Vui lòng nhập trường này'
        }
    };
}

//for file input only
validation.maxFileCount = function (selector, type, itemCount, message) {
    return {
        selector: '#file-input-' + selector,
        type: type,
        test: function (value) {
            return value.length <= itemCount ? undefined : message || `Không được vượt quá ${itemCount} file`
        }
    };
}

validation.maxFileSize = function (selector, type, fileSize, message) {
    return {
        selector: '#file-input-' + selector,
        type: type,
        test: function (value) {
            let totalSize = 0;
            for (let i = 0; i < value.length; i++) {
                totalSize = totalSize + value[i].size;
            }
            return totalSize < fileSize ? undefined : message || `Không được vượt quá  ${Math.round(fileSize / 1048576 * 100) / 100} MB`
        }
    };
}
//#endregion

//check kieu khac khong the mo rong nhu ben tren
export function styleFormSubmit(conditions) {
    //chon tat ca cac combobox co validation
    let selectorRules = {};
    function validate(element, rule) {
        let errorElement = getParent(element, formGroupSelector).querySelector(errorSelector);
        let errorMessage;
        let rules = selectorRules[rule.selector];
        // Lặp qua từng rule & kiểm tra
        // Nếu có lỗi thì dừng việc kiểm
        for (var i = 0; i < rules.length; ++i) {
            if (element.classList.contains('text-input') || element.classList.contains('text-area')) {
                errorMessage = rules[i](element.value);
                if (errorMessage) break;
            }
            else
                if (element.classList.contains('combobox')) {
                    if (element.classList.contains("dummy-invalid")) {
                        errorMessage = rules[i](false);
                    }
                    if (errorMessage) break;
                }
                else
                    if (element.classList.contains('ckeditor')) {
                        errorMessage = rules[i](window.CKEDITOR.instances["ck-editor-" + element.id.substring(12)].getData());
                        if (errorMessage) {
                            element.classList.add('invalid');
                            break;
                        }
                    }
                    else
                        if (element.classList.contains('form-radio') || element.classList.contains('form-checkbox')) {
                            // console.log()
                            errorMessage = rules[i](formElement.querySelector(rule.selector + ':checked'));
                            if (errorMessage) break;
                        }
                        else
                            if (element.classList.contains('file-input')) {
                                errorMessage = rules[i](element.files);
                                if (errorMessage) break;
                            }
                            else if (element.classList.contains('ReCAP')) {
                                if (element.classList.contains("dummy-invalid")) {
                                    errorMessage = rules[i](false);
                                }
                                if (errorMessage) break;
                            }
            if (errorMessage) break;
        }

        if (errorMessage) {
            errorElement.innerText = errorMessage;
            getParent(element, '.form-group').classList.add('invalid');
        } else {
            errorElement.innerText = '';
            getParent(element, '.form-group').classList.remove('invalid');
        }
        return !errorMessage;
    }

    let formElement = document.querySelector(conditions.form);
    conditions.rules.forEach(function (rule) {

        // Lưu lại các rules cho mỗi input
        if (Array.isArray(selectorRules[rule.selector])) {
            selectorRules[rule.selector].push(rule.test);
        } else {
            selectorRules[rule.selector] = [rule.test];
        }
        var elements = formElement.querySelectorAll(rule.selector);

        Array.from(elements).forEach(function (element) {
            if (element.classList.contains('text-input')
                || element.classList.contains('form-checkbox')
                || element.classList.contains('form-radio')
                || element.classList.contains('file-input')
                || element.classList.contains('text-area')
            ) {
                validate(element, rule);
            }
            if (element.classList.contains('ckeditor')
            ) {
                validate(element, rule);
            }
            if (element.classList.contains('combobox')
            ) {
                validate(element, rule);
            }
            if (element.classList.contains('ReCAP')
            ) {
                validate(element, rule);
                return;
            }
        });
    });

    if (formElement.querySelectorAll('.invalid').length > 0)
        return false;
    else return true;
}


function getParent(wrapperElementClass, formGroupSelector) {
    while (wrapperElementClass.parentElement) {
        if (wrapperElementClass.parentElement.matches(formGroupSelector)) {
            return wrapperElementClass.parentElement;
        }
        wrapperElementClass = wrapperElementClass.parentElement;
    }
}
