hound.showModal = function (){
    //$("body").append('<div class="modalWindow"/>');
    $.mobile.showPageLoadingMsg();
    console.log("Modal show");
}

hound.hideModal =function (){
    //$(".modalWindow").remove();
    $.mobile.hidePageLoadingMsg();
    console.log("Modal hide");
}
hound.displayTwitter = function(element, params){    
    hound.getTwitter(params);
}
hound.displayMenuItem = function(nombre) {
    $(".texto" + nombre).text(eval("hound.portada.texto" + nombre));
    $(".titulo" + nombre).text(eval("hound.portada.texto" + nombre));
};
hound.displayListView = function(nombre){
    var elementos = $(nombre);
    for(var cont = 0 ; cont < elementos.length; cont++){
        var elemento = $(elementos[cont]);
        if ( elemento.hasClass('ui-listview')) {
            elemento.listview('refresh');
        } 
        else {
            elemento.trigger('create');
        }
        
    }
}
hound.displayMainMenu = function() {
    $(".tituloMenuPrincipal").text(hound.config.appDisplayName);
    $(".contenidoPortada").html(Handlebars.templates.portadaTemplate({
        menuItems: hound.portada.menuItems, 
        serverURL: hound.config.remote_server_files,
        connected : hound.isConnected()
    }));
/* hound.displayMenuItem("Contactos");
    hound.displayMenuItem("Localizador");
    hound.displayMenuItem("Promociones");
    if(hound.isConnected()){
        hound.displayMenuItem("Catalogo");
        hound.displayMenuItem("Comentarios");
        hound.displayMenuItem("Encuesta");            
        $(".imagenCatalogo").attr("src",localStorage.getItem("imagenCatalogo"));
        $(".imagenComentarios").attr("src",localStorage.getItem("imagenComentarios"));
        $(".imagenEncuesta").attr("src",localStorage.getItem("imagenEncuesta"));
    }
    $(".imagenLocalizador").attr("src",localStorage.getItem("imagenLocalizador"));
    $(".imagenContactos").attr("src",localStorage.getItem("imagenContactos"));
    $(".imagenPromociones").attr("src",localStorage.getItem("imagenPromociones"));
    */
};
hound.displayCategorias = function() {
    $(".listCatalogos").html("");
    var template = Handlebars.templates['listCategoriasTemplate'];
    var contenido = "";
    for ( var i in hound.categorias) {
        var item = hound.categorias[i];
        if(item.numeroArticulos>0){
            contenido += template({
                baseURL : hound.config.remote_server_files,
                categoria : item
            });
        }
    }
    $(".listCatalogos").html(contenido);
    hound.displayListView(".listCatalogos");

};
hound.displayContactos = function() {
    $(".listContactos").html("");
    var template = Handlebars.templates['listContactosTemplate'];
    for ( var i in hound.contactos) {
        var item = hound.contactos[i];
        $(".listContactos").append(template({
            baseURL : hound.config.remote_server_files,
            contacto : item
        }));
    }
    hound.displayListView(".listContactos");
    
//$(".listContactos").listview("refresh");
};
hound.displayArticulos = function() {
    $(".listArticulos").html("");
    var template = Handlebars.templates['listArticulosTemplate'];
    for ( var i in hound.articulos) {
        var item = hound.articulos[i];
        $(".listArticulos").append(template({
            baseURL : hound.config.remote_server_files,
            articulo : item
        }));
    }
    hound.displayListView(".listArticulos");
};
hound.displayArticulo = function() {
    $(".contenidoArticulo").html("");
    var template = Handlebars.templates['articuloTemplate'];
    $(".contenidoArticulo").html(template({
        baseURL : hound.config.remote_server_files,
        articulo : hound.articulo
    }));
    $(".tituloArticulo").html(hound.articulo.nombre);
};
hound.displayPromociones = function() {
    
    $(".listPromociones").html("");
    var template = Handlebars.templates['listPromocionesTemplate'];
    for ( var i in hound.promociones) {
        var item = hound.promociones[i];
        var itemDate = new Date(item.vigencia);
        var currentDate = new Date();
        if (currentDate <= itemDate) {
            var itemYear = itemDate.getFullYear();
            var itemMonth = itemDate.getMonth();
            item.vigencia = itemDate.getDate() + " de "
            + hound.meses[itemMonth] + " del " + itemYear;
            $(".listPromociones").append(template({
                promocion : item
            }));
        }
    }
    hound.displayListView(".listPromociones");
};
hound.displayPromocion = function() {
    $(".contenidoPromocion").html("");
    var template = Handlebars.templates['promocionTemplate'];
    $(".contenidoPromocion").html(template({
        promocion : hound.promocion
    }));
    $(".tituloPromocion").html(hound.promocion.nombre);
};
hound.displayEncuestas = function() {
    $(".listEncuestas").html("");
    var template = Handlebars.templates['listEncuestasTemplate'];
    for ( var i in hound.encuestas) {
        var item = hound.encuestas[i];
        if (item.vigencia > new Date()) {
            $(".listEncuestas").append(template({
                baseURL : hound.config.remote_server_files,
                encuesta : item
            }));
        }
    }
    hound.displayListView(".listEncuestas");
};
hound.displayEncuesta = function() {
    $(".contenidoEncuesta").html("");
    var template = Handlebars.templates['encuestaTemplate'];
    $(".contenidoEncuesta").html(template({
        baseURL : hound.config.remote_server_files,
        encuesta : hound.preguntas
    })).trigger("create");
};
hound.displayTiendas = function(elemento) {
    hound.showModal();
    navigator.geolocation.getCurrentPosition(hound.geolocationSuccess, hound.geolocationError,{
        enableHighAccuracy:true
    });
    $(".tituloListaLocalizador").html($(elemento).data("label"));
    $(".listListaLocalizador").html("");
    var template = Handlebars.templates['listTiendasTemplate'];
    for ( var i in hound.tiendas) {
        var item = hound.tiendas[i];
        $(".listListaLocalizador").append(template({
            tienda : item
        }));
    }
    var masCercana = {
        'idTienda':'-1', 
        'nombre':'Ubicación mas cercana', 
        'direccion':''
    };
    $(".listListaLocalizador").append(template({
        tienda : masCercana
    }));
    $(".tienda-1").hide();
    hound.displayListView(".listListaLocalizador");    
    $.mobile.changePage("#listaLocalizador");
}
hound.displayTienda = function(idTienda) {
    if(idTienda==-1){
        var tienda = hound.tiendas[hound.closestStore];        
    }else{
        var tienda = hound.tiendas[idTienda];        
    }
    hound.generateMapLink(tienda);
/*
    $.mobile.changePage(".Mapa");
    directionsDisplay.setDirections({
        routes: []
    });
    var latlngTienda = new google.maps.LatLng(hound.tiendas[idTienda].latitud,
        hound.tiendas[idTienda].longitud);
    var latlngActual = new google.maps.LatLng(position.coords.latitude,
        position.coords.longitude);
    for ( var i = 0; i < marcadores.length; i++) {			
        marcadores[i].setMap(null);
    }
    var latlngbounds=  new google.maps.LatLngBounds(null);
    marcadores.length = 0;
		
    var marcadorTienda = new google.maps.Marker({
        position : latlngTienda,
        map : map,
        title : hound.tiendas[idTienda].nombre
    });
    marcadores.push(marcadorTienda);		
    var marcadorActual = new google.maps.Marker({
        position : latlngActual,
        map : map,
        title : "actual"
    });
    marcadores.push(marcadorActual);
    latlngbounds = new google.maps.LatLngBounds();
    latlngbounds.extend(latlngTienda);
    latlngbounds.extend(latlngActual);
    map.fitBounds(latlngbounds);
    var request = {
        origin : hound.currentPosition,
        destination : latlngTienda,
        travelMode : google.maps.TravelMode.DRIVING
    };		
    directionsService.route(request, function(result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(result);
        }
    });	*/	
}
hound.displayFormularioComentarios = function(elemento){
    $(".contenidoComentarios").html("");
    $(".tituloComentarios").html($(elemento).data("label"));
    var template = Handlebars.templates['comentariosForm'];
    $(".contenidoComentarios").append(template());
    $.mobile.changePage("#Comentarios");	
}
hound.displayExternalLink = function(elemento, params){
    hound.openExternalLink(params.url);
}
hound.displayCard = function(elemento, cadena){
    $.mobile.changePage("#Card");
    var template = Handlebars.templates['cardTemplate'];
    var datos = JSON.parse(localStorage.getItem("userInfo"));
    $(".contenidoCard").html(template({
        userInfo:datos
    }));
    $(".contenidoCard").trigger( "create");
//$(".imagenCodigo").barcode({code: cadena, crc:false}, "code128",{barWidth:2, barHeight:100});        
}
hound.displayBarcode = function(elemento, cadena){
    $.mobile.changePage("#Barcode");
    var datos = JSON.parse(localStorage.getItem("userInfo"));
    $(".imagenCodigo").barcode({
        code: datos.userId, 
        crc:false
    }, "code39",{
        barWidth:2, 
        barHeight:100
    });        
}
hound.getDeviceBarCode = function(){
    var text = "";
    var possible = "ABCDEFGH0123456789";
    for( var i=0; i < 10; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}
