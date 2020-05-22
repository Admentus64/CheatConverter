// JavaScript Document
// Author:      Admentus

// Functions

var Preset = {   // Start Static Class: Preset
    
    // Class Variables
    
    select_preset_from: null,
    select_preset_to: null,
    
    
    
    // Class Functions
    
    // Functions to run when the webpage is loaded (all HTML-code is executed). Initialize global variables and relates functions to buttons
    init: function() {   // Start Function: select
        
        Preset.select_preset_from = document.getElementById("select_preset_from");
        Preset.select_preset_to = document.getElementById("select_preset_to");
        
        Event.add(Preset.select_preset_from, "change", Preset.select);
        Event.add(Preset.select_preset_to, "change", Preset.select);
        Event.add(document.getElementById("swap_select"), "click", Preset.swap);
        
        for (i=1; i<Preset.select_preset_to.length; i++)
            Preset.select_preset_to[i].disabled = true;
            
        Event.add(document.getElementById("search_bar"), "input", Preset.search);
        
    }, // End Function: select
    
    
    
    search: function() {   // Start Function: search
        
        var filter = document.getElementById("search_bar").value.toUpperCase();
        Preset.searchSelect(filter, Preset.select_preset_from);
        Preset.searchSelect(filter, Preset.select_preset_to);
        
    }, // End Function: search
    
    
    
    searchSelect: function(filter, select) {   // Start Function: searchSelect
        
        for (var i=0; i<select.length; i++) {
            var option = select[i];
            var textContent = option.textContent;
            if (textContent.toUpperCase().indexOf(filter) > -1 && option.value != "None")
                option.style.display = "";
            else if (option.value != "None")
                option.style.display = "none";
        }
        
    }, // End Function: searchSelect
    
    
    
    select: function() {   // Start Function: select
        
        var offset_textfield = document.getElementById("offset_div").getElementsByClassName("offset");
        var offset_condition_from_textfield = document.getElementById("offset_div").getElementsByClassName("offset_condition_from");
        var offset_condition_to_textfield = document.getElementById("offset_div").getElementsByClassName("offset_condition_to");
        var swapSpace = document.getElementById("offset_div").getElementsByClassName("swap_space");
        
        if (this.id == "select_preset_from") {
            Preset.select_preset_to.value = "None";
            Preset.disable(this.value);
        }
        
        if (Preset.select_preset_from.value != "None" && Preset.select_preset_to.value != "None")
            Convert.removeAllOffsets();
        else Preset.reset(swapSpace);
        
        Preset.selectGameCombo(swapSpace);
        
    }, // End Function: select
    
    
    
    swap: function() {   // Start Function: swap
        
        if (Preset.selectFrom() != "None" && Preset.selectTo() != "None") {
            
            var temp = Preset.selectFrom();
            Preset.select_preset_from.value = Preset.selectTo();
            Preset.select_preset_to.value = temp;
            Preset.disable(Preset.selectTo());
            
        }
        
        Preset.select();
        
    },   // End Function: swap
    
    
    
    selectFrom: function()   { return select_preset_from.value; },   // Function: getSelectFrom
    selectTo: function()    { return select_preset_to.value; },      // Function: getSelectTo
    
    
    
    reset: function(swapSpace) {   // Start Function: reset
        
        Convert.fillPresets(1);
        
        document.getElementById("offset_div").getElementsByClassName("offset")[0].value = "";
        document.getElementById("offset_div").getElementsByClassName("offset_condition_from")[0].value = "";
        document.getElementById("offset_div").getElementsByClassName("offset_condition_to")[0].value = "";
        swapSpace[0].setAttribute("data-value", "off");
        
    }, // End Function: reset
    
    
    
    addOffset: function(value, start, end) {   // Start Function: addOffset
        
        Convert.addOffset();
        
        var offset_textfield = document.getElementById("offset_div").getElementsByClassName("offset");
        var offset_condition_from_textfield = document.getElementById("offset_div").getElementsByClassName("offset_condition_from");
        var offset_condition_to_textfield = document.getElementById("offset_div").getElementsByClassName("offset_condition_to");
        
        offset_textfield[offset_textfield.length-1].value = value;
        offset_condition_from_textfield[offset_condition_from_textfield.length-1].value = start;
        offset_condition_to_textfield[offset_condition_to_textfield.length-1].value = end;
        
    }, // End Function: addOffset
    
    
    
    disable: function(value) {   // Start Function: disable
        
        for (var i=1; i<Preset.select_preset_to.length; i++) {
            Preset.select_preset_to[i].disabled = true;
            
            if (value.indexOf("Ocarina of Time") >= 0 || value.indexOf("Master Quest") >= 0)
                if ((Preset.select_preset_to[i].value.indexOf("Ocarina of Time") >= 0 || Preset.select_preset_to[i].value.indexOf("Master Quest") >= 0) && Preset.select_preset_to[i].value != value)
                    Preset.select_preset_to[i].disabled = false;
            if (value.indexOf("Majora's Mask") >= 0)
                if (Preset.select_preset_to[i].value.indexOf("Majora's Mask") >= 0 && Preset.select_preset_to[i].value != value)
                    Preset.select_preset_to[i].disabled = false;
            if (value.indexOf("Super Mario 64") >= 0)
                if (Preset.select_preset_to[i].value.indexOf("Super Mario 64") >= 0 && Preset.select_preset_to[i].value != value)
                Preset.select_preset_to[i].disabled = false;
                
            // TEMP DISABLE
            // if (Preset.select_preset_to[i].value.indexOf("(VC)") >= 0)
            //    Preset.select_preset_to[i].disabled = true;
        }
        
    }, // End Function: disable
    
    
    
    selectGameCombo: function(swapSpace) {   // Start Function: selectGameCombo
        
        // ----------------------- //
        // --- Ocarina of Time --- //
        // ----------------------- //
        
        if (Preset.selectFrom() == "Ocarina of Time (GC) (NTSC-U) (D43E01)") {
            if (Preset.selectTo() == "Ocarina of Time (GC) (PAL) (D43P01)")
                us_regOotGC_to_pal_regOotGC(swapSpace);
            if (Preset.selectTo() == "Ocarina of Time (GC) (NTSC-U) (PZLE01)")
                us_regOotGC_to_us_ootGC(swapSpace);
            if (Preset.selectTo() == "Ocarina of Time (GC) (PAL) (PZLP01)")
                us_regOotGC_to_pal_ootGC(swapSpace);
            if (Preset.selectTo() == "Ocarina of Time (VC) (NTSC-U) (NACE01)")
                us_regOotGC_to_us_ootVC(swapSpace);
            if (Preset.selectTo() == "Ocarina of Time (VC) (PAL) (NACP01)")
                us_regOotGC_to_pal_ootVC(swapSpace);
            if (Preset.selectTo() == "Master Quest (GC) (NTSC-U) (D43E01)")
                us_regOotGC_to_us_mqOotGC(swapSpace);
            if (Preset.selectTo() == "Master Quest (GC) (PAL) (D43P01)")
                us_regOotGC_to_pal_mqOotGC(swapSpace);
        }
        
        if (Preset.selectFrom() == "Ocarina of Time (GC) (PAL) (D43P01)") {
            if (Preset.selectTo() == "Ocarina of Time (GC) (NTSC-U) (D43E01)")
                pal_regOotGC_to_us_regOotGC(swapSpace);
            if (Preset.selectTo() == "Ocarina of Time (GC) (NTSC-U) (PZLE01)")
                pal_regOotGC_to_us_ootGC(swapSpace);
            if (Preset.selectTo() == "Ocarina of Time (GC) (PAL) (PZLP01)")
                pal_regOotGC_to_pal_ootGC(swapSpace);
            if (Preset.selectTo() == "Ocarina of Time (VC) (NTSC-U) (NACE01)")
                pal_regOotGC_to_us_ootVC(swapSpace);
            if (Preset.selectTo() == "Ocarina of Time (VC) (PAL) (NACP01)")
                pal_regOotGC_to_pal_ootVC(swapSpace);
            if (Preset.selectTo() == "Master Quest (GC) (NTSC-U) (D43E01)")
                pal_regOotGC_to_us_mqOotGC(swapSpace);
            if (Preset.selectTo() == "Master Quest (GC) (PAL) (D43P01)")
                pal_regOotGC_to_pal_mqOotGC(swapSpace);
        }
        
        if (Preset.selectFrom() == "Ocarina of Time (GC) (NTSC-U) (PZLE01)") {
            if (Preset.selectTo() == "Ocarina of Time (GC) (NTSC-U) (D43E01)")
                us_ootGC_to_us_regOotGC(swapSpace);
            if (Preset.selectTo() == "Ocarina of Time (GC) (PAL) (D43P01)")
                us_ootGC_to_pal_regOotGC(swapSpace);
            if (Preset.selectTo() == "Ocarina of Time (GC) (PAL) (PZLP01)")
                us_ootGC_to_pal_ootGC(swapSpace);
            if (Preset.selectTo() == "Ocarina of Time (VC) (NTSC-U) (NACE01)")
                us_ootGC_to_us_ootVC(swapSpace);
            if (Preset.selectTo() == "Ocarina of Time (VC) (PAL) (NACP01)")
                us_ootGC_to_pal_ootVC(swapSpace);
            if (Preset.selectTo() == "Master Quest (GC) (NTSC-U) (D43E01)")
                us_ootGC_to_us_mqOotGC(swapSpace);
            if (Preset.selectTo() == "Master Quest (GC) (PAL) (D43P01)")
                us_ootGC_to_pal_mqOotGC(swapSpace);
        }
        
        if (Preset.selectFrom() == "Ocarina of Time (GC) (PAL) (PZLP01)") {
            if (Preset.selectTo() == "Ocarina of Time (GC) (NTSC-U) (D43E01)")
                pal_ootGC_to_us_regOotGC(swapSpace);
            if (Preset.selectTo() == "Ocarina of Time (GC) (PAL) (D43P01)")
                pal_ootGC_to_pal_regOotGC(swapSpace);
            if (Preset.selectTo() == "Ocarina of Time (GC) (NTSC-U) (PZLE01)")
                pal_ootGC_to_us_ootGC(swapSpace);
            if (Preset.selectTo() == "Ocarina of Time (VC) (NTSC-U) (NACE01)")
                pal_ootGC_to_us_ootVC(swapSpace);
            if (Preset.selectTo() == "Ocarina of Time (VC) (PAL) (NACP01)")
                pal_ootGC_to_pal_ootVC(swapSpace);
            if (Preset.selectTo() == "Master Quest (GC) (NTSC-U) (D43E01)")
                pal_ootGC_to_us_mqOotGC(swapSpace);
            if (Preset.selectTo() == "Master Quest (GC) (PAL) (D43P01)")
                pal_ootGC_to_pal_mqOotGC(swapSpace);
        }
        
        if (Preset.selectFrom() == "Ocarina of Time (VC) (NTSC-U) (NACE01)") {
            if (Preset.selectTo() == "Ocarina of Time (GC) (NTSC-U) (D43E01)")
                us_ootVC_to_us_regOotGC(swapSpace);
            if (Preset.selectTo() == "Ocarina of Time (GC) (PAL) (D43P01)")
                us_ootVC_to_pal_regOotGC(swapSpace);
            if (Preset.selectTo() == "Ocarina of Time (GC) (NTSC-U) (PZLE01)")
                us_ootVC_to_us_ootGC(swapSpace);
            if (Preset.selectTo() == "Ocarina of Time (GC) (PAL) (PZLP01)")
                us_ootVC_to_pal_ootGC(swapSpace);
            if (Preset.selectTo() == "Ocarina of Time (VC) (PAL) (NACP01)")
                us_ootVC_to_pal_ootVC(swapSpace);
            if (Preset.selectTo() == "Master Quest (GC) (NTSC-U) (D43E01)")
                us_ootVC_to_us_mqOotGC(swapSpace);
            if (Preset.selectTo() == "Master Quest (GC) (NTSC-U) (D43P01)")
                us_ootVC_to_pal_mqOotGC(swapSpace);
        }
        
        if (Preset.selectFrom() == "Ocarina of Time (VC) (PAL) (NACP01)") {
            if (Preset.selectTo() == "Ocarina of Time (GC) (NTSC-U) (D43E01)")
                pal_ootVC_to_us_regOotGC(swapSpace);
            if (Preset.selectTo() == "Ocarina of Time (GC) (PAL) (D43P01)")
                pal_ootVC_to_pal_regOotGC(swapSpace);
            if (Preset.selectTo() == "Ocarina of Time (GC) (NTSC-U) (PZLE01)")
                pal_ootVC_to_us_ootGC(swapSpace);
            if (Preset.selectTo() == "Ocarina of Time (GC) (PAL) (PZLP01)")
                pal_ootVC_to_pal_ootGC(swapSpace);
            if (Preset.selectTo() == "Ocarina of Time (VC) (NTSC-U) (NACE01)")
                pal_ootVC_to_us_ootVC(swapSpace);
            if (Preset.selectTo() == "Master Quest (GC) (NTSC-U) (D43E01)")
                pal_ootVC_to_us_mqOotGC(swapSpace);
            if (Preset.selectTo() == "Master Quest (GC) (NTSC-U) (D43P01)")
                pal_ootVC_to_pal_mqOotGC(swapSpace);
        }
        
        
        
        // -------------------- //
        // --- Master Quest --- //
        // -------------------- //
        
        if (Preset.selectFrom() == "Master Quest (GC) (NTSC-U) (D43E01)") {
            if (Preset.selectTo() == "Ocarina of Time (GC) (NTSC-U) (D43E01)")
                us_mqOotGC_to_us_regOotGC(swapSpace);
            if (Preset.selectTo() == "Ocarina of Time (GC) (PAL) (D43P01)")
                us_mqOotGC_to_pal_regOotGC(swapSpace);
            if (Preset.selectTo() == "Ocarina of Time (GC) (NTSC-U) (PZLE01)")
                us_mqOotGC_to_us_ootGC(swapSpace);
            if (Preset.selectTo() == "Ocarina of Time (GC) (PAL) (PZLP01)")
                us_mqOotGC_to_pal_ootGC(swapSpace);
            if (Preset.selectTo() == "Ocarina of Time (VC) (NTSC-U) (NACE01)")
                us_mqOotGC_to_us_ootVC(swapSpace);
            if (Preset.selectTo() == "Ocarina of Time (VC) (PAL) (NACP01)")
                us_mqOotGC_to_pal_ootVC(swapSpace);
            if (Preset.selectTo() == "Master Quest (GC) (NTSC-U) (D43P01)")
                us_mqOotGC_to_pal_mqOotGC(swapSpace);
        }
        
        if (Preset.selectFrom() == "Master Quest (GC) (PAL) (D43P01)") {
            if (Preset.selectTo() == "Ocarina of Time (GC) (NTSC-U) (D43E01)")
                pal_mqOotGC_to_us_regOotGC(swapSpace);
            if (Preset.selectTo() == "Ocarina of Time (GC) (PAL) (D43P01)")
                pal_mqOotGC_to_pal_regOotGC(swapSpace);
            if (Preset.selectTo() == "Ocarina of Time (GC) (NTSC-U) (PZLE01)")
                pal_mqOotGC_to_us_ootGC(swapSpace);
            if (Preset.selectTo() == "Ocarina of Time (GC) (PAL) (PZLP01)")
                pal_mqOotGC_to_pal_ootGC(swapSpace);
            if (Preset.selectTo() == "Ocarina of Time (VC) (NTSC-U) (NACE01)")
                pal_mqOotGC_to_us_ootVC(swapSpace);
            if (Preset.selectTo() == "Ocarina of Time (VC) (PAL) (NACP01)")
                pal_mqOotGC_to_pal_ootVC(swapSpace);
            if (Preset.selectTo() == "Master Quest (GC) (NTSC-U) (D43E01)")
                pal_mqOotGC_to_us_mqOotGC(swapSpace);
        }
        
        
        
        // --------------------- //
        // --- Majora's Mask --- //
        // --------------------- //
        
        if (Preset.selectFrom() == "Majora's Mask (GC) (NTSC-U) (PZLE01)") {
            if (Preset.selectTo() == "Majora's Mask (GC) (PAL) (PZLP01)")
                us_mmGC_to_pal_mmGC(swapSpace);
            if (Preset.selectTo() == "Majora's Mask (VC) (NTSC-U) (NARE01)")
                us_mmGC_to_us_mmVC(swapSpace);
            if (Preset.selectTo() == "Majora's Mask (VC) (PAL) (NARP01)")
                us_mmGC_to_pal_mmVC(swapSpace);
        }
        
        if (Preset.selectFrom() == "Majora's Mask (GC) (PAL) (PZLP01)") {
            if (Preset.selectTo() == "Majora's Mask (GC) (NTSC-U) (PZLE01)")
                pal_mmGC_to_us_mmGC(swapSpace);
            if (Preset.selectTo() == "Majora's Mask (VC) (NTSC-U) (NARE01)")
                pal_mmGC_to_us_mmVC(swapSpace);
            if (Preset.selectTo() == "Majora's Mask (VC) (PAL) (NARP01)")
                pal_mmGC_to_pal_mmVC(swapSpace);
        }
        
        if (Preset.selectFrom() == "Majora's Mask (VC) (NTSC-U) (NARE01)") {
            if (Preset.selectTo() == "Majora's Mask (GC) (NTSC-U) (PZLE01)")
                us_mmVC_to_us_mmGC(swapSpace);
            if (Preset.selectTo() == "Majora's Mask (GC) (PAL) (PZLP01)")
                us_mmVC_to_pal_mmGC(swapSpace);
            if (Preset.selectTo() == "Majora's Mask (VC) (PAL) (NARP01)")
                us_mmVC_to_pal_mmVC(swapSpace);
        }
        
        if (Preset.selectFrom() == "Majora's Mask (VC) (NTSC-U) (NARP01)") {
            if (Preset.selectTo() == "Majora's Mask (GC) (NTSC-U) (PZLE01)")
                pal_mmVC_to_us_mmGC(swapSpace);
            if (Preset.selectTo() == "Majora's Mask (GC) (PAL) (PZLP01)")
                pal_mmVC_to_pal_mmGC(swapSpace);
            if (Preset.selectTo() == "Majora's Mask (VC) (NTSC-U) (NARE01)")
                pal_mmVC_to_us_mmVC(swapSpace);
        }
        
        
        
        // ---------------------- //
        // --- Super Mario 64 --- //
        // ---------------------- //
        
        if (Preset.selectFrom() == "Super Mario 64 (VC) (NTSC-U) (NAAE01)")
            if (Preset.selectTo() == "Super Mario 64 (VC) (PAL) (NAAP01)")
                us_sm64VC_to_pal_sm64VC(swapSpace);
        if (Preset.selectFrom() == "Super Mario 64 (VC) (PAL) (NAAP01)")
            if (Preset.selectTo() == "Super Mario 64 (VC) (NTSC-U) (NAAE01)")
                pal_sm64VC_to_us_sm64VC(swapSpace);
        
    }, // End Function: selectGameCombo
    
    
    
    reverseGameCombo: function() {   // Start Function: reverseGameCombo
        
        var offset_textfield = document.getElementById("offset_div").getElementsByClassName("offset");
        var offset_condition_from_textfield = document.getElementById("offset_div").getElementsByClassName("offset_condition_from");
        var offset_condition_to_textfield = document.getElementById("offset_div").getElementsByClassName("offset_condition_to");
        var swapSpace = document.getElementById("offset_div").getElementsByClassName("swap_space");
        
        for (var i=0; i<offset_textfield.length; i++) {
            
            var offset;
            var subtract = false;
        
            if (offset_textfield[i].value.indexOf("-") >= 0) {
                offset_textfield[i].value = offset_textfield[i].value.substring(1, offset_textfield[i].value.length);
                offset = parseInt("0x" + offset_textfield[i].value);
            }
            else {
                offset_textfield[i].value = "-" + offset_textfield[i].value;
                offset = parseInt("0x" + offset_textfield[i].value.substring(1, offset_textfield[i].value.length));
                subtract = true;
            }
            
            var offset_from = parseInt("0x" + offset_condition_from_textfield[i].value);
            var offset_to = parseInt("0x" + offset_condition_to_textfield[i].value);
            
            if (subtract) {
                if (offset_from > 0x80000000 && offset_from < (0x80FFFFFF - offset))
                    offset_from += offset;
                else if (offset_from > 0x81000000 && offset_from < (0x81FFFFFF - offset))
                    offset_from += offset;
                if (offset_to > 0x80000000 && offset_to < (0x80FFFFFF - offset))
                    offset_to += offset;
                else if (offset_to > 0x81000000 && offset_to < (0x81FFFFFF - offset))
                    offset_to += offset;
            }
            else {
                if (offset_from > (0x80000000 + offset) && offset_from < 0x80FFFFFF)
                    offset_from -= offset;
                else if (offset_from > (0x81000000 + offset) && offset_from < 0x81FFFFFF)
                    offset_from -= offset;
                if (offset_to > (0x80000000 + offset) && offset_to < 0x80FFFFFF)
                    offset_to -= offset;
                else if (offset_to > (0x81000000 + offset) && offset_to < 0x81FFFFFF)
                    offset_to -= offset;
            }
            
            offset_condition_from_textfield[i].value = offset_from.toString(16);
            offset_condition_to_textfield[i].value = offset_to.toString(16);
            
            if (swapSpace[i].getAttribute("data-value") == "on") {
                //console.log(offset_condition_from_textfield[i].value + " - " + offset_condition_from_textfield[i].value.substring(0, 2).indexOf("80"));
                if (offset_condition_from_textfield[i].value.substring(0, 2).indexOf("80") >= 0) {
                    offset_condition_from_textfield[i].value = offset_condition_from_textfield[i].value.replace("80", "81");
                    offset_condition_to_textfield[i].value = offset_condition_to_textfield[i].value.replace("80", "81");
                }
                else {
                    offset_condition_from_textfield[i].value = offset_condition_from_textfield[i].value.replace("81", "80");
                    offset_condition_to_textfield[i].value = offset_condition_to_textfield[i].value.replace("81", "80");
                }
            }
        
        }
    
    } // End Function: reverseGameCombo
    
}; // End Static Class: Preset



