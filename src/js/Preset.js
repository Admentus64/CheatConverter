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
        
    }, // End Function: select
    
    
    
    select: function() {   // Start Function: select
        
        var offset_textfield = document.getElementById("offset_div").getElementsByClassName("offset");
        var offset_condition_from_textfield = document.getElementById("offset_div").getElementsByClassName("offset_condition_from");
        var offset_condition_to_textfield = document.getElementById("offset_div").getElementsByClassName("offset_condition_to");
        var swapSpace = document.getElementById("offset_div").getElementsByClassName("swap_space");
        
        if (this.id == "select_preset_from") {
            Preset.select_preset_to.value = "None";
            Preset.disable(this.value);
        }
        
        Preset.reset(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace);
        Preset.selectGameCombo(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace);
        
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
    
    
    
    reset: function(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace) {   // Start Function: reset
        
        Convert.fillPresets(1);
        
        offset_textfield[0].value = "";
        offset_condition_from_textfield[0].value = "";
        offset_condition_to_textfield[0].value = "";
        swapSpace[0].setAttribute("data-value", "off");
        
    }, // End Function: reset
    
    
    
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
            //if (Preset.select_preset_to[i].value.indexOf("(VC)") >= 0)
            //    Preset.select_preset_to[i].disabled = true;
        }
        
    }, // End Function: disable
    
    
    
    selectGameCombo: function(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace) {   // Start Function: selectGameCombo
        
        // ----------------------- //
        // --- Ocarina of Time --- //
        // ----------------------- //
        
        if (Preset.selectFrom() == "Ocarina of Time (GC) (NTSC-U) (D43E01)") {
            if (Preset.selectTo() == "Ocarina of Time (GC) (PAL) (D43P01)")
                us_regOotGC_to_pal_regOotGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace);
            if (Preset.selectTo() == "Ocarina of Time (GC) (NTSC-U) (PZLP01)")
                us_regOotGC_to_us_ootGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace);
            if (Preset.selectTo() == "Ocarina of Time (GC) (NTSC-U) (PZLP01)")
                us_regOotGC_to_pal_ootGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace);
            if (Preset.selectTo() == "Ocarina of Time (VC) (NTSC-U) (NACE01)")
                us_regOotGC_to_us_ootVC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace);
            if (Preset.selectTo() == "Ocarina of Time (VC) (PAL) (NACP01)")
                us_regOotGC_to_pal_ootVC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace);
            if (Preset.selectTo() == "Master Quest (GC) (NTSC-U) (D43E01)")
                us_regOotGC_to_us_mqOotGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace);
            if (Preset.selectTo() == "Master Quest (GC) (NTSC-U) (D43P01)")
                us_regOotGC_to_pal_mqOotGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace);
        }
        
        if (Preset.selectFrom() == "Ocarina of Time (GC) (PAL) (D43P01)") {
            if (Preset.selectTo() == "Ocarina of Time (GC) (NTSC-U) (D43E01)")
                pal_regOotGC_to_us_regOotGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace);
            if (Preset.selectTo() == "Ocarina of Time (GC) (NTSC-U) (PZLP01)")
                pal_regOotGC_to_us_ootGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace);
            if (Preset.selectTo() == "Ocarina of Time (GC) (NTSC-U) (PZLE01)")
                pal_regOotGC_to_us_ootGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace);
            if (Preset.selectTo() == "Ocarina of Time (VC) (NTSC-U) (NACE01)")
                pal_regOotGC_to_us_ootVC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace);
            if (Preset.selectTo() == "Ocarina of Time (VC) (PAL) (NACP01)")
                pal_regOotGC_to_pal_ootVC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace);
            if (Preset.selectTo() == "Master Quest (GC) (NTSC-U) (D43E01)")
                pal_regOotGC_to_us_mqOotGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace);
            if (Preset.selectTo() == "Master Quest (GC) (PAL) (D43P01)")
                pal_regOotGC_to_pal_mqOotGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace);
        }
        
        if (Preset.selectFrom() == "Ocarina of Time (GC) (NTSC-U) (PZLE01)") {
            if (Preset.selectTo() == "Ocarina of Time (GC) (NTSC-U) (D43E01)")
                us_ootGC_to_us_regOotGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace);
            if (Preset.selectTo() == "Ocarina of Time (GC) (PAL) (D43P01)")
                us_ootGC_to_pal_regOotGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace);
            if (Preset.selectTo() == "Ocarina of Time (GC) (NTSC-U) (PZLE01)")
                us_ootGC_to_us_ootGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace);
            if (Preset.selectTo() == "Ocarina of Time (VC) (NTSC-U) (NACE01)")
                us_ootGC_to_us_ootVC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace);
            if (Preset.selectTo() == "Ocarina of Time (VC) (PAL) (NACP01)")
                us_ootGC_to_pal_ootVC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace);
            if (Preset.selectTo() == "Master Quest (GC) (NTSC-U) (D43E01)")
                us_ootGC_to_us_mqOotGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace);
            if (Preset.selectTo() == "Master Quest (GC) (PAL) (D43P01)")
                us_ootGC_to_pal_mqOotGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace);
        }
        
        if (Preset.selectFrom() == "Ocarina of Time (GC) (PAL) (PZLP01)") {
            if (Preset.selectTo() == "Ocarina of Time (GC) (NTSC-U) (D43E01)")
                pal_ootGC_to_us_regOotGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace);
            if (Preset.selectTo() == "Ocarina of Time (GC) (PAL) (D43P01)")
                pal_ootGC_to_pal_regOotGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace);
            if (Preset.selectTo() == "Ocarina of Time (GC) (NTSC-U) (PZLE01)")
                pal_ootGC_to_us_ootGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace);
            if (Preset.selectTo() == "Ocarina of Time (VC) (NTSC-U) (NACE01)")
                pal_ootGC_to_us_ootVC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace);
            if (Preset.selectTo() == "Ocarina of Time (VC) (PAL) (NACP01)")
                pal_ootGC_to_pal_ootVC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace);
            if (Preset.selectTo() == "Master Quest (GC) (NTSC-U) (D43E01)")
                pal_ootGC_to_us_mqOotGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace);
            if (Preset.selectTo() == "Master Quest (GC) (PAL) (D43P01)")
                pal_ootGC_to_pal_mqOotGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace);
        }
        
        if (Preset.selectFrom() == "Ocarina of Time (VC) (NTSC-U) (NACE01)") {
            if (Preset.selectTo() == "Ocarina of Time (GC) (NTSC-U) (D43E01)")
                us_ootVC_to_us_regOotGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace);
            if (Preset.selectTo() == "Ocarina of Time (GC) (PAL) (D43P01)")
                us_ootVC_to_pal_regOotGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace);
            if (Preset.selectTo() == "Ocarina of Time (GC) (NTSC-U) (PZLE01)")
                us_ootVC_to_us_ootGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace);
            if (Preset.selectTo() == "Ocarina of Time (GC) (PAL) (PZLP01)")
                us_ootVC_to_pal_ootGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace);
            if (Preset.selectTo() == "Ocarina of Time (VC) (PAL) (NACP01)")
                us_ootVC_to_pal_ootVC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace);
            if (Preset.selectTo() == "Master Quest (GC) (NTSC-U) (D43E01)")
                us_ootVC_to_us_mqOotGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace);
            if (Preset.selectTo() == "Master Quest (GC) (NTSC-U) (D43P01)")
                us_ootVC_to_pal_mqOotGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace);
        }
        
        if (Preset.selectFrom() == "Ocarina of Time (VC) (PAL) (NACP01)") {
            if (Preset.selectTo() == "Ocarina of Time (GC) (NTSC-U) (D43E01)")
                pal_ootVC_to_us_regOotGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace);
            if (Preset.selectTo() == "Ocarina of Time (GC) (PAL) (D43P01)")
                pal_ootVC_to_pal_regOotGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace);
            if (Preset.selectTo() == "Ocarina of Time (GC) (NTSC-U) (PZLE01)")
                pal_ootVC_to_us_ootGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace);
            if (Preset.selectTo() == "Ocarina of Time (GC) (PAL) (PZLP01)")
                pal_ootVC_to_pal_ootGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace);
            if (Preset.selectTo() == "Ocarina of Time (VC) (NTSC-U) (NACE01)")
                pal_ootVC_to_us_ootVC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace);
            if (Preset.selectTo() == "Master Quest (GC) (NTSC-U) (D43E01)")
                pal_ootVC_to_us_mqOotGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace);
            if (Preset.selectTo() == "Master Quest (GC) (NTSC-U) (D43P01)")
                pal_ootVC_to_pal_mqOotGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace);
        }
        
        
        
        // -------------------- //
        // --- Master Quest --- //
        // -------------------- //
        
        if (Preset.selectFrom() == "Master Quest (GC) (NTSC-U) (D43E01)") {
            if (Preset.selectTo() == "Ocarina of Time (GC) (NTSC-U) (D43E01)")
                us_mqOotGC_to_us_regOotGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace);
            if (Preset.selectTo() == "Ocarina of Time (GC) (PAL) (D43P01)")
                us_mqOotGC_to_pal_regOotGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace);
            if (Preset.selectTo() == "Ocarina of Time (GC) (NTSC-U) (PZLE01)")
                us_mqOotGC_to_us_ootGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace);
            if (Preset.selectTo() == "Ocarina of Time (GC) (PAL) (PZLP01)")
                us_mqOotGC_to_pal_ootGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace);
            if (Preset.selectTo() == "Ocarina of Time (VC) (NTSC-U) (NACE01)")
                us_mqOotGC_to_us_ootVC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace);
            if (Preset.selectTo() == "Ocarina of Time (VC) (PAL) (NACP01)")
                us_mqOotGC_to_pal_ootVC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace);
            if (Preset.selectTo() == "Master Quest (GC) (NTSC-U) (D43P01)")
                us_mqOotGC_to_pal_mqOotGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace);
        }
        
        if (Preset.selectFrom() == "Master Quest (GC) (PAL) (D43P01)") {
            if (Preset.selectTo() == "Ocarina of Time (GC) (NTSC-U) (D43E01)")
                pal_mqOotGC_to_us_regOotGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace);
            if (Preset.selectTo() == "Ocarina of Time (GC) (PAL) (D43P01)")
                pal_mqOotGC_to_pal_regOotGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace);
            if (Preset.selectTo() == "Ocarina of Time (GC) (NTSC-U) (PZLE01)")
                pal_mqOotGC_to_us_ootGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace);
            if (Preset.selectTo() == "Ocarina of Time (GC) (PAL) (PZLP01)")
                pal_mqOotGC_to_pal_ootGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace);
            if (Preset.selectTo() == "Ocarina of Time (VC) (NTSC-U) (NACE01)")
                pal_mqOotGC_to_us_ootVC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace);
            if (Preset.selectTo() == "Ocarina of Time (VC) (PAL) (NACP01)")
                pal_mqOotGC_to_pal_ootVC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace);
            if (Preset.selectTo() == "Master Quest (GC) (NTSC-U) (D43E01)")
                pal_mqOotGC_to_us_mqOotGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace);
        }
        
        
        
        // --------------------- //
        // --- Majora's Mask --- //
        // --------------------- //
        
        if (Preset.selectFrom() == "Majora's Mask (GC) (NTSC-U) (PZLE01)") {
            if (Preset.selectTo() == "Majora's Mask (GC) (PAL) (PZLP01)")
                us_mmGC_to_pal_mmGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace);
            if (Preset.selectTo() == "Majora's Mask (VC) (NTSC-U) (NARE01)")
                us_mmGC_to_us_mmVC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace);
            if (Preset.selectTo() == "Majora's Mask (VC) (PAL) (NARP01)")
                us_mmGC_to_pal_mmVC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace);
        }
        
        if (Preset.selectFrom() == "Majora's Mask (GC) (PAL) (PZLP01)") {
            if (Preset.selectTo() == "Majora's Mask (GC) (NTSC-U) (PZLE01)")
                us_mmGC_to_us_mmGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace);
            if (Preset.selectTo() == "Majora's Mask (VC) (NTSC-U) (NARE01)")
                us_mmGC_to_us_mmVC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace);
            if (Preset.selectTo() == "Majora's Mask (VC) (PAL) (NARP01)")
                us_mmGC_to_pal_mmVC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace);
        }
        
        if (Preset.selectFrom() == "Majora's Mask (VC) (NTSC-U) (NARE01)") {
            if (Preset.selectTo() == "Majora's Mask (GC) (NTSC-U) (PZLE01)")
                us_mmGC_to_us_mmGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace);
            if (Preset.selectTo() == "Majora's Mask (GC) (PAL) (PZLP01)")
                us_mmGC_to_pal_mmGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace);
            if (Preset.selectTo() == "Majora's Mask (VC) (PAL) (NARP01)")
                us_mmGC_to_pal_mmVC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace);
        }
        
        if (Preset.selectFrom() == "Majora's Mask (VC) (NTSC-U) (NARP01)") {
            if (Preset.selectTo() == "Majora's Mask (GC) (NTSC-U) (PZLE01)")
                us_mmGC_to_us_mmGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace);
            if (Preset.selectTo() == "Majora's Mask (GC) (PAL) (PZLP01)")
                us_mmGC_to_pal_mmGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace);
            if (Preset.selectTo() == "Majora's Mask (VC) (NTSC-U) (NARE01)")
                us_mmGC_to_us_mmVC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace);
        }
        
        
        
        // ---------------------- //
        // --- Super Mario 64 --- //
        // ---------------------- //
        
        if (Preset.selectFrom() == "Super Mario 64 (VC) (NTSC-U) (NAAE01)")
            if (Preset.selectTo() == "Super Mario 64 (VC) (PAL) (NAAP01)")
                us_sm64VC_to_pal_sm64VC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace);
        if (Preset.selectFrom() == "Super Mario 64 (VC) (PAL) (NAAP01)")
            if (Preset.selectTo() == "Super Mario 64 (VC) (NTSC-U) (NAAE01)")
                pal_sm64VC_to_us_sm64VC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace);
        
    }, // End Function: selectGameCombo
    
}; // End Static Class: Preset



