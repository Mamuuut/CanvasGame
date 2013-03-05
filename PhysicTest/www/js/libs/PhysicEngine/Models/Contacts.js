/**
 * Contacts
 * @author Mathieu Delaunay
 */

define( [
    "PhysicEngine/Models/AxisContacts"
], function( AxisContacts )
{ 
    var Contacts = function()
    {
    	this.x = null;
    	this.y = null;
    	
    	this.clear();
    };
    
    Contacts.prototype.addContact = function( object, axis, position )
    {
    	return this.getObjects( axis, position ).push( object );
    };
    
    Contacts.prototype.hasContact = function( axis )
    {
    	return 0 != this[axis].axis_min.length || 0 != this[axis].axis_max.length;
    };
    
    Contacts.prototype.getObjects = function( axis, position )
    {
    	return this.getAxisContacts( axis )[position];
    };
    
    Contacts.prototype.getAxisContacts = function( axis )
    {
    	return this[axis];
    };
    
    Contacts.prototype.clear = function() 
    {
    	this.x = new AxisContacts();
    	this.y = new AxisContacts();
    };
    
    return Contacts;
} );