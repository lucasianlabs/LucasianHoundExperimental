document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    $("#jqueryStyle").html(localStorage.getItem("tema"));	
    hound.getDevice();
    hound.loadApp();
    hound.displayMainMenu();
    hound.validateComentario();
};
hound.onResume = function(){
}
hound.refreshApp =function(){
    window.location = "index.html";   
}/*
$(document).bind(
    "pagechange",
    function(e, data) {        
        if (typeof data.toPage === "object") {
            hound.hideModal();
            if (data.toPage.attr("id") === "Comentarios") {
                hound.showModal();
                if (hound.errores) {
                    hound.errores.resetForm();
                }
                $('#comentariosForm').reset();
            } else if (data.toPage.attr("id") === "Catalogo") {
                //$("#contenidoCatalogo").slideDown();
                $(".listCatalogos").listview("refresh");
            } else if (data.toPage.attr("id") === "Contactos") {
                //$("#contenidoContactos").slideDown();
                $(".listContactos").listview("refresh");
            } else if (data.toPage.attr("id") === "Articulos") {
                //$("#contenidoArticulos").slideDown();
                $(".listArticulos").listview("refresh");
                //$("#contenidoArticulo").slideDown();
            } else if (data.toPage.attr("id") === "Articulo") {
                $(".listArticulos").listview("refresh");
                //$("#contenidoArticulo").slideDown();
            } else if (data.toPage.attr("id") === "Encuestas") {
                //$("#listEncuestas").slideDown();
                $(".listEncuestas").listview("refresh");
            } else if (data.toPage.attr("id") === "Encuesta") {
                //$("#contenidoEncuesta").slideDown();
            } else if (data.toPage.attr("id") === "Promociones") {
                $(".listPromociones").listview("refresh");
                //$("#contenidoPromociones").slideDown();
            } else if (data.toPage.attr("id") === "Promocion") {
                //$("#contenidoPromocion").slideDown();
            } else if (data.toPage.attr("id") === "listaLocalizador") {
                //$("#contenidoListaLocalizador").slideDown();
                $(".listListaLocalizador").listview("refresh");
            } else if(data.toPage.attr("id")==="Comentarios"){
                $(".comentariosFormListView").listview("refresh");
            }
            if (data.toPage.attr("id") === "Mapa") {

            } else {
                hound.hideModal();
            }              
        }
    });
*/
/*$(document).bind("pagebeforechange", function(e, data){
    if(data.toPage[0].id){    
        if(data.options.fromPage && data.toPage){
        if(data.options.fromPage.attr("id")!== data.toPage.attr("id")){
            $("#"+data.options.fromPage.attr("id")+"> .ui-content").hide();   
        }
    }
    }
    //
    if($.mobile.activePage){
        //$($.mobile.activePage.children()[1]).fadeOut();
    }    
}); 
$(document).bind("pagebeforeshow", function(e, data){
});
$(document).bind("pageshow", function(e, data){
    $(e.target.children[1]).show();
});*/
