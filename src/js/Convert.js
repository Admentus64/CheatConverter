// JavaScript Document
// Author:      Admentus

var Convert = {   // Start Static Class: Convert
    
    // Class Variables
    
    swap_space_buttons: null,
    
    
    
    // Class Functions
    
    // Functions to run when the webpage is loaded (all HTML-code is executed). Initialize global variables and relates functions to buttons
    init: function() {   // Start Function: init
        
        Event.add(document.getElementById("offset_button"), "click", Convert.calculate);
        Event.add(document.getElementById("add_offset"), "click", Convert.addOffset);
        Event.add(document.getElementById("remove_offset"), "click", Convert.removeOffset);
        
        Convert.addOffset();
        
    }, // End Function: init
    
    
    
    addOffset: function() {   // Start Function: addOffset
        
        var div = document.createElement("div");
        var currentNumber = document.getElementById("offset_div").getElementsByTagName("div").length + 1;
        var elem;
        
        var span = document.createElement("span");
        div.appendChild(span);
        if (currentNumber > 9)
            elem = document.createTextNode("Offset " + currentNumber);
        else elem = document.createTextNode("Offset 0" + currentNumber);
        span.appendChild(elem);
        
        elem = document.createTextNode("Value:");
        div.appendChild(elem);
        
        elem = document.createElement("input");
        elem.type = "text";
        elem.className = "offset";
        elem.maxLength = "7";
        
        div.appendChild(elem);
        
        elem = document.createTextNode("From:");
        div.appendChild(elem);
        elem = document.createElement("input");
        elem.type = "text";
        elem.className = "offset_condition_from";
        elem.maxLength = "8";
        div.appendChild(elem);
        
        elem = document.createTextNode("To:");
        div.appendChild(elem);
        elem = document.createElement("input");
        elem.type = "text";
        elem.className = "offset_condition_to";
        elem.maxLength = "8";
        div.appendChild(elem);
        
        div.innerHTML += `
            <a title="Swap space for code memory lines: 80 &#x2194; 81" class="swap_space" data-value="off">
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
        
    }, // End Function: addOffset
    
    
    
    removeOffset: function() {   // Start Function: removeOffset
        
		var remove = document.getElementById('offset_div').lastChild;
        if (document.getElementById("offset_div").getElementsByTagName("div").length > 1)
            remove.parentNode.removeChild(remove);
        
    }, // End Function: removeOffset
    
    
    
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
        
        var post_code_textarea = document.getElementById("post_code_textarea");
        post_code_textarea.value = "";
        var i, j;
        var stop = false;
        
        var offset = [], offset_condition_from = [], offset_condition_to = [], subtract = [];
        offset.length = offset_textfield.length;
        offset_condition_from.length = offset_textfield.length;
        offset_condition_to.length = offset_textfield.length;
        subtract.length = offset_textfield.length;
        
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
        }
        
        for (i=0; i<offset.length; i++) {
            if (Convert.checkOffset(offset[i], "Offset value " + (i+1), post_code_textarea, 0x0, 0xFFFFFF))
                stop = true;
            if (Convert.checkOffset(offset_condition_from[i], "Offset Condition " + (i+1) + " from", post_code_textarea, 0x80000000, 0x81FFFFFF))
                stop = true;
            if (Convert.checkOffset(offset_condition_to[i], "Offset Condition " + (i+1) + " to", post_code_textarea, 0x80000000, 0x81FFFFFF))
                stop = true;
        }
        
		var pre_code = document.getElementById('pre_code_textarea').value.split('\n');
        var ram = [];
        var ram_value = [];
        
        if (document.getElementById('pre_code_textarea').value == "") {
            post_code_textarea.value += "There are no RAM memory code lines\n";
            stop = true;
        }
        
        if (post_code_textarea.value.indexOf("There are no RAM memory code lines") != -1)
            return;
        
        for (i=0; i<pre_code.length; i++) {
                var str = pre_code[i].split(" ");
                
                if (str.length != 2) {
                    post_code_textarea.value += "RAM memory line " + (i+1) + " must contain an address and value\n";
                    stop = true;
                }
                
                ram.push(new Address(str[0]));
                ram_value.push(new Address(str[1]));
        }
        
        for (i=0; i<pre_code.length; i++) {
            if (Convert.checkPreCode(ram[i], "RAM memory address line " + (i+1), post_code_textarea))
                stop = true;
            if (Convert.checkPreCode(ram_value[i], "RAM memory value line " + (i+1), post_code_textarea))
                stop = true;
        }
        
        if (stop)
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
            
            post_code_textarea.value += ram_string + " " + ram_value_string + "\r";
            
        }
        
    }, // End Function: calculate
    
    
    
    checkOffset: function(offset, msg, textarea, min, max) {   // Start Function: checkOffset
        
        if (!offset.isHexadecimal()) {
            textarea.value += msg + " is not hexadecimal\n";
            return true;
        }
        if (offset.outOfRange(min, max)) {
            textarea.value += msg + " is out of range\n";
            return true;
        }
        return false;
    
    }, // End Function: checkOffset
    
    
    
    checkPreCode: function(ram, msg, textarea) {   // Start Function: checkPreCode
        
        if (!ram.hasLength(8)) {
            textarea.value += msg + " is not a complete line\n";
            return true;
        }
        if (!ram.isHexadecimal()) {
            textarea.value += msg + " is not hexadecimal\n";
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