export class CommonResponse {
    success: Boolean;
    message : string;
    data : Object;
}

export class UserObject {
    name: string;
    _id : string;
    data : Object;
    email : string;
}

export class EmployeeObject {
    name: string;
    _id : string;
    code : String;
    type : string;
}


export class TaskObject {
    _id : string;
        taskName : string;
        startDate : string;
        endDate : string;
        estiamtedCost : string;
        wages :[{
            _id : string;
            employeeID : string;
            employeeName : string;
            date : string;
            amount : number;
            mode : string ;
        
        }]
        expenses : [{
            _id : string;
            title : string;
            date : string;
            amount : number;
            mode : string;
        }]


}

export class ExpenseObject {
    _id : string;
    title : string;
    date : string;
    amount : number;
    mode : string;
}

export class PaymentObject {

        
        title : string;
        amount : number;
        date : string;
        mode : string ;
        _id : string;
    
}

export class ProjectObject {
    name: string;
    _id : string;
    desc : string;
    location : string;
    payments : [{
       
        title : string;
        
        amount : number;
        date : string;
        mode : string ;
    
    }];
    tasks :[{
        _id : string;
        taskName : string;
        startDate : string;
        endDate : string;
        estiamtedCost : string;
        wages :[{
            _id : string;
            employeeID : string;
            employeeName : string;
            date : string;
            amount : number;
            mode : string ;
        
        }]
        expenses : [{
            _id : string;
            title : string;
            date : string;
            amount : number;
            mode : string;
        }]

    }]
}

