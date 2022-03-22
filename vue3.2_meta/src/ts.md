#TS学习
##类型
```ts
//数组定义
let arr:number[];
let arr1:[number,string];
let arr3:any[];

//函数viod控制，禁止返回值；
const fun=():void=>{
    return '此时不可返回任何数据';
}
```

##枚举类型

```ts
enum e {
    list1,//e['list1']输出值为0类似于数组
    list2=3,//输出为3且后续都会自行增值
    list3='string1',//输出为string1，但后续赋值必须全部遵循强制赋值，否则报错
}
// 此枚举类型可以用于赋值
let e1:e = 10;
let e2:e = e.list3;//此类取值最好还是用['name']来取而不是.name，因为在从ajax返回值中取值时，编码处不能识别这个值存在性
console.log(e2)//输出为string1
```

##字面量类型

```ts
let string1: 'type1'|2//此时再对他赋值，将只能存入列举的两个值
```

##类型推断

```ts
let any = 'string';
any = 8;//这个赋值不会成功，因为第一次赋值是string类型
```

##类型断言

```ts
const fun=(e: number|string):string|undefined=>{
    if ((e as string).length){
        return '这是个字符串';
    }else if (<number>e-1>0){
        return '这是个比1大的数';
    }
}//这两种断言都能成功，我觉得<>更好写
```
##

```ts
//还有一个类，与对象几乎一样，没什么太大意义
class class1 {
    string1:string|undefined
    fun=()=>{
        return(this.string1)
    }
}
// 类可以被继承
class class2 extends class1{}
//继承后可以继续更改
class class3 extends class1{
    constructor(string1: string, string2: string) {
        super()
        //构造方法重写，不改变父类，只改变子类
        this.string1=string1
        this.string2=string2
    }

    string2:string|undefined
    fun=()=>{
        super.fun();
        //方法重写
        return(this.string2)
    }
}
let target= new class3('string of 1', 'string of 2')
console.log(target.fun())

//定义属性时，可以加入private和protected设置保护
//外部调用受保护的值，采用set取出原来的值赋于新定义的变量，用get方法直接使用被保护的值
``` 