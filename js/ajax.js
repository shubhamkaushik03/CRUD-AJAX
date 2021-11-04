// get data from DB and display
let userentry = document.getElementById('datadb')
function showData(){
    userentry.innerHTML = "";
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "getData.php", true);
  xhr.responseType = "json";
  xhr.onload = () => {
      if(xhr.status === 200){
         getvalue = xhr.response;        
        
        getvalue.forEach(element => {
          
            userentry.innerHTML += `
            <tr>
                        <th>${element.id}</th>
                        <td>${element.name}</td>
                        <td>${element.email}</td>
                        <td>${element.pass}</td>
                        <td>
                          <button class="btn-warning btn-edit" data-sid= ${element.id}>edit</button>  
                        </td>
                        <td>
                          <button class="btn-danger btn-del" data-sid="${element.id}">Delete</button>  
                        </td>
                      </tr>
            `

             
         });
        
      }
      else{
          console.log("error found");
      }
      del();
      edit();
  }
  xhr.send()
}
showData();





document.getElementById('btn').addEventListener("click" , addData);

function addData(e) {
    e.preventDefault();
  

    //capture value from form
    let stid = document.getElementById('id').value;
    let nm = document.getElementById('name').value;
    let em = document.getElementById('inputEmail3').value;
    let pw = document.getElementById('inputPassword3').value;
    // console.log(nm,em,pw);

    //xhr object
    const xhr = new XMLHttpRequest();
    // intialize ajax
    xhr.open("POST","access.php", true);
    
    // set header

    xhr.setRequestHeader('content-Type', 'application/json' );
    // handle response
    xhr.onload = () =>{
        if (xhr.status === 200){
           console.log(xhr.response);
           document.getElementById('msg').innerHTML ='<div class=" alert mt-3 alert-success">' + xhr.response + '</div>';
           document.getElementById('form').reset();
          showData();
           

        }else {
            console.log("error found");
        }
      
    };

    // javascript object
    let myData = {id: stid, name: nm, email : em, pass : pw};
    // console.log(myData);

    // convert javascript object to json string
    let data = JSON.stringify(myData);
    // console.log(data);
    
    // send request with data
    xhr.send(data);
   

}

// edit/update
function edit(){
    var edit = document.getElementsByClassName('btn-edit');
    let nm = document.getElementById('name');
    let stid = document.getElementById('id');
    let em = document.getElementById('inputEmail3');
    let pw = document.getElementById('inputPassword3');

    for(let i =0 ; i< edit.length ; i++){
        edit[i].addEventListener('click' , function(){
            let id = edit[i].getAttribute('data-sid');
            console.log(id);
            const xhr = new XMLHttpRequest();
            xhr.open("POST", "edit.php", true);
            xhr.responseType = "json";
            xhr.setRequestHeader("Content-Type","Application/json");
            xhr.onload = () =>{
                if(xhr.status === 200){
                    let editdata = xhr.response;
                    stid.value = editdata.id;
                    nm.value = editdata.name;
                    em.value = editdata.email;
                    pw.value = editdata.pass;
                    

                    console.log(nm,em,pw);
                }
                else{
                    console.log("error");
                }
         

            }
            let myData = {sid : id};
    // console.log(myData);

    // convert javascript object to json string
    let data = JSON.stringify(myData);
    
    
    // send request with data            
    xhr.send(data);
        })

    }

}


// delete from DB
function del(){
    var del = document.getElementsByClassName('btn-del');
    for(let i =0 ; i< del.length ; i++){
        del[i].addEventListener('click' , function(){
            let id = del[i].getAttribute('data-sid');
            const xhr = new XMLHttpRequest();
            xhr.open("POST", "del.php", true);
            xhr.setRequestHeader("Content-Type","Application/json");
            xhr.onload = () =>{
                if(xhr.status === 200){
                    document.getElementById('msg').innerHTML ='<div class=" alert mt-3 alert-success">' + xhr.response + '</div>';
                    showData();
                }
                else{
                    console.log("error");
                }
         

            }
            let myData = {sid : id};
    // console.log(myData);

    // convert javascript object to json string
    let data = JSON.stringify(myData);
    // console.log(data);
    
    // send request with data
    xhr.send(data);
        })

    }
      

}
