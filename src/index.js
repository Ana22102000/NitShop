// import $ from 'jquery';
// import jQuery from 'jquery';
// window.$ = jQuery;

// import './scss/basic.scss';

//console.log('Hello MIT!');

$(document).ready(function(){
	//console.log('Hello!');

	//console.log(`The time is ${new Date()}`);


function changeImage(){//resize all images so that fit into squares

    jQuery(function ($) {
    function fix_size() {

        var images = $('.image-container img');
        images.each(setsize);

        function setsize() {
            var img = $(this),
                img_dom = img.get(0),
                container = img.parents('.image-container');
                
               
            if (img_dom.complete) {
                resize();
            } 
            else img.one('load', resize);
            $(img_dom).ready(function(){resize();});

            function resize() {

                if (1 < (img_dom.width / img_dom.height)) {
                    img.width('100%');
                    var w=img_dom.width+'px';
                    img.height('auto');
                 
                    container.height(w);

                }else{
                  img.width('100%');
                    img.height('auto');
                    var w=img_dom.width+'px';
                  img.height(w);
                  img.width('auto');
                  container.height(w);


              }
            }
        }
    }
    $(window).on('resize', fix_size);
    fix_size();
});


}


function changeImageCart(){//resize all images so that fit into squares

    jQuery(function ($) {
    function fix_size() {

        var images = $('.image-container-cart img');
        images.each(setsize);

        function setsize() {
            var img = $(this),
                img_dom = img.get(0),
                container = img.parents('.image-container-cart');
               
            if (img_dom.complete) {
                resize();
            } 
            else img.one('load', resize);
            $(img_dom).ready(function(){resize();});

            function resize() {

                if (1 < (img_dom.width / img_dom.height)) {
                    img.width('100%');
                    var w=img_dom.width+'px';
                    img.height('auto');
                   
                    container.height(w);

                }else{
                  img.width('100%');
                    img.height('auto');
                  var w=img_dom.width;
                img.height(w+'px');
                img.width('auto');
               
              }
            }
        }
    }
    $(window).on('resize', fix_size);
    fix_size();
});


}

        
function changeImageDescriptionWidth()
{//resize all images so that fit into squares

    jQuery(function ($) {
    function fix_size() {

        var images = $('.image-container-description img');
        images.each(setsize);

        function setsize() {
            var img = $(this),
                img_dom = img.get(0),
                container = img.parents('.image-container-description');
                
               
            if (img_dom.complete) {
                resize();
            } 
            else img.one('load', resize);
            $(img_dom).ready(function(){resize();});

            function resize() {

                if ((container.width()/container.height()) < (img_dom.width / img_dom.height)) {
                    img.width('100%');
                    img.height('auto');
                   
                }else{
            
                img.height('100%');
                img.width('auto');
               
              }
            }
        }
    }
    $(window).on('resize', fix_size);
    fix_size();
});


}


//var date=new Date();


$.ajax({
  url: 'https://nit.tron.net.ua/api/category/list',//?_='+date,
  method: 'GET',
  dataType: 'json',
  success: function(json){
    

    var d=document.getElementById('menu-list-body');
    json.forEach(function(item){

      var category='<div class="menu-list-item" id ="'+item.id+'">'+item.name+'</div>';
      d.innerHTML+=category;
    })

  },

});

$.ajax({
  url: 'https://nit.tron.net.ua/api/product/list',//?_='+date,
  method: 'GET',
  dataType: 'json',
  success: function(json){

    showElements(json);

    changeImage();





    
  },

});


$(document).on('click','.menu-list-item',function(e){

  var menu=document.querySelector('.image-menu');
  menu.click();


if(e.target.id==0){document.getElementById('category').innerHTML="All Categories";}
else{
//var date=new Date();

var url='https://nit.tron.net.ua/api/category/'+e.target.id;//+'?_='+date;

$.ajax({
  url: url,
  method: 'GET',
  dataType: 'json',
  success: function(json){
         var d1=document.getElementById('category');
        d1.innerHTML=json.name+'<div class="category-description">'+json.description+'</div>';
    },

});
}

 

var url='https://nit.tron.net.ua/api/product/list/category/'+e.target.id;//+'?_='+date;
if(e.target.id==0)url='https://nit.tron.net.ua/api/product/list';
  $.ajax({
  url: url,
  method: 'GET',
  dataType: 'json',
  success: function(json){
        showElements(json);
        changeImage();

    },

});



});

function showElements(json){

  var d=document.getElementById('category-body');
    d.innerHTML='';

    for(var i=0;i<json.length+4;i+=4){

        var category='<div class="row col-11">';
        for(var j=0;j<4;j++)
          if(i+j<json.length){
            //add
            category+='<div class="item col-11 col-sm-5 col-md-5 col-lg-2 col-xl-2"><div class="image-container"><img class="image" src="'+json[i+j].image_url+'"></div><a class="item_name" target="_blank">'+json[i+j].name+'</a><br>';
      
            if(json[i+j].special_price!=null){
              category+='<div class="old price">'+json[i+j].price+'</div><div class="current price">'+json[i+j].special_price+'</div>';
              category+='<br><button class="button buy" data-id="'+json[i+j].id+'" data-name="'+json[i+j].name+'" data-amount="1" data-price="'+json[i+j].special_price+'"data-image="'+json[i+j].image_url+'">Add</button></div>';

            }
              else{
                category+='<div class="current price">'+json[i+j].price+'</div>';
                category+='<br><button class="button buy" data-id="'+json[i+j].id+'" data-name="'+json[i+j].name+'" data-amount="1" data-price="'+json[i+j].price+'"data-image="'+json[i+j].image_url+'">Add</button></div>';

              }
          }

          category+='</div>';

        d.innerHTML+=category;
    }

  }


var name_clicked=0;
var phone_clicked=0;
var email_clicked=0;


$(document).on('click','.checkout-info',function(e){

if(e.target.name=="Name")name_clicked++;
  if(name_clicked==1)e.target.value="";
  if(e.target.name=="Number")phone_clicked++;
  if(phone_clicked==1)e.target.value="";
  if(e.target.name=="Email")email_clicked++;
  if(email_clicked==1)e.target.value="";
});


$(document).on('click','.checkout',function(e){

  var cart_total_amount=Number(document.getElementById("cart_price").innerHTML);
  if(cart_total_amount==0){
    //todo alert

  }
    else{
      var cart=e.target.parentElement.parentElement.parentElement.childNodes[3].childNodes;
      

  var products="";


   for(var i=0;i<shoppingCart.length-1;i++)
       products+="products["+shoppingCart[i].id+"]="+shoppingCart[i].Amount+"&";
  
      products+="products["+shoppingCart[shoppingCart.length-1].id+"]="+shoppingCart[shoppingCart.length-1].Amount

   // products+='&products[172]=1';
  
  //console.log(products);
  var name=document.getElementById('checkout-info-name').value;
  var phone=document.getElementById('checkout-info-phone').value;
  var email=document.getElementById('checkout-info-email').value;
  

  var send_data='token=OfSlGGTlMq8kk0F8Jbxi&name='+name+'&phone='+phone+'&email='+email+'&'+products;

  $.ajax({
  url: 'https://nit.tron.net.ua/api/order/add',
  type: 'POST',
  data: send_data,
  dataType:'json',
  success: function (data,status) {
            //console.log(data);
            if(data.status!="error"){
            
        
              var d1 = document.getElementById('shopping-cart-body'); 
              d1.innerHTML='<h1 style="color:#888;font-size: 25px;font-style: italic;">Empty</h1>';
              shoppingCart=[];

              document.getElementById("cart_price").innerHTML=0;
        document.getElementById("checkout").innerHTML=0;
            toggleModal();

            toggleModal3();
      }
      else{
        //console.log(data.errors);
        if(data.errors.products!=null)alert("Sorry, some products had ended");

        if(data.errors.email!=null)alert("Wrong email");
         if(data.errors.name!=null)alert("Wrong name");
          if(data.errors.phone!=null)alert("Wrong phone");
        if(data.errors.token!=null)alert("Wrong token");


      }

 
        },
        error: function () {
            alert("error");
        }

  
});


}
});





	var shoppingCart = [];


    function displayShoppingCart(){

		var d1 = document.getElementById('shopping-cart-body'); 
		
        var cart_total_price=Number(document.getElementById("checkout").innerHTML);
        var cart_total_amount=Number(document.getElementById("cart_price").innerHTML);


		var product=shoppingCart.length-1;
       

		var productAdded='<div class="item-cart" id ="'+shoppingCart[product].id+'"><div class="image-container-cart"><div class="image-s"><img src="'+shoppingCart[product].Image+'" /></div></div><div class="description">'+shoppingCart[product].Name+'</div><div class="quantity"><div class="btn-plus" >+</div><div class = "quantity_number" id="quantity">'+shoppingCart[product].Amount+'</div><div class="btn-minus">-</div></div><div class="total-item-price">'+shoppingCart[product].Price+'</div></div>';


    if(d1.innerHTML=='<h1 style="color:#888;font-size: 25px;font-style: italic;">Empty</h1>')
        d1.innerHTML=" ";

		d1.innerHTML=d1.innerHTML+productAdded;
		 

         cart_total_price+=shoppingCart[product].Price*shoppingCart[product].Amount;
         cart_total_amount+=shoppingCart[product].Amount;
   
        
        document.getElementById("cart_price").innerHTML=cart_total_amount;
        document.getElementById("checkout").innerHTML=cart_total_price;
    }



    function AddToCart(image,name,amount,price,id){
       var singleProduct = {};

       singleProduct.Image=image;
       singleProduct.Name=name;
       singleProduct.Amount=amount;
       singleProduct.Price=price;
       singleProduct.id=id;

       if(singleProduct.Name.length>50){
        singleProduct.Name='';
        for(var i=0;i<50;i++)
          singleProduct.Name+=name[i];
       }
       singleProduct.Name+='...';

       var p=true;

       for(var product in shoppingCart){

       	if(shoppingCart[product].Name==singleProduct.Name){

       		shoppingCart[product].Amount+=singleProduct.Amount;
          
     document.getElementById("shopping-cart-body").childNodes[Number(product)+1].childNodes[2].childNodes[0].click();

       		p=false;
       		break;
       	}
       	
       }
       if(p){
      		 shoppingCart.push(singleProduct);
      		 displayShoppingCart();
      		}

    }  



	$(document).on('click', '.buy', function (){

		event.preventDefault();
  		var name = $(this).data('name');
  		var amount = Number($(this).data('amount'));
  		var price = Number($(this).data('price'));
  		var image= $(this).data('image');
      var id=Number($(this).data('id'));
  		AddToCart(image,name, amount,price,id);
  		
	});

	$(document).on('click','.image-menu',function(){


		var element = document.querySelector('.menu-list')
		var style = getComputedStyle(element)
		var visibility = style.visibility

		if(visibility=='hidden')
		$('.menu-list').css({
			'visibility': 'visible',
		});

	else

		$('.menu-list').css({
			'visibility': 'hidden',
		});


	});

    $(document).on('click','.image-eye',function(e){
    
      var description=e.target.parentElement.childNodes[0];


      var item=e.target;

      while(item.className!="modal-content modal-content-item")
          item=item.parentElement;

        var item_id=$(item.childNodes[2].childNodes[item.childNodes[2].childNodes.length-1]).data('id');
    
      var d=document.getElementById('modal-item');
      d.innerHTML='<span class="close-button" id="close-button2">&times;</span>';


//var date=new Date();



  $.ajax({
  url: "https://nit.tron.net.ua/api/product/"+item_id,//+'?_='+date,
  method: 'GET',
  dataType: 'json',
  success: function(json){
  	console.log(e.target.parentElement.childNodes[0]);

 e.target.parentElement.childNodes[0]="";

//console.log(description.length);
    if(description.length<=260+3)
        description=json.description;

      else{
        description="";

        for(var i=0;i<260;i++)
           description+=json.description[i];
         description+="...";
      }

      if(json.special_price!=null){
         d.innerHTML+='<div class="image-container-description"><img class="image2 image-description"  src="'+json.image_url+'"></div> <div style="position: inherit; margin-left: 35%;width:45%;" class="item-description-body"><a class="item_name item_name_description" style="font-weight: bold;" target="_blank">'+json.name+'</a><br><div class="category-description" style="margin-left: 5%;margin-bottom:5%;">'+description+'<img class="image-eye" src="./dist/img/eye.png"></div><div class="old price">'+json.price+'</div><div class="current price">'+json.special_price+'</div><br><button class="button buy" data-name="'+json.name+'" data-amount="1" data-price="'+json.special_price+'" data-image="'+json.image_url+'" data-id="'+json.id+'" >Add</button></div></div>';
         //d.innerHTML+='<div class="image-container-description"><img class="image2 image-description"  src="'+json.image_url+'"></div><div style="position: inherit; margin-left: 35%;width:45%;" class="item-description-body"><a class="item_name item_name_description" style="font-weight: bold;" target="_blank">'+json.name+'</a><br><div class="category-description" style="margin-left: 5%;margin-bottom:5%;">'+description+'<img class="image-eye" src="./dist/img/eye.png"></div><div class="old price">'+json.price+'</div><div class="current price">'+json.special_price+'</div><br><button class="button buy" data-name="'+json.name+'" data-amount="1" data-price="'+json.special_price+'" data-image="'+json.image_url+'" data-id="'+json.id+'" >Add</button></div></div>';

       }
          else{
         d.innerHTML+='<div class="image-container-description"><img class="image2 image-description"  src="'+json.image_url+'"></div> <div style="position: inherit; margin-left: 35%;width:45%;" class="item-description-body"><a class="item_name item_name_description" style="font-weight: bold;" target="_blank">'+json.name+'</a><br><div class="category-description" style="margin-left: 5%;margin-bottom:5%">'+description+'<img class="image-eye" src="./dist/img/eye.png"></div><div class="current price">'+json.price+'</div><br><button class="button buy" data-name="'+json.name+'" data-amount="1" data-price="'+json.price+'" data-image="'+json.image_url+'" data-id="'+json.id+'" >Add</button></div>';
           //d.innerHTML+='</div>';
         //d.innerHTML+='<div class="image-container-description"><img class="image2 image-description"  src="'+json.image_url+'"></div><div style="position: inherit; margin-left: 35%;width:45%;" class="item-description-body"><a class="item_name item_name_description" style="font-weight: bold;" target="_blank">'+json.name+'</a><br><div class="category-description" style="margin-left: 5%;margin-bottom:5%">'+description+'<img class="image-eye" src="./dist/img/eye.png"></div><div class="current price">'+json.price+'</div><br><button class="button buy" data-name="'+json.name+'" data-amount="1" data-price="'+json.price+'" data-image="'+json.image_url+'" data-id="'+json.id+'" >Add</button></div>';
        
         }

         changeImageDescriptionWidth();


          closeButton2= document.getElementById("close-button2");
          closeButton2.addEventListener("click", toggleModal2);

    // toggleModal2();







  },

});


    });



var modal = document.querySelector(".modal-a");
var trigger = document.querySelector(".image-cart");
//var closeButton = document.querySelector(".close-button");
var closeButton = document.getElementById("close-button");

function toggleModal() {
	  modal.classList.toggle("show-modal");
    changeImageCart();
hideSlider();

    
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
    if (event.target === modal2) {
        toggleModal2();
    }
     if (event.target === modal3) {
        toggleModal3();
    }
}

trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);


var modal2 = document.querySelector(".modal-item");
var closeButton2 = document.getElementById("close-button2");



function toggleModal2() {
    modal2.classList.toggle("show-modal");
   
    hideSlider();



}

function hideSlider(){
  var w_down=$('.header_down').width();
  var w=$('.header_main').width();

  w_down+=17;
  if($(document.body).attr("class")=="")

  {
    $(document.body).addClass("modal-open");

    $('.category-body').css({
      'padding-right':'17px',
    });
    
    $('.header_main').css({
        'width':w,
    });
    

  }
  else{
    $(document.body).removeClass("modal-open");

    $('.category-body').css({
      'padding-right':'0px',
    });
    $('.header_main').css({
      'width':'100%',
    });
    
  }

  
}

closeButton2.addEventListener("click", toggleModal2);

var modal3=document.querySelector(".modal-success");
var closeButton3 = document.getElementById("close-button3");



function toggleModal3() {
    modal3.classList.toggle("show-modal");
    hideSlider();

  
}

closeButton3.addEventListener("click", toggleModal3);



$(document).on('click','.item',function(e){
  if(e.target.className!='button buy'){


      var d=document.getElementById('modal-item');
      d.innerHTML='';

var item=e.target;

while(item.className!="item col-11 col-sm-5 col-md-5 col-lg-2 col-xl-2")
      item=item.parentElement;
    var item_id=$(item.childNodes[item.childNodes.length-1]).data('id');



  $.ajax({
  url: "https://nit.tron.net.ua/api/product/"+item_id,
  method: 'GET',
  dataType: 'json',
  success: function(json){
       

          d.innerHTML+='<span class="close-button" id="close-button2">&times;</span>';
         
         var short_description=json.description;
         if(short_description.length>260+3)
         {
          short_description="";
          for(var i=0;i<260;i++)
            short_description+=json.description[i];
          short_description+="...";
         }

          if(json.special_price!=null){
         d.innerHTML+='<div class="image-container-description"><img class="image2 image-description"  src="'+json.image_url+'"></div><div style="position: inherit; margin-left: 35%;width:45%;" class="item-description-body"><a class="item_name item_name_description" style="font-weight: bold;" target="_blank">'+json.name+'</a><br><div class="category-description" style="margin-left: 5%;margin-bottom:5%;">'+short_description+'<img class="image-eye" src="./dist/img/eye.png"></div><div class="old price">'+json.price+'</div><div class="current price">'+json.special_price+'</div><br><button class="button buy" data-name="'+json.name+'" data-amount="1" data-price="'+json.special_price+'" data-image="'+json.image_url+'" data-id="'+json.id+'" >Add</button></div></div>';

       }
          else{
         d.innerHTML+='<div class="image-container-description"><img class="image2 image-description"  src="'+json.image_url+'"></div><div style="position: inherit; margin-left: 35%;width:45%;" class="item-description-body"><a class="item_name item_name_description" style="font-weight: bold;" target="_blank">'+json.name+'</a><br><div class="category-description" style="margin-left: 5%;margin-bottom:5%">'+short_description+'<img class="image-eye" src="./dist/img/eye.png"></div><div class="current price">'+json.price+'</div><br><button class="button buy" data-name="'+json.name+'" data-amount="1" data-price="'+json.price+'" data-image="'+json.image_url+'" data-id="'+json.id+'" >Add</button></div>';
         }

         changeImageDescriptionWidth();

          closeButton2= document.getElementById("close-button2");
          closeButton2.addEventListener("click", toggleModal2);

     toggleModal2();



    },

});


  



  }
});



$(document).on('click','.btn-plus',function(e){

	var value =Number(e.target.parentElement.childNodes[1].innerHTML);
  var add=0;

		if (value < 100) {
        value = 1+value;
        add=1;
    } else {
        value =100;
    }
 
		e.target.parentElement.childNodes[1].innerHTML=value;


		var cart_total_amount=Number(document.getElementById("cart_price").innerHTML)+Number(add);
        var cart_total_price=Number(document.getElementById("checkout").innerHTML)+Number(e.target.parentElement.parentElement.childNodes[3].innerHTML)*add;

		document.getElementById("cart_price").innerHTML=cart_total_amount;
        document.getElementById("checkout").innerHTML=cart_total_price;

	});

$(document).on('click','.btn-minus',function(e){
	var value =Number(e.target.parentElement.childNodes[1].innerHTML);
		
		 if (value > 1) {
        value = value - 1;
    } else {
        value = 0;
    }


    if(value==0){

    	e.target.parentElement.parentElement.remove();

    	 for(var product in shoppingCart){

       	if(shoppingCart[product].Name==e.target.parentElement.parentElement.childNodes[1].innerHTML){
       		//delete shoppingCart[product];

          shoppingCart.splice(product,1);
         // console.log(shoppingCart);

       	}
       }
    }

		e.target.parentElement.childNodes[1].innerHTML=value;


		var cart_total_amount=Number(document.getElementById("cart_price").innerHTML)-Number(1);
        var cart_total_price=Number(document.getElementById("checkout").innerHTML)-Number(e.target.parentElement.parentElement.childNodes[3].innerHTML);

		document.getElementById("cart_price").innerHTML=cart_total_amount;
        document.getElementById("checkout").innerHTML=cart_total_price;
 


	});

});



