# (弃用！！！) 一次typescript编译成esm模块的尝试

（弃用的分支）
以下说明几点将src代码改为esm的起因和弃用原因。

## 打算使用esm的起因
由于本项目存在pure esm的依赖，由于本项目的Remix使用cjs导出，所以pure esm的依赖将无法在build构建后导入。
处理方式有两种：1. 将pure esm依赖降级处理。 2. 将项目升级为esm
这里打算采用第二种，所以对项目进行esm升级。

## 使用esm失败的原因
1. 项目需要进行如下修改
   1. tsconfig.json：target = ES2022
   2. tsconfig.json：module = Node16
   3. tsconfig.json：moduleResolution = Node16
   4. package.json：type = module
   5. 导入需要加.js后缀
2. 某些依赖并非pure esm，所以会出现无法导入的情况，比如 unstorage，诸多的依赖容易出现esm编译错误的问题并且社区上几乎没有关于这类问题的有效的解决方案。故放弃升级esm。