Event.add(window, "DOMContentLoaded", Preset.init);					        // Active function init when the DOM Content is loaded



// ------------------------ //
// --- Ocarina of Time --- //
// ------------------------ //



// ----------------- Set 1



// Ocarina of Time (GC) (NTSC-U) (D43E01) -> Ocarina of Time (GC) (PAL) (D43P01)
function us_regOotGC_to_pal_regOotGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace) {   // Start Function: us_regOotGC_to_pal_regOotGC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "off");
    
} // End Function: us_regOotGC_to_pal_regOotGC

// Ocarina of Time (GC) (NTSC-U) (D43E01) -> Ocarina of Time (GC) (NTSC-U) (PZLP01)
function us_regOotGC_to_us_ootGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace) {   // Start Function: us_regOotGC_to_us_ootGC
    
    Convert.fillPresets(2);
    
    offset_textfield[0].value = "-1560";
    offset_textfield[1].value = "-1580";
    
    offset_condition_from_textfield[0].value = "80CA0000";
    offset_condition_from_textfield[1].value = "80BE0000";
    
    offset_condition_to_textfield[0].value = "80FFFFFF";
    offset_condition_to_textfield[1].value = "80C9FFFF";
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "off");
    
} // End Function: us_regOotGC_to_us_ootGC

