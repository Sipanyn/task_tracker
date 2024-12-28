let $=document
let input_elem=$.querySelector(".input_container input")
let upload_icon=$.querySelector(".upload_icon")
let tasks_container=$.querySelector(".tasks_container")
let uniqe_id=null
let my_array=[]
////////////////////////////////////
const Toast = Swal.mixin({ //sweetalert2
    toast:true,
    position: "top-end",
    icon: "success",
    title: "با موفقیت ثبت شد",
    showConfirmButton: false,
    timer: 1500
    })
//////////////////////////////ثبت ورودی با دکمه اینتر
input_elem.addEventListener("keyup",(event)=>{
    let my_input_value=input_elem.value.trim()  //چک کردن ورودی
    if(my_input_value.length>0 && event.key=="Enter"){
    uniqe_id=Math.floor(Math.random()*1000)+`${my_input_value}` //ساخت آیدی مجزا برای هر ورودی
     save_in_local(my_input_value)
     add_task(my_input_value)
     input_elem.value=""
     Toast.fire()
    }
    
})
//////////////////////////////ثبت ورودی با کلیک روی آیکون
upload_icon.addEventListener("click",(event)=>{
    let my_input_value=input_elem.value.trim()  //چک کردن ورودی
    if(my_input_value.length>0){
     save_in_local(my_input_value)
     add_task(my_input_value)
     input_elem.value=""
     Toast.fire()
    }
})
///////////////////////////////تابع ذخیره سازی در لوکال
function save_in_local(my_input_value){
    let my_input_obj={}   //ساخت آبجت برای هر ورودی
    my_input_obj.id=uniqe_id 
    my_input_obj.title=`${my_input_value}`
    my_array.push(my_input_obj)
    localStorage.setItem("tasks",JSON.stringify(my_array))
}
///////////////////////////////////اضافه کردن تسک به دام
function add_task(my_input_value){
    tasks_container.insertAdjacentHTML(`beforeend`,`
        <div class="task" id="'${uniqe_id}'">
               <div class="checkbox">
                 <input type="checkbox">
                 <label for="checkbox_1">${my_input_value}</label>
               </div>
               <img onclick="delete_fun('${uniqe_id}')" class="delete_icon" src="icons/delete.svg" alt="">
             </div>
        `)
    }
//////////////////////////////////////////// اضافه کردن تسک ها به دام بعد از لود صفحه
window.addEventListener("load",()=>{
    if(localStorage.length>0){
        my_array=JSON.parse(localStorage.getItem("tasks"))
    }
    if(localStorage.length>0){
       let tasks_arr_from_local=JSON.parse(localStorage.getItem("tasks"))
       read_insert_from_local(tasks_arr_from_local)
    }
})
////////////////////////// خواندن از لوکال
function read_insert_from_local(tasks_arr_from_local){
    tasks_arr_from_local.forEach(function(task){
        tasks_container.insertAdjacentHTML(`beforeend`,`
            <div class="task" id="'${task.id}'">
          <div class="checkbox">
            <input type="checkbox">
            <label for="checkbox_1">${task.title}</label>
          </div>
          <img onclick="delete_fun('${task.id}')" class="delete_icon" src="icons/delete.svg" alt="">
        </div>
            `)
       })
}
//////////////////////////تابع حذف تسک
function delete_fun(item_id){
    Swal.fire({             //sweetalert2
        title: "برای حذف مطمئن هستید؟",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "بله",
        cancelButtonText: "خیر"
      }).then((result) => {
        if (result.isConfirmed) {  //اگر جواب مثبت بود
            let new_arr=
            JSON.parse(localStorage.getItem("tasks")).filter(function(item){
                return item.id!=item_id
            })// فیلتر و جداسازی تسک مورد نظر
            localStorage.setItem("tasks",JSON.stringify(new_arr)) //بازنویسی لوکال
        
             let new_arr_from_local=JSON.parse(localStorage.getItem("tasks")) //بازنویسی دام
            tasks_container.innerHTML=""
            read_insert_from_local(new_arr_from_local)
          Swal.fire({
            title: "حذف شد",
            text: "درخواست شما با موفقیت انجام شد",
            icon: "success",
            timer: 1000,
            showConfirmButton: false,
          });
        }
      });
   
    
}
///////////////////////////باید در لوکال یک گزینه هم برای چک شدن اینپوت ها در نظر میگرفتم
//////////////////////////که وقتی چک شدند در لود بعدی باز هم چک بمانند