Event.add(window, "DOMContentLoaded", Preset.init);					        // Active function init when the DOM Content is loaded



// ------------------------ //
// --- Ocarina of Time --- //
// ------------------------ //



// ----------------- Set 1



// Ocarina of Time (GC) (NTSC-U) (D43E01) -> Ocarina of Time (GC) (PAL) (D43P01)
function us_regOotGC_to_pal_regOotGC(swapSpace) {   // Start Function: us_regOotGC_to_pal_regOotGC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "off");
    
} // End Function: us_regOotGC_to_pal_regOotGC

// Ocarina of Time (GC) (NTSC-U) (D43E01) -> Ocarina of Time (GC) (NTSC-U) (PZLP01)
function us_regOotGC_to_us_ootGC(swapSpace) {   // Start Function: us_regOotGC_to_us_ootGC
    
    Preset.addOffset("-1560", "80CA0000", "80FFFFFF");
    Preset.addOffset("-1580", "80BE0000", "80C9FFFF");
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "off");
    
} // End Function: us_regOotGC_to_us_ootGC

// Ocarina of Time (GC) (NTSC-U) (D43E01) -> Ocarina of Time (GC) (PAL) (PZLP01)
function us_regOotGC_to_pal_ootGC(swapSpace) {   // Start Function: us_regOotGC_to_pal_ootGC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "off");
    
} // End Function: us_regOotGC_to_pal_ootGC