// Ocarina of Time (GC) (NTSC-U) (D43E01) -> Ocarina of Time (GC) (PAL) (PZLP01)
function us_regOotGC_to_pal_ootGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace) {   // Start Function: us_regOotGC_to_pal_ootGC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "off");
    
} // End Function: us_regOotGC_to_pal_ootGC

// Ocarina of Time (GC) (NTSC-U) (D43E01) -> Ocarina of Time (VC) (NTSC-U) (NACP01)
function us_regOotGC_to_us_ootVC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace) {   // Start Function: us_regOotGC_to_us_ootVC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "on");
    
} // End Function: us_regOotGC_to_us_ootVC

// Ocarina of Time (GC) (NTSC-U) (D43E01) -> Ocarina of Time (VC) (PAL) (NACP01)
function us_regOotGC_to_pal_ootVC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace) {   // Start Function: us_regOotGC_to_pal_ootVC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "on");
    
} // End Function: us_regOotGC_to_pal_ootVC

// Ocarina of Time (GC) (NTSC-U) (D43E01) -> Master Quest (GC) (NTSC-U) (D43E01)
function us_regOotGC_to_us_mqOotGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace) {   // Start Function: us_regOotGC_to_us_mqOotGC
    
    Convert.fillPresets(2);
    
    offset_textfield[0].value = "-40";
    offset_textfield[1].value = "-20";
    
    offset_condition_from_textfield[0].value = "80CA0000";
    offset_condition_from_textfield[1].value = "80BE0000";
    
    offset_condition_to_textfield[0].value = "80FFFFFF";
    offset_condition_to_textfield[1].value = "80C9FFFF";
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "off");
    
} // End Function: us_regOotGC_to_us_mqOotGC

