// JavaScript Document
// Author:		Admentus

var Event = {   // Start Static Class: Event
	
	// Add an event handler -> obj = element, type = event, fn = function
	add: function(obj, type, fn) {   // Start: add
		
		if (obj.addEventListener)
			obj.addEventListener(type, fn, false);
		else obj.attachEvent("on" + type, fn);
		
	}, // End: add
	
	// Remove an event handler
	remove: function(obj, type, fn) {   // Start: remove
		
		if (obj.removeEventListener)
			obj.removeEventListener(type, fn, false);
		else obj.detachEvent("on" + type, fn);
		
	}, // End: remove
	
	// Get a reference to the element which called for an event -> e = event object
	getTarget: function(e) {   // Start: getTarget
		
		if (e.target)
			return e.target;
		else return e.srcElement;
	
	}, // End: getTarget
	
	// Stop default event -> e = event object
	preventDefault: function(e) {   // Start: preventDefault
		
		if (e.preventDefault)
			e.preventDefault();
		else e.returnValue = false;
		
	}, // End: preventDefault
		
}; // End Static Class: Event