// Ocarina of Time (GC) (NTSC-U) (D43E01) -> Ocarina of Time (VC) (NTSC-U) (NACP01)
function us_regOotGC_to_us_ootVC(swapSpace) {   // Start Function: us_regOotGC_to_us_ootVC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "on");
    
} // End Function: us_regOotGC_to_us_ootVC

// Ocarina of Time (GC) (NTSC-U) (D43E01) -> Ocarina of Time (VC) (PAL) (NACP01)
function us_regOotGC_to_pal_ootVC(swapSpace) {   // Start Function: us_regOotGC_to_pal_ootVC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "on");
    
} // End Function: us_regOotGC_to_pal_ootVC

// Ocarina of Time (GC) (NTSC-U) (D43E01) -> Master Quest (GC) (NTSC-U) (D43E01)
function us_regOotGC_to_us_mqOotGC(swapSpace) {   // Start Function: us_regOotGC_to_us_mqOotGC
    
    us_mqOotGC_to_us_regOotGC(swapSpace);
    Preset.reverseGameCombo(swapSpace);
    
} // End Function: us_regOotGC_to_us_mqOotGC

// Ocarina of Time (GC) (NTSC-U) (PZL) -> Master Quest (GC) (PAL) (D43PE01)
function us_regOotGC_to_pal_mqOotGC(swapSpace) {   // Start Function: us_regOotGC_to_pal_mqOotGC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "off");
    
} // End Function: us_regOotGC_to_pal_mqOotGC