// Ocarina of Time (GC) (NTSC-U) (PZL) -> Master Quest (GC) (PAL) (D43PE01)
function us_regOotGC_to_pal_mqOotGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace) {   // Start Function: us_regOotGC_to_pal_mqOotGC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "off");
    
} // End Function: us_regOotGC_to_pal_mqOotGC



// ----------------- Set 2



// Ocarina of Time (GC) (PAL) (D43P01) -> Ocarina of Time (GC) (PAL) (D43E01)
function pal_regOotGC_to_us_regOotGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace) {   // Start Function: pal_regOotGC_to_us_regOotGC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "off");
    
} // End Function: pal_regOotGC_to_us_regOotGC

// Ocarina of Time (GC) (PAL) (D43P01) -> Ocarina of Time (GC) (NTSC-U) (PZLE01)
function pal_regOotGC_to_us_ootGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace) {   // Start Function: pal_regOotGC_to_us_ootGC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "off");
    
} // End Function: pal_regOotGC_to_us_ootGC

// Ocarina of Time (GC) (PAL) (D43P01) -> Ocarina of Time (GC) (PAL) (PZLP01)
function pal_regOotGC_to_pal_ootGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace) {   // Start Function: pal_regOotGC_to_pal_ootGC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "off");
    
} // End Function: pal_regOotGC_to_pal_ootGC

// Ocarina of Time (GC) (PAL) (D43P01) -> Ocarina of Time (VC) (NTSC-U) (NACE01)
function pal_regOotGC_to_us_ootVC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace) {   // Start Function: pal_regOotGC_to_us_ootVC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "on");
    
} // End Function: pal_regOotGC_to_us_ootVC

// Ocarina of Time (GC) (PAL) (D43P01) -> Ocarina of Time (VC) (PAL) (NACP01)
function pal_regOotGC_to_pal_ootVC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace) {   // Start Function: pal_regOotGC_to_pal_ootVC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "on");
    
} // End Function: pal_regOotGC_to_pal_ootVC

// Ocarina of Time (GC) (PAL) (D43P01) -> Master Quest (GC) (NTSC-U) (D43E01)
function pal_regOotGC_to_us_mqOotGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace) {   // Start Function: pal_regOotGC_to_us_mqOotGC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "off");
    
} // End Function: pal_regOotGC_to_us_mqOotGC

// Ocarina of Time (GC) (PAL) (D43P01) -> Master Quest (GC) (PAL) (D43P01)
function pal_regOotGC_to_pal_mqOotGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace) {   // Start Function: pal_regOotGC_to_pal_mqOotGC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "off");
    
} // End Function: pal_regOotGC_to_pal_mqOotGC



// ----------------- Set 3



// Ocarina of Time (GC) (NTSC-U) (PZLE01) -> Ocarina of Time (GC) (NTSC-U) (D43E01)
function us_ootGC_to_us_regOotGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace) {   // Start Function: us_ootGC_to_us_regOotGC
    
    Convert.fillPresets(2);
    
    offset_textfield[0].value = "1560";
    offset_textfield[1].value = "1580";
    
    offset_condition_from_textfield[0].value = "80C9EA00";
    offset_condition_from_textfield[1].value = "80BDEA00";
    
    offset_condition_to_textfield[0].value = "80FFFFFF";
    offset_condition_to_textfield[1].value = "80C9E9FF";
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "off");
    
} // End Function: us_ootGC_to_us_regOotGC

// Ocarina of Time (GC) (NTSC-U) (PZLE01) -> Ocarina of Time (GC) (PAL) (D43P01)
function us_ootGC_to_pal_regOotGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace) {   // Start Function: us_ootGC_to_pal_regOotGC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "off");
    
} // End Function: us_ootGC_to_pal_regOotGC

// Ocarina of Time (GC) (NTSC-U) (PZLE01) -> Ocarina of Time (GC) (PAL) (PZLP01)
function us_ootGC_to_us_ootGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace) {   // Start Function: us_ootGC_to_us_ootGC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "off");
    
} // End Function: us_ootGC_to_us_ootGC

