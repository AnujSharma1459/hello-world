window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

// check that browser support indexDb
debugger;
if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB.")
}


// adding dummy data to objectstore
debugger;
/*
 * const employee = [ { id: "01", name: "Anuj", age: 35, email:
 * "an7u@tutorialspoint.com" }, { id: "02", name: "Deeksha", age: 24, email:
 * "Deeksha@tutorialspoint.com" } ];
 */

var db;
var dataTypeList = ["id", "name", "age", "email", "Edit"];
var employee; // object store
var element; // Edit button
var DB_Name = "sampleDB2212";
var objectStoreName="employe";
var transactionName="employe";



debugger;
// sampleDB1=name of Database and 2 is the version of the database
var request = window.indexedDB.open(DB_Name, 1);
request.onupgradeneeded = function(event) {
    debugger;
    var db = event.target.result;
    var objectStore = db.createObjectStore(objectStoreName, {
        keyPath: "id",
        autoIncrement: true
    });
    
    alert("onupgrade");
    objectStore.createIndex("id", "id", {
        unique: true
    });
    objectStore.createIndex("name", "name", {
        unique: false
    });
    objectStore.createIndex("age", "age", {
        unique: false
    });
    objectStore.createIndex("email", "email", {
        unique: true
    });
    /*
	 * for (var i in employee) { objectStore.add(employee[i]); }
	 */
}

request.onerror = function(event) {
    alert("error call");
    console.log("error: ");
};

request.onsuccess = function(event) {

    db = request.result;
    console.log("success: " + db);
   // alert("sucess call");
};




function add() {
    debugger;
    var request = db.transaction(transactionName, "readwrite")
        .objectStore(objectStoreName)
        .add({
            id: "01",
            name: "ravi",
            age: 24,
            email: "ravi@tutorialspoint.com"
        });
 
    request.onsuccess = function(event) {
    
        if (request.result)
            alert("has been added to your database." + request.result.name);
    };

    request.onerror = function(event) {
        alert("Unable to add data\r\ravi is already exist in your database! ");
    }
}


function read() {
  /*  var transaction = db.transaction(["employee"]);*/
	  var transaction = db.transaction(transactionName);
    var objectStore = transaction.objectStore(objectStoreName);
    var request = objectStore.get("00-03");

    request.onerror = function(event) {
        alert("Unable to retrieve data from database!");
    };

    request.onsuccess = function(event) {
        if (request.result) {
            alert("Name: " + request.result.name + ", Age: " + request.result.age + ", Email: " + request.result.email);
        } else {
            alert("Kenny couldn't be found in your database!");
        }
    };
}

function readAll() {
    debugger;
    var objectStore = db.transaction(transactionName).objectStore(objectStoreName);     
    objectStore.openCursor().onsuccess = function(event){    	
        var cursor = event.target.result;
    
        if (cursor) {
            alert("Name for id " + cursor.key + " is " + cursor.value.name + ", Age: " + cursor.value.age + ", Email: " + cursor.value.email);
            cursor.continue();
        } else {
            alert("No more entries!");
        }
    };
}

function remove(id) {


    var request = db.transaction(transactionName, "readwrite")
    .objectStore(objectStoreName)
    .delete(id);
    request.onsuccess = function(event) {
//        alert("abc entry has been removed from your database.");
    	  var x=request.result;
    };
}


function createDeleteCallback(i, objTable, objRow) {
    debugger;
    var retFunc = function() {
        var data = {
            id: i,
            table: objTable,
            row: objRow
        };
        debugger;
        tau.changePage("#2btnPopup");
        var del = document.getElementById("btnOK");
        
        del.addEventListener("click", function() {
            debugger;
            deleteData(db, data);          
            tau.closePopup();
            //no need to call open.
            loadDataView(db);        

        });
        
        var cancel = document.getElementById("btnCancel");
        cancel.addEventListener("click", function() {
            openDB(loadDataView);
            alert("Redirecting to main page");
        });
    };

    return retFunc;
}




function deleteData(db, data) {
    debugger;
    
	  var transaction = db.transaction(transactionName, "readwrite");	 
	  idbObjectStore = transaction.objectStore(objectStoreName);
	  idbObjectStore.delete(data.id);  
}

function getDateTime() {
	debugger;
    var day = new Date();
    return day;
}