// ----------------- Set 2



// Ocarina of Time (GC) (PAL) (D43P01) -> Ocarina of Time (GC) (PAL) (D43E01)
function pal_regOotGC_to_us_regOotGC(swapSpace) {   // Start Function: pal_regOotGC_to_us_regOotGC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "off");
    
} // End Function: pal_regOotGC_to_us_regOotGC

// Ocarina of Time (GC) (PAL) (D43P01) -> Ocarina of Time (GC) (NTSC-U) (PZLE01)
function pal_regOotGC_to_us_ootGC(swapSpace) {   // Start Function: pal_regOotGC_to_us_ootGC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "off");
    
} // End Function: pal_regOotGC_to_us_ootGC

// Ocarina of Time (GC) (PAL) (D43P01) -> Ocarina of Time (GC) (PAL) (PZLP01)
function pal_regOotGC_to_pal_ootGC(swapSpace) {   // Start Function: pal_regOotGC_to_pal_ootGC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "off");
    
} // End Function: pal_regOotGC_to_pal_ootGC

// Ocarina of Time (GC) (PAL) (D43P01) -> Ocarina of Time (VC) (NTSC-U) (NACE01)
function pal_regOotGC_to_us_ootVC(swapSpace) {   // Start Function: pal_regOotGC_to_us_ootVC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "on");
    
} // End Function: pal_regOotGC_to_us_ootVC

