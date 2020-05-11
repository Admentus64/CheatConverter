// JavaScript Document
// Author:      Admentus

function Address(hex) {   // Start Dynamic Class: Address
    
    // Private Attributes
    var self = this;
    
    var hexadecimal = "";
    var codeType = 0x00;
    var space = 0x00;
    var ram = 0x00;
    
    var regexp = /^[0-9a-fA-F]+$/;
    
    
    
    // Constructor
    var init = function() {   // Start Method: init
        
        if (!regexp.test(hex)) {
            hexadecimal = NaN;
            return;
        }
        
        hexadecimal = hex;
        
        if (hexadecimal.length == 8) {
            codeType = parseInt("0x" + hexadecimal.substring(0, 2));
            checkSpace();
            ram = parseInt("0x" + hexadecimal.substring(2, 8));
        }
        else ram = parseInt("0x" + hexadecimal);
        
    }; // End Method: init
    
    
    
    // Getters
    this.getComplete = function() {   // Start Method: getComplete
        
        var ct = self.getCodeType();
        if (self.getCodeType().length != 2)
            ct = "0" + ct;
        
        var s = self.getRam();
        while (s.length < 6)
            s = "0" + s;
        
        return ct.toString(16) + s.toString(16);
    
    }; // End Method: getComplete
    
    this.getCodeType = function()       { return codeType.toString(16); };              // Method: getCodeType
    this.getSpace = function()          { return space.toString(16); };                 // Method: getSpace
    this.getRam = function()            { return ram.toString(16); };                   // Method: getRam
    
    this.getCompleteValue = function()  { return parseInt("0x" + hexadecimal); };       // Method: getCompleteValue
    this.getCodeTypeValue = function()  { return codeType; };                           // Method: getCodeTypeValue
    this.getSpaceValue = function()     { return space; };                              // Method: getSpaceValue
    this.getRamValue = function()       { return ram; };                                // Method: getRamValue
    
    
    
    
    
    // Public Methods
    this.isLarger = function(obj) {   // Start Method: isLarger
        

        if (ram > obj.getRamValue())
            return true;
        return false;
        
    }; // End Method: isLarger
    
    this.isSmaller = function(obj) {   // Start Method: isSmaller
        
        if (ram < obj.getRamValue())
            return true;
        return false;
        
    }; // End Method: isSmaller
    
    this.swapSpace = function() {   // Start Method: changeSpace
        
        if (hexadecimal == "00000000")
            return;
        
        if (space == 0x81) {
            space = 0x80;
            codeType -= 1;
        }
        else {
            space = 0x81;
            codeType += 1;
        }
        
        hexadecimal = self.getCodeType() + self.getRam();
        
    }; // End Method: changeSpace
    
    this.add = function(value) {   // Start Method: add
        
        if (hexadecimal == "00000000")
            return;
        if (!regexp.test(value))
            return;
        
        ram += parseInt("0x" + value);
        hexadecimal = self.getCodeType() + self.getRam();
        return ram;
        
    }; // End Method: add
    
    this.remove = function(value) {   // Start Method: remove
        
        if (hexadecimal == "00000000")
            return;
        if (!regexp.test(value))
            return;
        
        ram -= parseInt("0x" + value);
        hexadecimal = self.getCodeType() + self.getRam();
        return ram;
        
    }; // End Method: remove
    
    this.outOfRange = function(min, max) {   // Start Method: outOfRange
        
        if (self.getCompleteValue() < min || self.getCompleteValue() > max)
            return true;
        return false;
        
    }; // End Method: outOfRange
    
    this.isHexadecimal = function() {   // Start Method: isHexadecimal
        
        if (regexp.test(hexadecimal))
            return true;
        return false;
        
    }; // End Method: isHexadecimal
    
    this.hasLength = function(length) {   // Start Method: hasLength
        
        if (hexadecimal.length == length)
            return true;
        return false;
        
    }; // End Method: hasLength
    
    
    
    // Private Methods
    var checkSpace = function() {   // Start Method: checkSpace
                
        if (codeType % 2 === 0)
            space = 0x80;
        else space = 0x81;
        
    }; // End Method: checkSpace
    
    
    
    // Private Commands
    init();                                                    // Initialize a new object instance by calling the init function
    
} // End Dynamic Class: Address