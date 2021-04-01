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
                pal_mmGC_to_us_mmGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace);
            if (Preset.selectTo() == "Majora's Mask (VC) (NTSC-U) (NARE01)")
                pal_mmGC_to_us_mmVC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace);
            if (Preset.selectTo() == "Majora's Mask (VC) (PAL) (NARP01)")
                pal_mmGC_to_pal_mmVC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace);
        }
        
        if (Preset.selectFrom() == "Majora's Mask (VC) (NTSC-U) (NARE01)") {
            if (Preset.selectTo() == "Majora's Mask (GC) (NTSC-U) (PZLE01)")
                us_mmVC_to_us_mmGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace);
            if (Preset.selectTo() == "Majora's Mask (GC) (PAL) (PZLP01)")
                us_mmVC_to_pal_mmGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace);
            if (Preset.selectTo() == "Majora's Mask (VC) (PAL) (NARP01)")
                us_mmVC_to_pal_mmVC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace);
        }
        
        if (Preset.selectFrom() == "Majora's Mask (VC) (NTSC-U) (NARP01)") {
            if (Preset.selectTo() == "Majora's Mask (GC) (NTSC-U) (PZLE01)")
                pal_mmVC_to_us_mmGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace);
            if (Preset.selectTo() == "Majora's Mask (GC) (PAL) (PZLP01)")
                pal_mmVC_to_pal_mmGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace);
            if (Preset.selectTo() == "Majora's Mask (VC) (NTSC-U) (NARE01)")
                pal_mmVC_to_us_mmVC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace);
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
    
    
    
    reverseGameCombo: function(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace) {   // Start Function: reverseGameCombo
        
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
                console.log(offset_condition_from_textfield[i].value + " - " + offset_condition_from_textfield[i].value.substring(0, 2).indexOf("80"));
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
    
    us_mqOotGC_to_us_regOotGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace);
    Preset.reverseGameCombo(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace);
    
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
    
    Convert.fillPresets(15);
    i=0;
    
    offset_textfield[i].value = "-9570";
    offset_condition_from_textfield[i].value = "80CA0000";
    offset_condition_to_textfield[i++].value = "80EFFFFF";
    
    offset_textfield[i].value = "-630";
    offset_condition_from_textfield[i].value = "80C8E000";
    offset_condition_to_textfield[i++].value = "80C8EFFF";
    
    offset_textfield[i].value = "-7A0";
    offset_condition_from_textfield[i].value = "80C8C000";
    offset_condition_to_textfield[i++].value = "80C8CFFF";
    
    offset_textfield[i].value = "-BF0";
    offset_condition_from_textfield[i].value = "80C00000";
    offset_condition_to_textfield[i++].value = "80C12FFF";
    
    offset_textfield[i].value = "-C00";
    offset_condition_from_textfield[i].value = "80C13000";
    offset_condition_to_textfield[i++].value = "80C7FFFF";
    
    offset_textfield[i].value = "-E6C";
    offset_condition_from_textfield[i].value = "80BE7000";
    offset_condition_to_textfield[i++].value = "80BEFFFF";
    
    offset_textfield[i].value = "-E7C";
    offset_condition_from_textfield[i].value = "80BE0000";
    offset_condition_to_textfield[i++].value = "80BE6FFF";
    
    offset_textfield[i].value = "-1280";
    offset_condition_from_textfield[i].value = "80BD0000";
    offset_condition_to_textfield[i++].value = "80BDFFFF";
    
    offset_textfield[i].value = "-1278";
    offset_condition_from_textfield[i].value = "80BC0000";
    offset_condition_to_textfield[i++].value = "80BCFFFF";
    
    offset_textfield[i].value = "-126C";
    offset_condition_from_textfield[i].value = "80B8D000";
    offset_condition_to_textfield[i++].value = "80B8FFFF";
    
    offset_textfield[i].value = "-124C";
    offset_condition_from_textfield[i].value = "80B80000";
    offset_condition_to_textfield[i++].value = "80B8CFFF";
    
    offset_textfield[i].value = "-4710";
    offset_condition_from_textfield[i].value = "80B60000";
    offset_condition_to_textfield[i++].value = "80B6FFFF";
    
    offset_textfield[i].value = "-111B0";
    offset_condition_from_textfield[i].value = "80141000";
    offset_condition_to_textfield[i++].value = "80141FFF";
    
    offset_textfield[i].value = "-113E0";
    offset_condition_from_textfield[i].value = "80140000";
    offset_condition_to_textfield[i++].value = "80140FFF";
    
    offset_textfield[i].value = "-11C0";
    offset_condition_from_textfield[i].value = "81140000";
    offset_condition_to_textfield[i++].value = "8116FFFF";
    
    for (var i=0; i<swapSpace.length; i++)
        swapSpace[i].setAttribute("data-value", "off");
    
} // End Function: us_mmGC_to_pal_mmGC

