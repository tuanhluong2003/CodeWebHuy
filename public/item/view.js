$(document).ready(function () {
    getdata(1);
    function getdata(page){
        $.ajax({
            url: '/getdata/' + page,
            method: 'GET',
            success:function(data){
                var value = "";
                    for (var i = 0; i < data.data.length; i++) {
                        value += `
                            <tr>
                                <td>${i + 1}</td>
                                <td>${data.data[i].msv}</td>
                                <td>${data.data[i].fullName}</td>
                                <td>${data.data[i].birthDay}</td>
                                <td>${data.data[i].addRess}</td>
                                <td>${data.data[i].phoneNumber}</td>
                                <td><img src="/${data.data[i].image}" alt="" style="height: 70px;width: 100px;"></td>
                                <td><a class="btn btn-primary col-5" id="edit_value" data-page = "${page}" data-id="${data.data[i]._id}" data-msv="${data.data[i].msv}" data-fullName="${data.data[i].fullName}" data-birthDay="${data.data[i].birthDay}" data-addRess="${data.data[i].addRess}" data-phoneNumber="${data.data[i].phoneNumber}"  style="color:white" ><i class="fa-solid fa-pen-to-square "></i></a> <a class="btn btn-danger col-5 delete_value" data-page = "${page}" data-id="${data.data[i]._id}" style="color:white"><i class="fa-solid fa-trash"></i></a> </td>
                            </tr>
                        `
                    }
                    var paging = "";
                    var countData = Math.ceil(data.countData / 5);
                    for(let i =0;i<countData;i++){
                        paging += `
                        <li class="page-item"><a class="page-link" id="clickpage" data-id="${i+1}">${i+1}</a></li>
                    `
                    }
                    
                    $('.pagination').html(paging);
                    $('tbody').html(value); 
            }
        })
    }
    
    //paging
    $(document).on('click','#clickpage',function(){
        var getPage = $(this).attr('data-id');
        getdata(getPage);
       
    })

    //delete
    $(document).on('click', '.delete_value', function (event) {
        if (window.confirm('Bạn chắc chắn muốn xóa?') == true) {
            var getID = $(this).attr('data-id');
            var getPage = $(this).attr('data-page');
            var addvalue = { id: getID };
            $.ajax({
                url: '/delete/' + getID,
                method: 'post',
                data: addvalue,
                dataType: 'JSON',
                success: function () {
                },
            })
        } else {
            return false;
        }
        getdata(getPage);
    });


    //seach_value
    $(document).on('click', '#search_value', function () {
        var searchmsv = document.getElementById('search_msv').value;
        var searchName = document.getElementById('search_name').value;
        var value = {
            msv: searchmsv,
            fullName: searchName
        }
        $.ajax({
            url: '/search',
            method: 'POST',
            data: value,
            dataType: 'JSON',
            success: function (data) {

                var valueserch = "";
                for (let i = 0; i < data.length; i++) {
                    valueserch += `
                        <tr>
                            <td>${i + 1}</td>
                            <td>${data[i].msv}</td>
                            <td>${data[i].fullName}</td>
                            <td>${data[i].birthDay}</td>
                            <td>${data[i].addRess}</td>
                            <td>${data[i].phoneNumber}</td>
                            <td><img src="/${data[i].image}" alt="" style="height: 70px;width: 100px;"></td>
                            <td><a class="btn btn-primary col-5" id="edit_value" data-id="${data[i]._id}" data-msv="${data[i].msv}" data-fullName="${data[i].fullName}" data-birthDay="${data[i].birthDay}" data-addRess="${data[i].addRess}" data-phoneNumber="${data[i].phoneNumber}"  style="color:white" ><i class="fa-solid fa-pen-to-square "></i></a> <a class="btn btn-danger col-5 delete_value" data-id="${data[i]._id}" style="color:white"><i class="fa-solid fa-trash"></i></a> </td>
                        </tr>
                    `
                }
                $('tbody').html(valueserch);

            }
        })
    });

    
    //edit
    $(document).on('click', '#edit_value', function () {
        var getPage = $(this).attr('data-page');
        var getID = $(this).attr('data-id');
        var getMsv = $(this).attr('data-msv');
        var getfullName = $(this).attr('data-fullName');
        var getbirthDay = $(this).attr('data-birthDay');
        var getaddRess = $(this).attr('data-addRess');
        var getphoneNumber = $(this).attr('data-phoneNumber');
        $('#getpage').val(getPage);
        $('#getid').val(getID);
        $('#editmsv').val(getMsv);
        $('#editfullName').val(getfullName);
        $('#editbirthDay').val(getbirthDay);
        $('#editaddRess').val(getaddRess);
        $('#editphoneNumber').val(getphoneNumber);
        $('.dz-preview').html();
        $('#myModal').modal('show');
    })

    $(document).on('click', '#update_value', function () {
        var page = $('#getpage').val();
        var id = $('#getid').val();
        var valueMsv = $('#editmsv').val();
        var valuefullName = $('#editfullName').val();
        var valuebirthDay = $('#editbirthDay').val();
        var valueaddRess = $('#editaddRess').val();
        var valuephoneNumber = $('#editphoneNumber').val();
        var data = {
            id: id,
            msv: valueMsv,
            fullName: valuefullName,
            birthDay: valuebirthDay,
            addRess: valueaddRess,
            phoneNumber: valuephoneNumber
        };
        $.ajax({
            url: '/edit/' + id,
            method: 'POST',
            data: data,
            dataType: 'JSON',
            success: function () {
                $('#myModal').modal('toggle');
            }
        })
        getdata(page);
    })

    
})
