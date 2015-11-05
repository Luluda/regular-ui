'use strict';

var _ = require('./util.js');

exports['z-crt'] = function(elem, value) {
    if(typeof value === 'object' && value.type == 'expression')
        this.$watch(value, function(newValue, oldValue) {
            _.dom[newValue ? 'addClass' : 'delClass'](elem, 'z-crt');
        });
    else if(!!value || value === '')
        _.dom.addClass(elem, 'z-crt');
}

exports['z-sel'] = function(elem, value) {
    if(typeof value === 'object' && value.type == 'expression')
        this.$watch(value, function(newValue, oldValue) {
            _.dom[newValue ? 'addClass' : 'delClass'](elem, 'z-sel');
        });
    else if(!!value || value === '')
        _.dom.addClass(elem, 'z-sel');
}

exports['z-dis'] = function(elem, value) {
    if(typeof value === 'object' && value.type == 'expression')
        this.$watch(value, function(newValue, oldValue) {
            _.dom[newValue ? 'addClass' : 'delClass'](elem, 'z-dis');
        });
    else if(!!value || value === '')
        _.dom.addClass(elem, 'z-dis');
}

exports['r-show'] = function(elem, value) {
    if(typeof value === 'object' && value.type == 'expression')
        this.$watch(value, function(newValue, oldValue) {
            if(!newValue == !oldValue)
                return;

            if(typeof newValue === 'string')
                elem.style.display = newValue;
            else
                elem.style.display = newValue ? 'block' : '';
        });
    else if(!!value || value === '') {
        if(typeof value === 'string' && value !== '')
            elem.style.display = value;
        else
            elem.style.display = value ? 'block' : '';
    }
}

exports['r-autofocus'] = function(elem, value) {
    setTimeout(function() {
        elem.focus();
    }, 0);
}

exports['r-attr'] = function(elem, value) {
    var attrs = {
        'INPUT': ['autocomplete', 'autofocus', 'checked', 'disabled', 'max', 'maxlength', 'min', 'multiple', 'name', 'pattern', 'placeholder', 'readonly', 'required', 'step', 'type'],
        'TEXTAREA': ['autofocus', 'disabled', 'maxlength', 'name', 'placeholder', 'readonly', 'required', 'wrap'],
        'SELECT': ['autofocus', 'disabled', 'multiple', 'name', 'required']
    }

    this.$watch(value, function(newValue, oldValue) {
        attrs[elem.tagName].forEach(function(attr) {
            if(newValue[attr])
                _.dom.attr(elem, attr, newValue[attr]);
        });
    }, true);
}

exports['r-draggable'] = function(elem, value) {
    var dragging = null;
    
    function onMouseDown($event) {
        $event.preventDefault();

        _.dom.on(document.body, 'mousemove', onMouseMove);
        _.dom.on(document.body, 'mouseup', onMouseUp);

        dragging = _.dom.getDimension(elem);
        dragging.pageX = $event.pageX;
        dragging.pageY = $event.pageY;
        dragging.origin = elem;
        
        var elem2 = elem.cloneNode(true);

        elem2.style.left = dragging.left + 'px';
        elem2.style.top = dragging.top + 'px';
        elem2.style.position = 'fixed';
        elem2.style.zIndex = '2000';

        dragging.cloned = elem2;

        document.body.appendChild(elem2);
        document.body.style.cursor = 'move';
    }

    function onMouseMove($event) {
        console.log($event);
        if(dragging && $event.which == 1) {
            $event.preventDefault();

            dragging.left += $event.pageX - dragging.pageX;
            dragging.top += $event.pageY - dragging.pageY;
            dragging.pageX = $event.pageX;
            dragging.pageY = $event.pageY;

            dragging.cloned.style.left = dragging.left + 'px';
            dragging.cloned.style.top = dragging.top + 'px';
        }
    }

    function onMouseUp($event) {
        if(dragging) {
            $event.preventDefault();

            _.dom.off(document.body, 'mousemove', onMouseMove);
            _.dom.off(document.body, 'mouseup', onMouseUp);

            document.body.removeChild(dragging.cloned);
            document.body.style.cursor = 'default';
            dragging = null;
        }
    }

    if(typeof value === 'object' && value.type == 'expression')
        this.$watch(value, function(newValue, oldValue) {
            if(newValue)
                _.dom.on(elem, 'mousedown', onMouseDown);
            else
                _.dom.off(elem, 'mousedown', onMouseDown);
        });
    else if(!!value)
        _.dom.on(elem, 'mousedown', onMouseDown);
}