window.indexedDB = window.indexedDB || window.mozIndexedDB
		|| window.webkitIndexedDB || window.msIndexedDB;


// check compatibility issues
debugger;
if (!window.indexedDB) {
	window.alert("Your browser doesn't support a stable version of IndexedDB.")
}

var db;
var dataTypeList = [ "id", "name", "age", "email" ];
var objectStore;

// name of Db and version
var request = window.indexedDB.open("sampleDB", 1);

// onupgradeneeded will call for the first time whenever their is any change in
// DB like name,version inxdex etc.
request.onupgradeneeded = function(event) {
	debugger;
	 db = event.target.result;
	 objectStore = db.createObjectStore("employee", {keyPath : "id",autoIncrement : true});
	alert("onupgrade");
	
	
}
request.onerror = function(event) {
	alert("error call");
	console.log("error: ");
};
request.onsuccess = function(event) {
	
	   db = request.result;
	   console.log("success: "+ db);
		alert("sucess call");
	};
	// this function will save the record to Db
	function submitNewRecord() {
		debugger;
	    var data = {
	           id : "NoName",
	           name:'',
	           age:'',
	           email:''
	        },
	         txtID = document.querySelector("#txtID"),
			 txtName = document.querySelector("#txtName"),
			 txtAge = document.querySelector("#txtAge"),
			 txtEmail = document.querySelector("#txtEmail");
			  

	    if (!txtID.value && !txtName.value && !txtAge.value && !txtEmail.value) {
	        alert("ID,Name,Age,and Email data are needed.", "OK","Cancel");   
	            return false;
	            
	    }

	    if (txtID.value) {
	        data.id = txtID.value;
	    }
	    if (txtName.value) {
	        data.name = txtName.value;
	    }
	    if (txtAge.value) {
	        data.age = txtAge.value;
	    }
	    if (txtEmail.value) {
	        data.email = txtEmail.value;
	    }
	    // data.insertDay = getDateTime();

	    insertData(db, data);

	    txtID.value = "";
	    txtName.value = "";
	    txtAge.value = "";
	    txtEmail.value = "";
	    
	    tau.changePage("#pageResult");

	    return true;
	}
	
	// insert data
	function insertData(db, data) {
		debugger;
	    var transaction = db.transaction("employee", "readwrite");

	    objectStore = transaction.objectStore("employee");
	    objectStore.put(data);
	     var result=db.transaction("employee").objectStore
	    alert("Record Saved!");
	}
	
	function openDB(successCb) {
		debugger;
	    if (window.indexedDB) {
	        var request = indexedDB.open("sampleDB1", 1);	        
	        request.onsuccess = function(e) {
	            db = request.result;
	             
	            if (successCb) {
	                successCb(db);
	            }
	       	        };
	      
	    } else {
	        onError({
	            message: "Indexed DB is not supported"
	        });
	    }
	}

	function loadDataView(db) {
		debugger;
	    var transaction = db.transaction("employee", "readonly"),
	        resultBuffer = [];

	    idbObjectStore = transaction.objectStore("employee");
	    idbObjectStore.openCursor().onsuccess = function(e) {
	        var cursor = e.target.result;

	        if (cursor) {
	            resultBuffer.push(cursor.value);
	            cursor.continue();
	        } else  {
	            showDataView(resultBuffer);
	        }
	             	        		        	
	        
	    };
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
	        var theader=document.createElement('thead');
	        tbl.appendChild(theader);
	         for(i=0;i<=dataArray.length;i++)
	        	 theader.appendChild(document.createElement('th')).
	        	 appendChild(document.createTextNode(dataArray[i]));               	         

	        
	        for (i = 0; i < dataArray.length; i++) {
	        	var tr = document.createElement('tr');        
	            for (j = 0; j < dataTypeList.length; j++) {
	                prop = dataTypeList[j];
	                if (dataArray[i].hasOwnProperty(prop)) {
	                	 var td = document.createElement('td');
	                	 var element=document.createElement("input");
	                	 element.setAttribute("type","button");
	                	 element.setAttribute("value","Edit");	                  
	                	 element.setAttribute("id","btnEit");
	                	 option = document.createElement('option');
	                	 option.setAttribute()
	                	
	                    if (prop === "id") {
	                    	td.addEventListener("click", createDeleteCallback(dataArray[i][prop], tbl, tr));
	                    }
	                    element.addEventListener("click",editRecord(dataArray[i]["id"]));
	                    td.className = prop + "Detail";
	                    td.appendChild(document.createTextNode(dataArray[i][prop]));
                       
	                    tr.appendChild(td);
	                }
	            }
	            tr.appendChild(element);
	            tr.appendChild()
	            tr.appendChild(td);	            
	            tbdy.appendChild(tr);
	        }

	        tbl.appendChild(tbdy);
	        objResultContents.appendChild(tbl);
	    }
 debugger;
 function editRecord(id)
 {
	 alert("edit call");
	 var x= function(event)
	 {
		 var ID=id;
		 var transaction = db.transaction("employee");
	    var idbObjectStore = transaction.objectStore("employee");
	     var request=idbObjectStore.get(id);
	     
	     request.onsuccess=function(){
	      var x=  request.result;     
	     };
		 
		 
		 
	 };
	 
 }
	
	
	// Event handler function
	function main()
	{debugger;
		var readr= document.querySelector("#readsub");
		var add1=document.querySelector("#add");
		var readall1=document.querySelector("#readall");
		var remove1=document.querySelector("#remove");
		var  btnSubmit=document.querySelector("#btnSubmit");

		btnSubmit.addEventListener("click",function()				
		{
		  
     		  submitNewRecord();
     		  // loads data to home screen after saving
     		 openDB(loadDataView);
									
		});
		
	}
	
 var init= function()
 { 
	 // this function listens to all events..UDF()
	main();
	openDB(loadDataView);
 };
	
 
window.onload=init;

