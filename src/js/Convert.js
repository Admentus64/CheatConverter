// JavaScript Document
// Author:      Admentus

var Convert = {   // Start Static Class: Convert
    
    // Class Variables
    
    swap_space_buttons: null,
    stop: false,
    pre_code_textarea: null,
    post_code_textarea: null,
    
    
    
    // Class Functions
    
    // Functions to run when the webpage is loaded (all HTML-code is executed). Initialize global variables and relates functions to buttons
    init: function() {   // Start Function: init
        
        Event.add(document.getElementById("offset_button"), "click", Convert.calculate);
        Event.add(document.getElementById("add_offset"), "click", Convert.addOffset);
        Event.add(document.getElementById("remove_offset"), "click", Convert.removeOffset);
        
        Convert.pre_code_textarea = document.getElementById("pre_code_textarea");
        Convert.post_code_textarea = document.getElementById("post_code_textarea");
        
        Convert.addOffset();
        
    }, // End Function: init
    
    
    
    addOffset: function() {   // Start Function: addOffset
        
        var div = document.createElement("div");
        var span, elem;
        
        span = document.createElement("span");
        span.className = "offset_lang";
        div.appendChild(span);
        elem = document.createTextNode("");
        span.appendChild(elem);
        
        span = document.createElement("span");
        span.className = "offset_value_lang";
        div.appendChild(span);
        elem = document.createTextNode("");
        span.appendChild(elem);
        
        elem = document.createElement("input");
        elem.type = "text";
        elem.className = "offset";
        elem.maxLength = "7";
        div.appendChild(elem);
        
        span = document.createElement("span");
        span.className = "offset_from_lang";
        div.appendChild(span);
        elem = document.createTextNode("");
        span.appendChild(elem);
        
        elem = document.createElement("input");
        elem.type = "text";
        elem.className = "offset_condition_from";
        elem.maxLength = "8";
        div.appendChild(elem);
        
        span = document.createElement("span");
        span.className = "offset_to_lang";
        div.appendChild(span);
        elem = document.createTextNode("");
        span.appendChild(elem);
        
        elem = document.createElement("input");
        elem.type = "text";
        elem.className = "offset_condition_to";
        elem.maxLength = "8";
        div.appendChild(elem);
        
        div.innerHTML += `
            <a class="swap_space" data-value="off">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path fill="none" d="M0 0h24v24H0V0z"/>
                    <path d="M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z"/>
                </svg>
            </a>
        `;
        
        document.getElementById("offset_div").appendChild(div);
        
        Convert.swap_space_buttons = document.getElementById("offset_div").getElementsByClassName("swap_space");
        for (var i=0; i<Convert.swap_space_buttons.length; i++)
            Event.add(Convert.swap_space_buttons[i], "click", Convert.toggleButton);
        
        Language.localizeOffsets();
        
    }, // End Function: addOffset
    
    
    
    removeOffset: function() {   // Start Function: removeOffset
        
		var remove = document.getElementById('offset_div').lastChild;
        if (document.getElementById("offset_div").getElementsByTagName("div").length > 0)
            remove.parentNode.removeChild(remove);
        
    }, // End Function: removeOffset
    
    
    
    removeAllOffsets: function() {   // Start Function: removeAllOffsets
        
		while (document.getElementById("offset_div").getElementsByTagName("div").length > 0)
            Convert.removeOffset();
        
    }, // End Function: removeAllOffsets
    
    
    
    fillPresets: function(amount) {   // Start Function: fillPresets
        
        while (document.getElementById("offset_div").getElementsByTagName("div").length < amount)
            Convert.addOffset();
        while (document.getElementById("offset_div").getElementsByTagName("div").length > amount)
            Convert.removeOffset();
        
    }, // End Function: fillPresets
    
    
    
    calculate: function() {   // Start Function: calculate
        
        var offset_textfield = document.getElementById("offset_div").getElementsByClassName("offset");
        var offset_condition_from_textfield = document.getElementById("offset_div").getElementsByClassName("offset_condition_from");
        var offset_condition_to_textfield = document.getElementById("offset_div").getElementsByClassName("offset_condition_to");
        
        var pre_code = Convert.pre_code_textarea.value.split('\n');
        var i, j;
        var offset = [], offset_condition_from = [], offset_condition_to = [], subtract = [], ram = [], ram_value = [];
        offset.length = offset_condition_from.length = offset_condition_to.length = subtract.length = offset_textfield.length;
        Convert.post_code_textarea.value = "";
        
        Convert.setStop(false);
        
        for (i=0; i<offset.length; i++) {
            
            if (offset_textfield[i].value.indexOf("-") >= 0) {
                subtract[i] = true;
                offset[i] = new Address(offset_textfield[i].value.substring(1));
            }
            else {
                subtract[i] = false;
                offset[i] = new Address(offset_textfield[i].value);
            }
            
            offset_condition_from[i] = new Address(offset_condition_from_textfield[i].value);
            offset_condition_to[i] = new Address(offset_condition_to_textfield[i].value);
            
            if (offset_textfield[i].value == "" && offset_condition_from_textfield[i].value == "" && offset_condition_to_textfield[i].value == "") {
                Convert.addError(Language.localizeOffsetError, i, 1);
            }
            else {
                Convert.checkOffset(offset[i], i, 0, 0x0, 0xFFFFFF);
                Convert.checkOffset(offset_condition_from[i], i, 2, 0x80000000, 0x81FFFFFF);
                Convert.checkOffset(offset_condition_to[i], i, 4, 0x80000000, 0x81FFFFFF);
            }
        }
        
        if (Convert.pre_code_textarea.value == "") {
            Convert.addError(Language.localizeNoCodeLinesError);
            throw "";
        }
        
        for (i=0; i<pre_code.length; i++) {
                var str = pre_code[i].split(" ");
                
                ram.push(new Address(str[0]));
                ram_value.push(new Address(str[1]));
                
                if (str.length != 2)
                    Convert.addError(Language.localizeCodeLineError, i, 1);
                else {
                    Convert.checkPreCode(ram[i], i, true);
                    Convert.checkPreCode(ram_value[i], i, false);
                }
        }
        
        if (Convert.stop)
            return;
        
        for (i=0; i<pre_code.length; i++) {
            
            var converted = false;
            
            for (j=0; j<offset.length; j++) {
                if (!converted)
                    if ( ram[i].isLarger(offset_condition_from[j]) && ram[i].isSmaller(offset_condition_to[j]) )
                        if ( ram[i].getSpace() == offset_condition_from[j].getSpace() && ram[i].getSpace() == offset_condition_to[j].getSpace() ) {
                            if (!subtract[j]) {
                                ram[i].add(offset[j].getRam());
                                converted = true;
                            }
                            else {
                                ram[i].remove(offset[j].getRam());
                                converted = true;
                            }
                            if (Convert.swap_space_buttons[j].getAttribute("data-value") == "on") {
                                ram[i].swapSpace();
                                converted = true;
                            }
                        }
            }
            
            var ram_string = ram[i].getComplete();
            var ram_value_string = ram_value[i].getComplete();
            
            Convert.post_code_textarea.value += ram_string + " " + ram_value_string;
            if (i < pre_code.length-1)
                Convert.post_code_textarea.value += "\r";
            
        }
        
    }, // End Function: calculate
    
    
    
    recalculateErrors: function() {   // Start Function: recalculateErrors
        
        if (Convert.stop)
            Convert.calculate();
        
    }, // End Function: recalculateErrors
    
    
    
    addError: function(errFunc, elem, type) {   // Start Function: addError
        
        var errStr = errFunc(elem, type);
        
        if (errStr.indexOf(" 0: ") >= 0)
            errStr = errStr.replace(" 0: ", " 00: ");
        else if (errStr.indexOf(" 1: ") >= 0)
            errStr = errStr.replace(" 1: ", " 01: ");
        else if (errStr.indexOf(" 2: ") >= 0)
            errStr = errStr.replace(" 2: ", " 02: ");
        else if (errStr.indexOf(" 3: ") >= 0)
            errStr = errStr.replace(" 3: ", " 03: ");
        else if (errStr.indexOf(" 4: ") >= 0)
            errStr = errStr.replace(" 4: ", " 04: ");
        else if (errStr.indexOf(" 5: ") >= 0)
            errStr = errStr.replace(" 5: ", " 05: ");
        else if (errStr.indexOf(" 6: ") >= 0)
            errStr = errStr.replace(" 6: ", " 06: ");
        else if (errStr.indexOf(" 7: ") >= 0)
            errStr = errStr.replace(" 7: ", " 07: ");
        else if (errStr.indexOf(" 8: ") >= 0)
            errStr = errStr.replace(" 8: ", " 08: ");
        else if (errStr.indexOf(" 9: ") >= 0)
            errStr = errStr.replace(" 9: ", " 09: ");
            
        Convert.post_code_textarea.value += errStr + "\n";
        Convert.setStop(true);
        
    }, // End Function: addError
    
    
    setStop: function(bool) {   // Start Function: setStop
        
        Convert.stop = bool;
        
        if (bool)
            Convert.post_code_textarea.className = "textarea_errors";
        else Convert.post_code_textarea.className = "textarea_codelines";
        
    }, // End Function: setStop
    
    
    
    checkOffset: function(offset, elem, type, min, max) {   // Start Function: checkOffset
        
        if (!offset.isHexadecimal()) {
            Convert.addError(Language.localizeOffsetError, elem, 2+type);
            return true;
        }
        if (offset.outOfRange(min, max)) {
            Convert.addError(Language.localizeOffsetError, elem, 3+type);
            Convert.setStop(true);
            return true;
        }
        return false;
    
    }, // End Function: checkOffset
    
    
    
    checkPreCode: function(ram, elem, isAddress) {   // Start Function: checkPreCode
        
        if (!ram.isHexadecimal()) {
            if (isAddress)
                Convert.addError(Language.localizeCodeLineError, elem, 3);
            else Convert.addError(Language.localizeCodeLineError, elem, 5);
            return true;
        }
        if (!ram.hasLength(8)) {
            if (isAddress)
                Convert.addError(Language.localizeCodeLineError, elem, 2);
            else Convert.addError(Language.localizeCodeLineError, elem, 4);
            return true;
        }
        
        return false;
    
    }, // End Function: checkPreCode
    
    
    
    toggleButton: function() {   // Start Function: toggleGlobalButton
        
        if (this.getAttribute("data-value") == "off")
            this.setAttribute("data-value", "on");
        else this.setAttribute("data-value", "off");
        
    }, // End Function: toggleGlobalButton
    
}; // End Static Class: Convert



Event.add(window, "DOMContentLoaded", Convert.init);					    // Active function init when the DOM Content is loaded