// Ocarina of Time (GC) (NTSC-U) (PZLE01) -> Ocarina of Time (VC) (NTSC-U) (D43E01)
function us_ootGC_to_us_ootVC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace) {   // Start Function: us_ootGC_to_us_ootVC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "on");
    
} // End Function: us_ootGC_to_us_ootVC

// Ocarina of Time (GC) (NTSC-U) (PZLE01) -> Ocarina of Time (VC) (PAL) (NACP01)
function us_ootGC_to_pal_ootVC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace) {   // Start Function: us_ootGC_to_pal_ootVC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "on");
    
} // End Function: us_ootGC_to_pal_ootVC

// Ocarina of Time (GC) (NTSC-U) (PZLE01) -> Master Quest (GC) (NTSC-U) (D43E01)
function us_ootGC_to_us_mqOotGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace) {   // Start Function: us_ootGC_to_us_mqOotGC
    
    Convert.fillPresets(2);
    
    offset_textfield[0].value = "1540";
    offset_textfield[1].value = "1560";
    
    offset_condition_from_textfield[0].value = "80C9EA00";
    offset_condition_from_textfield[1].value = "80BDEA00";
    
    offset_condition_to_textfield[0].value = "80FFFFFF";
    offset_condition_to_textfield[1].value = "80C9E9FF";
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "off");
    
} // End Function: us_ootGC_to_us_mqOotGC

// Ocarina of Time (GC) (NTSC-U) (PZLE01) -> Master Quest (GC) (PAL) (D43P01)
function us_ootGC_to_pal_mqOotGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace) {   // Start Function: us_ootGC_to_pal_mqOotGC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "off");
    
} // End Function: us_ootGC_to_pal_mqOotGC



// ----------------- Set 4



// Ocarina of Time (GC) (PAL) (PZLP01) -> Ocarina of Time (GC) (NTSC-U) (D43E01)
function pal_ootGC_to_us_regOotGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace) {   // Start Function: pal_ootGC_to_us_regOotGC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "off");
    
} // End Function: pal_ootGC_to_us_regOotGC

// Ocarina of Time (GC) (PAL) (PZLP01) -> Ocarina of Time (GC) (PAL) (D43P01)
function pal_ootGC_to_pal_regOotGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace) {   // Start Function: pal_ootGC_to_pal_regOotGC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "off");
    
} // End Function: pal_ootGC_to_pal_regOotGC

// Ocarina of Time (GC) (PAL) (PZLP01) -> Ocarina of Time (GC) (NTSC-U) (PZLE01)
function pal_ootGC_to_us_ootGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace) {   // Start Function: pal_ootGC_to_us_ootGC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "off");
    
} // End Function: pal_ootGC_to_us_ootGC

// Ocarina of Time (GC) (PAL) (PZLP01) -> Ocarina of Time (VC) (NTSC-U) (NACE01)
function pal_ootGC_to_us_ootVC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace) {   // Start Function: pal_ootGC_to_us_ootVC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "on");
    
} // End Function: pal_ootGC_to_us_ootVC

// Ocarina of Time (GC) (PAL) (PZLP01) -> Ocarina of Time (VC) (PAL) (NACP01)
function pal_ootGC_to_pal_ootVC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace) {   // Start Function: pal_ootGC_to_pal_ootVC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "on");
    
} // End Function: pal_ootGC_to_pal_ootVC

// Ocarina of Time (GC) (PAL) (PZLP01) -> Master Quest (GC) (NTSC-U) (D43E01)
function pal_ootGC_to_us_mqOotGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace) {   // Start Function: pal_ootGC_to_us_mqOotGC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "off");
    
} // End Function: pal_ootGC_to_us_mqOotGC

// Ocarina of Time (GC) (PAL) (PZLP01) -> Master Quest (GC) (PAL) (D43P01)
function pal_ootGC_to_pal_mqOotGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace) {   // Start Function: pal_ootGC_to_pal_mqOotGC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "off");
    
} // End Function: pal_ootGC_to_pal_mqOotGC



// ----------------- Set 5



// Ocarina of Time (VC) (NTSC-U) (NACE01) -> Ocarina of Time (GC) (NTSC-U) (D43E01)
function us_ootVC_to_us_regOotGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace) {   // Start Function: us_ootVC_to_us_regOotGC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "on");
    
} // End Function: us_ootVC_to_us_regOotGC

// Ocarina of Time (VC) (NTSC-U) (NACE01) -> Ocarina of Time (GC) (PAL) (D43P01)
function us_ootVC_to_pal_regOotGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace) {   // Start Function: us_ootVC_to_pal_regOotGC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "on");
    
} // End Function: us_ootVC_to_pal_regOotGC

// Ocarina of Time (VC) (NTSC-U) (NACE01) -> Ocarina of Time (GC) (NTSC-U) (PZLE01)
function us_ootVC_to_us_ootGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace) {   // Start Function: us_ootVC_to_us_ootGC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "on");
    
} // End Function: us_ootVC_to_us_ootGC

// Ocarina of Time (VC) (NTSC-U) (NACE01) -> Ocarina of Time (GC) (PAL) (PZLP01)
function us_ootVC_to_pal_ootGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace) {   // Start Function: us_ootVC_to_pal_ootGC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "on");
    
} // End Function: us_ootVC_to_pal_ootGC

