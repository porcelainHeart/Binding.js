/**
 * Created by 浮生 on 2016/8/5.
 */
(function () {
    window.binding = function(col, b, c) {

        if (typeof(col) === 'string') {
            col = [col];
        }
        return Array.prototype.slice.call(col, 0).map(function(a) {

            var watch         = (typeof(b) === 'object' && b.watch)         ? b.watch       : 'value',
                change        = (typeof(b) === 'object' && b.change)        ? b.change      : 'textContent',
                defaultValue  = (typeof(b) === 'object' && b.defaultValue)  ? b.defaultValue: false,
                callback      = (typeof(b) === 'function')                  ? b             : c,
                pur, inputs, event, modArr = [], conArr = [];

            var BR = function() {

                if (typeof(a) === 'string') {
                    newController(a);
                    newModel(a);
                } else {
                    newController(a.dataset.controller);
                    newModel(a.dataset.controller);
                }
                makeInputs();
            };

            function takeList(arr) {
                return document.querySelectorAll(arr.join(','));
            }

            function newController(con) {
                conArr.push('[data-controller="' + con + '"]');
                inputs = takeList(conArr);
            }

            function newModel(mod) {
                modArr.push('[data-model="' + mod + '"]');
                pur = takeList(modArr);
            }

            function makeInputs() {
                for (var i = 0; i < inputs.length; i++) {
                    event = (inputs[i].type === 'radio' || inputs[i].type === 'checkbox' || inputs[i].type.indexOf('select') !== -1) ? 'change': 'input';
                    inputs[i].addEventListener(event, handleChange);
                }
            }

            function handleChange() {
                for (var i = 0; i < pur.length; i++) {
                    var value = this[watch].toString().trim();
                    if (value.length === 0) {
                    } else if (!defaultValue) {
                        pur[i][change] = value;
                    } else {
                        if (value.length > 0) {
                            pur[i][change] = value;
                        } else {
                            pur[i][change] = defaultValue;
                        }
                    }
                }
                if (callback && typeof(callback) === 'function') {
                    callback(this, pur[i]);
                }
            }

            BR.prototype.controllers = conArr;

            BR.prototype.models = modArr;

            BR.prototype.destroy = function() {
                for (var i = 0; i < inputs.length; i++) {
                    inputs[i].removeEventListener(event, handleChange);
                }
            };

            BR.prototype.addModel = function(newMod) {
                newModel(newMod);
                makeInputs();
            };

            BR.prototype.addController = function(newCon) {
                newController(newCon);
                makeInputs();
            };
            return new BR;
        });

    };
})();