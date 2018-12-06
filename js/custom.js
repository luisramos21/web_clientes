$(function () {

    $('#side-menu').metisMenu();

});

//Loads the correct sidebar on window load,
//collapses the sidebar on window resize.
// Sets the min-height of #page-wrapper to window size
$(function () {
    $(window).bind("load resize", function () {
        topOffset = 50;
        width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
        if (width < 768) {
            $('div.navbar-collapse').addClass('collapse');
            topOffset = 100; // 2-row-menu
        } else {
            $('div.navbar-collapse').removeClass('collapse');
        }

        height = ((this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height) - 1;
        height = height - topOffset;
        if (height < 1)
            height = 1;
        if (height > topOffset) {
            $("#page-wrapper").css("min-height", (height) + "px");
        }
    });

    var url = window.location;
    var element = $('ul.nav a').filter(function () {
        return this.href == url || url.href.indexOf(this.href) == 0;
    }).addClass('active').parent().parent().addClass('in').parent();
    if (element.is('li')) {
        element.addClass('active');
    }
});

function ajax(url, type, data, sucess, fail) {
//    if (before == null || before == "")
//        before = "#loadingDiv"
    var options = {
        type: type,
        dataType: "JSON",
        url: url,
        data: data,
        beforeSend: function () {
            // $(before).fadeIn('slow');
        },
        success: function (json) {
            //$(before).fadeOut('slow');
        },
        error: function (er, te, erd) {
            console.error("ERROR AJAX: ", er)
            //$("#loadingDiv").fadeOut('show')
            if (typeof er.responseText == 'array' || typeof er.responseText == 'object') {
                er.responseText = JSON.stringify(er);
            }

        }

    }
    $.ajax(options).done(sucess).fail(fail); //end ajax

}




function Datatable(index = [], data, columns, order = 0, title = "", new_btn = null) {

    var prinCols = [];

    var paging = true;
    var filter = true
    var exportOptions = []
    if (data.length > 0) {
        for (var i = 0; i < data.length; i++) {
            exportOptions.push(i);
            prinCols.push(i);
        }
    }
    if ((columns && index[0]) != "") {
        if (data == "") {
            columns = [
                {"sTitle": 'Datos', "mDataProp": "none"}
            ];
            data = []
        }
        if (typeof columns == "undefined") {
            console.error("ERROR COLUMNS UNDEFINED.")
        } else if (typeof $("#" + index[0]) != "undefined" && typeof index[0] != "undefined" && typeof $("#" + index[0]).html() != "undefined") {

            if (typeof index[1] != "undefined" && index[1] != "" && index[1] != null) {
                prinCols = index[1].split(",");
            }
            if (typeof index[4] != "undefined" && index[4] != "" && index[4] != null) {
                exportOptions = index[4].split(",");
            } else {
                exportOptions = prinCols;
            }
            var menu = {"lengthMenu": [10, 25, 50, 75, 100]}
            var btn = [
                {
                    extend: 'excelHtml5',
                    title: title,
                    text: '<i class="fa fa-file-excel-o" style="color: #00A65A"></i>&ensp;Exportar a Excel',
                    
                }, {
                    extend: 'print',
                    title: title,
                    text: '<i class="fa fa-print" style="color: #00A65A"></i>&ensp;Imprimir',
                    customize: function (win) {
                        $(win.document.body).find('table')
                                .addClass('compact')
                                .css('font-size', 'inherit');
                    },
                    
                    autoPrint: true
                }
            ]

            if (typeof index[2] != "undefined" && index[2] != null && index[2]) {
                //no buttons y no orders
                btn = []
                menu = []
                paging = false;
                filter = false;
            }

            if (typeof index[3] != "undefined" && index[3] != null && index[3]) {
                //no buttons
                btn = []
            }
            if (new_btn != "" && new_btn != null && typeof new_btn == "object") {
                btn.push(new_btn)
            }

            oTable = $("#" + index[0]).DataTable({
                "aaData": data,
                "aoColumns": columns,
                "responsive": true,
                "autoWidth": true,
                "bDestroy": true,
                "fixedHeader": true,
                "fixedColumns": true,
                "bFilter": filter,
                "paging": paging,
                scrollCollapse: true,
                "order": [[order, "DESC"]],
                menu,
                dom: 'Blfrtip',
                buttons: btn,
                "oLanguage": {
                    "sSearch": "Buscar: ",
                    "sInfo": "Mostrando _START_ a _END_ de _TOTAL_ entradas",
                    "sLengthMenu": "<br> _MENU_      Resultados por página",
                    "oPaginate": {
                        "sPrevious": "Anterior",
                        "sNext": "Siguiente"
                    },
                    "sInfoFiltered": "(filtrado de _MAX_ entradas)",
                    "sEmptyTable": "No hay datos disponibles",
                    "sZeroRecords": "No se encontraron registros coincidentes",
                    "sInfoEmpty": "Mostrando 0 a 0 de 0 entradas"
                }
            });
        } else {
            console.error("ERROR DATATABLE INDEX UNDEFINED  " + index)
        }
    } else {
        console.error("ERROR DATATABLE INDEX[0] UNDEFINED  " + index)
}
}


function generateCols(data, actions) {

    if (typeof data != "undefined" && data != "") {
        var returtdata = [];
        $.each(data, function (i, val) {
            var tmp;
            if (val == "Id") {

                tmp = {"sTitle": "Acciones", "mDataProp": val, sClass: "actions", "sWidth": "110px", "mRender": function (data) {

                    }};
            } else if (val != "") {
                let title = val;
                var mrender = function (data) {
                    return data;
                }
                let sWidth = "";
                if (typeof actions != 'undefined' && actions && typeof actions[val] != 'undefined') {
                    title = actions[val];
                    if (typeof actions[val]['mrender'] !== 'undefined' && typeof actions[val]['mrender'] === 'function') {
                        mrender = actions[val]['mrender'];
                    }
                    if (typeof actions[val]['title'] !== 'undefined') {
                        title = actions[val]['title'];
                    } else {
                        title = actions[val];
                    }
                    if (typeof actions[val]['width'] !== 'undefined') {
                        sWidth = actions[val]['width'];
                    }
                }
                tmp = {"sTitle": title, "mDataProp": val, mRender: mrender, sWidth: sWidth};

            }
            returtdata.push(tmp);
        })
        var Return = [];
        $.each(returtdata, function (i, val) {
            if (typeof val != "undefined") {
                Return.push(val);
            }
        })
        return Return;
    } else {
        console.error("DATA UNDEFINED TO GENERATE COLUMNS OR EMPTY DATA , PLESE REQUIRE DATA TO GEERATE COLS.!")
    }
}