// Ocarina of Time (GC) (PAL) (D43P01) -> Ocarina of Time (VC) (PAL) (NACP01)
function pal_regOotGC_to_pal_ootVC(swapSpace) {   // Start Function: pal_regOotGC_to_pal_ootVC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "on");
    
} // End Function: pal_regOotGC_to_pal_ootVC

// Ocarina of Time (GC) (PAL) (D43P01) -> Master Quest (GC) (NTSC-U) (D43E01)
function pal_regOotGC_to_us_mqOotGC(swapSpace) {   // Start Function: pal_regOotGC_to_us_mqOotGC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "off");
    
} // End Function: pal_regOotGC_to_us_mqOotGC

// Ocarina of Time (GC) (PAL) (D43P01) -> Master Quest (GC) (PAL) (D43P01)
function pal_regOotGC_to_pal_mqOotGC(swapSpace) {   // Start Function: pal_regOotGC_to_pal_mqOotGC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "off");
    
} // End Function: pal_regOotGC_to_pal_mqOotGC



// ----------------- Set 3



// Ocarina of Time (GC) (NTSC-U) (PZLE01) -> Ocarina of Time (GC) (NTSC-U) (D43E01)
function us_ootGC_to_us_regOotGC(swapSpace) {   // Start Function: us_ootGC_to_us_regOotGC
    
    us_regOotGC_to_us_ootGC(swapSpace);
    Preset.reverseGameCombo(swapSpace);
    
} // End Function: us_ootGC_to_us_regOotGC

// Ocarina of Time (GC) (NTSC-U) (PZLE01) -> Ocarina of Time (GC) (PAL) (D43P01)
function us_ootGC_to_pal_regOotGC(swapSpace) {   // Start Function: us_ootGC_to_pal_regOotGC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "off");
    
} // End Function: us_ootGC_to_pal_regOotGC

// Ocarina of Time (GC) (NTSC-U) (PZLE01) -> Ocarina of Time (GC) (PAL) (PZLP01)
function us_ootGC_to_pal_ootGC(swapSpace) {   // Start Function: us_ootGC_to_pal_ootGC
    
    Preset.addOffset("47838", "80E65000", "80E65FFF");
    Preset.addOffset("48640", "80CA7000", "80CA7FFF");
    Preset.addOffset("47640", "80C80000", "80E6FFFF");
    Preset.addOffset("47650", "80BE0000", "80BEFFFF");
    Preset.addOffset("477C0", "80BA0000", "80BBFFFF");
    Preset.addOffset("49F10", "80B50000", "80B6FFFF");
    Preset.addOffset("49E10", "80B40000", "80B4FFFF");
    Preset.addOffset("49E04", "80B38BE2", "80B38FFF");
    Preset.addOffset("49D40", "80B38000", "80B3FFFF");
    Preset.addOffset("49DF0", "80B2A000", "80B37FFF");
    Preset.addOffset("49E44", "80AE0000", "80AEFFFF");
    Preset.addOffset("49E40", "80AC0000", "80ACFFFF");
    Preset.addOffset("49E00", "80130000", "8013FFFF");
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "off");
    
} // End Function: us_ootGC_to_pal_ootGC

// Ocarina of Time (GC) (NTSC-U) (PZLE01) -> Ocarina of Time (VC) (NTSC-U) (D43E01)
function us_ootGC_to_us_ootVC(swapSpace) {   // Start Function: us_ootGC_to_us_ootVC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "on");
    
} // End Function: us_ootGC_to_us_ootVC

// Ocarina of Time (GC) (NTSC-U) (PZLE01) -> Ocarina of Time (VC) (PAL) (NACP01)
function us_ootGC_to_pal_ootVC(swapSpace) {   // Start Function: us_ootGC_to_pal_ootVC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "on");
    
} // End Function: us_ootGC_to_pal_ootVC

// Ocarina of Time (GC) (NTSC-U) (PZLE01) -> Master Quest (GC) (NTSC-U) (D43E01)
function us_ootGC_to_us_mqOotGC(swapSpace) {   // Start Function: us_ootGC_to_us_mqOotGC
    
    Preset.addOffset("1540", "80C9EA00", "80FFFFFF");
    Preset.addOffset("1560", "80BDEA00", "80C9E9FF");
    Preset.addOffset("-1D20", "80134000", "80134FFF");
    
    for (i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "off");
    
} // End Function: us_ootGC_to_us_mqOotGC

// Ocarina of Time (GC) (NTSC-U) (PZLE01) -> Master Quest (GC) (PAL) (D43P01)
function us_ootGC_to_pal_mqOotGC(swapSpace) {   // Start Function: us_ootGC_to_pal_mqOotGC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "off");
    
} // End Function: us_ootGC_to_pal_mqOotGC



// ----------------- Set 4



// Ocarina of Time (GC) (PAL) (PZLP01) -> Ocarina of Time (GC) (NTSC-U) (D43E01)
function pal_ootGC_to_us_regOotGC(swapSpace) {   // Start Function: pal_ootGC_to_us_regOotGC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "off");
    
} // End Function: pal_ootGC_to_us_regOotGC

