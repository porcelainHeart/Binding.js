## Binding.js  Version：1.1.0

####转载请注明出处：https://github.com/porcelainHeart/Binding.js

压缩后的binding.min.js的大小只有1.2kb！！！  就可以让你实现完善的数据绑定功能！

下面让我们来看看Binding是如何使用的：

首先你需要在你的html文档中创建一个表单控件，然后给它添加一个data-controller属性，

可以是文本框（包括数字型，日期型，等等所有html5所支持的格式），可以是单选/复选框，

也可以是下拉菜单，进度条，或者你也可以将他们分组。

    <input type="number" data-controller="num" />       // 就像这样
    <input type="text" data-controller="txt">           // 任何type都可以
    <select name="sel" data-controller="opt"></select>  // 或是是下拉菜单，总之所有能输入信息的控件都可以

然后你想让这些输入值同步出现在什么地方，就要给那个标签添加一个data-model属性，

当data-model属性的值与data-controller的值相同时，这两个数据就被绑定在一起。

    <p data-model="num">number</p>    // 这样就绑定了上面数字输入框 并且设置默认显示为number
    
只有这样还不够，你需要新建一个绑定的事件对象：

    var obj=binding(modelname, obj ，fun ); 

其中modelname是必选参数，是你想要绑定model的值，可以是字符串的形式，也可以是含有很多model的数组

obj是一个可选参数，可以是一个定义初始化事件的对象，这个对象有三个可选的属性值：

    {
    watch: 'value',     // value是你要绑定的controller的属性值，默认为value
    change: 'className' // className是你要修改的model的属性值，默认为textContent
    defaultValue: 'default' // default是你要修改的默认值，这个默认值的优先级小于行内样式，默认为false
    }
fun是一个可选参数，可以是一个回调函数。

如果你想输入modelname和fun参数，那么无需给obj参数空出位置，binding会自动认为第二个参数是回调函数。

下面是新增事件对象的一个实例：

    var obj=binding('num',{watch: 'value',change: 'textContent'},function(input) {
        console.log(input.value);
    });
    
这样我们就把具有data-model="num"属性的标签和具有data-controller="num"属性的输入控件绑定完成了，

而且每当输入的值发生变换时，还将触发一个回调函数，将输入框的值打印在console上。

除此以外我们还提供了一些其他功能：

    obj.addController('newControllerName');  // 新增一个值为newControllerName的controller
    obj.addModel('newModelName');            // 新增一个值为newModelName的model
    obj.destroy();                           // 销毁obj事件对象
    obj.controllers;                         // 查看obj事件的所有controller，返回一个字符串的数组
    obj.models;                              // 查看obj事件的所有model，返回一个字符串的数组
    
Binding.js不依赖于任何其他第三方库，但是不支持IE9以下旧式浏览器。

到这里如果你以为Binding.js只是可以进行初步的表单验证，那可就大错特错了。

试想一下，如果你的论坛网页引入了Binding.js，你甚至可以做到让用户发表评论时，网页的背景随着用户的心情而发生变化！！

只要你有足够有趣的idea，Binding.js能给你带来近乎一切的交互体验。

Binding.js主要实现的是Model层的工作，你可以结合我的另一个库ProduceDOM来使用，组合成完整的MVC架构。