// Ocarina of Time (VC) (NTSC-U) (NACE01) -> Ocarina of Time (GC) (VC) (NACP01)
function us_ootVC_to_pal_ootVC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace) {   // Start Function: us_ootVC_to_pal_ootVC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "off");
    
} // End Function: us_ootVC_to_pal_ootVC

// Ocarina of Time (VC) (NTSC-U) (NACE01) -> Master Quest (GC) (NTSC-U) (D43E01)
function us_ootVC_to_us_mqOotGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace) {   // Start Function: us_ootVC_to_us_mqOotGC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "on");
    
} // End Function: us_ootVC_to_us_mqOotGC

// Ocarina of Time (VC) (NTSC-U) (NACE01) -> Master Quest (GC) (PAL) (D43P01)
function us_ootVC_to_pal_mqOotGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace) {   // Start Function: us_ootVC_to_pal_mqOotGC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "on");
    
} // End Function: us_ootVC_to_pal_mqOotGC



// ----------------- Set 6



// Ocarina of Time (VC) (NTSC-U) (NACE01) -> Ocarina of Time (GC) (NTSC-U) (D43E01)
function pal_ootVC_to_us_regOotGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace) {   // Start Function: pal_ootVC_to_us_regOotGC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "on");
    
} // End Function: pal_ootVC_to_us_regOotGC

// Ocarina of Time (VC) (NTSC-U) (NACE01) -> Ocarina of Time (GC) (PAL) (D43P01)
function pal_ootVC_to_pal_regOotGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace) {   // Start Function: pal_ootVC_to_pal_regOotGC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "on");
    
} // End Function: pal_ootVC_to_pal_regOotGC

// Ocarina of Time (VC) (NTSC-U) (NACE01) -> Ocarina of Time (GC) (NTSC-U) (PZLE01)
function pal_ootVC_to_us_ootGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace) {   // Start Function: pal_ootVC_to_us_ootGC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "on");
    
} // End Function: pal_ootVC_to_us_ootGC

// Ocarina of Time (VC) (NTSC-U) (NACE01) -> Ocarina of Time (GC) (PAL) (PZLP01)
function pal_ootVC_to_pal_ootGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace) {   // Start Function: pal_ootVC_to_pal_ootGC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "on");
    
} // End Function: pal_ootVC_to_pal_ootGC

// Ocarina of Time (VC) (NTSC-U) (NACE01) -> Ocarina of Time (VC) (PAL) (D43E01)
function pal_ootVC_to_us_ootVC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace) {   // Start Function: pal_ootVC_to_us_ootVC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "off");
    
} // End Function: pal_ootVC_to_us_ootVC

// Ocarina of Time (VC) (NTSC-U) (NACE01) -> Master Quest (GC) (NTSC-U) (D43E01)
function pal_ootVC_to_us_mqOotGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace) {   // Start Function: pal_ootVC_to_us_mqOotGC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "on");
    
} // End Function: pal_ootVC_to_us_mqOotGC

// Ocarina of Time (VC) (NTSC-U) (NACE01) -> Master Quest (GC) (PAL) (D43P01)
function pal_ootVC_to_pal_mqOotGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace) {   // Start Function: pal_ootVC_to_pal_mqOotGC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "on");
    
} // End Function: pal_ootVC_to_pal_mqOotGC



// -------------------- //
// --- Master Quest --- //
// -------------------- //



// ----------------- Set 1



// Master Quest (GC) (NTSC-U) (D43E01) -> Ocarina of Time (GC) (NTSC-U) (D43E01)
function us_mqOotGC_to_us_regOotGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace) {   // Start Function: us_mqOotGC_to_us_regOotGC
    
    Convert.fillPresets(2);
    
    offset_textfield[0].value = "40";
    offset_textfield[1].value = "20";
    
    offset_condition_from_textfield[0].value = "80CA0000";
    offset_condition_from_textfield[1].value = "80BE0000";
    
    offset_condition_to_textfield[0].value = "80FFFFFF";
    offset_condition_to_textfield[1].value = "80C9FFFF";
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "off");
    
} // End Function: us_mqOotGC_to_us_regOotGC

// Master Quest (GC) (NTSC-U) (D43E01) -> Ocarina of Time (GC) (PAL) (D43P01)
function us_mqOotGC_to_pal_regOotGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace) {   // Start Function: us_mqOotGC_to_pal_regOotGC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "off");
    
} // End Function: us_mqOotGC_to_pal_regOotGC

// Master Quest (GC) (NTSC-U) (D43E01) -> Ocarina of Time (GC) (NTSC-U) (PZLE01)
function us_mqOotGC_to_us_ootGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace) {   // Start Function: us_mqOotGC_to_us_ootGC
    
    Convert.fillPresets(2);
    
    offset_textfield[0].value = "-1540";
    offset_textfield[1].value = "-1560";
    
    offset_condition_from_textfield[0].value = "80CA0000";
    offset_condition_from_textfield[1].value = "80BE0000";
    
    offset_condition_to_textfield[0].value = "80FFFFFF";
    offset_condition_to_textfield[1].value = "80C9FFFF";
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "off");
    
} // End Function: us_mqOotGC_to_us_ootGC