// Ocarina of Time (GC) (PAL) (PZLP01) -> Ocarina of Time (GC) (PAL) (D43P01)
function pal_ootGC_to_pal_regOotGC(swapSpace) {   // Start Function: pal_ootGC_to_pal_regOotGC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "off");
    
} // End Function: pal_ootGC_to_pal_regOotGC

// Ocarina of Time (GC) (PAL) (PZLP01) -> Ocarina of Time (GC) (NTSC-U) (PZLE01)
function pal_ootGC_to_us_ootGC(swapSpace) {   // Start Function: pal_ootGC_to_us_ootGC
        
    us_ootGC_to_pal_ootGC(swapSpace);
    Preset.reverseGameCombo(swapSpace);
    
} // End Function: pal_ootGC_to_us_ootGC

// Ocarina of Time (GC) (PAL) (PZLP01) -> Ocarina of Time (VC) (NTSC-U) (NACE01)
function pal_ootGC_to_us_ootVC(swapSpace) {   // Start Function: pal_ootGC_to_us_ootVC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "on");
    
} // End Function: pal_ootGC_to_us_ootVC

// Ocarina of Time (GC) (PAL) (PZLP01) -> Ocarina of Time (VC) (PAL) (NACP01)
function pal_ootGC_to_pal_ootVC(swapSpace) {   // Start Function: pal_ootGC_to_pal_ootVC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "on");
    
} // End Function: pal_ootGC_to_pal_ootVC

// Ocarina of Time (GC) (PAL) (PZLP01) -> Master Quest (GC) (NTSC-U) (D43E01)
function pal_ootGC_to_us_mqOotGC(swapSpace) {   // Start Function: pal_ootGC_to_us_mqOotGC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "off");
    
} // End Function: pal_ootGC_to_us_mqOotGC

// Ocarina of Time (GC) (PAL) (PZLP01) -> Master Quest (GC) (PAL) (D43P01)
function pal_ootGC_to_pal_mqOotGC(swapSpace) {   // Start Function: pal_ootGC_to_pal_mqOotGC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "off");
    
} // End Function: pal_ootGC_to_pal_mqOotGC



// ----------------- Set 5



// Ocarina of Time (VC) (NTSC-U) (NACE01) -> Ocarina of Time (GC) (NTSC-U) (D43E01)
function us_ootVC_to_us_regOotGC(swapSpace) {   // Start Function: us_ootVC_to_us_regOotGC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "on");
    
} // End Function: us_ootVC_to_us_regOotGC

// Ocarina of Time (VC) (NTSC-U) (NACE01) -> Ocarina of Time (GC) (PAL) (D43P01)
function us_ootVC_to_pal_regOotGC(swapSpace) {   // Start Function: us_ootVC_to_pal_regOotGC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "on");
    
} // End Function: us_ootVC_to_pal_regOotGC

// Ocarina of Time (VC) (NTSC-U) (NACE01) -> Ocarina of Time (GC) (NTSC-U) (PZLE01)
function us_ootVC_to_us_ootGC(swapSpace) {   // Start Function: us_ootVC_to_us_ootGC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "on");
    
} // End Function: us_ootVC_to_us_ootGC

// Ocarina of Time (VC) (NTSC-U) (NACE01) -> Ocarina of Time (GC) (PAL) (PZLP01)
function us_ootVC_to_pal_ootGC(swapSpace) {   // Start Function: us_ootVC_to_pal_ootGC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "on");
    
} // End Function: us_ootVC_to_pal_ootGC

// Ocarina of Time (VC) (NTSC-U) (NACE01) -> Ocarina of Time (GC) (VC) (NACP01)
function us_ootVC_to_pal_ootVC(swapSpace) {   // Start Function: us_ootVC_to_pal_ootVC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "off");
    
} // End Function: us_ootVC_to_pal_ootVC

// Ocarina of Time (VC) (NTSC-U) (NACE01) -> Master Quest (GC) (NTSC-U) (D43E01)
function us_ootVC_to_us_mqOotGC(swapSpace) {   // Start Function: us_ootVC_to_us_mqOotGC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "on");
    
} // End Function: us_ootVC_to_us_mqOotGC

// Ocarina of Time (VC) (NTSC-U) (NACE01) -> Master Quest (GC) (PAL) (D43P01)
function us_ootVC_to_pal_mqOotGC(swapSpace) {   // Start Function: us_ootVC_to_pal_mqOotGC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "on");
    
} // End Function: us_ootVC_to_pal_mqOotGC



// ----------------- Set 6



// Ocarina of Time (VC) (NTSC-U) (NACE01) -> Ocarina of Time (GC) (NTSC-U) (D43E01)
function pal_ootVC_to_us_regOotGC(swapSpace) {   // Start Function: pal_ootVC_to_us_regOotGC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "on");
    
} // End Function: pal_ootVC_to_us_regOotGC

// Ocarina of Time (VC) (NTSC-U) (NACE01) -> Ocarina of Time (GC) (PAL) (D43P01)
function pal_ootVC_to_pal_regOotGC(swapSpace) {   // Start Function: pal_ootVC_to_pal_regOotGC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "on");
    
} // End Function: pal_ootVC_to_pal_regOotGC

// Ocarina of Time (VC) (NTSC-U) (NACE01) -> Ocarina of Time (GC) (NTSC-U) (PZLE01)
function pal_ootVC_to_us_ootGC(swapSpace) {   // Start Function: pal_ootVC_to_us_ootGC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "on");
    
} // End Function: pal_ootVC_to_us_ootGC

// Ocarina of Time (VC) (NTSC-U) (NACE01) -> Ocarina of Time (GC) (PAL) (PZLP01)
function pal_ootVC_to_pal_ootGC(swapSpace) {   // Start Function: pal_ootVC_to_pal_ootGC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "on");
    
} // End Function: pal_ootVC_to_pal_ootGC

// Ocarina of Time (VC) (NTSC-U) (NACE01) -> Ocarina of Time (VC) (PAL) (D43E01)
function pal_ootVC_to_us_ootVC(swapSpace) {   // Start Function: pal_ootVC_to_us_ootVC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "off");
    
} // End Function: pal_ootVC_to_us_ootVC

// Ocarina of Time (VC) (NTSC-U) (NACE01) -> Master Quest (GC) (NTSC-U) (D43E01)
function pal_ootVC_to_us_mqOotGC(swapSpace) {   // Start Function: pal_ootVC_to_us_mqOotGC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "on");
    
} // End Function: pal_ootVC_to_us_mqOotGC

