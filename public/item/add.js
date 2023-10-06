$(document).ready(function(){
    $('#add').click(function(){ 
        var msv = document.getElementById('msv').value;
        var fullName = document.getElementById('fullName').value;
        var birthDay = document.getElementById('birthDay').value;
        var addRess = document.getElementById('addRess').value;
        var phoneNumber = document.getElementById('phoneNumber').value;
        var addvalue = {
            msv : msv,
            fullName : fullName,
            birthDay : birthDay,
            addRess : addRess,
            phoneNumber : phoneNumber,
           
        };
        $.ajax({
            url : '/addvalue',
            method : 'POST',
            data : addvalue, 
            dataType: 'JSON',       
            success : function(){
            }
        })
        alert('Thêm thành công');
    })
})