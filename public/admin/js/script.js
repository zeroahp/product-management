// ACTIVE BUTTONS
const buttonStatus = document.querySelectorAll("[button-status]");
if(buttonStatus.length > 0){

    buttonStatus.forEach(button => {
        button.addEventListener("click", () => {
    let url = new URL(window.location.href);

            const status = button.getAttribute("button-status");
            
            if(status != ""){    
                url.searchParams.set("status", status);
            }
            else {
                url.searchParams.delete("status");
            }

            //Quay lại trang 1 khi chọn bộ lọc mới
            url.searchParams.set("page", "1");

            // chuyen huong
            window.location.href = url.href;
        })
    })
}

//search
const formSearch =document.querySelector("#form-search");
if(formSearch){
    let url = new URL(window.location.href);

    formSearch.addEventListener("submit", (e) => {
        e.preventDefault();
        const value = (e.target.elements.keyword.value);

        if(value != ""){    
            url.searchParams.set("keyword", value);
        }
        else {
            url.searchParams.delete("keyword");
        }

        window.location.href = url.href;
    })
}
//End search

//pagination
const pagination = document.querySelectorAll("[button-pagination]");
if(pagination.length > 0){
    let url = new URL(window.location.href);

    pagination.forEach(button => {
        button.addEventListener("click", () => {
            const page = button.getAttribute("button-pagination");
            console.log(page);
            url.searchParams.set("page", page);

            window.location.href = url.href;
        })
    })

}

//End pagination

// change-status
const changStatus = document.querySelectorAll("[button-change-status]");
if(changStatus.length > 0){
     changStatus.forEach(button => {
        //form-change-status get data-path
        const formchangeStatus = document.querySelector("#form-change-status");
        const path = formchangeStatus.getAttribute("data-path")

        button.addEventListener("click", () => {
        //button-change-status [GET] data-status, data-id
            const status = button.getAttribute("data-status")
            const id = button.getAttribute("data-id")

            //check status
            const changeStatus = status == "active" ? "inactive" : "active";
                
            //res
            const action =  path + `${changeStatus}/${id}?_method=PATCH`;
            formchangeStatus.action = action ; //or  formchangeStatus.setAttribute("action", action)
             // form have "submit"
            formchangeStatus.submit();
        })
     })
}
// End change-status


// // show alert
const showAlert = document.querySelector("[show-alert]");
console.log(showAlert);
if(showAlert){
    const time = parseInt(showAlert.getAttribute("data-time")) || 3000;
    const closeAlert = showAlert.querySelector("[close-alert]");

    setTimeout(() => {
        showAlert.classList.add("alert-hidden");

    }, time);

    closeAlert.addEventListener("click", () => {
        showAlert.classList.add("alert-hidden");
    })

}
// End show alert

//click changeMulti
const changeMulti = document.querySelector("[checkbox-multi]")
if(changeMulti){
    const checkAll = changeMulti.querySelector("input[name='checkall']");
    const checkInputid = changeMulti.querySelectorAll("input[name='id']");

    //if checkAll => check all InputId
    checkAll.addEventListener("click", () => {
        checkInputid.forEach((input) => {
           if(checkAll.checked){
                input.checked = true;
           }else{
                input.checked = false;
           }
        })
    })

    // if check all InputId => checkAll 
    checkInputid.forEach((input) => {
        input.addEventListener("click", () => {
            const countChecked = changeMulti.querySelectorAll("input[name='id']:checked").length;
            
            if(countChecked == checkInputid.length){
                checkAll.checked = true;
            }else{
                checkAll.checked = false;
            }
        })
    })
}
//End  click changeMulti

// form-change-multi
const formChangeMulti = document.querySelector("[form-change-multi]");
if(formChangeMulti) {
    formChangeMulti.addEventListener("submit", (e) => {
        e.preventDefault();

        //get inputchecked 
        const changeMulti = document.querySelector("[checkbox-multi]");
        const inputChecked = changeMulti.querySelectorAll("input[name='id']:checked");

        const type = e.target.elements.type.value;
        if(type == "deleted"){
            const isconfirm = confirm("Bạn có chắc chăn muốn xóa những sản phẩm nảy?");
            if(!isconfirm)
            {return ;}
        }

        if(inputChecked.length > 0){
            let ids = [];
            //put values to "formchangMulti"
            const InputIds = formChangeMulti.querySelector("input[name='ids']");

            inputChecked.forEach(input => {
                const id = input.value;
                if (type == "change-position") {
                //     //closet lay ra ele cha
                    const position = input.closest("tr").querySelector("input[name='positon']").value;
                    ids.push(`${id}-${position}`);
                } else { 
                    ids.push(id);
                }
            })                

            InputIds.value = ids.join(", "); //convert to string
            //submit
            formChangeMulti.submit();
        }else{
            alert("Vui lòng chọn ít nhất 1 bản ghi!");
        }
    })
}
// Endform-change-multi

// deleteItem
const buttonDelete = document.querySelectorAll("[button-delete]");
if(buttonDelete.length > 0 ){
    const formDelete = document.querySelector("#form-delete-item");
    const path = formDelete.getAttribute("data-path");

    buttonDelete.forEach(button => {
        button.addEventListener("click" , () => {
            const confirmDelete = confirm("Bạn có chắc muốn xóa ?");

            if(confirmDelete){
                const id = button.getAttribute("data-id");
                
                const action = path + `/${id}?_method=DELETE`;
                formDelete.action = action;
                formDelete.submit();
            }
            
        })
    })
}

//End deleteItem

// image preview
const upload = document.querySelector("[upload-image]");
// console.log(upload);
if(upload){
    const imageInput = upload.querySelector("[upload-image-input]");
    const imagePreview = upload.querySelector("[upload-image-preview]");

    imageInput.addEventListener("change", (e) => {
        console.log(e.target.files);

        if(e.target.files.length){

            //create image
            const image = URL.createObjectURL(e.target.files[0]);
            imagePreview.src = image;
        }
    })
    
}
// End image preview