// Ocarina of Time (VC) (NTSC-U) (NACE01) -> Master Quest (GC) (PAL) (D43P01)
function pal_ootVC_to_pal_mqOotGC(swapSpace) {   // Start Function: pal_ootVC_to_pal_mqOotGC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "on");
    
} // End Function: pal_ootVC_to_pal_mqOotGC



// -------------------- //
// --- Master Quest --- //
// -------------------- //



// ----------------- Set 1



// Master Quest (GC) (NTSC-U) (D43E01) -> Ocarina of Time (GC) (NTSC-U) (D43E01)
function us_mqOotGC_to_us_regOotGC(swapSpace) {   // Start Function: us_mqOotGC_to_us_regOotGC
    
    Preset.addOffset("40", "80CA0000", "80FFFFFF");
    Preset.addOffset("20", "80BE0000", "80C9FFFF");
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "off");
    
} // End Function: us_mqOotGC_to_us_regOotGC

// Master Quest (GC) (NTSC-U) (D43E01) -> Ocarina of Time (GC) (PAL) (D43P01)
function us_mqOotGC_to_pal_regOotGC(swapSpace) {   // Start Function: us_mqOotGC_to_pal_regOotGC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "off");
    
} // End Function: us_mqOotGC_to_pal_regOotGC

// Master Quest (GC) (NTSC-U) (D43E01) -> Ocarina of Time (GC) (NTSC-U) (PZLE01)
function us_mqOotGC_to_us_ootGC(swapSpace) {   // Start Function: us_mqOotGC_to_us_ootGC
    
    us_ootGC_to_us_mqOotGC(swapSpace);
    Preset.reverseGameCombo(swapSpace);
    
} // End Function: us_mqOotGC_to_us_ootGC

// Master Quest (GC) (NTSC-U) (D43E01) -> Ocarina of Time (GC) (PAL) (PZLP01)
function us_mqOotGC_to_pal_ootGC(swapSpace) {   // Start Function: us_mqOotGC_to_pal_ootGC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "off");
    
} // End Function: us_mqOotGC_to_pal_ootGC

// Master Quest (GC) (NTSC-U) (D43E01) -> Ocarina of Time (VC) (NTSC-U) (NACE01)
function us_mqOotGC_to_us_ootVC(swapSpace) {   // Start Function: us_mqOotGC_to_us_ootVC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "on");
    
} // End Function: us_mqOotGC_to_us_ootVC

// Master Quest (GC) (NTSC-U) (D43E01) -> Ocarina of Time (VC) (PAL) (NACP01)
function us_mqOotGC_to_pal_ootVC(swapSpace) {   // Start Function: us_mqOotGC_to_pal_ootVC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "on");
    
} // End Function: us_mqOotGC_to_pal_ootVC

// Master Quest (GC) (NTSC-U) (D43E01) -> Master Quest (GC) (PAL) (D43P01)
function us_mqOotGC_to_pal_mqOotGC(swapSpace) {   // Start Function: us_mqOotGC_to_pal_mqOotGC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "off");
    
} // End Function: us_mqOotGC_to_pal_mqOotGC



// ----------------- Set 2



// Master Quest (GC) (PAL) (D43P01) -> Ocarina of Time (GC) (NTSC-U) (D43E01)
function pal_mqOotGC_to_us_regOotGC(swapSpace) {   // Start Function: pal_mqOotGC_to_us_regOotGC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "off");
    
} // End Function: pal_mqOotGC_to_us_regOotGC

// Master Quest (GC) (PAL) (D43P01) -> Ocarina of Time (GC) (PAL) (D43P01)
function pal_mqOotGC_to_pal_regOotGC(swapSpace) {   // Start Function: pal_mqOotGC_to_pal_regOotGC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "off");
    
} // End Function: pal_mqOotGC_to_pal_regOotGC

// Master Quest (GC) (PAL) (D43P01) -> Ocarina of Time (GC) (NTSC-U) (PZLE01)
function pal_mqOotGC_to_us_ootGC(swapSpace) {   // Start Function: pal_mqOotGC_to_us_ootGC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "off");
    
} // End Function: pal_mqOotGC_to_us_ootGC

// Master Quest (GC) (PAL) (D43P01) -> Ocarina of Time (GC) (PAL) (PZLP01)
function pal_mqOotGC_to_pal_ootGC(swapSpace) {   // Start Function: pal_mqOotGC_to_pal_ootGC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "off");
    
} // End Function: pal_mqOotGC_to_pal_ootGC

// Master Quest (GC) (PAL) (D43P01) -> Ocarina of Time (VC) (NTSC-U) (NACE01)
function pal_mqOotGC_to_us_ootVC(swapSpace) {   // Start Function: pal_mqOotGC_to_us_ootVC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "on");
    
} // End Function: pal_mqOotGC_to_us_ootVC

// Master Quest (GC) (PAL) (D43P01) -> Ocarina of Time (VC) (PAL) (NACP01)
function pal_mqOotGC_to_pal_ootVC(swapSpace) {   // Start Function: pal_mqOotGC_to_pal_ootVC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "on");
    
} // End Function: pal_mqOotGC_to_pal_ootVC

// Master Quest (GC) (PAL) (D43P01) -> Master Quest (GC) (NTSC-U) (D43E01)
function pal_mqOotGC_to_us_mqOotGC(swapSpace) {   // Start Function: pal_mqOotGC_to_us_mqOotGC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "off");
    
} // End Function: pal_mqOotGC_to_us_mqOotGC



// --------------------- //
// --- Majora's Mask --- //
// --------------------- //

// Majora's Mask (GC) (NTSC-U) (PZLE01) to Majora's Mask (GC) (PAL) (PZLP01)
function us_mmGC_to_pal_mmGC(swapSpace) {   // Start Function: us_mmGC_to_pal_mmGC
    
    Preset.addOffset("-9570", "80CA0000", "80EFFFFF");
    Preset.addOffset("-630", "80C8E000", "80C8EFFF");
    Preset.addOffset("-7A0", "80C8C000", "80C8CFFF");
    Preset.addOffset("-BF0", "80C00000", "80C12FFF");
    Preset.addOffset("-C00", "80C13000", "80C7FFFF");
    Preset.addOffset("-E6C", "80BE7000", "80BEFFFF");
    Preset.addOffset("-E7C", "80BE0000", "80BE6FFF");
    Preset.addOffset("-1280", "80BD0000", "80BDFFFF");
    Preset.addOffset("-1278", "80BC0000", "80BCFFFF");
    Preset.addOffset("-126C", "80B8D000", "80B8FFFF");
    Preset.addOffset("-124C", "80B80000", "80B8CFFF");
    Preset.addOffset("-4710", "80B60000", "80B6FFFF");
    Preset.addOffset("-111B0", "80141000", "80141FFF");
    Preset.addOffset("-113E0", "8013B000", "80140FFF");
    Preset.addOffset("-11C0", "81140000", "8116FFFF");
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "off");
    
} // End Function: us_mmGC_to_pal_mmGC

