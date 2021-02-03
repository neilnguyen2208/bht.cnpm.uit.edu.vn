//#region validation html elements not 

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
        var errorElement = getParent(element, conditions.formGroupSelector).querySelector(conditions.errorSelector);
        var errorMessage;

        // Lấy ra các rules của selector
        var rules = selectorRules[rule.selector];

        // Lặp qua từng rule & kiểm tra
        // Nếu có lỗi thì dừng việc kiểm
        for (var i = 0; i < rules.length; ++i) {

            if (element.classList.contains('form-input')) {
                errorMessage = rules[i](element.value);
                if (errorMessage) break;
            }
            else
                if (element.classList.contains('form-combobox')) {
                    document.getElementById("d-e-" + element.id).innerText = rules[i](false);
                    document.getElementById("d-f-g-" + element.id).innerText = conditions.formGroupSelector;
                    document.getElementById("d-e-s-" + element.id).innerText = conditions.errorSelector;
                    if (errorMessage) break;
                }
                else
                    if (element.classList.contains('form-ckeditor')) {

                        //kiem tra xem co class dummy invalid hay khong
                        document.getElementById("d-e-" + element.id).innerText = rules[i](false);
                        document.getElementById("d-f-g-" + element.id).innerText = conditions.formGroupSelector;
                        document.getElementById("d-e-s-" + element.id).innerText = conditions.errorSelector;

                        if (errorMessage) break;
                    }
                    else
                        if (element.classList.contains('form-radio') || element.classList.contains('form-check-box')) {
                            errorMessage = rules[i](formElement.querySelector(rule.selector + ':checked'));
                        }

            if (errorMessage) break;
        }

        if (errorMessage) {
            errorElement.innerText = errorMessage;
            getParent(element, conditions.formGroupSelector).classList.add('invalid');

        } else {
            errorElement.innerText = '';
            getParent(element, conditions.formGroupSelector).classList.remove('invalid');
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
                if (element.classList.contains('form-input')
                    || element.classList.contains('form-check-box')
                    || element.classList.contains('form-radio')
                    || element.classList.contains('form-file-input')) {

                    //xu ly cac HTMLInputElement
                    // Xử lý trường hợp blur khỏi input
                    element.onblur = function () {
                        validate(element, rule);
                    }

                    // Xử lý mỗi khi người dùng nhập vào input
                    element.oninput = function () {
                        var errorElement = getParent(element, conditions.formGroupSelector).querySelector(conditions.errorSelector);
                        errorElement.innerText = '';
                        getParent(element, conditions.formGroupSelector).classList.remove('invalid');
                    }
                    //neu la HTMLInputElement => vong lap tiep theo
                    return;
                }

                if (element.classList.contains('form-combobox')
                ) {
                    validate(element, rule);
                    return;
                }

                if (element.classList.contains('form-ckeditor')
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
    if (type === 'form-input') {
        return {
            selector: '#' + selector,
            type: type,
            test: function (value) {
                return value ? '' : message || 'Vui lòng nhập trường này'
            }
        };
    }
    if (type === 'form-combobox') {
        return {
            selector: '#combobox-wrapper-' + selector,
            type: type,
            test: function (value) {
                //  kiem tra xem co class dummy invalid hay khong o ben tren
                return value ? undefined : message || 'Vui lòng chọn một option'
            }
        }
    }
    if (type === 'form-ckeditor') {
        return {
            selector: '#cke-wrapper-' + selector,
            type: type,
            test: function (value) {

                //  kiem tra xem co class dummy invalid hay khong o ben tren
                return value ? undefined : message || 'Vui lòng nhập trường này'
            }
        }
    }
    if (type === 'form-file-input') {
        return {
            selector: '#' + selector,
            type: type,
            test: function (value) {
                console.log(value);
                //  kiem tra xem co class dummy invalid hay khong o ben tren
                return value ? undefined : message || 'Vui lòng nhập trường này'
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
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : message || 'Trường này phải là email';
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
validation.isConfirmed = function (selector, type, getConfirmValue, message) {
    return {
        selector: selector,
        type: type,
        test: function (value) {
            return value === getConfirmValue() ? undefined : message || 'Giá trị nhập vào không chính xác';
        }
    }
}

validation.isNotAllowSpecialCharacter = function (selector, type, message) {
    return {
        selector: '#' + selector,
        type: type,
        test: function (value) {
            return !/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/.test(value) ? undefined : message || 'Vui lòng nhập trường này'
        }
    };
}
//#endregion

//check kieu khac khong the mo rong nhu ben tren
export function styleFormSubmit(conditions) {
    //chon tat ca cac combobox co validation
    let selectorRules = {};
    let isFormValid = true;
    function validate(element, rule) {
        let errorElement = getParent(element, conditions.formGroupSelector).querySelector(conditions.errorSelector);
        let errorMessage;
        let rules = selectorRules[rule.selector];
        // Lặp qua từng rule & kiểm tra
        // Nếu có lỗi thì dừng việc kiểm
        for (var i = 0; i < rules.length; ++i) {
            if (element.classList.contains('form-input')) {
                errorMessage = rules[i](element.value);
                if (errorMessage) break;
            }
            else
                if (element.classList.contains('form-combobox')) {
                    if (element.classList.contains("dummy-invalid")) {
                        errorMessage = rules[i](false);
                    }
                    if (errorMessage) break;
                }
                else
                    if (element.classList.contains('form-ckeditor')) {
                        errorMessage = rules[i](window.CKEDITOR.instances["ck-editor-" + element.id.substring(12)].getData());
                        if (errorMessage) {
                            element.classList.add('invalid');
                            break;
                        }
                    }
                    else
                        if (element.classList.contains('form-radio') || element.classList.contains('form-check-box')) {
                            errorMessage = rules[i](formElement.querySelector(rule.selector + ':checked'));
                        }
                        else
                            if (element.classList.contains('form-file-input')) {
                                errorMessage = rules[i](element.value);
                                if (errorMessage) break;
                            }

            if (errorMessage) break;
        }

        if (errorMessage) {
            errorElement.innerText = errorMessage;
            getParent(element, conditions.formGroupSelector).classList.add('invalid');

        } else {
            errorElement.innerText = '';
            getParent(element, conditions.formGroupSelector).classList.remove('invalid');
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
            if (element.classList.contains('form-input')
                || element.classList.contains('form-check-box')
                || element.classList.contains('form-radio')
                || element.classList.contains('form-file-input')
            ) {
                isFormValid = validate(element, rule)
                return;
            }

            if (element.classList.contains('form-combobox')
            ) {
                isFormValid = validate(element, rule);
                return;
            }

            if (element.classList.contains('form-ckeditor')
            ) {
                isFormValid = validate(element, rule);
                return;
            }
        });
    });
    return isFormValid;
}


function getParent(wrapperElementClass, formGroupSelector) {
    while (wrapperElementClass.parentElement) {
        if (wrapperElementClass.parentElement.matches(formGroupSelector)) {
            return wrapperElementClass.parentElement;
        }
        wrapperElementClass = wrapperElementClass.parentElement;
    }
}
