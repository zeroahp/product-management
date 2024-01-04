// permission
const tablePermission = document.querySelector('[table-permissions]');
if (tablePermission) {
    const buttonSubmit = document.querySelector('[button-submit]');

    buttonSubmit.addEventListener("click", () => {
        let result = [];

        const row = tablePermission.querySelectorAll('[data-name]')

        row.forEach(row => {
            const name = row.getAttribute("data-name");
            const input = row.querySelectorAll("input");

            if (name == 'id') {
                input.forEach(input => {
                    const value = input.value;
                    result.push({
                        id: value,
                        permission: []
                    })
                })
            } else {
                input.forEach((input, index) => {
                    const checked = input.checked;

                    // console.log(name);
                    // console.log(index);
                    // console.log(checked);
                    // console.log("------------");
                    if (checked) {
                        result[index].permission.push(name);
                    }
                })
            }
        })
        // console.log(result);
        // console.log(JSON.stringify(result));
        const formChangePermission = document.querySelector('#form-change-permission');
        const formInput = formChangePermission.querySelector('input');
        formInput.value = JSON.stringify(result);
        formChangePermission.submit();

    })
}
//End permission


//permission default
const dataRecords = document.querySelector('[data-record]');
if(dataRecords){
    const records = JSON.parse(dataRecords.getAttribute("data-record"));
    
    const tablePermission = document.querySelector("[table-permissions]");

    records.forEach((record, index) => {
        const permissions = record.permission;
        permissions.forEach((permission) => {

            const row = tablePermission.querySelector(`tr[data-name=${permission}]`);

            const input = row.querySelectorAll("input")[index];

            input.checked = true;
        })
    })

}
//end permission default