function submitNewRecord() {
    debugger;
    var data = {
            /* id :'', */
            name: '',
            age: '',
            email: ''
            // Date:''
        },
        /* txtID = document.querySelector("#txtID"), */
        txtName = document.querySelector("#txtName"),
        txtAge = document.querySelector("#txtAge"),
        txtEmail = document.querySelector("#txtEmail");



    if (txtName.value) {data.name = txtName.value;}
    if (txtAge.value) {data.age = txtAge.value;}
    if (txtEmail.value) {data.email = txtEmail.value;}
    

    if (!txtName.value && !txtAge.value && !txtEmail.value) {
        alert("ID,Name,Age,and Email data are needed.", "OK", "Cancel");  
        tau.changePage("")
        return false;
        }  
    insertData(db, data);
    
    /* txtID.value = ""; */
    txtName.value = "";
    txtAge.value = "";
    txtEmail.value = "";
    tau.changePage("#pageResult");

    return true;
}

function insertData(db, data) {
    debugger;
    var transaction = db.transaction(transactionName, "readwrite");

    idbObjectStore = transaction.objectStore(objectStoreName);
    idbObjectStore.put(data);    
    alert("Record Saved!");
}

function showDataView(dataArray) {
    debugger;
    var objResultContents = document.querySelector("#resultDetail"),
        objTable,
        objRow,
        objCol,
        i,
        j,
        prop;
    

    objResultContents.innerHTML = "";

    var tbl = document.createElement('table');
    /* tbl.className = "resultTable"; */
    tbl.style.width = '100%';
    tbl.setAttribute('border', '1');
    var tbdy = document.createElement('tbody');
    // creating Table Headers
    var orderArrayHeader = ["ID", "Name", "Age", "Email", "Edit"];    
    if(!dataArray.length)
    	{
    	  tau.changePage("#pageResult");
    	  return false;
    	}      
    
    var thead = document.createElement('thead');
    // css class
    thead.className = "headerDetails";
    
    tbl.appendChild(thead);  
    for (var i = 0; i < orderArrayHeader.length; i++) {
        thead.appendChild(document.createElement("th")).
        appendChild(document.createTextNode(orderArrayHeader[i]));   
          }
    for (i = 0; i < dataArray.length; i++) {
        var tr = document.createElement('tr');   
        for (j = 0; j < dataTypeList.length; j++) {
            prop = dataTypeList[j];
            if (dataArray[i].hasOwnProperty(prop)) {
                var td = document.createElement('td');
                var element = document.createElement("input");
                /* element.setAttribute("onclick","editRecord(5)"); */
                element.setAttribute("type", "button");
                element.setAttribute("value", "Edit");
                element.setAttribute("id", "btnEdit");
                element.setAttribute("name", "querybtn");
                if (prop === "id") {
                    td.addEventListener("click", createDeleteCallback(dataArray[i][prop], tbl, tr));
                     }
                // creating event listener for edit                
                element.addEventListener("click", editRecord(dataArray[i]["id"]));
                td.className = prop + "Detail";
                td.appendChild(document.createTextNode(dataArray[i][prop]));
                tr.appendChild(td);
            }
             
        }

        element.className = "btnDetails";
        tr.appendChild(element);
        tbdy.appendChild(tr);
    }

    tbl.appendChild(tbdy);
    objResultContents.appendChild(tbl);
}

function editRecord(id) {
    var ab = function() {
        debugger;
        console.log(id);
        Id = id; // ID is called on the Event listener

        var request = window.indexedDB.open(DB_Name, 1);
        var transaction = db.transaction(transactionName, "readwrite");
        var idbObjectStore = transaction.objectStore(objectStoreName);        
        var request = idbObjectStore.get(Id);
        
        request.onsuccess=function(event)
        {
        	debugger;
        	var data = request.result;
        	document.querySelector("#uptName").value = data.name;
            document.querySelector("#uptAge").value = data.age;
            document.querySelector("#uptEmail").value = data.email;
           /*document.querySelector("#txtName").value = data.name;
            document.querySelector("#txtAge").value = data.age;
            document.querySelector("#txtEmail").value = data.email;*/
            tau.changePage("#updaterecordpage");
           /*tau.changePage("#addrecordpage");*/           
        }
        
        /*document.querySelector("#uptName").value = data.name;
        document.querySelector("#uptAge").value = data.age;
        document.querySelector("#uptEmail").value = data.email;
        tau.changePage("#updaterecordpage");
*/
/*        request.onsuccess = function(event) {
            // db = request.result;
            // console.log("success: "+ db);
            alert("sucess call");
            var data = request.result;

            document.querySelector("#uptName").value = data.name;
            document.querySelector("#uptAge").value = data.age;
            document.querySelector("#uptEmail").value = data.email;
            tau.changePage("#updaterecordpage");

        };
*/

    };

    return ab;

}


