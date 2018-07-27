function $$(selector, context) {
  var context = context || document;
  var elements = context.querySelectorAll(selector);
  var nodesArr = [].slice.call(elements);
  return nodesArr.length === 1 ? nodesArr[0] : nodesArr;
};

var $emotesArr = $$('.fb-emote');
var numOfEmotes = $emotesArr.length;
var $dragCont = $$('.fb-cont__drag-cont');
var $activeEmote = $$('.fb-active-emote');
var $leftEye = $$('.fb-active-emote__eye--left');
var $rightEye = $$('.fb-active-emote__eye--right');
var $smile = $$('.fb-active-emote__smile');

var emoteColors = {
  terrible: '#f8b696',
  bad: '#f9c686',
  default: '#ffd68c'
}

var animTime = 0.5;

$("#precioUsuario").change( function(event) {
    // Aquí debería ir el precio que regresa de skyscanner.
    var precioPromedio = 1200;
    var precioUsuario = parseInt($("#precioUsuario").val())
    console.log("Precio user : ",precioUsuario);
    console.log("Precio promedio : ",precioPromedio);
    // $("#terrible").trigger('event');
    face = getFace(precioPromedio,precioUsuario)
    activa(face);
    
});

// Dado un precio promedio y un precio del usuario, dtermina la cara correspondiente.
function getFace(precioPromedio,precioUsuario) {
    if (precioPromedio<precioUsuario) {
        console.log("terrible");
        // Más caro que el promedio.
        return "terrible";
    } else if ((precioPromedio*.80) < precioUsuario && precioUsuario <= precioPromedio) {
        console.log("Entra en bad",(precioPromedio*.80) );
        // El precio del usuario está acotado entre el precio promedio y el 80% del precio promedio. 
        return "bad";
    } else if ((precioPromedio*.60) < precioUsuario && precioUsuario <= (precioPromedio*.80)) {
        console.log("Entra en okay");
        // El precio del usuario está acotado entre el 80% del precio promedio y el 60% del precio promedio. 
        return "okay";
    } else if ((precioPromedio*.40) < precioUsuario && precioUsuario <= (precioPromedio*.60)) {
        console.log("Entra en good");
        // El precio del usuario está acotado entre el 60% del precio promedio y el 40% del precio promedio.
        return "good";
    } else  {
        console.log("Entra en great");
        // El precio del usuario está acotado por debajo del 40% del precio promedio.
        return "great";
    }
}

// Dado un tipo de carita, la activa en el DOM
function activa (type){
  var numFace = getNumber(type)
  var $emote = $emotesArr[numFace]
  // Para definir la posición de la carita.
  $emote.dataset.progress = numFace/(numOfEmotes - 1);
  var progressTo =+ $emote.dataset.progress;
  var type = $emote.dataset.emote;
  var $target = document.querySelector('#fb-emote-' + type);
  var $lEye = $target.querySelector('.fb-emote__eye--left');
  var $rEye = $target.querySelector('.fb-emote__eye--right');
  var leftEyeTargetD = $lEye.getAttribute('d');
  var rightEyeTargetD = $rEye.getAttribute('d');
  var smileTargetD = $target.querySelector('.fb-emote__smile').getAttribute('d');
  var bgColor = emoteColors[type];
  if (!bgColor) bgColor = emoteColors.default;
  
  $$('.fb-emote.s--active').classList.remove('s--active');
  $emote.classList.add('s--active');
  // Cosas de TweenMax :v
  TweenMax.to($activeEmote, animTime, {backgroundColor: bgColor});
  TweenMax.to($dragCont, animTime, {x: progressTo * 100 + '%'});
  TweenMax.to($leftEye, animTime, {morphSVG: $lEye});
  TweenMax.to($rightEye, animTime, {morphSVG: $rEye});
  TweenMax.to($smile, animTime, {attr: {d: smileTargetD}});
}

// Regresa el número correspondiente a una cara.
function getNumber (face){
    switch(face) {
    case "terrible":
        return 0;
    case "bad":
        return 1;
    case "okay":
        return 2;
    case "good":
        return 3;
    case "great":
        return 4;
    }
}


// $emotesArr.forEach(function($emote, i) {
//   var progressStep = i / (numOfEmotes - 1);
//   $emote.dataset.progress = progressStep;
  
//   $emote.addEventListener('click', function() {
//     var progressTo = +this.dataset.progress;
//     var type = this.dataset.emote;
//     var $target = document.querySelector('#fb-emote-' + type);
//     var $lEye = $target.querySelector('.fb-emote__eye--left');
//     var $rEye = $target.querySelector('.fb-emote__eye--right');
//     var leftEyeTargetD = $lEye.getAttribute('d');
//     var rightEyeTargetD = $rEye.getAttribute('d');
//     var smileTargetD = $target.querySelector('.fb-emote__smile').getAttribute('d');
//     var bgColor = emoteColors[type];
//     if (!bgColor) bgColor = emoteColors.default;
    
//     $$('.fb-emote.s--active').classList.remove('s--active');
//     this.classList.add('s--active');
    
//     TweenMax.to($activeEmote, animTime, {backgroundColor: bgColor});
//     TweenMax.to($dragCont, animTime, {x: progressTo * 100 + '%'});
//     TweenMax.to($leftEye, animTime, {morphSVG: $lEye});
//     TweenMax.to($rightEye, animTime, {morphSVG: $rEye});
//     TweenMax.to($smile, animTime, {attr: {d: smileTargetD}});
//   });
// });