// Majora's Mask (GC) (NTSC-U) (PZLE01) to Majora's Mask (VC) (NTSC-U) (NARE01)
function us_mmGC_to_us_mmVC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace) {   // Start Function: us_mmGC_to_us_mmVC
    
    Convert.fillPresets(13);
    
    offset_textfield[0].value = "DDA4EE";
    offset_textfield[1].value = "44AC50";
    offset_textfield[2].value = "44E490";
    offset_textfield[3].value = "53105C";
    offset_textfield[4].value = "-BB27F0";
    offset_textfield[5].value = "-BB1C50";
    offset_textfield[6].value = "-BB1C20";
    offset_textfield[7].value = "-BB1C10";
    offset_textfield[8].value = "-BB1B80";
    offset_textfield[9].value = "-BAFE90";
    offset_textfield[10].value = "-BAF960";
    offset_textfield[11].value = "-BAE730";
    offset_textfield[12].value = "-B4BEE0";
    
    offset_condition_from_textfield[0].value = "80140000";
    offset_condition_from_textfield[1].value = "80B60000";
    offset_condition_from_textfield[2].value = "80B80000";
    offset_condition_from_textfield[3].value = "81100000";
    offset_condition_from_textfield[4].value = "80C30000";
    offset_condition_from_textfield[5].value = "80BE4000";
    offset_condition_from_textfield[6].value = "80BD0000";
    offset_condition_from_textfield[7].value = "80BC0000";
    offset_condition_from_textfield[8].value = "80C10000";
    offset_condition_from_textfield[9].value = "80C80000";
    offset_condition_from_textfield[10].value = "80CBC000";
    offset_condition_from_textfield[11].value = "80E00000";
    offset_condition_from_textfield[12].value = "80E4F000";
    
    offset_condition_to_textfield[0].value = "8014FFFF";
    offset_condition_to_textfield[1].value = "80B6FFFF";
    offset_condition_to_textfield[2].value = "80B8FFFF";
    offset_condition_to_textfield[3].value = "811FFFFF";
    offset_condition_to_textfield[4].value = "80C3FFFF";
    offset_condition_to_textfield[5].value = "80BEFFFF";
    offset_condition_to_textfield[6].value = "80BDFFFF";
    offset_condition_to_textfield[7].value = "80BCFFFF";
    offset_condition_to_textfield[8].value = "80C7FFFF";
    offset_condition_to_textfield[9].value = "80CAFFFF";
    offset_condition_to_textfield[10].value = "80CFFFFF";
    offset_condition_to_textfield[11].value = "80E4EFFF";
    offset_condition_to_textfield[12].value = "80EFFFFF";
    
    swapSpace[0].setAttribute("data-value", "off");
    for (var i=4; i<swapSpace.length; i++)
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
    
    us_mmGC_to_pal_mmGC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace);
    Preset.reverseGameCombo(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace);
    
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
    
    us_mmGC_to_us_mmVC(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace);
    Preset.reverseGameCombo(offset_textfield, offset_condition_from_textfield, offset_condition_to_textfield, swapSpace);
    
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