function updateRecord(id) {
    debugger;
    console.log("updateRecord");
    var data = {
        id: '',
        name: '',
        age: '',
        email: '',
    };
    data.name = document.querySelector("#uptName").value;
    data.age = document.querySelector("#uptAge").value;
    data.email = document.querySelector("#uptEmail").value;
   /* data.name = document.querySelector("#txtName").value;
    data.age = document.querySelector("#txtAge").value;
    data.email = document.querySelector("#txtEmail").value;*/
    data.id = id;
    if (!data.name) {
    	debugger;
        alert("enter your name");
        return false;
    }
    if (!data.age) {
        alert("enter your age");
        return false;
    }
    if (!data.email) {
        alert("enter your email");
        return false;
    } 

    insertData(db, data);
    uptName.value = '';
    uptAge.value = '';
    uptEmail.value = '';
    tau.changePage("#pageResult");
    openDB(loadDataView);
}
// notification
/*function watchBatteryLevel()
{
try {
	debugger();
// listener for monitoring battery level change on high and low thresholds
gBatteryListener = tizen.systeminfo.addPropertyValueChangeListener("BATTERY", onBatterySuccess, {highThreshold: 0.9,lowThreshold : 0.2});
alert("Watching battery level started");
} catch(e) {
alert("Exception: " + e.message );
}
}
function getSystemProperty(property, onSuccess) {
	try {
	tizen.systeminfo.getPropertyValue(property, onSuccess, onError);
	} catch (e) {
	alert("Exception: " + e.message);
	}
	} */

function loadDataView(db) {
    debugger;

    var request = window.indexedDB.open(DB_Name, 1);
    var transaction = db.transaction(transactionName, "readonly"),
        resultBuffer = [];

    idbObjectStore = transaction.objectStore(objectStoreName);
    idbObjectStore.openCursor().onsuccess = function(e) {
        var cursor = e.target.result;

        if (cursor) {
            resultBuffer.push(cursor.value);
            // alert(cursor);
            cursor.continue();
        } else {
            showDataView(resultBuffer);
        }
    };
}



// Open the database
function openDB(successCb) {
    debugger;
    if (window.indexedDB) {
        var request = indexedDB.open(DB_Name, 1);

        request.onerror = function(e) {
            alert("Please allow this application to use Indexed DB");
        };
        request.onsuccess = function(e) {
            db = request.result;
          
            /*
			 * onSuccess({ message: "Indexed DB loading complete" });
			 */

            if (successCb) {
                successCb(db);
            }
        };
        request.onupgradeneeded = function(e) {
            db = e.target.result;

            /*
			 * onSuccess({ message: "Indexed DB upgrade needed" });
			 */
            createTable(db);
        };
    } else {
        onError({
            message: "Indexed DB is not supported"
        });
    }
}

function main() {
    debugger;
    var readr = document.querySelector("#readsub");
    var add1 = document.querySelector("#add");
    var readall1 = document.querySelector("#readall");
    var remove1 = document.querySelector("#remove");
    var btnUpdate = document.querySelector("#btnUpdate");
    var btnSubmit = document.querySelector("#btnSubmit");
    var btnBack = document.querySelector("#Back");
    var addRecord= document.querySelector("#addRecord");
    readr.addEventListener("click", function() {
        read();
    });
    add1.addEventListener("click", function() {
        add();
        // xyz();

    });
    readall1.addEventListener("click", function() {
        debugger;
        readAll();
    });
    remove1.addEventListener("click", function() {
        remove(id);
    });

    btnSubmit.addEventListener("click", function() {
        debugger;
        submitNewRecord();  
        readAl();
        openDB(loadDataView);
        //openDB(loadDataView);
    });

    btnUpdate.addEventListener("click", function() {

        debugger;
        console.log("success");
        updateRecord(Id);
    });
    btnBack.addEventListener("click", function() {
        tau.changePage("#pageResult");
    });
     
    addRecord.addEventListener("click",function(){
    	debugger;
    	//document.getElementById("myBtn").disabled = true;
        document.querySelector("#btnUpdate").disabled=true;    	
           tau.changePage("#addRecordPage");
    	 
    	       
    });

}

  var init = function() { 
	  debugger;
	  main(); // we call this function here to show record
      openDB(loadDataView);
};
 
// This function loads on as the first window appears on the screen.
window.onload =  init; 
   