// Master Quest (GC) (NTSC-U) (D43E01) -> Ocarina of Time (GC) (PAL) (PZLP01)
function us_mqOotGC_to_pal_ootGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace) {   // Start Function: us_mqOotGC_to_pal_ootGC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "off");
    
} // End Function: us_mqOotGC_to_pal_ootGC

// Master Quest (GC) (NTSC-U) (D43E01) -> Ocarina of Time (VC) (NTSC-U) (NACE01)
function us_mqOotGC_to_us_ootVC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace) {   // Start Function: us_mqOotGC_to_us_ootVC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "on");
    
} // End Function: us_mqOotGC_to_us_ootVC

// Master Quest (GC) (NTSC-U) (D43E01) -> Ocarina of Time (VC) (PAL) (NACP01)
function us_mqOotGC_to_pal_ootVC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace) {   // Start Function: us_mqOotGC_to_pal_ootVC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "on");
    
} // End Function: us_mqOotGC_to_pal_ootVC

// Master Quest (GC) (NTSC-U) (D43E01) -> Master Quest (GC) (PAL) (D43P01)
function us_mqOotGC_to_pal_mqOotGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace) {   // Start Function: us_mqOotGC_to_pal_mqOotGC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "off");
    
} // End Function: us_mqOotGC_to_pal_mqOotGC



// ----------------- Set 2



// Master Quest (GC) (PAL) (D43P01) -> Ocarina of Time (GC) (NTSC-U) (D43E01)
function pal_mqOotGC_to_us_regOotGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace) {   // Start Function: pal_mqOotGC_to_us_regOotGC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "off");
    
} // End Function: pal_mqOotGC_to_us_regOotGC

// Master Quest (GC) (PAL) (D43P01) -> Ocarina of Time (GC) (PAL) (D43P01)
function pal_mqOotGC_to_pal_regOotGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace) {   // Start Function: pal_mqOotGC_to_pal_regOotGC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "off");
    
} // End Function: pal_mqOotGC_to_pal_regOotGC

// Master Quest (GC) (PAL) (D43P01) -> Ocarina of Time (GC) (NTSC-U) (PZLE01)
function pal_mqOotGC_to_us_ootGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace) {   // Start Function: pal_mqOotGC_to_us_ootGC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "off");
    
} // End Function: pal_mqOotGC_to_us_ootGC

// Master Quest (GC) (PAL) (D43P01) -> Ocarina of Time (GC) (PAL) (PZLP01)
function pal_mqOotGC_to_pal_ootGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace) {   // Start Function: pal_mqOotGC_to_pal_ootGC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "off");
    
} // End Function: pal_mqOotGC_to_pal_ootGC

// Master Quest (GC) (PAL) (D43P01) -> Ocarina of Time (VC) (NTSC-U) (NACE01)
function pal_mqOotGC_to_us_ootVC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace) {   // Start Function: pal_mqOotGC_to_us_ootVC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "on");
    
} // End Function: pal_mqOotGC_to_us_ootVC

// Master Quest (GC) (PAL) (D43P01) -> Ocarina of Time (VC) (PAL) (NACP01)
function pal_mqOotGC_to_pal_ootVC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace) {   // Start Function: pal_mqOotGC_to_pal_ootVC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "on");
    
} // End Function: pal_mqOotGC_to_pal_ootVC

// Master Quest (GC) (PAL) (D43P01) -> Master Quest (GC) (NTSC-U) (D43E01)
function pal_mqOotGC_to_us_mqOotGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace) {   // Start Function: pal_mqOotGC_to_us_mqOotGC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "off");
    
} // End Function: pal_mqOotGC_to_us_mqOotGC



// --------------------- //
// --- Majora's Mask --- //
// --------------------- //

// Majora's Mask (GC) (NTSC-U) (PZLE01) to Majora's Mask (GC) (PAL) (PZLP01)
function us_mmGC_to_pal_mmGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace) {   // Start Function: us_mmGC_to_pal_mmGC
    
    Convert.fillPresets(6);
    
    offset_textfield[0].value = "-9570";
    offset_textfield[1].value = "-7A0";
    offset_textfield[2].value = "-C00";
    offset_textfield[3].value = "-1010";
    offset_textfield[4].value = "-111B0";
    offset_textfield[5].value = "-BE0";
    
    offset_condition_from_textfield[0].value = "80CA0000";
    offset_condition_from_textfield[1].value = "80C80000";
    offset_condition_from_textfield[2].value = "80C10000";
    offset_condition_from_textfield[3].value = "80B80000";
    offset_condition_from_textfield[4].value = "80100000";
    offset_condition_from_textfield[5].value = "81140000";
    
    offset_condition_to_textfield[0].value = "80FFFFFF";
    offset_condition_to_textfield[1].value = "80C9FFFF";
    offset_condition_to_textfield[2].value = "80C7FFFF";
    offset_condition_to_textfield[3].value = "80C0FFFF";
    offset_condition_to_textfield[4].value = "80B7FFFF";
    offset_condition_to_textfield[5].value = "8116FFFF";
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "off");
    
} // End Function: us_mmGC_to_pal_mmGC

// Majora's Mask (GC) (NTSC-U) (PZLE01) to Majora's Mask (VC) (NTSC-U) (NARE01)
function us_mmGC_to_us_mmVC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace) {   // Start Function: us_mmGC_to_us_mmVC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "on");
    
} // End Function: us_mmGC_to_us_mmVC

