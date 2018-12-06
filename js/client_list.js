/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



ajax(`${API_HOST}clientes`, "GET", {}, function (json) {
    var data = json;
    if (data == "") {
        Datatable(["clientes"], [], [], 0, "Listado de Clientes", [{
                text: '<i class="fa fa-plus" aria-hidden="true"></i> Nuevo Cliente',
                className: 'btn btn-primary',
                action: function (e, dt, node, config) {
                    location.hash = "!cliente";
                }
            }]);
    } else if (data != "") {
        //var columns = Object.keys(data[0]);
        //Especifico el orden de las Columnas
        var columns = ["document", "name", "last_name", "email", "movile","phone", "created", "last_update", "id"];
        //Especifico la acción o el titulo de la colunma , para asi generala
        // apartir para que se pueda utilizar para Datatable plugin
        var actions = {
            "document": "#",
            "name": "Nombres",
            "last_name": "Apellidos",
            "movile": "Celular",
            "phone":"Teléfono",
            "email": "Email",
            "created": "Creado",
            "last_update": "Ultima Actualización",
            "id": {
                title: "Acciones",
                "width": "120px",
                mrender: function (data) {
                    let result = data;
                    if (data > 0) {
                        result = `
                                        <a href="javascript:;" onclick="verCliente(${data})">
                                         <i  style='color:blue;' class="fa fa-info-circle fa-2x"></i>
                                        </a>
                                        &nbsp;&nbsp;<a href="#!cliente/${data}"><i style='color:green;' class="fa fa-pencil fa-2x"></i></a>
                                        &nbsp;&nbsp;<a href="javascript:;" onclick="ConfirmarEliminar(${data})"><i  style='color:red;' class="fa fa-trash-o fa-2x"></i></a>
                                            `;
                    }
                    return result;
                }
            }
        }
        let columnsRenders = generateCols(columns, actions);
        //funcción que se encarga de mostrarla los datos en una tabla
        Datatable(["clientes"], data, columnsRenders, 6, "Listado de Clientes", [{
                text: '<i class="fa fa-plus" aria-hidden="true"></i> Nuevo Cliente',
                className: 'btn btn-primary',
                action: function (e, dt, node, config) {
                    location.hash = "!cliente";
                }
            }]);
        $("#clientes_filter > label > input,#clientes_length > label > select").removeClass('form-control').addClass('form-controll')
    }
},function () {
   Datatable(["clientes"], [], [], 0, "Listado de Clientes", [{
                text: '<i class="fa fa-plus" aria-hidden="true"></i> Nuevo Cliente',
                className: 'btn btn-primary',
                action: function (e, dt, node, config) {
                    location.hash = "!cliente";
                }
            }]);
});

function ConfirmarEliminar(id) {
    if (confirm("Etstas seguro de eliminar este Usuario #" + id)) {
        ajax(`${API_HOST}remove`, "POST", {id: id}, function (json) {
            console.log(json)
            if (typeof json != 'undefined' && json && typeof json['status'] != 'undefined' && json['status'] == true) {
                alert("Cliente Eliminado");
                location.hash = "!clientes";
            } else {
                alert(`No se pudo elimminar el cliente #${id}`)
            }
        })
    }
}

function verCliente(id) {
    $("#modal").modal();
    ajax(`${API_HOST}clientes/get/${id}`, "GET", {}, function (json) {
        if(json){
            for (var item in json) {
                $(`#div_${item}`).html(json[item])
            }
        }
    });
}