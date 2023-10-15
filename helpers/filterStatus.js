module.exports = (query) => {
    let filterStatus = [
        {
            name : "All Product",
            status: "",
            class : ""
        },
        {
            name : "Active",
            status: "active",
            class : ""
        },
        {
            name : "Inactive",
            status: "inactive",
            class : ""
        }
    ];

    const reqQueryStatus = query.status || "";

    const index = filterStatus.findIndex((item) => {
        return item.status == reqQueryStatus;
    })
    
    filterStatus[index].class = "active";
    
    return filterStatus;
}