// Majora's Mask (GC) (NTSC-U) (PZLE01) to Majora's Mask (VC) (PAL) (NARP01)
function us_mmGC_to_pal_mmVC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace) {   // Start Function: us_mmGC_to_pal_mmVC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "on");
    
} // End Function: us_mmGC_to_pal_mmVC



// Majora's Mask (GC) (PAL) (PZLP01) to Majora's Mask (GC) (NTSC-U) (PZLP01)
function pal_mmGC_to_us_mmGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace) {   // Start Function: pal_mmGC_to_us_mmVC
    
    Convert.fillPresets(6);
    
    offset_textfield[0].value = "9570";
    offset_textfield[1].value = "7A0";
    offset_textfield[2].value = "C00";
    offset_textfield[3].value = "1010";
    offset_textfield[4].value = "111B0";
    offset_textfield[5].value = "BE0";
    
    offset_condition_from_textfield[0].value = "80C96A90";
    offset_condition_from_textfield[1].value = "80C7F860";
    offset_condition_from_textfield[2].value = "80C0F400";
    offset_condition_from_textfield[3].value = "80B7EFF0";
    offset_condition_from_textfield[4].value = "800EEE50";
    offset_condition_from_textfield[5].value = "8113F420";
    
    offset_condition_to_textfield[0].value = "80FFFFFF";
    offset_condition_to_textfield[1].value = "80C9F85F";
    offset_condition_to_textfield[2].value = "80C7F3FF";
    offset_condition_to_textfield[3].value = "80C0EFEF";
    offset_condition_to_textfield[4].value = "80B6EE4F";
    offset_condition_to_textfield[5].value = "8116F41F";
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "off");
    
} // End Function: pal_mmGC_to_us_mmVC

// Majora's Mask (GC) (PAL) (PZLP01) to Majora's Mask (VC) (NTSC-U) (NARE01)
function pal_mmGC_to_us_mmVC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace) {   // Start Function: pal_mmGC_to_us_mmVC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "on");
    
} // End Function: pal_mmGC_to_us_mmVC

// Majora's Mask (GC) (PAL) (PZLP01) to Majora's Mask (VC) (PAL) (NARP01)
function pal_mmGC_to_pal_mmVC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace) {   // Start Function: pal_mmGC_to_pal_mmVC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "on");
    
} // End Function: pal_mmGC_to_pal_mmVC



// Majora's Mask (VC) (NTSC-U) (NACE01) to Majora's Mask (GC) (NTSC-U) (PZLE01)
function us_mmVC_to_us_mmGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace) {   // Start Function: us_mmVC_to_us_mmGC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "on");
    
} // End Function: us_mmVC_to_us_mmGC

// Majora's Mask (VC) (NTSC-U) (NACE01) to Majora's Mask (GC) (PAL) (PZLP01)
function us_mmVC_to_pal_mmGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace) {   // Start Function: us_mmVC_to_pal_mmGC

    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "on");
    
} // End Function: us_mmVC_to_pal_mmGC

// Majora's Mask (VC) (NTSC-U) (NACE01) to Majora's Mask (VC) (PAL) (NARP01)
function us_mmVC_to_pal_mmVC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace) {   // Start Function: us_mmVC_to_pal_mmVC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "off");
    
} // End Function: us_mmVC_to_pal_mmVC



// Majora's Mask (VC) (PAL) (NACP01) to Majora's Mask (GC) (NTSC-U) (PZLE01)
function pal_mmVC_to_us_mmGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace) {   // Start Function: pal_mmVC_to_us_mmGC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "on");
    
} // End Function: pal_mmVC_to_us_mmGC

// Majora's Mask (VC) (PAL) (PZLP01) to Majora's Mask (GC) (PAL) (PZLE01)
function pal_mmVC_to_pal_mmGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace) {   // Start Function: pal_mmVC_to_pal_mmGC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "on");
    
} // End Function: pal_mmVC_to_pal_mmGC

// Majora's Mask (VC) (PAL) (PZLP01) to Majora's Mask (VC) (NTSC-U) (NARE01)
function pal_mmVC_to_us_mmVC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace) {   // Start Function: pal_mmVC_to_us_mmVC
    
    Convert.fillPresets(1);
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "off");
    
} // End Function: pal_mmVC_to_us_mmVC








// ---------------------- //
// --- Super Mario 64 --- //
// ---------------------- //

// Super Mario 64 (VC) (NTSC-U) (NAAE01) to Super Mario 64 (VC) (PAL) (NAAP01)
function us_sm64VC_to_pal_sm64VC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace) {   // Start Function: us_sm64VC_to_pal_sm64VC
    
    Convert.fillPresets(1);
    
    offset_textfield[0].value = "-0";
    
    offset_condition_from_textfield[0].value = "81000000";
    
    offset_condition_to_textfield[0].value = "81FFFFFF";
    
} // End Function: us_sm64VC_to_pal_sm64VC

// Super Mario 64 (VC) (PAL) (NAAP01) to Super Mario 64 (VC) (NTSC-U) (NAAE01)
function pal_sm64VC_to_us_sm64VC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace) {   // Start Function: pal_sm64VC_to_us_sm64VC
    
    Convert.fillPresets(1);
    
    offset_textfield[0].value = "0";
    
    offset_condition_from_textfield[0].value = "81000000";
    
    offset_condition_to_textfield[0].value = "81FFFFFF";
    
} // End Function: pal_sm64VC_to_us_sm64VC