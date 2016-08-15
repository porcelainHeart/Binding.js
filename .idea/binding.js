/**
 * Created by 浮生 on 2016/8/5.
 *
 */
(function () {
    window.binding = function(col, b, c) {

        // 如果col是字符串，包装成数组
        if (typeof(col) === 'string') {
            col = [col];
        }

        // 返回事件对象数组，方便以后调用
        return Array.prototype.slice.call(col, 0).map(function(a) {

            // 参数b初始化
            var watch         = (typeof(b) === 'object' && b.watch)         ? b.watch       : 'value',
                change        = (typeof(b) === 'object' && b.change)        ? b.change      : 'textContent',
                defaultValue  = (typeof(b) === 'object' && b.defaultValue)  ? b.defaultValue: false,
                callback      = (typeof(b) === 'function')                  ? b             : c,
                pur, inputs, event, modArr = [], conArr = [];

            // 定义构造函数BR，用于生成事件对象
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

            // 获取nodeList
            function takeList(arr) {
                return document.querySelectorAll(arr.join(','));
            }

            // 新建控制器
            function newController(con) {
                conArr.push('[data-controller="' + con + '"]');
                inputs = takeList(conArr);
            }

            // 创建model
            function newModel(mod) {
                modArr.push('[data-model="' + mod + '"]');
                pur = takeList(modArr);
            }

            // 为每个输入控件添加事件监听器，句柄发生改变时将触发回调函数handleChange
            function makeInputs() {
                for (var i = 0; i < inputs.length; i++) {
                    event = (inputs[i].type === 'radio' || inputs[i].type === 'checkbox' || inputs[i].type.indexOf('select') !== -1) ? 'change': 'input';
                    inputs[i].addEventListener(event, handleChange);
                }
            }

            // 定义监听器回调函数， 改变显示的值
            function handleChange() {
                for (var i = 0; i < pur.length; i++) {
                    var value = this[watch].toString().trim();

                    if (value.length === 0) {
                        pur[i][change]=defaultValue;
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

            // 在BR.prototype上添加方法，作为暴露出去的api接口
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