// Majora's Mask (GC) (NTSC-U) (PZLE01) to Majora's Mask (VC) (NTSC-U) (NARE01)
function us_mmGC_to_us_mmVC(swapSpace) {   // Start Function: us_mmGC_to_us_mmVC
    
    Preset.addOffset("DDA4EE", "80140000", "8014FFFF");
    Preset.addOffset("44AC50", "80B60000", "80B6FFFF");
    Preset.addOffset("44E490", "80B80000", "80B8FFFF");
    Preset.addOffset("53105C", "81100000", "811FFFFF");
    Preset.addOffset("-BB27F0", "80C30000", "80C3FFFF");
    Preset.addOffset("-BB1C50", "80BE4000", "80BEFFFF");
    Preset.addOffset("-BB1C20", "80BD0000", "80BDFFFF");
    Preset.addOffset("-BB1C10", "80BC0000", "80BCFFFF");
    Preset.addOffset("-BB1B80", "80C10000", "80C7FFFF");
    Preset.addOffset("-BAFE90", "80C80000", "80CAFFFF");
    Preset.addOffset("-BAF960", "80CBC000", "80CFFFFF");
    Preset.addOffset("-BAE730", "80E00000", "80E4EFFF");
    Preset.addOffset("-B4BEE0", "80E4F000", "80EFFFFF");
    
    swapSpace[0].setAttribute("data-value", "off");
    for (var i=4; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "on");
    
} // End Function: us_mmGC_to_us_mmVC

// Majora's Mask (GC) (NTSC-U) (PZLE01) to Majora's Mask (VC) (PAL) (NARP01)
function us_mmGC_to_pal_mmVC(swapSpace) {   // Start Function: us_mmGC_to_pal_mmVC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "on");
    
} // End Function: us_mmGC_to_pal_mmVC



// Majora's Mask (GC) (PAL) (PZLP01) to Majora's Mask (GC) (NTSC-U) (PZLP01)
function pal_mmGC_to_us_mmGC(swapSpace) {   // Start Function: pal_mmGC_to_us_mmVC
    
    us_mmGC_to_pal_mmGC(swapSpace);
    Preset.reverseGameCombo(swapSpace);
    
} // End Function: pal_mmGC_to_us_mmVC

// Majora's Mask (GC) (PAL) (PZLP01) to Majora's Mask (VC) (NTSC-U) (NARE01)
function pal_mmGC_to_us_mmVC(swapSpace) {   // Start Function: pal_mmGC_to_us_mmVC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "on");
    
} // End Function: pal_mmGC_to_us_mmVC

// Majora's Mask (GC) (PAL) (PZLP01) to Majora's Mask (VC) (PAL) (NARP01)
function pal_mmGC_to_pal_mmVC(swapSpace) {   // Start Function: pal_mmGC_to_pal_mmVC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "on");
    
} // End Function: pal_mmGC_to_pal_mmVC



// Majora's Mask (VC) (NTSC-U) (NACE01) to Majora's Mask (GC) (NTSC-U) (PZLE01)
function us_mmVC_to_us_mmGC(swapSpace) {   // Start Function: us_mmVC_to_us_mmGC
    
    us_mmGC_to_us_mmVC(swapSpace);
    Preset.reverseGameCombo(swapSpace);
    
} // End Function: us_mmVC_to_us_mmGC

// Majora's Mask (VC) (NTSC-U) (NACE01) to Majora's Mask (GC) (PAL) (PZLP01)
function us_mmVC_to_pal_mmGC(swapSpace) {   // Start Function: us_mmVC_to_pal_mmGC

    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "on");
    
} // End Function: us_mmVC_to_pal_mmGC

// Majora's Mask (VC) (NTSC-U) (NACE01) to Majora's Mask (VC) (PAL) (NARP01)
function us_mmVC_to_pal_mmVC(swapSpace) {   // Start Function: us_mmVC_to_pal_mmVC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "off");
    
} // End Function: us_mmVC_to_pal_mmVC



// Majora's Mask (VC) (PAL) (NACP01) to Majora's Mask (GC) (NTSC-U) (PZLE01)
function pal_mmVC_to_us_mmGC(swapSpace) {   // Start Function: pal_mmVC_to_us_mmGC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "on");
    
} // End Function: pal_mmVC_to_us_mmGC

// Majora's Mask (VC) (PAL) (PZLP01) to Majora's Mask (GC) (PAL) (PZLE01)
function pal_mmVC_to_pal_mmGC(swapSpace) {   // Start Function: pal_mmVC_to_pal_mmGC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "on");
    
} // End Function: pal_mmVC_to_pal_mmGC

// Majora's Mask (VC) (PAL) (PZLP01) to Majora's Mask (VC) (NTSC-U) (NARE01)
function pal_mmVC_to_us_mmVC(swapSpace) {   // Start Function: pal_mmVC_to_us_mmVC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "off");
    
} // End Function: pal_mmVC_to_us_mmVC








// ---------------------- //
// --- Super Mario 64 --- //
// ---------------------- //

// Super Mario 64 (VC) (NTSC-U) (NAAE01) to Super Mario 64 (VC) (PAL) (NAAP01)
function us_sm64VC_to_pal_sm64VC(swapSpace) {   // Start Function: us_sm64VC_to_pal_sm64VC
    
    Preset.addOffset("-0", "81000000", "81FFFFFF");
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "off");
    
} // End Function: us_sm64VC_to_pal_sm64VC

// Super Mario 64 (VC) (PAL) (NAAP01) to Super Mario 64 (VC) (NTSC-U) (NAAE01)
function pal_sm64VC_to_us_sm64VC(swapSpace) {   // Start Function: pal_sm64VC_to_us_sm64VC
    
    us_sm64VC_to_pal_sm64VC(swapSpace);
    Preset.reverseGameCombo(swapSpace);
    
} // End Function: pal_sm64VC_to_us_sm64VC