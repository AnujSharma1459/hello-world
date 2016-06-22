var RegisterationFormAnuj = React.createClass({
getInitialState: function() {
    return {data: []};
  },

loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        {/*debugger;*/}
        this.setState({data: data});
         
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }, 

  handleCommentSubmit: function(comment) {

    // submit to the server and refresh the list
    var comments = this.state.data;
    // Optimistically set an id on the new comment. It will be replaced by an
    // id generated by the server. In a production application you would likely
    // not use Date.now() for this and would have a more robust system in place.
    comment.id = Date.now();

    var newComments = comments.concat([comment]);
    this.setState({data: newComments});

  $.ajax({
      url: this.props.url,
      dataType: 'json',		
      type: 'POST',
      data: comment,
      success: function(data) {
        this.setState({data: data});        
      }.bind(this),
      error: function(xhr, status, err) {
         this.setState({data: comments});
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

 
componentDidMount: function() {
{/*debugger;*/}
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },

  render: function() {
    return (
      <div className="commentForm">
       <h1> Registration Form</h1>
         <InputForm onCommentSubmit={this.handleCommentSubmit}/>
         <ShowData data={this.state.data}/>
      </div>
    );
  }
});


var InputForm=React.createClass({
getInitialState: function() {
   {/* return {author: 'ANuj', text: 'Sharma'};*/}
       return {Fname: '', Lname: '',EmailID:'',ContactNo:''};
  },
handleFnameChange: function(e) {
    this.setState({Fname: e.target.value});
  },
handleLnameChange: function(e) {
    this.setState({Lname: e.target.value});
  },
handleEmailIDChange: function(e) {
    this.setState({EmailID: e.target.value});
  },
handleContactNoChange: function(e) {
    this.setState({ContactNo: e.target.value});
  },

handleSubmit:function(e){
 e.preventDefault();
    var Fname     = this.state.Fname.trim();
    var Lname     = this.state.Lname.trim();
    var EmailID   = this.state.EmailID.trim();
    var ContactNo = this.state.ContactNo.trim();
    if (!Fname || !Lname ||!EmailID ||!ContactNo) {
      return;
    }
    // send request to the server
    this.props.onCommentSubmit({Fname: Fname, Lname: Lname,EmailID:EmailID,ContactNo:ContactNo});
    this.setState({Fname: '', Lname: '',EmailID:'',ContactNo:''});
},
render:function(){
   return(
       <form className="InputForm" id="submitForm">	
          <div className="form-group container">
       
       <label>First Name</label>
       <input type="text"  id="Fname" className="form-control" placeholder="Your First  name"  value={this.state.Fname} onChange={this.handleFnameChange}/>
        
       <label>Last Name</label>
       <input type="text"  id="Lname" className="form-control" placeholder="Your Last  name"  value={this.state.Lname} onChange={this.handleLnameChange}/>
     
       <label>Email-ID</label>        
       <input type="text" id="EmailID" className="form-control" placeholder="Your Email ID"  value={this.state.EmailID} onChange={this.handleEmailIDChange}/>
   
       <label>Contact No</label>
       <input type="text" id="ContactNo" className="form-control" placeholder="Your ContactNo name" value={this.state.ContactNo} onChange={this.handleContactNoChange}/>
             {/*using bootstrap button*/}
        <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
          </div>       
 </form>
        );
     }
  
   });

var ShowData = React.createClass({
  render: function() {
{/* this line maps data form dataA to a functin and pass to commentN*/}
  var commentNodes = this.props.data.map(function(commentA) {	
      return (
          <Comment url="/api/comments" Fname={commentA.Fname}  id={commentA.id} Lname={commentA.Lname} EmailID={commentA.EmailID} ContactNo={commentA.ContactNo} key={commentA.id} >
          {commentA.text}
        </Comment>
      );
    });


    return (
      <div className="commentList">
        {commentNodes}
        {/*Hello, world! I am a CommentList.
       <Comment author="Peter England">This comment from P.E 1</Comment>
       <Comment author="Anuj Sharma">This comment from A.S 2</Comment>*/}
        </div>
    );
  }
});
var Comment = React.createClass({
getInitialState: function() {
    return {data: []};

  },
   
  EditRecord:function(e){
    $.ajax({
      url: this.props.url +Id,
      dataType: 'json',
      cache: false,
      success: function(data) {
        debugger;
        this.setState({data: data});
           
      }.bind(this),

      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this),
    });
    return(
     <div></div>
   ); //document.getElementById('Fname').value=data[0].Fname;    
},


       getInitialState(){
            debugger;
          	return {view: {showModal: false}}
        },
        handleHideModal(){
        	this.setState({view: {showModal: false}})
        },
        handleShowModal(){
             debugger;
              alert("The Child button text is: " + this.state.id);
        	this.setState({
                view: {
                     showModal: true}
                     })
          
               
        },

  render: function() {

    return (
    <div> 
      <table className="comment" className="table table-striped">         
        <thead>
         <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
         <th>Email</th>
         <th>Contact No</th> 
          </tr>  
        </thead>
      <tbody>
         <tr>	
        <td id="td">
            {this.props.id}</td> 
          <td id="tdFname">
            {this.props.Fname}</td>	
       <td className="commentAuthor">
              {this.props.Lname}
         </td>
        <td className="commentAuthore">
               {this.props.EmailID}
        </td>
        <td className="commentAuthoer">
               {this.props.ContactNo} 
      </td>
        <td><button className="glyphicon glyphicon-edit" aria-hidden="true" onClick={this.handleShowModal} text={this.setState.id}></button>
               {this.state.view.showModal ? 
              <Modal handleHideModal={this.handleHideModal}/> : null}
         </td>
        {/*{this.props.children*/}
        {/* {marked(this.props.children.toString())}*/}
        </tr>
      </tbody>

      </table>
         
      
      </div>
    );
  }
});

   let Modal = React.createClass({
        componentDidMount(){
          debugger;
            $(ReactDOM.findDOMNode(this)).modal('show');               
            $(ReactDOM.findDOMNode(this)).on('hidden.bs.modal', this.props.handleHideModal);
        },

        render(){
        	return (
              <div className="modal fade">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
               <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                      <h4 className="modal-title">Update Record</h4>
                    </div>
                    <div className="modal-body">
                       
       
		            <label>First Name</label>
		            <input type="text"  id="Fname" className="form-control" placeholder="Your First  name"   />
        
		           <label>Last Name</label>
		           <input type="text"  id="Lname" className="form-control" placeholder="Your Last  name" />
	     
		           <label>Email-ID</label>        
		          <input type="text" id="EmailID" className="form-control" placeholder="Your Email ID"  />
   
		          <label>Contact No</label>
		          <input type="text" id="ContactNo" className="form-control" placeholder="Your ContactNo name" />
		         {/*using bootstrap button*/}
		         
		            </div>
                    <div className="modal-footer">
                         <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                         <button type="button" className="btn btn-primary">Save changes</button>
                    </div>
                  </div>
                </div>
              </div>
            )
        },
        propTypes:{
        	handleHideModal: React.PropTypes.func.isRequired
        }
    });






var updateData=React.createClass({
render:function(){
debugger;
 var updateNodes = this.props.data.map(function(commentA) {	
     return (
          <updateRecord2  Fname={commentA.Fname}  Lname={commentA.Lname} EmailID={commentA.EmailID} ContactNo={commentA.ContactNo} key={commentA.id} >
          {commentA.text}
        </updateRecord2>
      );
        
    });
 return (
      <div className="commentList1">
        {updateNodes}
        {/*Hello, world! I am a CommentList.
       <Comment author="Peter England">This comment from P.E 1</Comment>
       <Comment author="Anuj Sharma">This comment from A.S 2</Comment>*/}
        </div>
    );
  }
});

var updateRecord2=React.createClass({
render:function(){
return(
        <div>
           document.getElementById('Fname').value={this.prop.Fname}; 	
        </div>
    );
 }
});







ReactDOM.render(
  <RegisterationFormAnuj url="/api/comments" pollInterval={1000}/>,
  document.getElementById('content')
);









