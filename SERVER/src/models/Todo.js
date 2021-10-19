const mongoose = require('mongoose')//const로 변수 선언. var로 하면 다른 사람이 바꿈 ,전역변수는 var로 해도 됨
const todoSchema = mongoose.Schema({ // 스키마 정의 
    name: { type: String, required: true, trim: true }, 
    done: { type: Boolean, default: false}, 
    description: { type: String, required: true, trim: true } 
}) 
const Todo = mongoose.model('Todo', todoSchema) // 스키마로부터 생성된 모델 객체 
module.exports = Todo;
